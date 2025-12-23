import { AlertCircle, ExternalLink } from 'lucide-react';

export function ClerkSetupNotice() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        {/* Icon */}
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-yellow-600" />
        </div>

        {/* Title */}
        <h1 className="text-gray-900 text-center mb-4">
          Clerk Configuration Required
        </h1>

        {/* Message */}
        <p className="text-gray-600 text-center mb-8">
          To use authentication in this app, you need to configure Clerk with your publishable key.
        </p>

        {/* Steps */}
        <div className="space-y-6 mb-8">
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-slate-600 text-white rounded-full flex items-center justify-center shrink-0">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-2">Get Your Clerk Key</h3>
                <p className="text-gray-600 mb-3">
                  Visit the Clerk Dashboard and copy your Publishable Key
                </p>
                <a
                  href="https://dashboard.clerk.com/last-active?path=api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                >
                  Open Clerk Dashboard
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-slate-600 text-white rounded-full flex items-center justify-center shrink-0">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-2">Add to Environment Variables</h3>
                <p className="text-gray-600 mb-3">
                  Create or update your <code className="px-2 py-1 bg-gray-200 rounded text-sm">.env.local</code> file with:
                </p>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <code className="text-green-400 text-sm">
                    VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
                  </code>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-slate-600 text-white rounded-full flex items-center justify-center shrink-0">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-2">Restart Dev Server</h3>
                <p className="text-gray-600">
                  Stop and restart your development server for the changes to take effect
                </p>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mt-3">
                  <code className="text-green-400 text-sm">
                    npm run dev
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Help */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Need help?</strong> Check out the{' '}
            <a
              href="https://clerk.com/docs/quickstarts/react"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-900"
            >
              Clerk React Quickstart Guide
            </a>
            {' '}or see <code className="px-1 py-0.5 bg-blue-100 rounded">CLERK_SETUP.md</code> in this project.
          </p>
        </div>
      </div>
    </div>
  );
}
