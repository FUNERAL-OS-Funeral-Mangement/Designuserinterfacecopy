# 🚀 Supabase + HelloSign Setup Guide

Complete guide to deploy Rite Path with real eSignature integration.

---

## 📋 Prerequisites

- Node.js 18+ installed
- Supabase account (free tier works)
- HelloSign account (free trial: 3 signatures/month, or paid plan)
- Git installed

---

## Part 1: Supabase Setup (15 minutes)

### **Step 1: Create Supabase Project**

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"** → Sign in
3. Click **"New Project"**
   - Organization: Create or select
   - Name: `rite-path-production`
   - Database Password: *Generate strong password* (save this!)
   - Region: Choose closest to your users
   - Plan: Free tier is fine to start

4. Wait 2-3 minutes for project to provision

---

### **Step 2: Install Supabase CLI**

```bash
# macOS/Linux
brew install supabase/tap/supabase

# Windows (using Scoop)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Or use NPM (any OS)
npm install -g supabase
```

**Verify installation:**
```bash
supabase --version
```

---

### **Step 3: Link Your Project**

```bash
# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_ID
```

**Find your project ID:**
- Go to your Supabase dashboard
- Look at URL: `https://app.supabase.com/project/YOUR_PROJECT_ID`
- Or: Settings → General → Reference ID

---

### **Step 4: Run Database Migration**

```bash
# Push the schema to your Supabase database
supabase db push

# Or if you prefer migrations:
supabase migration up
```

This creates all tables:
- ✅ `cases`
- ✅ `signature_requests`
- ✅ `fax_requests`
- ✅ `removal_teams`
- ✅ `document_templates`
- ✅ `audit_log`

**Verify in Supabase Dashboard:**
- Go to Table Editor
- You should see all 6 tables

---

### **Step 5: Create Storage Buckets**

**Option A: Via Dashboard (Easier)**

1. Go to **Storage** in Supabase Dashboard
2. Click **"New bucket"**
   - Name: `documents`
   - Public: **No** (keep private)
   - Click **Create bucket**

3. Repeat for `templates` bucket

**Option B: Via SQL (Advanced)**

```sql
-- In SQL Editor, run:
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('documents', 'documents', false),
  ('templates', 'templates', false);
```

---

### **Step 6: Set Storage Policies**

Go to **Storage → documents → Policies**

```sql
-- Allow authenticated uploads
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'documents');

-- Allow authenticated reads
CREATE POLICY "Allow authenticated reads"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'documents');

-- For now, allow public reads (adjust later)
CREATE POLICY "Allow public reads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'documents');
```

---

## Part 2: HelloSign Setup (10 minutes)

### **Step 1: Create HelloSign Account**

