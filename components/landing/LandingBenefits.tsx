'use client';

import { CheckCircle } from 'lucide-react';
import { Pill } from '@/components/shared/Pill';
import { Card } from '@/components/shared/Card';
import { landingPageContent } from '@/data/landingPageContent';

export const LandingBenefits = () => {
  return (
    <section className="relative py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16">
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl blur-3xl opacity-30 transform -rotate-6" />
            <Card>
              <div className="p-6 space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-indigo-200">
                      <CheckCircle className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div className="flex-1">
                      <div className="h-3 bg-indigo-100 rounded w-3/4 mb-2" />
                      <div className="h-2 bg-indigo-50 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="order-1 lg:order-2">
            <Pill>Benefits</Pill>
            <h2 className="text-4xl sm:text-5xl text-gray-900 mb-6 mt-6">Built for Compassionate Care</h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Every feature is designed with both funeral directors and grieving families in mind.
            </p>

            <div className="space-y-6">
              {landingPageContent.benefits.map((b) => (
                <div key={b.title} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl text-gray-900 mb-2">{b.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

