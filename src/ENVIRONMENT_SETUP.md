# Environment Variables Setup Guide

## 📁 Files Created (Visible in Figma Make)

Since Figma Make doesn't support dotfiles (`.env`, `.gitignore`), I've created these template files:

1. **`/env.example`** - Environment variables template
2. **`/gitignore.example`** - Git ignore template  
3. **This file** - Complete setup instructions

---

## 🚀 How to Use for Production Deployment

### Step 1: Create Local `.env` File

When you export this project to your local machine:

```bash
# In your project root, create .env file
cp env.example .env
```

Then edit `.env` with your actual values:
```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_c2V0dGxlZC1kcmFnb24tNC5jbGVyay5hY2NvdW50cy5kZXYk
VITE_API_URL=https://your-django-backend.com
VITE_USE_MOCK_AUTH=false  # Switch to real Clerk
```

### Step 2: Create `.gitignore` File

```bash
# In your project root, create .gitignore file
cp gitignore.example .gitignore
```

This protects your `.env` file from being committed to git.

### Step 3: Update Your Code

Replace hardcoded values with environment variables:

#### Before (Hardcoded):
```typescript
const CLERK_KEY = "pk_test_c2V0dGxlZC1kcmFnb24tNC5jbGVyay5hY2NvdW50cy5kZXYk";
```

#### After (Using env vars):
```typescript
const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const API_URL = import.meta.env.VITE_API_URL;
const USE_MOCK_AUTH = import.meta.env.VITE_USE_MOCK_AUTH === 'true';
```

---

## 🔐 Environment Variables for Different Platforms

### **Vercel Deployment**

1. Go to your project dashboard
2. Navigate to: **Settings → Environment Variables**
3. Add these variables:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `VITE_CLERK_PUBLISHABLE_KEY` | `pk_test_c2V0dGxlZC1kcmFnb24tNC5jbGVyay5hY2NvdW50cy5kZXYk` | Production, Preview, Development |
| `VITE_API_URL` | `https://your-django-backend.com` | Production |
| `VITE_API_URL` | `http://localhost:8000` | Development |
| `VITE_USE_MOCK_AUTH` | `false` | Production |

### **Netlify Deployment**

1. Go to: **Site settings → Build & deploy → Environment**
2. Add the same variables as above

### **AWS Amplify**

1. Go to: **App settings → Environment variables**
2. Add the same variables as above

### **Self-Hosted / VPS**

Create `.env` file and use a process manager:

```bash
# Using PM2
pm2 start npm --name "rite-path" -- run dev

# Using systemd
# Add Environment="VITE_CLERK_PUBLISHABLE_KEY=pk_test_..."
# to your service file
```

---

## 📝 Current Configuration

### In Figma Make (Right Now):
- ✅ Using **mock authentication** (`/components/MockClerkProvider.tsx`)
- ✅ All Clerk configuration in `/CLERK_CONFIG.md`
- ⚠️ **No real environment variables** (not supported here)
- ✅ Safe to test and demo

### For Production:
- 🔄 Switch to **real Clerk** authentication
- 🔐 Store secrets in **hosting platform dashboard**
- 🚫 Never commit `.env` to git
- ✅ Use `.gitignore` to protect secrets

---

## 🔑 Environment Variable Reference

| Variable | Purpose | Safe to Expose? | Example |
|----------|---------|-----------------|---------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk frontend authentication | ✅ Yes | `pk_test_...` |
| `VITE_API_URL` | Backend API endpoint | ✅ Yes | `https://api.example.com` |
| `VITE_USE_MOCK_AUTH` | Toggle mock/real auth | ✅ Yes | `true` or `false` |
| `CLERK_SECRET_KEY` | **Backend only!** | ❌ **NEVER** | `sk_test_...` |

---

## ✅ Security Checklist

Before deploying to production:

- [ ] Created `.env` file locally (from `env.example`)
- [ ] Created `.gitignore` file (from `gitignore.example`)
- [ ] Added environment variables to hosting platform dashboard
- [ ] Verified `.env` is listed in `.gitignore`
- [ ] Set `VITE_USE_MOCK_AUTH=false` in production
- [ ] Never committed `.env` to git
- [ ] Never used secret keys (`sk_test_*`) in frontend
- [ ] Updated `VITE_API_URL` to production backend URL

---

## 🛠️ Testing Environment Variables Locally

After creating `.env` file:

```bash
# Install dependencies
npm install

# Run dev server (automatically loads .env)
npm run dev

# Verify variables are loaded
# Open browser console and type:
console.log(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
```

---

## 📞 Need Help?

- **Vite Environment Variables:** https://vitejs.dev/guide/env-and-mode.html
- **Clerk Setup:** See `/CLERK_CONFIG.md`
- **Vercel Env Vars:** https://vercel.com/docs/environment-variables
- **Netlify Env Vars:** https://docs.netlify.com/environment-variables/overview/

---

## 💡 Pro Tips

1. **Different keys for different environments:**
   - Development: `pk_test_...`
   - Production: `pk_live_...`

2. **Never log sensitive variables:**
   ```typescript
   // ❌ BAD
   console.log(import.meta.env.VITE_SECRET_KEY);
   
   // ✅ GOOD
   const hasKey = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
   console.log('Clerk configured:', hasKey);
   ```

3. **Use type safety:**
   ```typescript
   // Create env.d.ts
   interface ImportMetaEnv {
     VITE_CLERK_PUBLISHABLE_KEY: string;
     VITE_API_URL: string;
     VITE_USE_MOCK_AUTH: string;
   }
   ```

---

**Last Updated:** December 18, 2024  
**Status:** Ready for production deployment 🚀
