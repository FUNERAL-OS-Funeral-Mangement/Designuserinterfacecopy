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
import { authHelpers } from './lib/supabase';

export type ViewType = 'landing' | 'login' | 'dashboard' | 'first-call' | 'cases' | 'case-detail' | 'appointments' | 'schedule' | 'catalog-link' | 'family-catalog';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check if URL is a family catalog link
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/family-catalog/')) {
      setCurrentView('family-catalog');
    }
  }, []);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { session } = await authHelpers.getSession();
        if (session) {
          setIsLoggedIn(true);
          setCurrentView('dashboard');
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = authHelpers.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setIsLoggedIn(true);
        setCurrentView('dashboard');
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        setCurrentView('landing');
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleLogout = async () => {
    try {
      await authHelpers.signOut();
      setIsLoggedIn(false);
      setCurrentView('landing');
    } catch (error) {
      console.error('Error signing out:', error);
    }
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