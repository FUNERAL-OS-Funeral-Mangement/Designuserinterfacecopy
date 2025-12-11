import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { FirstCallDetails } from './FirstCallDetails';
import { CreateCase } from './CreateCase';
import { CaseDetails } from './CaseDetails';
import { SendEFax } from './SendEFax';

interface FirstCallProps {
  onBack: () => void;
  onNavigateToCases?: () => void;
}

type FirstCallView = 'details' | 'create-case' | 'case' | 'efax';

export function FirstCall({ onBack, onNavigateToCases }: FirstCallProps) {
  const [currentView, setCurrentView] = useState<FirstCallView>('details');
  const [caseCreated, setCaseCreated] = useState(false);
  const [caseNumber, setCaseNumber] = useState(1);
  const [formData, setFormData] = useState({
    callerName: '',
    callerPhone: '',
    deceasedName: '',
    dateOfDeath: '',
    timeOfDeath: '',
    locationOfDeath: '',
    address: '',
    nextOfKinName: '',
    nextOfKinPhone: '',
    weight: '',
    readyTime: '',
  });

  const handleCreateCase = (data: typeof formData) => {
    setFormData(data);
    setCurrentView('create-case');
  };

  const handleContinueFromCreateCase = () => {
    setCaseCreated(true);
    setCurrentView('case');
  };

  const handleSendEFax = () => {
    setCurrentView('efax');
  };

  const handleCreateFullCase = () => {
    // Navigate to Cases section to create a full case
    if (onNavigateToCases) {
      onNavigateToCases();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'details' && (
        <FirstCallDetails
          onBack={onBack}
          onCreateCase={handleCreateCase}
        />
      )}
      
      {currentView === 'create-case' && (
        <CreateCase
          onBack={() => setCurrentView('details')}
          formData={formData}
          onContinue={handleContinueFromCreateCase}
        />
      )}
      
      {currentView === 'case' && (
        <CaseDetails
          onBack={() => setCurrentView('details')}
          onSendEFax={handleSendEFax}
        />
      )}
      
      {currentView === 'efax' && (
        <SendEFax
          onBack={() => setCurrentView('case')}
          onCreateCase={handleCreateFullCase}
        />
      )}
    </div>
  );
}