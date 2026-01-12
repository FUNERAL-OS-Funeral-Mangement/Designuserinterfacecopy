# Rite Path - Funeral Home Management System

A modern, mobile-first funeral home application that unifies all critical workflows into one intuitive experience.

## Features

- **Dashboard:** Central hub with funeral home logo upload and quick access to all sections
- **First Call Workflow:** Complete body removal intake with automatic case creation
- **Case Management:** Comprehensive case tracking with auto-generated case numbers
- **Family Digital Catalog:** Packages, add-ons, and A-La-Carte Package Builder
- **Contract Generation:** Automatic contract creation with e-signature support
- **Staff & Vendors Management:** Global system using Zustand state management
- **Appointments & Scheduling:** Weekly schedule management
- **Document Library:** Centralized document storage and organization

## Tech Stack

- **Frontend:** Next.js 14 (App Router) + React + TypeScript
- **Styling:** Tailwind CSS 4.0
- **State Management:** Zustand
- **Authentication:** Clerk
- **Icons:** Lucide React
- **Backend:** Next.js API Routes + Supabase
- **Database:** Supabase (PostgreSQL)

## Design System

Clean, medical-grade minimal design with:
- Soft blue/teal/gray color tones
- Inter typography
- 8/12/24 spacing system
- Minimal 2-color palette (gray neutrals + subtle blue accent)
- Clean rectangular components
- Large tappable cards suitable for families in grief

Inspired by premium product companies like Linear, Stripe, and Notion.

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn/pnpm
- Clerk account ([sign up here](https://clerk.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rite-path
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables** ⚠️ **REQUIRED**
   
   Copy the example environment file:
   ```bash
   copy .env.example .env.local
   ```

4. **Configure Clerk Authentication** ⚠️ **REQUIRED**
   
   a. Sign up for a free Clerk account at [clerk.com](https://clerk.com/)
   
   b. Create a new application in your Clerk Dashboard
   
   c. Get your Publishable Key:
      - Visit [Clerk Dashboard - API Keys](https://dashboard.clerk.com/last-active?path=api-keys)
      - Select **React** from the framework options
      - Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)
   
   d. Update `.env.local` file:
      ```env
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
      CLERK_SECRET_KEY=sk_test_your_secret_key_here
      ```
      
   **Important:** Replace the placeholder key with your actual key from Clerk!

5. **Run Database Migration** (if using Supabase)
   ```bash
   npm run db:push
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```
   
   **Note:** If you see a "Clerk Configuration Required" screen, it means you need to add your Clerk keys to `.env.local`

7. **Open your browser**
   
   Navigate to `http://localhost:3000`

## Authentication

This app uses [Clerk](https://clerk.com/) for authentication, providing:

- **Pre-built UI:** Professional sign-in/sign-up modals
- **Social Login:** Support for Google, GitHub, and more
- **User Management:** Built-in user profile and settings
- **Security:** Enterprise-grade security out of the box

See [CLERK_SETUP.md](./CLERK_SETUP.md) for detailed setup instructions.

## Project Structure

```
/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout with ClerkProvider
│   ├── page.tsx                # Landing page
│   ├── (dashboard)/            # Protected dashboard routes
│   └── api/                    # API routes
├── components/                 # React components
│   ├── Dashboard.tsx           # Main dashboard
│   ├── FirstCall.tsx           # First call workflow
│   ├── FirstCallDetails.tsx    # First call form
│   ├── Cases.tsx               # Case list view
│   ├── CaseDetailPage.tsx      # Individual case details
│   ├── LandingPage.tsx         # Public landing page
│   ├── StaffAndVendors.tsx     # Staff & vendors management
│   └── ...
├── store/                      # Zustand state stores
│   ├── useStore.ts             # Main case store
│   ├── useStaffStore.ts        # Staff & vendors store
│   ├── useCatalogStore.ts      # Catalog store
│   └── useAppointmentStore.ts  # Appointments store
├── styles/                     # Global styles
│   └── globals.css             # Tailwind + custom CSS
├── lib/                        # Utility libraries
│   └── supabase.ts             # Supabase client
├── .env.local                  # Environment variables (gitignored)
├── next.config.js              # Next.js configuration
├── middleware.ts               # Clerk auth middleware
└── .gitignore                  # Git ignore rules
```

## Key Workflows

### First Call Workflow

**Step 1: Basic Information**
- Caller details (name, relationship, phone)
- Deceased information (name, DOB, DOD, time of death)
- Location and address
- Weight (known/unknown toggle)
- Pickup readiness
- Stairs and family presence
- Next of kin details
- Verbal release toggle

**Step 2: Contact Details**
- Automatic release form notification
- SMS text message sent to next of kin

**Step 3: Body Removal**
- Notify removal team (checkbox)
- Select removal team from global staff/vendors list
- Auto-notification after e-signature received

### Case Management

- Auto-generated case numbers (C001, C002, etc.)
- Complete case details with all First Call information
- Multiple tabs: Information, Service Info, Documents, Orders, etc.
- Real-time updates via Zustand state management

### Staff & Vendors System

- Global management system accessible from Dashboard
- Separate tabs for Staff Members and Vendors
- Used throughout the app for team assignments
- Removal teams filtered and displayed in First Call workflow

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Adding New Features

1. Create new components in `/components` directory
2. Add state management in `/store` if needed
3. Update routing in `App.tsx`
4. Follow existing design patterns and naming conventions

## Environment Variables

Required environment variables:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `CLERK_SECRET_KEY` - Clerk secret key
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (server-side only)

**Security Note:** Never commit `.env.local` to version control. It's automatically ignored via `.gitignore`.

## Design Guidelines

- Use the existing Tailwind classes and spacing system
- Follow the Inter typography hierarchy (defined in `globals.css`)
- Maintain 8/12/24 spacing increments
- Use gray neutrals with subtle blue accents
- Keep components clean and rectangular (no excessive gradients)
- Ensure all interactive elements are large enough for touch (min 44x44px)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive (iOS Safari, Chrome Mobile)
- Tablet optimized (iPad, Android tablets)

## License

Proprietary - All rights reserved

## Support

For support, contact [your-email@example.com]

---

**Note:** This application uses Next.js 14 App Router with Clerk for authentication and Supabase for the database backend, providing a production-grade SaaS architecture with full multi-tenancy support.