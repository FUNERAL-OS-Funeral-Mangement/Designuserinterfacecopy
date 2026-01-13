import { DashboardClient } from '@/components/DashboardClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage() {
  return <DashboardClient />;
}

