import { SettingsClient } from '@/components/SettingsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function SettingsPage() {
  return <SettingsClient />;
}

