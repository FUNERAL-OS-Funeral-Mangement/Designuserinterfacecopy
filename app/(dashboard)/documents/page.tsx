import { DocumentsClient } from '@/components/DocumentsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documents',
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function DocumentsPage() {
  return <DocumentsClient />;
}

