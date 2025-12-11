import { FileText, Download, Eye, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { ContractItemization } from './ContractItemization';

interface DocumentsTabProps {
  caseId?: string;
}

export function DocumentsTab({ caseId = '1' }: DocumentsTabProps) {
  const [showContractItemization, setShowContractItemization] = useState(false);

  if (showContractItemization) {
    return <ContractItemization caseId={caseId} onBack={() => setShowContractItemization(false)} />;
  }

  const documents = [
    { name: 'Removal Release', status: 'signed' as const, icon: FileText },
    { name: 'First Call Sheet', status: 'signed' as const, icon: FileText },
    { name: 'Authorization Forms', status: 'pending' as const, icon: FileText },
    { name: 'Cremation Documents', status: 'missing' as const, icon: FileText },
    { name: 'Contract & Itemization', status: 'signed' as const, icon: FileText },
    { name: 'Death Certificate Worksheet', status: 'pending' as const, icon: FileText },
  ];

  const completed = documents.filter(d => d.status === 'signed').length;
  const total = documents.length;
  const percentage = Math.round((completed / total) * 100);

  const getStatusBadge = (status: 'signed' | 'pending' | 'missing') => {
    switch (status) {
      case 'signed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Signed
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 text-orange-700 text-xs border border-orange-200">
            <Clock className="w-3.5 h-3.5" />
            Pending
          </span>
        );
      case 'missing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-700 text-xs border border-red-200">
            <AlertCircle className="w-3.5 h-3.5" />
            Missing
          </span>
        );
    }
  };

  return (
    <div>
      {/* Progress Card */}
      <div className="bg-white border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Documents Completion</h3>
          <span className="text-sm text-gray-900">{percentage}%</span>
        </div>
        <div className="w-full bg-gray-100 h-2 overflow-hidden">
          <div 
            className="bg-gray-900 h-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {completed} of {total} documents completed
        </p>
      </div>

      {/* Documents List */}
      <div className="bg-white border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-gray-900">All Documents</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {documents.map((doc, index) => (
            <div 
              key={index} 
              className={`px-6 py-4 hover:bg-gray-50 transition-colors flex items-center justify-between gap-4 ${
                doc.name === 'Contract & Itemization' ? 'cursor-pointer' : ''
              }`}
              onClick={() => {
                if (doc.name === 'Contract & Itemization') {
                  setShowContractItemization(true);
                }
              }}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <doc.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 truncate">{doc.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 flex-shrink-0">
                {getStatusBadge(doc.status)}
                <div className="flex items-center gap-1">
                  <button 
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (doc.name === 'Contract & Itemization') {
                        setShowContractItemization(true);
                      }
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}