import { CasesClient } from '@/components/CasesClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cases',
}

export default async function CasesPage() {
  return <CasesClient />;
}

