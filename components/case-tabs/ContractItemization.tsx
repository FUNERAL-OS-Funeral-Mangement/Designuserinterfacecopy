import { ArrowLeft, Package, Plus, FileText, Download, CheckCircle2 } from 'lucide-react';
import { useCaseStore } from '../../store/useCaseStore';

interface ContractItemizationProps {
  caseId: string;
  onBack: () => void;
}

export function ContractItemization({ caseId, onBack }: ContractItemizationProps) {
  const getCatalogItems = useCaseStore((state) => state.getCatalogItems);
  const caseData = useCaseStore((state) => state.getCaseById(caseId));
  
  const catalogSelections = getCatalogItems(caseId);
  
  if (!catalogSelections || !caseData) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">No catalog selections found for this case.</p>
      </div>
    );
  }

  const { package: selectedPackage, addons } = catalogSelections;
  
  // Calculate totals
  const packagePrice = selectedPackage?.price || 0;
  const addonsTotal = addons.reduce((sum, addon) => sum + (addon.price * (addon.quantity || 1)), 0);
  const subtotal = packagePrice + addonsTotal;
  const tax = subtotal * 0.08; // 8% tax example
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-100 transition-colors -ml-2"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex-1">
              <h1 className="text-gray-900">Contract & Itemization</h1>
              <p className="text-sm text-gray-600 mt-0.5">
                {caseData.deceasedName} • Case #{caseData.caseNumber}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download PDF</span>
              </button>
              <span className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-50 text-emerald-700 text-sm border border-emerald-200">
                <CheckCircle2 className="w-4 h-4" />
                Signed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Package Section */}
        {selectedPackage && (
          <div className="bg-white border border-gray-200 mb-6">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-gray-600" />
                <h2 className="text-gray-900">Selected Package</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-2">{selectedPackage.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{selectedPackage.description}</p>
                  
                  {selectedPackage.included && selectedPackage.included.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-700 mb-2">Included Services:</p>
                      <ul className="space-y-1.5">
                        {selectedPackage.included.map((item, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-2xl text-gray-900">${packagePrice.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-1">Package Price</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add-Ons Section */}
        {addons.length > 0 && (
          <div className="bg-white border border-gray-200 mb-6">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-gray-600" />
                <h2 className="text-gray-900">Additional Services & Products</h2>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {addons.map((addon, index) => (
                <div key={index} className="px-6 py-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-1">{addon.name}</h3>
                      {addon.description && (
                        <p className="text-sm text-gray-600">{addon.description}</p>
                      )}
                      {addon.quantity && addon.quantity > 1 && (
                        <p className="text-sm text-gray-500 mt-1">Quantity: {addon.quantity}</p>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-lg text-gray-900">
                        ${(addon.price * (addon.quantity || 1)).toLocaleString()}
                      </p>
                      {addon.quantity && addon.quantity > 1 && (
                        <p className="text-xs text-gray-500 mt-0.5">
                          ${addon.price.toLocaleString()} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Price Summary */}
        <div className="bg-white border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h2 className="text-gray-900">Price Summary</h2>
          </div>
          <div className="px-6 py-6 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <span className="text-gray-700">Subtotal</span>
              <span className="text-gray-900">${subtotal.toLocaleString()}</span>
            </div>
            
            {/* Tax */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <span className="text-gray-700">Tax (8%)</span>
              <span className="text-gray-900">${tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            
            {/* Total */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-gray-900">Total</span>
              <span className="text-3xl text-gray-900">${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Contract Info */}
        <div className="mt-6 p-6 bg-emerald-50 border border-emerald-200">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-emerald-900 mb-1">Contract Status: Signed & Executed</p>
              <p className="text-sm text-emerald-700">
                This contract was signed on {caseData.dateCreated} and is legally binding. 
                A copy has been sent to the family via email.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons - Mobile Friendly */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button className="flex-1 px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
            <FileText className="w-4 h-4" />
            View Full Contract
          </button>
          <button className="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Download All Documents
          </button>
        </div>
      </div>
    </div>
  );
}
