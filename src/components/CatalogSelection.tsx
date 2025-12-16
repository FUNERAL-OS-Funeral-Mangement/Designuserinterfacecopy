import { useState } from 'react';
import { Package, Plus, Check, ShoppingCart, Share2, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ShareCatalogModal } from './ShareCatalogModal';
import { PackageCustomizer } from './PackageCustomizer';

interface CatalogSelectionProps {
  caseType: 'preneed' | 'at-need';
  caseData: any;
  onComplete: (data: any) => void;
  onBack: () => void;
}

const packages = [
  {
    id: 'pkg-basic',
    name: 'Basic Service Package',
    description: 'Essential services for a dignified memorial',
    price: 2500,
    category: 'package' as const,
    imageUrl: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400',
    included: [
      { key: 'transfer-remains', label: 'Transfer of remains to funeral home', value: 300 },
      { key: 'embalming-preparation', label: 'Basic preparation and embalming', value: 700 },
      { key: 'visitation-facilities', label: 'Use of facilities for viewing (2 hours)', value: 350 },
      { label: 'Use of facilities for funeral ceremony', value: 400 },
      { key: 'hearse-transport', label: 'Hearse for local transportation', value: 250 },
      { key: 'memorial-materials', label: 'Basic memorial folders (25)', value: 100 },
      { key: 'professional-service', label: 'Professional staff services and coordination', value: 400 },
    ],
  },
  {
    id: 'pkg-celebration',
    name: 'Celebration of Life Package',
    description: 'Comprehensive celebration with personalized touches',
    price: 4200,
    category: 'package' as const,
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f29da8c43f?w=400',
    included: [
      { label: 'All services from Basic Package', value: 2500 },
      { key: 'visitation-facilities', label: 'Extended viewing time (4 hours)', value: 200 },
      { label: 'Personalized memorial video/slideshow', value: 350 },
      { key: 'memorial-materials', label: 'Custom memorial programs (100)', value: 150 },
      { label: 'Memory table setup with photos', value: 100 },
      { label: 'Reception area for refreshments', value: 300 },
      { label: 'Digital memorial webpage', value: 200 },
      { label: 'Professional photography during service', value: 400 },
    ],
  },
  {
    id: 'pkg-premium',
    name: 'Premium Memorial Package',
    description: 'Full-service premium memorial experience',
    price: 6500,
    category: 'package' as const,
    imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400',
    included: [
      { label: 'All services from Celebration Package', value: 4200 },
      { key: 'visitation-facilities', label: 'Unlimited viewing time', value: 300 },
      { label: 'Premium casket selection assistance', value: 200 },
      { label: 'Limousine service for family', value: 450 },
      { label: 'Custom floral arrangements', value: 300 },
      { label: 'Live streaming of service', value: 250 },
      { key: 'memorial-materials', label: 'Premium memorial programs (200)', value: 200 },
      { label: 'Guest register book with custom cover', value: 100 },
      { label: 'Thank you acknowledgment cards (100)', value: 120 },
      { label: 'Dove release ceremony', value: 380 },
    ],
  },
  {
    id: 'pkg-cremation',
    name: 'Direct Cremation Package',
    description: 'Simple and respectful cremation service',
    price: 1800,
    category: 'package' as const,
    imageUrl: 'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=400',
    included: [
      { key: 'transfer-remains', label: 'Transfer of remains to funeral home', value: 300 },
      { label: 'Refrigeration and care of remains', value: 200 },
      { label: 'Cremation process', value: 600 },
      { label: 'Basic urn or temporary container', value: 150 },
      { label: 'All required permits and documentation', value: 150 },
      { label: 'Return of cremated remains to family', value: 100 },
      { key: 'professional-service', label: 'Professional staff coordination', value: 300 },
    ],
  },
  {
    id: 'pkg-burial',
    name: 'Burial Package',
    description: 'Traditional burial service with full arrangements',
    price: 5200,
    category: 'package' as const,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    included: [
      { key: 'transfer-remains', label: 'Transfer of remains to funeral home', value: 300 },
      { key: 'embalming-preparation', label: 'Embalming and preparation', value: 750 },
      { key: 'visitation-facilities', label: 'Use of facilities for viewing (4 hours)', value: 500 },
      { label: 'Use of facilities for funeral ceremony', value: 450 },
      { key: 'coordination-services', label: 'Graveside service coordination', value: 400 },
      { key: 'hearse-transport', label: 'Hearse and flower vehicle', value: 300 },
      { label: 'Casket selection assistance', value: 200 },
      { label: 'Burial vault arrangement', value: 300 },
      { key: 'coordination-services', label: 'Cemetery coordination', value: 500 },
      { key: 'memorial-materials', label: 'Memorial programs (100)', value: 150 },
    ],
  },
];

