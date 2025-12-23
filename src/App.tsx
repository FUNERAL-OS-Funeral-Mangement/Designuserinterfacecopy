import { useState, useEffect } from 'react';
import { useUser, useClerk, MockClerkProvider } from './components/MockClerkProvider';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { FirstCall } from './components/FirstCall';
import { FirstCallTimeline } from './components/FirstCallTimeline';
import { Cases } from './components/Cases';
import { CaseDetailPage } from './components/CaseDetailPage';
import { Appointments } from './components/Appointments';
import { WeeklySchedule } from './components/WeeklySchedule';
import { CatalogLink } from './components/CatalogLink';
import { FamilyCatalogView } from './components/FamilyCatalogView';
import { Catalogs } from './components/Catalogs';
import { DocumentLibrary } from './components/DocumentLibrary';
import { StaffAndVendors } from './components/StaffAndVendors';

export type ViewType = 'landing' | 'dashboard' | 'first-call' | 'first-call-timeline' | 'cases' | 'case-detail' | 'appointments' | 'schedule' | 'catalog-link' | 'family-catalog' | 'catalogs' | 'document-library' | 'staff-vendors';

const CLERK_PUBLISHABLE_KEY = 'pk_test_c2V0dGxlZC1kcmFnb24tNC5jbGVyay5hY2NvdW50cy5kZXYk';

function AppContent() {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [selectedCase, setSelectedCase] = useState<any>(null);
  
  const { isSignedIn, isLoaded } = useUser();
  const { signOut } = useClerk();

  // Check URL parameters on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const view = urlParams.get('view');
    const path = window.location.pathname;
    
    // Family catalog route
    if (path.startsWith('/family-catalog/')) {
      setCurrentView('family-catalog');
      return;
    }
    
    // View parameter
    if (view === 'dashboard' && isSignedIn) {
      setCurrentView('dashboard');
    }
  }, [isSignedIn]);

  // Navigate to dashboard when user signs in
  useEffect(() => {
    if (isSignedIn && currentView === 'landing') {
      setCurrentView('dashboard');
    }
  }, [isSignedIn, currentView]);

  const handleCaseClick = (caseData: any) => {
    setSelectedCase(caseData);
    setCurrentView('case-detail');
  };

  const handleLogout = async () => {
    await signOut();
    setCurrentView('landing');
  };

  // Show loading screen while checking auth
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  // Family catalog is public - no login required
  if (currentView === 'family-catalog') {
    return <FamilyCatalogView />;
  }

  // Redirect to landing if not logged in (except for landing page)
  if (!isSignedIn && currentView !== 'landing') {
    return <LandingPage onNavigate={setCurrentView} />;
  }

  // Render the current view
  switch (currentView) {
    case 'landing':
      return <LandingPage onNavigate={setCurrentView} />;
    
    case 'dashboard':
      return <Dashboard onNavigate={setCurrentView} onLogout={handleLogout} />;
    
    case 'first-call':
      return <FirstCall onBack={() => setCurrentView('dashboard')} onNavigateToCases={() => setCurrentView('cases')} />;
    
    case 'first-call-timeline':
      return <FirstCallTimeline onBack={() => setCurrentView('dashboard')} onNavigateToCases={() => setCurrentView('cases')} />;
    
    case 'cases':
      return <Cases onBack={() => setCurrentView('dashboard')} onCaseClick={handleCaseClick} />;
    
    case 'case-detail':
      return selectedCase ? (
        <CaseDetailPage 
          caseId={selectedCase.caseId || `case-${selectedCase.caseNumber}`}
          caseNumber={selectedCase.caseNumber}
          deceasedName={selectedCase.deceasedName}
          caseType={selectedCase.caseType}
          dateCreated={selectedCase.dateCreated}
          photoUrl={selectedCase.photoUrl}
          onBack={() => setCurrentView('cases')}
        />
      ) : null;
    
    case 'appointments':
      return <Appointments onBack={() => setCurrentView('dashboard')} />;
    
    case 'schedule':
      return <WeeklySchedule onBack={() => setCurrentView('dashboard')} />;
    
    case 'catalog-link':
      return <CatalogLink onBack={() => setCurrentView('dashboard')} />;
    
    case 'catalogs':
      return <Catalogs onBack={() => setCurrentView('dashboard')} />;
    
    case 'document-library':
      return <DocumentLibrary onBack={() => setCurrentView('dashboard')} />;
    
    case 'staff-vendors':
      return <StaffAndVendors onBack={() => setCurrentView('dashboard')} />;
    
    default:
      return <LandingPage onNavigate={setCurrentView} />;
  }
}

export default function App() {
  return (
    <MockClerkProvider>
      <AppContent />
    </MockClerkProvider>
  );
}