import { useEffect, useMemo, useCallback, useState } from 'react';
import { FileText, Clock, Send, CheckCircle2, ClipboardList, LucideIcon, Circle, Plus, X } from 'lucide-react';
import { FirstCallIntakeSection } from './FirstCallIntakeSection';
import { FirstCallSignaturesSection } from './FirstCallSignaturesSection';
import { FirstCallFaxingSection } from './FirstCallFaxingSection';
import { FirstCallCompleteSection } from './FirstCallCompleteSection';
import { FirstCallSummarySection } from './FirstCallSummarySection';
import { FirstCallCompactHeader } from './FirstCallCompactHeader';
import { ActiveCasesSidebar } from './ActiveCasesSidebar';
import { useFirstCallStore } from '../store/useFirstCallStore';
import { useCaseStore } from '../store/useCaseStore';

interface FirstCallTimelineProps {
  onBack: () => void;
  onNavigateToCases?: () => void;
  caseId?: string;
}

type TimelineStage = 'intake' | 'summary' | 'signatures' | 'faxing' | 'complete';
type StageStatus = 'complete' | 'active' | 'pending';

interface StageConfig {
  id: TimelineStage;
  label: string;
  icon: LucideIcon;
}

// DRY: Stage configurations in one place
const STAGE_CONFIGS: StageConfig[] = [
  { id: 'intake', label: 'First Call Intake', icon: FileText },
  { id: 'summary', label: 'Summary', icon: ClipboardList },
  { id: 'signatures', label: 'Signatures', icon: Clock },
  { id: 'faxing', label: 'Faxing', icon: Send },
  { id: 'complete', label: 'Complete', icon: CheckCircle2 },
];

// DRY: Stage visibility rules
const VERBAL_RELEASE_STAGES: TimelineStage[] = ['intake', 'summary', 'complete'];
const STANDARD_STAGES: TimelineStage[] = ['intake', 'signatures', 'faxing', 'complete'];

