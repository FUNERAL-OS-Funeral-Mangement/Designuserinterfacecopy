# Clerk Authentication Configuration

## Frontend Configuration (Already Implemented)

**Publishable Key:**
```
pk_test_c2V0dGxlZC1kcmFnb24tNC5jbGVyay5hY2NvdW50cy5kZXYk
```

**Frontend API URL:**
```
https://settled-dragon-4.clerk.accounts.dev
```

**Frontend Domain (Authentication UI):**
```
https://settled-dragon-4.clerk.accounts.dev
```

---

## Backend Configuration (For Django Integration)

### API Endpoints

**Clerk Backend API:**
```
https://api.clerk.com
```

**Frontend API (for token validation):**
```
https://settled-dragon-4.clerk.accounts.dev
```

**JWKS Endpoint:**
```
https://settled-dragon-4.clerk.accounts.dev/.well-known/jwks.json
```

### Public Key for JWT Verification

```
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtMbWkFh7zauZs9qpP+8D
Izx09VTL9L2K2aebty/vpxoEkbxFzs6Z47SCxlTEhuEQ3XoMtzG3mXtB3w301fs8
7D/C8ZuvgoOLoL2pNjzmzM4pU350vI8Im5p5LpXZhQP2w7A95lOYolqwj8865ZXR
xzdyuHf+0O4ty/MUEIceaX48F1wd62sDm81lzXQ1p5fIc0xoEA2Pm0/kupVP96Sq
DTOHpWm2UGS2qcVk9zrFDblu/x9XprZ9Viy1pPsGo6F12hH7CsWnLoKxBtdgPxrX
uDuaQj98BxOuOU7KE60aUaDaNEkKoKOx5EXeW3uXmRir8UtdMV8JJzX/ptjNPJlm
LwIDAQAB
-----END PUBLIC KEY-----
```

---

## Django Integration Guide

### 1. Install Required Packages

```bash
pip install pyjwt cryptography requests
```

### 2. Django Middleware for JWT Verification

```python
import jwt
import requests
from django.http import JsonResponse
from functools import wraps

CLERK_JWKS_URL = "https://settled-dragon-4.clerk.accounts.dev/.well-known/jwks.json"

def get_clerk_public_key():
    """Fetch the public key from Clerk's JWKS endpoint"""
    response = requests.get(CLERK_JWKS_URL)
    jwks = response.json()
    # Extract the first key (you may need to match by 'kid' in production)
    return jwks['keys'][0]

def verify_clerk_token(token):
    """Verify a Clerk JWT token"""
    try:
        # Get the public key from JWKS endpoint
        jwk = get_clerk_public_key()
        
        # Decode and verify the token
        decoded = jwt.decode(
            token,
            jwk,
            algorithms=["RS256"],
            options={"verify_signature": True}
        )
        return decoded
    except jwt.InvalidTokenError:
        return None

def require_auth(view_func):
    """Decorator to protect Django views"""
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        
        if not auth_header.startswith('Bearer '):
            return JsonResponse({'error': 'No token provided'}, status=401)
        
        token = auth_header.split('Bearer ')[1]
        user_data = verify_clerk_token(token)
        
        if not user_data:
            return JsonResponse({'error': 'Invalid token'}, status=401)
        
        # Attach user data to request
        request.clerk_user = user_data
        return view_func(request, *args, **kwargs)
    
    return wrapper
```

### 3. Usage in Django Views

```python
from django.http import JsonResponse
from .middleware import require_auth

@require_auth
def protected_view(request):
    user_id = request.clerk_user.get('sub')  # User ID from Clerk
    user_email = request.clerk_user.get('email')
    
    return JsonResponse({
        'message': 'Success',
        'user_id': user_id,
        'email': user_email
    })
```

### 4. Frontend: Sending JWT Token

```typescript
// In your React app, when making API calls to Django
import { useAuth } from '@clerk/clerk-react';

function MyComponent() {
  const { getToken } = useAuth();
  
  const callProtectedAPI = async () => {
    const token = await getToken();
    
    const response = await fetch('https://your-django-api.com/api/endpoint', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.json();
  };
}
```

