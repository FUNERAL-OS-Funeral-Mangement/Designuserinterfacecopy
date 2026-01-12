import { CheckCircle, User, Package, FileText, DollarSign } from 'lucide-react';

interface ReviewApproveProps {
  caseType: 'preneed' | 'at-need';
  caseData: any;
  onComplete: (data: any) => void;
  onBack: () => void;
}

export function ReviewApprove({ caseType, caseData, onComplete, onBack }: ReviewApproveProps) {
  const vitalStats = caseData.vitalStats || {};
  const catalogItems = caseData.catalogItems || {};
  const documents = caseData.documents || [];
  const checklist = caseData.checklist || {};

  const handleApprove = () => {
    const finalCaseData = {
      ...caseData,
      caseType,
      status: 'active',
      createdAt: new Date().toISOString(),
      id: `CASE-${Date.now()}`,
    };
    onComplete(finalCaseData);
  };

  const completedTasks = Object.values(checklist).filter(Boolean).length;
  const totalTasks = Object.keys(checklist).length;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-2">Review & Approve</h2>
        <p className="text-gray-600">
          Please review all case information before creating the case card.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Review Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vital Statistics Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-teal-600" />
              <h3 className="text-gray-900">Vital Statistics</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Full Name</p>
                <p className="text-gray-900">
                  {vitalStats.firstName} {vitalStats.middleName} {vitalStats.lastName}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Date of Birth</p>
                <p className="text-gray-900">{vitalStats.dateOfBirth}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Date of Passing</p>
                <p className="text-gray-900">{vitalStats.dateOfPassing}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Gender</p>
                <p className="text-gray-900 capitalize">{vitalStats.gender}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-gray-600 text-sm">Place of Death</p>
                <p className="text-gray-900">{vitalStats.placeOfDeath}</p>
              </div>
            </div>
          </div>

          {/* Catalog Items Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-teal-600" />
              <h3 className="text-gray-900">Selected Services & Items</h3>
            </div>
            {catalogItems.package && (
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-900">{catalogItems.package.name}</span>
                  <span className="text-gray-900">${catalogItems.package.price.toLocaleString()}</span>
                </div>
                <p className="text-gray-600 text-sm">{catalogItems.package.description}</p>
              </div>
            )}
            {catalogItems.addons && catalogItems.addons.length > 0 && (
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-gray-700 mb-2 text-sm">Additional Items</h4>
                <div className="space-y-1">
                  {catalogItems.addons.map((addon: any) => (
                    <div key={addon.id} className="flex justify-between text-sm">
                      <span className="text-gray-700">{addon.name}</span>
                      <span className="text-gray-700">${addon.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Financial Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-teal-600" />
              <h3 className="text-gray-900">Financial Summary</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>${catalogItems.total?.toLocaleString() || '0'}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax (8.5%)</span>
                <span>${((catalogItems.total || 0) * 0.085).toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t-2 border-gray-300">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">
                  ${((catalogItems.total || 0) * 1.085).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Documents Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-teal-600" />
              <h3 className="text-gray-900">Documents & Forms</h3>
            </div>
            <div className="space-y-2">
              {Object.entries(checklist).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  {value ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <div className="w-4 h-4 border-2 border-gray-300 rounded" />
                  )}
                  <span className={value ? 'text-gray-900' : 'text-gray-500'}>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                  </span>
                </div>
              ))}
            </div>
            {documents.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-gray-700 text-sm mb-2">Uploaded Documents: {documents.length}</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Case Card Preview */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl p-6 text-white sticky top-6">
            <h3 className="mb-4">Case Card Preview</h3>
            
            {/* Decedent Info */}
            <div className="mb-6">
              <div className="w-20 h-20 bg-teal-500 bg-opacity-40 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-center">
                {vitalStats.firstName} {vitalStats.lastName}
              </h4>
              <p className="text-center text-teal-100 text-sm">
                {vitalStats.dateOfBirth} - {vitalStats.dateOfPassing}
              </p>
            </div>

            {/* Case Details */}
            <div className="space-y-3 mb-6">
              <div className="bg-white bg-opacity-10 rounded-lg p-3">
                <p className="text-teal-100 text-sm">Case Type</p>
                <p className="capitalize">{caseType}</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-3">
                <p className="text-teal-100 text-sm">Tasks Completed</p>
                <p>{completedTasks} / {totalTasks}</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-3">
                <p className="text-teal-100 text-sm">Service Package</p>
                <p>{catalogItems.package?.name || 'Not selected'}</p>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Vital Statistics Complete</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Catalog Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Documents Prepared</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleApprove}
          className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          Approve & Create Case Card
        </button>
      </div>
    </div>
  );
}
