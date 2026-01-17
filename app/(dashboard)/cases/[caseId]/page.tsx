import { CaseDetailClient } from '@/components/CaseDetailClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Details',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function CaseDetailPage({ 
  params 
}: { 
  params: { caseId: string } 
}) {
  return <CaseDetailClient caseId={params.caseId} />;
}

