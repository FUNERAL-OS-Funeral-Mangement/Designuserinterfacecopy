# 📊 Rite Path - Visual Flow Diagrams

Easy-to-understand diagrams showing how everything works together.

---

## 🔄 Complete eSignature Flow

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  STAGE 1: INTAKE                                         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

User fills form in React App
├─ Deceased name: "John Smith"
├─ Next of kin: "Mary Foster"
├─ Email: mary@example.com
└─ Selects documents: [Body Release, Cremation Auth]

         ↓ Click "Generate & Send for Signature"

React App uploads unsigned PDFs to Supabase Storage
├─ /documents/case-123/body-release-unsigned.pdf
└─ /documents/case-123/cremation-auth-unsigned.pdf

         ↓ Calls Edge Function

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  EDGE FUNCTION: send-for-signature                       ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

1. Insert record into signature_requests table:
   {
     case_id: "case-123",
     document_type: "body_release",
     signer_email: "mary@example.com",
     status: "pending"
   }

2. Call HelloSign API:
   POST https://api.hellosign.com/v3/signature_request/send
   {
     signers: [{ email: "mary@example.com", name: "Mary Foster" }],
     file_url: "https://...unsigned.pdf",
     title: "Body Release Form - Case 123"
   }

3. HelloSign returns:
   {
     signature_request_id: "abc123xyz",
     signatures: [{ signature_id: "sig_789" }]
   }

4. Update database:
   UPDATE signature_requests
   SET esign_request_id = 'abc123xyz',
       status = 'sent',
       sent_at = NOW()

5. Return to React App:
   { success: true, signatureRequestId: "abc123xyz" }

         ↓

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  STAGE 2: SIGNATURES (Waiting Period)                    ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

React App shows:
┌─────────────────────────────────────────┐
│ ⏳ Waiting on Signatures                │
│                                         │
│ Documents sent to: mary@example.com     │
│ Progress: 0 / 2 documents signed        │
│                                         │
│ [▱▱▱▱▱▱▱▱▱▱] 0%                        │
└─────────────────────────────────────────┘

         ↓ Meanwhile...

Mary receives email from HelloSign:
┌─────────────────────────────────────────┐
│ From: HelloSign <no-reply@hellosign...> │
│ Subject: Please sign: Body Release Form │
│                                         │
│ Dear Mary Foster,                       │
│                                         │
│ Please review and sign the attached...  │
│                                         │
│ [Review Document] ←─ Mary clicks here   │
└─────────────────────────────────────────┘

         ↓ HelloSign webhook fires

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  EVENT: signature_request_viewed                         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

POST https://your-project.supabase.co/functions/v1/signature-webhook
{
  "event": {
    "event_type": "signature_request_viewed",
    "event_time": 1234567890
  },
  "signature_request": {
    "signature_request_id": "abc123xyz"
  }
}

Edge Function updates database:
UPDATE signature_requests
SET status = 'viewed',
    viewed_at = NOW()
WHERE esign_request_id = 'abc123xyz'

         ↓ Supabase Realtime broadcasts change

React App updates UI:
┌─────────────────────────────────────────┐
│ ⏳ Waiting on Signatures                │
│                                         │
│ 👀 Document opened by Mary Foster       │
│ Progress: 0 / 2 documents signed        │
│                                         │
│ [▱▱▱▱▱▱▱▱▱▱] 0%                        │
└─────────────────────────────────────────┘

         ↓ Mary signs the document

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  EVENT: signature_request_signed                         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

POST https://your-project.supabase.co/functions/v1/signature-webhook
{
  "event": {
    "event_type": "signature_request_signed",
    "event_time": 1234567900
  },
  "signature_request": {
    "signature_request_id": "abc123xyz",
    "signatures": [...]
  }
}

Edge Function:

1. Download signed PDF from HelloSign:
   GET https://api.hellosign.com/v3/signature_request/files/abc123xyz
   Authorization: Basic base64(API_KEY:)
   
   → Returns PDF binary data (234 KB)

2. Upload to Supabase Storage:
   POST /storage/v1/object/documents/case-123/body-release-SIGNED.pdf
   Content-Type: application/pdf
   
   → Stored at: https://...supabase.co/.../body-release-SIGNED.pdf

