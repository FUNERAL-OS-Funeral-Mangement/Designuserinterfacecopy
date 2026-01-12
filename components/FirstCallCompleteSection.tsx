import { CheckCircle2, FileText, Send, Calendar, ArrowRight } from 'lucide-react';

interface FirstCallCompleteSectionProps {
  onNavigateToCases?: () => void;
}

export function FirstCallCompleteSection({ onNavigateToCases }: FirstCallCompleteSectionProps) {
  return (
    <div className="bg-white border border-gray-200 p-4 md:p-8">
      {/* Success Header */}
      <div className="mb-6 md:mb-8 pb-4 md:pb-6 border-b border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
          </div>
          <div>
            <h2 className="text-gray-900 mb-2">🎉 Congratulations! First Call Complete!</h2>
            <p className="text-gray-600">
              All steps completed successfully. Case card has been created and the family has been notified.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl">
        {/* Auto-Generated Case Card Notice */}
        <div className="bg-blue-50 border border-blue-200 p-4 md:p-6 mb-6 md:mb-8">
          <h3 className="text-gray-900 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            Case Card Auto-Created
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            A new case card has been automatically generated with all the information from this First Call intake. You can now access it from the Cases section.
          </p>
          {onNavigateToCases && (
            <button
              onClick={onNavigateToCases}
              className="w-full md:w-auto px-6 py-2.5 bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>View Case in Cases Section</span>
            </button>
          )}
        </div>

        {/* Completion Summary */}
        <div className="bg-green-50 border border-green-200 p-4 md:p-6 mb-6 md:mb-8">
          <h3 className="text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            Summary
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-green-600" />
                <span className="text-sm md:text-base text-gray-900">First Call Intake</span>
              </div>
              <span className="text-green-600 text-xs md:text-sm">✓ Complete</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-green-600" />
                <span className="text-sm md:text-base text-gray-900">Documents Signed</span>
              </div>
              <span className="text-green-600 text-xs md:text-sm">✓ Complete</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Send className="w-4 h-4 text-green-600" />
                <span className="text-sm md:text-base text-gray-900">Documents Sent</span>
              </div>
              <span className="text-green-600 text-xs md:text-sm">✓ Complete</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-green-600" />
                <span className="text-sm md:text-base text-gray-900">Case Card Created</span>
              </div>
              <span className="text-green-600 text-xs md:text-sm">✓ Complete</span>
            </div>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="bg-gray-50 border border-gray-200 p-4 md:p-6 mb-6 md:mb-8">
          <h3 className="text-gray-900 mb-4">✨ What happens next</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>1. Family appointment</strong> - If scheduled, the family will meet with a director to discuss arrangements and select services.
            </p>
            <p>
              <strong>2. Case management</strong> - The case card is now available in the Cases section where you can add packages, memorials, and complete all arrangements.
            </p>
            <p>
              <strong>3. Team notified</strong> - Removal team and prep room staff have been alerted with the body release authorization.
            </p>
          </div>
        </div>

        {/* Next Actions */}
        <div className="space-y-4">
          <h3 className="text-gray-900">Recommended Next Steps</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Navigate to Full Case */}
            {onNavigateToCases && (
              <button
                onClick={onNavigateToCases}
                className="p-4 md:p-6 border-2 border-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors text-left"
              >
                <div className="flex items-start justify-between mb-3">
                  <FileText className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                </div>
                <h4 className="text-gray-900 mb-2">Open Case</h4>
                <p className="text-sm text-gray-600">
                  Build packages, manage contracts, and complete all case details
                </p>
              </button>
            )}

            {/* Schedule Arrangement Conference */}
            <button className="p-4 md:p-6 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-left">
              <div className="flex items-start justify-between mb-3">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              </div>
              <h4 className="text-gray-900 mb-2">View Appointments</h4>
              <p className="text-sm text-gray-600">
                Review scheduled meetings and arrangement conferences
              </p>
            </button>
          </div>
        </div>

        {/* Case Info Summary */}
        <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
          <p className="text-xs md:text-sm text-gray-500">
            This First Call has been marked as complete. The case card is now available in your Cases section with all intake information preserved.
          </p>
        </div>
      </div>
    </div>
  );
}