# 🏗️ Rite Path - Technology Stack

**Your Complete Tech Stack Overview**

---

## 📦 Stack Summary

```
┌─────────────────────────────────────────────────────────┐
│                    RITE PATH                            │
│         Funeral Home Workflow Application               │
└─────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ↓                 ↓                 ↓
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   FRONTEND   │  │     AUTH     │  │   BACKEND    │
│              │  │              │  │              │
│  React       │  │  Clerk.com   │  │  Supabase    │
│  Vite        │  │              │  │  PostgreSQL  │
│  Zustand     │  │              │  │  Edge Fns    │
│  Tailwind    │  │              │  │  Storage     │
└──────────────┘  └──────────────┘  └──────────────┘
```

---

## 🎨 Frontend Stack

### **React (UI Framework)**
- **Version:** 18.2.0
- **Why:** Component-based, modern, large ecosystem
- **Used for:** All UI components, routing, state management

### **Vite (Build Tool)**
- **Why:** Fast dev server, instant HMR, optimized builds
- **Used for:** Development server, production builds

### **Zustand (State Management)**
- **Version:** 4.4.7
- **Why:** Simple, minimal boilerplate, TypeScript-friendly
- **Used for:** Local app state (form data, UI state)

### **Tailwind CSS v4 (Styling)**
- **Why:** Utility-first, fast styling, consistent design
- **Used for:** All styling (custom tokens in globals.css)

### **Lucide React (Icons)**
- **Version:** 0.263.1
- **Why:** Beautiful icons, tree-shakeable, React-optimized
- **Used for:** All UI icons

---

## 🔐 Authentication Stack

### **Clerk.com**
- **Plan:** Free tier (5,000 MAU) → $25/month (10,000 MAU)
- **Features:**
  - ✅ Email/password authentication
  - ✅ Social logins (Google, Microsoft, Apple)
  - ✅ Multi-factor authentication (MFA)
  - ✅ Organization/team management
  - ✅ User profiles & metadata
  - ✅ Session management
  - ✅ JWT token generation

**Why Clerk?**
- Drop-in components (SignIn, SignUp, UserButton)
- Beautiful pre-built UI
- Handles all security best practices
- No backend auth code needed

**Package:** `@clerk/clerk-react` (v4.30.0)

---

## 🗄️ Backend Stack

### **Supabase (Backend-as-a-Service)**
- **Plan:** Free tier → $25/month (Pro)
- **What it provides:**

#### **PostgreSQL Database**
- 500 MB free (500 GB on Pro)
- 6 tables (cases, signature_requests, fax_requests, etc.)
- Real-time subscriptions
- Automatic REST API generation

#### **Edge Functions** (Serverless)
- Deno-based
- Fast cold starts
- 2 functions:
  - `send-for-signature` - Sends docs to HelloSign
  - `signature-webhook` - Receives callbacks

#### **Storage** (S3-compatible)
- 1 GB free (100 GB on Pro)
- Private buckets for PDFs
- Signed URLs for secure access
- 2 buckets:
  - `documents` - Unsigned & signed PDFs
  - `templates` - Master templates

#### **Realtime** (WebSocket)
- Live database change broadcasts
- Auto-updates React UI
- No polling needed

**Why Supabase?**
- Open source (can self-host)
- Generous free tier
- Fast setup (no backend coding)
- Built-in realtime
- Great developer experience

**Package:** `@supabase/supabase-js` (v2.39.0)

---

## 📝 eSignature Provider

### **HelloSign (Dropbox Sign)**
- **Plan:** $15/month (Essentials - unlimited signatures)
- **Features:**
  - Send signature requests via API
  - Mobile-friendly signing
  - Legally binding signatures
  - Audit trail included
  - Webhook notifications

**Why HelloSign?**
- Easiest API to integrate
- Affordable unlimited plan
- Great mobile experience
- Reliable webhook delivery

**Integration:** Via Supabase Edge Functions

---

## 📠 eFax Provider (Future)

### **Options:**
1. **Twilio Fax** - $0.05/page sent
2. **eFax API** - $16.95/month (200 pages)
3. **SRFax** - $9.95/month (500 pages)

**Status:** Schema ready, implementation pending

---

## 🛠️ Development Tools

### **TypeScript**
- **Version:** 5.2.2
- **Why:** Type safety, better DX, fewer bugs

### **Supabase CLI**
- **Why:** Local development, migrations, function deployment
- **Install:** `npm install -g supabase`

---

## 📦 Key Dependencies

```json
{
  "dependencies": {
    "@clerk/clerk-react": "^4.30.0",      // Authentication
    "@supabase/supabase-js": "^2.39.0",   // Database & backend
    "lucide-react": "^0.263.1",           // Icons
    "react": "^18.2.0",                   // UI framework
    "react-dom": "^18.2.0",               // React DOM
    "zustand": "^4.4.7"                   // State management
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",     // Vite React plugin
    "tailwindcss": "^4.0.0",              // Styling
    "typescript": "^5.2.2",               // Type checking
    "vite": "^5.0.8"                      // Build tool
  }
}
```

