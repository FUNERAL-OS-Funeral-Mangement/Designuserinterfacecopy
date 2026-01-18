import { useState } from 'react';
import { X, Copy, Check, Mail, MessageSquare, Link } from 'lucide-react';

interface ShareCatalogModalProps {
  caseId: string;
  decedentName: string;
  onClose: () => void;
}

export function ShareCatalogModal({ caseId, decedentName, onClose }: ShareCatalogModalProps) {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Generate unique shareable link
  const shareLink = `${window.location.origin}/family-catalog/${caseId}`;

  const handleCopyLink = async () => {
    try {
      // Try modern clipboard API first
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      try {
        const textArea = document.createElement('textarea');
        textArea.value = shareLink;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        textArea.remove();
        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      } catch (fallbackErr) {
        console.error('Failed to copy:', fallbackErr);
      }
    }
  };

  const handleSendEmail = () => {
    // In production, this would trigger an email service
    alert(`Email would be sent to: ${email}`);
  };

  const handleSendSMS = () => {
    // In production, this would trigger SMS service
    alert(`SMS would be sent to: ${phone}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-gray-900 mb-1">Share Catalog with Family</h2>
            <p className="text-gray-600 text-sm">For {decedentName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Info Box */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
            <p className="text-teal-900 text-sm">
              Share this secure link with the family so they can browse and select items at their own pace. 
              You'll be able to review and approve their selections before finalizing.
            </p>
          </div>

          {/* Link Copy */}
          <div>
            <label className="block text-gray-700 mb-2">Shareable Link</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm"
              />
              <button
                onClick={handleCopyLink}
                className={`px-4 py-3 rounded-lg transition-colors flex items-center gap-2 ${
                  copied
                    ? 'bg-green-600 text-white'
                    : 'bg-teal-600 text-white hover:bg-teal-700'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Email Share */}
          <div>
            <label className="block text-gray-700 mb-2">Send via Email</label>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="family@example.com"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button
                onClick={handleSendEmail}
                disabled={!email}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Send
              </button>
            </div>
          </div>

          {/* SMS Share */}
          <div>
            <label className="block text-gray-700 mb-2">Send via SMS</label>
            <div className="flex gap-2">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 123-4567"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button
                onClick={handleSendSMS}
                disabled={!phone}
                className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Send
              </button>
            </div>
          </div>

          {/* Features List */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-gray-900 mb-3">What families can do:</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-teal-700" />
                </div>
                <p className="text-gray-700 text-sm">Browse all available packages and add-ons</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-teal-700" />
                </div>
                <p className="text-gray-700 text-sm">Select items that feel right for their loved one</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-teal-700" />
                </div>
                <p className="text-gray-700 text-sm">See real-time pricing and totals</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-teal-700" />
                </div>
                <p className="text-gray-700 text-sm">Submit their selections for your review</p>
              </div>
            </div>
          </div>

          {/* Link Settings */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-gray-900 mb-3">Link Settings</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 text-teal-600 rounded"
                />
                <span className="text-gray-700 text-sm">Allow family to add notes to selections</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 text-teal-600 rounded"
                />
                <span className="text-gray-700 text-sm">Notify me when family submits selections</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-teal-600 rounded"
                />
                <span className="text-gray-700 text-sm">Set expiration date for link (optional)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}