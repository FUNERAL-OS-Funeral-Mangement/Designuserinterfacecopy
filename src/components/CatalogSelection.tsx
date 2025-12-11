import { useState } from 'react';
import { Package, Plus, Check, ShoppingCart, Share2, Users, Eye, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ShareCatalogModal } from './ShareCatalogModal';

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
      'Transfer of remains to funeral home',
      'Basic preparation and embalming',
      'Use of facilities for viewing (2 hours)',
      'Use of facilities for funeral ceremony',
      'Hearse for local transportation',
      'Basic memorial folders (25)',
      'Professional staff services and coordination',
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
      'All services from Basic Package',
      'Extended viewing time (4 hours)',
      'Personalized memorial video/slideshow',
      'Custom memorial programs (100)',
      'Memory table setup with photos',
      'Reception area for refreshments',
      'Digital memorial webpage',
      'Professional photography during service',
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
      'All services from Celebration Package',
      'Unlimited viewing time',
      'Premium casket selection assistance',
      'Limousine service for family',
      'Custom floral arrangements',
      'Live streaming of service',
      'Premium memorial programs (200)',
      'Guest register book with custom cover',
      'Thank you acknowledgment cards (100)',
      'Dove release ceremony',
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
      'Transfer of remains to funeral home',
      'Refrigeration and care of remains',
      'Cremation process',
      'Basic urn or temporary container',
      'All required permits and documentation',
      'Return of cremated remains to family',
      'Professional staff coordination',
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
      'Transfer of remains to funeral home',
      'Embalming and preparation',
      'Use of facilities for viewing (4 hours)',
      'Use of facilities for funeral ceremony',
      'Graveside service coordination',
      'Hearse and flower vehicle',
      'Casket selection assistance',
      'Burial vault arrangement',
      'Cemetery coordination',
      'Memorial programs (100)',
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
  const [viewDetailsItem, setViewDetailsItem] = useState<any>(null);

  const currentItems = view === 'packages' ? packages : addons;

  const handleSelectPackage = (pkg: any) => {
    setSelectedPackage(pkg);
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
      {viewDetailsItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in">
            {/* Modal Header with Image */}
            <div className="relative h-64 bg-gray-100">
              <ImageWithFallback
                src={viewDetailsItem.imageUrl}
                alt={viewDetailsItem.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <button
                onClick={() => setViewDetailsItem(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors shadow-lg"
              >
                <X className="w-5 h-5 text-gray-900" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-white mb-2">{viewDetailsItem.name}</h2>
                <p className="text-white/90 text-sm">{viewDetailsItem.description}</p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Package Price</p>
                  <p className="text-teal-700">${viewDetailsItem.price.toLocaleString()}</p>
                </div>
                {viewDetailsItem.included && (
                  <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm">
                    {viewDetailsItem.included.length} Services Included
                  </span>
                )}
              </div>

              {viewDetailsItem.included && (
                <div className="mb-6">
                  <h3 className="text-gray-900 mb-4">What's Included</h3>
                  <div className="space-y-3">
                    {viewDetailsItem.included.map((service: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-teal-600" />
                        </div>
                        <p className="text-gray-700 text-sm">{service}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setViewDetailsItem(null)}
                  className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    if (viewDetailsItem.category === 'package') {
                      handleSelectPackage(viewDetailsItem);
                    } else {
                      handleToggleAddon(viewDetailsItem);
                    }
                    setViewDetailsItem(null);
                  }}
                  className="flex-1 py-3 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Select This Package
                </button>
              </div>
            </div>
          </div>
        </div>
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
              className={`group bg-white rounded-xl overflow-hidden shadow-sm border-2 transition-all ${
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
                
                {/* Enter Package Details Button - Overlay on Image - Shows on Hover */}
                {isPackage && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <button
                      onClick={() => setViewDetailsItem(item)}
                      className="py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform scale-95 group-hover:scale-100"
                    >
                      <Eye className="w-5 h-5" />
                      Enter Package Details
                    </button>
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
                  onClick={() =>
                    isPackage ? handleSelectPackage(item) : handleToggleAddon(item)
                  }
                  className={`w-full py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    isSelected
                      ? 'bg-teal-50 text-teal-700 border-2 border-teal-600'
                      : 'bg-teal-600 text-white hover:bg-teal-700'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-5 h-5" />
                      Selected
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