---

## 🌐 Hosting Options

### **Recommended:**

**Vercel** (Easiest)
- One-click deploy from GitHub
- Automatic HTTPS
- Edge network (fast globally)
- Free tier: Unlimited hobby projects
- Pro: $20/month

**Netlify** (Alternative)
- Similar to Vercel
- Great for static sites
- Free tier: 100 GB bandwidth

**Cloudflare Pages** (Cheapest)
- Free unlimited bandwidth
- Global CDN
- Fast builds

---

## 💰 Cost Breakdown

### **Development (Free)**
```
Clerk:       Free tier (5,000 MAU)
Supabase:    Free tier
HelloSign:   3 signatures/month (testing)
Vercel:      Free tier
───────────────────────────────────
Total:       $0/month
```

### **Small Funeral Home (50 cases/month)**
```
Clerk:       Free tier
Supabase:    Free tier
HelloSign:   $15/month (Essentials)
Vercel:      Free tier
───────────────────────────────────
Total:       $15/month
```

### **Medium Funeral Home (200 cases/month)**
```
Clerk:       $25/month (10,000 MAU)
Supabase:    $25/month (Pro - more storage)
HelloSign:   $15/month (Essentials)
Vercel:      Free tier
───────────────────────────────────
Total:       $65/month
```

---

## 🔄 Data Flow

```
User Action (React)
       ↓
Clerk validates session
       ↓
Zustand updates local state
       ↓
Supabase API call (database)
       ↓
Edge Function triggered (if needed)
       ↓
HelloSign API (send signature)
       ↓
Family signs document
       ↓
HelloSign webhook → Edge Function
       ↓
Download signed PDF → Supabase Storage
       ↓
Update database (signatures_received++)
       ↓
Supabase Realtime broadcasts change
       ↓
React UI auto-updates ✨
```

---

## 🔐 Security Architecture

### **Authentication Layer (Clerk)**
- Handles: Login, sessions, passwords, MFA
- Provides: JWT tokens with user ID

### **Authorization Layer (Supabase RLS)**
- Validates: JWT from Clerk
- Enforces: Row Level Security policies
- Users can only see their own data

### **Storage Security**
- Private buckets (not public)
- Signed URLs for access
- Expiring download links

### **API Security**
- HTTPS everywhere
- Webhook signature verification
- API key in Edge Functions only (not frontend)

---

## 📊 Scalability

| Metric | Free Tier | Pro Tier | Handling |
|--------|-----------|----------|----------|
| **Cases/month** | 100-500 | 1,000+ | ✅ Automatic |
| **Concurrent users** | 50 | 1,000+ | ✅ Auto-scales |
| **Database size** | 500 MB | 500 GB | ✅ Expands |
| **API requests** | 500K/month | Unlimited | ✅ No limits |
| **Edge Functions** | 500K/month | 2M/month | ✅ Serverless |
| **Realtime connections** | 200 | 500 | ✅ WebSocket pool |

**Bottlenecks:** None expected until 5,000+ cases/month

---

## 🧪 Testing Stack (Future)

### **Recommended:**
- **Vitest** - Fast unit tests
- **Testing Library** - React component tests
- **Playwright** - E2E tests
- **MSW** - API mocking

---

## 📱 Mobile Support

**Current:** Fully responsive web app
- Works on mobile browsers
- Touch-optimized UI
- Mobile-friendly forms

**Future:** Native apps (optional)
- React Native (share code)
- Capacitor (wrap web app)
- PWA (installable web app)

---

## 🎯 Why This Stack?

### **✅ Pros:**
- Modern & fast
- Minimal backend code
- Great developer experience
- Scales automatically
- Affordable
- Easy to maintain
- Strong ecosystem

### **⚠️ Considerations:**
- Vendor lock-in (Clerk, Supabase, HelloSign)
  - Mitigation: Supabase is open source (can self-host)
- Need internet connection
  - Mitigation: PWA for offline support later
- Learning curve
  - Mitigation: Excellent documentation for all tools

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your keys

# Run development server
npm run dev

# Deploy Supabase
supabase link --project-ref YOUR_PROJECT_ID
supabase db push
supabase functions deploy

# Deploy frontend (Vercel)
vercel deploy
```

---

## 📚 Documentation

**Your guides:**
- `QUICKSTART_CHECKLIST.md` - 30-min setup
- `CLERK_SUPABASE_INTEGRATION.md` - Auth integration
- `SUPABASE_SETUP.md` - Complete backend setup
- `ARCHITECTURE.md` - Technical deep-dive
- `TECH_STACK.md` - This file

**Official docs:**
- [Clerk Docs](https://clerk.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [HelloSign API](https://developers.hellosign.com/)
- [React Docs](https://react.dev)
- [Zustand Docs](https://docs.pmnd.rs/zustand)

---

**This is a modern, production-ready stack!** 🎉

Your combination of **Clerk + Supabase + HelloSign** is used by thousands of successful SaaS companies. You're in good company! 🚀
