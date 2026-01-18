'use client';

import { ViewDemoButton } from '@/components/shared/ViewDemoButton';

interface LandingCTAProps {
  onViewDemo: () => void;
}

export const LandingCTA = ({ onViewDemo }: LandingCTAProps) => {
  return (
    <section className="relative py-20 sm:py-24 lg:py-28 bg-gradient-to-br from-slate-600 via-indigo-600 to-purple-600 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
      </div>

      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl relative text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6">Ready to Transform Your Workflow?</h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join hundreds of funeral homes using Rite Path to serve families with dignity, efficiency, and compassion.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <ViewDemoButton className="px-8 py-4 rounded-full hover:scale-105" onClick={onViewDemo} />
          <button className="inline-flex items-center justify-center px-8 py-4 text-base text-white bg-white/10 border-2 border-white/30 rounded-full hover:bg-white/20 hover:shadow-xl hover:scale-105 transition-all duration-200 backdrop-blur-sm">
            Schedule Demo
          </button>
        </div>

        <p className="mt-6 text-sm text-white/70">Secure login • Professional funeral home management</p>
      </div>
    </section>
  );
};