const addons = [
  {
    id: 'addon-prayer-cards',
    name: 'Prayer Cards',
    description: 'Custom printed prayer cards (set of 100)',
    price: 150,
    category: 'addon' as const,
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
  },
  {
    id: 'addon-program-4pg',
    name: 'Memorial Program (4-page)',
    description: 'Professionally designed 4-page memorial program',
    price: 200,
    category: 'addon' as const,
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400',
  },
  {
    id: 'addon-program-8pg',
    name: 'Memorial Program (8-page)',
    description: 'Professionally designed 8-page memorial program',
    price: 320,
    category: 'addon' as const,
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400',
  },
  {
    id: 'addon-program-12pg',
    name: 'Memorial Program (12-page)',
    description: 'Professionally designed 12-page memorial program',
    price: 450,
    category: 'addon' as const,
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400',
  },
  {
    id: 'addon-acknowledgment',
    name: 'Acknowledgment Cards',
    description: 'Thank you cards for attendees (set of 50)',
    price: 120,
    category: 'addon' as const,
    imageUrl: 'https://images.unsplash.com/photo-1587845750216-a2aa8cb9cd9e?w=400',
  },
  {
    id: 'addon-photo-enlargement',
    name: 'Photo Enlargements',
    description: 'Professional photo enlargement and framing',
    price: 250,
    category: 'addon' as const,
    imageUrl: 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=400',
  },
  {
    id: 'addon-tribute-video',
    name: 'Tribute Video / Slideshow',
    description: 'Professional video tribute with music',
    price: 400,
    category: 'addon' as const,
    imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400',
  },
  {
    id: 'addon-dove-release',
    name: 'Dove Release',
    description: 'Ceremonial white dove release',
    price: 350,
    category: 'addon' as const,
    imageUrl: 'https://images.unsplash.com/photo-1551198509-a025f0a3d3cb?w=400',
  },
  {
    id: 'addon-limousine',
    name: 'Limousine',
    description: 'Professional limousine service for family',
    price: 450,
    category: 'addon' as const,
    imageUrl: 'https://images.unsplash.com/photo-1567225591450-0bd5ff4b5e4f?w=400',
  },
  {
    id: 'addon-floral',
    name: 'Floral Arrangements',
    description: 'Custom floral arrangements and wreaths',
    price: 300,
    category: 'addon' as const,
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400',
  },
  {
    id: 'addon-website',
    name: 'Memorial Website Page',
    description: 'Dedicated online memorial page (1 year hosting)',
    price: 180,
    category: 'addon' as const,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
  },
  {
    id: 'addon-guest-register',
    name: 'Guest Register Book',
    description: 'Elegant guest book with custom cover',
    price: 85,
    category: 'addon' as const,
    imageUrl: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=400',
  },
  {
    id: 'addon-cremation-jewelry',
    name: 'Cremation Jewelry',
    description: 'Memorial pendant for cremated remains',
    price: 220,
    category: 'addon' as const,
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
  },
];

