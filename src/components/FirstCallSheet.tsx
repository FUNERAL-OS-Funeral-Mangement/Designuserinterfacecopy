import { ArrowLeft } from 'lucide-react';
import { FirstCallData } from '../store/useCaseStore';

interface FirstCallSheetProps {
  onBack: () => void;
  firstCallData?: FirstCallData;
}

export function FirstCallSheet({ onBack, firstCallData }: FirstCallSheetProps) {
  const fields = [
    { label: 'Name of caller', value: firstCallData?.callerName },
    { label: "Caller's phone", value: firstCallData?.callerPhone },
    { label: 'Name of deceased', value: firstCallData?.deceasedName },
    { label: 'Date of Birth', value: firstCallData?.dateOfBirth },
    { label: 'Date of Death', value: firstCallData?.dateOfDeath },
    { label: 'Time of Death', value: firstCallData?.timeOfDeath },
    { label: 'Location of death', value: firstCallData?.locationOfDeath },
    { label: 'Address', value: firstCallData?.address },
    { label: 'Next of Kin', value: firstCallData?.nextOfKinName },
    { label: 'Next of Kin phone', value: firstCallData?.nextOfKinPhone },
    { label: 'Weight of deceased', value: firstCallData?.weight },
    { label: 'Ready for pick up?', value: firstCallData?.readyTime },
    { label: 'Has stairs?', value: firstCallData?.hasStairs },
    { label: 'Is family present?', value: firstCallData?.isFamilyPresent },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6 sm:mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Documents</span>
          </button>

          <h1 className="text-gray-900">First Call Information</h1>
          <p className="text-gray-600 mt-2">Summary of the initial report.</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-3xl">
        <div className="bg-gray-50 border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {fields.map((field, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6 py-4 hover:bg-white transition-colors">
                <div className="text-gray-700">{field.label}</div>
                <div className="text-gray-900">
                  {field.value || (
                    <span className="text-blue-600">Not Specified</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {firstCallData?.isVerbalRelease && (
          <div className="mt-6 bg-blue-50 border border-blue-200 px-6 py-4">
            <p className="text-sm text-blue-900">
              ✓ This case was marked as <strong>verbal release</strong>. E-signature process was skipped.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
