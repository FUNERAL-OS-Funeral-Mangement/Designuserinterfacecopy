import { DashboardClient } from '@/components/DashboardClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function DashboardPage() {
  return <DashboardClient />;
}