export function FirstCallTimeline({ onBack, onNavigateToCases, caseId }: FirstCallTimelineProps) {
  const { 
    activeCaseId, 
    createCase, 
    updateCase, 
    getActiveCase,
    switchCase,
    getAllActiveCases,
    deleteCase
  } = useFirstCallStore();
  
  const [caseToDelete, setCaseToDelete] = useState<string | null>(null);

  const { addCase } = useCaseStore();

  // Initialize case if needed
  useEffect(() => {
    if (!activeCaseId && !caseId) {
      createCase('', '');
    } else if (caseId && caseId !== activeCaseId) {
      switchCase(caseId);
    }
  }, [activeCaseId, caseId, createCase, switchCase]);

  const activeCase = getActiveCase();

  // Memoize active cases list
  const activeCases = useMemo(() => getAllActiveCases(), [getAllActiveCases]);

  // DRY: Memoized stage visibility
  const visibleStages = useMemo(() => {
    const stageIds = activeCase?.isVerbalRelease ? VERBAL_RELEASE_STAGES : STANDARD_STAGES;
    return STAGE_CONFIGS.filter(stage => stageIds.includes(stage.id));
  }, [activeCase]);

  // DRY: Reusable function to complete a stage and move to next
  const completeStage = useCallback((
    currentStageId: TimelineStage, 
    nextStageId: TimelineStage, 
    additionalUpdates: Record<string, any> = {}
  ) => {
    if (!activeCase) return;
    
    updateCase(activeCase.id, {
      currentStage: nextStageId as string,
      completedStages: [...activeCase.completedStages, currentStageId as string],
      ...additionalUpdates,
    });
  }, [activeCase, updateCase]);

  // DRY: Reusable function to update progress counters
  const updateProgress = useCallback((
    field: 'signaturesReceived' | 'faxesSent',
    total: number,
    currentStage: TimelineStage,
    nextStage: TimelineStage,
    additionalUpdates: Record<string, any> = {}
  ) => {
    if (!activeCase) return;
    
    const newCount = activeCase[field] + 1;
    const isComplete = newCount >= total;
    
    updateCase(activeCase.id, {
      [field]: newCount,
      currentStage: (isComplete ? nextStage : currentStage) as string,
      completedStages: isComplete 
        ? [...activeCase.completedStages, currentStage as string]
        : activeCase.completedStages,
      ...additionalUpdates,
    });

    return isComplete;
  }, [activeCase, updateCase]);

  const handleNewCall = useCallback(() => {
    createCase('', '');
  }, [createCase]);

  // Handle delete case with confirmation
  const handleDeleteCase = useCallback((caseId: string) => {
    deleteCase(caseId);
    setCaseToDelete(null);
    // If we deleted the active case and there are other cases, switch to the first one
    const remainingCases = getAllActiveCases().filter(c => c.id !== caseId);
    if (activeCaseId === caseId && remainingCases.length > 0) {
      switchCase(remainingCases[0].id);
    } else if (remainingCases.length === 0) {
      // Create a new case if all cases were deleted
      createCase('', '');
    }
  }, [deleteCase, getAllActiveCases, activeCaseId, switchCase, createCase]);

  const handleIntakeComplete = useCallback((data: any) => {
    if (!activeCase) return;
    
    const nextStage = data.isVerbalRelease ? 'summary' : 'signatures';
    
    completeStage('intake', nextStage, {
      intakeComplete: true,
      deceasedName: data.deceasedName || activeCase.deceasedName,
      nextOfKinName: data.nextOfKinName || activeCase.nextOfKinName,
      familyContactName: data.nextOfKinName || data.callerName,
      callerName: data.callerName,
      callerPhone: data.callerPhone,
      callerRelationship: data.callerRelationship,
      address: data.address,
      nextOfKinPhone: data.nextOfKinPhone,
      weight: data.weight,
      isWeightKnown: data.isWeightKnown,
      readyForPickup: data.readyForPickup,
      readyTime: data.readyTime,
      hasStairs: data.hasStairs,
      isFamilyPresent: data.isFamilyPresent,
      isVerbalRelease: data.isVerbalRelease,
      dateOfBirth: data.dateOfBirth,
      locationOfPickup: data.locationOfPickup,
      timeOfDeath: data.timeOfDeath,
      signaturesTotal: data.signaturesTotal || 1,
      faxesTotal: data.signaturesTotal || 1,
    });
  }, [activeCase, completeStage]);

  const handleSendReleaseForm = useCallback(() => {
    completeStage('summary', 'complete');
  }, [completeStage]);

  const handleSummaryComplete = useCallback(() => {
    completeStage('summary', 'complete');
  }, [completeStage]);

  const handleSignatureReceived = useCallback(() => {
    if (!activeCase) return;
    
    updateProgress(
      'signaturesReceived',
      activeCase.signaturesTotal,
      'signatures',
      'faxing',
      { faxesTotal: activeCase.signaturesTotal }
    );
  }, [activeCase, updateProgress]);

  const handleFaxSent = useCallback(() => {
    if (!activeCase) return;
    
    const isComplete = updateProgress(
      'faxesSent',
      activeCase.faxesTotal,
      'faxing',
      'complete'
    );

    // Auto-create case card when all documents are sent
    if (isComplete) {
      const newCase = addCase({
        deceasedName: activeCase.deceasedName || 'Unknown',
        caseType: 'At-Need',
        dateCreated: new Date().toISOString().split('T')[0],
        isVerbalRelease: activeCase.isVerbalRelease,
        firstCallData: {
          callerName: activeCase.callerName,
          callerRelationship: activeCase.callerRelationship,
          callerPhone: activeCase.callerPhone,
          deceasedName: activeCase.deceasedName,
          dateOfBirth: activeCase.dateOfBirth,
          dateOfDeath: new Date().toISOString().split('T')[0],
          timeOfDeath: activeCase.timeOfDeath,
          locationOfDeath: activeCase.locationOfPickup,
          address: activeCase.address,
          nextOfKinName: activeCase.nextOfKinName,
          nextOfKinPhone: activeCase.nextOfKinPhone,
          weight: activeCase.weight,
          readyTime: activeCase.readyTime,
          hasStairs: activeCase.hasStairs,
          isFamilyPresent: activeCase.isFamilyPresent,
          isVerbalRelease: activeCase.isVerbalRelease,
        },
        hasRemovalRelease: true,
        catalogSelections: {
          package: undefined,
          addons: [],
          memorials: [],
        },
      });

      console.log('✅ Auto-created case card:', newCase.caseNumber);
    }
  }, [activeCase, updateProgress, addCase]);

  // DRY: Determine stage status
  const getStageStatus = useCallback((stageId: TimelineStage): StageStatus => {
    if (!activeCase) return 'pending';
    if (activeCase.completedStages.includes(stageId as string)) return 'complete';
    if (activeCase.currentStage === stageId) return 'active';
    return 'pending';
  }, [activeCase]);

  // DRY: Stage click handler
  const handleStageClick = useCallback((stage: StageConfig) => {
    if (!activeCase || !activeCase.completedStages.includes(stage.id as string)) return;
    updateCase(activeCase.id, { currentStage: stage.id as string });
  }, [activeCase, updateCase]);

  // Loading state
  if (!activeCase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading case...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Compact Header with Timeline - Full Width */}
      <FirstCallCompactHeader
        onBack={onBack}
        onNewCall={handleNewCall}
        visibleStages={visibleStages}
        getStageStatus={(stageId: string) => getStageStatus(stageId as TimelineStage)}
        onStageClick={(stageId) => {
          if (!activeCase || !activeCase.completedStages.includes(stageId as string)) return;
          updateCase(activeCase.id, { currentStage: stageId as string });
        }}
        completedStages={activeCase.completedStages}
        activeCaseName={activeCase.deceasedName || 'New First Call'}
      />

      {/* Mobile Only: Horizontal Cases Bar */}
      <div className="lg:hidden bg-white border-b border-gray-200 sticky top-16 z-30 shadow-sm">
        <div className="px-4 py-2.5">
          {/* Header with New Button - Always Visible */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-gray-900">
              Active Cases ({activeCases.length})
            </h3>
            <button
              onClick={handleNewCall}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-xs font-medium"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New First Call</span>
            </button>
          </div>
          
          {/* Horizontal Scroll Container - Cases Only */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {activeCases.map((caseData) => {
              const isActive = caseData.id === activeCaseId;
              const isDeleting = caseToDelete === caseData.id;
              
              type StageKey = 'intake' | 'summary' | 'signatures' | 'faxing' | 'complete';
              const MOBILE_STAGE_CONFIG: Record<StageKey, { icon: typeof Circle; color: string; bgColor: string; label: string }> = {
                intake: { icon: Circle, color: 'text-blue-600', bgColor: 'bg-blue-50', label: 'Intake' },
                summary: { icon: Circle, color: 'text-purple-600', bgColor: 'bg-purple-50', label: 'Summary' },
                signatures: { icon: Clock, color: 'text-amber-600', bgColor: 'bg-amber-50', label: 'Signatures' },
                faxing: { icon: Send, color: 'text-teal-600', bgColor: 'bg-teal-50', label: 'Faxing' },
                complete: { icon: CheckCircle2, color: 'text-green-600', bgColor: 'bg-green-50', label: 'Complete' },
              };
              
              const stageConfig = MOBILE_STAGE_CONFIG[caseData.currentStage as StageKey] || MOBILE_STAGE_CONFIG.intake;
              const StageIcon = stageConfig.icon;
              
              return (
                <div
                  key={caseData.id}
                  className={`
                    relative flex-shrink-0 w-28 text-left rounded-lg p-2 transition-all border
                    ${isActive 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                    }
                    ${isDeleting ? 'border-red-300 bg-red-50' : ''}
                  `}
                >
                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCaseToDelete(isDeleting ? null : caseData.id);
                    }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-100 hover:bg-red-100 border border-gray-300 hover:border-red-300 rounded-full flex items-center justify-center transition-colors z-10"
                    title="Delete case"
                  >
                    <X className="w-3 h-3 text-gray-500 hover:text-red-500" />
                  </button>
                  
                  {/* Confirm Delete Overlay */}
                  {isDeleting && (
                    <div className="absolute inset-0 bg-red-50 rounded-lg flex flex-col items-center justify-center gap-1 z-20">
                      <p className="text-[10px] text-red-600 font-medium">Delete?</p>
                      <div className="flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCase(caseData.id);
                          }}
                          className="px-2 py-0.5 bg-red-600 text-white text-[10px] rounded hover:bg-red-700"
                        >
                          Yes
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCaseToDelete(null);
                          }}
                          className="px-2 py-0.5 bg-gray-200 text-gray-700 text-[10px] rounded hover:bg-gray-300"
                        >
                          No
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={() => switchCase(caseData.id)}
                    className="w-full text-left"
                  >
                    <div className="flex items-center gap-1 mb-1">
                      {isActive && (
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse flex-shrink-0"></div>
                      )}
                      <p className="text-[11px] font-medium text-gray-900 truncate">
                        {caseData.deceasedName || 'New Case'}
                      </p>
                    </div>
                    <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded ${stageConfig.bgColor}`}>
                      <StageIcon className={`w-2 h-2 ${stageConfig.color}`} />
                      <span className={`text-[9px] font-medium ${stageConfig.color}`}>
                        {stageConfig.label}
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Area with Desktop Sidebar */}
      <div className="flex">
        {/* Main Content - Auto-advancing sections */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto w-full">
          {activeCase.currentStage === 'intake' && (
            <FirstCallIntakeSection onComplete={handleIntakeComplete} />
          )}

          {activeCase.currentStage === 'summary' && (
            <FirstCallSummarySection
              onNavigateToCases={onNavigateToCases}
              onSendReleaseForm={handleSendReleaseForm}
              onComplete={handleSummaryComplete}
            />
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
              deceasedName={activeCase.deceasedName}
              nextOfKinName={activeCase.nextOfKinName}
              nextOfKinPhone={activeCase.nextOfKinPhone}
            />
          )}

          {activeCase.currentStage === 'complete' && (
            <FirstCallCompleteSection
              onNavigateToCases={onNavigateToCases}
            />
          )}
        </div>

        {/* Desktop Only: Right Sidebar - Active Cases */}
        <ActiveCasesSidebar onNewCall={handleNewCall} />
      </div>
    </div>
  );
}
