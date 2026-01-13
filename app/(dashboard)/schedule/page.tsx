import { ScheduleClient } from '@/components/ScheduleClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schedule',
}

export default async function SchedulePage() {
  return <ScheduleClient />;
}