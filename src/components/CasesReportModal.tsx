import { useState } from 'react';
import { X, Download, Send, Calendar, Filter, User, Briefcase, FileSignature, MapPin, FileText, Table, LayoutGrid } from 'lucide-react';

interface CaseData {
  caseId: string;
  caseNumber: number | string;
  dateCreated: string;
  deceasedName: string;
  caseType: 'At-Need' | 'Pre-Need';
  serviceType: string;
  location?: string;
  assignedTo: string;
}

interface CasesReportModalProps {
  show: boolean;
  onClose: () => void;
  cases: CaseData[];
}

type DateFilter = 'all' | 'today' | 'week' | 'month' | 'custom';
type CaseTypeFilter = 'all' | 'At-Need' | 'Pre-Need';

// Mock additional case data - in production, this would come from your backend
const getCaseReportData = (caseId: string, deceasedName: string, dateCreated: string) => ({
  dateReceived: dateCreated,
  dateOfDeath: 'May 28, 2023',
  embalmerName: 'Michael Rodriguez',
  embalmerLicense: 'FL-EMB-4521',
  methodOfDisposal: 'Sea Scattering of Ashes',
  countyOfDeath: 'Miami-Dade County',
  burialTransitNumber: `BTN-2023-FL-${caseId.split('-')[1]}`,
  directorInCharge: 'Sarah Mitchell',
  directorLicense: 'FL-FD-3301',
  directorSignature: 'Sarah L. Mitchell',
  signatureDate: dateCreated,
  placeOfDeath: 'Jackson Memorial Hospital',
  timeOfDeath: '3:45 PM',
  certificateNumber: `DC-2023-${caseId.split('-')[1]}`,
});

