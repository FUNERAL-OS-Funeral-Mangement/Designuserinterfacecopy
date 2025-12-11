import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { FirstCall } from './components/FirstCall';
import { Cases } from './components/Cases';
import { CaseDetailPage } from './components/CaseDetailPage';
import { Appointments } from './components/Appointments';
import { WeeklySchedule } from './components/WeeklySchedule';
import { CatalogLink } from './components/CatalogLink';
import { FamilyCatalogView } from './components/FamilyCatalogView';

export type ViewType = 'landing' | 'login' | 'dashboard' | 'first-call' | 'cases' | 'case-detail' | 'appointments' | 'schedule' | 'catalog-link' | 'family-catalog';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>(null);

  // Check if URL is a family catalog link
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/family-catalog/')) {
      setCurrentView('family-catalog');
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('landing');
  };

  const handleCaseClick = (caseData: any) => {
    setSelectedCase(caseData);
    setCurrentView('case-detail');
  };

  const renderView = () => {
    // Family catalog is public - no login required
    if (currentView === 'family-catalog') {
      return <FamilyCatalogView />;
    }

    if (!isLoggedIn && currentView !== 'landing' && currentView !== 'login') {
      return <LandingPage onNavigate={setCurrentView} />;
    }

    switch (currentView) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentView} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} onBack={() => setCurrentView('landing')} />;
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} onLogout={handleLogout} />;
      case 'first-call':
        return <FirstCall onBack={() => setCurrentView('dashboard')} onNavigateToCases={() => setCurrentView('cases')} />;
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
      default:
        return <LandingPage onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderView()}
    </div>
  );
}
