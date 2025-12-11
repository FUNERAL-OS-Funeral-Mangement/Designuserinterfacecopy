import { useState } from 'react';
import { Package, Plus, Check, ShoppingCart, Send, Heart, Eye, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCaseStore } from '../store/useCaseStore';

const packages = [
  {
    id: 'pkg-basic',
    name: 'Basic Service Package',
    description: 'Essential services for a dignified memorial',
    price: 2500,
    category: 'package' as const,
    imageUrl: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400',
    included: [
      'Basic services of funeral director and staff',
      'Transfer of remains to funeral home',
      'Embalming or refrigeration',
      'Basic memorial service at funeral home',
      'Use of facilities for viewing (1 day)',
      'Coordination with cemetery/crematory',
      'Assistance with death certificates and permits',
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
      'All Basic Package services',
      'Extended facility use (2 days)',
      'Audio/visual equipment for slideshows',
      'Memory table setup',
      'Guest register book',
      'Memorial folders (100 count)',
      'Online obituary posting',
      'Reception coordination (up to 50 guests)',
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
      'All Celebration Package services',
      'Extended facility use (3 days)',
      'Premium casket or urn selection',
      'Professional tribute video production',
      'Customized memorial website (1 year)',
      'Transportation in luxury vehicle',
      'Floral arrangement coordination',
      'Live streaming service',
      'Memorial DVD copies (10 count)',
      'Personalized keepsakes for family',
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
      'Basic services of funeral director',
      'Transfer of remains',
      'Refrigeration (up to 5 days)',
      'Crematory fees',
      'Basic cremation container',
      'Basic urn',
      'Assistance with permits and certificates',
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
      'All Basic Package services',
      'Casket selection assistance',
      'Graveside service coordination',
      'Hearse and lead car',
      'Cemetery coordination',
      'Flower car service',
      'Burial vault arrangements',
      'Extended viewing (2 days)',
      'Memorial folders (150 count)',
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
    details: 'Beautifully designed prayer cards featuring your loved one\'s photo, name, dates, and a meaningful prayer or verse. Professionally printed on premium cardstock.',
  },
  {
    id: 'addon-program-4pg',
    name: 'Memorial Program (4-page)',
    description: 'Professionally designed 4-page memorial program',
    price: 200,
    category: 'addon' as const,
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400',
    details: 'Elegant 4-page memorial program including order of service, obituary, photo, and acknowledgments. Custom design with your choice of colors and themes.',
  },
  {
    id: 'addon-program-8pg',
    name: 'Memorial Program (8-page)',
    description: 'Professionally designed 8-page memorial program',
    price: 320,
    category: 'addon' as const,
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400',
    details: 'Comprehensive 8-page program with extended photo gallery, life story, favorite memories, and detailed order of service. Multiple layout options available.',
  },
  {
    id: 'addon-program-12pg',
    name: 'Memorial Program (12-page)',
    description: 'Professionally designed 12-page memorial program',
    price: 450,
    category: 'addon' as const,
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400',
    details: 'Premium 12-page keepsake program featuring extensive photo collection, complete life history, family tree, and personalized tributes. Magazine-quality printing.',
  },
  {
    id: 'addon-acknowledgment',
    name: 'Acknowledgment Cards',
    description: 'Thank you cards for attendees (set of 50)',
    price: 120,
    category: 'addon' as const,
    imageUrl: 'https://images.unsplash.com/photo-1587845750216-a2aa8cb9cd9e?w=400',
    details: 'Thoughtful thank you cards to send to those who attended the service or sent condolences. Includes matching envelopes and custom message.',
  },
  {
    id: 'addon-photo-enlargement',
    name: 'Photo Enlargements',
    description: 'Professional photo enlargement and framing',
    price: 250,
    category: 'addon' as const,
    imageUrl: 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=400',
    details: 'Professional enlargement of your chosen photo (up to 20x30"), mounted and framed for display at the service. Available in multiple frame styles.',
  },
  {
    id: 'addon-tribute-video',
    name: 'Tribute Video / Slideshow',
    description: 'Professional video tribute with music',
    price: 400,
    category: 'addon' as const,
    imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400',
    details: 'Professional video montage with up to 50 photos, custom music selection, transitions, and titles. Includes DVD copies and digital file for family.',
  },
  {
    id: 'addon-dove-release',
    name: 'Dove Release',
    description: 'Ceremonial white dove release',
    price: 350,
    category: 'addon' as const,
    imageUrl: 'https://images.unsplash.com/photo-1551198509-a025f0a3d3cb?w=400',
    details: 'Symbolic release of white doves at the conclusion of the service. Includes handler, up to 6 doves, and coordination with ceremony timeline.',
  },
  {
    id: 'addon-limousine',
    name: 'Limousine',
    description: 'Professional limousine service for family',
    price: 450,
    category: 'addon' as const,
    imageUrl: 'https://images.unsplash.com/photo-1567225591450-0bd5ff4b5e4f?w=400',
    details: 'Luxury limousine service for immediate family (up to 8 passengers). Includes transportation to and from the service, with professional chauffeur.',
  },
  {
    id: 'addon-floral',
    name: 'Floral Arrangements',
    description: 'Custom floral arrangements and wreaths',
    price: 300,
    category: 'addon' as const,
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400',
    details: 'Custom floral arrangements in your choice of flowers and colors. Includes casket spray or altar arrangement. Coordinated with your florist of choice.',
  },
  {
    id: 'addon-website',
    name: 'Memorial Website Page',
    description: 'Dedicated online memorial page (1 year hosting)',
    price: 180,
    category: 'addon' as const,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    details: 'Personalized memorial website with photo gallery, guestbook, service information, and donation links. Mobile-friendly design with 1 year of hosting included.',
  },
  {
    id: 'addon-guest-register',
    name: 'Guest Register Book',
    description: 'Elegant guest book with custom cover',
    price: 85,
    category: 'addon' as const,
    imageUrl: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=400',
    details: 'Premium guest register book with personalized cover featuring your loved one\'s name and dates. Quality paper and elegant binding for lasting keepsake.',
  },
  {
    id: 'addon-cremation-jewelry',
    name: 'Cremation Jewelry',
    description: 'Memorial pendant for cremated remains',
    price: 220,
    category: 'addon' as const,
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
    details: 'Sterling silver memorial pendant with discreet chamber for a small portion of cremated remains. Includes chain and presentation box. Multiple styles available.',
  },
];

interface FamilyCatalogViewProps {
  onCreateCase?: (catalogData: any) => void;
  caseId?: string;
}

export function FamilyCatalogView({ onCreateCase, caseId }: FamilyCatalogViewProps = {}) {
  const addCatalogItemToCase = useCaseStore((state) => state.addCatalogItemToCase);
  const [view, setView] = useState<'packages' | 'addons'>('packages');
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [selectedAddons, setSelectedAddons] = useState<any[]>([]);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showCaseOption, setShowCaseOption] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<any>(null);
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

  const handleSubmit = () => {
    // In production, this would save to database and notify funeral director
    setSubmitted(true);
  };

  const totalSelectedItems = (selectedPackage ? 1 : 0) + selectedAddons.length;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8 text-center">
          <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-gray-900 mb-4">Thank You</h1>
          <p className="text-gray-600 mb-6">
            Your selections have been submitted to your funeral director for review. They will reach out to you
            shortly to finalize the arrangements.
          </p>
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6">
            <p className="text-teal-900 text-sm">
              <strong>What happens next:</strong> Your funeral director will review your selections and contact you
              to discuss any questions or adjustments. You can still make changes at any time.
            </p>
          </div>
          <p className="text-gray-500 text-sm">
            If you have any immediate questions, please don't hesitate to call your funeral director.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      {/* Details Modal */}
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
                {viewDetailsItem.category === 'package' && viewDetailsItem.included && (
                  <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm">
                    {viewDetailsItem.included.length} Services Included
                  </span>
                )}
              </div>

              {viewDetailsItem.category === 'package' && viewDetailsItem.included && (
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

              {viewDetailsItem.details && (
                <div className="mb-6">
                  <h3 className="text-gray-900 mb-3">Details</h3>
                  <p className="text-gray-700 leading-relaxed">{viewDetailsItem.details}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    if (viewDetailsItem.category === 'package') {
                      handleSelectPackage(viewDetailsItem);
                    } else {
                      handleToggleAddon(viewDetailsItem);
                    }
                    setViewDetailsItem(null);
                  }}
                  className="flex-1 py-3 px-6 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  {viewDetailsItem.category === 'package' ? 'Select This Package' : 'Add This Item'}
                </button>
                <button
                  onClick={() => setViewDetailsItem(null)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-6 h-6 text-teal-600" />
            <h1 className="text-teal-700">Memorial Services Catalog</h1>
          </div>
          <p className="text-gray-600">
            Take your time browsing our services. Select what feels right to honor your loved one's memory.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
        {/* Gentle Message */}
        <div className="bg-white border border-teal-200 rounded-xl p-6 mb-8">
          <p className="text-gray-700">
            We understand this is a difficult time. Please know that there's no pressure — you can take as much
            time as you need to make your selections. Your funeral director will review everything with you before
            anything is finalized.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setView('packages')}
            className={`flex-1 sm:flex-none px-6 py-3 rounded-lg transition-colors ${
              view === 'packages'
                ? 'bg-teal-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Package className="w-5 h-5 inline-block mr-2" />
            Service Packages
          </button>
          <button
            onClick={() => setView('addons')}
            className={`flex-1 sm:flex-none px-6 py-3 rounded-lg transition-colors ${
              view === 'addons'
                ? 'bg-teal-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Plus className="w-5 h-5 inline-block mr-2" />
            Additional Items
          </button>
        </div>

        {/* Items Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentItems.map((item) => {
            const isPackage = item.category === 'package';
            const isSelected = isPackage
              ? selectedPackage?.id === item.id
              : selectedAddons.find((a) => a.id === item.id);

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`bg-white rounded-xl overflow-hidden shadow-md border-2 transition-all relative group ${
                  isSelected
                    ? 'border-teal-600 shadow-xl'
                    : 'border-gray-200 hover:shadow-xl hover:border-teal-300'
                }`}
              >
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <ImageWithFallback
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {isSelected && (
                    <div className="absolute top-3 right-3 w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center shadow-lg z-10">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-teal-700">${item.price.toLocaleString()}</span>
                    {isSelected && (
                      <span className="text-teal-700 text-sm bg-teal-50 px-3 py-1 rounded-full flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        Selected
                      </span>
                    )}
                  </div>

                  {/* View More Details Button - Only for Packages */}
                  {isPackage && (
                    <button
                      onClick={() => setViewDetailsItem(item)}
                      className="w-full py-3 px-4 mb-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    >
                      <Eye className="w-5 h-5" />
                      View More Details
                    </button>
                  )}

                  {/* Select Button */}
                  <button
                    onClick={() =>
                      isPackage ? handleSelectPackage(item) : handleToggleAddon(item)
                    }
                    className={`w-full py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                      isSelected
                        ? 'bg-teal-50 text-teal-700 border-2 border-teal-600'
                        : 'bg-teal-600 text-white hover:bg-teal-700 shadow-md'
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
                        Select This {isPackage ? 'Package' : 'Item'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notes Section */}
        {totalSelectedItems > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md">
            <h3 className="text-gray-900 mb-3">Additional Notes (Optional)</h3>
            <p className="text-gray-600 text-sm mb-3">
              Share any thoughts, preferences, or questions with your funeral director.
            </p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="For example: 'We'd like the prayer cards to have a specific Bible verse' or 'Please call us to discuss the memorial program design'"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        )}
      </div>

      {/* Sticky Footer */}
      {totalSelectedItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-teal-600 shadow-2xl p-4 z-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <ShoppingCart className="w-6 h-6 text-teal-700" />
                <div>
                  <p className="text-gray-600 text-sm">Your Selections</p>
                  <p className="text-teal-700">
                    {totalSelectedItems} item{totalSelectedItems !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              <div className="text-center w-full sm:w-auto">
                <p className="text-gray-600 text-sm">Estimated Total</p>
                <p className="text-teal-700">${calculateTotal().toLocaleString()}</p>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!selectedPackage}
                className="w-full sm:w-auto px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Submit to Funeral Director
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
