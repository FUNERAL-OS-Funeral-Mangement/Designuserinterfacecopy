# Clerk Authentication Setup

## Installation

Install Clerk React SDK:

```bash
npm install @clerk/clerk-react@latest
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

### Getting Your Publishable Key

1. Visit [Clerk Dashboard - API Keys](https://dashboard.clerk.com/last-active?path=api-keys)
2. Select **React** from the framework options
3. Copy your Publishable Key
4. Paste it into `.env.local`

## Project Structure

```
/
├── main.tsx                    # Entry point with ClerkProvider
├── App.tsx                     # Main app with Clerk auth logic
├── components/
│   ├── LandingPage.tsx        # Public landing with SignInButton
│   ├── Dashboard.tsx          # Protected dashboard
│   └── ...
├── .env.local                 # Environment variables (gitignored)
└── .gitignore                 # Excludes .env*
```

## Implementation Details

### 1. Entry Point (main.tsx)
- Wraps the entire app with `<ClerkProvider>`
- Passes `publishableKey` from environment variables
- Sets `afterSignOutUrl` for post-logout redirect

### 2. App Component (App.tsx)
- Uses `useUser()` hook to check authentication state
- Uses `useClerk()` hook for sign-out functionality
- Shows loading state while auth is initializing
- Redirects unauthenticated users to landing page

### 3. Landing Page (LandingPage.tsx)
- Uses `<SignInButton>` component for authentication
- Provides public access to marketing content
- Clerk handles the entire sign-in/sign-up flow

## Clerk Components Used

- `<ClerkProvider>` - Root provider component
- `<SignInButton>` - Triggers Clerk's sign-in modal
- `<SignUpButton>` - Triggers Clerk's sign-up modal (optional)
- `<UserButton>` - User profile/settings dropdown (optional)
- `<SignedIn>` / `<SignedOut>` - Conditional rendering (optional)

## Clerk Hooks Used

- `useUser()` - Returns `{ isSignedIn, isLoaded, user }`
- `useClerk()` - Returns Clerk methods like `signOut()`

## Security Notes

⚠️ **Important:**
- Never commit `.env.local` or `.env` files to version control
- Always use placeholder values in documentation
- The `.env.local` file should be listed in `.gitignore`

## Authentication Flow

1. **Unauthenticated User:**
   - Sees LandingPage with `<SignInButton>`
   - Clicks "Get Started" or "Sign In"
   - Clerk modal appears for authentication
   - After sign-in, redirected to Dashboard

2. **Authenticated User:**
   - `isSignedIn` is true
   - Can access all protected routes
   - Can sign out via Dashboard

3. **Sign Out:**
   - Calls `signOut()` from `useClerk()`
   - Redirects to landing page (configured in `ClerkProvider`)

## Migration from Supabase

This app was previously using Supabase auth. The following changes were made:

### Removed:
- `/lib/supabase.ts` - Supabase client and helpers
- `/components/LoginPage.tsx` - Custom login page
- Supabase authentication logic in `App.tsx`

### Added:
- `/main.tsx` - Entry point with ClerkProvider
- Clerk authentication in `App.tsx`
- Clerk components in `LandingPage.tsx`

### Benefits of Clerk:
- **Managed UI:** No need to build custom login forms
- **Better UX:** Pre-built, tested authentication modals
- **More Features:** Social logins, MFA, user management
- **Less Code:** Significantly reduced authentication boilerplate

## Documentation

- [Clerk React Quickstart](https://clerk.com/docs/quickstarts/react)
- [Clerk React SDK Reference](https://clerk.com/docs/references/react/overview)
- [Clerk Dashboard](https://dashboard.clerk.com/)
