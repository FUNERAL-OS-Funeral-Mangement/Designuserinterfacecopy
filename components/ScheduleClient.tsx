'use client';

import { useRouter } from 'next/navigation';
import { WeeklySchedule } from './WeeklySchedule';

export function ScheduleClient() {
  const router = useRouter();

  return <WeeklySchedule onBack={() => router.push('/dashboard')} />;
}