3. Update signature_requests table:
   UPDATE signature_requests
   SET status = 'signed',
       signed_at = NOW(),
       signed_document_url = 'https://...SIGNED.pdf'
   WHERE esign_request_id = 'abc123xyz'

4. Update cases table:
   UPDATE cases
   SET signatures_received = signatures_received + 1
   WHERE id = 'case-123'
   
   → Now: signatures_received = 1, signatures_total = 2

         ↓ Supabase Realtime broadcasts change

React App updates UI:
┌─────────────────────────────────────────┐
│ ⏳ Waiting on Signatures                │
│                                         │
│ ✅ Body Release Form - Signed!          │
│ ⏳ Cremation Auth - Pending             │
│ Progress: 1 / 2 documents signed        │
│                                         │
│ [████████▱▱] 50%                        │
└─────────────────────────────────────────┘

         ↓ Mary signs second document (same flow)

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  ALL SIGNATURES COMPLETE                                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Database trigger fires:
UPDATE cases
SET current_stage = 'faxing',
    completed_stages = array_append(completed_stages, 'signatures'),
    status = 'faxing-in-progress'
WHERE id = 'case-123'
  AND signatures_received >= signatures_total

         ↓ Supabase Realtime broadcasts

React App AUTO-ADVANCES:
┌─────────────────────────────────────────┐
│ 📠 Send Required Faxes                  │
│                                         │
│ All documents signed! ✓                 │
│ Ready to send faxes to authorities.     │
│                                         │
│ [Send Fax to County Coroner]            │
└─────────────────────────────────────────┘
```

---

## 📡 Realtime Updates Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  USER A (Funeral Director at desk)                              │
└─────────────────────────────────────────────────────────────────┘
                          ↓
                React App subscribes to case-123 changes
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│  SUPABASE REALTIME (WebSocket Server)                           │
│  Listening for changes to cases table...                        │
└─────────────────────────────────────────────────────────────────┘
                          ↑
                          │ Broadcasts changes
                          │
┌─────────────────────────┴───────────────────────────────────────┐
│  EDGE FUNCTION: signature-webhook                               │
│  Updates case: signatures_received = 1                          │
└─────────────────────────────────────────────────────────────────┘
                          ↓
                Realtime broadcasts: { 
                  type: "UPDATE",
                  table: "cases",
                  record: { id: "case-123", signatures_received: 1 }
                }
                          ↓
                          ↓
┌─────────────────────────┴───────────────────┐
│  USER A's React App receives update         │
│  useEffect(() => {                          │
│    const sub = supabase.channel(...)        │
│      .on('postgres_changes', callback)      │
│    return () => sub.unsubscribe()           │
│  })                                         │
│                                             │
│  → UI updates: "1 / 2 documents signed"     │
│  → Progress bar moves to 50%                │
│  → Toast: "Body Release Form signed!"       │
└─────────────────────────────────────────────┘

Meanwhile...

┌─────────────────────────────────────────────┐
│  USER B (Funeral Director on mobile)        │
│  Also viewing the same case                 │
│                                             │
│  → ALSO receives the update instantly!      │
│  → UI syncs automatically                   │
│  → No refresh needed                        │
└─────────────────────────────────────────────┘

⏱️ Latency: ~50-200ms (faster than human perception!)
```

---

## 🗄️ Database Tables Relationship

