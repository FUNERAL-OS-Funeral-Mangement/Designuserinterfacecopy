# 🚀 Quick Start Guide - RitePath Next.js

## ✅ Migration Complete!

Your Vite + React app has been successfully migrated to **Next.js 14 App Router**!

## What's Next?

### Step 1: Set Up Environment Variables

1. Copy the example file:
   ```bash
   copy .env.example .env.local
   ```

2. Get your Clerk keys:
   - Go to https://dashboard.clerk.com
   - Copy your **Publishable Key** and **Secret Key**
   - Paste them into `.env.local`

3. Get your Supabase keys (if using):
   - Go to your Supabase project dashboard
   - Navigate to Settings → API
   - Copy your **URL**, **Anon Key**, and **Service Role Key**
   - Paste them into `.env.local`

### Step 2: Run Database Migration (Optional)

If you're using Supabase with the multi-tenant schema:

```bash
npm run db:push
```

This creates the tables for:
- Organizations (funeral homes)
- Organization members (staff)
- Staff invitations

### Step 3: Start the Development Server

```bash
npm run dev
```

Your app will be available at: **http://localhost:3000**

### Step 4: Test the App

1. **Landing Page**: Visit http://localhost:3000
2. **Sign In**: Click "Get Started" and sign in with Clerk
3. **Dashboard**: You'll be redirected to `/dashboard`
4. **Navigate**: Try different sections:
   - First Call: `/first-call`
   - Cases: `/cases`
   - Documents: `/documents`
   - Settings: `/settings`

## 🎯 New Features

### Multi-Tenancy
Your app now supports multiple organizations (funeral homes):
- Each organization has its own isolated data
- Users can belong to multiple organizations
- Role-based access control (owner, admin, staff, vendor)

### API Routes
Three production-ready API endpoints:

1. **Create Funeral Home**
   ```bash
   POST /api/funeral-home
   Body: { name, email, phone, address }
   ```

2. **Invite Staff**
   ```bash
   POST /api/staff/invite
   Body: { organizationId, email, firstName, lastName, role }
   ```

3. **Accept Invitation**
   ```bash
   POST /api/staff/accept
   Body: { token }
   ```

## 📂 Key Files

### Configuration
- `next.config.js` - Next.js configuration
- `middleware.ts` - Clerk authentication middleware
- `.env.local` - Your environment variables (git-ignored)

### App Structure
- `app/layout.tsx` - Root layout with Clerk
- `app/page.tsx` - Landing page
- `app/(dashboard)/` - Protected routes
- `app/api/` - API routes

### Components
- `components/` - All your existing components
- `components/*Client.tsx` - New wrapper components for Next.js

### Backend
- `lib/supabase.ts` - Supabase client (client & server)
- `supabase/migrations/` - Database migrations

## 🔧 Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:push          # Apply migrations
npm run db:reset         # Reset database

# Supabase (optional)
npm run supabase:start   # Start local Supabase
npm run supabase:stop    # Stop local Supabase
```

## 🐛 Troubleshooting

### "Module not found" errors
```bash
npm install
```

### Clerk authentication not working
1. Check `.env.local` has correct keys
2. Restart dev server: `Ctrl+C` then `npm run dev`
3. Clear browser cache

### Supabase connection failed
1. Verify project URL and keys in `.env.local`
2. Check Supabase project is active
3. Run migration: `npm run db:push`

### Port 3000 already in use
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
$env:PORT=3001; npm run dev
```

## 📖 Documentation

- **Full Migration Guide**: See `MIGRATION_COMPLETE.md`
- **Clerk Setup**: See `clerk.md`
- **Project Context**: See `RitePath Claude.md`
- **Main README**: See `README.md`

## 🎨 What Changed?

### Before (Vite)
- ❌ Client-side only
- ❌ Manual routing
- ❌ No API routes
- ❌ Mock authentication

### After (Next.js)
- ✅ Server & client rendering
- ✅ File-based routing
- ✅ Built-in API routes
- ✅ Real Clerk authentication
- ✅ Multi-tenant architecture
- ✅ Production-ready

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Environment Variables in Production
Don't forget to set in your hosting platform:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL`

## ✨ You're Ready!

Your funeral home management platform is now running on **Next.js 14** with:
- ✅ Clerk Authentication
- ✅ Multi-Tenancy
- ✅ API Routes
- ✅ Supabase Backend
- ✅ Production-Ready Architecture

Happy coding! 🎉

