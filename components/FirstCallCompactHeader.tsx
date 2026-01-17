'use client';

import { CheckCircle2, Circle, LucideIcon } from 'lucide-react';

interface FirstCallCompactHeaderProps {
  onBack: () => void;
  onNewCall: () => void;
  visibleStages: Array<{
    id: string;
    label: string;
    icon: LucideIcon;
  }>;
  getStageStatus: (stageId: string) => 'complete' | 'active' | 'pending';
  onStageClick: (stageId: string) => void;
  completedStages: string[];
  activeCaseName?: string;
}

export function FirstCallCompactHeader({
  onBack,
  onNewCall,
  visibleStages,
  getStageStatus,
  onStageClick,
  completedStages,
  activeCaseName
}: FirstCallCompactHeaderProps) {

  return (
    <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
      {/* Compact Timeline Steps */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Case Name - Small */}
          {activeCaseName && (
            <div className="flex-1">
              <h2 className="text-base font-semibold text-gray-900">{activeCaseName}</h2>
              <p className="text-xs text-gray-500 mt-0.5">The system will guide you through each step automatically</p>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="flex items-center justify-between max-w-5xl mx-auto mt-4">
          {visibleStages.map((stage, index) => {
            const status = getStageStatus(stage.id);
            const Icon = stage.icon;
            const isLast = index === visibleStages.length - 1;
            const isPending = status === 'pending';
            const isActive = status === 'active';
            const isComplete = status === 'complete';

            return (
              <div key={stage.id} className="flex items-center flex-1">
                <button
                  onClick={() => !isPending && onStageClick(stage.id)}
                  disabled={isPending}
                  className={`flex items-center gap-2 group ${
                    isPending ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  {/* Circle Indicator - Compact */}
                  <div className={`
                    relative flex items-center justify-center w-7 h-7 rounded-full border-2 transition-all
                    ${isComplete 
                      ? 'bg-green-600 border-green-600' 
                      : isActive 
                        ? 'bg-blue-600 border-blue-600 ring-3 ring-blue-100' 
                        : 'bg-white border-gray-300'
                    }
                  `}>
                    {isComplete ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    ) : isActive ? (
                      <Icon className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </div>

                  {/* Label - Compact */}
                  <div className="text-left hidden md:block">
                    <p className={`text-xs font-medium ${
                      isActive
                        ? 'text-gray-900'
                        : isComplete
                          ? 'text-gray-700'
                          : 'text-gray-400'
                    }`}>
                      {stage.label}
                    </p>
                  </div>
                </button>

                {/* Connecting Line */}
                {!isLast && (
                  <div className={`flex-1 h-0.5 mx-2 transition-colors ${
                    completedStages.includes(stage.id)
                      ? 'bg-green-600'
                      : 'bg-gray-200'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
