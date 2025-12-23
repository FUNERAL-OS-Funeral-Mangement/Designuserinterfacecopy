import { createContext, useContext, useState, ReactNode } from 'react';

// Mock Clerk Context Types
interface MockUser {
  id: string;
  firstName: string | null;
  lastName: string | null;
  emailAddresses: Array<{ emailAddress: string }>;
  imageUrl: string;
}

interface MockClerkContext {
  isSignedIn: boolean;
  isLoaded: boolean;
  user: MockUser | null;
}

interface MockClerkActions {
  signOut: () => Promise<void>;
  openSignIn: () => void;
}

const MockUserContext = createContext<MockClerkContext>({
  isSignedIn: false,
  isLoaded: true,
  user: null,
});

const MockClerkContext = createContext<MockClerkActions>({
  signOut: async () => {},
  openSignIn: () => {},
});

// Mock hooks that match Clerk's API
export function useUser() {
  return useContext(MockUserContext);
}

export function useClerk() {
  return useContext(MockClerkContext);
}

// Mock SignIn Button Component
export function SignInButton({ children }: { children: ReactNode }) {
  const { openSignIn } = useClerk();
  return <div onClick={openSignIn}>{children}</div>;
}

// Mock Provider Component
export function MockClerkProvider({ 
  children 
}: { 
  children: ReactNode;
}) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mockUser: MockUser | null = isSignedIn
    ? {
        id: 'mock_user_123',
        firstName: 'Demo',
        lastName: 'User',
        emailAddresses: [{ emailAddress: 'demo@ritepath.com' }],
        imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo',
      }
    : null;

  const userContextValue: MockClerkContext = {
    isSignedIn,
    isLoaded: true,
    user: mockUser,
  };

  const clerkActions: MockClerkActions = {
    signOut: async () => {
      setIsSignedIn(false);
    },
    openSignIn: () => {
      setShowSignInModal(true);
    },
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authentication - any email/password combo works
    if (email && password) {
      setIsSignedIn(true);
      setShowSignInModal(false);
      setEmail('');
      setPassword('');
    }
  };

  return (
    <MockUserContext.Provider value={userContextValue}>
      <MockClerkContext.Provider value={clerkActions}>
        {children}
        
        {/* Mock Sign-In Modal */}
        {showSignInModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-gray-900 mb-2">Sign in to Rite Path</h2>
                <p className="text-gray-600 text-sm">
                  Enter any email and password to continue
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="demo@ritepath.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Sign in
                </button>
              </form>

              {/* Demo Notice */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Demo Mode:</strong> This is a mock authentication system. 
                  Any email/password will work for testing.
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowSignInModal(false)}
                className="mt-4 w-full text-gray-600 hover:text-gray-900 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </MockClerkContext.Provider>
    </MockUserContext.Provider>
  );
}
