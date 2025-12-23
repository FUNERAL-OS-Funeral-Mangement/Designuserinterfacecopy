import { useState } from 'react';
import { ArrowLeft, Send, FileText, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { FirstCallBasicInfo } from './FirstCallBasicInfo';
import { FirstCallDocuments } from './FirstCallDocuments';
import { FirstCallESignStatus } from './FirstCallESignStatus';
import { FirstCallEFaxQueue } from './FirstCallEFaxQueue';

interface FirstCallUnifiedProps {
  onBack: () => void;
  onNavigateToCases?: () => void;
  caseId?: string;
}

type Tab = 'basic-info' | 'documents' | 'esign-status' | 'efax-queue';

export interface DocumentStatus {
  id: string;
  name: string;
  status: 'draft' | 'awaiting-signature' | 'signed' | 'sent';
  sentTo?: string;
  sentAt?: string;
  signedAt?: string;
  faxedAt?: string;
  recipientName?: string;
}

export function FirstCallUnified({ onBack, onNavigateToCases, caseId }: FirstCallUnifiedProps) {
  const [activeTab, setActiveTab] = useState<Tab>('basic-info');
  
  // Mock document statuses - in real app, this would come from store
  const [documents, setDocuments] = useState<DocumentStatus[]>([
    {
      id: '1',
      name: 'Body Release Form',
      status: 'signed',
      sentTo: 'Mary Smith',
      recipientName: 'John Smith',
      sentAt: 'Dec 17, 2:30 PM',
      signedAt: 'Dec 17, 3:45 PM',
    },
    {
      id: '2',
      name: 'Cremation Authorization',
      status: 'signed',
      sentTo: 'Sarah Johnson',
      recipientName: 'Robert Johnson',
      sentAt: 'Dec 17, 1:15 PM',
      signedAt: 'Dec 17, 2:10 PM',
    },
    {
      id: '3',
      name: 'General Price List Receipt',
      status: 'awaiting-signature',
      sentTo: 'Michael Davis',
      recipientName: 'Linda Davis',
      sentAt: 'Dec 17, 4:00 PM',
    },
  ]);

  // Count documents ready to fax (signed but not sent)
  const readyToFaxCount = documents.filter(doc => doc.status === 'signed').length;
  const awaitingSignatureCount = documents.filter(doc => doc.status === 'awaiting-signature').length;

  const tabs = [
    { id: 'basic-info' as Tab, label: 'Basic Information', icon: FileText },
    { id: 'documents' as Tab, label: 'Documents', icon: FileText },
    { 
      id: 'esign-status' as Tab, 
      label: 'eSign Status', 
      icon: Clock,
      badge: awaitingSignatureCount > 0 ? awaitingSignatureCount : undefined,
      badgeColor: 'orange'
    },
    { 
      id: 'efax-queue' as Tab, 
      label: 'eFax Queue', 
      icon: Send,
      badge: readyToFaxCount > 0 ? readyToFaxCount : undefined,
      badgeColor: 'blue'
    },
  ];

  const handleDocumentSigned = (docId: string) => {
    setDocuments(docs => 
      docs.map(doc => 
        doc.id === docId 
          ? { ...doc, status: 'signed' as const, signedAt: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) }
          : doc
      )
    );
    // Auto-switch to eFax queue when document is signed
    setActiveTab('efax-queue');
  };

  const handleDocumentFaxed = (docId: string) => {
    setDocuments(docs => 
      docs.map(doc => 
        doc.id === docId 
          ? { ...doc, status: 'sent' as const, faxedAt: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) }
          : doc
      )
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Back Button */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Page Header with Queue Status */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-gray-900 mb-1">First Call</h1>
              <p className="text-gray-600">Manage intake, documents, signatures, and faxing</p>
            </div>
            
            {/* Queue Status Indicator */}
            <div className="flex items-center gap-4">
              {awaitingSignatureCount > 0 && (
                <div className="flex items-center gap-2 px-3 py-2 bg-orange-50 border border-orange-200 text-orange-700">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{awaitingSignatureCount} awaiting signature</span>
                </div>
              )}
              {readyToFaxCount > 0 && (
                <button
                  onClick={() => setActiveTab('efax-queue')}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span className="text-sm">{readyToFaxCount} ready to fax</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative flex items-center gap-2 px-1 py-4 border-b-2 transition-colors
                    ${isActive 
                      ? 'border-gray-900 text-gray-900' 
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`
                      inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs
                      ${tab.badgeColor === 'orange' 
                        ? 'bg-orange-100 text-orange-700' 
                        : 'bg-blue-100 text-blue-700'
                      }
                    `}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {activeTab === 'basic-info' && (
          <FirstCallBasicInfo 
            onComplete={() => setActiveTab('documents')}
            caseId={caseId}
          />
        )}
        
        {activeTab === 'documents' && (
          <FirstCallDocuments 
            documents={documents}
            onNavigateToESign={() => setActiveTab('esign-status')}
          />
        )}
        
        {activeTab === 'esign-status' && (
          <FirstCallESignStatus 
            documents={documents}
            onDocumentSigned={handleDocumentSigned}
          />
        )}
        
        {activeTab === 'efax-queue' && (
          <FirstCallEFaxQueue 
            documents={documents.filter(doc => doc.status === 'signed')}
            onDocumentFaxed={handleDocumentFaxed}
          />
        )}
      </div>
    </div>
  );
}
