// =====================================================
// SUPABASE CLIENT - React App
// =====================================================
// Client-side Supabase configuration
// Integrates with Clerk for authentication

import { createClient } from '@supabase/supabase-js'

// Safe environment variable access with fallbacks
const supabaseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || ''
const supabaseAnonKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || ''

// Create a dummy client if credentials are missing (for development)
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase credentials not found. Using mock client.')
    console.warn('📝 Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file')
    
    // Return a mock client for development (prevents crashes)
    return createClient(
      'https://placeholder.supabase.co',
      'placeholder-anon-key'
    )
  }
  
  return createClient(supabaseUrl, supabaseAnonKey)
}

export const supabase = createSupabaseClient()

// =====================================================
// CLERK + SUPABASE INTEGRATION (OPTIONAL)
// =====================================================
// If you want to use Clerk user tokens with Supabase RLS:
//
// import { useAuth } from '@clerk/clerk-react'
//
// export function useSupabaseClient() {
//   const { getToken } = useAuth()
//   
//   return createClient(supabaseUrl, supabaseAnonKey, {
//     global: {
//       headers: async () => {
//         const token = await getToken({ template: 'supabase' })
//         return { Authorization: `Bearer ${token}` }
//       }
//     }
//   })
// }

// =====================================================
// TYPE DEFINITIONS
// =====================================================

export interface Case {
  id: string
  deceased_name: string
  next_of_kin_name: string
  family_contact_name?: string
  caller_name?: string
  caller_phone?: string
  caller_relationship?: string
  address?: string
  status: string
  current_stage: string
  completed_stages: string[]
  intake_complete: boolean
  documents_generated: number
  signatures_received: number
  signatures_total: number
  faxes_sent: number
  faxes_total: number
  time_of_death?: string
  metadata?: any
  created_at: string
  updated_at: string
}

export interface SignatureRequest {
  id: string
  case_id: string
  document_type: string
  document_name: string
  esign_provider: string
  esign_request_id?: string
  esign_signature_id?: string
  status: string
  signer_name: string
  signer_email: string
  signer_phone?: string
  signer_role?: string
  unsigned_document_url?: string
  signed_document_url?: string
  created_at: string
  sent_at?: string
  delivered_at?: string
  viewed_at?: string
  signed_at?: string
  completed_at?: string
  error_message?: string
  retry_count: number
  metadata?: any
}

export interface FaxRequest {
  id: string
  case_id: string
  signature_request_id?: string
  document_type: string
  document_name: string
  document_url: string
  recipient_name: string
  recipient_fax: string
  recipient_type?: string
  fax_provider: string
  fax_provider_id?: string
  status: string
  created_at: string
  queued_at?: string
  sent_at?: string
  delivered_at?: string
  error_message?: string
  retry_count: number
  metadata?: any
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

/**
 * Send a document for eSignature
 */
export async function sendForSignature(params: {
  caseId: string
  documentType: string
  documentName: string
  signerName: string
  signerEmail: string
  signerPhone?: string
  unsignedDocumentUrl: string
  testMode?: boolean
}) {
  const { data, error } = await supabase.functions.invoke('send-for-signature', {
    body: params
  })

  if (error) throw error
  return data
}

/**
 * Get all signature requests for a case
 */
export async function getSignatureRequests(caseId: string) {
  const { data, error } = await supabase
    .from('signature_requests')
    .select('*')
    .eq('case_id', caseId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as SignatureRequest[]
}

/**
 * Get a single case by ID
 */
export async function getCase(caseId: string) {
  const { data, error } = await supabase
    .from('cases')
    .select('*')
    .eq('id', caseId)
    .single()

  if (error) throw error
  return data as Case
}

/**
 * Update a case
 */
export async function updateCase(caseId: string, updates: Partial<Case>) {
  const { data, error } = await supabase
    .from('cases')
    .update(updates)
    .eq('id', caseId)
    .select()
    .single()

  if (error) throw error
  return data as Case
}

/**
 * Create a new case
 */
export async function createCase(caseData: Partial<Case>) {
  const { data, error } = await supabase
    .from('cases')
    .insert(caseData)
    .select()
    .single()

  if (error) throw error
  return data as Case
}

/**
 * Subscribe to case updates via Realtime
 */
export function subscribeToCaseUpdates(
  caseId: string,
  callback: (case_: Case) => void
) {
  return supabase
    .channel(`case-${caseId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'cases',
        filter: `id=eq.${caseId}`
      },
      (payload) => callback(payload.new as Case)
    )
    .subscribe()
}

/**
 * Subscribe to signature request updates
 */
export function subscribeToSignatureUpdates(
  caseId: string,
  callback: (signatureRequest: SignatureRequest) => void
) {
  return supabase
    .channel(`signatures-${caseId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'signature_requests',
        filter: `case_id=eq.${caseId}`
      },
      (payload) => {
        if (payload.new) {
          callback(payload.new as SignatureRequest)
        }
      }
    )
    .subscribe()
}

/**
 * Upload a file to Supabase Storage
 */
export async function uploadDocument(
  caseId: string,
  filename: string,
  file: File | Blob
) {
  const path = `${caseId}/${filename}`
  
  const { data, error } = await supabase.storage
    .from('documents')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true
    })

  if (error) throw error

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('documents')
    .getPublicUrl(path)

  return { path: data.path, url: publicUrl }
}

/**
 * Download a document from Supabase Storage
 */
export async function downloadDocument(path: string) {
  const { data, error } = await supabase.storage
    .from('documents')
    .download(path)

  if (error) throw error
  return data
}