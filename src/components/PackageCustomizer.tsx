import { useState } from 'react';
import { X, Check, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { includedItemsData } from './IncludedItemModal';

interface PackageCustomizerProps {
  packageData: any;
  onComplete: (customizedPackage: any) => void;
  onClose: () => void;
}

export function PackageCustomizer({ packageData, onComplete, onClose }: PackageCustomizerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [acceptedItems, setAcceptedItems] = useState<Set<number>>(new Set());
  const [removedItems, setRemovedItems] = useState<Set<number>>(new Set());
  const [showSummary, setShowSummary] = useState(false);

  const totalItems = packageData.included.length;
  const currentItem = packageData.included[currentIndex];
  const itemKey = currentItem?.key;
  const itemDetails = itemKey ? includedItemsData[itemKey] : null;

  const isAccepted = acceptedItems.has(currentIndex);
  const isRemoved = removedItems.has(currentIndex);

  // Calculate dynamic pricing
  const calculateCurrentPrice = () => {
    let total = 0;
    packageData.included.forEach((service: any, idx: number) => {
      if (!removedItems.has(idx)) {
        total += service.value || 0;
      }
    });
    return total;
  };

  const currentPrice = calculateCurrentPrice();
  const priceAdjustment = packageData.price - currentPrice;

  const handleAccept = () => {
    const newAccepted = new Set(acceptedItems);
    newAccepted.add(currentIndex);
    setAcceptedItems(newAccepted);
    
    const newRemoved = new Set(removedItems);
    newRemoved.delete(currentIndex);
    setRemovedItems(newRemoved);

    // Auto-advance to next item
    if (currentIndex < totalItems - 1) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 300);
    } else {
      // Last item - show summary
      setTimeout(() => setShowSummary(true), 300);
    }
  };

  const handleRemove = () => {
    const newRemoved = new Set(removedItems);
    newRemoved.add(currentIndex);
    setRemovedItems(newRemoved);
    
    const newAccepted = new Set(acceptedItems);
    newAccepted.delete(currentIndex);
    setAcceptedItems(newAccepted);

    // Auto-advance to next item
    if (currentIndex < totalItems - 1) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 300);
    } else {
      // Last item - show summary
      setTimeout(() => setShowSummary(true), 300);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSkip = () => {
    if (currentIndex < totalItems - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleComplete = () => {
    const finalIncluded = packageData.included.filter((_: any, idx: number) => 
      !removedItems.has(idx)
    );
    
    onComplete({
      ...packageData,
      included: finalIncluded,
      price: currentPrice,
      customized: true,
      removedCount: removedItems.size
    });
  };

  // Summary View
  if (showSummary) {
    const acceptedCount = totalItems - removedItems.size;
    const removedCount = removedItems.size;

    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div>
              <h2 className="text-gray-900">Package Summary</h2>
              <p className="text-sm text-gray-500 mt-1">{packageData.name}</p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stats */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg px-4 py-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Services Included</p>
                <p className="text-2xl text-gray-900">{acceptedCount}</p>
              </div>
              <div className="bg-white rounded-lg px-4 py-3 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Services Removed</p>
                <p className="text-2xl text-gray-900">{removedCount}</p>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {/* Included Services */}
            <div className="mb-6">
              <h3 className="text-sm text-gray-700 mb-3">Included Services</h3>
              <div className="space-y-2">
                {packageData.included.map((service: any, idx: number) => {
                  if (removedItems.has(idx)) return null;
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 bg-teal-50/50 rounded-lg border border-teal-100"
                    >
                      <div className="w-5 h-5 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700">{service.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Removed Services */}
            {removedCount > 0 && (
              <div className="mb-6">
                <h3 className="text-sm text-gray-700 mb-3">Removed Services</h3>
                <div className="space-y-2">
                  {packageData.included.map((service: any, idx: number) => {
                    if (!removedItems.has(idx)) return null;
                    return (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <X className="w-3 h-3 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-500 line-through">{service.label}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Pricing */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Original Package Price:</p>
                  <p className="text-sm text-gray-500 line-through">${packageData.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-blue-100">
                  <p className="text-gray-900">Adjusted Package Price:</p>
                  <p className="text-xl text-gray-900">${currentPrice.toLocaleString()}</p>
                </div>
                {priceAdjustment > 0 && (
                  <div className="flex items-center justify-between pt-2 border-t border-blue-100">
                    <p className="text-sm text-emerald-700">You Save:</p>
                    <p className="text-sm text-emerald-700">${priceAdjustment.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
            <button
              onClick={() => setShowSummary(false)}
              className="flex-1 py-2.5 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              Review Items
            </button>
            <button
              onClick={handleComplete}
              className="flex-1 py-2.5 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
            >
              Confirm Package
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Customization View
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header - Fixed */}
        <div className="flex-shrink-0">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-gray-900">Customize Your Package</h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  {currentIndex + 1} of {totalItems} services
                </p>
              </div>
            </div>

            {/* Progress Dots */}
            <div className="hidden sm:flex items-center gap-1.5">
              {Array.from({ length: totalItems }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx < currentIndex
                      ? 'w-6 bg-teal-600'
                      : idx === currentIndex
                      ? 'w-8 bg-teal-600'
                      : 'w-6 bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Price Display - Fixed */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">Current Package Total</p>
                <p className="text-2xl text-teal-600">${currentPrice.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-1">This Service</p>
                <p className="text-lg text-gray-700">${currentItem?.value?.toLocaleString() || '0'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Image Section */}
          {itemDetails && itemDetails.images && itemDetails.images.length > 0 ? (
            <div className="relative h-64 bg-gray-900">
              <ImageWithFallback
                src={itemDetails.images[0]}
                alt={itemDetails.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center border-b border-gray-200">
              <div className="text-center">
                <Info className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Service Information</p>
              </div>
            </div>
          )}

          {/* Content Section */}
          <div className="px-6 py-6">
            <div className="mb-6">
              <div className="inline-block bg-teal-50 text-teal-700 text-xs px-2.5 py-1 rounded-md mb-3">
                Included in Package
              </div>
              <h3 className="text-xl text-gray-900 mb-2">
                {itemDetails ? itemDetails.title : currentItem.label}
              </h3>
              {itemDetails && (
                <p className="text-gray-500 text-sm">{itemDetails.description}</p>
              )}
            </div>

            {/* What This Means */}
            {itemDetails && (
              <div className="mb-6">
                <h4 className="text-sm text-gray-900 mb-2">What This Means</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{itemDetails.explanation}</p>
              </div>
            )}

            {/* Why It Matters */}
            {itemDetails?.whyItMatters && (
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Info className="w-3 h-3 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm text-blue-900 mb-1">Why This Matters</h4>
                    <p className="text-sm text-blue-800 leading-relaxed">{itemDetails.whyItMatters}</p>
                  </div>
                </div>
              </div>
            )}

            {/* No Details Available */}
            {!itemDetails && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="text-sm text-gray-600">{currentItem.label}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="flex-shrink-0 border-t border-gray-100">
          {/* Navigation - Only Previous */}
          <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-b border-gray-100">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-2 text-sm">
              {isAccepted && (
                <span className="text-teal-600 flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  Accepted
                </span>
              )}
              {isRemoved && (
                <span className="text-gray-400 flex items-center gap-1">
                  <X className="w-4 h-4" />
                  Removed
                </span>
              )}
            </div>

            {currentIndex === totalItems - 1 && (
              <button
                onClick={() => setShowSummary(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Review Summary
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            {currentIndex < totalItems - 1 && (
              <div className="w-24" />
            )}
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-4 flex gap-3">
            <button
              onClick={handleRemove}
              className={`flex-1 py-3 rounded-lg transition-all text-sm ${
                isRemoved
                  ? 'bg-gray-100 text-gray-600 border border-gray-300'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              {isRemoved ? 'Removed' : 'Remove'}
            </button>
            <button
              onClick={handleAccept}
              className={`flex-1 py-3 rounded-lg transition-all text-sm flex items-center justify-center gap-2 ${
                isAccepted
                  ? 'bg-teal-50 text-teal-700 border border-teal-600'
                  : 'bg-teal-600 text-white hover:bg-teal-700'
              }`}
            >
              <Check className="w-4 h-4" />
              {isAccepted ? 'Accepted' : 'Accept'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}