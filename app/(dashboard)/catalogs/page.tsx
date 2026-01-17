import { CatalogsClient } from '@/components/CatalogsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catalogs',
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function CatalogsPage() {
  return <CatalogsClient />;
}

