'use client';

import { useRouter } from 'next/navigation';
import { FirstCall } from './FirstCall';

export function FirstCallClient() {
  const router = useRouter();

  return (
    <FirstCall
      onBack={() => router.push('/dashboard')}
      onNavigateToCases={() => router.push('/cases')}
    />
  );
}

