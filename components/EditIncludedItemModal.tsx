import { X, CheckCircle2, ChevronLeft, ChevronRight, Plus, Trash2, Upload } from 'lucide-react';
import { useState } from 'react';

interface IncludedItemDetail {
  title: string;
  description: string;
  explanation: string;
  images: string[];
  whyItMatters?: string;
}

interface EditIncludedItemModalProps {
  onClose: () => void;
  includedItemsData: Record<string, IncludedItemDetail>;
  itemKey: string;
  onSave: (itemKey: string, updatedItem: IncludedItemDetail) => void;
}

export function EditIncludedItemModal({ onClose, includedItemsData, itemKey, onSave }: EditIncludedItemModalProps) {
  const item = includedItemsData[itemKey];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [editedItem, setEditedItem] = useState<IncludedItemDetail>(item);
  
  if (!item) return null;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? editedItem.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === item.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleAddImage = () => {
    const newImageUrl = prompt('Enter image URL:');
    if (newImageUrl) {
      setEditedItem({
        ...editedItem,
        images: [...editedItem.images, newImageUrl]
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    if (editedItem.images.length <= 1) {
      alert('Must have at least one image');
      return;
    }
    const newImages = editedItem.images.filter((_, i) => i !== index);
    setEditedItem({
      ...editedItem,
      images: newImages
    });
    if (currentImageIndex >= newImages.length) {
      setCurrentImageIndex(newImages.length - 1);
    }
  };

  const handleSave = () => {
    onSave(itemKey, editedItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-5 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <div className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded mb-2">
                Editing Included Item
              </div>
              <h2 className="text-gray-900 mb-1">Edit Item Details</h2>
              <p className="text-gray-600 text-sm">Update the information families will see</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-8 space-y-6">
          {/* Title & Description */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Item Title</label>
              <input
                type="text"
                value={editedItem.title}
                onChange={(e) => setEditedItem({ ...editedItem, title: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Short Description</label>
              <input
                type="text"
                value={editedItem.description}
                onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
          </div>

          {/* Image Slideshow */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Images</label>
            <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-[16/10]">
              <img
                src={editedItem.images[currentImageIndex]}
                alt={editedItem.title}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              {editedItem.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-gray-900 rounded-full flex items-center justify-center transition-colors shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-gray-900 rounded-full flex items-center justify-center transition-colors shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1.5 rounded-full">
                    {currentImageIndex + 1} / {editedItem.images.length}
                  </div>
                </>
              )}

              {/* Delete Current Image Button */}
              <button
                onClick={() => handleRemoveImage(currentImageIndex)}
                className="absolute top-4 right-4 w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
                title="Delete this image"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {/* Add Image Button */}
            <button
              onClick={handleAddImage}
              className="mt-3 w-full px-4 py-3 border-2 border-dashed border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Another Image
            </button>

            {/* Image URLs List */}
            <div className="mt-4 space-y-2">
              <label className="block text-sm text-gray-700">Current Images:</label>
              {editedItem.images.map((url, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded">
                  <span className="flex-shrink-0">#{index + 1}</span>
                  <span className="truncate flex-1">{url}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Explanation */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              What This Means
              <span className="text-gray-500 ml-2">(Main explanation for families)</span>
            </label>
            <textarea
              value={editedItem.explanation}
              onChange={(e) => setEditedItem({ ...editedItem, explanation: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-lg focus:outline-none focus:border-gray-400 transition-colors resize-none"
            />
          </div>

          {/* Why It Matters */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Why This Matters
              <span className="text-gray-500 ml-2">(Optional empathy-focused message)</span>
            </label>
            <textarea
              value={editedItem.whyItMatters || ''}
              onChange={(e) => setEditedItem({ ...editedItem, whyItMatters: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-lg focus:outline-none focus:border-gray-400 transition-colors resize-none"
            />
          </div>

          {/* Preview Notice */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <span className="text-gray-900">💡 Preview Tip:</span> These changes will be visible to families when they click on this item in the catalog.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-700 hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}