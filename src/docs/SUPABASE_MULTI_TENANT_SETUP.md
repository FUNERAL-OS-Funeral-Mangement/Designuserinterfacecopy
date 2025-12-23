# 🔐 Supabase Multi-Tenant Setup Guide
## Clerk Organizations + Supabase RLS

This guide sets up **secure multi-tenant** architecture for Rite Path using:
- **Clerk** for authentication + organizations
- **Supabase** for PostgreSQL database + storage
- **RLS policies** enforcing org-level data isolation

---

## 🎯 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│  Clerk Organization = 1 Funeral Home (Tenant)           │
│  - Multiple users per org (staff members)               │
│  - Each user belongs to exactly 1 org                   │
│  - org_id is the tenant key for all data                │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│  Supabase Database + Storage                            │
│  - Every row has org_id column                          │
│  - RLS policies filter by org_id from Clerk JWT         │
│  - Storage paths: logos/<org_id>/...                    │
└─────────────────────────────────────────────────────────┘
```

---

## 📋 Step 1: Database Schema

### Create `funeral_homes` table

```sql
-- Main tenant configuration table
CREATE TABLE funeral_homes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id TEXT UNIQUE NOT NULL, -- Clerk organization ID (tenant key)
  name TEXT NOT NULL,
  tagline TEXT,
  logo_path TEXT, -- Storage path: logos/<org_id>/logo.png
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups by org_id
CREATE INDEX idx_funeral_homes_org_id ON funeral_homes(org_id);

