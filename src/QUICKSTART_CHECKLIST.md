# ✅ Rite Path - Quick Start Checklist

**Goal:** Get from zero to working eSignature integration in 30 minutes.

---

## 🎯 Prerequisites (5 min)

- [ ] Node.js 18+ installed (`node --version`)
- [ ] Git installed (`git --version`)
- [ ] Code editor (VS Code recommended)
- [ ] Chrome or Firefox browser

---

## 📝 Account Setup (10 min)

### **Supabase Account**
- [ ] Go to [supabase.com](https://supabase.com) → Sign up (free)
- [ ] Create new project: `rite-path-production`
- [ ] Save database password somewhere safe
- [ ] Wait 2-3 min for project to provision
- [ ] Copy Project URL and Anon Key (Settings → API)

### **HelloSign Account**
- [ ] Go to [hellosign.com](https://www.hellosign.com) → Sign up
- [ ] Choose plan: Free Trial (3 signatures) or Essentials ($15/month)
- [ ] Go to Settings → API → Reveal API Key
- [ ] Copy API key somewhere safe
- [ ] Enable API access if prompted

---

## 🛠️ Installation (5 min)

```bash
# 1. Install Supabase CLI
npm install -g supabase

# 2. Verify installation
supabase --version

# 3. Login to Supabase
supabase login

# 4. Clone your project (or navigate to existing)
cd rite-path

# 5. Install dependencies
npm install @supabase/supabase-js
```

---

## 🗄️ Database Setup (5 min)

```bash
# 1. Link to your Supabase project
supabase link --project-ref YOUR_PROJECT_ID

# 2. Push database schema
supabase db push

# 3. Verify in Supabase Dashboard
# Go to: Table Editor → Should see 6 tables
```

**Manual step (required):**
- [ ] Go to Supabase Dashboard → **Storage**
- [ ] Click "New bucket" → Name: `documents` → Public: **No** → Create
- [ ] Click "New bucket" → Name: `templates` → Public: **No** → Create

---

## 🚀 Deploy Edge Functions (5 min)

```bash
# 1. Set HelloSign API key as secret
supabase secrets set HELLOSIGN_API_KEY=your_actual_api_key_here

# 2. Deploy send-for-signature function
supabase functions deploy send-for-signature

# 3. Deploy webhook handler
supabase functions deploy signature-webhook

# 4. Copy the webhook URL from output
# Example: https://abcd1234.supabase.co/functions/v1/signature-webhook
```

**Manual step (required):**
- [ ] Go to HelloSign Dashboard → Settings → API
- [ ] Scroll to "Event Callbacks (Webhooks)"
- [ ] Paste webhook URL: `https://YOUR_ID.supabase.co/functions/v1/signature-webhook`
- [ ] Check these events:
  - ✅ signature_request_sent
  - ✅ signature_request_viewed
  - ✅ signature_request_signed
  - ✅ signature_request_all_signed
  - ✅ signature_request_declined
- [ ] Click **Save**

---

## ⚙️ Configure React App (3 min)

```bash
# 1. Create .env file
cp .env.example .env

# 2. Edit .env and add your keys
nano .env  # or use VS Code
```

**Add these values to `.env`:**
```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_from_supabase_dashboard
```

**Where to find these:**
- Supabase Dashboard → Settings → API
- Copy "Project URL" → paste as `VITE_SUPABASE_URL`
- Copy "anon public" key → paste as `VITE_SUPABASE_ANON_KEY`

---

## 🧪 Test the Integration (10 min)

### **Test 1: Start the app**
```bash
npm run dev
```
- [ ] App opens at `http://localhost:5173`
- [ ] Click "First Call" card
- [ ] See the intake form

---

### **Test 2: Create a test case**

Fill out the form with test data:
- [ ] Caller name: `Test User`
- [ ] Caller phone: `(555) 123-4567`
- [ ] Deceased name: `John Smith`
- [ ] Date/Time of death: Select today
- [ ] Location: `Test Hospital`
- [ ] Address: `123 Test St`
- [ ] Next of kin: `Mary Smith`
- [ ] Next of kin phone: `(555) 234-5678`
- [ ] Weight: Known → `180`
- [ ] Ready for pickup: **Yes**
- [ ] Select removal team: Any option
- [ ] Ready time: `30 minutes`
- [ ] Stairs: No
- [ ] Family present: Yes
- [ ] Documents: Keep "Body Release Form" checked

**Click "Generate & Send for Signature"**

---

### **Test 3: Verify database record**

- [ ] Go to Supabase Dashboard → Table Editor → `cases`
- [ ] See new row with your test data
- [ ] Note the `id` (e.g., `case-1234567890`)

---

### **Test 4: Send for signature (Manual test)**

Open browser console (F12), paste this code:

```javascript
// Replace with your actual case ID and YOUR email
const result = await fetch('https://YOUR_PROJECT_ID.supabase.co/functions/v1/send-for-signature', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_ANON_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    caseId: 'case-1234567890',
    documentType: 'body_release',
    documentName: 'Body Release Form',
    signerName: 'Mary Smith',
    signerEmail: 'YOUR_ACTUAL_EMAIL@gmail.com',  // ⚠️ Use YOUR email!
    unsignedDocumentUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    testMode: true
  })
}).then(r => r.json())

console.log(result)
```

**Expected:**
- [ ] Console shows: `{ success: true, signatureRequestId: "..." }`
- [ ] Check your email inbox
- [ ] Should receive email from HelloSign: "Please sign: Body Release Form"

---

### **Test 5: Sign the document**

- [ ] Open HelloSign email
- [ ] Click "Review Document"
- [ ] Click "Sign" button
- [ ] Draw or type signature
- [ ] Click "Continue" → "Finish"

**What happens automatically:**
- [ ] Webhook fires to your Edge Function
- [ ] Edge Function downloads signed PDF
- [ ] Signed PDF uploaded to Supabase Storage
- [ ] Database updated: `signature_requests.status = 'signed'`
- [ ] Case updated: `signatures_received = 1`

**Verify:**
- [ ] Supabase Dashboard → Table Editor → `signature_requests`
- [ ] See row with `status = 'signed'`
- [ ] Note `signed_document_url` has a value
- [ ] Supabase Dashboard → Storage → `documents`
- [ ] See folder with your case ID
- [ ] See file: `body-release-SIGNED-xxx.pdf`

---

### **Test 6: View logs (Debugging)**

```bash
# Terminal 1: Watch signature sending logs
supabase functions logs send-for-signature --follow

# Terminal 2: Watch webhook logs
supabase functions logs signature-webhook --follow
```

Sign another document and watch the logs in real-time!

---

## 🎉 Success Criteria

You've successfully set up the integration if:

✅ **Database:**
- [ ] 6 tables exist in Supabase
- [ ] Test case record created in `cases` table
- [ ] Signature request record in `signature_requests` table

✅ **Storage:**
- [ ] `documents` bucket exists
- [ ] Signed PDF uploaded after signing

✅ **HelloSign:**
- [ ] Email received with signature request
- [ ] Able to sign document
- [ ] Signature completion email received

✅ **Webhook:**
- [ ] Webhook URL configured in HelloSign
- [ ] Logs show webhook received
- [ ] Database updated after signing

✅ **React App:**
- [ ] App connects to Supabase (no errors)
- [ ] Can create test cases
- [ ] Can view cases in dashboard

---

## 🚨 Common Issues

### **"Error: Invalid API key"**
**Fix:**
```bash
# Re-set the secret
supabase secrets set HELLOSIGN_API_KEY=your_key_here

# Re-deploy functions
supabase functions deploy send-for-signature
supabase functions deploy signature-webhook
```

---

### **"No email received from HelloSign"**
**Fix:**
- Check spam/junk folder
- Verify `signerEmail` is YOUR actual email
- Check HelloSign dashboard → Documents → Should see request
- Make sure `testMode: true` is set (test mode still sends real emails)

---

### **"Webhook not firing"**
**Fix:**
- Verify webhook URL in HelloSign Settings → API
- Check it matches: `https://YOUR_ID.supabase.co/functions/v1/signature-webhook`
- Sign a document and check Edge Function logs:
  ```bash
  supabase functions logs signature-webhook --follow
  ```

---

### **"Database tables not created"**
**Fix:**
```bash
# Verify link
supabase link --project-ref YOUR_PROJECT_ID

# Try manual migration
cd supabase/migrations
supabase db push --db-url "postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_ID.supabase.co:5432/postgres"
```

---

### **"Storage upload failed"**
**Fix:**
- Verify buckets exist: Dashboard → Storage
- Check bucket is named exactly `documents` (lowercase)
- Check storage policies allow uploads

---

## 📚 Next Steps

Once everything works:

1. **Replace mock data in React:**
   - Update `FirstCallIntakeSection.tsx` to call real Edge Function
   - Remove simulation buttons
   - Add real Supabase integration

2. **Add PDF generation:**
   - Use library like `jspdf` or `pdfkit`
   - Generate PDFs from case data
   - Upload to Storage before sending for signature

3. **Implement eFax:**
   - Choose provider (Twilio Fax, eFax API, etc.)
   - Create `send-fax` Edge Function
   - Add fax webhook handler

4. **Add authentication:**
   - Enable Supabase Auth
   - Add login/logout
   - Protect routes

5. **Deploy to production:**
   - Build: `npm run build`
   - Deploy to Vercel/Netlify
   - Update webhook URL in HelloSign

---

## 🆘 Need Help?

- **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)
- **HelloSign API:** [developers.hellosign.com](https://developers.hellosign.com/)
- **Discord:** [discord.supabase.com](https://discord.supabase.com)
- **GitHub Issues:** Create issue in your repo

---

**Estimated Total Time: 30-45 minutes** ⏱️

**Good luck! 🚀**
