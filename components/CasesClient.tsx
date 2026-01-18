'use client';

import { useRouter } from 'next/navigation';
import { Cases } from './Cases';

export function CasesClient() {
  const router = useRouter();

  const handleCaseClick = (caseData: any) => {
    router.push(`/cases/${caseData.caseId || caseData.caseNumber}`);
  };

  return (
    <Cases
      onBack={() => router.push('/dashboard')}
      onCaseClick={handleCaseClick}
    />
  );
}

