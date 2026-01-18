import { FileText, Plus, Send } from 'lucide-react';
import type { DocumentStatus } from './FirstCallUnified';

interface FirstCallDocumentsProps {
  documents: DocumentStatus[];
  onNavigateToESign: () => void;
}

export function FirstCallDocuments({ documents, onNavigateToESign }: FirstCallDocumentsProps) {
  const availableTemplates = [
    { id: 'body-release', name: 'Body Release Form', description: 'Authorization for body removal' },
    { id: 'cremation-auth', name: 'Cremation Authorization', description: 'Authorization for cremation services' },
    { id: 'gpl-receipt', name: 'General Price List Receipt', description: 'Acknowledgment of GPL review' },
    { id: 'embalming-auth', name: 'Embalming Authorization', description: 'Authorization for embalming' },
  ];

  const getStatusColor = (status: DocumentStatus['status']) => {
    switch (status) {
      case 'draft': return 'gray';
      case 'awaiting-signature': return 'orange';
      case 'signed': return 'green';
      case 'sent': return 'blue';
    }
  };

  const getStatusLabel = (status: DocumentStatus['status']) => {
    switch (status) {
      case 'draft': return 'Draft';
      case 'awaiting-signature': return 'Awaiting Signature';
      case 'signed': return 'Signed';
      case 'sent': return 'Sent';
    }
  };

  return (
    <div className="max-w-4xl">
      {/* Help Text */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h2 className="text-gray-900 mb-2">Document Management</h2>
        <p className="text-gray-600">
          Generate documents from templates, send them for eSignature, and they'll automatically appear in the eFax queue once signed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Documents */}
        <div>
          <h3 className="text-gray-900 mb-4">Current Documents</h3>
          
          {documents.length === 0 ? (
            <div className="border border-gray-200 p-12 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-1">No documents created yet</p>
              <p className="text-sm text-gray-400">Create a document from a template to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {documents.map((doc) => {
                const statusColor = getStatusColor(doc.status);
                
                return (
                  <div
                    key={doc.id}
                    className="border border-gray-200 p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-gray-900 mb-1">{doc.name}</p>
                          {doc.recipientName && (
                            <p className="text-sm text-gray-600">For: {doc.recipientName}</p>
                          )}
                        </div>
                      </div>
                      <span className={`
                        px-2 py-1 text-xs
                        ${statusColor === 'gray' ? 'bg-gray-100 text-gray-700' : ''}
                        ${statusColor === 'orange' ? 'bg-orange-100 text-orange-700' : ''}
                        ${statusColor === 'green' ? 'bg-green-100 text-green-700' : ''}
                        ${statusColor === 'blue' ? 'bg-blue-100 text-blue-700' : ''}
                      `}>
                        {getStatusLabel(doc.status)}
                      </span>
                    </div>

                    {doc.sentTo && (
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Sent to: {doc.sentTo}</p>
                        {doc.sentAt && <p>Sent: {doc.sentAt}</p>}
                        {doc.signedAt && <p>Signed: {doc.signedAt}</p>}
                        {doc.faxedAt && <p>Faxed: {doc.faxedAt}</p>}
                      </div>
                    )}

                    {doc.status === 'signed' && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-sm text-green-700 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                          Ready to fax - check eFax Queue tab
                        </p>
                      </div>
                    )}

                    {doc.status === 'awaiting-signature' && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <button
                          onClick={onNavigateToESign}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          View signature status →
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Available Templates */}
        <div>
          <h3 className="text-gray-900 mb-4">Available Templates</h3>
          <div className="space-y-3">
            {availableTemplates.map((template) => (
              <button
                key={template.id}
                className="w-full border border-gray-200 p-4 hover:bg-gray-50 hover:border-gray-300 transition-all text-left group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 border-2 border-dashed border-gray-300 group-hover:border-gray-400 flex items-center justify-center flex-shrink-0 transition-colors">
                      <Plus className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                    <div>
                      <p className="text-gray-900 mb-1">{template.name}</p>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 ml-13 text-sm text-gray-500">
                  Click to create from template
                </div>
              </button>
            ))}
          </div>

          {/* Help Box */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-100">
            <p className="text-sm text-blue-900 mb-2">What happens next?</p>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Create document from template</li>
              <li>Document sent for eSignature</li>
              <li>Once signed, appears in eFax Queue</li>
              <li>Fax to required parties</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
