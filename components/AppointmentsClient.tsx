'use client';

import { useRouter } from 'next/navigation';
import { Appointments } from './Appointments';

export function AppointmentsClient() {
  const router = useRouter();

  return <Appointments onBack={() => router.push('/dashboard')} />;
}

