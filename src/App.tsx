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
import { Catalogs } from './components/Catalogs';
import { DocumentLibrary } from './components/DocumentLibrary';
import { authHelpers } from './lib/supabase';

export type ViewType = 'landing' | 'login' | 'dashboard' | 'first-call' | 'cases' | 'case-detail' | 'appointments' | 'schedule' | 'catalog-link' | 'family-catalog' | 'catalogs' | 'document-library';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

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
    if (view === 'login') {
      setCurrentView('login');
      return;
    }
    
    if (view === 'dashboard') {
      // Check if user has a session
      authHelpers.getSession().then(({ session }) => {
        if (session) {
          setIsLoggedIn(true);
          setCurrentView('dashboard');
        }
      });
    }
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = authHelpers.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setIsLoggedIn(true);
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
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

  // Show loading screen while checking auth
  if (isCheckingAuth) {
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

  // Redirect to landing if not logged in (except for landing and login pages)
  if (!isLoggedIn && currentView !== 'landing' && currentView !== 'login') {
    return <LandingPage onNavigate={setCurrentView} />;
  }

  // Render the current view
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
    
    case 'catalogs':
      return <Catalogs onBack={() => setCurrentView('dashboard')} />;
    
    case 'document-library':
      return <DocumentLibrary onBack={() => setCurrentView('dashboard')} />;
    
    default:
      return <LandingPage onNavigate={setCurrentView} />;
  }
}