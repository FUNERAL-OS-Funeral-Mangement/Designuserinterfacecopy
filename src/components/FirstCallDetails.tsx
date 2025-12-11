import { useState } from 'react';
import { ArrowLeft, ChevronRight, ChevronLeft, MessageSquare } from 'lucide-react';
import { useStore } from '../store/useStore';

interface FirstCallDetailsProps {
  onBack: () => void;
  onCreateCase: (data: {
    callerName: string;
    callerPhone: string;
    deceasedName: string;
    dateOfDeath: string;
    timeOfDeath: string;
    locationOfDeath: string;
    address: string;
    nextOfKinName: string;
    nextOfKinPhone: string;
    weight: string;
    readyTime: string;
  }) => void;
}

export function FirstCallDetails({ onBack, onCreateCase }: FirstCallDetailsProps) {
  const { caseData, updateCaseData } = useStore();
  
  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  // Form state
  const [callerName, setCallerName] = useState('');
  const [callerPhone, setCallerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [nextOfKinName, setNextOfKinName] = useState('');
  const [nextOfKinPhone, setNextOfKinPhone] = useState('');
  const [weight, setWeight] = useState('');
  const [readyTime, setReadyTime] = useState('');
  const [notifyRemovalTeam, setNotifyRemovalTeam] = useState(false);

  const handleSubmit = () => {
    const formattedData = {
      callerName,
      callerPhone,
      deceasedName: caseData.deceasedName || '',
      dateOfDeath: caseData.timeOfDeath?.split('T')[0] || '',
      timeOfDeath: caseData.timeOfDeath?.split('T')[1]?.slice(0, 5) || '',
      locationOfDeath: caseData.locationOfPickup || '',
      address,
      nextOfKinName,
      nextOfKinPhone,
      weight,
      readyTime,
    };
    onCreateCase(formattedData);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Basic information';
      case 2:
        return 'Contact details';
      case 3:
        return 'Body removal';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6 sm:mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <div className="mb-6 sm:mb-8">
            <h1 className="text-gray-900 mb-1">First call</h1>
            <p className="text-gray-600">{getStepTitle()}</p>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2 sm:gap-3">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex-1 h-1 ${
                  step <= currentStep ? 'bg-gray-900' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2 sm:mt-3">Step {currentStep} of {totalSteps}</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-2xl">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-5 sm:space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Name of caller</label>
              <input
                type="text"
                value={callerName}
                onChange={(e) => setCallerName(e.target.value)}
                placeholder="Mary Foster"
                className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Caller's phone number</label>
              <input
                type="tel"
                value={callerPhone}
                onChange={(e) => setCallerPhone(e.target.value)}
                placeholder="(555) 000-0000"
                className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Name of deceased</label>
              <input
                type="text"
                value={caseData.deceasedName}
                onChange={(e) => updateCaseData({ deceasedName: e.target.value })}
                placeholder="Jane Doe"
                className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Date of death</label>
                <input
                  type="date"
                  value={caseData.timeOfDeath ? caseData.timeOfDeath.split('T')[0] : ''}
                  onChange={(e) => {
                    const existingTime = caseData.timeOfDeath?.split('T')[1] || '00:00';
                    updateCaseData({ timeOfDeath: `${e.target.value}T${existingTime}` });
                  }}
                  className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Time of death</label>
                <input
                  type="time"
                  value={caseData.timeOfDeath ? caseData.timeOfDeath.split('T')[1]?.slice(0, 5) : ''}
                  onChange={(e) => {
                    const existingDate = caseData.timeOfDeath?.split('T')[0] || new Date().toISOString().split('T')[0];
                    updateCaseData({ timeOfDeath: `${existingDate}T${e.target.value}` });
                  }}
                  className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Location of death</label>
              <input
                type="text"
                value={caseData.locationOfPickup}
                onChange={(e) => updateCaseData({ locationOfPickup: e.target.value })}
                placeholder="North Shore Hospital"
                className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="1232 NE 18th Place, Miami FL"
                className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
          </div>
        )}

        {/* Step 2: Contact Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Next of kin</label>
              <input
                type="text"
                value={nextOfKinName}
                onChange={(e) => setNextOfKinName(e.target.value)}
                placeholder="Mary Foster"
                className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Next of kin phone number</label>
              <input
                type="tel"
                value={nextOfKinPhone}
                onChange={(e) => setNextOfKinPhone(e.target.value)}
                placeholder="(555) 000-0000"
                className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            <div className="pt-6 border-t border-gray-200">
              <div className="bg-gray-50 border border-gray-200 p-6">
                <p className="text-sm text-gray-600 mb-4">
                  A release form will be automatically sent to the next of kin via text message for e-signature.
                </p>
                <p className="text-sm text-gray-500">
                  The form will be sent after case creation is complete.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Body Removal */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Weight (lbs)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="180"
                  className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Ready for pickup</label>
                <input
                  type="text"
                  value={readyTime}
                  onChange={(e) => setReadyTime(e.target.value)}
                  placeholder="30 minutes"
                  className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={notifyRemovalTeam}
                  onChange={(e) => setNotifyRemovalTeam(e.target.checked)}
                  className="mt-1 w-4 h-4 border border-gray-300 text-gray-900 focus:ring-0 focus:ring-offset-0"
                />
                <div>
                  <p className="text-gray-900 mb-1">Notify removal team</p>
                  <p className="text-sm text-gray-600">
                    The removal team will be automatically notified once the e-signed release form is received from the family
                  </p>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center gap-3 mt-12 pt-12 border-t border-gray-200">
          {currentStep > 1 && (
            <button
              onClick={handlePrevious}
              className="px-4 py-2.5 border border-gray-200 text-gray-700 hover:border-gray-300 transition-colors flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
          )}
          
          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              className="ml-auto px-6 py-2.5 bg-gray-900 text-white hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="ml-auto px-6 py-2.5 bg-gray-900 text-white hover:bg-gray-800 transition-colors"
            >
              Send Release Form
            </button>
          )}
        </div>
      </div>
    </div>
  );
}