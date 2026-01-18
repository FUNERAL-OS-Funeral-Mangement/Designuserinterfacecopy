import { useState } from 'react';
import { ArrowLeft, Search, Package, Check, Info, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CasketItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  material: string;
  interior: string;
  features: string[];
  imageUrl?: string;
}

interface CasketCatalogProps {
  onBack: () => void;
  onSelect?: (casket: CasketItem) => void;
  selectedCasketId?: string;
  mode?: 'selection' | 'management'; // selection = case flow, management = admin edit
}

const casketData: CasketItem[] = [
  {
    id: 'casket-oak-serenity',
    name: 'Serenity Oak Casket',
    description: 'Solid oak construction with champagne velvet interior',
    price: 3200,
    category: 'Wood Caskets',
    material: 'Solid Oak',
    interior: 'Champagne Velvet',
    features: ['Hand-crafted corners', 'Adjustable bed', 'Memory drawer'],
    imageUrl: 'https://images.unsplash.com/photo-1523413363574-c30aa1c2a516?w=600',
  },
  {
    id: 'casket-steel-eternal',
    name: 'Eternal Rest Steel Casket',
    description: '18-gauge steel with protective seal and crepe interior',
    price: 2400,
    category: 'Metal Caskets',
    material: '18-Gauge Steel',
    interior: 'Crepe',
    features: ['Protective gasket seal', 'Rust-resistant finish', 'Swing bar handles'],
    imageUrl: 'https://images.unsplash.com/photo-1565538420870-da08ff96a207?w=600',
  },
  {
    id: 'casket-mahogany-heritage',
    name: 'Heritage Mahogany Casket',
    description: 'Premium mahogany with hand-carved details and silk interior',
    price: 5800,
    category: 'Premium Wood',
    material: 'Solid Mahogany',
    interior: 'Silk',
    features: ['Hand-carved details', 'Premium hardware', 'Dual sealing system', 'Memory tube'],
    imageUrl: 'https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=600',
  },
  {
    id: 'casket-pine-simple',
    name: 'Simple Pine Casket',
    description: 'Natural pine construction, eco-friendly option',
    price: 1200,
    category: 'Eco-Friendly',
    material: 'Natural Pine',
    interior: 'Cotton',
    features: ['Biodegradable materials', 'Simple design', 'Natural finish'],
    imageUrl: 'https://images.unsplash.com/photo-1545239705-1564e58b9e4a?w=600',
  },
  {
    id: 'casket-bronze-legacy',
    name: 'Legacy Bronze Casket',
    description: 'Premium bronze construction with timeless design',
    price: 8900,
    category: 'Premium Metal',
    material: 'Solid Bronze',
    interior: 'Velvet',
    features: ['Solid bronze construction', 'Lifetime guarantee', 'Museum-quality finish', 'Engraving available'],
    imageUrl: 'https://images.unsplash.com/photo-1593642532400-2682810df593?w=600',
  },
  {
    id: 'casket-cherry-classic',
    name: 'Classic Cherry Casket',
    description: 'Beautiful cherry wood with satin interior',
    price: 4100,
    category: 'Wood Caskets',
    material: 'Cherry Wood',
    interior: 'Satin',
    features: ['Rich cherry finish', 'Brass hardware', 'Adjustable interior'],
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600',
  },
  {
    id: 'casket-copper-radiance',
    name: 'Radiance Copper Casket',
    description: '32-oz solid copper with exceptional durability',
    price: 7200,
    category: 'Premium Metal',
    material: '32-oz Copper',
    interior: 'Velvet',
    features: ['Solid copper construction', 'Superior protection', 'Hand-polished finish', 'Premium lining'],
    imageUrl: 'https://images.unsplash.com/photo-1584907797015-7554cd315667?w=600',
  },
  {
    id: 'casket-willow-nature',
    name: 'Nature's Rest Willow Casket',
    description: 'Handwoven willow, fully biodegradable',
    price: 1600,
    category: 'Eco-Friendly',
    material: 'Woven Willow',
    interior: 'Cotton',
    features: ['100% biodegradable', 'Handcrafted', 'Natural materials', 'Eco-certified'],
    imageUrl: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600',
  },
];

