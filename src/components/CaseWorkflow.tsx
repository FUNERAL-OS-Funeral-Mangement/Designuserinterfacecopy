import { useState } from 'react';
import { Check } from 'lucide-react';
import { VitalStatistics } from './VitalStatistics';
import { CatalogSelection } from './CatalogSelection';
import { ItemsChosen } from './ItemsChosen';
import { ReviewApprove } from './ReviewApprove';

interface CaseWorkflowProps {
  caseType: 'preneed' | 'at-need';
  onComplete: (caseData: any) => void;
}

export function CaseWorkflow({ caseType, onComplete }: CaseWorkflowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [caseData, setCaseData] = useState({
    vitalStats: {},
    catalogItems: [],
    documents: [],
    financials: {},
  });

  const steps = [
    { number: 1, title: 'Vital Statistics', component: VitalStatistics },
    { number: 2, title: 'Catalog Selection', component: CatalogSelection },
    { number: 3, title: 'Items Chosen', component: ItemsChosen },
    { number: 4, title: 'Review & Approve', component: ReviewApprove },
  ];

  const handleStepComplete = (stepData: any) => {
    const updatedData = { ...caseData, ...stepData };
    setCaseData(updatedData);

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(updatedData);
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    currentStep > step.number
                      ? 'bg-teal-600 text-white'
                      : currentStep === step.number
                      ? 'bg-teal-600 text-white ring-4 ring-teal-100'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {currentStep > step.number ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>
                <span
                  className={`mt-2 text-xs sm:text-sm text-center ${
                    currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-all ${
                    currentStep > step.number ? 'bg-teal-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Step Content */}
      <CurrentStepComponent
        caseType={caseType}
        caseData={caseData}
        onComplete={handleStepComplete}
        onBack={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
      />
    </div>
  );
}
