import { ArrowLeft, MoreVertical, FileText, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';

interface CaseDetailsProps {
  onBack: () => void;
  onSendEFax: () => void;
}

export function CaseDetails({ onBack, onSendEFax }: CaseDetailsProps) {
  const { caseData } = useStore();

  const infoItems = [
    { label: 'Name of caller', value: 'Mary Foster' },
    { label: "Caller's phone", value: 'xxx-xxx-xxxx' },
    { label: 'Name of deceased', value: caseData.deceasedName || 'Jane Doe' },
    { label: 'Date of Death', value: 'Not Specified' },
    { label: 'Time of Death', value: 'Not Specified' },
    { label: 'Location of death', value: caseData.locationOfPickup || 'North Shore Hospital' },
    { label: 'Address', value: '1232 NE 18th Place, Miami FL' },
    { label: 'Next of Kin', value: 'Mary Foster' },
    { label: 'Next of Kin phone', value: 'xxx-xxx-xxxx' },
    { label: 'Weight of deceased', value: '80 pounds' },
    { label: 'Ready for pick up?', value: 'Half an hour' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h2 className="text-gray-900">Case Details</h2>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <MoreVertical className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* First Call Information */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-gray-900">First Call Information</h3>
            <p className="text-gray-500 text-sm">Summary of the initial report.</p>
          </div>

          <div className="p-4 space-y-3">
            {infoItems.map((item, index) => (
              <div key={index} className="flex justify-between items-start text-sm">
                <span className="text-gray-600">{item.label}</span>
                <span className="text-gray-900 text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-gray-900">Documents</h3>
          </div>

          <button
            onClick={onSendEFax}
            className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="text-gray-900">Release form</p>
                <p className="text-blue-600 text-sm">Attached</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
