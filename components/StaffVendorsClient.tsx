'use client';

import { useRouter } from 'next/navigation';
import { StaffAndVendors } from './StaffAndVendors';

export function StaffVendorsClient() {
  const router = useRouter();

  return <StaffAndVendors onBack={() => router.push('/dashboard')} />;
}

