// =====================================================
// EDGE FUNCTION: Send Document for eSignature
// =====================================================
// Handles sending documents to HelloSign for signature
// Updates Supabase database with tracking information

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SendSignatureRequest {
  caseId: string
  documentType: string
  documentName: string
  signerName: string
  signerEmail: string
  signerPhone?: string
  unsignedDocumentUrl: string
  testMode?: boolean
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Parse request
    const body: SendSignatureRequest = await req.json()
    const {
      caseId,
      documentType,
      documentName,
      signerName,
      signerEmail,
      signerPhone,
      unsignedDocumentUrl,
      testMode = true
    } = body

    // Validate required fields
    if (!caseId || !documentType || !signerName || !signerEmail || !unsignedDocumentUrl) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log(`📤 Sending document for signature: ${documentName} for case ${caseId}`)

    // =====================================================
    // 1. SEND TO HELLOSIGN
    // =====================================================
    const helloSignApiKey = Deno.env.get('HELLOSIGN_API_KEY')
    
    if (!helloSignApiKey) {
      throw new Error('HELLOSIGN_API_KEY not configured')
    }

    // Prepare HelloSign request
    const helloSignPayload = {
      test_mode: testMode ? 1 : 0,
      title: `${documentName} - Case ${caseId}`,
      subject: `Please sign: ${documentName}`,
      message: `Dear ${signerName},\n\nPlease review and sign the attached ${documentName}. This document is required to proceed with arrangements.\n\nThank you for your prompt attention.\n\n- Rite Path Funeral Services`,
      
      signers: [{
        email_address: signerEmail,
        name: signerName,
        order: 0
      }],
      
      file_url: [unsignedDocumentUrl],
      
      // Metadata to track this request
      metadata: {
        case_id: caseId,
        document_type: documentType,
        app: 'rite-path'
      },
      
      // Signing options
      signing_options: {
        draw: true,
        type: true,
        upload: true,
        phone: false,
        default_type: 'draw'
      }
    }

    console.log('📨 Calling HelloSign API...')

    const helloSignResponse = await fetch('https://api.hellosign.com/v3/signature_request/send', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(helloSignApiKey + ':')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(helloSignPayload)
    })

    if (!helloSignResponse.ok) {
      const errorText = await helloSignResponse.text()
      console.error('❌ HelloSign API error:', errorText)
      throw new Error(`HelloSign API failed: ${errorText}`)
    }

    const helloSignData = await helloSignResponse.json()
    const signatureRequestId = helloSignData.signature_request.signature_request_id
    const signatureId = helloSignData.signature_request.signatures[0]?.signature_id

    console.log('✅ HelloSign request created:', signatureRequestId)

    // =====================================================
    // 2. CREATE SIGNATURE REQUEST RECORD IN SUPABASE
    // =====================================================
    const { data: signatureRequest, error: insertError } = await supabaseClient
      .from('signature_requests')
      .insert({
        case_id: caseId,
        document_type: documentType,
        document_name: documentName,
        esign_provider: 'hellosign',
        esign_request_id: signatureRequestId,
        esign_signature_id: signatureId,
        status: 'sent',
        signer_name: signerName,
        signer_email: signerEmail,
        signer_phone: signerPhone,
        unsigned_document_url: unsignedDocumentUrl,
        sent_at: new Date().toISOString(),
        metadata: helloSignData
      })
      .select()
      .single()

    if (insertError) {
      console.error('❌ Database insert error:', insertError)
      throw insertError
    }

    console.log('💾 Signature request saved to database:', signatureRequest.id)

    // =====================================================
    // 3. UPDATE CASE WITH SIGNATURE COUNT
    // =====================================================
    // Get current case data
    const { data: currentCase } = await supabaseClient
      .from('cases')
      .select('signatures_total')
      .eq('id', caseId)
      .single()

    // Increment signatures_total if needed
    if (currentCase) {
      await supabaseClient
        .from('cases')
        .update({
          signatures_total: (currentCase.signatures_total || 0) + 1
        })
        .eq('id', caseId)
    }

    // =====================================================
    // 4. LOG THE EVENT
    // =====================================================
    await supabaseClient
      .from('audit_log')
      .insert({
        case_id: caseId,
        event_type: 'signature_sent',
        event_category: 'signature',
        description: `Sent ${documentName} to ${signerName} (${signerEmail}) for signature`,
        actor_type: 'system',
        metadata: {
          signature_request_id: signatureRequestId,
          document_type: documentType
        }
      })

    // =====================================================
    // 5. RETURN SUCCESS RESPONSE
    // =====================================================
    return new Response(
      JSON.stringify({
        success: true,
        signatureRequestId: signatureRequest.id,
        esignRequestId: signatureRequestId,
        status: 'sent',
        message: `Document sent to ${signerEmail} for signature`
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('❌ Error in send-for-signature function:', error)
    
    return new Response(
      JSON.stringify({
        error: error.message,
        details: error.toString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

/* 
DEPLOYMENT NOTES:

1. Set environment variables in Supabase Dashboard:
   - HELLOSIGN_API_KEY: Your HelloSign API key

2. Deploy this function:
   supabase functions deploy send-for-signature

3. Test the function:
   curl -i --location --request POST 'https://YOUR_PROJECT.supabase.co/functions/v1/send-for-signature' \
     --header 'Authorization: Bearer YOUR_ANON_KEY' \
     --header 'Content-Type: application/json' \
     --data '{"caseId":"test-123","documentType":"body_release","documentName":"Body Release Form","signerName":"John Doe","signerEmail":"john@example.com","unsignedDocumentUrl":"https://example.com/doc.pdf"}'
*/
