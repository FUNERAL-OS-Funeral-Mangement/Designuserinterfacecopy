'use client';

import { FileText, ListChecks, Users, CheckCircle } from 'lucide-react';
import { Pill } from '@/components/shared/Pill';
import { Card } from '@/components/shared/Card';
import { landingPageContent } from '@/data/landingPageContent';

const iconMap = {
  FileText: FileText,
  Users: Users,
  CheckCircle: CheckCircle,
  ListChecks: ListChecks,
};

export const LandingFeatures = () => {
  return (
    <section className="relative py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16">
          <div className="space-y-8">
            <div>
              <Pill icon={<ListChecks className="w-5 h-5 text-slate-600" />}>Organize</Pill>
              <h2 className="text-4xl sm:text-5xl text-gray-900 mb-4 mt-4">Stay organized</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Never lose another form, get signatures immediately, eliminate the search for case files, and stay more
                organized than ever.
              </p>
            </div>

            <div className="space-y-4">
              {landingPageContent.features.map((f) => {
                const IconComponent = iconMap[f.iconName];
                return (
                  <div key={f.title} className="group relative">
                    <div className="relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl flex items-center justify-center shrink-0 text-slate-600 group-hover:scale-110 transition-transform">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-lg text-gray-900 mb-2">{f.title}</h4>
                          <p className="text-gray-600">{f.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl blur-3xl opacity-30 transform rotate-6" />
            <Card>
              <div className="p-12 flex flex-col items-center justify-center min-h-[500px]">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl flex items-center justify-center mb-6">
                  <FileText className="w-12 h-12 text-slate-600" />
                </div>
                <p className="text-2xl text-gray-700">Digital Case Management</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

