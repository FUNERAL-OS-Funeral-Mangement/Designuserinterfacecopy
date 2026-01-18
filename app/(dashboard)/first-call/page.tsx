import { FirstCallClient } from '@/components/FirstCallClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'First Call',
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function FirstCallPage() {
  return <FirstCallClient />;
}

