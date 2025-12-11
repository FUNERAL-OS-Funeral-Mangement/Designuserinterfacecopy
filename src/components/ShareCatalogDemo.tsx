import { Share2, Users, Heart, CheckCircle } from 'lucide-react';

export function ShareCatalogDemo() {
  return (
    <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-8 rounded-2xl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-gray-900 mb-3">Family Catalog Sharing System</h2>
          <p className="text-gray-600">Empower families to make selections at their own pace</p>
        </div>

        {/* Workflow Diagram */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Step 1 */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Share2 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-gray-900 mb-2">1. Director Shares Link</h3>
            <p className="text-gray-600 text-sm mb-4">
              Funeral director generates a unique, secure link and sends it via email or SMS to the family.
            </p>
            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 font-mono break-all">
              ritepath.com/family-catalog/ABC123
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="text-gray-900 mb-2">2. Family Browses & Selects</h3>
            <p className="text-gray-600 text-sm mb-4">
              Family views the beautiful catalog, selects packages and add-ons that feel right, and can add personal notes.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle className="w-4 h-4 text-teal-600" />
                No pressure, take their time
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle className="w-4 h-4 text-teal-600" />
                Real-time pricing visible
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle className="w-4 h-4 text-teal-600" />
                Can add notes/questions
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-gray-900 mb-2">3. Director Reviews</h3>
            <p className="text-gray-600 text-sm mb-4">
              Family submissions appear in the director's workflow. Director reviews, discusses with family, and finalizes.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-800 text-xs">
                ✓ Selections auto-populate in case workflow
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-gray-900 mb-4">Key Features</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-4 h-4 text-teal-700" />
              </div>
              <div>
                <p className="text-gray-900 text-sm">Secure & Private</p>
                <p className="text-gray-600 text-xs">Unique links with optional expiration</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-4 h-4 text-teal-700" />
              </div>
              <div>
                <p className="text-gray-900 text-sm">Real-Time Notifications</p>
                <p className="text-gray-600 text-xs">Director notified when family submits</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-4 h-4 text-teal-700" />
              </div>
              <div>
                <p className="text-gray-900 text-sm">Mobile Friendly</p>
                <p className="text-gray-600 text-xs">Works perfectly on any device</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-4 h-4 text-teal-700" />
              </div>
              <div>
                <p className="text-gray-900 text-sm">Notes & Communication</p>
                <p className="text-gray-600 text-xs">Families can add questions or preferences</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-6 bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl p-6 text-white">
          <h3 className="mb-3">Why Families Love It</h3>
          <div className="space-y-2 text-sm">
            <p>✓ Browse at home, in their own time, without pressure</p>
            <p>✓ Discuss options privately with other family members</p>
            <p>✓ See transparent pricing for everything</p>
            <p>✓ Feel empowered in the decision-making process</p>
            <p>✓ Less stressful than making all decisions in-person</p>
          </div>
        </div>
      </div>
    </div>
  );
}
