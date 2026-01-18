import { FileText, ChevronRight, Send } from 'lucide-react';
import { useState } from 'react';
import { useFirstCallStore } from '../store/useFirstCallStore';

interface FirstCallSummarySectionProps {
  onSendReleaseForm: () => void;
  onComplete: () => void;
  onNavigateToCases?: () => void;
}

export function FirstCallSummarySection({ 
  onSendReleaseForm,
  onComplete,
  onNavigateToCases
}: FirstCallSummarySectionProps) {
  const [releaseFormSent, setReleaseFormSent] = useState(false);
  const { getActiveCase } = useFirstCallStore();
  const activeCase = getActiveCase();

  if (!activeCase) return null;

  const handleSendReleaseForm = () => {
    setReleaseFormSent(true);
    onSendReleaseForm();
  };

  const formatValue = (value: any) => {
    if (value === undefined || value === null || value === '') {
      return 'Not Specified';
    }
    return value;
  };

  const summaryFields = [
    { label: 'Name of caller', value: activeCase.callerName },
    { label: "Caller's phone", value: activeCase.callerPhone },
    { label: 'Name of deceased', value: activeCase.deceasedName },
    { label: 'Date of Birth', value: activeCase.dateOfBirth },
    { label: 'Date of Death', value: activeCase.timeOfDeath?.split('T')[0] },
    { label: 'Time of Death', value: activeCase.timeOfDeath?.split('T')[1]?.slice(0, 5) },
    { label: 'Location of death', value: activeCase.locationOfPickup },
    { label: 'Address', value: activeCase.address },
    { label: 'Next of Kin', value: activeCase.nextOfKinName },
    { label: 'Next of Kin phone', value: activeCase.nextOfKinPhone },
    { label: 'Weight of deceased', value: activeCase.weight ? `${activeCase.weight} lbs` : activeCase.isWeightKnown },
    { label: 'Ready for pick up?', value: activeCase.readyForPickup },
    { label: 'Has stairs?', value: activeCase.hasStairs },
    { label: 'Is family present?', value: activeCase.isFamilyPresent },
  ];

  return (
    <div className="bg-white border border-gray-200 p-8">
      {/* Section Header */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center text-sm">2</div>
          <h2 className="text-gray-900">Summary & Release</h2>
        </div>
        <p className="text-gray-600">
          Review the information collected and send the body release form.
        </p>
      </div>

      <div className="max-w-3xl space-y-8">
        {/* First Call Information Card */}
        <div className="bg-gray-50 border border-gray-200 p-8">
          <div className="mb-6">
            <h2 className="text-gray-900 mb-2">First Call Information</h2>
            <p className="text-gray-600 text-sm">Summary of the initial report.</p>
          </div>

          <div className="space-y-4">
            {summaryFields.map((field, index) => (
              <div 
                key={index} 
                className="flex items-start justify-between py-2 border-b border-gray-200 last:border-b-0"
              >
                <span className="text-gray-700">{field.label}</span>
                <span className="text-gray-900 text-right ml-4">
                  {formatValue(field.value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Documents Section */}
        <div className="bg-gray-50 border border-gray-200 p-8">
          <h2 className="text-gray-900 mb-6">Documents</h2>

          <div className="space-y-3">
            <button
              onClick={releaseFormSent ? undefined : handleSendReleaseForm}
              disabled={releaseFormSent}
              className={`w-full p-4 border-2 transition-colors text-left flex items-center justify-between group ${
                releaseFormSent
                  ? 'bg-green-50 border-green-200 cursor-default'
                  : 'bg-white border-gray-200 hover:border-blue-400 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 flex items-center justify-center ${
                  releaseFormSent ? 'bg-green-100' : 'bg-blue-50'
                }`}>
                  <FileText className={`w-5 h-5 ${
                    releaseFormSent ? 'text-green-600' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <div className="text-gray-900 mb-1">Release form</div>
                  <div className={`text-sm ${
                    releaseFormSent ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {releaseFormSent ? 'Sent' : 'Ready to send'}
                  </div>
                </div>
              </div>
              {!releaseFormSent && (
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              )}
              {releaseFormSent && (
                <div className="text-green-600 text-sm">✓ Sent</div>
              )}
            </button>
          </div>

          {releaseFormSent && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200">
              <p className="text-sm text-green-700">
                ✓ Body release form has been sent to {activeCase.nextOfKinName || 'the next of kin'} 
                {activeCase.nextOfKinPhone && ` at ${activeCase.nextOfKinPhone}`}
              </p>
            </div>
          )}
        </div>

        {/* What Happens Next */}
        <div className="bg-blue-50 border border-blue-200 p-6">
          <p className="text-gray-900 mb-3">✨ What happens next</p>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>1. Release form delivered</strong> - The body release form has been sent to the next of kin.
            </p>
            <p>
              <strong>2. Removal team notified</strong> - Your selected removal team will be alerted and can proceed with pickup.
            </p>
            <p>
              <strong>3. Case logged</strong> - All information has been recorded and is ready for the next steps.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          {releaseFormSent ? (
            <button
              onClick={onComplete}
              className="flex-1 px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <span>Complete First Call</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSendReleaseForm}
              className="flex-1 px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              <span>Send Body Release Form</span>
            </button>
          )}
        </div>

        {/* Verbal Release Note */}
        {activeCase.isVerbalRelease && (
          <div className="p-4 bg-amber-50 border border-amber-200">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> This case was marked as verbal release. No e-signature is required.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}