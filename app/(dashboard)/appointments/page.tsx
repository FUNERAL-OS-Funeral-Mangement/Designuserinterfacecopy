import { AppointmentsClient } from '@/components/AppointmentsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Appointments',
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function AppointmentsPage() {
  return <AppointmentsClient />;
}

