import { useState } from 'react';
import { Package, Plus, Check, ShoppingCart, ArrowLeft, Edit2, Info } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCaseStore } from '../store/useCaseStore';
import { useCatalogStore } from '../store/useCatalogStore';
import { ServiceInformationModal } from './ServiceInformationModal';
import { EditIncludedItemModal } from './EditIncludedItemModal';
import { includedItemsData } from './IncludedItemModal';
import type { ServiceInformation } from '../store/useCaseStore';

interface StaffCatalogViewProps {
  caseId: string;
  onBack: () => void;
}

// Remove hardcoded data - now using global store

export function StaffCatalogView({ caseId, onBack }: StaffCatalogViewProps) {
  // Get catalog data from global store
  const packages = useCatalogStore((state) => state.packages);
  const addonsFromStore = useCatalogStore((state) => state.addons);
  
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [selectedAddons, setSelectedAddons] = useState<any[]>([]);
  const [view, setView] = useState<'packages' | 'addons'>('packages');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [pendingPackage, setPendingPackage] = useState<any>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [customIncludedItems, setCustomIncludedItems] = useState(includedItemsData);
  
  const updateServiceInformation = useCaseStore((state) => state.updateServiceInformation);
  const caseData = useCaseStore((state) => state.cases.get(caseId));

  const currentItems = view === 'packages' ? packages : addonsFromStore;

  const handleSelectPackage = (pkg: any) => {
    setPendingPackage(pkg);
    setShowServiceModal(true);
  };

  const handleServiceInfoSave = (serviceInformation: ServiceInformation) => {
    if (pendingPackage) {
      setSelectedPackage(pendingPackage);
      updateServiceInformation(caseId, serviceInformation);
      setPendingPackage(null);
    }
  };

  const toggleAddon = (addon: any) => {
    setSelectedAddons((prev) =>
      prev.find((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const handleSaveIncludedItem = (itemKey: string, updatedItem: any) => {
    setCustomIncludedItems({
      ...customIncludedItems,
      [itemKey]: updatedItem
    });
  };

  const totalPrice = 
    (selectedPackage?.price || 0) + 
    selectedAddons.reduce((sum, addon) => sum + addon.price, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Case
          </button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-gray-900 mb-2">Service Package Selection</h1>
              <p className="text-gray-600">
                {caseData?.deceasedName} • Case #{caseData?.caseNumber}
              </p>
            </div>

            {/* Total Summary */}
            {(selectedPackage || selectedAddons.length > 0) && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 min-w-[240px]">
                <div className="text-sm text-gray-600 mb-1">Current Total</div>
                <div className="text-gray-900 text-2xl mb-3">
                  ${totalPrice.toLocaleString()}
                </div>
                {selectedPackage && (
                  <div className="text-xs text-gray-600 mb-1">
                    Package: ${selectedPackage.price.toLocaleString()}
                  </div>
                )}
                {selectedAddons.length > 0 && (
                  <div className="text-xs text-gray-600">
                    Add-ons: ${selectedAddons.reduce((sum, a) => sum + a.price, 0).toLocaleString()}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-6">
            <button
              onClick={() => setView('packages')}
              className={`px-6 py-4 border-b-2 transition-colors ${
                view === 'packages'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Service Packages
            </button>
            <button
              onClick={() => setView('addons')}
              className={`px-6 py-4 border-b-2 transition-colors ${
                view === 'addons'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Add-ons & Extras
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((item) => {
            const isSelected = view === 'packages'
              ? selectedPackage?.id === item.id
              : selectedAddons.find((a) => a.id === item.id);

            return (
              <div
                key={item.id}
                className={`bg-white rounded-xl border-2 transition-all overflow-hidden ${
                  isSelected
                    ? 'border-gray-900 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-gray-900">{item.name}</h3>
                    {isSelected && (
                      <div className="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                  <div className="text-gray-900 text-xl mb-4">
                    ${item.price.toLocaleString()}
                  </div>

                  {/* What's Included (for packages) */}
                  {'included' in item && item.included && (
                    <div className="mb-4">
                      <div className="text-sm text-gray-700 mb-2">What's Included:</div>
                      <div className="space-y-1.5">
                        {item.included.slice(0, 4).map((includedItem: any, idx: number) => (
                          <div key={idx} className="flex items-start gap-2 group">
                            <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-gray-600 flex-1">
                              {typeof includedItem === 'string' ? includedItem : includedItem.label}
                            </span>
                            {typeof includedItem === 'object' && includedItem.key && customIncludedItems[includedItem.key] && (
                              <button
                                onClick={() => setEditingItem(includedItem.key)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
                                title="Edit details"
                              >
                                <Edit2 className="w-3 h-3 text-gray-500" />
                              </button>
                            )}
                          </div>
                        ))}
                        {item.included.length > 4 && (
                          <div className="text-xs text-gray-500 pl-6">
                            + {item.included.length - 4} more items
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Select Button */}
                  {view === 'packages' ? (
                    <button
                      onClick={() => handleSelectPackage(item)}
                      className={`w-full py-3 rounded-lg transition-colors ${
                        isSelected
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      {isSelected ? 'Selected Package' : 'Select Package'}
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleAddon(item)}
                      className={`w-full py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                        isSelected
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-5 h-5" />
                          Added
                        </>
                      ) : (
                        <>
                          <Plus className="w-5 h-5" />
                          Add to Package
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Information Modal */}
      {showServiceModal && pendingPackage && (
        <ServiceInformationModal
          show={showServiceModal}
          onClose={() => {
            setShowServiceModal(false);
            setPendingPackage(null);
          }}
          onSave={handleServiceInfoSave}
          packageName={pendingPackage.name}
          initialData={caseData?.serviceInformation}
        />
      )}

      {/* Edit Included Item Modal */}
      {editingItem && customIncludedItems[editingItem] && (
        <EditIncludedItemModal
          show={true}
          onClose={() => setEditingItem(null)}
          item={customIncludedItems[editingItem]}
          onSave={(updatedItem) => handleSaveIncludedItem(editingItem, updatedItem)}
        />
      )}
    </div>
  );
}