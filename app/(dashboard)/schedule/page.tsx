'use client';
import { WeeklySchedule } from '@/components/WeeklySchedule';
import { useRouter } from 'next/navigation';

export default function SchedulePage() {
  const router = useRouter();

  return <WeeklySchedule onBack={() => router.push('/dashboard')} />;
}