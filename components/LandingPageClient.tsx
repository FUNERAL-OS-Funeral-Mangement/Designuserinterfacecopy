'use client';

import { useState } from 'react';
import { CalendlyModal } from './CalendlyModal';
import { LandingHeader } from './landing/LandingHeader';
import { LandingHero } from './landing/LandingHero';
import { LandingFeatures } from './landing/LandingFeatures';
import { LandingSteps } from './landing/LandingSteps';
import { LandingBenefits } from './landing/LandingBenefits';
import { LandingTestimonials } from './landing/LandingTestimonials';
import { LandingCTA } from './landing/LandingCTA';
import { LandingFooter } from './landing/LandingFooter';
import { CALENDLY_URL } from '@/constants/app';

export const LandingPageClient = () => {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const handleOpenCalendly = () => {
    setIsCalendlyOpen(true);
  };

  const handleCloseCalendly = () => {
    setIsCalendlyOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <LandingHeader onBookDemo={handleOpenCalendly} />
      <LandingHero onViewDemo={handleOpenCalendly} />
      <LandingFeatures />
      <LandingSteps />
      <LandingBenefits />
      <LandingTestimonials />
      <LandingCTA onViewDemo={handleOpenCalendly} />
      <LandingFooter />

      <CalendlyModal
        isOpen={isCalendlyOpen}
        onClose={handleCloseCalendly}
        url={CALENDLY_URL}
      />
    </div>
  );
};
