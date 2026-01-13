import { CatalogsClient } from '@/components/CatalogsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catalogs',
}

export default async function CatalogsPage() {
  return <CatalogsClient />;
}

