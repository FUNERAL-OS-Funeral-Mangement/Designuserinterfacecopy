# 🔧 Troubleshooting Guide

**Common issues and how to fix them**

---

## ⚠️ Error: "Cannot read properties of undefined (reading 'VITE_SUPABASE_URL')"

### **Cause:**
The `import.meta.env` object is undefined or Supabase environment variables are missing.

### **Solution:**

**Option 1: Work Without Supabase (Quick Fix)**

The app now works without Supabase! Just ignore the warning in console:
```
⚠️ Supabase credentials not found. Using mock client.
```

Features that will work:
- ✅ Dashboard
- ✅ Cases management (in-memory)
- ✅ First Call workflow
- ✅ All UI components

Features that won't work:
- ❌ Logo upload
- ❌ eSignatures
- ❌ Database persistence
- ❌ Real-time updates

---

**Option 2: Set Up Supabase (Full Features)**

1. **Create Supabase account:**
   - Go to [supabase.com](https://supabase.com)
   - Sign up (free tier)
   - Create a new project

2. **Get your keys:**
   - Dashboard → Settings → API
   - Copy "Project URL" (starts with `https://...supabase.co`)
   - Copy "anon public" key

3. **Add to `.env` file:**
   ```bash
   # Create .env if it doesn't exist
   cp .env.example .env
   
   # Edit .env and add:
   VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

4. **Restart dev server:**
   ```bash
   npm run dev
   ```

5. **Verify it works:**
   - Open browser console
   - Should see: "✅ Supabase connected"
   - No more warnings

---

## 🖼️ Logo Upload Not Working

### **Symptom:**
Click logo → "Logo upload is not configured yet"

### **Cause:**
Supabase credentials not set in `.env`

### **Solution:**

**Step 1: Verify `.env` file exists:**
```bash
# Check if file exists
ls -la .env

# If missing, create it:
cp .env.example .env
```

**Step 2: Add Supabase credentials:**
```bash
# In .env file:
VITE_SUPABASE_URL=https://abcdefg.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Step 3: Restart dev server:**
```bash
# Stop server (Ctrl+C)
npm run dev
```

**Step 4: Verify Supabase Storage bucket:**
```sql
-- In Supabase dashboard → Storage
-- Create bucket named "documents" if it doesn't exist
-- Settings: Private bucket, no public access
```

**Step 5: Run database migration:**
```bash
supabase db push
```

**Step 6: Test logo upload:**
- Hover over logo
- Click to upload
- Should work now! ✨

---

## 🔐 Authentication Issues

### **Symptom:**
Can't log in or Clerk errors

### **Cause:**
Clerk not configured or wrong keys

### **Solution:**

**Check Clerk key:**
```bash
# In .env file:
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...

# Verify it starts with "pk_test_" or "pk_live_"
```

**Verify in browser console:**
```javascript
console.log(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY)
// Should output your key
```

**If still broken:**
1. Go to [clerk.com](https://clerk.com) dashboard
2. Your App → API Keys
3. Copy "Publishable key"
4. Replace in `.env`
5. Restart dev server

---

## 📦 Missing Dependencies

### **Symptom:**
```
Module not found: @supabase/supabase-js
```

### **Solution:**
```bash
npm install @supabase/supabase-js
npm install @clerk/clerk-react
npm install lucide-react zustand
```

---

## 🌐 Vite Environment Variables Not Loading

### **Symptom:**
`import.meta.env.VITE_*` returns `undefined`

### **Common Mistakes:**

**❌ Wrong:** Variable doesn't start with `VITE_`
```bash
# This won't work:
SUPABASE_URL=https://...
```

**✅ Correct:** All Vite env vars must start with `VITE_`
```bash
# This works:
VITE_SUPABASE_URL=https://...
```

**❌ Wrong:** File named `.env.local`
```bash
# Vite doesn't read .env.local by default
```

**✅ Correct:** File named `.env`
```bash
# Vite reads .env automatically
```

**❌ Wrong:** Forgot to restart dev server
```bash
# .env changes require restart
```

**✅ Correct:** Always restart after changing `.env`
```bash
# Stop (Ctrl+C) then:
npm run dev
```

---

## 🗄️ Database Table Not Found

### **Symptom:**
```
relation "funeral_homes" does not exist
```

### **Solution:**

**Run migrations:**
```bash
# Make sure you're linked to your project
supabase link --project-ref YOUR_PROJECT_ID

# Push database schema
supabase db push

# Verify tables exist
supabase db dump --schema public
```

**Or manually create table:**
```sql
-- In Supabase dashboard → SQL Editor
-- Run the contents of:
-- supabase/migrations/002_funeral_home_logos.sql
```

---

## 📡 Supabase Functions Not Working

### **Symptom:**
eSignature requests fail

### **Solution:**

**Deploy Edge Functions:**
```bash
# Deploy all functions
supabase functions deploy

# Or deploy specific function
supabase functions deploy send-for-signature
supabase functions deploy signature-webhook
```

**Set function secrets:**
```bash
supabase secrets set HELLOSIGN_API_KEY=your_key_here
```

**Test function:**
```bash
supabase functions invoke send-for-signature --data '{
  "caseId": "test-123",
  "signerEmail": "test@example.com"
}'
```

---

## 🖥️ Browser Console Warnings

### **"⚠️ Supabase credentials not found"**

**This is OK!** The app works without Supabase. If you want to enable Supabase features:
1. Follow "Option 2" above
2. Add credentials to `.env`
3. Restart dev server

---

### **"Failed to fetch" or CORS errors**

**Check:**
1. Supabase project is running (not paused)
2. Correct Supabase URL in `.env`
3. Anon key is correct
4. No typos in credentials

**Verify in Supabase dashboard:**
- Go to Settings → API
- Confirm project URL matches your `.env`
- Confirm anon key matches your `.env`

---

## 🔥 Nuclear Option: Start Fresh

If nothing works, reset everything:

```bash
# 1. Delete all env files
rm .env .env.local .env.development

# 2. Copy fresh example
cp .env.example .env

# 3. Clear node_modules
rm -rf node_modules package-lock.json

# 4. Reinstall
npm install

# 5. Restart
npm run dev
```

---

## 📞 Still Stuck?

### **Check these files:**

1. **`.env`** - Environment variables
2. **`package.json`** - Dependencies installed
3. **Browser console** - Error messages
4. **Network tab** - Failed API calls

### **Common checklist:**

- [ ] `.env` file exists
- [ ] All `VITE_*` variables start with `VITE_`
- [ ] Dev server restarted after `.env` changes
- [ ] `npm install` completed successfully
- [ ] Supabase project is active (not paused)
- [ ] Correct API keys from Supabase dashboard
- [ ] No typos in environment variables

---

## 💡 Pro Tips

### **Verify environment variables:**
```typescript
// Add this to any component temporarily:
console.log('Environment check:', {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  clerkKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  hasSupabase: !!import.meta.env.VITE_SUPABASE_URL,
})
```

### **Check Supabase connection:**
```typescript
// In browser console:
import { supabase } from './lib/supabase'
const { data, error } = await supabase.from('cases').select('count')
console.log({ data, error })
```

### **Enable detailed logging:**
```bash
# In .env:
VITE_APP_ENV=development
```

---

## 📚 Related Documentation

- `QUICKSTART_CHECKLIST.md` - Setup guide
- `CLERK_SUPABASE_INTEGRATION.md` - Auth integration
- `LOGO_UPLOAD_FEATURE.md` - Logo upload details
- `TECH_STACK.md` - Technology overview

---

**Most issues are fixed by:**
1. ✅ Restarting dev server
2. ✅ Checking `.env` file exists
3. ✅ Verifying `VITE_` prefix on variables

**Still having issues?** Double-check the checklist above! 🎯
