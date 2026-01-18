import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Package, Plus, ShoppingCart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const packages = [
  {
    id: 'pkg-basic',
    name: 'Basic Service Package',
    description: 'Essential services for a dignified memorial',
    price: 2500,
    category: 'package' as const,
    imageUrl: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400',
  },
  {
    id: 'pkg-celebration',
    name: 'Celebration of Life Package',
    description: 'Comprehensive celebration with personalized touches',
    price: 4200,
    category: 'package' as const,
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f29da8c43f?w=400',
  },
  {
    id: 'pkg-premium',
    name: 'Premium Memorial Package',
    description: 'Full-service premium memorial experience',
    price: 6500,
    category: 'package' as const,
    imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400',
  },
  {
    id: 'pkg-cremation',
    name: 'Direct Cremation Package',
    description: 'Simple and respectful cremation service',
    price: 1800,
    category: 'package' as const,
    imageUrl: 'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=400',
  },
  {
    id: 'pkg-burial',
    name: 'Burial Package',
    description: 'Traditional burial service with full arrangements',
    price: 5200,
    category: 'package' as const,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
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

export function FamilyCatalog() {
  const { addItem, selectedItems, getTotalPrice, contractGenerating } = useStore();
  const [view, setView] = useState<'packages' | 'addons'>('packages');

  const currentItems = view === 'packages' ? packages : addons;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-teal-700 mb-2">Choose Services & Add-Ons</h1>
        <p className="text-gray-600">Select packages and services for your loved one's memorial</p>
      </div>

      {/* Contract Generation Indicator */}
      {contractGenerating && selectedItems.length > 0 && (
        <div className="mb-6 bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-xl p-4 flex items-center gap-3">
          <div className="w-2 h-2 bg-teal-600 rounded-full animate-pulse" />
          <p className="text-teal-700">Contract is being generated automatically as items are selected</p>
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        {currentItems.map((item) => {
          const isSelected = selectedItems.find(i => i.id === item.id);
          
          return (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <ImageWithFallback
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
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
                
                <button
                  onClick={() => addItem(item)}
                  className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add to Selection
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky Footer */}
      {selectedItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-teal-600 shadow-lg p-4 z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-6 h-6 text-teal-700" />
              <div>
                <p className="text-gray-600 text-sm">Selected Items</p>
                <p className="text-teal-700">
                  {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-gray-600 text-sm">Total</p>
              <p className="text-teal-700">${getTotalPrice().toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
