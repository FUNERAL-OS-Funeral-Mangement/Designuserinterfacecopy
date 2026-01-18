'use client';

import { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import { ViewDemoButton } from '@/components/shared/ViewDemoButton';
import { Card } from '@/components/shared/Card';
import { cn } from '@/components/ui/utils';

interface LandingHeroProps {
  onViewDemo: () => void;
}

const AVATAR_GRADIENTS = [
  'from-teal-400 to-teal-500',
  'from-teal-500 to-teal-600',
  'from-cyan-400 to-cyan-500',
  'from-teal-600 to-cyan-600',
] as const;

const STAR_COUNT = 5;
const MOCKUP_CARD_COUNT = 4;
const MOCKUP_ROW_COUNT = 3;

const WINDOW_CONTROL_COLORS = [
  { color: 'bg-red-400', label: 'Close' },
  { color: 'bg-yellow-400', label: 'Minimize' },
  { color: 'bg-green-400', label: 'Maximize' },
] as const;

export const LandingHero = ({ onViewDemo }: LandingHeroProps) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail('');
    onViewDemo();
  };

  return (
    <section className="relative pt-4 pb-12 sm:pt-6 sm:pb-16 lg:pt-8 lg:pb-20">
      <div className="px-4 mx-auto relative sm:px-6 lg:px-8 max-w-screen-2xl">
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl" />
          </div>

          <div className="relative px-12 py-8 sm:px-16 sm:py-10 lg:px-24 lg:py-12">
            <div className="grid items-center grid-cols-1 gap-y-8 lg:grid-cols-2 gap-x-16">
              <div>
                <h1 className="text-5xl text-black font-bold sm:text-6xl lg:text-7xl leading-tight">
                  First Call.{' '}
                  <span className="relative inline-block">
                    <span className="text-[#1aabe2] font-bold">Done Rite.</span>
                    <svg
                      className="absolute -bottom-2 left-0 w-full"
                      height="8"
                      viewBox="0 0 200 8"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M1 5.5C20 2.5 40 1 60 2C80 3 100 4.5 120 4C140 3.5 160 2 180 3C185 3.2 190 3.5 199 4"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="text-[#1aabe2]"
                      />
                    </svg>
                  </span>
                </h1>

                <p className="mt-12 text-lg text-black font-medium leading-relaxed">
                  Simple to use Funeral Software. From first call to<br /> final documentation. When the workflow is right, families get better care and
                  your team gets back time.
                </p>

                <div className="mt-6">
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email to get started"
                      className="flex-1 px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1aabe2] focus:border-transparent"
                      required
                      aria-label="Enter email to get started"
                    />
                    <ViewDemoButton type="submit" className="whitespace-nowrap" />
                  </form>
                  <p className="mt-3 text-sm text-slate-600">
                    Free 14-day trial. Try free today! 
                  </p>

                  <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {AVATAR_GRADIENTS.map((gradient, index) => (
                          <div
                            key={index}
                            className={cn(
                              'w-10 h-10 rounded-full bg-gradient-to-br border-2 border-white',
                              gradient
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <span className="text-slate-700">500+ funeral homes</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex gap-1" aria-label="Rating: 4.9 out of 5 stars">
                        {Array.from({ length: STAR_COUNT }).map((_, index) => (
                          <Star key={index} className="w-5 h-5 text-yellow-400 fill-yellow-400" aria-hidden="true" />
                        ))}
                      </div>
                      <span className="text-slate-700">4.9/5 from 2,400+ reviews</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right mockup */}
              <div className="relative">
                <div
                  className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl blur-3xl opacity-30 transform rotate-6"
                  aria-hidden="true"
                />
                <Card>
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 border-b border-indigo-100">
                    <div className="flex items-center gap-2 mb-6" aria-hidden="true">
                      {WINDOW_CONTROL_COLORS.map((control, index) => (
                        <div key={index} className={cn('w-3 h-3 rounded-full', control.color)} aria-label={control.label} />
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center">
                        <Heart className="w-8 h-8 text-white" aria-hidden="true" />
                      </div>
                      <div aria-hidden="true">
                        <div className="h-4 w-32 bg-indigo-200 rounded mb-2" />
                        <div className="h-3 w-24 bg-purple-100 rounded" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-4 gap-3" aria-hidden="true">
                      {Array.from({ length: MOCKUP_CARD_COUNT }).map((_, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100"
                        >
                          <div className="h-2 w-16 bg-gradient-to-r from-slate-500 to-indigo-500 rounded mb-3" />
                          <div className="h-6 w-12 bg-indigo-100 rounded" />
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3 pt-2" aria-hidden="true">
                      {Array.from({ length: MOCKUP_ROW_COUNT }).map((_, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100 flex items-center gap-3"
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl" />
                          <div className="flex-1">
                            <div className="h-3 w-32 bg-indigo-100 rounded mb-2" />
                            <div className="h-2 w-24 bg-indigo-50 rounded" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

