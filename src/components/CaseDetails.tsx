import { ArrowLeft, MoreVertical, FileText, ChevronRight, Save } from 'lucide-react';
import { useState } from 'react';
import { useCaseStore } from '../store/useCaseStore';
import { useStaffStore } from '../store/useStaffStore';

interface CaseDetailsProps {
  onBack: () => void;
  onSendEFax: () => void;
  caseId: string;
  formData: {
    callerName: string;
    callerPhone: string;
    deceasedName: string;
    dateOfBirth: string;
    dateOfDeath: string;
    timeOfDeath: string;
    locationOfDeath: string;
    address: string;
    nextOfKinName: string;
    nextOfKinPhone: string;
    weight: string;
    readyTime: string;
    isVerbalRelease: boolean;
    hasStairs: string;
    isFamilyPresent: string;
  };
  onNavigateToCases?: () => void;
}

export function CaseDetails({ onBack, onSendEFax, caseId, formData, onNavigateToCases }: CaseDetailsProps) {
  const caseData = useCaseStore((state) => state.getCaseById(caseId));
  const updateFirstCallData = useCaseStore((state) => state.updateFirstCallData);
  const getCaseById = useCaseStore((state) => state.getCaseById);
  
  const [notifyRemovalTeam, setNotifyRemovalTeam] = useState(false);
  const [selectedRemovalTeam, setSelectedRemovalTeam] = useState('');

  // Get removal teams from global store
  const getRemovalTeams = useStaffStore((state) => state.getRemovalTeams);
  const removalTeams = getRemovalTeams();
  
  const handleSaveAndStartCase = () => {
    // Update the case with first call data and mark it as having removal release
    const currentCase = getCaseById(caseId);
    if (!currentCase) return;
    
    // Save first call data
    updateFirstCallData(caseId, {
      callerName: formData.callerName,
      callerPhone: formData.callerPhone,
      deceasedName: formData.deceasedName,
      dateOfBirth: formData.dateOfBirth,
      dateOfDeath: formData.dateOfDeath,
      timeOfDeath: formData.timeOfDeath,
      locationOfDeath: formData.locationOfDeath,
      address: formData.address,
      nextOfKinName: formData.nextOfKinName,
      nextOfKinPhone: formData.nextOfKinPhone,
      weight: formData.weight,
      readyTime: formData.readyTime,
      hasStairs: formData.hasStairs,
      isFamilyPresent: formData.isFamilyPresent,
      isVerbalRelease: formData.isVerbalRelease,
    });
    
    // Mark case as having removal release
    useCaseStore.setState((state) => {
      const newCases = new Map(state.cases);
      const updatedCase = newCases.get(caseId);
      if (updatedCase) {
        newCases.set(caseId, { ...updatedCase, hasRemovalRelease: true });
      }
      return { cases: newCases };
    });
    
    // Navigate to cases
    if (onNavigateToCases) {
      onNavigateToCases();
    }
  };
  
  const infoItems = [
    { label: 'Name of caller', value: formData.callerName || 'Not Specified' },
    { label: "Caller's phone", value: formData.callerPhone || 'Not Specified' },
    { label: 'Name of deceased', value: formData.deceasedName || 'Not Specified' },
    { label: 'Date of Birth', value: formData.dateOfBirth || 'Not Specified' },
    { label: 'Date of Death', value: formData.dateOfDeath || 'Not Specified' },
    { label: 'Time of Death', value: formData.timeOfDeath || 'Not Specified' },
    { label: 'Location of death', value: formData.locationOfDeath || 'Not Specified' },
    { label: 'Address', value: formData.address || 'Not Specified' },
    { label: 'Next of Kin', value: formData.nextOfKinName || 'Not Specified' },
    { label: 'Next of Kin phone', value: formData.nextOfKinPhone || 'Not Specified' },
    { label: 'Weight of deceased', value: formData.weight ? `${formData.weight}` : 'Not Specified' },
    { label: 'Ready for pick up?', value: formData.readyTime || 'Not Specified' },
    { label: 'Has stairs?', value: formData.hasStairs || 'Not Specified' },
    { label: 'Is family present?', value: formData.isFamilyPresent || 'Not Specified' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h2 className="text-gray-900">Case Details</h2>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <MoreVertical className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Removal Team Notification - Above Everything */}
        <div className="bg-white border border-gray-200 p-6">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={notifyRemovalTeam}
              onChange={(e) => setNotifyRemovalTeam(e.target.checked)}
              className="mt-1 w-4 h-4 border border-gray-300 text-gray-900 focus:ring-0 focus:ring-offset-0"
            />
            <div className="flex-1">
              <p className="text-gray-900 mb-1">Notify removal team</p>
              <p className="text-sm text-gray-600">
                The removal team will be automatically notified once the e-signed release form is received from the family
              </p>
            </div>
          </label>

          {notifyRemovalTeam && (
            <div className="mt-4 pl-7">
              <label className="block text-gray-700 mb-2">
                Select removal team
              </label>
              <select
                value={selectedRemovalTeam}
                onChange={(e) => setSelectedRemovalTeam(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              >
                <option value="">Select a team</option>
                {removalTeams.map((team) => {
                  const displayName =
                    'name' in team
                      ? `${team.name} (Staff)`
                      : `${team.companyName} - ${team.contactPerson} (Vendor)`;

                  return (
                    <option key={team.id} value={team.id}>
                      {displayName}
                    </option>
                  );
                })}
              </select>
              {selectedRemovalTeam && (
                <p className="text-xs text-gray-500 mt-2">
                  Selected team will be notified after e-signature is received
                </p>
              )}
            </div>
          )}
        </div>

        {/* First Call Information and Documents - Side by Side on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Call Information */}
          <div className="bg-gray-50 border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-900">First Call Information</h3>
              <p className="text-gray-600 text-sm mt-1">Summary of the initial report.</p>
            </div>

            <div className="p-4 space-y-3">
              {infoItems.map((item, index) => (
                <div key={index} className="flex justify-between items-start text-sm gap-4">
                  <span className="text-gray-600 flex-shrink-0">{item.label}</span>
                  <span className={`text-right ${item.value === 'Not Specified' ? 'text-blue-600' : 'text-gray-900'}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="bg-gray-50 border border-gray-200 overflow-hidden h-fit">
            <div className="px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-900">Documents</h3>
            </div>

            <button
              onClick={onSendEFax}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 border border-blue-200 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="text-gray-900">Release form</p>
                  <p className="text-blue-600 text-sm">Attached</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Save and Start Case */}
        <button
          onClick={handleSaveAndStartCase}
          className="w-full px-6 py-4 flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 transition-colors gap-2"
        >
          <Save className="w-5 h-5" />
          Save and Start Case
        </button>
      </div>
    </div>
  );
}
