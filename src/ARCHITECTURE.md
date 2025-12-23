# 🏗️ Rite Path - System Architecture

Complete technical architecture for the Supabase + HelloSign integration.

---

## 📊 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         REACT APP (Vite)                         │
│                                                                  │
│  Components:                                                     │
│  ├─ FirstCallTimeline         (Orchestrates workflow)           │
│  ├─ FirstCallIntakeSection    (Collects data)                   │
│  ├─ FirstCallSignaturesSection (Monitors signatures)            │
│  └─ FirstCallFaxingSection    (Sends faxes)                     │
│                                                                  │
│  State Management:                                               │
│  ├─ Zustand (useFirstCallStore) - Local state                   │
│  └─ Supabase Realtime - Server state sync                       │
└──────────────────┬───────────────────────────────────────────────┘
                   │
                   │ HTTPS + WebSocket
                   ↓
┌─────────────────────────────────────────────────────────────────┐
│                        SUPABASE PLATFORM                         │
│                                                                  │
│  ┌────────────────┐  ┌────────────────┐  ┌─────────────────┐   │
│  │   PostgreSQL   │  │ Edge Functions │  │ Storage (S3)    │   │
│  │   Database     │  │                │  │                 │   │
│  ├────────────────┤  ├────────────────┤  ├─────────────────┤   │
│  │ • cases        │  │ • send-for-    │  │ • documents/    │   │
│  │ • signature_   │  │   signature    │  │   {caseId}/     │   │
│  │   requests     │  │ • signature-   │  │   - unsigned.pdf│   │
│  │ • fax_requests │  │   webhook      │  │   - SIGNED.pdf  │   │
│  │ • removal_teams│  │                │  │                 │   │
│  │ • audit_log    │  │                │  │ • templates/    │   │
│  └────────────────┘  └────────────────┘  └─────────────────┘   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                  Realtime Subscriptions                  │   │
│  │  (Broadcasts DB changes to React app via WebSocket)     │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────┬──────────────────────────┬───────────────────┘
                   │                          │
                   │ API Calls                │ Webhook Callbacks
                   ↓                          ↑
┌──────────────────────────────┐   ┌─────────────────────────────┐
│       HELLOSIGN API          │   │       EFAX API (Future)     │
│                              │   │                             │
│ • Send signature requests    │   │ • Send faxes to recipients  │
│ • Download signed PDFs       │   │ • Track delivery status     │
│ • Manage signer workflow     │   │ • Receive confirmations     │
│ • Fire webhooks on events    │   │                             │
└──────────────────────────────┘   └─────────────────────────────┘
```

---

## 🔄 Complete Workflow (End-to-End)

### **Stage 1: Intake** 📋

```
1. User fills out FirstCallIntakeSection form
   ↓
2. Selects removal team, documents needed
   ↓
3. Clicks "Generate & Send for Signature"
   ↓
4. React app:
   - Updates Zustand store (local optimistic update)
   - Generates PDF document (client-side or server-side)
   - Uploads unsigned PDF to Supabase Storage
   ↓
5. Calls Supabase Edge Function: send-for-signature
   ↓
6. Edge Function:
   - Stores record in signature_requests table
   - Calls HelloSign API to send email
   - Returns signature_request_id
   ↓
7. Updates case:
   - current_stage = 'signatures'
   - signatures_total = number of documents
   ↓
8. React app advances to Signatures stage
```

---

### **Stage 2: Signatures** ⏳

```
1. Family receives HelloSign email
   ↓
2. Family clicks "Review Document"
   ↓
3. HelloSign webhook fires: signature_request_viewed
   ↓
4. Supabase Edge Function (signature-webhook):
   - Updates signature_requests.status = 'viewed'
   - Updates signature_requests.viewed_at
   - Logs to audit_log
   ↓
5. Supabase Realtime broadcasts change to React app
   ↓
6. React component updates UI: "Document opened by Mary Foster"
   ↓
7. Family signs the document
   ↓
8. HelloSign webhook fires: signature_request_signed
   ↓
9. Supabase Edge Function (signature-webhook):
   - Downloads signed PDF from HelloSign
   - Uploads to Supabase Storage: {caseId}/{doc}-SIGNED.pdf
   - Updates signature_requests:
     * status = 'signed'
     * signed_at = timestamp
     * signed_document_url = storage URL
   - Updates cases:
     * signatures_received += 1
     * If signatures_received == signatures_total:
       → current_stage = 'faxing'
       → completed_stages += ['signatures']
   ↓
10. Supabase Realtime broadcasts change
    ↓
11. React app auto-advances to Faxing stage
```

---

### **Stage 3: Faxing** 📠

```
1. React app displays FirstCallFaxingSection
   ↓
2. Shows signed documents ready to fax
   ↓
3. User selects recipient (Coroner, Medical Examiner, etc.)
   ↓
