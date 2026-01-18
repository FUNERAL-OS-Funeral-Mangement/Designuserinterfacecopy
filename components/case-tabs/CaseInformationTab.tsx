import { User, Phone, MapPin, Calendar, Edit, FileText, Briefcase, Shield } from 'lucide-react';
import { useState } from 'react';
import { useCaseStore } from '../../store/useCaseStore';

interface CaseInformationTabProps {
  caseId: string;
}

export function CaseInformationTab({ caseId }: CaseInformationTabProps) {
  const caseData = useCaseStore((state) => state.getCaseById(caseId));
  const updateRegulatoryInfo = useCaseStore((state) => state.updateRegulatoryInfo);
  
  const [isEditingRegulatory, setIsEditingRegulatory] = useState(false);
  const [burialTransitNumber, setBurialTransitNumber] = useState(
    caseData?.regulatoryInfo?.burialTransitNumber || ''
  );
  const [embalmerName, setEmbalmerName] = useState(
    caseData?.regulatoryInfo?.embalmerName || ''
  );
  const [embalmerLicense, setEmbalmerLicense] = useState(
    caseData?.regulatoryInfo?.embalmerLicense || ''
  );
  const [methodOfDisposal, setMethodOfDisposal] = useState(
    caseData?.regulatoryInfo?.methodOfDisposal || ''
  );
  const [countyOfDeath, setCountyOfDeath] = useState(
    caseData?.regulatoryInfo?.countyOfDeath || ''
  );
  const [directorInCharge, setDirectorInCharge] = useState(
    caseData?.regulatoryInfo?.directorInCharge || ''
  );
  const [directorLicense, setDirectorLicense] = useState(
    caseData?.regulatoryInfo?.directorLicense || ''
  );

  const caseInfo = [
    { label: 'Full Name', value: 'Zachary Binx', icon: User },
    { label: 'Date of Birth', value: 'March 15, 1945', icon: Calendar },
    { label: 'Date of Death', value: 'October 20, 2023', icon: Calendar },
    { label: 'Place of Death', value: 'Memorial Hospital, Chicago', icon: MapPin },
    { label: 'Weight', value: '165 lbs', icon: User },
    { label: 'Height', value: '5\'10"', icon: User },
  ];

  const nokInfo = [
    { label: 'Next of Kin', value: 'Sarah Binx', icon: User },
    { label: 'Relationship', value: 'Spouse', icon: User },
    { label: 'Phone', value: '(312) 555-0123', icon: Phone },
    { label: 'Email', value: 'sarah.binx@email.com', icon: Phone },
    { label: 'Address', value: '742 Evergreen Terrace, Chicago, IL 60614', icon: MapPin },
  ];

  const handleSaveRegulatory = () => {
    updateRegulatoryInfo(caseId, {
      burialTransitNumber,
      embalmerName,
      embalmerLicense,
      methodOfDisposal,
      countyOfDeath,
      directorInCharge,
      directorLicense,
    });
    setIsEditingRegulatory(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-gray-900">Case Information</h2>
        <button className="px-4 py-2.5 border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
          <Edit className="w-4 h-4" />
          Edit Case Info
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deceased Information */}
        <div className="bg-white border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-gray-900">Deceased Information</h3>
          </div>
          <div className="p-6 space-y-5">
            {caseInfo.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                  <p className="text-gray-900">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next of Kin Information */}
        <div className="bg-white border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-gray-900">Next of Kin</h3>
          </div>
          <div className="p-6 space-y-5">
            {nokInfo.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                  <p className="text-gray-900 break-words">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regulatory Information */}
      <div className="bg-white border border-gray-200 mt-6">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-gray-900">Regulatory Information</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <p className="text-sm text-gray-500 mb-1">Burial Transit Number</p>
                {isEditingRegulatory ? (
                  <input
                    type="text"
                    value={burialTransitNumber}
                    onChange={(e) => setBurialTransitNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{burialTransitNumber}</p>
                )}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <p className="text-sm text-gray-500 mb-1">Embalmer Name</p>
                {isEditingRegulatory ? (
                  <input
                    type="text"
                    value={embalmerName}
                    onChange={(e) => setEmbalmerName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{embalmerName}</p>
                )}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <p className="text-sm text-gray-500 mb-1">Embalmer License</p>
                {isEditingRegulatory ? (
                  <input
                    type="text"
                    value={embalmerLicense}
                    onChange={(e) => setEmbalmerLicense(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{embalmerLicense}</p>
                )}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <p className="text-sm text-gray-500 mb-1">Method of Disposal</p>
                {isEditingRegulatory ? (
                  <input
                    type="text"
                    value={methodOfDisposal}
                    onChange={(e) => setMethodOfDisposal(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{methodOfDisposal}</p>
                )}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <p className="text-sm text-gray-500 mb-1">County of Death</p>
                {isEditingRegulatory ? (
                  <input
                    type="text"
                    value={countyOfDeath}
                    onChange={(e) => setCountyOfDeath(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{countyOfDeath}</p>
                )}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <p className="text-sm text-gray-500 mb-1">Director in Charge</p>
                {isEditingRegulatory ? (
                  <input
                    type="text"
                    value={directorInCharge}
                    onChange={(e) => setDirectorInCharge(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{directorInCharge}</p>
                )}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <p className="text-sm text-gray-500 mb-1">Director License</p>
                {isEditingRegulatory ? (
                  <input
                    type="text"
                    value={directorLicense}
                    onChange={(e) => setDirectorLicense(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{directorLicense}</p>
                )}
              </div>
            </div>
          </div>
          {isEditingRegulatory ? (
            <button
              className="px-4 py-2.5 bg-blue-500 text-white hover:bg-blue-600 transition-colors mt-4"
              onClick={handleSaveRegulatory}
            >
              Save
            </button>
          ) : (
            <button
              className="px-4 py-2.5 border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors mt-4"
              onClick={() => setIsEditingRegulatory(true)}
            >
              Edit Regulatory Info
            </button>
          )}
        </div>
      </div>

      {/* Additional Notes */}
      <div className="bg-white border border-gray-200 mt-6">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-gray-900">Additional Notes</h3>
        </div>
        <div className="p-6">
          <p className="text-gray-600 leading-relaxed">
            No additional notes recorded for this case.
          </p>
        </div>
      </div>
    </div>
  );
}