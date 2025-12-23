import { useState } from 'react';
import { Send, FileText, CheckCircle2 } from 'lucide-react';

interface FirstCallFaxingSectionProps {
  faxesSent: number;
  faxesTotal: number;
  onFaxSent: () => void;
}

export function FirstCallFaxingSection({ 
  faxesSent, 
  faxesTotal, 
  onFaxSent 
}: FirstCallFaxingSectionProps) {
  const [selectedRecipient, setSelectedRecipient] = useState('');

  // Mock documents - in real app, this would come from state
  const documents = [
    { id: '1', name: 'Body Release Form' },
    { id: '2', name: 'GPL Receipt' },
    { id: '3', name: 'Cremation Authorization' },
  ];

  const commonRecipients = [
    { name: 'County Coroner', fax: '(555) 123-4567' },
    { name: 'Medical Examiner', fax: '(555) 234-5678' },
    { name: 'State Vital Records', fax: '(555) 345-6789' },
  ];

  const pendingDocs = documents.slice(faxesSent);
  const sentDocs = documents.slice(0, faxesSent);

  const handleSendFax = () => {
    if (!selectedRecipient) return;
    onFaxSent();
    setSelectedRecipient('');
  };

  return (
    <div className="bg-white border border-gray-200 p-8">
      {/* Section Header */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h2 className="text-gray-900 mb-3">Send Required Faxes</h2>
        <p className="text-gray-600">
          {faxesSent} of {faxesTotal} documents faxed · All documents are signed and ready to send
        </p>
      </div>

      <div className="max-w-2xl">
        {pendingDocs.length > 0 ? (
          <div className="space-y-6">
            {/* Ready to Send */}
            <div className="bg-blue-50 border-2 border-blue-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Send className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-2">Ready to fax</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    All signatures complete. Select recipient and send fax to required parties.
                  </p>

                  {/* Document to send */}
                  <div className="bg-white border border-blue-200 p-4 mb-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-gray-900">{pendingDocs[0].name}</p>
                        <p className="text-sm text-gray-600">Signed and ready to fax</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                  </div>

                  {/* Recipient Selection */}
                  <div className="space-y-3 mb-4">
                    <p className="text-sm text-gray-900">Select recipient:</p>
                    {commonRecipients.map((recipient) => (
                      <label
                        key={recipient.name}
                        className={`
                          block border-2 p-4 cursor-pointer transition-all
                          ${selectedRecipient === recipient.name
                            ? 'border-blue-500 bg-white'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="recipient"
                            checked={selectedRecipient === recipient.name}
                            onChange={() => setSelectedRecipient(recipient.name)}
                            className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-0 focus:ring-offset-0"
                          />
                          <div className="flex-1">
                            <p className="text-gray-900 text-sm">{recipient.name}</p>
                            <p className="text-gray-600 text-sm">{recipient.fax}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Send Button */}
                  <button
                    onClick={handleSendFax}
                    disabled={!selectedRecipient}
                    className={`
                      w-full px-6 py-3 flex items-center justify-center gap-2 transition-colors
                      ${!selectedRecipient
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                      }
                    `}
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Fax to {selectedRecipient || 'Selected Recipient'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* What happens next */}
            <div className="bg-gray-50 border border-gray-200 p-5">
              <p className="text-sm text-gray-900 mb-2">✨ What happens next</p>
              <p className="text-sm text-gray-600">
                Fax will be sent immediately. You'll receive confirmation once delivered. System will auto-advance when all faxes are sent.
              </p>
            </div>
          </div>
        ) : (
          /* All faxes sent - Auto-advances to complete */
          <div className="bg-green-50 border border-green-200 p-6">
            <div className="flex items-center gap-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="text-gray-900 mb-1">All faxes sent</h3>
                <p className="text-sm text-gray-600">
                  System is advancing to completion...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Sent Faxes */}
        {sentDocs.length > 0 && (
          <div className="mt-6">
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Sent ({sentDocs.length})
            </h3>
            <div className="space-y-3">
              {sentDocs.map((doc) => (
                <div key={doc.id} className="border border-green-200 bg-green-50 p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-gray-900 mb-1">{doc.name}</p>
                      <p className="text-sm text-gray-600">Faxed to County Coroner</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="bg-gray-50 border border-gray-200 p-5 mt-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-900">Faxing progress</p>
            <p className="text-sm text-gray-600">{faxesSent} / {faxesTotal}</p>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-500"
              style={{ width: `${(faxesSent / faxesTotal) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}