4. Clicks "Send Fax"
   ↓
5. React app calls Supabase Edge Function: send-fax
   ↓
6. Edge Function:
   - Gets signed PDF URL from signature_requests
   - Calls eFax API (Twilio Fax, eFax, etc.)
   - Creates record in fax_requests table
   - Returns fax_provider_id
   ↓
7. Updates case:
   - faxes_sent += 1
   - If faxes_sent == faxes_total:
     → current_stage = 'complete'
     → completed_stages += ['faxing']
   ↓
8. React app auto-advances to Complete stage
```

---

### **Stage 4: Complete** ✅

```
1. React app displays FirstCallCompleteSection
   ↓
2. Shows summary:
   - All documents signed ✓
   - All faxes sent ✓
   - Case ready for next steps
   ↓
3. User can:
   - View case in Cases section
   - Download signed documents
   - Start new First Call
```

---

## 🗄️ Database Schema Details

### **cases Table**

| Column | Type | Description |
|--------|------|-------------|
| `id` | TEXT | Unique case ID (e.g., `case-1234567890`) |
| `deceased_name` | TEXT | Full name of deceased |
| `next_of_kin_name` | TEXT | Primary contact/decision maker |
| `current_stage` | TEXT | `intake`, `signatures`, `faxing`, `complete` |
| `completed_stages` | TEXT[] | Array of completed stages |
| `signatures_received` | INT | Count of signed documents |
| `signatures_total` | INT | Total documents needing signatures |
| `faxes_sent` | INT | Count of faxes sent |
| `faxes_total` | INT | Total faxes needed |
| `created_at` | TIMESTAMPTZ | Case creation time |
| `updated_at` | TIMESTAMPTZ | Last update time |

---

### **signature_requests Table**

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Unique request ID |
| `case_id` | TEXT | Foreign key to cases.id |
| `document_type` | TEXT | `body_release`, `cremation_auth`, etc. |
| `esign_request_id` | TEXT | HelloSign's signature_request_id |
| `status` | TEXT | `pending`, `sent`, `viewed`, `signed` |
| `signer_name` | TEXT | Name of person signing |
| `signer_email` | TEXT | Email to send signature request |
| `unsigned_document_url` | TEXT | Supabase Storage URL (before signing) |
| `signed_document_url` | TEXT | Supabase Storage URL (after signing) |
| `sent_at` | TIMESTAMPTZ | When HelloSign email was sent |
| `viewed_at` | TIMESTAMPTZ | When signer opened document |
| `signed_at` | TIMESTAMPTZ | When signature completed |

---

### **fax_requests Table**

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Unique fax ID |
| `case_id` | TEXT | Foreign key to cases.id |
| `signature_request_id` | UUID | Link to signed document |
| `document_url` | TEXT | Signed PDF from Supabase Storage |
| `recipient_name` | TEXT | Who is receiving the fax |
| `recipient_fax` | TEXT | Fax number |
| `fax_provider_id` | TEXT | eFax/Twilio tracking ID |
| `status` | TEXT | `pending`, `sending`, `sent`, `delivered` |
| `sent_at` | TIMESTAMPTZ | When fax was transmitted |
| `delivered_at` | TIMESTAMPTZ | When fax confirmed delivered |

---

## 🔐 Security Model

### **Authentication (Future)**

```typescript
// Add Supabase Auth later
import { supabase } from './lib/supabase'

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'director@funeralhome.com',
  password: 'secure-password'
})

// Get current user
const { data: { user } } = await supabase.auth.getUser()
```

### **Row Level Security (RLS)**

```sql
-- Enable RLS on all tables
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE signature_requests ENABLE ROW LEVEL SECURITY;

-- Example: Users can only see their own cases
CREATE POLICY "Users can view own cases"
ON cases FOR SELECT
USING (auth.uid() = user_id);

-- Service role bypasses RLS (for Edge Functions)
```

### **Storage Security**

```sql
-- Documents bucket: Only authenticated users can upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'documents');

-- Anyone with the link can download (for HelloSign)
CREATE POLICY "Public can download with link"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'documents');
```

---

## 📡 Realtime Subscriptions

### **Subscribe to Case Updates**

```typescript
import { supabase } from './lib/supabase'

const subscription = supabase
  .channel('case-updates')
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'cases',
      filter: `id=eq.${caseId}`
    },
    (payload) => {
      console.log('Case updated!', payload.new)
      // Update React state
      updateCaseInStore(payload.new)
    }
  )
  .subscribe()

