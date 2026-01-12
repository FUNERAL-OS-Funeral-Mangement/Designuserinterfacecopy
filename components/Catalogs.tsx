import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Search,
  Package,
  Edit,
  Trash2,
  X,
  Upload,
  DollarSign,
  Info,
  Save,
  MoreVertical,
  Image as ImageIcon,
} from "lucide-react";
import { useCatalogStore } from "../store/useCatalogStore";
import type { PackageItem, AddonItem, CasketItem } from "../data/catalogData";

interface CatalogsProps {
  onBack: () => void;
}

type CatalogType = "packages" | "addons" | "caskets";
type CatalogItem = PackageItem | AddonItem | CasketItem;

export function Catalogs({ onBack }: CatalogsProps) {
  const [selectedCatalog, setSelectedCatalog] = useState<CatalogType>("packages");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<CatalogItem | null>(null);

  // Get data from store
  const packagesData = useCatalogStore((state) => state.packages);
  const addonsData = useCatalogStore((state) => state.addons);
  const casketsData = useCatalogStore((state) => state.caskets);
  
  // Get actions from store
  const updatePackage = useCatalogStore((state) => state.updatePackage);
  const addPackage = useCatalogStore((state) => state.addPackage);
  const deletePackage = useCatalogStore((state) => state.deletePackage);
  
  const updateAddon = useCatalogStore((state) => state.updateAddon);
  const addAddon = useCatalogStore((state) => state.addAddon);
  const deleteAddon = useCatalogStore((state) => state.deleteAddon);
  
  const updateCasket = useCatalogStore((state) => state.updateCasket);
  const addCasket = useCatalogStore((state) => state.addCasket);
  const deleteCasket = useCatalogStore((state) => state.deleteCasket);

  // Get current items based on selected catalog
  const getCurrentItems = (): CatalogItem[] => {
    switch (selectedCatalog) {
      case "packages":
        return packagesData;
      case "addons":
        return addonsData;
      case "caskets":
        return casketsData;
    }
  };

  const currentItems = getCurrentItems();

  const filteredItems = currentItems.filter((item) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesName = item.name.toLowerCase().includes(searchLower);
    const matchesDescription = item.description.toLowerCase().includes(searchLower);
    
    if ('category' in item && typeof item.category === 'string') {
      return matchesName || matchesDescription || item.category.toLowerCase().includes(searchLower);
    }
    
    return matchesName || matchesDescription;
  });

  // Group items by category
  const groupedItems = filteredItems.reduce((acc, item) => {
    const category = 'category' in item && typeof item.category === 'string' 
      ? item.category 
      : selectedCatalog === 'packages' ? 'Packages' : 'Add-Ons';
    
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, CatalogItem[]>);

  const handleDeleteItem = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      switch (selectedCatalog) {
        case "packages":
          deletePackage(id);
          break;
        case "addons":
          deleteAddon(id);
          break;
        case "caskets":
          deleteCasket(id);
          break;
      }
    }
  };

  const handleEditItem = (item: CatalogItem) => {
    setEditingItem(item);
    setIsAddingItem(true);
  };

  const handleSaveItem = (updatedItem: any) => {
    if (editingItem) {
      // Edit existing item
      switch (selectedCatalog) {
        case "packages":
          updatePackage(editingItem.id, updatedItem);
          break;
        case "addons":
          updateAddon(editingItem.id, updatedItem);
          break;
        case "caskets":
          updateCasket(editingItem.id, updatedItem);
          break;
      }
    } else {
      // Add new item
      const newItem = { ...updatedItem, id: `${Date.now()}` };
      switch (selectedCatalog) {
        case "packages":
          addPackage(newItem as PackageItem);
          break;
        case "addons":
          addAddon(newItem as AddonItem);
          break;
        case "caskets":
          addCasket(newItem as CasketItem);
          break;
      }
    }
    setIsAddingItem(false);
    setEditingItem(null);
  };

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
                <h1 className="text-gray-900">My Catalogs</h1>
                <p className="text-sm text-gray-500 hidden sm:block">
                  Manage your product offerings
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setEditingItem(null);
                setIsAddingItem(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Item</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto">
        {/* Catalog Type Selector */}
        <div className="mb-6">
          <div className="inline-flex bg-white rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setSelectedCatalog("packages")}
              className={`px-6 py-2 rounded-md text-sm transition-all ${
                selectedCatalog === "packages"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Packages
            </button>
            <button
              onClick={() => setSelectedCatalog("addons")}
              className={`px-6 py-2 rounded-md text-sm transition-all ${
                selectedCatalog === "addons"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Add-Ons
            </button>
            <button
              onClick={() => setSelectedCatalog("caskets")}
              className={`px-6 py-2 rounded-md text-sm transition-all ${
                selectedCatalog === "caskets"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Caskets
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Items</p>
                <p className="text-2xl text-gray-900">{currentItems.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg. Price</p>
                <p className="text-2xl text-gray-900">
                  ${(currentItems.reduce((sum, item) => sum + item.price, 0) / currentItems.length || 0).toFixed(0)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Info className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Categories</p>
                <p className="text-2xl text-gray-900">
                  {Object.keys(groupedItems).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Items List - Grouped by Category */}
        <div className="space-y-8">
          {Object.keys(groupedItems).length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery
                  ? "Try a different search term"
                  : "Get started by adding your first item"}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setIsAddingItem(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add First Item
                </button>
              )}
            </div>
          ) : (
            Object.entries(groupedItems).map(([category, items]) => (
              <div key={category}>
                <h2 className="text-gray-900 mb-4">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((item) => (
                    <CatalogItemCard
                      key={item.id}
                      item={item}
                      onEdit={() => handleEditItem(item)}
                      onDelete={() => handleDeleteItem(item.id)}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Add/Edit Item Modal */}
      {isAddingItem && (
        <AddEditItemModal
          item={editingItem}
          catalogType={selectedCatalog}
          onClose={() => {
            setIsAddingItem(false);
            setEditingItem(null);
          }}
          onSave={handleSaveItem}
        />
      )}
    </div>
  );
}

// Catalog Item Card Component
function CatalogItemCard({
  item,
  onEdit,
  onDelete,
}: {
  item: CatalogItem;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-md transition-all group relative">
      {/* Image */}
      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <Package className="w-12 h-12 text-gray-300" />
        )}
        
        {/* Edit Button Overlay - Centered */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={onEdit}
            className="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-all flex items-center gap-2 shadow-lg transform scale-95 group-hover:scale-100"
          >
            <Edit className="w-5 h-5" />
            Edit Item
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-gray-900 flex-1 line-clamp-1">{item.name}</h3>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            {showMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowMenu(false)}
                ></div>
                <div className="absolute right-0 top-full mt-1 bg-white rounded-lg border border-gray-200 shadow-lg py-1 min-w-[120px] z-20">
                  <button
                    onClick={() => {
                      onEdit();
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      onDelete();
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-teal-600">${item.price.toLocaleString()}</span>
          {'category' in item && typeof item.category === 'string' && (
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
              {item.category}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// Add/Edit Item Modal Component
function AddEditItemModal({
  item,
  catalogType,
  onClose,
  onSave,
}: {
  item: CatalogItem | null;
  catalogType: CatalogType;
  onClose: () => void;
  onSave: (item: any) => void;
}) {
  const isPackage = catalogType === 'packages';
  const packageItem = isPackage && item && 'included' in item ? item as PackageItem : null;
  
  const [formData, setFormData] = useState({
    name: item?.name || "",
    price: item?.price || 0,
    description: item?.description || "",
    imageUrl: item?.imageUrl || "",
    included: packageItem?.included || [],
    category: isPackage ? 'package' : catalogType === 'addons' ? 'addon' : '',
  });

  const [editingServiceIndex, setEditingServiceIndex] = useState<number | null>(null);
  const [editingServiceData, setEditingServiceData] = useState({ 
    label: '', 
    value: 0, 
    key: '', 
    subtitle: '', 
    description: '', 
    whyItMatters: '' 
  });
  
  const [imageUploadMode, setImageUploadMode] = useState<'url' | 'upload'>('url');
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImageFile(file);
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditService = (index: number) => {
    const service = formData.included[index];
    setEditingServiceData({ 
      label: service.label, 
      value: service.value,
      key: service.key || '',
      subtitle: service.subtitle || '',
      description: service.description || '',
      whyItMatters: service.whyItMatters || ''
    });
    setEditingServiceIndex(index);
  };

  const handleUpdateService = () => {
    if (editingServiceIndex !== null && editingServiceData.label && editingServiceData.value > 0) {
      const updated = [...formData.included];
      updated[editingServiceIndex] = { 
        label: editingServiceData.label, 
        value: editingServiceData.value,
        ...(editingServiceData.key && { key: editingServiceData.key }),
        ...(editingServiceData.subtitle && { subtitle: editingServiceData.subtitle }),
        ...(editingServiceData.description && { description: editingServiceData.description }),
        ...(editingServiceData.whyItMatters && { whyItMatters: editingServiceData.whyItMatters })
      };
      setFormData({ ...formData, included: updated });
      setEditingServiceData({ label: '', value: 0, key: '', subtitle: '', description: '', whyItMatters: '' });
      setEditingServiceIndex(null);
    }
  };

  const handleAddNewService = () => {
    setEditingServiceData({ label: '', value: 0, key: '', subtitle: '', description: '', whyItMatters: '' });
    setEditingServiceIndex(-1); // -1 means adding new
  };

  const handleCreateService = () => {
    if (editingServiceData.label && editingServiceData.value > 0) {
      setFormData({
        ...formData,
        included: [...formData.included, { 
          label: editingServiceData.label, 
          value: editingServiceData.value,
          ...(editingServiceData.key && { key: editingServiceData.key }),
          ...(editingServiceData.subtitle && { subtitle: editingServiceData.subtitle }),
          ...(editingServiceData.description && { description: editingServiceData.description }),
          ...(editingServiceData.whyItMatters && { whyItMatters: editingServiceData.whyItMatters })
        }],
      });
      setEditingServiceData({ label: '', value: 0, key: '', subtitle: '', description: '', whyItMatters: '' });
      setEditingServiceIndex(null);
    }
  };

  const handleDeleteService = (index: number) => {
    if (confirm('Remove this service from the package?')) {
      setFormData({
        ...formData,
        included: formData.included.filter((_, i) => i !== index),
      });
      if (editingServiceIndex === index) {
        setEditingServiceIndex(null);
        setEditingServiceData({ label: '', value: 0, key: '', subtitle: '', description: '', whyItMatters: '' });
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingServiceIndex(null);
    setEditingServiceData({ label: '', value: 0, key: '', subtitle: '', description: '', whyItMatters: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 px-6 py-4 flex items-center justify-between border-b border-gray-100">
          <div>
            <h2 className="text-gray-900">{item ? "Edit Item" : "Add New Item"}</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {isPackage ? 'Service Package' : catalogType === 'addons' ? 'Add-On' : 'Casket'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-5">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Package Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Basic Service Package"
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1.5">
                  {isPackage ? 'Total Package Price' : 'Price'}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input
                    type="number"
                    required
                    min="0"
                    step="1"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    placeholder="0"
                    className="w-full pl-7 pr-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1.5">Description</label>
                <textarea
                  required
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description..."
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none transition-all"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm text-gray-700">Image</label>
                  <div className="inline-flex bg-gray-100 rounded-md p-0.5">
                    <button
                      type="button"
                      onClick={() => setImageUploadMode('url')}
                      className={`px-2.5 py-1 rounded text-xs transition-all ${
                        imageUploadMode === 'url'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageUploadMode('upload')}
                      className={`px-2.5 py-1 rounded text-xs transition-all ${
                        imageUploadMode === 'upload'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Upload
                    </button>
                  </div>
                </div>
                
                {imageUploadMode === 'url' ? (
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                ) : (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                    {uploadedImageFile && (
                      <p className="text-xs text-gray-500 mt-1.5">
                        Selected: {uploadedImageFile.name}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Included Services - Only for Packages */}
            {isPackage && (
              <div className="pt-5 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm text-gray-900">Included Services</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Services shown during package customization
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddNewService}
                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Service
                  </button>
                </div>

                {/* Services List */}
                <div className="space-y-1">
                  {formData.included.map((service: any, index: number) => (
                    <div key={index}>
                      <div className="group flex items-center justify-between py-3 px-3.5 hover:bg-blue-50 hover:ring-1 hover:ring-blue-200 rounded-lg transition-all cursor-pointer">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">{service.label}</p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            ${service.value.toLocaleString()}
                            {service.subtitle && <span className="ml-2">• {service.subtitle}</span>}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 ml-3">
                          <button
                            type="button"
                            onClick={() => handleEditService(index)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-md transition-all"
                            title="Edit service"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteService(index)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all"
                            title="Delete service"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Inline Edit Form */}
                      {editingServiceIndex === index && (
                        <div className="mb-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                          <h4 className="text-sm text-gray-900 mb-3">Edit Service</h4>
                          <div className="space-y-2.5">
                            <input
                              type="text"
                              placeholder="Service name (e.g., Transfer of Remains to Funeral Home)"
                              value={editingServiceData.label}
                              onChange={(e) =>
                                setEditingServiceData({ ...editingServiceData, label: e.target.value })
                              }
                              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                            <input
                              type="text"
                              placeholder="Subtitle (e.g., Safe and dignified transportation)"
                              value={editingServiceData.subtitle}
                              onChange={(e) =>
                                setEditingServiceData({ ...editingServiceData, subtitle: e.target.value })
                              }
                              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                            <div className="grid grid-cols-2 gap-2.5">
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                                <input
                                  type="number"
                                  placeholder="Value"
                                  min="0"
                                  step="1"
                                  value={editingServiceData.value || ''}
                                  onChange={(e) =>
                                    setEditingServiceData({ ...editingServiceData, value: parseFloat(e.target.value) || 0 })
                                  }
                                  className="w-full pl-7 pr-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                              </div>
                              <input
                                type="text"
                                placeholder="Key (e.g., transfer-remains)"
                                value={editingServiceData.key}
                                onChange={(e) =>
                                  setEditingServiceData({ ...editingServiceData, key: e.target.value })
                                }
                                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                              />
                            </div>
                            <textarea
                              rows={2}
                              placeholder="What This Means (detailed description)"
                              value={editingServiceData.description}
                              onChange={(e) =>
                                setEditingServiceData({ ...editingServiceData, description: e.target.value })
                              }
                              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                            />
                            <textarea
                              rows={2}
                              placeholder="Why This Matters (emotional connection)"
                              value={editingServiceData.whyItMatters}
                              onChange={(e) =>
                                setEditingServiceData({ ...editingServiceData, whyItMatters: e.target.value })
                              }
                              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                            />
                            <div className="flex gap-2 pt-1">
                              <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="flex-1 py-2 px-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={handleUpdateService}
                                disabled={!editingServiceData.label || editingServiceData.value <= 0}
                                className="flex-1 py-2 px-3 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                              >
                                <Save className="w-4 h-4" />
                                Update Service
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Add New Service Form */}
                  {editingServiceIndex === -1 && (
                    <div className="mt-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <h4 className="text-sm text-gray-900 mb-3">Add Service</h4>
                      <div className="space-y-2.5">
                        <input
                          type="text"
                          placeholder="Service name (e.g., Transfer of remains)"
                          value={editingServiceData.label}
                          onChange={(e) =>
                            setEditingServiceData({ ...editingServiceData, label: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Subtitle (e.g., Safe and dignified transportation)"
                          value={editingServiceData.subtitle}
                          onChange={(e) =>
                            setEditingServiceData({ ...editingServiceData, subtitle: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                        <div className="grid grid-cols-2 gap-2.5">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                            <input
                              type="number"
                              placeholder="Value"
                              min="0"
                              step="1"
                              value={editingServiceData.value || ''}
                              onChange={(e) =>
                                setEditingServiceData({ ...editingServiceData, value: parseFloat(e.target.value) || 0 })
                              }
                              className="w-full pl-7 pr-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="Key (e.g., transfer-remains)"
                            value={editingServiceData.key}
                            onChange={(e) =>
                              setEditingServiceData({ ...editingServiceData, key: e.target.value })
                            }
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                        <textarea
                          rows={2}
                          placeholder="What This Means (detailed description)"
                          value={editingServiceData.description}
                          onChange={(e) =>
                            setEditingServiceData({ ...editingServiceData, description: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                        />
                        <textarea
                          rows={2}
                          placeholder="Why This Matters (emotional connection)"
                          value={editingServiceData.whyItMatters}
                          onChange={(e) =>
                            setEditingServiceData({ ...editingServiceData, whyItMatters: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                        />
                        <div className="flex gap-2 pt-1">
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="flex-1 py-2 px-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleCreateService}
                            disabled={!editingServiceData.label || editingServiceData.value <= 0}
                            className="flex-1 py-2 px-3 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                          >
                            <Plus className="w-4 h-4" />
                            Add Service
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.included.length === 0 && editingServiceIndex !== -1 && (
                    <div className="py-8 text-center">
                      <p className="text-sm text-gray-400">No services yet</p>
                      <button
                        type="button"
                        onClick={handleAddNewService}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                      >
                        Add your first service
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-6 py-4 border-t border-gray-100 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex-1 py-2.5 px-4 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            {item ? "Save Changes" : "Create Package"}
          </button>
        </div>
      </div>
    </div>
  );
}