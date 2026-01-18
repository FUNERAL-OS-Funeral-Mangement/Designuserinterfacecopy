import { Clock, CheckCircle2, FileText, ExternalLink, Home, Plus } from 'lucide-react';

interface FirstCallSignaturesSectionProps {
  signaturesReceived: number;
  signaturesTotal: number;
  onSignatureReceived: () => void;
  onSafeExit: () => void;
  onStartNewCall: () => void;
}

export function FirstCallSignaturesSection({ 
  signaturesReceived, 
  signaturesTotal, 
  onSignatureReceived,
  onSafeExit,
  onStartNewCall
}: FirstCallSignaturesSectionProps) {
  // Mock documents - in real app, this would come from state
  const documents = [
    { id: '1', name: 'Body Release Form', sentTo: 'Mary Foster', sentAt: '2:30 PM' },
    { id: '2', name: 'GPL Receipt', sentTo: 'Mary Foster', sentAt: '2:30 PM' },
    { id: '3', name: 'Cremation Authorization', sentTo: 'Mary Foster', sentAt: '2:30 PM' },
  ];

  const pendingDocs = documents.slice(signaturesReceived);
  const completedDocs = documents.slice(0, signaturesReceived);

  return (
    <div className="bg-white border border-gray-200 p-8">
      {/* Section Header */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h2 className="text-gray-900 mb-3">Waiting on Signatures</h2>
        <p className="text-gray-600">
          {signaturesReceived} of {signaturesTotal} documents signed · System will auto-advance when all are complete
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Waiting State Card - Calm, Not Error */}
        {pendingDocs.length > 0 && (
          <div className="bg-amber-50 border-2 border-amber-200 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-2">Waiting on family signature</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Documents have been sent to <span className="text-gray-900">Mary Foster</span> via text message.
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Most families complete this within 15–30 minutes. You'll be notified automatically when signed.
                </p>
                
                {/* Document Timeline */}
                <div className="space-y-3 mt-4 pt-4 border-t border-amber-200">
                  <p className="text-sm text-gray-900 mb-2">Documents pending:</p>
                  {pendingDocs.map((doc, index) => (
                    <div key={doc.id} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-600">Sent {doc.sentAt} to {doc.sentTo}</p>
                      </div>
                      <button className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        View
                      </button>
                    </div>
                  ))}
                </div>

                {/* Demo button */}
                <button
                  onClick={onSignatureReceived}
                  className="mt-6 px-4 py-2 bg-gray-900 text-white text-sm hover:bg-gray-800 transition-colors"
                >
                  Simulate Signature Received (Demo)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Completed Signatures */}
        {completedDocs.length > 0 && (
          <div>
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Completed ({completedDocs.length})
            </h3>
            <div className="space-y-3">
              {completedDocs.map((doc) => (
                <div key={doc.id} className="border border-green-200 bg-green-50 p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-gray-900 mb-1">{doc.name}</p>
                      <p className="text-sm text-gray-600">Signed by {doc.sentTo}</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="bg-gray-50 border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-900">Signature progress</p>
            <p className="text-sm text-gray-600">{signaturesReceived} / {signaturesTotal}</p>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-500"
              style={{ width: `${(signaturesReceived / signaturesTotal) * 100}%` }}
            />
          </div>
        </div>

        {/* Help Text */}
        <div className="bg-blue-50 border border-blue-200 p-5">
          <p className="text-sm text-gray-900 mb-2">💡 What happens after signatures</p>
          <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
            <li>Once all signatures are in, system auto-advances to <strong>eFax stage</strong></li>
            <li>You'll send signed documents to coroner, medical examiner, etc.</li>
            <li>You can navigate away and come back - progress is saved</li>
            <li>Family can sign on any device via the text message link</li>
          </ul>
        </div>

        {/* Safe Exit Actions */}
        <div className="pt-6 border-t-2 border-gray-200">
          <div className="bg-green-50 border border-green-200 p-5 mb-4">
            <p className="text-sm text-gray-900 mb-1">
              ✅ You can safely leave this screen
            </p>
            <p className="text-sm text-gray-600">
              We'll notify you when signatures are complete. Your progress is automatically saved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onSafeExit}
              className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-900 hover:border-gray-400 transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              <span>Return to Dashboard</span>
            </button>
            <button
              onClick={onStartNewCall}
              className="flex-1 px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>Start New Call</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}