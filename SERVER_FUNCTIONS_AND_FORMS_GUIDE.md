# Server Functions & React Hook Form Guide

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Server-Side Data Fetching Pattern](#server-side-data-fetching-pattern)
3. [React Hook Form Integration](#react-hook-form-integration)
4. [DynamicInput Component](#dynamicinput-component)
5. [Migration Guide](#migration-guide)
6. [Examples](#examples)

---

## Architecture Overview

### Current Architecture Stack
- **Next.js**: Frontend framework (Server Components + Client Components)
- **Nest.js**: Backend API for complex business logic and stronger API calls
- **Supabase**: Database and authentication
- **React Hook Form**: Form state management and validation
- **Zustand**: Client-side UI state only (NOT for database data)

### Data Flow Pattern

```
┌─────────────────────────────────────────────────────────────┐
│                     USER REQUEST                             │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  page.tsx (Server Component)                                 │
│  - Async function                                             │
│  - Calls serverFunctions.ts                                   │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  serverFunctions.ts                                          │
│  - Queries Supabase/Nest.js API                              │
│  - Returns transformed data                                   │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  Client Component (e.g., CaseDetailClient)                   │
│  - Receives data as props                                    │
│  - Handles user interactions                                 │
│  - Uses React Hook Form for forms                            │
└─────────────────────────────────────────────────────────────┘
```

---

## Server-Side Data Fetching Pattern

### Why Server Functions?

**Before (❌ Incorrect):**
```tsx
// Client Component fetching from Zustand store
export function CaseDetailClient({ caseId }) {
  const getCaseById = useCaseStore(state => state.getCaseById);
  const caseData = getCaseById(caseId); // Data from in-memory store
  // Problem: Data is stale, not from database
}
```

**After (✅ Correct):**
```tsx
// Server Component fetching from database
export default async function CaseDetailPage({ params }) {
  const caseData = await getCaseById(params.caseId); // Fresh from DB
  return <CaseDetailClient {...caseData} />;
}
```

### Benefits

1. **Always Fresh Data**: Data comes directly from database on each request
2. **SEO Friendly**: Server Components can render HTML with data
3. **Security**: Sensitive queries run on server, not exposed to client
4. **Performance**: Database queries run server-side, reducing client bundle
5. **Type Safety**: Full TypeScript support across server → client boundary

### File Structure

```
app/(dashboard)/cases/[caseId]/
├── page.tsx              # Server Component - fetches data
├── serverFunctions.ts    # Server-side database functions
└── ...

components/
└── CaseDetailClient.tsx  # Client Component - receives props
```

---

## Server Functions Implementation

### Step 1: Create `serverFunctions.ts`

**Location**: `app/(dashboard)/cases/[caseId]/serverFunctions.ts`

```typescript
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export interface CaseDetailData {
  id: string;
  caseNumber: string;
  deceasedName: string;
  caseType: 'At-Need' | 'Pre-Need';
  dateCreated: string;
  photoUrl?: string;
}

/**
 * Get case by ID from database
 * This runs on the SERVER, not in the browser
 */
export async function getCaseById(caseId: string): Promise<CaseDetailData | null> {
  try {
    // Query Supabase database
    const { data, error } = await supabaseAdmin
      .from('cases')
      .select('*')
      .eq('id', caseId)
      .single();

    if (error || !data) {
      return null;
    }

    // Transform database fields to match our TypeScript interface
    return {
      id: data.id,
      caseNumber: data.case_number || data.id,
      deceasedName: data.deceased_name || '',
      caseType: normalizeCaseType(data.case_type),
      dateCreated: data.created_at || new Date().toISOString(),
      photoUrl: data.photo_url || undefined,
    };
  } catch (error) {
    console.error('Error in getCaseById:', error);
    return null;
  }
}
```

### Step 2: Use in `page.tsx` (Server Component)

```typescript
import { getCaseById } from './serverFunctions';
import { redirect } from 'next/navigation';
import { CaseDetailClient } from '@/components/CaseDetailClient';

export default async function CaseDetailPage({ params }: { params: { caseId: string } }) {
  // ✅ Fetch data on SERVER
  const caseData = await getCaseById(params.caseId);

  // Handle not found
  if (!caseData) {
    redirect('/cases');
  }

  // ✅ Pass data as props to Client Component
  return <CaseDetailClient {...caseData} />;
}
```

### Step 3: Receive Props in Client Component

```typescript
'use client';

export interface CaseDetailClientProps {
  caseId: string;
  caseNumber: string;
  deceasedName: string;
  caseType: 'At-Need' | 'Pre-Need';
  dateCreated: string;
  photoUrl?: string;
}

export function CaseDetailClient(props: CaseDetailClientProps) {
  // ✅ Data comes as props, not from store
  // ✅ This component can use hooks and client-side features
  return <CaseDetailPage {...props} />;
}
```

---

## React Hook Form Integration

### Why React Hook Form?

- **Performance**: Minimal re-renders (only touched fields update)
- **Validation**: Built-in and custom validation rules
- **Less Code**: No manual state management for forms
- **Type Safety**: Full TypeScript support

### Installation

```bash
npm install react-hook-form
```

### Basic Usage

```tsx
'use client';

import { useForm } from 'react-hook-form';
import { DynamicInput } from '@/components/shared/DynamicInput';

interface FormData {
  email: string;
  name: string;
  phone?: string;
}

export function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
    // Send to API, update database, etc.
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DynamicInput
        label="Email"
        name="email"
        type="email"
        register={register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        })}
        error={errors.email}
      />

      <DynamicInput
        label="Full Name"
        name="name"
        type="text"
        register={register('name', {
          required: 'Name is required',
          minLength: {
            value: 2,
            message: 'Name must be at least 2 characters',
          },
        })}
        error={errors.name}
      />

      <DynamicInput
        label="Phone (Optional)"
        name="phone"
        type="tel"
        register={register('phone', {
          pattern: {
            value: /^[0-9]{10}$/,
            message: 'Phone must be 10 digits',
          },
        })}
        error={errors.phone}
      />

      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## DynamicInput Component

### Purpose

A **single reusable input component** that handles all form field types with validation.

### Features

- ✅ Supports: `text`, `email`, `number`, `password`, `tel`, `url`, `textarea`, `select`
- ✅ React Hook Form integration via `register()`
- ✅ Error display
- ✅ Accessibility (ARIA labels, error messages)
- ✅ Customizable styling
- ✅ Required field indicators

### API Reference

```typescript
interface DynamicInputProps {
  // Basic props
  label?: string;              // Field label
  name: string;                // Field name (must match register name)
  type?: 'text' | 'email' | 'number' | 'password' | 'tel' | 'url' | 'textarea' | 'select';
  
  // React Hook Form
  register: UseFormRegisterReturn;  // From register('fieldName', {...rules})
  error?: FieldError;               // From formState.errors.fieldName
  
  // Validation & Behavior
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  
  // Select-specific
  options?: Array<{ value: string; label: string }>;  // For select type
  
  // Textarea-specific
  rows?: number;  // Default: 4
  
  // Number-specific
  min?: number | string;
  max?: number | string;
  step?: number | string;
  
  // Styling
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  
  // Custom validation message (overrides error.message)
  validationMessage?: string;
}
```

### Usage Examples

#### Text Input

```tsx
<DynamicInput
  label="Deceased Name"
  name="deceasedName"
  type="text"
  register={register('deceasedName', {
    required: 'Deceased name is required',
    minLength: { value: 2, message: 'Must be at least 2 characters' },
  })}
  error={errors.deceasedName}
  placeholder="Enter full name"
/>
```

#### Email Input

```tsx
<DynamicInput
  label="Email Address"
  name="email"
  type="email"
  register={register('email', {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  })}
  error={errors.email}
/>
```

#### Select Dropdown

```tsx
<DynamicInput
  label="Case Type"
  name="caseType"
  type="select"
  register={register('caseType', {
    required: 'Please select a case type',
  })}
  error={errors.caseType}
  options={[
    { value: 'At-Need', label: 'At-Need' },
    { value: 'Pre-Need', label: 'Pre-Need' },
  ]}
  placeholder="Select case type"
/>
```

#### Textarea

```tsx
<DynamicInput
  label="Notes"
  name="notes"
  type="textarea"
  register={register('notes', {
    maxLength: {
      value: 500,
      message: 'Notes must be less than 500 characters',
    },
  })}
  error={errors.notes}
  rows={6}
  placeholder="Enter additional notes..."
/>
```

#### Number Input

```tsx
<DynamicInput
  label="Weight (lbs)"
  name="weight"
  type="number"
  register={register('weight', {
    required: 'Weight is required',
    min: { value: 0, message: 'Weight must be positive' },
    max: { value: 1000, message: 'Weight must be less than 1000 lbs' },
  })}
  error={errors.weight}
  min={0}
  max={1000}
  step={0.1}
/>
```

---

## Validation Rules Reference

### Built-in Validation

React Hook Form provides these built-in rules:

```typescript
register('fieldName', {
  // Required
  required: 'This field is required',  // Or just: required: true
  
  // Min/Max Length
  minLength: { value: 2, message: 'Too short' },
  maxLength: { value: 100, message: 'Too long' },
  
  // Numbers
  min: { value: 0, message: 'Must be positive' },
  max: { value: 100, message: 'Must be less than 100' },
  
  // Pattern (Regex)
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Invalid format',
  },
  
  // Custom Validation
  validate: {
    noAdmin: (value) => value !== 'admin' || 'Cannot use "admin"',
    asyncCheck: async (value) => {
      const exists = await checkIfExists(value);
      return !exists || 'Already exists';
    },
  },
})
```

### Common Patterns

#### Phone Number

```typescript
register('phone', {
  required: 'Phone number is required',
  pattern: {
    value: /^[0-9]{10}$/,
    message: 'Phone must be 10 digits',
  },
})
```

#### Date

```typescript
register('dateOfBirth', {
  required: 'Date of birth is required',
  validate: {
    validDate: (value) => {
      const date = new Date(value);
      return !isNaN(date.getTime()) || 'Invalid date';
    },
    notFuture: (value) => {
      const date = new Date(value);
      return date <= new Date() || 'Date cannot be in the future';
    },
  },
})
```

#### Conditional Required

```typescript
register('otherField', {
  required: {
    value: watch('hasOtherField') === true,
    message: 'Required when "has other field" is checked',
  },
})
```

---

## Migration Guide

### Migrating from Zustand Store to Server Functions

#### Before (❌ Store-Based)

```tsx
// page.tsx
export default function CaseDetailPage({ params }) {
  return <CaseDetailClient caseId={params.caseId} />;
}

// CaseDetailClient.tsx
export function CaseDetailClient({ caseId }) {
  const getCaseById = useCaseStore(state => state.getCaseById);
  const caseData = getCaseById(caseId); // ❌ From store
  // ...
}
```

#### After (✅ Server Functions)

```tsx
// serverFunctions.ts
export async function getCaseById(caseId: string) {
  const { data } = await supabaseAdmin.from('cases').select('*').eq('id', caseId).single();
  return transformData(data);
}

// page.tsx
export default async function CaseDetailPage({ params }) {
  const caseData = await getCaseById(params.caseId); // ✅ From database
  return <CaseDetailClient {...caseData} />;
}

// CaseDetailClient.tsx
export function CaseDetailClient(props: CaseDetailClientProps) {
  // ✅ Receives data as props
  // ...
}
```

### When to Use What

| Use Case | Solution |
|----------|----------|
| Data from database | `serverFunctions.ts` → `page.tsx` → Client Component |
| Form state & validation | React Hook Form with `DynamicInput` |
| UI state (modals, toggles) | Zustand store |
| Temporary form data | React Hook Form (not Zustand) |
| Global app state | Zustand store (only if needed) |

---

## Complete Example: Form with Server Data

```tsx
// serverFunctions.ts
export async function getCaseById(caseId: string) {
  const { data } = await supabaseAdmin.from('cases').select('*').eq('id', caseId).single();
  return transformData(data);
}

// page.tsx
export default async function EditCasePage({ params }) {
  const caseData = await getCaseById(params.caseId);
  if (!caseData) redirect('/cases');
  return <EditCaseForm initialData={caseData} />;
}

// EditCaseForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { DynamicInput } from '@/components/shared/DynamicInput';

interface CaseFormData {
  deceasedName: string;
  caseType: 'At-Need' | 'Pre-Need';
  email: string;
  phone: string;
}

export function EditCaseForm({ initialData }: { initialData: CaseFormData }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CaseFormData>({
    defaultValues: initialData, // Pre-fill form with server data
  });

  const onSubmit = async (data: CaseFormData) => {
    // Update via API/Nest.js
    await fetch(`/api/cases/${initialData.id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <DynamicInput
        label="Deceased Name"
        name="deceasedName"
        type="text"
        register={register('deceasedName', { required: 'Required' })}
        error={errors.deceasedName}
      />

      <DynamicInput
        label="Case Type"
        name="caseType"
        type="select"
        register={register('caseType', { required: 'Required' })}
        error={errors.caseType}
        options={[
          { value: 'At-Need', label: 'At-Need' },
          { value: 'Pre-Need', label: 'Pre-Need' },
        ]}
      />

      <DynamicInput
        label="Email"
        name="email"
        type="email"
        register={register('email', {
          required: 'Required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email',
          },
        })}
        error={errors.email}
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}
```

---

## Best Practices

### ✅ DO

- Use `serverFunctions.ts` for ALL database queries
- Keep `page.tsx` as async Server Components
- Pass data as props to Client Components
- Use React Hook Form for all forms
- Use `DynamicInput` for consistent UI
- Type all props and form data with TypeScript
- Handle errors gracefully (redirect on not found)

### ❌ DON'T

- Don't fetch database data in Client Components
- Don't use Zustand stores for database data
- Don't use manual form state (`useState`) - use React Hook Form
- Don't create separate input components - use `DynamicInput`
- Don't skip validation - always validate user input
- Don't expose sensitive queries to the client

---

## Troubleshooting

### "Case not found" after migration

**Problem**: `getCaseById()` returns `null`

**Solution**: 
1. Check database table name matches (`cases` vs `case` vs `Cases`)
2. Verify field names match database schema (`case_number` vs `caseNumber`)
3. Check `supabaseAdmin` is configured correctly
4. Add error logging: `console.error('DB Error:', error)`

### Form validation not working

**Problem**: Errors don't show up

**Solution**:
1. Ensure `register()` is passed to `DynamicInput`
2. Pass `error` prop from `formState.errors.fieldName`
3. Check validation rules are correct
4. Verify `handleSubmit()` wraps the form `onSubmit`

### Type errors with `caseType`

**Problem**: Type `string` not assignable to `'At-Need' | 'Pre-Need'`

**Solution**:
1. Normalize the value in `serverFunctions.ts`:
   ```typescript
   const normalizedCaseType: 'At-Need' | 'Pre-Need' = 
     (value === 'Pre-Need' || value === 'PreNeed') ? 'Pre-Need' : 'At-Need';
   ```

---

## Summary

1. **Server Functions**: Fetch data in `serverFunctions.ts` → use in `page.tsx` (Server Component) → pass to Client Component as props
2. **React Hook Form**: Use for all forms with `DynamicInput` component
3. **Zustand**: Only for UI state, NOT database data
4. **Type Safety**: Type everything with TypeScript interfaces

This pattern ensures:
- ✅ Always fresh data from database
- ✅ Better performance (server-side queries)
- ✅ Type safety across server/client boundary
- ✅ Consistent form handling across the app

