import { DocumentsClient } from '@/components/DocumentsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documents',
}

export default async function DocumentsPage() {
  return <DocumentsClient />;
}

