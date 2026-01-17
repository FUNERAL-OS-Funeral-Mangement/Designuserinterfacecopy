import { ScheduleClient } from '@/components/ScheduleClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schedule',
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function SchedulePage() {
  return <ScheduleClient />;
}