export function CasesReportModal({ show, onClose, cases }: CasesReportModalProps) {
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [caseTypeFilter, setCaseTypeFilter] = useState<CaseTypeFilter>('all');
  const [customDateFrom, setCustomDateFrom] = useState('');
  const [customDateTo, setCustomDateTo] = useState('');
  const [showSendModal, setShowSendModal] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('table'); // Default to table view
  
  const reportGeneratedDate = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  if (!show) return null;

  // Filter cases
  const filteredCases = cases.filter((caseData) => {
    if (caseTypeFilter !== 'all' && caseData.caseType !== caseTypeFilter) {
      return false;
    }
    // Date filtering would be implemented here in production
    return true;
  });

  const handleSendReport = () => {
    console.log('Sending report to:', recipientEmail);
    setShowSendModal(false);
    setRecipientEmail('');
  };

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Modal Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-gray-900">Case Reports</h2>
              <p className="text-sm text-gray-600 mt-1">
                {filteredCases.length} {filteredCases.length === 1 ? 'case' : 'cases'} • Generated on {reportGeneratedDate}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Filters */}
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Date Filter */}
              <div className="flex-1">
                <label className="text-xs text-gray-600 mb-1.5 block">Time Period</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value as DateFilter)}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-gray-300 transition-colors appearance-none"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>
              </div>

              {/* Case Type Filter */}
              <div className="flex-1">
                <label className="text-xs text-gray-600 mb-1.5 block">Case Type</label>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={caseTypeFilter}
                    onChange={(e) => setCaseTypeFilter(e.target.value as CaseTypeFilter)}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-gray-300 transition-colors appearance-none"
                  >
                    <option value="all">All Types</option>
                    <option value="At-Need">At-Need</option>
                    <option value="Pre-Need">Pre-Need</option>
                  </select>
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex-1">
                <label className="text-xs text-gray-600 mb-1.5 block">View Mode</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`flex-1 px-4 py-2 transition-colors flex items-center justify-center gap-2 ${
                      viewMode === 'table'
                        ? 'bg-gray-900 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Table className="w-4 h-4" />
                    Table
                  </button>
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`flex-1 px-4 py-2 transition-colors flex items-center justify-center gap-2 ${
                      viewMode === 'cards'
                        ? 'bg-gray-900 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                    Cards
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 md:items-end">
                <button
                  onClick={() => setShowSendModal(true)}
                  className="flex-1 md:flex-initial px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden md:inline">Send</span>
                </button>
                <button className="flex-1 md:flex-initial px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  <span className="hidden md:inline">Export</span>
                </button>
              </div>
            </div>

            {/* Custom Date Range */}
            {dateFilter === 'custom' && (
              <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
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

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {viewMode === 'table' ? (
              /* Excel-Style Table View */
              <div className="bg-white border border-gray-300 overflow-x-auto">
                {/* Report Info Header */}
                <div className="bg-gray-100 border-b-2 border-gray-300 px-4 py-3">
                  <p className="text-xs text-gray-700">
                    <strong>RITE PATH FUNERAL HOME - CASE REPORTS</strong>
                  </p>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Report Generated: {reportGeneratedDate} | Total Cases: {filteredCases.length} | Filter: {caseTypeFilter === 'all' ? 'All Types' : caseTypeFilter}
                  </p>
                </div>
                
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-200 border-b border-gray-300">
                      <th className="px-3 py-2 text-left border-r border-gray-300 text-gray-900">Case #</th>
                      <th className="px-3 py-2 text-left border-r border-gray-300 text-gray-900">Name of Deceased</th>
                      <th className="px-3 py-2 text-left border-r border-gray-300 text-gray-900">Date Received</th>
                      <th className="px-3 py-2 text-left border-r border-gray-300 text-gray-900">Date of Death</th>
                      <th className="px-3 py-2 text-left border-r border-gray-300 text-gray-900">Case Type</th>
                      <th className="px-3 py-2 text-left border-r border-gray-300 text-gray-900">Service Type</th>
                      <th className="px-3 py-2 text-left border-r border-gray-300 text-gray-900">Name of Embalmer</th>
                      <th className="px-3 py-2 text-left border-r border-gray-300 text-gray-900">Embalmer License</th>
                      <th className="px-3 py-2 text-left border-r border-gray-300 text-gray-900">Method of Disposal</th>
                      <th className="px-3 py-2 text-left border-r border-gray-300 text-gray-900">County of Death</th>
                      <th className="px-3 py-2 text-left border-r border-gray-300 text-gray-900">Burial Transit #</th>
                      <th className="px-3 py-2 text-left border-r border-gray-300 text-gray-900">Director in Charge</th>
                      <th className="px-3 py-2 text-left text-gray-900">Director License</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCases.map((caseData, index) => {
                      const reportData = getCaseReportData(caseData.caseId, caseData.deceasedName, caseData.dateCreated);
                      const isEvenRow = index % 2 === 0;
                      
                      return (
                        <tr 
                          key={caseData.caseId} 
                          className={`border-b border-gray-300 hover:bg-blue-50 ${isEvenRow ? 'bg-white' : 'bg-gray-50'}`}
                        >
                          <td className="px-3 py-2 border-r border-gray-300 text-gray-900 font-mono">{caseData.caseNumber}</td>
                          <td className="px-3 py-2 border-r border-gray-300 text-gray-900">{caseData.deceasedName}</td>
                          <td className="px-3 py-2 border-r border-gray-300 text-gray-800">{reportData.dateReceived}</td>
                          <td className="px-3 py-2 border-r border-gray-300 text-gray-800">{reportData.dateOfDeath}</td>
                          <td className="px-3 py-2 border-r border-gray-300 text-gray-800">{caseData.caseType}</td>
                          <td className="px-3 py-2 border-r border-gray-300 text-gray-800">{caseData.serviceType}</td>
                          <td className="px-3 py-2 border-r border-gray-300 text-gray-800">{reportData.embalmerName}</td>
                          <td className="px-3 py-2 border-r border-gray-300 text-gray-700 font-mono text-[10px]">{reportData.embalmerLicense}</td>
                          <td className="px-3 py-2 border-r border-gray-300 text-gray-800">{reportData.methodOfDisposal}</td>
                          <td className="px-3 py-2 border-r border-gray-300 text-gray-800">{reportData.countyOfDeath}</td>
                          <td className="px-3 py-2 border-r border-gray-300 text-gray-900 font-mono text-[10px]">{reportData.burialTransitNumber}</td>
                          <td className="px-3 py-2 border-r border-gray-300 text-gray-800">{reportData.directorInCharge}</td>
                          <td className="px-3 py-2 text-gray-700 font-mono text-[10px]">{reportData.directorLicense}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                
                {/* Summary Footer */}
                <div className="bg-gray-100 border-t-2 border-gray-300 px-4 py-3">
                  <p className="text-xs text-gray-700">
                    <strong>Total Cases:</strong> {filteredCases.length} | 
                    <strong className="ml-3">At-Need:</strong> {filteredCases.filter(c => c.caseType === 'At-Need').length} | 
                    <strong className="ml-3">Pre-Need:</strong> {filteredCases.filter(c => c.caseType === 'Pre-Need').length}
                  </p>
                </div>
              </div>
            ) : (
              /* Card View */
              <div className="space-y-6">{filteredCases.map((caseData) => {
                const reportData = getCaseReportData(caseData.caseId, caseData.deceasedName, caseData.dateCreated);
                
                return (
                  <div key={caseData.caseId} className="bg-white border border-gray-200 overflow-hidden">
                    {/* Case Header */}
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-gray-900">Case #{caseData.caseNumber}</h3>
                          <p className="text-sm text-gray-600 mt-0.5">
                            {caseData.caseType} • {caseData.serviceType}
                          </p>
                        </div>
                        <div className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs border border-emerald-200">
                          Complete
                        </div>
                      </div>
                    </div>

                    {/* Case Details Grid */}
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Deceased Information */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-gray-900 mb-3">
                            <User className="w-4 h-4 text-gray-600" />
                            <span className="text-sm">Deceased Information</span>
                          </div>
                          
                          <div>
                            <label className="text-xs text-gray-600 block mb-1">Name of Deceased</label>
                            <p className="text-sm text-gray-900">{caseData.deceasedName}</p>
                          </div>
                          
                          <div>
                            <label className="text-xs text-gray-600 block mb-1">Date Received</label>
                            <p className="text-sm text-gray-900">{reportData.dateReceived}</p>
                          </div>
                          
                          <div>
                            <label className="text-xs text-gray-600 block mb-1">Date of Death</label>
                            <p className="text-sm text-gray-900">{reportData.dateOfDeath}</p>
                          </div>
                        </div>

                        {/* Service Details */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-gray-900 mb-3">
                            <Briefcase className="w-4 h-4 text-gray-600" />
                            <span className="text-sm">Service Details</span>
                          </div>
                          
                          <div>
                            <label className="text-xs text-gray-600 block mb-1">Name of Embalmer</label>
                            <p className="text-sm text-gray-900">{reportData.embalmerName}</p>
                            <p className="text-xs text-gray-500 mt-0.5">License: {reportData.embalmerLicense}</p>
                          </div>
                          
                          <div>
                            <label className="text-xs text-gray-600 block mb-1">Method of Disposal</label>
                            <p className="text-sm text-gray-900">{reportData.methodOfDisposal}</p>
                          </div>
                        </div>

                        {/* Location & Authorization */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-gray-900 mb-3">
                            <MapPin className="w-4 h-4 text-gray-600" />
                            <span className="text-sm">Location & Authorization</span>
                          </div>
                          
                          <div>
                            <label className="text-xs text-gray-600 block mb-1">County of Death</label>
                            <p className="text-sm text-gray-900">{reportData.countyOfDeath}</p>
                          </div>
                          
                          <div>
                            <label className="text-xs text-gray-600 block mb-1">Burial Transit Number</label>
                            <p className="text-sm text-gray-900 font-mono">{reportData.burialTransitNumber}</p>
                          </div>
                          
                          <div>
                            <label className="text-xs text-gray-600 block mb-1">Director in Charge</label>
                            <p className="text-sm text-gray-900">{reportData.directorInCharge}</p>
                            <p className="text-xs text-gray-500 mt-0.5">License: {reportData.directorLicense}</p>
                          </div>
                        </div>
                      </div>

                      {/* Signature Section */}
                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-gray-900 mb-4">
                          <FileSignature className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">Director Authorization</span>
                        </div>
                        
                        <div className="bg-gray-50 border border-gray-200 p-4">
                          <label className="text-xs text-gray-600 block mb-3">Signature of Director in Charge</label>
                          <div className="bg-white border-2 border-dashed border-gray-300 p-4 flex items-center justify-center min-h-[80px]">
                            <div className="text-center">
                              <p className="text-2xl text-gray-800 italic">
                                {reportData.directorSignature}
                              </p>
                              <p className="text-xs text-gray-500 mt-2">Digitally signed on {reportData.signatureDate}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}</div>
            )}
          </div>
        </div>
      </div>

      {/* Send Email Modal */}
      {showSendModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white max-w-md w-full p-6">
            <h3 className="text-gray-900 mb-4">Send Reports</h3>
            <p className="text-sm text-gray-600 mb-6">
              Enter the email address where you'd like to send these case reports.
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
                Send Reports
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}