```
┌─────────────────────────────────────────────────────────┐
│  cases                                                  │
├─────────────────────────────────────────────────────────┤
│  id (PK)              "case-123"                        │
│  deceased_name        "John Smith"                      │
│  next_of_kin_name     "Mary Foster"                     │
│  current_stage        "signatures"                      │
│  signatures_received  1                                 │
│  signatures_total     2                                 │
└────────────┬────────────────────────────────────────────┘
             │
             │ Foreign Key: case_id
             │
             ↓
┌─────────────────────────────────────────────────────────┐
│  signature_requests                                     │
├─────────────────────────────────────────────────────────┤
│  id (PK)              uuid-abc                          │
│  case_id (FK)         "case-123"  ←────────────────┐    │
│  document_type        "body_release"                │    │
│  esign_request_id     "hellosign_abc123"            │    │
│  status               "signed"                       │    │
│  signer_email         "mary@example.com"            │    │
│  signed_document_url  "https://...SIGNED.pdf"       │    │
│  signed_at            2024-01-15 10:30:00           │    │
└─────────────────────────────────────────────────────┘    │
                                                           │
┌─────────────────────────────────────────────────────────┤
│  signature_requests (record 2)                          │
├─────────────────────────────────────────────────────────┤
│  id (PK)              uuid-xyz                          │
│  case_id (FK)         "case-123"  ←────────────────────┘
│  document_type        "cremation_auth"
│  esign_request_id     "hellosign_xyz789"
│  status               "sent"
│  signer_email         "mary@example.com"
│  sent_at              2024-01-15 10:25:00
└─────────────────────────────────────────────────────────┘
             │
             │ Foreign Key: signature_request_id
             │
             ↓
┌─────────────────────────────────────────────────────────┐
│  fax_requests (after signing complete)                  │
├─────────────────────────────────────────────────────────┤
│  id (PK)              uuid-fax1                         │
│  case_id (FK)         "case-123"                        │
│  signature_req_id     uuid-abc                          │
│  recipient_name       "County Coroner"                  │
│  recipient_fax        "(555) 123-4567"                  │
│  status               "sent"                            │
│  document_url         "https://...SIGNED.pdf"           │
└─────────────────────────────────────────────────────────┘
             │
             │ Both FK to same case
             │
             ↓
┌─────────────────────────────────────────────────────────┐
│  audit_log                                              │
├─────────────────────────────────────────────────────────┤
│  case_id (FK)         "case-123"                        │
│  event_type           "signature_sent"                  │
│  description          "Sent Body Release to Mary..."    │
│  created_at           2024-01-15 10:25:00               │
├─────────────────────────────────────────────────────────┤
│  case_id (FK)         "case-123"                        │
│  event_type           "signature_received"              │
│  description          "Document signed: body_release"   │
│  created_at           2024-01-15 10:30:00               │
├─────────────────────────────────────────────────────────┤
│  case_id (FK)         "case-123"                        │
│  event_type           "stage_advanced"                  │
│  description          "Auto-advanced to faxing"         │
│  created_at           2024-01-15 10:35:00               │
└─────────────────────────────────────────────────────────┘
```

---

## 🔐 Security Flow

```
┌─────────────────────────────────────────────────────────┐
│  HELLOSIGN sends webhook                                │
└────────────────┬────────────────────────────────────────┘
                 │
                 ↓ POST /functions/v1/signature-webhook
                 ↓ Headers: { ... }
                 ↓ Body: { event: {...}, signature_request: {...} }
                 ↓
┌────────────────────────────────────────────────────────┐
│  EDGE FUNCTION: signature-webhook                      │
│                                                        │
│  1. VERIFY WEBHOOK SIGNATURE                           │
│     const eventHash = payload.event.event_hash         │
│     const calculatedHash = hmac_sha256(               │
│       apiKey,                                          │
│       eventTime + eventType                            │
│     )                                                  │
│                                                        │
│     if (calculatedHash !== eventHash) {                │
│       return 401 Unauthorized ←─ REJECT!              │
│     }                                                  │
│                                                        │
│  2. VALIDATE REQUEST FORMAT                            │
│     if (!signature_request_id) {                       │
│       return 400 Bad Request                           │
│     }                                                  │
│                                                        │
│  3. USE SERVICE ROLE KEY                               │
│     const supabase = createClient(                     │
│       url,                                             │
│       SERVICE_ROLE_KEY  ← Bypasses RLS                │
│     )                                                  │
│                                                        │
│  4. DOWNLOAD FROM HELLOSIGN                            │
│     Authorization: Basic base64(API_KEY:)              │
│     ← Only with valid API key                         │
│                                                        │
│  5. UPLOAD TO PRIVATE BUCKET                           │
│     Storage bucket: documents                          │
│     Public: NO                                         │
│     Access: Via signed URLs only                       │
│                                                        │
│  6. LOG ALL ACTIONS                                    │
│     INSERT INTO audit_log (...)                        │
└────────────────────────────────────────────────────────┘
```

