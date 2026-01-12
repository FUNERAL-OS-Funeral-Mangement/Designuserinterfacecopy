import { useState } from 'react';
import { Download, Send, FileText, Calendar, Filter, User, MapPin, FileSignature, ClipboardList, Briefcase, Building2 } from 'lucide-react';

interface ReportsTabProps {
  caseId: string;
  caseNumber: string | number;
  deceasedName: string;
  dateCreated: string;
}

type DateFilter = 'all' | 'today' | 'week' | 'month' | 'custom';

export function ReportsTab({ caseId, caseNumber, deceasedName, dateCreated }: ReportsTabProps) {
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [showSendModal, setShowSendModal] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [customDateFrom, setCustomDateFrom] = useState('');
  const [customDateTo, setCustomDateTo] = useState('');

  // Mock case data - in production, this would come from your backend/store
  const reportData = {
    deceasedName: deceasedName,
    dateReceived: dateCreated,
    dateOfDeath: 'May 28, 2023',
    embalmerName: 'Michael Rodriguez',
    embalmerLicense: 'FL-EMB-4521',
    methodOfDisposal: 'Sea Scattering of Ashes',
    countyOfDeath: 'Miami-Dade County',
    burialTransitNumber: 'BTN-2023-FL-05892',
    directorInCharge: 'Sarah Mitchell',
    directorLicense: 'FL-FD-3301',
    directorSignature: 'Sarah L. Mitchell',
    signatureDate: 'June 1, 2023',
    placeOfDeath: 'Jackson Memorial Hospital',
    timeOfDeath: '3:45 PM',
    certificateNumber: 'DC-2023-18492',
  };

  const handleSendReport = () => {
    console.log('Sending report to:', recipientEmail);
    setShowSendModal(false);
    setRecipientEmail('');
  };

  return (
    <div>
      {/* Filters & Actions */}
      <div className="bg-white border border-gray-200 p-4 sm:p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left: Filters */}
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            {/* Date Filter */}
            <div className="flex-1 sm:flex-initial">
              <label className="text-xs text-gray-600 mb-1.5 block">Time Period</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value as DateFilter)}
                  className="w-full sm:w-auto pl-10 pr-4 py-2 bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-gray-300 transition-colors appearance-none"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button 
              onClick={() => setShowSendModal(true)}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Report</span>
            </button>
            <button className="px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {/* Custom Date Range */}
        {dateFilter === 'custom' && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="text-xs text-gray-600 mb-1.5 block">From Date</label>
              <input
                type="date"
                value={customDateFrom}
                onChange={(e) => setCustomDateFrom(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-gray-300 transition-colors"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-600 mb-1.5 block">To Date</label>
              <input
                type="date"
                value={customDateTo}
                onChange={(e) => setCustomDateTo(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-gray-300 transition-colors"
              />
            </div>
          </div>
        )}
      </div>

      {/* Report Header */}
      <div className="bg-white border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-gray-900 mb-1">Case Report Summary</h2>
            <p className="text-sm text-gray-600">
              Case #{caseNumber} • Official Documentation
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-600 mb-1">Report Generated</p>
            <p className="text-sm text-gray-900">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-sm border border-emerald-200">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          Report Complete & Verified
        </div>
      </div>

      {/* Deceased Information */}
      <div className="bg-white border border-gray-200 mb-6">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h3 className="text-gray-900 flex items-center gap-2">
            <User className="w-5 h-5 text-gray-600" />
            Deceased Information
          </h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Name of Deceased</label>
              <p className="text-gray-900">{reportData.deceasedName}</p>
            </div>
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Date Received</label>
              <p className="text-gray-900">{reportData.dateReceived}</p>
            </div>
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Date of Death</label>
              <p className="text-gray-900">{reportData.dateOfDeath}</p>
            </div>
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Time of Death</label>
              <p className="text-gray-900">{reportData.timeOfDeath}</p>
            </div>
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Place of Death</label>
              <p className="text-gray-900">{reportData.placeOfDeath}</p>
            </div>
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Death Certificate Number</label>
              <p className="text-gray-900">{reportData.certificateNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Service Details */}
      <div className="bg-white border border-gray-200 mb-6">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h3 className="text-gray-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-gray-600" />
            Service Details
          </h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Name of Embalmer</label>
              <p className="text-gray-900">{reportData.embalmerName}</p>
              <p className="text-xs text-gray-500 mt-0.5">License: {reportData.embalmerLicense}</p>
            </div>
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Method of Disposal</label>
              <p className="text-gray-900">{reportData.methodOfDisposal}</p>
            </div>
            <div>
              <label className="text-xs text-gray-600 mb-1 block">County of Death</label>
              <p className="text-gray-900">{reportData.countyOfDeath}</p>
            </div>
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Burial Transit Number</label>
              <p className="text-gray-900 font-mono">{reportData.burialTransitNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Director Authorization */}
      <div className="bg-white border border-gray-200 mb-6">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h3 className="text-gray-900 flex items-center gap-2">
            <FileSignature className="w-5 h-5 text-gray-600" />
            Director Authorization
          </h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Director in Charge</label>
              <p className="text-gray-900">{reportData.directorInCharge}</p>
              <p className="text-xs text-gray-500 mt-0.5">License: {reportData.directorLicense}</p>
            </div>
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Date Signed</label>
              <p className="text-gray-900">{reportData.signatureDate}</p>
            </div>
          </div>

          {/* Signature Display */}
          <div className="border border-gray-200 bg-gray-50 p-6">
            <label className="text-xs text-gray-600 mb-3 block">Signature of Director in Charge</label>
            <div className="bg-white border-2 border-dashed border-gray-300 p-6 flex items-center justify-center min-h-[120px]">
              <div className="text-center">
                <p className="text-4xl text-gray-800 font-signature italic mb-2">
                  {reportData.directorSignature}
                </p>
                <p className="text-xs text-gray-500">Digitally signed on {reportData.signatureDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Notice */}
      <div className="bg-blue-50 border border-blue-200 p-4">
        <div className="flex gap-3">
          <ClipboardList className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-900 mb-1">Regulatory Compliance</p>
            <p className="text-xs text-blue-700">
              This report contains all required information as mandated by state funeral service regulations. 
              All documentation has been verified and is compliant with current standards.
            </p>
          </div>
        </div>
      </div>

      {/* Send Report Modal */}
      {showSendModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full p-6">
            <h3 className="text-gray-900 mb-4">Send Case Report</h3>
            <p className="text-sm text-gray-600 mb-6">
              Enter the email address where you'd like to send this case report.
            </p>
            <div className="mb-6">
              <label className="text-sm text-gray-700 mb-2 block">Recipient Email</label>
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="recipient@example.com"
                className="w-full px-3 py-2 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-300 transition-colors"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSendModal(false)}
                className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendReport}
                disabled={!recipientEmail}
                className="flex-1 px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}