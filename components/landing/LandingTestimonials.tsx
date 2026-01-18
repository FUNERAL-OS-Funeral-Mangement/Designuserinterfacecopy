'use client';

import { Star } from 'lucide-react';
import { Pill } from '@/components/shared/Pill';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { landingPageContent } from '@/data/landingPageContent';

export const LandingTestimonials = () => {
  return (
    <section className="relative py-20 sm:py-24 lg:py-28 bg-white">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <SectionHeading
          center
          pill={<Pill>Testimonials</Pill>}
          title="Trusted by Funeral Homes"
          subtitle="See what funeral directors are saying about Rite Path"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {landingPageContent.testimonials.map((t) => (
            <div key={t.name} className="relative group">
              <div className="relative bg-white border-2 border-gray-100 rounded-3xl p-8 hover:border-indigo-300 hover:shadow-2xl transition-all h-full flex flex-col">
                <div className="flex mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-8 flex-grow text-lg leading-relaxed italic">"{t.quote}"</p>
                <div className="border-t border-gray-100 pt-6">
                  <p className="text-gray-900 text-lg">{t.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{t.role}</p>
                  <p className="text-sm text-indigo-500 mt-1">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

