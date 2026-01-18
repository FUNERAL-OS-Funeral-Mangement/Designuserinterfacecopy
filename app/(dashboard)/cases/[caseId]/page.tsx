import { CaseDetailClient } from '@/components/CaseDetailClient';
import { Metadata } from 'next';
import { getCaseById } from './serverFunctions';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Case Details',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CaseDetailPage({ 
  params 
}: { 
  params: { caseId: string } 
}) {
  // Fetch case data from database using server function
  const caseData = await getCaseById(params.caseId);

  // Redirect to cases page if case not found
  if (!caseData) {
    redirect('/cases');
  }

  // Pass data to client component as props
  return (
    <CaseDetailClient
      caseId={caseData.id}
      caseNumber={caseData.caseNumber}
      deceasedName={caseData.deceasedName}
      caseType={caseData.caseType}
      dateCreated={caseData.dateCreated}
      photoUrl={caseData.photoUrl}
    />
  );
}

