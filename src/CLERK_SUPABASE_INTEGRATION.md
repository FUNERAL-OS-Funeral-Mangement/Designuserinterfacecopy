# 🔐 Clerk + Supabase Integration Guide

**Your Stack:** Clerk.com for Authentication + Supabase for Database

---

## 🎯 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      REACT APP (Vite)                        │
│                                                              │
│  ┌──────────────────┐          ┌─────────────────────┐      │
│  │  CLERK           │          │  SUPABASE CLIENT    │      │
│  │  (Auth/Identity) │          │  (Database/Storage) │      │
│  └────────┬─────────┘          └──────────┬──────────┘      │
│           │                               │                 │
└───────────┼───────────────────────────────┼─────────────────┘
            │                               │
            ↓                               ↓
┌────────────────────────┐    ┌──────────────────────────────┐
│   CLERK.COM            │    │   SUPABASE                   │
│   • User Management    │    │   • PostgreSQL Database      │
│   • Login/Signup       │    │   • Edge Functions           │
│   • JWTs               │    │   • Storage (PDFs)           │
│   • Organizations      │    │   • Realtime WebSocket       │
└────────────────────────┘    └──────────────────────────────┘
```

**Clean separation of concerns:**
- ✅ **Clerk** = Who you are (authentication, user profiles)
- ✅ **Supabase** = What you can do (data, business logic, files)

---

## 📋 What Each Service Handles

### **Clerk Responsibilities:**
- ✅ User signup/login
- ✅ Password management
- ✅ Multi-factor authentication (MFA)
- ✅ Social logins (Google, Microsoft, etc.)
- ✅ Organization/team management
- ✅ User profiles & metadata
- ✅ Session management
- ✅ JWT token generation

### **Supabase Responsibilities:**
- ✅ Case data storage (`cases` table)
- ✅ Signature tracking (`signature_requests` table)
- ✅ Fax tracking (`fax_requests` table)
- ✅ Document storage (PDFs in Storage)
- ✅ Business logic (Edge Functions)
- ✅ Real-time updates (WebSocket)
- ✅ HelloSign integration

---

## 🚀 Setup Steps

### **Step 1: Clerk Setup (5 minutes)**

1. **Create Clerk Account:**
   - Go to [clerk.com](https://clerk.com)
   - Sign up (free tier: 5,000 MAU)

2. **Create Application:**
   - Dashboard → "Add application"
   - Name: "Rite Path"
   - Choose login methods (Email, Google, etc.)

3. **Get API Keys:**
   - Dashboard → API Keys
   - Copy **Publishable Key** (starts with `pk_test_...`)
   - Add to `.env`:
     ```bash
     VITE_CLERK_PUBLISHABLE_KEY=pk_test_...your_key_here
     ```

4. **Install Clerk SDK:**
   ```bash
   npm install @clerk/clerk-react
   ```

5. **Wrap your app with ClerkProvider:**
   ```tsx
   // In main.tsx or App.tsx
   import { ClerkProvider } from '@clerk/clerk-react'
   
   const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
   
   <ClerkProvider publishableKey={clerkPubKey}>
     <App />
   </ClerkProvider>
   ```

---

### **Step 2: Supabase Setup (15 minutes)**

Follow the existing guide: **`QUICKSTART_CHECKLIST.md`**

Key steps:
1. Create Supabase project
2. Run database migration
3. Deploy Edge Functions
4. Configure HelloSign webhook
5. Add Supabase keys to `.env`

---

### **Step 3: Connect Clerk User to Supabase (Optional)**

**Option A: Simple (No RLS Integration)**
- Clerk handles authentication
- Supabase is wide-open (no Row Level Security)
- Store `clerk_user_id` in your tables
- Filter data in application code

**Option B: Advanced (RLS Integration)** ⭐ Recommended for production
- Clerk generates JWT tokens
- Supabase validates JWT tokens
- Use Row Level Security (RLS) to restrict data access
- Users can only see their own cases

---

## 🔧 Integration Patterns

### **Pattern 1: Store Clerk User ID in Database (Simple)**

```typescript
// When creating a case, attach the Clerk user ID
import { useUser } from '@clerk/clerk-react'
import { createCase } from './lib/supabase'

