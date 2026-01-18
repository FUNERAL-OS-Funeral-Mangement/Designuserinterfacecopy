'use client';

import { ArrowRight, Phone, Clipboard, FileText, PenTool, CheckCircle } from 'lucide-react';
import { Pill } from '@/components/shared/Pill';
import { Card } from '@/components/shared/Card';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { landingPageContent } from '@/data/landingPageContent';
import { cn } from '@/components/ui/utils';

const iconMap = {
  Phone,
  Clipboard,
  FileText,
  PenTool,
};

const getStepMockup = (stepNumber: number) => {
  switch (stepNumber) {
    case 1:
      return (
        <div className="space-y-4">
          {[
            { icon: <CheckCircle className="w-6 h-6 text-slate-600" />, active: true },
            { icon: <Phone className="w-6 h-6 text-gray-500" />, active: false },
            { icon: <FileText className="w-6 h-6 text-gray-500" />, active: false },
          ].map((row, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl border",
                row.active
                  ? "bg-indigo-50 border-indigo-100"
                  : "bg-gray-50 border-gray-100"
              )}
            >
              <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", row.active ? "bg-indigo-100" : "bg-gray-200")}>
                {row.icon}
              </div>
              <div className="flex-1">
                <div className={cn("h-3 rounded w-3/4 mb-2", row.active ? "bg-indigo-200" : "bg-gray-200")} />
                <div className={cn("h-2 rounded w-1/2", row.active ? "bg-indigo-100" : "bg-gray-100")} />
              </div>
            </div>
          ))}
        </div>
      );
    case 2:
      return (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="h-3 bg-indigo-200 rounded w-32" />
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-indigo-100 rounded w-full" />
              <div className="h-2 bg-indigo-100 rounded w-5/6" />
              <div className="h-2 bg-indigo-100 rounded w-4/6" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="h-2 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-300 rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
      );
    case 3:
      return (
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
              <div className="aspect-square bg-indigo-100 rounded-lg mb-3" />
              <div className="h-2 bg-indigo-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-indigo-300 rounded w-1/2" />
            </div>
          ))}
        </div>
      );
    case 4:
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
            <div className="flex items-center justify-between mb-4">
              <div className="h-3 bg-indigo-200 rounded w-1/3" />
              <div className="w-8 h-8 bg-indigo-500 rounded-full" />
            </div>
            <div className="border-2 border-dashed border-indigo-200 rounded-xl p-6 bg-white">
              <div className="h-16 bg-indigo-100 rounded mb-3" />
              <div className="h-2 bg-indigo-200 rounded w-full mb-2" />
              <div className="h-2 bg-indigo-200 rounded w-4/5" />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-1 bg-indigo-500 rounded-xl p-3">
              <div className="h-2 bg-white/50 rounded w-3/4 mx-auto" />
            </div>
            <div className="flex-1 bg-gray-100 rounded-xl p-3">
              <div className="h-2 bg-gray-300 rounded w-3/4 mx-auto" />
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export const LandingSteps = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-white">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <SectionHeading
          center
          title="Better in every way"
          subtitle="Streamlined workflows designed to help you serve families with compassion while reducing administrative burden by up to 70%."
        />

        <div className="space-y-32 max-w-6xl mx-auto">
          {landingPageContent.steps.map((s) => {
            const IconComponent = iconMap[s.iconName];
            
            const Text = (
              <div>
                <Pill icon={<IconComponent className="w-5 h-5 text-slate-600" />}>{s.label}</Pill>
                <h3 className="text-3xl sm:text-4xl text-gray-900 mb-6 mt-6">{s.title}</h3>
                {s.body.map((p, idx) => (
                  <p key={idx} className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {p}
                  </p>
                ))}
                <button className="inline-flex items-center gap-2 px-6 py-3 text-base text-white bg-slate-600 rounded-full hover:bg-slate-700 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );

            const Visual = (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl blur-3xl opacity-30" />
                <Card className="p-8">{getStepMockup(s.step)}</Card>
              </div>
            );

            return (
              <div key={s.step} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {s.flip ? (
                  <>
                    <div className="order-2 lg:order-1">{Visual}</div>
                    <div className="order-1 lg:order-2">{Text}</div>
                  </>
                ) : (
                  <>
                    <div>{Text}</div>
                    <div>{Visual}</div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

