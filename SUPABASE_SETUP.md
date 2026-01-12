# Supabase Setup Guide

## Quick Setup (2 minutes)

### 1. Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project (or select existing)
3. Go to **Settings** → **API**
4. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)
   - **Service Role Key** (starts with `eyJ...`)

### 2. Create `.env.local` File

Create a file named `.env.local` in your project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-service-key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### 3. Run Database Migrations

```bash
# Make sure you have Supabase CLI installed
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Run migrations
npm run db:push
```

Or manually run the SQL migrations:
1. Open Supabase Dashboard → SQL Editor
2. Copy and paste the contents of `supabase/migrations/004_multi_tenant_schema.sql`
3. Click "Run"

### 4. Restart Your Dev Server

```bash
# Stop the server (Ctrl+C)
# Start again
npm run dev
```

---

## 🎉 Done!

Your app should now have:
- ✅ User authentication (sign up, login, logout)
- ✅ Protected routes
- ✅ Multi-tenant organization support
- ✅ API routes ready for funeral home management

---

## 🔧 Development Mode

**Note:** The app will run without Supabase configured, but authentication will be disabled. Add your credentials to enable full functionality.

---

## 📚 Database Schema

The migrations create:
- `organizations` - Funeral homes
- `organization_members` - Staff memberships
- `staff_invitations` - Pending invites
- Row Level Security (RLS) policies for data isolation

---

## 🆘 Troubleshooting

### "Supabase not configured" warning
→ Add your `.env.local` file with Supabase credentials

### Database errors
→ Run migrations: `npm run db:push` or manually in SQL Editor

### Authentication not working
→ Check that your Supabase keys are correct in `.env.local`

