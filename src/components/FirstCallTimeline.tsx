import { useEffect } from 'react';
import { ArrowLeft, FileText, Clock, Send, CheckCircle2, Circle } from 'lucide-react';
import { FirstCallIntakeSection } from './FirstCallIntakeSection';
import { FirstCallSignaturesSection } from './FirstCallSignaturesSection';
import { FirstCallFaxingSection } from './FirstCallFaxingSection';
import { FirstCallCompleteSection } from './FirstCallCompleteSection';
import { ActiveCasesDock } from './ActiveCasesDock';
import { ActiveCasesSidebar } from './ActiveCasesSidebar';
import { useFirstCallStore } from '../store/useFirstCallStore';

interface FirstCallTimelineProps {
  onBack: () => void;
  onNavigateToCases?: () => void;
  caseId?: string;
}

type TimelineStage = 'intake' | 'signatures' | 'faxing' | 'complete';

export function FirstCallTimeline({ onBack, onNavigateToCases, caseId }: FirstCallTimelineProps) {
  const { 
    activeCaseId, 
    createCase, 
    updateCase, 
    getActiveCase,
    switchCase 
  } = useFirstCallStore();

  // Initialize case if needed
  useEffect(() => {
    if (!activeCaseId && !caseId) {
      // Create a new case if none exists
      createCase('', '');
    } else if (caseId && caseId !== activeCaseId) {
      // Switch to specified case
      switchCase(caseId);
    }
  }, []);

  const activeCase = getActiveCase();

  if (!activeCase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading case...</p>
        </div>
      </div>
    );
  }

  const handleNewCall = () => {
    createCase('', '');
  };

  const stages = [
    { id: 'intake' as TimelineStage, label: 'First Call Intake', icon: FileText },
    { id: 'signatures' as TimelineStage, label: 'Signatures', icon: Clock },
    { id: 'faxing' as TimelineStage, label: 'Faxing', icon: Send },
    { id: 'complete' as TimelineStage, label: 'Complete', icon: CheckCircle2 },
  ];

  const handleIntakeComplete = (data: any) => {
    updateCase(activeCase.id, {
      currentStage: 'signatures',
      completedStages: [...activeCase.completedStages, 'intake'],
      intakeComplete: true,
      deceasedName: data.deceasedName || activeCase.deceasedName,
      nextOfKinName: data.nextOfKinName || activeCase.nextOfKinName,
      familyContactName: data.nextOfKinName || data.callerName,
      callerName: data.callerName,
      callerPhone: data.callerPhone,
      address: data.address,
      timeOfDeath: data.timeOfDeath,
      signaturesTotal: data.signaturesTotal || 1,
      faxesTotal: data.signaturesTotal || 1,
    });
  };

  const handleSignatureReceived = () => {
    const newSigCount = activeCase.signaturesReceived + 1;
    const allSigned = newSigCount >= activeCase.signaturesTotal;
    
    updateCase(activeCase.id, {
      signaturesReceived: newSigCount,
      currentStage: allSigned ? 'faxing' : 'signatures',
      completedStages: allSigned 
        ? [...activeCase.completedStages, 'signatures']
        : activeCase.completedStages,
      faxesTotal: activeCase.signaturesTotal,
    });
  };

  const handleFaxSent = () => {
    const newFaxCount = activeCase.faxesSent + 1;
    const allFaxed = newFaxCount >= activeCase.faxesTotal;
    
    updateCase(activeCase.id, {
      faxesSent: newFaxCount,
      currentStage: allFaxed ? 'complete' : 'faxing',
      completedStages: allFaxed 
        ? [...activeCase.completedStages, 'faxing']
        : activeCase.completedStages,
    });
  };

  const getStageStatus = (stageId: TimelineStage) => {
    if (activeCase.completedStages.includes(stageId)) return 'complete';
    if (activeCase.currentStage === stageId) return 'active';
    return 'pending';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar - Active Cases Queue */}
      <ActiveCasesSidebar 
        onNewCall={handleNewCall}
        onBackToDashboard={onBack}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Case Timeline Header - Sticky */}
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-4">
              <h1 className="text-gray-900 mb-1">
                {activeCase.deceasedName || 'First Call Case'}
              </h1>
              <p className="text-sm text-gray-600">The system will guide you through each step automatically</p>
            </div>

            {/* Horizontal Timeline */}
            <div className="relative">
              <div className="flex items-center justify-between">
                {stages.map((stage, index) => {
                  const status = getStageStatus(stage.id);
                  const Icon = stage.icon;
                  const isLast = index === stages.length - 1;

                  return (
                    <div key={stage.id} className="flex items-center flex-1">
                      <button
                        onClick={() => {
                          // Allow clicking for review only
                          if (activeCase.completedStages.includes(stage.id)) {
                            updateCase(activeCase.id, { currentStage: stage.id });
                          }
                        }}
                        disabled={status === 'pending'}
                        className={`flex items-center gap-3 group ${
                          status === 'pending' ? 'cursor-not-allowed' : 'cursor-pointer'
                        }`}
                      >
                        {/* Circle Indicator */}
                        <div className={`
                          relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
                          ${status === 'complete' 
                            ? 'bg-green-600 border-green-600' 
                            : status === 'active'
                              ? 'bg-blue-600 border-blue-600 ring-4 ring-blue-100'
                              : 'bg-white border-gray-300'
                          }
                        `}>
                          {status === 'complete' ? (
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          ) : status === 'active' ? (
                            <Icon className="w-5 h-5 text-white" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400" />
                          )}
                        </div>

                        {/* Label */}
                        <div className="text-left hidden sm:block">
                          <p className={`text-sm ${
                            status === 'active' 
                              ? 'text-gray-900' 
                              : status === 'complete'
                                ? 'text-gray-700'
                                : 'text-gray-400'
                          }`}>
                            {stage.label}
                          </p>
                          {status === 'active' && (
                            <p className="text-xs text-blue-600">In progress</p>
                          )}
                          {status === 'complete' && (
                            <p className="text-xs text-green-600">✓ Complete</p>
                          )}
                        </div>
                      </button>

                      {/* Connecting Line */}
                      {!isLast && (
                        <div className={`flex-1 h-0.5 mx-2 sm:mx-4 transition-colors ${
                          activeCase.completedStages.includes(stage.id)
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
        </div>

        {/* Main Content - Auto-advancing sections */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
          {activeCase.currentStage === 'intake' && (
            <FirstCallIntakeSection onComplete={handleIntakeComplete} />
          )}

          {activeCase.currentStage === 'signatures' && (
            <FirstCallSignaturesSection 
              signaturesReceived={activeCase.signaturesReceived}
              signaturesTotal={activeCase.signaturesTotal}
              onSignatureReceived={handleSignatureReceived}
              onSafeExit={onBack}
              onStartNewCall={handleNewCall}
            />
          )}

          {activeCase.currentStage === 'faxing' && (
            <FirstCallFaxingSection 
              faxesSent={activeCase.faxesSent}
              faxesTotal={activeCase.faxesTotal}
              onFaxSent={handleFaxSent}
            />
          )}

          {activeCase.currentStage === 'complete' && (
            <FirstCallCompleteSection
              onNavigateToCases={onNavigateToCases}
            />
          )}
        </div>
      </div>
    </div>
  );
}