import { Clock, CheckCircle2, FileText, Send, Plus, ChevronRight, ArrowLeft } from 'lucide-react';
import { useFirstCallStore } from '../store/useFirstCallStore';

interface ActiveCasesSidebarProps {
  onNewCall: () => void;
  onBackToDashboard?: () => void;
}

export function ActiveCasesSidebar({ onNewCall, onBackToDashboard }: ActiveCasesSidebarProps) {
  const { activeCaseId, switchCase, getAllActiveCases } = useFirstCallStore();
  
  const activeCases = getAllActiveCases();

  if (activeCases.length === 0) {
    return null;
  }

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'intake':
        return <FileText className="w-5 h-5" />;
      case 'documents':
        return <FileText className="w-5 h-5" />;
      case 'signatures':
        return <Clock className="w-5 h-5" />;
      case 'faxing':
        return <Send className="w-5 h-5" />;
      case 'complete':
        return <CheckCircle2 className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getStageLabel = (stage: string) => {
    switch (stage) {
      case 'intake':
        return '📞 Intake in progress';
      case 'documents':
        return '📄 Preparing documents';
      case 'signatures':
        return '⏳ Waiting on family';
      case 'faxing':
        return '📠 Sending faxes';
      case 'complete':
        return '✅ Complete';
      default:
        return stage;
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'intake':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'documents':
        return 'bg-purple-50 border-purple-200 text-purple-700';
      case 'signatures':
        return 'bg-amber-50 border-amber-200 text-amber-700';
      case 'faxing':
        return 'bg-teal-50 border-teal-200 text-teal-700';
      case 'complete':
        return 'bg-green-50 border-green-200 text-green-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <aside className="w-80 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 h-screen sticky top-0">
      {/* Back to Dashboard Button - Sticky at Top */}
      {onBackToDashboard && (
        <div className="p-4 border-b border-gray-200 bg-white">
          <button
            onClick={onBackToDashboard}
            className="w-full px-4 py-2.5 text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      )}

      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-gray-900">Active Cases</h2>
          <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">
            {activeCases.length}
          </div>
        </div>
        <p className="text-sm text-gray-600">
          Cases in progress or waiting
        </p>
      </div>

      {/* Cases List - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {activeCases.map((caseData) => {
            const isActive = caseData.id === activeCaseId;
            const stageBg = getStageColor(caseData.currentStage);
            
            return (
              <button
                key={caseData.id}
                onClick={() => switchCase(caseData.id)}
                className={`w-full text-left border-2 rounded-xl p-4 transition-all ${
                  isActive 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                {/* Case Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {isActive && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      )}
                      <h3 className="text-gray-900 truncate">
                        {caseData.deceasedName || 'New Case'}
                      </h3>
                    </div>
                    {caseData.familyContactName && (
                      <p className="text-xs text-gray-600 truncate">
                        Contact: {caseData.familyContactName}
                      </p>
                    )}
                  </div>
                  {isActive && (
                    <ChevronRight className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  )}
                </div>

                {/* Status Badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs ${stageBg}`}>
                  <span>{getStageLabel(caseData.currentStage)}</span>
                </div>

                {/* Additional Info */}
                {caseData.currentStage === 'signatures' && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>Awaiting {caseData.signaturesTotal - caseData.signaturesReceived} signature(s)</span>
                    </div>
                  </div>
                )}

                {/* Progress indicator for signatures */}
                {caseData.currentStage === 'signatures' && caseData.signaturesTotal > 0 && (
                  <div className="mt-2">
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-500 transition-all duration-500"
                        style={{ width: `${(caseData.signaturesReceived / caseData.signaturesTotal) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* New Call Button - Sticky at Bottom */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <button
          onClick={onNewCall}
          className="w-full px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 rounded-lg shadow-sm"
        >
          <Plus className="w-5 h-5" />
          <span>New First Call</span>
        </button>
      </div>
    </aside>
  );
}