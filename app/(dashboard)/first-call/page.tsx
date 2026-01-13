import { FirstCallClient } from '@/components/FirstCallClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'First Call',
}

export default async function FirstCallPage() {
  return <FirstCallClient />;
}

