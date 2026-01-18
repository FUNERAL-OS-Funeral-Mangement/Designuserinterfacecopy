'use client';

import { useRouter } from 'next/navigation';
import { Catalogs } from './Catalogs';

export function CatalogsClient() {
  const router = useRouter();

  return <Catalogs onBack={() => router.push('/dashboard')} />;
}

