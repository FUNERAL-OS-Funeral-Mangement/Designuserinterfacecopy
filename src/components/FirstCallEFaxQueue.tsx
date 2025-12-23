import { useState } from 'react';
import { Send, CheckCircle2, FileText, ChevronDown } from 'lucide-react';
import type { DocumentStatus } from './FirstCallUnified';

interface FirstCallEFaxQueueProps {
  documents: DocumentStatus[];
  onDocumentFaxed: (docId: string) => void;
}

export function FirstCallEFaxQueue({ documents, onDocumentFaxed }: FirstCallEFaxQueueProps) {
  const [selectedDocs, setSelectedDocs] = useState<Set<string>>(new Set());
  const [faxNumber, setFaxNumber] = useState('');
  const [faxRecipient, setFaxRecipient] = useState('');

  const toggleDocSelection = (docId: string) => {
    const newSelected = new Set(selectedDocs);
    if (newSelected.has(docId)) {
      newSelected.delete(docId);
    } else {
      newSelected.add(docId);
    }
    setSelectedDocs(newSelected);
  };

  const handleSendFax = () => {
    if (selectedDocs.size === 0) return;
    
    // Send each selected document
    selectedDocs.forEach(docId => {
      onDocumentFaxed(docId);
    });
    
    // Clear selection
    setSelectedDocs(new Set());
    setFaxNumber('');
    setFaxRecipient('');
  };

  const commonRecipients = [
    { name: 'County Coroner', fax: '(555) 123-4567' },
    { name: 'Medical Examiner', fax: '(555) 234-5678' },
    { name: 'State Vital Records', fax: '(555) 345-6789' },
    { name: 'Crematory', fax: '(555) 456-7890' },
  ];

  return (
    <div className="max-w-4xl">
      {/* Header with CTA */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-gray-900 mb-2">eFax Queue</h2>
            <p className="text-gray-600">
              Signed documents ready to fax. Select documents and recipient to send.
            </p>
          </div>
          {documents.length > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 text-blue-700">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span className="text-sm">{documents.length} ready to fax</span>
            </div>
          )}
        </div>
      </div>

      {documents.length === 0 ? (
        /* Empty State */
        <div className="border border-gray-200 p-12 text-center">
          <Send className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-900 mb-1">No documents ready to fax</p>
          <p className="text-sm text-gray-500 mb-4">
            Documents will appear here automatically once they're signed
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Waiting for signatures...</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Documents Ready to Fax */}
          <div>
            <h3 className="text-gray-900 mb-4">Documents ({documents.length})</h3>
            <div className="space-y-3">
              {documents.map((doc) => (
                <label
                  key={doc.id}
                  className={`
                    block border p-4 cursor-pointer transition-all
                    ${selectedDocs.has(doc.id) 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedDocs.has(doc.id)}
                      onChange={() => toggleDocSelection(doc.id)}
                      className="mt-1 w-4 h-4 border border-gray-300 text-blue-600 focus:ring-0 focus:ring-offset-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-green-100 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-gray-900 mb-1">{doc.name}</p>
                            <p className="text-sm text-gray-600">For: {doc.recipientName}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 ml-13">
                        <p>Signed by: {doc.sentTo}</p>
                        {doc.signedAt && <p>Signed: {doc.signedAt}</p>}
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {selectedDocs.size > 0 && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200">
                <p className="text-sm text-blue-900">
                  {selectedDocs.size} document{selectedDocs.size !== 1 ? 's' : ''} selected
                </p>
              </div>
            )}
          </div>

          {/* Fax Recipient & Send */}
          <div>
            <h3 className="text-gray-900 mb-4">Send To</h3>
            
            <div className="space-y-4">
              {/* Quick Select Recipients */}
              <div>
                <label className="block text-gray-700 mb-2">Common recipients</label>
                <div className="space-y-2">
                  {commonRecipients.map((recipient) => (
                    <button
                      key={recipient.name}
                      onClick={() => {
                        setFaxRecipient(recipient.name);
                        setFaxNumber(recipient.fax);
                      }}
                      className="w-full border border-gray-200 p-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      <p className="text-gray-900 text-sm mb-1">{recipient.name}</p>
                      <p className="text-gray-600 text-sm">{recipient.fax}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Manual Entry */}
              <div className="pt-4 border-t border-gray-200">
                <label className="block text-gray-700 mb-2">Or enter manually</label>
                <input
                  type="text"
                  value={faxRecipient}
                  onChange={(e) => setFaxRecipient(e.target.value)}
                  placeholder="Recipient name"
                  className="w-full px-4 py-3 mb-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                />
                <input
                  type="tel"
                  value={faxNumber}
                  onChange={(e) => setFaxNumber(e.target.value)}
                  placeholder="Fax number"
                  className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendFax}
                disabled={selectedDocs.size === 0 || !faxNumber || !faxRecipient}
                className={`
                  w-full px-6 py-4 flex items-center justify-center gap-2 transition-colors
                  ${selectedDocs.size === 0 || !faxNumber || !faxRecipient
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                  }
                `}
              >
                <Send className="w-5 h-5" />
                <span>Send {selectedDocs.size > 0 ? `${selectedDocs.size} ` : ''}Fax</span>
              </button>

              {selectedDocs.size === 0 && (
                <p className="text-sm text-gray-500 text-center">
                  Select documents to enable faxing
                </p>
              )}

              {selectedDocs.size > 0 && (!faxNumber || !faxRecipient) && (
                <p className="text-sm text-orange-600 text-center">
                  Enter recipient details to continue
                </p>
              )}
            </div>

            {/* Status Preview */}
            {selectedDocs.size > 0 && faxNumber && faxRecipient && (
              <div className="mt-6 p-4 bg-gray-50 border border-gray-200">
                <p className="text-sm text-gray-900 mb-2">Ready to send</p>
                <div className="text-sm text-gray-700 space-y-1">
                  <p>• {selectedDocs.size} document{selectedDocs.size !== 1 ? 's' : ''}</p>
                  <p>• To: {faxRecipient} ({faxNumber})</p>
                  <p>• Status will update after send</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Help Box */}
      {documents.length > 0 && (
        <div className="mt-8 p-4 bg-gray-50 border border-gray-200">
          <p className="text-sm text-gray-900 mb-2">💡 Faxing tips</p>
          <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
            <li>You can select multiple documents to send in one fax</li>
            <li>Fax status will be tracked and updated automatically</li>
            <li>Sent documents remain in case files for reference</li>
          </ul>
        </div>
      )}
    </div>
  );
}
