import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Check, FileText, MapPin, Clock, QrCode, FolderPlus, Navigation as NavigationIcon } from 'lucide-react';

export function BodyRemovalWorkflow() {
  const { caseData, updateCaseData, completeStep } = useStore();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: 'Release Form', icon: FileText },
    { title: 'Team In Route', icon: NavigationIcon },
    { title: 'Arrival & Intake', icon: MapPin },
    { title: 'Create Case File', icon: FolderPlus },
  ];

  const handleConfirmRelease = () => {
    if (caseData.deceasedName && caseData.locationOfPickup && caseData.timeOfDeath) {
      completeStep(0);
      setActiveStep(1);
    }
  };

  const handleMarkEnRoute = () => {
    updateCaseData({ teamStatus: 'en-route' });
  };

  const handleMarkArrived = () => {
    updateCaseData({ teamStatus: 'arrived' });
    completeStep(1);
    setActiveStep(2);
  };

  const handleLogBody = () => {
    updateCaseData({ bodyLoggedIn: true });
    completeStep(2);
    setActiveStep(3);
  };

  const handleCreateCaseFile = () => {
    updateCaseData({ caseFileCreated: true });
    completeStep(3);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-teal-700 mb-2">Body Removal Workflow</h1>
        <p className="text-gray-600">Case ID: {caseData.caseId}</p>
      </div>

      {/* Desktop: Horizontal Stepper */}
      <div className="hidden lg:block mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = caseData.currentStep > index + 1;
            const isActive = activeStep === index;
            
            return (
              <div key={index} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-teal-600 text-white'
                        : isActive
                        ? 'bg-teal-100 text-teal-700 border-2 border-teal-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <p className={`mt-2 text-center ${isActive ? 'text-teal-700' : 'text-gray-600'}`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 ${isCompleted ? 'bg-teal-600' : 'bg-gray-200'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: Vertical Stepper */}
      <div className="lg:hidden mb-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = caseData.currentStep > index + 1;
          const isActive = activeStep === index;
          
          return (
            <div key={index} className="flex gap-4 mb-6">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'bg-teal-600 text-white'
                      : isActive
                      ? 'bg-teal-100 text-teal-700 border-2 border-teal-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-1 flex-1 my-2 min-h-[40px] ${isCompleted ? 'bg-teal-600' : 'bg-gray-200'}`} />
                )}
              </div>
              <div className="flex-1">
                <p className={isActive ? 'text-teal-700' : 'text-gray-600'}>{step.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Step 1: Release Form */}
        <div className={`bg-white rounded-xl p-6 shadow-sm border-2 transition-all ${
          activeStep === 0 ? 'border-teal-500' : 'border-gray-200'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-teal-700" />
            </div>
            <h3 className="text-teal-700">Release Form Confirmation</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Deceased Name</label>
              <input
                type="text"
                value={caseData.deceasedName}
                onChange={(e) => updateCaseData({ deceasedName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter full name"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Location of Pick-Up</label>
              <input
                type="text"
                value={caseData.locationOfPickup}
                onChange={(e) => updateCaseData({ locationOfPickup: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Hospital, home address, etc."
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Time of Death</label>
              <input
                type="datetime-local"
                value={caseData.timeOfDeath}
                onChange={(e) => updateCaseData({ timeOfDeath: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-gray-600" />
                <p className="text-gray-700">Release Form PDF</p>
              </div>
              <div className="bg-white h-32 rounded border border-gray-300 flex items-center justify-center">
                <p className="text-gray-400">PDF Preview</p>
              </div>
            </div>
            
            <button
              onClick={handleConfirmRelease}
              disabled={caseData.currentStep > 1}
              className="w-full py-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {caseData.currentStep > 1 ? (
                <>
                  <Check className="w-5 h-5" />
                  Facility Release Confirmed
                </>
              ) : (
                'Confirm Facility Release'
              )}
            </button>
          </div>
        </div>

        {/* Step 2: Team In Route */}
        <div className={`bg-white rounded-xl p-6 shadow-sm border-2 transition-all ${
          activeStep === 1 ? 'border-teal-500' : 'border-gray-200'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <NavigationIcon className="w-5 h-5 text-teal-700" />
            </div>
            <h3 className="text-teal-700">Removal Team In Route</h3>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center border border-gray-300">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-teal-600 mx-auto mb-2" />
                <p className="text-gray-600">Live GPS Map</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  caseData.teamStatus === 'assigned' ? 'bg-teal-600' : 'bg-gray-300'
                }`} />
                <p className="text-gray-700">Team Assigned</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  caseData.teamStatus === 'en-route' || caseData.teamStatus === 'arrived' ? 'bg-teal-600' : 'bg-gray-300'
                }`} />
                <p className="text-gray-700">En Route to Facility</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  caseData.teamStatus === 'arrived' ? 'bg-teal-600' : 'bg-gray-300'
                }`} />
                <p className="text-gray-700">Arrived at Facility</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600 bg-blue-50 p-3 rounded-lg">
              <Clock className="w-5 h-5" />
              <span>ETA: 15 minutes</span>
            </div>
            
            {caseData.teamStatus === 'assigned' && (
              <button
                onClick={handleMarkEnRoute}
                className="w-full py-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Mark En Route
              </button>
            )}
            
            {caseData.teamStatus === 'en-route' && (
              <button
                onClick={handleMarkArrived}
                className="w-full py-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Mark Arrived at Facility
              </button>
            )}
            
            {caseData.teamStatus === 'arrived' && caseData.currentStep > 2 && (
              <div className="flex items-center justify-center gap-2 text-teal-700 py-4">
                <Check className="w-5 h-5" />
                <span>Team Arrived</span>
              </div>
            )}
          </div>
        </div>

        {/* Step 3: Arrival & Intake */}
        <div className={`bg-white rounded-xl p-6 shadow-sm border-2 transition-all ${
          activeStep === 2 ? 'border-teal-500' : 'border-gray-200'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-teal-700" />
            </div>
            <h3 className="text-teal-700">Body Logged In</h3>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-300 text-center">
              <QrCode className="w-16 h-16 text-teal-600 mx-auto mb-3" />
              <p className="text-gray-700 mb-2">Scan QR to Log Arrival</p>
              <p className="text-gray-500 text-sm">Or use manual confirmation below</p>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Notes for Personal Effects</label>
              <textarea
                value={caseData.notes}
                onChange={(e) => updateCaseData({ notes: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                rows={4}
                placeholder="Document any personal effects, belongings, or special notes..."
              />
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-gray-600 text-sm">
                Auto timestamp will be recorded upon confirmation
              </p>
            </div>
            
            <button
              onClick={handleLogBody}
              disabled={caseData.bodyLoggedIn}
              className="w-full py-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {caseData.bodyLoggedIn ? (
                <>
                  <Check className="w-5 h-5" />
                  Body Logged In
                </>
              ) : (
                'Confirm Body Logged In'
              )}
            </button>
          </div>
        </div>

        {/* Step 4: Create Case File */}
        <div className={`bg-white rounded-xl p-6 shadow-sm border-2 transition-all ${
          activeStep === 3 ? 'border-teal-500' : 'border-gray-200'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <FolderPlus className="w-5 h-5 text-teal-700" />
            </div>
            <h3 className="text-teal-700">Case File Creation</h3>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-lg p-6 border border-teal-200">
              <p className="text-gray-600 mb-2">Auto-Generated Case Number</p>
              <p className="text-teal-700">{caseData.caseId}</p>
            </div>
            
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="text-gray-600">Deceased:</span>
                <span className="text-gray-900">{caseData.deceasedName || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="text-gray-900">{caseData.locationOfPickup || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time of Death:</span>
                <span className="text-gray-900">
                  {caseData.timeOfDeath ? new Date(caseData.timeOfDeath).toLocaleString() : 'N/A'}
                </span>
              </div>
            </div>
            
            {!caseData.caseFileCreated ? (
              <button
                onClick={handleCreateCaseFile}
                disabled={!caseData.bodyLoggedIn}
                className="w-full py-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Create Case File
              </button>
            ) : (
              <div className="bg-teal-50 border-2 border-teal-600 rounded-lg p-6 text-center">
                <Check className="w-12 h-12 text-teal-600 mx-auto mb-3" />
                <p className="text-teal-700">Case File Created Successfully</p>
                <p className="text-gray-600 text-sm mt-2">
                  Case {caseData.caseId} is now active
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
