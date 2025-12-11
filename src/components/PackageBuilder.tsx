import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Minus, Plus, Trash2, FileText, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ContractGenerator } from './ContractGenerator';

export function PackageBuilder() {
  const {
    selectedItems,
    removeItem,
    updateItemQuantity,
    updateItemNotes,
    getTotalPrice,
    contractGenerating,
  } = useStore();

  const [showContract, setShowContract] = useState(false);
  const hasItems = selectedItems.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-teal-700 mb-2">Build Your Own Package</h1>
        <p className="text-gray-600">
          Customize your memorial service with the items you've selected
        </p>
      </div>

      {/* Contract Generation Banner */}
      {contractGenerating && hasItems && (
        <div className="mb-6 bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-xl p-4 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-teal-600 rounded-full animate-pulse mt-2" />
            <div className="flex-1">
              <h3 className="text-teal-700 mb-2">Contract Generation in Progress</h3>
              <p className="text-gray-600 text-sm mb-3">
                Your contract is being generated automatically as items are selected. All totals and
                line items are updated in real-time.
              </p>
              <div className="flex items-center gap-2 text-teal-700 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Ready for review and signature</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {!hasItems ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-200">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-gray-700 mb-2">No Items Selected</h3>
          <p className="text-gray-600 mb-6">
            Start by selecting packages or add-ons from the catalog
          </p>
        </div>
      ) : (
        <>
          {/* Selected Items List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="bg-teal-50 px-6 py-4 border-b border-teal-100">
              <h3 className="text-teal-700">Selected Items</h3>
            </div>

            <div className="divide-y divide-gray-200">
              {selectedItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <ImageWithFallback
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h4 className="text-gray-900">{item.name}</h4>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateItemQuantity(item.id, Math.max(1, item.quantity - 1))
                            }
                            className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-600">${item.price.toLocaleString()} each</span>
                          <span className="text-gray-400">×</span>
                          <span className="text-teal-700">
                            ${(item.price * item.quantity).toLocaleString()} total
                          </span>
                        </div>
                      </div>

                      {/* Notes */}
                      <div>
                        <input
                          type="text"
                          value={item.notes || ''}
                          onChange={(e) => updateItemNotes(item.id, e.target.value)}
                          placeholder="Add special requests or notes..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Card */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Detailed Line Costs */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-teal-700 mb-4">Detailed Line Cost (DLC)</h3>
              
              <div className="space-y-3">
                {selectedItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <p className="text-gray-900">{item.name}</p>
                      <p className="text-gray-500">
                        {item.quantity} × ${item.price.toLocaleString()}
                      </p>
                    </div>
                    <p className="text-gray-900">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
                
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="text-gray-900">
                      ${getTotalPrice().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Total and Actions */}
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl shadow-sm border border-teal-200 p-6">
              <h3 className="text-teal-700 mb-4">Package Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items</span>
                  <span className="text-gray-900">{selectedItems.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Units</span>
                  <span className="text-gray-900">
                    {selectedItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <div className="border-t-2 border-teal-300 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Total Price</span>
                    <span className="text-teal-700">
                      ${getTotalPrice().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowContract(true)}
                className="w-full py-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 mb-3"
              >
                <FileText className="w-5 h-5" />
                Review & Sign Contract
              </button>

              <p className="text-gray-600 text-xs text-center">
                Contract terms will be auto-populated based on your selections
              </p>
            </div>
          </div>
        </>
      )}

      {/* Contract Modal */}
      {showContract && <ContractGenerator onClose={() => setShowContract(false)} />}
    </div>
  );
}