export function CasketCatalog({ 
  onBack, 
  onSelect, 
  selectedCasketId,
  mode = 'selection' 
}: CasketCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewingCasket, setViewingCasket] = useState<CasketItem | null>(null);

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(casketData.map(c => c.category)))];

  // Filter caskets
  const filteredCaskets = casketData.filter(casket => {
    const matchesSearch = casket.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         casket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         casket.material.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || casket.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back</span>
              </button>
              <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
              <div>
                <h1 className="text-gray-900">Casket Selection</h1>
                <p className="text-sm text-gray-500 hidden sm:block">
                  Choose a casket that honors their memory
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto">
        {/* Search & Filters */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search caskets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            Showing {filteredCaskets.length} {filteredCaskets.length === 1 ? 'casket' : 'caskets'}
          </p>
        </div>

        {/* Casket Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCaskets.map((casket) => (
            <CasketCard
              key={casket.id}
              casket={casket}
              isSelected={selectedCasketId === casket.id}
              onSelect={() => onSelect?.(casket)}
              onViewDetails={() => setViewingCasket(casket)}
              mode={mode}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredCaskets.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">No caskets found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </main>

      {/* Casket Detail Modal */}
      {viewingCasket && (
        <CasketDetailModal
          casket={viewingCasket}
          isSelected={selectedCasketId === viewingCasket.id}
          onClose={() => setViewingCasket(null)}
          onSelect={() => {
            onSelect?.(viewingCasket);
            setViewingCasket(null);
          }}
        />
      )}
    </div>
  );
}

// Casket Card Component
function CasketCard({
  casket,
  isSelected,
  onSelect,
  onViewDetails,
  mode,
}: {
  casket: CasketItem;
  isSelected: boolean;
  onSelect: () => void;
  onViewDetails: () => void;
  mode: 'selection' | 'management';
}) {
  return (
    <div
      className={`bg-white rounded-xl border-2 transition-all overflow-hidden group ${
        isSelected
          ? 'border-teal-500 shadow-lg shadow-teal-100'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
      }`}
    >
      {/* Image */}
      <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        {casket.imageUrl ? (
          <img
            src={casket.imageUrl}
            alt={casket.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-16 h-16 text-gray-300" />
          </div>
        )}
        
        {/* Selected Badge */}
        {isSelected && (
          <div className="absolute top-3 right-3 bg-teal-500 text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 shadow-lg">
            <Check className="w-4 h-4" />
            Selected
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-gray-700">
          {casket.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-gray-900 mb-2">{casket.name}</h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {casket.description}
        </p>

        {/* Specs */}
        <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Material</span>
            <span className="text-gray-900">{casket.material}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Interior</span>
            <span className="text-gray-900">{casket.interior}</span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="text-2xl text-gray-900">
            ${casket.price.toLocaleString()}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onViewDetails}
            className="flex-1 px-4 py-2.5 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Details
          </button>
          {mode === 'selection' && (
            <button
              onClick={onSelect}
              className={`flex-1 px-4 py-2.5 rounded-lg transition-colors text-sm flex items-center justify-center gap-2 ${
                isSelected
                  ? 'bg-teal-600 text-white hover:bg-teal-700'
                  : 'bg-teal-600 text-white hover:bg-teal-700'
              }`}
            >
              {isSelected ? (
                <>
                  <Check className="w-4 h-4" />
                  Selected
                </>
              ) : (
                'Select'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Casket Detail Modal
function CasketDetailModal({
  casket,
  isSelected,
  onClose,
  onSelect,
}: {
  casket: CasketItem;
  isSelected: boolean;
  onClose: () => void;
  onSelect: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Image Header */}
        <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 relative">
          {casket.imageUrl ? (
            <img
              src={casket.imageUrl}
              alt={casket.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="w-24 h-24 text-gray-300" />
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:bg-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-gray-900 flex-1">{casket.name}</h2>
              <div className="text-2xl text-gray-900">
                ${casket.price.toLocaleString()}
              </div>
            </div>
            <p className="text-gray-600">{casket.description}</p>
          </div>

          {/* Specifications */}
          <div className="mb-6 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5" />
              Specifications
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Category</p>
                <p className="text-gray-900">{casket.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Material</p>
                <p className="text-gray-900">{casket.material}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Interior</p>
                <p className="text-gray-900">{casket.interior}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Price</p>
                <p className="text-gray-900">${casket.price.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="text-gray-900 mb-4">Features</h3>
            <ul className="space-y-2">
              {casket.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-600">
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full flex-shrink-0"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
            >
              Close
            </button>
            <button
              onClick={onSelect}
              className={`flex-1 px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                isSelected
                  ? 'bg-teal-600 text-white hover:bg-teal-700'
                  : 'bg-teal-600 text-white hover:bg-teal-700'
              }`}
            >
              {isSelected ? (
                <>
                  <Check className="w-5 h-5" />
                  Selected
                </>
              ) : (
                'Select This Casket'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
