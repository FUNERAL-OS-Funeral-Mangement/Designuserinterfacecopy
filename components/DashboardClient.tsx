'use client';

import { UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Dashboard } from './Dashboard';

export function DashboardClient() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return <Dashboard onNavigate={handleNavigate} onLogout={() => router.push('/')} />;
}

