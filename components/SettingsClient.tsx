'use client';

import { useRouter } from 'next/navigation';
import { ProfileSettings } from './ProfileSettings';

export function SettingsClient() {
  const router = useRouter();

  return <ProfileSettings onBack={() => router.push('/dashboard')} />;
}

