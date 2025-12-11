import { Plus, FileText, Image, BookOpen } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useCaseStore } from '../../store/useCaseStore';

interface MemorialsTabProps {
  caseId: string;
}

export function MemorialsTab({ caseId }: MemorialsTabProps) {
  const catalogItems = useCaseStore((state) => state.getCatalogItems(caseId));
  const memorials = catalogItems?.memorials || [];

  // Fallback icon mapping
  const getIconForMemorial = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('card') || lowerName.includes('acknowledgment')) return FileText;
    if (lowerName.includes('photo') || lowerName.includes('image')) return Image;
    if (lowerName.includes('program') || lowerName.includes('book')) return BookOpen;
    return FileText;
  };

  const getStatusBadge = (status: 'draft' | 'completed' | 'ordered') => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-block px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs border border-emerald-200">
            Completed
          </span>
        );
      case 'draft':
        return (
          <span className="inline-block px-2.5 py-1 bg-gray-50 text-gray-700 text-xs border border-gray-200">
            Draft
          </span>
        );
      case 'ordered':
        return (
          <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 text-xs border border-blue-200">
            Ordered
          </span>
        );
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-gray-900 mb-1">Memorial Items</h2>
          <p className="text-gray-600">{memorials.length} items created</p>
        </div>
        <button className="px-4 py-2.5 bg-gray-900 text-white hover:bg-gray-800 transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Memorial
        </button>
      </div>

      {/* Memorials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {memorials.length > 0 ? (
          memorials.map((memorial, index) => {
            const IconComponent = getIconForMemorial(memorial.name);
            return (
              <div key={memorial.id} className="bg-white border border-gray-200 hover:border-gray-300 transition-colors group">
                {/* Preview */}
                <div className="aspect-[4/3] bg-gray-50 border-b border-gray-200 flex items-center justify-center overflow-hidden">
                  {memorial.imageUrl ? (
                    <ImageWithFallback 
                      src={memorial.imageUrl} 
                      alt={memorial.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <IconComponent className="w-12 h-12 text-gray-300" />
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-1">{memorial.name}</h3>
                      {memorial.description && (
                        <p className="text-xs text-gray-500">{memorial.description}</p>
                      )}
                    </div>
                    {getStatusBadge(memorial.status || 'draft')}
                  </div>
                  <button className="w-full px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                    Open Memorial Designer
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 mb-2">No Memorial Items Selected</p>
            <p className="text-sm text-gray-500">Memorial items from the catalog will appear here automatically</p>
          </div>
        )}

        {/* Add New Card */}
        <button className="bg-white border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors group aspect-[4/3] flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:border-gray-300 transition-colors">
            <Plus className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-600">Add New Memorial</p>
        </button>
      </div>
    </div>
  );
}
