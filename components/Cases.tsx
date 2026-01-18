import { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { CaseTypeSelection } from './CaseTypeSelection';
import { CaseWorkflow } from './CaseWorkflow';
import { AllCases } from './AllCases';

interface CasesProps {
  onBack: () => void;
  onCaseClick: (caseData: any) => void;
}

type CaseType = 'preneed' | 'at-need' | null;
type CasesView = 'all-cases' | 'type-selection' | 'workflow';

export function Cases({ onBack, onCaseClick }: CasesProps) {
  const [currentView, setCurrentView] = useState<CasesView>('all-cases');
  const [caseType, setCaseType] = useState<CaseType>(null);
  const [cases, setCases] = useState<any[]>([]);

  const handleSelectCaseType = (type: 'preneed' | 'at-need') => {
    setCaseType(type);
    setCurrentView('workflow');
  };

  const handleBackFromTypeSelection = () => {
    setCurrentView('all-cases');
    setCaseType(null);
  };

  const handleBackFromWorkflow = () => {
    setCurrentView('type-selection');
    setCaseType(null);
  };

  const handleCaseComplete = (caseData: any) => {
    setCases([...cases, caseData]);
    setCurrentView('all-cases');
    setCaseType(null);
  };

  const handleCreateNewCase = () => {
    setCurrentView('type-selection');
  };

  // Show all cases view
  if (currentView === 'all-cases') {
    return <AllCases onBack={onBack} onCreateCase={handleCreateNewCase} onCaseClick={onCaseClick} />;
  }

  // Show case type selection when creating new case
  if (currentView === 'type-selection') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleBackFromTypeSelection}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </button>
                <h1 className="text-teal-700">Cases</h1>
              </div>
            </div>
          </div>
        </div>

        <CaseTypeSelection onSelectType={handleSelectCaseType} />
      </div>
    );
  }

  // Show workflow for creating new case
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackFromWorkflow}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <div>
                <h1 className="text-teal-700">Create New Case</h1>
                <p className="text-xs text-gray-500 capitalize">{caseType} Case</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow */}
      <CaseWorkflow caseType={caseType!} onComplete={handleCaseComplete} />
    </div>
  );
}