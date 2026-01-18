'use client';

import { useRouter } from 'next/navigation';
import { CaseDetailPage } from './CaseDetailPage';

export interface CaseDetailClientProps {
  caseId: string;
  caseNumber: string;
  deceasedName: string;
  caseType: 'At-Need' | 'Pre-Need';
  dateCreated: string;
  photoUrl?: string;
}

/**
 * Client component for case details
 * Receives data as props from Server Component (page.tsx)
 * Data is fetched from database in serverFunctions.ts, not from Zustand store
 */
export function CaseDetailClient({
  caseId,
  caseNumber,
  deceasedName,
  caseType,
  dateCreated,
  photoUrl,
}: CaseDetailClientProps) {
  const router = useRouter();

  return (
    <CaseDetailPage
      caseId={caseId}
      caseNumber={caseNumber}
      deceasedName={deceasedName}
      caseType={caseType}
      dateCreated={dateCreated}
      photoUrl={photoUrl}
      onBack={() => router.push('/cases')}
    />
  );
}