function CreateCaseButton() {
  const { user } = useUser()
  
  const handleCreateCase = async () => {
    await createCase({
      id: `case-${Date.now()}`,
      deceased_name: 'John Smith',
      clerk_user_id: user?.id,  // ← Store Clerk user ID
      // ... other fields
    })
  }
  
  return <button onClick={handleCreateCase}>Create Case</button>
}
```

**Update Supabase schema:**
```sql
-- Add clerk_user_id column to cases table
ALTER TABLE cases ADD COLUMN clerk_user_id TEXT;

-- Create index for fast lookups
CREATE INDEX idx_cases_clerk_user_id ON cases(clerk_user_id);

-- Query cases for current user
SELECT * FROM cases WHERE clerk_user_id = 'user_abc123';
```

---

### **Pattern 2: Clerk JWT + Supabase RLS (Advanced)**

**Setup Clerk JWT Template:**

1. Clerk Dashboard → JWT Templates → "New Template"
2. Name: `supabase`
3. Add claims:
   ```json
   {
     "role": "authenticated",
     "user_id": "{{user.id}}"
   }
   ```
4. Copy Issuer URL (e.g., `https://settled-dragon-4.clerk.accounts.dev`)

**Configure Supabase:**

```sql
-- In Supabase SQL Editor
-- Set Clerk as JWT issuer
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your_clerk_jwt_secret';
```

**Use in React:**

```typescript
import { useAuth } from '@clerk/clerk-react'
import { createClient } from '@supabase/supabase-js'

function useSupabaseWithAuth() {
  const { getToken } = useAuth()
  
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
    {
      global: {
        headers: async () => {
          const token = await getToken({ template: 'supabase' })
          return { Authorization: `Bearer ${token}` }
        }
      }
    }
  )
  
  return supabase
}
```

**Enable RLS:**

```sql
-- Enable Row Level Security on cases table
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own cases
CREATE POLICY "Users view own cases"
ON cases FOR SELECT
USING (auth.jwt() ->> 'user_id' = clerk_user_id);

-- Policy: Users can only create their own cases
CREATE POLICY "Users create own cases"
ON cases FOR INSERT
WITH CHECK (auth.jwt() ->> 'user_id' = clerk_user_id);
```

---

## 🎨 Example: Protected Route

```tsx
// components/ProtectedRoute.tsx
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'

export function ProtectedRoute({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}

// Usage in App.tsx
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  )
}
```

---

## 📊 User Data Flow

```
User signs up/logs in via Clerk
         ↓
Clerk creates user account
         ↓
Your app gets user object: { id: "user_abc123", email: "..." }
         ↓
Store user ID in Supabase when creating records
         ↓
Query Supabase filtering by clerk_user_id
         ↓
Return only data belonging to current user
```

---

## 💡 Recommended Approach (Start Simple)

### **Phase 1: Basic Setup (Now)**
```tsx
// Just use Clerk for auth, Supabase for data
// No RLS, filter in application code

const { user } = useUser()  // From Clerk

const cases = await supabase
  .from('cases')
  .select('*')
  .eq('clerk_user_id', user.id)  // Filter in query
```

### **Phase 2: Add RLS (Later)**
```sql
-- When you're ready for production
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own cases" ON cases ...;
```

---

## 🔒 Security Best Practices

### **✅ DO:**
- Store Clerk user IDs in Supabase tables
- Use Clerk's built-in session management
- Validate user identity before database operations
- Enable RLS when you add multi-user support
- Use Clerk's organization feature for team access

