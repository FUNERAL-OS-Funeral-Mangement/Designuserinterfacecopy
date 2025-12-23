import { Clock, CheckCircle2, Send, AlertCircle, ExternalLink } from 'lucide-react';
import type { DocumentStatus } from './FirstCallUnified';

interface FirstCallESignStatusProps {
  documents: DocumentStatus[];
  onDocumentSigned: (docId: string) => void;
}

export function FirstCallESignStatus({ documents, onDocumentSigned }: FirstCallESignStatusProps) {
  const awaitingDocs = documents.filter(doc => doc.status === 'awaiting-signature');
  const signedDocs = documents.filter(doc => doc.status === 'signed' || doc.status === 'sent');
  const draftDocs = documents.filter(doc => doc.status === 'draft');

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h2 className="text-gray-900 mb-2">eSignature Status</h2>
        <p className="text-gray-600">
          Track all documents sent for signature. Signed documents automatically move to the eFax queue.
        </p>
      </div>

      <div className="space-y-8">
        {/* Awaiting Signature */}
        {awaitingDocs.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-orange-600" />
              <h3 className="text-gray-900">Awaiting Signature ({awaitingDocs.length})</h3>
            </div>
            <div className="space-y-3">
              {awaitingDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="border border-orange-200 bg-orange-50 p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-gray-900 mb-1">{doc.name}</p>
                      <p className="text-sm text-gray-600">Sent to: {doc.sentTo}</p>
                    </div>
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs">
                      Awaiting Signature
                    </span>
                  </div>

                  {doc.sentAt && (
                    <p className="text-sm text-gray-600 mb-3">
                      Sent: {doc.sentAt}
                    </p>
                  )}

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onDocumentSigned(doc.id)}
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View in DocuSign
                    </button>
                    <button className="text-sm text-gray-600 hover:text-gray-900">
                      Resend reminder
                    </button>
                    
                    {/* Demo button */}
                    <button
                      onClick={() => onDocumentSigned(doc.id)}
                      className="ml-auto text-sm px-3 py-1 bg-gray-900 text-white hover:bg-gray-800"
                    >
                      Mark as Signed (Demo)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recently Signed */}
        {signedDocs.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <h3 className="text-gray-900">Signed ({signedDocs.length})</h3>
            </div>
            <div className="space-y-3">
              {signedDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="border border-green-200 bg-green-50 p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-gray-900 mb-1">{doc.name}</p>
                      <p className="text-sm text-gray-600">Signed by: {doc.sentTo}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs">
                      {doc.status === 'sent' ? 'Sent' : 'Signed'}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    {doc.sentAt && <p>Sent: {doc.sentAt}</p>}
                    {doc.signedAt && <p>Signed: {doc.signedAt}</p>}
                    {doc.faxedAt && <p>Faxed: {doc.faxedAt}</p>}
                  </div>

                  {doc.status === 'signed' && (
                    <div className="mt-3 pt-3 border-t border-green-200">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-green-700 flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Ready to fax
                        </p>
                        <button className="text-sm text-blue-600 hover:text-blue-700">
                          Go to eFax Queue →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Drafts */}
        {draftDocs.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-gray-400" />
              <h3 className="text-gray-900">Drafts ({draftDocs.length})</h3>
            </div>
            <div className="space-y-3">
              {draftDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="border border-gray-200 p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-gray-900 mb-1">{doc.name}</p>
                      <p className="text-sm text-gray-600">Not sent yet</p>
                    </div>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs">
                      Draft
                    </span>
                  </div>

                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    Send for signature
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {documents.length === 0 && (
          <div className="border border-gray-200 p-12 text-center">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-900 mb-1">No documents in signature workflow</p>
            <p className="text-sm text-gray-500">
              Create documents in the Documents tab to send for eSignature
            </p>
          </div>
        )}
      </div>

      {/* Help Box */}
      {awaitingDocs.length > 0 && (
        <div className="mt-8 p-4 bg-gray-50 border border-gray-200">
          <p className="text-sm text-gray-900 mb-2">💡 What you can do now</p>
          <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
            <li>Send reminders to signers who haven't completed yet</li>
            <li>Check signature status in real-time via DocuSign</li>
            <li>Signed documents will automatically appear in eFax Queue</li>
          </ul>
        </div>
      )}
    </div>
  );
}
