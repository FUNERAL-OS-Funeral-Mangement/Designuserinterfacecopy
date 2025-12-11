import { ArrowLeft, Link as LinkIcon, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface CatalogLinkProps {
  onBack: () => void;
}

export function CatalogLink({ onBack }: CatalogLinkProps) {
  const [copied, setCopied] = useState(false);
  const catalogUrl = 'https://legacyservices.com/catalog/family-view';

  const handleCopy = () => {
    navigator.clipboard.writeText(catalogUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-4 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h2 className="text-gray-900">Catalog Link</h2>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <LinkIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-gray-900">Family Catalog Link</h3>
              <p className="text-gray-600 text-sm">Share this link with families to browse services</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-gray-900 break-all text-sm">{catalogUrl}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              className="flex-1 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
            >
              <Copy className="w-5 h-5" />
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
            
            <a
              href={catalogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              Open
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
