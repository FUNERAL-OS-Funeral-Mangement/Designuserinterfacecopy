import { LandingPageClient } from '@/components/LandingPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RitePath - Funeral Home Management',
  description: 'Modern funeral home management software for streamlined operations and better family service.',
}

export const dynamic = 'force-static';

export default function Home() {
  return <LandingPageClient />;
}