### **❌ DON'T:**
- Store passwords in Supabase (Clerk handles this)
- Use Supabase Auth (you're using Clerk instead)
- Expose Clerk Secret Keys in frontend code
- Skip user validation before creating records

---

## 📝 Updated Schema

Add user tracking to your Supabase tables:

```sql
-- Add to existing migration or run in SQL Editor

-- Add clerk_user_id to cases table
ALTER TABLE cases ADD COLUMN IF NOT EXISTS clerk_user_id TEXT;
CREATE INDEX IF NOT EXISTS idx_cases_clerk_user_id ON cases(clerk_user_id);

-- Add clerk_user_id to signature_requests (for auditing)
ALTER TABLE signature_requests ADD COLUMN IF NOT EXISTS clerk_user_id TEXT;

-- Add clerk_user_id to fax_requests (for auditing)
ALTER TABLE fax_requests ADD COLUMN IF NOT EXISTS clerk_user_id TEXT;

-- Add clerk_user_id to audit_log
ALTER TABLE audit_log ADD COLUMN IF NOT EXISTS clerk_user_id TEXT;
```

---

## 🧪 Testing the Integration

### **Test 1: Clerk Authentication**
```tsx
import { useUser, SignInButton, UserButton } from '@clerk/clerk-react'

function Header() {
  const { isSignedIn, user } = useUser()
  
  return (
    <header>
      {isSignedIn ? (
        <div>
          <span>Welcome, {user.firstName}!</span>
          <UserButton />
        </div>
      ) : (
        <SignInButton />
      )}
    </header>
  )
}
```

### **Test 2: Create Case with User ID**
```tsx
import { useUser } from '@clerk/clerk-react'
import { createCase } from './lib/supabase'

function TestCreateCase() {
  const { user } = useUser()
  
  const test = async () => {
    const newCase = await createCase({
      id: `case-${Date.now()}`,
      deceased_name: 'Test Case',
      clerk_user_id: user?.id,
      // ... other fields
    })
    
    console.log('Created case:', newCase)
  }
  
  return <button onClick={test}>Create Test Case</button>
}
```

### **Test 3: Query User's Cases**
```tsx
import { useUser } from '@clerk/clerk-react'
import { supabase } from './lib/supabase'
import { useEffect, useState } from 'react'

function MyCases() {
  const { user } = useUser()
  const [cases, setCases] = useState([])
  
  useEffect(() => {
    if (user) {
      loadCases()
    }
  }, [user])
  
  const loadCases = async () => {
    const { data } = await supabase
      .from('cases')
      .select('*')
      .eq('clerk_user_id', user.id)
      .order('created_at', { ascending: false })
    
    setCases(data || [])
  }
  
  return (
    <div>
      <h2>My Cases ({cases.length})</h2>
      {cases.map(c => (
        <div key={c.id}>{c.deceased_name}</div>
      ))}
    </div>
  )
}
```

---

## 📚 Additional Resources

- **Clerk Docs:** [clerk.com/docs](https://clerk.com/docs)
- **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)
- **Clerk + Supabase Guide:** [clerk.com/docs/integrations/databases/supabase](https://clerk.com/docs/integrations/databases/supabase)

---

## 🎯 Your Current Setup

**You're using:**
```bash
# .env file
VITE_CLERK_PUBLISHABLE_KEY=pk_test_c2V0dGxlZC1kcmFnb24tNC5jbGVyay5hY2NvdW50cy5kZXYk
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
HELLOSIGN_API_KEY=your_hellosign_api_key_here
```

**Your architecture:**
- ✅ Clerk for login/signup/user management
- ✅ Supabase for database (cases, signatures, faxes)
- ✅ Supabase Storage for PDFs
- ✅ Supabase Edge Functions for HelloSign integration
- ✅ Zustand for local state
- ✅ Supabase Realtime for live updates

**This is a modern, scalable stack!** 🎉

---

## ✅ Next Steps

1. **Install Clerk SDK:**
   ```bash
   npm install @clerk/clerk-react
   ```

2. **Update your main.tsx:**
   Add ClerkProvider wrapper

3. **Add clerk_user_id to schema:**
   Run the SQL commands above

4. **Follow the Supabase setup:**
   Use `QUICKSTART_CHECKLIST.md`

5. **Test the integration:**
   Create a test case with user ID

**You're ready to build!** 🚀
