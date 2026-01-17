'use client';

import { useRouter } from 'next/navigation';
import { useCaseStore } from '@/store/useCaseStore';
import { CaseDetailPage } from './CaseDetailPage';
import { useEffect, useState } from 'react';

export function CaseDetailClient({ caseId }: { caseId: string }) {
  const router = useRouter();
  const getCaseById = useCaseStore((state) => state.getCaseById);
  const [caseData, setCaseData] = useState<any>(null);

  useEffect(() => {
    const data = getCaseById(caseId);
    if (!data) {
      router.push('/cases');
      return;
    }
    setCaseData(data);
  }, [caseId, getCaseById, router]);

  if (!caseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading case details...</p>
        </div>
      </div>
    );
  }

  return (
    <CaseDetailPage
      caseId={caseData.caseId}
      caseNumber={caseData.caseNumber}
      deceasedName={caseData.deceasedName}
      caseType={caseData.caseType}
      dateCreated={caseData.dateCreated}
      photoUrl={caseData.photoUrl}
      onBack={() => router.push('/cases')}
    />
  );
}

