import { ArrowLeft, Send, FileText } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useState } from 'react';

interface SendEFaxProps {
  onBack: () => void;
  onCreateCase?: () => void;
  onBackToDashboard?: () => void;
}

export function SendEFax({ onBack, onCreateCase, onBackToDashboard }: SendEFaxProps) {
  const caseData = useStore((state) => state.caseData);
  const [faxNumber, setFaxNumber] = useState('');
  const [fromName, setFromName] = useState('Eduardo Rivero Funeral Home');
  const [toName, setToName] = useState('North Shore Hospital');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSendFax = () => {
    if (!faxNumber) {
      alert('Please enter a fax number');
      return;
    }
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setShowSuccess(true);
    }, 2000);
  };

  // Success screen after fax sent
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-gray-900 mb-2">EFAX Sent Successfully!</h2>
            <p className="text-gray-600">
              The release form has been sent to {toName} at {faxNumber}
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
            <h3 className="text-gray-900 mb-2">Next Step: Create Case</h3>
            <p className="text-gray-600 text-sm mb-4">
              Now that the release form has been sent, you can create a full case to manage arrangements, catalog selections, contracts, and more.
            </p>
            {onCreateCase && (
              <button
                onClick={onCreateCase}
                className="w-full px-6 py-4 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Create Full Case
              </button>
            )}
          </div>

          <button
            onClick={onBackToDashboard || onBack}
            className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Back to First Call
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-4 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h2 className="text-gray-900">Send EFAX</h2>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Fax Number */}
        <div>
          <label className="block text-gray-700 mb-2">Fax Number</label>
          <input
            type="tel"
            value={faxNumber}
            onChange={(e) => setFaxNumber(e.target.value)}
            placeholder="Enter fax number"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* From */}
        <div>
          <label className="block text-gray-700 mb-2">From</label>
          <input
            type="text"
            value={fromName}
            onChange={(e) => setFromName(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* To */}
        <div>
          <label className="block text-gray-700 mb-2">To</label>
          <input
            type="text"
            value={toName}
            onChange={(e) => setToName(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-gray-700 mb-2">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add an optional message..."
            rows={4}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Attachments */}
        <div>
          <label className="block text-gray-700 mb-2">Attachments</label>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-900 text-sm">Release Form ({caseData.deceasedName || 'Jane Doe'}).pdf</p>
              <p className="text-gray-500 text-xs">128 KB</p>
            </div>
          </div>
        </div>

        {/* Send Button */}
        <button
          onClick={handleSendFax}
          disabled={!faxNumber || isSent}
          className="w-full py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isSent ? (
            <>
              <span>EFAX Sent Successfully!</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send EFAX
            </>
          )}
        </button>

        {/* Note */}
        <p className="text-gray-500 text-sm text-center">
          The release form will be sent securely to the specified fax number.
        </p>
      </div>
    </div>
  );
}