export function CatalogSelection({ caseType, caseData, onComplete, onBack }: CatalogSelectionProps) {
  const [view, setView] = useState<'packages' | 'addons'>('packages');
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [selectedAddons, setSelectedAddons] = useState<any[]>([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [customizingPackage, setCustomizingPackage] = useState<any>(null);

  const currentItems = view === 'packages' ? packages : addons;

  const handleSelectPackage = (pkg: any) => {
    setSelectedPackage(pkg);
  };

  const handleCustomizeComplete = (customizedPackage: any) => {
    setSelectedPackage(customizedPackage);
    setCustomizingPackage(null);
  };

  const handleToggleAddon = (addon: any) => {
    const isSelected = selectedAddons.find((a) => a.id === addon.id);
    if (isSelected) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const calculateTotal = () => {
    const packagePrice = selectedPackage?.price || 0;
    const addonsPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    return packagePrice + addonsPrice;
  };

  const handleContinue = () => {
    const selectedItems = {
      package: selectedPackage,
      addons: selectedAddons,
      total: calculateTotal(),
    };
    onComplete({ catalogItems: selectedItems });
  };

  const totalSelectedItems = (selectedPackage ? 1 : 0) + selectedAddons.length;

  const vitalStats = caseData.vitalStats || {};
  const decedentName = `${vitalStats.firstName || ''} ${vitalStats.lastName || ''}`.trim() || 'Family';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-32">
      {/* View Details Modal */}
      {customizingPackage && (
        <PackageCustomizer
          packageData={customizingPackage}
          onComplete={handleCustomizeComplete}
          onClose={() => setCustomizingPackage(null)}
        />
      )}

      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h2 className="text-gray-900 mb-2">Choose Services & Add-Ons</h2>
            <p className="text-gray-600">Select packages and services for your loved one's memorial</p>
          </div>
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            <Share2 className="w-5 h-5" />
            <span className="hidden sm:inline">Share with Family</span>
          </button>
        </div>
      </div>

      {/* Catalog Complete Indicator */}
      {selectedPackage && (
        <div className="mb-6 bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-xl p-4 flex items-center gap-3">
          <div className="w-2 h-2 bg-teal-600 rounded-full animate-pulse" />
          <p className="text-teal-700">✓ Catalog Complete — Forms Ready. The GPL and itemized breakdown will be generated automatically.</p>
        </div>
      )}

      {/* View Toggle */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setView('packages')}
          className={`flex-1 sm:flex-none px-6 py-3 rounded-lg transition-colors ${
            view === 'packages'
              ? 'bg-teal-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          <Package className="w-5 h-5 inline-block mr-2" />
          Packages
        </button>
        <button
          onClick={() => setView('addons')}
          className={`flex-1 sm:flex-none px-6 py-3 rounded-lg transition-colors ${
            view === 'addons'
              ? 'bg-teal-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          <Plus className="w-5 h-5 inline-block mr-2" />
          Add-Ons
        </button>
      </div>

      {/* Items Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((item) => {
          const isPackage = item.category === 'package';
          const isSelected = isPackage
            ? selectedPackage?.id === item.id
            : selectedAddons.find((a) => a.id === item.id);

          return (
            <div
              key={item.id}
              onClick={() => {
                if (isPackage) {
                  setCustomizingPackage(item);
                }
              }}
              className={`group bg-white rounded-xl overflow-hidden shadow-sm border-2 transition-all cursor-pointer ${
                isSelected
                  ? 'border-teal-600 shadow-lg'
                  : 'border-gray-200 hover:shadow-lg hover:border-teal-300'
              }`}
            >
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <ImageWithFallback
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {isSelected && (
                  <div className="absolute top-3 right-3 w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-teal-700">${item.price.toLocaleString()}</span>
                  {isSelected && (
                    <span className="text-teal-700 text-sm bg-teal-50 px-3 py-1 rounded-full">
                      Selected
                    </span>
                  )}
                </div>

                {/* Add to Selection Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click when clicking button
                    if (isPackage) {
                      setCustomizingPackage(item);
                    } else {
                      handleToggleAddon(item);
                    }
                  }}
                  className={`w-full py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    isSelected
                      ? 'bg-teal-50 text-teal-700 border-2 border-teal-600'
                      : isPackage
                      ? 'bg-teal-600 text-white hover:bg-teal-700'
                      : 'bg-teal-600 text-white hover:bg-teal-700'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-5 h-5" />
                      Selected
                    </>
                  ) : isPackage ? (
                    <>
                      <Package className="w-5 h-5" />
                      Select Package
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Add to Selection
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky Footer */}
      {totalSelectedItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-teal-600 shadow-lg p-4 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-6 h-6 text-teal-700" />
              <div>
                <p className="text-gray-600 text-sm">Selected Items</p>
                <p className="text-teal-700">
                  {totalSelectedItems} item{totalSelectedItems !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <div className="text-right mr-4">
              <p className="text-gray-600 text-sm">Total</p>
              <p className="text-teal-700">${calculateTotal().toLocaleString()}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onBack}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleContinue}
                disabled={!selectedPackage}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Items
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <ShareCatalogModal
          caseId={caseData.id || 'CASE-TEMP'}
          decedentName={decedentName}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
}