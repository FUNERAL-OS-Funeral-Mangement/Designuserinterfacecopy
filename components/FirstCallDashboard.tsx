import { ArrowLeft, Plus, Clock, FileText } from 'lucide-react';
import { useState } from 'react';

interface FirstCallDashboardProps {
  onBack: () => void;
  onCreateNew: () => void;
}

export function FirstCallDashboard({ onBack, onCreateNew }: FirstCallDashboardProps) {
  // Mock data for drafts (release forms sent but not signed)
  const [drafts] = useState([
    {
      id: '1',
      deceasedName: 'John Smith',
      sentTo: 'Mary Smith',
      sentDate: 'Dec 17, 2025',
      sentTime: '2:30 PM',
    },
    {
      id: '2',
      deceasedName: 'Robert Johnson',
      sentTo: 'Sarah Johnson',
      sentDate: 'Dec 17, 2025',
      sentTime: '1:15 PM',
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6 sm:mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <h1 className="text-gray-900">First Call</h1>
          <p className="text-gray-600 mt-2">Manage first call intake and body removal documentation</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Create New First Call Sheet */}
          <button
            onClick={onCreateNew}
            className="bg-white border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all p-12 flex flex-col items-center justify-center gap-4 min-h-[280px] group"
          >
            <div className="w-16 h-16 bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors">
              <Plus className="w-8 h-8 text-gray-600" />
            </div>
            <div>
              <p className="text-gray-900 mb-1">Create New First Call Sheet</p>
              <p className="text-sm text-gray-600">Start a new first call intake form</p>
            </div>
          </button>

          {/* Drafts Section */}
          <div className="bg-white border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <h2 className="text-gray-900">Pending Releases</h2>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Release forms sent but not signed yet
              </p>
            </div>

            <div className="divide-y divide-gray-100">
              {drafts.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No pending releases</p>
                </div>
              ) : (
                drafts.map((draft) => (
                  <div
                    key={draft.id}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 truncate">{draft.deceasedName}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Sent to {draft.sentTo}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm text-gray-600">{draft.sentDate}</p>
                        <p className="text-sm text-gray-500">{draft.sentTime}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 h-1.5 overflow-hidden">
                        <div className="bg-orange-500 h-full w-1/2" />
                      </div>
                      <span className="text-xs text-orange-600">Awaiting Signature</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
