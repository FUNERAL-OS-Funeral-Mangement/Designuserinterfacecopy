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

- **Frontend:** React + Vite + TypeScript
- **Styling:** Tailwind CSS 4.0
- **State Management:** Zustand
- **Authentication:** Clerk
- **Icons:** Lucide React
- **Backend:** Django (separate repository)
- **Database:** AWS

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

3. **Install Clerk React SDK**
   ```bash
   npm install @clerk/clerk-react@latest
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
      VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
      ```
      
   **Important:** Replace the placeholder key with your actual key from Clerk!

5. **Start the development server**
   ```bash
   npm run dev
   ```
   
   **Note:** If you see a "Clerk Configuration Required" screen, it means you need to add your Clerk key to `.env.local`

6. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

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
├── main.tsx                    # Entry point with ClerkProvider
├── App.tsx                     # Main app with routing logic
├── index.html                  # HTML entry point
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
├── .env.local                  # Environment variables (gitignored)
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

- `VITE_CLERK_PUBLISHABLE_KEY` - Clerk authentication key

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

**Note:** This application was migrated from Supabase to Clerk authentication for improved user experience and reduced authentication boilerplate.