---

## 📦 Storage Organization

```
Supabase Storage
│
├─ documents/ (bucket - private)
│  │
│  ├─ case-2024-01-001/
│  │  ├─ body-release-unsigned.pdf          ← Generated by app
│  │  ├─ body-release-SIGNED-1705320000.pdf ← From HelloSign
│  │  ├─ cremation-auth-unsigned.pdf
│  │  └─ cremation-auth-SIGNED-1705320100.pdf
│  │
│  ├─ case-2024-01-002/
│  │  ├─ body-release-unsigned.pdf
│  │  └─ body-release-SIGNED-1705321000.pdf
│  │
│  └─ case-2024-01-003/
│     └─ ... (similar structure)
│
└─ templates/ (bucket - private)
   ├─ body-release-template.pdf      ← Master templates
   ├─ cremation-auth-template.pdf
   └─ transport-permit-template.pdf

Access Control:
├─ Unsigned PDFs: Accessible by HelloSign via public URL
├─ Signed PDFs: Accessible via Supabase signed URLs only
└─ Templates: Internal use only (service role access)
```

---

## ⚡ Performance Timeline

```
Action                          Time        Cumulative
─────────────────────────────────────────────────────────
User clicks "Send for Signature"  0ms         0ms
  ↓
React uploads PDF to Storage      200ms       200ms
  ↓
Edge Function called              50ms        250ms
  ↓
Edge Function → HelloSign API     300ms       550ms
  ↓
HelloSign sends email             1000ms      1.5s
  ↓
User receives email notification  5000ms      6.5s
  ↓
─────────────────────────────────────────────────────────
User opens email                  +2min       ~2min
  ↓
User clicks "Review Document"     100ms       ~2min
  ↓
HelloSign webhook fires           50ms        ~2min
  ↓
Edge Function updates DB          100ms       ~2min
  ↓
Realtime broadcasts change        50ms        ~2min
  ↓
React UI updates                  16ms        ~2min
─────────────────────────────────────────────────────────
User signs document               +30sec      ~2.5min
  ↓
HelloSign webhook fires           50ms        ~2.5min
  ↓
Edge Function downloads PDF       500ms       ~2.5min
  ↓
Edge Function uploads to Storage  300ms       ~2.5min
  ↓
Edge Function updates DB          100ms       ~2.5min
  ↓
Realtime broadcasts change        50ms        ~2.5min
  ↓
React auto-advances stage         16ms        ~2.5min
─────────────────────────────────────────────────────────

Total time: Initial send to auto-advance = ~2.5 minutes
(Actual family signature time varies: 5 min - 2 hours)
```

---

## 🔄 Error Recovery Flow

```
┌─────────────────────────────────────────────────────────┐
│  SCENARIO: HelloSign API timeout                        │
└─────────────────────────────────────────────────────────┘

Edge Function: send-for-signature
  ↓
try {
  const response = await fetch('https://api.hellosign.com/...')
  // Network timeout after 30 seconds
} catch (error) {
  ↓
  1. Log error to Supabase:
     INSERT INTO signature_requests (
       status = 'error',
       error_message = 'HelloSign timeout',
       retry_count = 0
     )
  
  2. Return error to React:
     return { error: 'Failed to send signature request' }
  
  3. React shows user-friendly message:
     ┌────────────────────────────────────┐
     │ ⚠️ Unable to send document         │
     │                                    │
     │ The signature service is           │
     │ temporarily unavailable.           │
     │                                    │
     │ [Retry]  [Try Later]               │
     └────────────────────────────────────┘
}

┌─────────────────────────────────────────────────────────┐
│  AUTOMATIC RETRY (via cron job)                         │
└─────────────────────────────────────────────────────────┘

Every 15 minutes:
SELECT * FROM signature_requests
WHERE status = 'error'
  AND retry_count < 3
  AND created_at > NOW() - INTERVAL '24 hours'

For each failed request:
  ↓ Call send-for-signature again
  ↓ Increment retry_count
  ↓ If retry_count = 3:
      → Send notification to funeral director
      → Flag for manual review
```

---

These diagrams show the complete flow from user action to database storage, including all the automatic processes that happen behind the scenes! 🎉