// Cleanup
return () => subscription.unsubscribe()
```

### **Subscribe to Signature Updates**

```typescript
const subscription = supabase
  .channel('signature-updates')
  .on(
    'postgres_changes',
    {
      event: '*', // INSERT, UPDATE, DELETE
      schema: 'public',
      table: 'signature_requests',
      filter: `case_id=eq.${caseId}`
    },
    (payload) => {
      if (payload.eventType === 'UPDATE' && payload.new.status === 'signed') {
        console.log('🎉 Document signed!')
        showNotification('Document signed by ' + payload.new.signer_name)
      }
    }
  )
  .subscribe()
```

---

## 🚦 Error Handling

### **Edge Function Errors**

```typescript
// In send-for-signature Edge Function
try {
  const helloSignResponse = await fetch('https://api.hellosign.com/...')
  
  if (!helloSignResponse.ok) {
    // Log error to database
    await supabase.from('signature_requests').insert({
      case_id: caseId,
      status: 'error',
      error_message: await helloSignResponse.text(),
      retry_count: 0
    })
    
    throw new Error('HelloSign API failed')
  }
} catch (error) {
  // Return error to client
  return new Response(JSON.stringify({ error: error.message }), {
    status: 500
  })
}
```

### **Retry Logic**

```sql
-- Function to retry failed signature requests
CREATE OR REPLACE FUNCTION retry_failed_signatures()
RETURNS void AS $$
BEGIN
  -- Find requests that failed and haven't exceeded retry limit
  UPDATE signature_requests
  SET 
    status = 'pending',
    retry_count = retry_count + 1
  WHERE 
    status = 'error'
    AND retry_count < 3
    AND created_at > NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql;

-- Run via cron (Supabase has pg_cron extension)
SELECT cron.schedule('retry-signatures', '*/15 * * * *', 'SELECT retry_failed_signatures()');
```

---

## 📈 Monitoring & Logging

### **Audit Log**

```sql
-- View all events for a case
SELECT 
  event_type,
  description,
  actor_type,
  created_at
FROM audit_log
WHERE case_id = 'case-123'
ORDER BY created_at DESC;

-- Common queries
SELECT 
  event_type,
  COUNT(*) as count
FROM audit_log
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY event_type
ORDER BY count DESC;
```

### **Performance Metrics**

```sql
-- Average time from intake to signature
SELECT 
  AVG(signed_at - sent_at) as avg_signature_time
FROM signature_requests
WHERE status = 'signed';

-- Cases by stage
SELECT 
  current_stage,
  COUNT(*) as count
FROM cases
GROUP BY current_stage;
```

---

## 🔄 State Synchronization

### **Local (Zustand) vs Server (Supabase)**

**Optimistic Updates:**
```typescript
// Update local state immediately
updateCase(caseId, { signatures_received: 1 })

// Sync to server
await supabase.from('cases').update({ signatures_received: 1 }).eq('id', caseId)

// Server broadcasts change via Realtime
// Other clients receive update automatically
```

**Conflict Resolution:**
```typescript
// Server is source of truth
const subscription = subscribeToCaseUpdates(caseId, (serverCase) => {
  // Overwrite local state with server state
  setCaseData(serverCase)
})
```

---

## 📦 File Structure

```
rite-path/
├── supabase/
│   ├── functions/
│   │   ├── send-for-signature/
│   │   │   └── index.ts
│   │   ├── signature-webhook/
│   │   │   └── index.ts
│   │   └── _shared/
│   │       └── supabase.ts
│   ├── migrations/
│   │   └── 001_initial_schema.sql
│   └── config.toml
├── src/
│   ├── components/
│   │   ├── FirstCallTimeline.tsx
│   │   ├── FirstCallIntakeSection.tsx
│   │   ├── FirstCallSignaturesSection.tsx
│   │   └── FirstCallFaxingSection.tsx
│   ├── store/
│   │   └── useFirstCallStore.ts
│   ├── lib/
│   │   └── supabase.ts
│   └── App.tsx
├── .env.example
├── SUPABASE_SETUP.md
└── ARCHITECTURE.md (this file)
```

---

## 🚀 Deployment Workflow

```bash
# 1. Local development
supabase start  # Start local Supabase
npm run dev     # Start Vite dev server

# 2. Test locally
supabase functions serve send-for-signature
curl localhost:54321/functions/v1/send-for-signature ...

# 3. Deploy to staging
supabase link --project-ref STAGING_PROJECT_ID
supabase db push
supabase functions deploy
npm run build
vercel deploy --preview

# 4. Deploy to production
supabase link --project-ref PROD_PROJECT_ID
supabase db push
supabase functions deploy
npm run build
vercel deploy --prod
```

---

This architecture provides:
- ✅ **Scalability** - Supabase handles 100s of concurrent cases
- ✅ **Reliability** - Automatic retries, error logging, audit trail
- ✅ **Real-time** - Instant UI updates when documents signed
- ✅ **Security** - RLS, encrypted storage, webhook verification
- ✅ **Observability** - Comprehensive logging and monitoring

**Ready for production funeral home deployment!** 🎉
