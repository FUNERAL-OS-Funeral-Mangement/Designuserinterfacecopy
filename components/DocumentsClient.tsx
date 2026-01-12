'use client';

import { useRouter } from 'next/navigation';
import { DocumentLibrary } from './DocumentLibrary';

export function DocumentsClient() {
  const router = useRouter();

  return <DocumentLibrary onBack={() => router.push('/dashboard')} />;
}

