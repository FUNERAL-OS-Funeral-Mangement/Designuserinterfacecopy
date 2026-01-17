import { CasesClient } from '@/components/CasesClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cases',
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function CasesPage() {
  return <CasesClient />;
}

