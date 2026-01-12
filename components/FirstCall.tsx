import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { FirstCallDashboard } from './FirstCallDashboard';
import { FirstCallDetails } from './FirstCallDetails';
import { CreateCase } from './CreateCase';
import { ScheduleAppointment } from './ScheduleAppointment';
import { CaseDetails } from './CaseDetails';
import { SendEFax } from './SendEFax';
import { useCaseStore } from '../store/useCaseStore';

interface FirstCallProps {
  onBack: () => void;
  onNavigateToCases?: () => void;
}

type FirstCallView = 'dashboard' | 'details' | 'create-case' | 'schedule-appointment' | 'case' | 'efax';

export function FirstCall({ onBack, onNavigateToCases }: FirstCallProps) {
  const [currentView, setCurrentView] = useState<FirstCallView>('dashboard');
  const [caseCreated, setCaseCreated] = useState(false);
  const [caseNumber, setCaseNumber] = useState(1);
  const [createdCaseId, setCreatedCaseId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    callerName: '',
    callerPhone: '',
    deceasedName: '',
    dateOfBirth: '',
    dateOfDeath: '',
    timeOfDeath: '',
    locationOfDeath: '',
    address: '',
    nextOfKinName: '',
    nextOfKinPhone: '',
    weight: '',
    readyTime: '',
    isVerbalRelease: false,
    hasStairs: '',
    isFamilyPresent: '',
  });

  const addCase = useCaseStore((state) => state.addCase);

  const handleCreateCase = (data: typeof formData) => {
    setFormData(data);
    
    // Create case in store with verbal release flag
    const newCase = addCase({
      deceasedName: data.deceasedName,
      caseType: 'At-Need',
      dateCreated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      isVerbalRelease: data.isVerbalRelease,
    });
    
    setCreatedCaseId(newCase.id);
    setCurrentView('create-case');
  };

  const handleContinueFromCreateCase = () => {
    // Go to appointment scheduling
    setCurrentView('schedule-appointment');
  };

  const handleAppointmentScheduled = () => {
    // After scheduling, go to case details
    setCaseCreated(true);
    setCurrentView('case');
  };

  const handleBackFromAppointment = () => {
    // Go back to create case review
    setCurrentView('create-case');
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
      {currentView === 'dashboard' && (
        <FirstCallDashboard
          onBack={onBack}
          onCreateNew={() => setCurrentView('details')}
        />
      )}
      
      {currentView === 'details' && (
        <FirstCallDetails
          onBack={() => setCurrentView('dashboard')}
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

      {currentView === 'schedule-appointment' && createdCaseId && (
        <ScheduleAppointment
          onBack={handleBackFromAppointment}
          onScheduled={handleAppointmentScheduled}
          caseId={createdCaseId}
          familyName={formData.deceasedName}
          nextOfKinName={formData.nextOfKinName}
          nextOfKinPhone={formData.nextOfKinPhone}
        />
      )}
      
      {currentView === 'case' && createdCaseId && (
        <CaseDetails
          onBack={() => setCurrentView('details')}
          onSendEFax={handleSendEFax}
          caseId={createdCaseId}
          formData={formData}
          onNavigateToCases={onNavigateToCases}
        />
      )}
      
      {currentView === 'efax' && (
        <SendEFax
          onBack={() => setCurrentView('case')}
          onCreateCase={handleCreateFullCase}
          onBackToDashboard={onBack}
        />
      )}
    </div>
  );
}