import { StaffVendorsClient } from '@/components/StaffVendorsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Staff & Vendors',
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function StaffVendorsPage() {
  return <StaffVendorsClient />;
}

