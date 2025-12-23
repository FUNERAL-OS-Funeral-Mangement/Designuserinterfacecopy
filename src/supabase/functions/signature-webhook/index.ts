// =====================================================
// EDGE FUNCTION: HelloSign Webhook Handler
// =====================================================
// Receives callbacks from HelloSign when signature events occur
// Downloads signed PDFs and stores them in Supabase Storage

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { createHmac } from 'https://deno.land/std@0.177.0/node/crypto.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('📥 Received webhook from HelloSign')

    // =====================================================
    // 1. PARSE WEBHOOK DATA
    // =====================================================
    // HelloSign sends data as application/x-www-form-urlencoded
    const formData = await req.formData()
    const jsonData = formData.get('json')
    
    if (!jsonData) {
      console.error('❌ No JSON data in webhook')
      return new Response('No JSON data', { status: 400 })
    }

    const eventData = JSON.parse(jsonData as string)
    const eventType = eventData.event.event_type
    const eventTime = eventData.event.event_time

    console.log(`📋 Event type: ${eventType}`)

    // =====================================================
    // 2. VERIFY WEBHOOK SIGNATURE (Security)
    // =====================================================
    const apiKey = Deno.env.get('HELLOSIGN_API_KEY')
    const eventHash = eventData.event.event_hash
    
    if (apiKey) {
      // Calculate expected hash
      const calculatedHash = createHmac('sha256', apiKey)
        .update(eventTime + eventType)
        .digest('hex')
      
      if (calculatedHash !== eventHash) {
        console.error('❌ Invalid webhook signature')
        return new Response('Invalid signature', { status: 401 })
      }
      
      console.log('✅ Webhook signature verified')
    }

    // =====================================================
    // 3. INITIALIZE SUPABASE CLIENT
    // =====================================================
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const signatureRequest = eventData.signature_request
    const esignRequestId = signatureRequest.signature_request_id
    const metadata = signatureRequest.metadata || {}
    const caseId = metadata.case_id
    const documentType = metadata.document_type

    console.log(`📦 Case ID: ${caseId}, Document: ${documentType}`)

    // =====================================================
    // 4. HANDLE DIFFERENT EVENT TYPES
    // =====================================================

    switch (eventType) {
      // -----------------------------------------------
      // SIGNATURE REQUEST SENT
      // -----------------------------------------------
      case 'signature_request_sent':
        console.log('📤 Signature request sent event')
        
        await supabaseClient
          .from('signature_requests')
          .update({
            status: 'sent',
            sent_at: new Date(eventTime * 1000).toISOString()
          })
          .eq('esign_request_id', esignRequestId)

        await supabaseClient
          .from('audit_log')
          .insert({
            case_id: caseId,
            event_type: 'signature_sent_confirmed',
            event_category: 'signature',
            description: 'HelloSign confirmed signature request was sent',
            actor_type: 'system'
          })
        
        break

      // -----------------------------------------------
      // SIGNATURE REQUEST VIEWED
      // -----------------------------------------------
      case 'signature_request_viewed':
        console.log('👀 Document viewed by signer')
        
        await supabaseClient
          .from('signature_requests')
          .update({
            status: 'viewed',
            viewed_at: new Date(eventTime * 1000).toISOString()
          })
          .eq('esign_request_id', esignRequestId)

        await supabaseClient
          .from('audit_log')
          .insert({
            case_id: caseId,
            event_type: 'signature_viewed',
            event_category: 'signature',
            description: 'Signer viewed the document',
            actor_type: 'family_member'
          })
        
        break

      // -----------------------------------------------
      // SIGNATURE REQUEST SIGNED
      // -----------------------------------------------
      case 'signature_request_signed':
      case 'signature_request_all_signed':
        console.log('✍️ Document signed!')

        // Download the signed PDF from HelloSign
        const helloSignApiKey = Deno.env.get('HELLOSIGN_API_KEY')
        
        console.log('📥 Downloading signed PDF from HelloSign...')
        
        const pdfResponse = await fetch(
          `https://api.hellosign.com/v3/signature_request/files/${esignRequestId}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Basic ${btoa(helloSignApiKey + ':')}`,
            }
          }
        )

        if (!pdfResponse.ok) {
          throw new Error(`Failed to download PDF: ${pdfResponse.statusText}`)
        }

        const pdfBlob = await pdfResponse.blob()
        const pdfBuffer = await pdfBlob.arrayBuffer()
        
        console.log(`📄 Downloaded PDF: ${pdfBuffer.byteLength} bytes`)

        // Upload to Supabase Storage
        const signedFilename = `${caseId}/${documentType}-SIGNED-${Date.now()}.pdf`
        
        console.log(`☁️ Uploading to Supabase Storage: ${signedFilename}`)
        
        const { data: uploadData, error: uploadError } = await supabaseClient
          .storage
          .from('documents')
          .upload(signedFilename, pdfBuffer, {
            contentType: 'application/pdf',
            upsert: true
          })

        if (uploadError) {
          console.error('❌ Storage upload error:', uploadError)
          throw uploadError
        }

        // Get public URL
        const { data: { publicUrl } } = supabaseClient
          .storage
          .from('documents')
          .getPublicUrl(signedFilename)

        console.log(`🔗 Signed PDF URL: ${publicUrl}`)

        // Update signature request record
        const { error: updateError } = await supabaseClient
          .from('signature_requests')
          .update({
            status: 'signed',
            signed_at: new Date(eventTime * 1000).toISOString(),
            signed_document_url: publicUrl
          })
          .eq('esign_request_id', esignRequestId)

        if (updateError) {
          console.error('❌ Database update error:', updateError)
          throw updateError
        }

        // Update case signatures_received count
        const { data: currentCase } = await supabaseClient
          .from('cases')
          .select('signatures_received, signatures_total, current_stage')
          .eq('id', caseId)
          .single()

        if (currentCase) {
          const newSignatureCount = (currentCase.signatures_received || 0) + 1
          const allSigned = newSignatureCount >= currentCase.signatures_total

          console.log(`📊 Signatures: ${newSignatureCount}/${currentCase.signatures_total}`)

          await supabaseClient
            .from('cases')
            .update({
              signatures_received: newSignatureCount,
              // Auto-advance to faxing if all signatures complete
              current_stage: allSigned ? 'faxing' : currentCase.current_stage,
              completed_stages: allSigned 
                ? [...(currentCase.completed_stages || []), 'signatures']
                : currentCase.completed_stages,
              status: allSigned ? 'faxing-in-progress' : 'signatures-in-progress'
            })
            .eq('id', caseId)

          if (allSigned) {
            console.log('🎉 All signatures complete! Auto-advancing to faxing stage')
          }
        }

        // Log the signature
        await supabaseClient
          .from('audit_log')
          .insert({
            case_id: caseId,
            event_type: 'signature_received',
            event_category: 'signature',
            description: `Document signed: ${documentType}`,
            actor_type: 'family_member',
            metadata: {
              document_url: publicUrl,
              esign_request_id: esignRequestId
            }
          })

        console.log('✅ Signature webhook processed successfully')
        
        break

      // -----------------------------------------------
      // SIGNATURE REQUEST DECLINED
      // -----------------------------------------------
      case 'signature_request_declined':
        console.log('❌ Signature request declined')
        
        await supabaseClient
          .from('signature_requests')
          .update({
            status: 'declined',
            error_message: 'Signer declined to sign'
          })
          .eq('esign_request_id', esignRequestId)

        await supabaseClient
          .from('audit_log')
          .insert({
            case_id: caseId,
            event_type: 'signature_declined',
            event_category: 'signature',
            description: 'Signer declined to sign the document',
            actor_type: 'family_member'
          })
        
        break

      // -----------------------------------------------
      // ERROR HANDLING
      // -----------------------------------------------
      case 'signature_request_invalid':
      case 'signature_request_canceled':
        console.log(`⚠️ Signature request ${eventType}`)
        
        await supabaseClient
          .from('signature_requests')
          .update({
            status: 'error',
            error_message: `Request ${eventType}`
          })
          .eq('esign_request_id', esignRequestId)
        
        break

      default:
        console.log(`ℹ️ Unhandled event type: ${eventType}`)
    }

    // =====================================================
    // 5. RETURN SUCCESS
    // =====================================================
    return new Response(
      JSON.stringify({ 
        received: true, 
        event_type: eventType 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('❌ Error in webhook handler:', error)
    
    // Still return 200 to HelloSign to prevent retries
    return new Response(
      JSON.stringify({
        received: true,
        error: error.message
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

/* 
DEPLOYMENT NOTES:

1. Deploy this function:
   supabase functions deploy signature-webhook

2. Configure HelloSign webhook URL:
   - Go to: https://app.hellosign.com/home/myAccount#api
   - Set webhook URL to: https://YOUR_PROJECT.supabase.co/functions/v1/signature-webhook
   - Select events: signature_request_sent, signature_request_viewed, signature_request_signed, signature_request_all_signed, signature_request_declined

3. Test webhook locally:
   supabase functions serve signature-webhook

4. Use HelloSign test mode to trigger events
*/