---

## Environment Variables

### Frontend (.env)
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_c2V0dGxlZC1kcmFnb24tNC5jbGVyay5hY2NvdW50cy5kZXYk
```

### Backend (Django settings.py)
```python
CLERK_SECRET_KEY = "sk_test_..." # Get from Clerk Dashboard
CLERK_JWKS_URL = "https://settled-dragon-4.clerk.accounts.dev/.well-known/jwks.json"
```

---

## Security Notes

- ✅ Frontend uses publishable key (safe to expose)
- ⚠️ Backend uses secret key (NEVER commit to git)
- 🔐 Always verify JWT tokens on the backend before trusting them
- 📝 JWKS endpoint is automatically updated by Clerk when keys rotate

---

## ⚠️ IMPORTANT: Figma Make Security Limitations

### Current Environment (Figma Make):
- ❌ **NOT production-ready** - All code is publicly visible
- ❌ **No dotfile support** - Cannot use `.env` or `.gitignore`
- ✅ **Mock auth is safe** - No real credentials exposed
- ⚠️ **DO NOT put real secrets** in this environment

### Why Mock Authentication is Currently Used:
1. **Secure for demo** - No real user data at risk
2. **Works in Figma Make** - No iframe restrictions
3. **Easy testing** - Any email/password works
4. **No credential exposure** - Nothing to leak

---

## 🚀 Production Deployment Security Checklist

When deploying to production (Vercel, Netlify, AWS, etc.):

### 1. Create `.env` file locally (NEVER commit to git)
```bash
# .env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_c2V0dGxlZC1kcmFnb24tNC5jbGVyay5hY2NvdW50cy5kZXYk
VITE_API_URL=https://your-django-backend.com
```

### 2. Create `.gitignore` to protect secrets
```bash
# .gitignore
.env
.env.local
.env.production
node_modules/
dist/
```

### 3. Set Environment Variables in Hosting Platform

**Vercel:**
```bash
# Dashboard → Settings → Environment Variables
VITE_CLERK_PUBLISHABLE_KEY = pk_test_c2V0dGxlZC1kcmFnb24tNC5jbGVyay5hY2NvdW50cy5kZXYk
VITE_API_URL = https://your-django-backend.com
```

**Netlify:**
```bash
# Site settings → Build & deploy → Environment
VITE_CLERK_PUBLISHABLE_KEY = pk_test_c2V0dGxlZC1kcmFnb24tNC5jbGVyay5hY2NvdW50cy5kZXYk
VITE_API_URL = https://your-django-backend.com
```

**AWS/Self-Hosted:**
```bash
# Use AWS Secrets Manager or similar
export VITE_CLERK_PUBLISHABLE_KEY="pk_test_..."
export VITE_API_URL="https://your-django-backend.com"
```

### 4. Update Code to Use Environment Variables

In `App.tsx`:
```typescript
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export default function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <AppContent />
    </ClerkProvider>
  );
}
```

### 5. Security Best Practices
- ✅ Use `.gitignore` to exclude `.env` files
- ✅ Never hardcode secrets in source code
- ✅ Use environment variables for all credentials
- ✅ Rotate keys if they're ever exposed
- ✅ Use different keys for dev/staging/production
- ✅ Keep `sk_test_*` (secret keys) server-side ONLY
- ⚠️ Publishable keys (`pk_test_*`) are safe in frontend but still use env vars

---

## 🔑 Key Types Explained

| Key Type | Example | Where to Use | Security Level |
|----------|---------|--------------|----------------|
| **Publishable Key** | `pk_test_...` | Frontend (React) | ✅ Safe to expose |
| **Secret Key** | `sk_test_...` | Backend (Django) | ⚠️ NEVER expose |
| **JWKS Public Key** | `-----BEGIN PUBLIC KEY-----` | Backend verification | ✅ Public by design |

---

## Current Status

✅ **Frontend:** Fully configured with Clerk authentication
⏳ **Backend:** Configuration ready, waiting for Django integration
🔒 **Security:** Mock auth for Figma Make, real Clerk for production deployment