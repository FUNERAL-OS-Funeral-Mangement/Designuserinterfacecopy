'use client';

import { useState, useCallback } from 'react';
import { Plus, Circle, CheckCircle2, Clock, Send, X } from 'lucide-react';
import { useFirstCallStore } from '../store/useFirstCallStore';

interface ActiveCasesSidebarProps {
  onNewCall: () => void;
}

// DRY: Centralized stage configuration
const STAGE_CONFIG = {
  intake: { icon: Circle, color: 'text-blue-600', bgColor: 'bg-blue-50', label: 'Intake' },
  summary: { icon: Circle, color: 'text-purple-600', bgColor: 'bg-purple-50', label: 'Summary' },
  signatures: { icon: Clock, color: 'text-amber-600', bgColor: 'bg-amber-50', label: 'Signatures' },
  faxing: { icon: Send, color: 'text-teal-600', bgColor: 'bg-teal-50', label: 'Faxing' },
  complete: { icon: CheckCircle2, color: 'text-green-600', bgColor: 'bg-green-50', label: 'Complete' },
} as const;

// DRY: Reusable Progress Bar Component
const ProgressBar = ({ 
  label, 
  current, 
  total, 
  color 
}: { 
  label: string; 
  current: number; 
  total: number; 
  color: string;
}) => (
  <div className="mt-1.5 pt-1.5 border-t border-gray-100">
    <div className="flex items-center justify-between mb-0.5">
      <span className="text-[10px] text-gray-600">{label}</span>
      <span className="text-[10px] font-medium text-gray-900">
        {current}/{total}
      </span>
    </div>
    <div className="w-full h-0.5 bg-gray-200 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color} transition-all duration-500`}
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  </div>
);

export function ActiveCasesSidebar({ onNewCall }: ActiveCasesSidebarProps) {
  const { activeCaseId, switchCase, getAllActiveCases, deleteCase, createCase } = useFirstCallStore();
  const activeCases = getAllActiveCases();
  const [caseToDelete, setCaseToDelete] = useState<string | null>(null);

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

  if (activeCases.length === 0) {
    return null;
  }

  // DRY: Reusable function to get stage config
  const getStageConfig = (stage: string) => {
    return STAGE_CONFIG[stage as keyof typeof STAGE_CONFIG] || STAGE_CONFIG.intake;
  };

  // Desktop Only: Vertical Right Sidebar
  return (
    <aside className="hidden lg:flex w-72 bg-white border border-gray-200 flex-col flex-shrink-0 h-[calc(80vh-200px)] sticky top-[180px] self-start mt-[20px] mr-4 rounded-xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2 border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-gray-900">Active Cases</h3>
          <div className="flex items-center justify-center w-4 h-4 bg-blue-600 text-white rounded-full text-[10px] font-medium">
            {activeCases.length}
          </div>
        </div>
      </div>

      {/* Cases List - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1.5">
          {activeCases.map((caseData) => {
            const isActive = caseData.id === activeCaseId;
            const isDeleting = caseToDelete === caseData.id;
            const stageConfig = getStageConfig(caseData.currentStage);
            const StageIcon = stageConfig.icon;
            
            return (
              <div
                key={caseData.id}
                className={`
                  relative w-full text-left rounded-lg p-2 transition-all border
                  ${isActive 
                    ? 'border-blue-500 bg-blue-50 shadow-sm' 
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
                  <div className="absolute inset-0 bg-red-50 rounded-lg flex flex-col items-center justify-center gap-2 z-20">
                    <p className="text-xs text-red-600 font-medium">Delete this case?</p>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCase(caseData.id);
                        }}
                        className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                      >
                        Yes, Delete
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCaseToDelete(null);
                        }}
                        className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                
                <button
                  onClick={() => switchCase(caseData.id)}
                  className="w-full text-left"
                >
                  {/* Case Name */}
                  <div className="flex items-start justify-between mb-1.5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 mb-0.5">
                        {isActive && (
                          <div className="w-1 h-1 bg-blue-600 rounded-full animate-pulse flex-shrink-0"></div>
                        )}
                        <p className="text-xs font-medium text-gray-900 truncate">
                          {caseData.deceasedName || 'New Case'}
                        </p>
                      </div>
                      {caseData.familyContactName && (
                        <p className="text-[10px] text-gray-500 truncate">
                          {caseData.familyContactName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded ${stageConfig.bgColor}`}>
                    <StageIcon className={`w-2.5 h-2.5 ${stageConfig.color}`} />
                    <span className={`text-[10px] font-medium ${stageConfig.color}`}>
                      {stageConfig.label}
                    </span>
                  </div>

                  {/* Progress Bars */}
                  {caseData.currentStage === 'signatures' && caseData.signaturesTotal > 0 && (
                    <ProgressBar 
                      label="Signatures"
                      current={caseData.signaturesReceived}
                      total={caseData.signaturesTotal}
                      color="bg-amber-500"
                    />
                  )}

                  {caseData.currentStage === 'faxing' && caseData.faxesTotal > 0 && (
                    <ProgressBar 
                      label="Documents"
                      current={caseData.faxesSent}
                      total={caseData.faxesTotal}
                      color="bg-teal-500"
                    />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* New Call Button - Sticky at Bottom */}
      <div className="p-2 border-t border-gray-200 bg-white mt-auto">
        <button
          onClick={onNewCall}
          className="w-full px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 rounded-lg shadow-sm text-xs font-medium"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New First Call</span>
        </button>
      </div>
    </aside>
  );
}