1. Go to [hellosign.com](https://www.hellosign.com)
2. Click **"Sign Up"** or **"Get Started"**
3. Choose plan:
   - **Free Trial**: 3 signature requests (for testing)
   - **Essentials**: $15/month (unlimited signatures)
   - **Standard**: $25/month (teams)

---

### **Step 2: Get API Key**

1. Log into HelloSign
2. Go to **Settings** → **API**
   - Or direct link: [app.hellosign.com/home/myAccount#api](https://app.hellosign.com/home/myAccount#api)
3. Click **"Reveal"** under **API Key**
4. **Copy the API key** (save it securely!)

---

### **Step 3: Enable API Access**

If you see "API access not enabled":
1. Go to **Settings** → **API**
2. Click **"Enable API Access"**
3. Accept the terms

---

### **Step 4: Configure Webhook URL**

1. Still in **Settings** → **API**
2. Scroll to **"Event Callbacks (Webhooks)"**
3. Enter webhook URL:
   ```
   https://YOUR_PROJECT_ID.supabase.co/functions/v1/signature-webhook
   ```
   (Replace `YOUR_PROJECT_ID` with your actual Supabase project ID)

4. Select events to monitor:
   - ✅ `signature_request_sent`
   - ✅ `signature_request_viewed`
   - ✅ `signature_request_signed`
   - ✅ `signature_request_all_signed`
   - ✅ `signature_request_declined`

5. Click **"Save"**

---

## Part 3: Deploy Edge Functions (10 minutes)

### **Step 1: Set Secrets in Supabase**

```bash
# Set HelloSign API Key
supabase secrets set HELLOSIGN_API_KEY=your_actual_api_key_here

# Verify it was set
supabase secrets list
```

---

### **Step 2: Deploy Functions**

```bash
# Deploy send-for-signature function
supabase functions deploy send-for-signature

# Deploy webhook handler
supabase functions deploy signature-webhook
```

**You should see:**
```
✓ Deployed Function send-for-signature
  URL: https://YOUR_PROJECT.supabase.co/functions/v1/send-for-signature

✓ Deployed Function signature-webhook
  URL: https://YOUR_PROJECT.supabase.co/functions/v1/signature-webhook
```

---

### **Step 3: Test Functions**

Test the signature sending function:

```bash
curl -i --location --request POST \
  'https://YOUR_PROJECT_ID.supabase.co/functions/v1/send-for-signature' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "caseId": "test-case-123",
    "documentType": "body_release",
    "documentName": "Body Release Form",
    "signerName": "John Doe",
    "signerEmail": "your-email@example.com",
    "unsignedDocumentUrl": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    "testMode": true
  }'
```

**Expected response:**
```json
{
  "success": true,
  "signatureRequestId": "...",
  "esignRequestId": "...",
  "status": "sent",
  "message": "Document sent to your-email@example.com for signature"
}
```

**Check your email** - you should receive a signature request!

---

## Part 4: React App Configuration (5 minutes)

### **Step 1: Install Dependencies**

```bash
npm install @supabase/supabase-js
```

---

### **Step 2: Create .env File**

```bash
cp .env.example .env
```

Edit `.env`:

```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Find your keys:**
- Supabase Dashboard → Settings → API
- Copy **Project URL** → paste as `VITE_SUPABASE_URL`
- Copy **anon/public key** → paste as `VITE_SUPABASE_ANON_KEY`

---

### **Step 3: Update Supabase Client**

The file `/lib/supabase.ts` is already configured to read from `.env`

**Test the connection:**

```typescript
// Add to App.tsx temporarily
import { supabase } from './lib/supabase'

useEffect(() => {
  async function testConnection() {
    const { data, error } = await supabase.from('cases').select('count')
    console.log('Supabase connected:', data, error)
  }
  testConnection()
}, [])
```

---

## Part 5: Integration Testing (15 minutes)

### **Test 1: Create a Case**

```typescript
import { createCase } from './lib/supabase'

const newCase = await createCase({
  id: `case-${Date.now()}`,
  deceased_name: 'John Smith',
  next_of_kin_name: 'Mary Foster',
  caller_name: 'Mary Foster',
  caller_phone: '(555) 123-4567',
  status: 'intake-in-progress',
  current_stage: 'intake',
  completed_stages: [],
  intake_complete: false,
  documents_generated: 0,
  signatures_received: 0,
  signatures_total: 0,
  faxes_sent: 0,
  faxes_total: 0
})

console.log('Case created:', newCase)
```

**Check Supabase Dashboard:**
- Table Editor → cases → Should see new row

---

### **Test 2: Send for Signature**

```typescript
import { sendForSignature } from './lib/supabase'

const result = await sendForSignature({
  caseId: 'case-123',
  documentType: 'body_release',
  documentName: 'Body Release Form',
  signerName: 'Mary Foster',
  signerEmail: 'your-email@example.com', // Use YOUR email
  unsignedDocumentUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  testMode: true
})

console.log('Signature request sent:', result)
```

**What happens:**
1. ✅ HelloSign sends email to `your-email@example.com`
2. ✅ Record created in `signature_requests` table
3. ✅ Case `signatures_total` incremented

---

### **Test 3: Sign the Document**

1. Check your email inbox
2. Open HelloSign email: "Please sign: Body Release Form"
3. Click **"Review Document"**
4. Click **"Sign"** → Draw/Type signature → **"Continue"**
5. Click **"Finish"**

**What happens automatically:**
1. ✅ HelloSign webhook fires → calls your Edge Function
2. ✅ Edge Function downloads signed PDF
3. ✅ Signed PDF uploaded to Supabase Storage (`documents` bucket)
4. ✅ `signature_requests` table updated: `status = 'signed'`
5. ✅ `cases` table updated: `signatures_received` incremented
6. ✅ If all signatures complete → auto-advances to `faxing` stage

---

### **Test 4: Verify Realtime Updates**

```typescript
import { subscribeToCaseUpdates } from './lib/supabase'

const subscription = subscribeToCaseUpdates('case-123', (updatedCase) => {
  console.log('🔔 Case updated in real-time!', updatedCase)
  // Your React component will auto-update!
})

// Clean up when component unmounts
return () => subscription.unsubscribe()
```

---

## 📊 Monitoring & Debugging

### **View Logs**

**Supabase Edge Functions:**
```bash
# Stream live logs
supabase functions logs send-for-signature --follow
supabase functions logs signature-webhook --follow
```

**Or in Dashboard:**
- Functions → Select function → Logs tab

---

### **Check Database**

```sql
-- View all cases
SELECT * FROM cases ORDER BY created_at DESC;

-- View signature requests
SELECT 
  sr.*,
  c.deceased_name,
  c.current_stage
FROM signature_requests sr
JOIN cases c ON c.id = sr.case_id
ORDER BY sr.created_at DESC;

-- Check if signatures auto-advanced case
SELECT 
  id,
  deceased_name,
  current_stage,
  signatures_received,
  signatures_total,
  completed_stages
FROM cases
WHERE signatures_total > 0;
```

---

### **Check Storage**

- Dashboard → Storage → documents
- You should see folders like `case-123/`
- Inside: `body-release-SIGNED-1234567890.pdf`

---

## 🎯 Production Checklist

Before going live:

- [ ] **Turn off test mode** in HelloSign calls (`testMode: false`)
- [ ] **Enable RLS** (Row Level Security) on Supabase tables
- [ ] **Add authentication** (Supabase Auth or custom)
- [ ] **Set up proper CORS** for your domain
- [ ] **Configure email templates** in HelloSign
- [ ] **Add error monitoring** (Sentry, LogRocket, etc.)
- [ ] **Set up backups** in Supabase (automatic on paid plans)
- [ ] **Review storage policies** (who can read/write)
- [ ] **Add rate limiting** to prevent abuse
- [ ] **Test webhook failures** and retry logic

---

## 💰 Cost Estimate

**Typical Small Funeral Home (50 cases/month):**

| Service | Usage | Cost |
|---------|-------|------|
| **Supabase Free Tier** | 500MB DB, 1GB storage | **$0** |
| **HelloSign Essentials** | Unlimited signatures | **$15/month** |
| **Edge Functions** | ~500 invocations/month | **$0** (free tier) |
| **Total** | | **$15/month** |

**When you outgrow free tier:**
- Supabase Pro: $25/month (8GB DB, 100GB storage)
- HelloSign Standard: $25/month (team features)
- **Total: ~$40-50/month**

---

## 🆘 Troubleshooting

### **"Error: Invalid API key"**
- Check `supabase secrets list`
- Make sure HelloSign API key is correct
- Re-deploy functions after setting secrets

### **"Webhook not firing"**
- Check HelloSign Dashboard → Settings → API → Webhooks
- Make sure URL is exact: `https://YOUR_ID.supabase.co/functions/v1/signature-webhook`
- Test webhook with HelloSign's test mode signature

### **"Document not downloading"**
- Check Edge Function logs: `supabase functions logs signature-webhook`
- Verify HelloSign API key has download permissions
- Check Supabase Storage bucket exists (`documents`)

### **"Case not auto-advancing"**
- Check trigger in database: `check_and_advance_case_stage()`
- Verify `signatures_received` vs `signatures_total` in database
- Check `audit_log` table for stage advancement events

---

## 🚀 Next Steps

1. **Test the full workflow** end-to-end
2. **Integrate with your React app** (replace mock data)
3. **Add PDF generation** (use Puppeteer or PDFKit)
4. **Implement eFax** (Twilio Fax or eFax API)
5. **Add user authentication** (Supabase Auth)
6. **Deploy to production** (Vercel, Netlify, or AWS)

---

## 📚 Additional Resources

- [Supabase Docs](https://supabase.com/docs)
- [HelloSign API Docs](https://developers.hellosign.com/)
- [Supabase Edge Functions Guide](https://supabase.com/docs/guides/functions)
- [Realtime Subscriptions](https://supabase.com/docs/guides/realtime)

---

**Questions? Issues?**
- Supabase Discord: [discord.supabase.com](https://discord.supabase.com)
- HelloSign Support: [hellosign.com/support](https://www.hellosign.com/support)

Happy building! 🎉
