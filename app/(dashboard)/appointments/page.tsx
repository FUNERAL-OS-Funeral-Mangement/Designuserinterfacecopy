import { AppointmentsClient } from '@/components/AppointmentsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Appointments',
}

export default async function AppointmentsPage() {
  return <AppointmentsClient />;
}