-- Enable RLS
ALTER TABLE funeral_homes ENABLE ROW LEVEL SECURITY;
```

### All other tables follow the same pattern:

```sql
-- Example: cases table
CREATE TABLE cases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id TEXT NOT NULL, -- Every table has org_id!
  deceased_name TEXT NOT NULL,
  date_of_death DATE,
  -- ... other fields
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_cases_org_id ON cases(org_id);
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
```

**Rule:** Every table MUST have `org_id TEXT NOT NULL` column.

---

## 📋 Step 2: Storage Bucket Setup

### Create `documents` bucket (PRIVATE!)

**In Supabase Dashboard:**
1. Go to **Storage** → **Create bucket**
2. **Bucket name:** `documents`
3. **Public bucket:** ❌ **OFF** (critical for multi-tenant!)
4. **File size limit:** 2MB
5. **Allowed MIME types:** `image/*`

### Storage structure:

```
documents/
├── logos/
│   ├── org_abc123/
│   │   └── logo.png          ← Funeral Home A
│   ├── org_xyz789/
│   │   └── logo.png          ← Funeral Home B
│   └── org_def456/
│       └── logo.png          ← Funeral Home C
├── contracts/
│   ├── org_abc123/
│   │   ├── case-001.pdf
│   │   └── case-002.pdf
│   └── org_xyz789/
│       └── case-001.pdf
└── signatures/
    └── ...
```

**Each org has its own folder = complete isolation** ✅

---

## 📋 Step 3: Clerk JWT Configuration

### Configure Clerk to include org_id in JWT

1. Go to **Clerk Dashboard** → **JWT Templates**
2. Click **New template**
3. **Name:** `supabase`
4. **Claims:**

```json
{
  "sub": "{{user.id}}",
  "org_id": "{{org.id}}",
  "role": "authenticated"
}
```

5. Save the template

### Configure Supabase to trust Clerk JWTs

1. Go to **Supabase Dashboard** → **Authentication** → **Providers**
2. Scroll to **Custom JWT**
3. **JWKS URL:**

```
https://YOUR_CLERK_DOMAIN/.well-known/jwks.json
```

4. Replace `YOUR_CLERK_DOMAIN` with your actual Clerk frontend API
   - Example: `https://clerk.myapp.com/.well-known/jwks.json`
5. Save

---

## 📋 Step 4: RLS Policies (Database)

### Policies for `funeral_homes` table

```sql
-- Users can only SELECT their own org's data
CREATE POLICY "Users can read own org data"
ON funeral_homes FOR SELECT
USING (org_id = auth.jwt()->>'org_id');

-- Users can only INSERT for their own org
CREATE POLICY "Users can insert own org data"
ON funeral_homes FOR INSERT
WITH CHECK (org_id = auth.jwt()->>'org_id');

-- Users can only UPDATE their own org's data
CREATE POLICY "Users can update own org data"
ON funeral_homes FOR UPDATE
USING (org_id = auth.jwt()->>'org_id');

-- Users can only DELETE their own org's data
CREATE POLICY "Users can delete own org data"
ON funeral_homes FOR DELETE
USING (org_id = auth.jwt()->>'org_id');
```

### Apply same pattern to all tables:

```sql
-- Example: cases table policies
CREATE POLICY "Users can read own org cases"
ON cases FOR SELECT
USING (org_id = auth.jwt()->>'org_id');

CREATE POLICY "Users can insert own org cases"
ON cases FOR INSERT
WITH CHECK (org_id = auth.jwt()->>'org_id');

CREATE POLICY "Users can update own org cases"
ON cases FOR UPDATE
USING (org_id = auth.jwt()->>'org_id');

CREATE POLICY "Users can delete own org cases"
ON cases FOR DELETE
USING (org_id = auth.jwt()->>'org_id');
```

**Key insight:** `auth.jwt()->>'org_id'` extracts the `org_id` from Clerk's JWT token.

---

## 📋 Step 5: RLS Policies (Storage)

### Storage policies for `documents` bucket

```sql
-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Users can upload files to their own org folder
CREATE POLICY "Users can upload to own org folder"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'documents'
  AND (storage.foldername(name))[1] IN ('logos', 'contracts', 'signatures')
  AND (storage.foldername(name))[2] = auth.jwt()->>'org_id'
);

-- Users can read files from their own org folder
CREATE POLICY "Users can read from own org folder"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'documents'
  AND (storage.foldername(name))[1] IN ('logos', 'contracts', 'signatures')
  AND (storage.foldername(name))[2] = auth.jwt()->>'org_id'
);

-- Users can update files in their own org folder
CREATE POLICY "Users can update own org files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'documents'
  AND (storage.foldername(name))[1] IN ('logos', 'contracts', 'signatures')
  AND (storage.foldername(name))[2] = auth.jwt()->>'org_id'
);

-- Users can delete files from their own org folder
CREATE POLICY "Users can delete own org files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'documents'
  AND (storage.foldername(name))[1] IN ('logos', 'contracts', 'signatures')
  AND (storage.foldername(name))[2] = auth.jwt()->>'org_id'
);
```

**How it works:**
- `(storage.foldername(name))[1]` = first folder (e.g., "logos")
- `(storage.foldername(name))[2]` = second folder (e.g., "org_abc123")
- Policy ensures second folder matches current user's `org_id`

---

## 📋 Step 6: Client Code Integration

### Create Supabase client helper

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '@clerk/clerk-react';

export const useSupabaseClient = () => {
  const { getToken } = useAuth();

  const getClient = async () => {
    // Get Clerk token with org_id claim
    const token = await getToken({ template: 'supabase' });

    return createClient(
      import.meta.env.VITE_SUPABASE_URL!,
      import.meta.env.VITE_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );
  };

  return { getClient };
};
```

### Usage in components:

```typescript
import { useAuth, useOrganization } from '@clerk/clerk-react';
import { useSupabaseClient } from '../lib/supabase';

function MyComponent() {
  const { organization } = useOrganization();
  const { getClient } = useSupabaseClient();
  const orgId = organization?.id;

  const uploadLogo = async (file: File) => {
    const supabase = await getClient();
    
    // Upload to org-scoped path
    const filePath = `logos/${orgId}/logo.png`;
    
    const { error } = await supabase.storage
      .from('documents')
      .upload(filePath, file, { upsert: true });
    
    if (!error) {
      // Update database
      await supabase
        .from('funeral_homes')
        .upsert({
          org_id: orgId,
          logo_path: filePath,
        });
    }
  };

  return <div>...</div>;
}
```

---

## 📋 Step 7: Environment Variables

### Add to `.env`:

```bash
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Clerk
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

---

## 🧪 Testing Multi-Tenant Isolation

### Test 1: Create two Clerk orgs

1. Create **Org A** (e.g., "Smith Funeral Home")
2. Create **Org B** (e.g., "Johnson Funeral Home")
3. Create a user in each org

### Test 2: Upload logos

1. Login as **Org A user** → upload logo
2. Login as **Org B user** → upload logo
3. Check storage:
   ```
   documents/logos/org_A_id/logo.png
   documents/logos/org_B_id/logo.png
   ```

### Test 3: Query database

```sql
-- As Org A user
SELECT * FROM funeral_homes;
-- Should return ONLY Org A's row

-- As Org B user
SELECT * FROM funeral_homes;
-- Should return ONLY Org B's row
```

### Test 4: Try to access other org's files

```typescript
// As Org A user, try to read Org B's logo
const { data, error } = await supabase.storage
  .from('documents')
  .download('logos/org_B_id/logo.png');

// Should fail with permission error ✅
```

---

## 🔒 Security Checklist

Before going to production, verify:

- [ ] **All tables** have `org_id` column
- [ ] **All tables** have RLS enabled
- [ ] **All tables** have SELECT/INSERT/UPDATE/DELETE policies filtering by `org_id`
- [ ] **Storage bucket** is set to **private** (not public)
- [ ] **Storage policies** enforce org-level folder isolation
- [ ] **Clerk JWT template** includes `org_id` claim
- [ ] **Supabase** is configured to trust Clerk's JWKS URL
- [ ] **Client code** uses Clerk token when creating Supabase client
- [ ] **All queries** automatically filter by org_id via RLS (no manual filtering needed!)

---

## 🎯 Key Takeaways

| Concept | Implementation |
|---------|----------------|
| **Tenant Key** | `org_id` from Clerk organization |
| **Database Isolation** | Every table has `org_id` + RLS policies |
| **Storage Isolation** | Folders structured as `type/<org_id>/file` |
| **Authentication** | Clerk JWT with `org_id` claim |
| **Authorization** | Supabase RLS extracts `org_id` from JWT |
| **Security** | Database-level enforcement (can't bypass!) |

---

## 🚀 Next Steps

1. **Run the SQL scripts** to create tables and policies
2. **Configure Clerk JWT template** with org_id claim
3. **Configure Supabase** to trust Clerk JWKS
4. **Update client code** to use Clerk tokens
5. **Test isolation** with multiple orgs
6. **Apply pattern** to all future tables (always include org_id!)

---

## 📚 Additional Resources

- [Clerk Organizations Docs](https://clerk.com/docs/organizations/overview)
- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase + Clerk Integration](https://clerk.com/docs/integrations/databases/supabase)

---

**✅ This setup provides bank-level security for multi-tenant data isolation!**
