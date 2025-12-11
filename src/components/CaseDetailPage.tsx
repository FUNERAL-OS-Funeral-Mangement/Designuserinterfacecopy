import { useState } from 'react';
import { ArrowLeft, User, FileText, DollarSign, Image as ImageIcon, Info, MapPin, Landmark, ShoppingBag, AlertCircle, Users, Camera, BarChart3, Edit2, Check, X } from 'lucide-react';
import { DocumentsTab } from './case-tabs/DocumentsTab';
import { PaymentsTab } from './case-tabs/PaymentsTab';
import { MemorialsTab } from './case-tabs/MemorialsTab';
import { CaseInformationTab } from './case-tabs/CaseInformationTab';
import { ServiceInformationTab } from './case-tabs/ServiceInformationTab';
import { ReportsTab } from './case-tabs/ReportsTab';
import { OrdersTab } from './case-tabs/OrdersTab';
import { MissingItemsTab } from './case-tabs/MissingItemsTab';
import { PrepRoomTab } from './case-tabs/PrepRoomTab';
import { useCaseStore } from '../store/useCaseStore';

interface CaseDetailPageProps {
  caseId: string;
  caseNumber: string | number;
  deceasedName: string;
  caseType: 'At-Need' | 'Pre-Need';
  dateCreated: string;
  photoUrl?: string;
  onBack: () => void;
}

type TabType = 
  | 'documents' 
  | 'payments' 
  | 'memorials' 
  | 'case-info' 
  | 'service-info' 
  | 'orders' 
  | 'missing-items' 
  | 'prep-room'
  | 'reports';

interface TabItem {
  id: TabType;
  label: string;
  icon: any;
  completed: boolean;
}

export function CaseDetailPage({ 
  caseId,
  caseNumber, 
  deceasedName, 
  caseType, 
  dateCreated, 
  photoUrl: initialPhotoUrl,
  onBack 
}: CaseDetailPageProps) {
  const [activeTab, setActiveTab] = useState<TabType>('documents');
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(initialPhotoUrl);
  const [isHovering, setIsHovering] = useState(false);
  const [isEditingCaseNumber, setIsEditingCaseNumber] = useState(false);
  const [editedCaseNumber, setEditedCaseNumber] = useState(String(caseNumber));
  const [displayCaseNumber, setDisplayCaseNumber] = useState(String(caseNumber));
  
  const updateCaseNumber = useCaseStore((state) => state.updateCaseNumber);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoClick = () => {
    document.getElementById('case-photo-upload')?.click();
  };
  
  const handleSaveCaseNumber = () => {
    if (editedCaseNumber.trim()) {
      updateCaseNumber(caseId, editedCaseNumber.trim());
      setDisplayCaseNumber(editedCaseNumber.trim());
      setIsEditingCaseNumber(false);
    }
  };
  
  const handleCancelEdit = () => {
    setEditedCaseNumber(displayCaseNumber);
    setIsEditingCaseNumber(false);
  };

  const tabs: TabItem[] = [
    { id: 'documents' as TabType, label: 'Documents', icon: FileText, completed: true },
    { id: 'payments' as TabType, label: 'Payments', icon: DollarSign, completed: true },
    { id: 'memorials' as TabType, label: 'Memorials', icon: ImageIcon, completed: false },
    { id: 'case-info' as TabType, label: 'Case Information', icon: Info, completed: true },
    { id: 'service-info' as TabType, label: 'Service Information', icon: MapPin, completed: true },
    { id: 'orders' as TabType, label: 'Orders & Add-Ons', icon: ShoppingBag, completed: true },
    { id: 'missing-items' as TabType, label: 'Missing Items', icon: AlertCircle, completed: false },
    { id: 'prep-room' as TabType, label: 'Prep Room Team', icon: Users, completed: true },
    { id: 'reports' as TabType, label: 'Reports', icon: BarChart3, completed: true },
  ];

  const completedCount = tabs.filter(t => t.completed).length;
  const totalCount = tabs.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back to Cases</span>
            </button>
            
            {/* Editable Case Number */}
            <div className="flex items-center gap-2">
              {isEditingCaseNumber ? (
                <>
                  <input
                    type="text"
                    value={editedCaseNumber}
                    onChange={(e) => setEditedCaseNumber(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveCaseNumber();
                      if (e.key === 'Escape') handleCancelEdit();
                    }}
                    className="px-2 py-1 border border-blue-400 text-gray-900 focus:outline-none focus:border-blue-500 text-sm w-48"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveCaseNumber}
                    className="p-1.5 bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="p-1.5 bg-gray-300 hover:bg-gray-400 text-gray-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <span className="text-gray-900">Case #{displayCaseNumber}</span>
                  <button
                    onClick={() => setIsEditingCaseNumber(true)}
                    className="p-1.5 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
                    title="Edit case number"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-200 overflow-hidden">
              {/* Profile Section */}
              <div className="p-6 text-center border-b border-gray-100">
                <input
                  type="file"
                  id="case-photo-upload"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <div 
                  className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 border-4 border-white shadow-lg overflow-hidden relative cursor-pointer group"
                  onClick={handlePhotoClick}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {photoUrl ? (
                    <img src={photoUrl} alt={deceasedName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h2 className="text-gray-900 mb-1">Hi, {deceasedName.split(' ')[0]}</h2>
                <p className="text-sm text-gray-500 mb-3">Case #{caseNumber} • {caseType}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 text-sm border border-purple-200">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Case {completionPercentage}% Complete
                </div>
              </div>

              {/* Progress Sections */}
              <div className="p-4 space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between p-3 transition-all ${
                      activeTab === tab.id
                        ? 'bg-purple-50 border border-purple-200 text-purple-900'
                        : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-purple-600' : 'text-gray-500'}`} />
                      <div className="text-left">
                        <p className="text-sm">{tab.label}</p>
                        {tab.completed && (
                          <p className="text-xs text-emerald-600">Completed</p>
                        )}
                      </div>
                    </div>
                    {tab.completed && (
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Overall Progress Card */}
              <div className="m-4 p-4 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-purple-900">Overall Progress</p>
                  <p className="text-sm text-purple-700">{completedCount}/{totalCount}</p>
                </div>
                <div className="w-full bg-white h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-9">
            <div className="bg-white border border-gray-200 min-h-[600px]">
              <div className="p-6 sm:p-8">
                {activeTab === 'documents' && <DocumentsTab caseId={caseId} />}
                {activeTab === 'payments' && <PaymentsTab />}
                {activeTab === 'memorials' && <MemorialsTab caseId={caseId} />}
                {activeTab === 'case-info' && <CaseInformationTab caseId={caseId} />}
                {activeTab === 'service-info' && <ServiceInformationTab />}
                {activeTab === 'orders' && <OrdersTab caseId={caseId} />}
                {activeTab === 'missing-items' && <MissingItemsTab />}
                {activeTab === 'prep-room' && <PrepRoomTab />}
                {activeTab === 'reports' && (
                  <ReportsTab 
                    caseId={caseId} 
                    caseNumber={caseNumber} 
                    deceasedName={deceasedName} 
                    dateCreated={dateCreated} 
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}