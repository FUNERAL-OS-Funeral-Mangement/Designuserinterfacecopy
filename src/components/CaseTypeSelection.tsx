import { FileCheck, Clock } from 'lucide-react';

interface CaseTypeSelectionProps {
  onSelectType: (type: 'preneed' | 'at-need') => void;
}

export function CaseTypeSelection({ onSelectType }: CaseTypeSelectionProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h2 className="text-teal-700 mb-3">Select Case Type</h2>
          <p className="text-gray-600">Please select a type of case to proceed</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Preneed Box */}
          <button
            onClick={() => onSelectType('preneed')}
            className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-teal-500 hover:shadow-xl transition-all group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Clock className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-3">Preneed</h3>
              <p className="text-gray-600 text-sm">
                Pre-arranged funeral planning and services scheduled in advance for future needs
              </p>
            </div>
          </button>

          {/* At Need Box */}
          <button
            onClick={() => onSelectType('at-need')}
            className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-teal-500 hover:shadow-xl transition-all group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileCheck className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-3">At Need</h3>
              <p className="text-gray-600 text-sm">
                Immediate funeral arrangements and services needed for recent or imminent passing
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
