import { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Plus, 
  FileText, 
  Upload, 
  Download, 
  Trash2, 
  Edit, 
  Eye,
  X,
  Check,
  Folder,
  File,
  Archive
} from 'lucide-react';

interface DocumentLibraryProps {
  onBack: () => void;
}

interface DocumentTemplate {
  id: string;
  name: string;
  category: 'legal' | 'vital-statistics' | 'forms' | 'custom';
  description: string;
  type: 'template' | 'upload';
  fileType: string;
  dateAdded: string;
  fileUrl?: string;
}

const defaultTemplates: DocumentTemplate[] = [
  {
    id: 'tmpl-1',
    name: 'Body Release Authorization',
    category: 'legal',
    description: 'Authorization form for transfer of remains',
    type: 'template',
    fileType: 'PDF',
    dateAdded: '2024-01-15',
  },
  {
    id: 'tmpl-2',
    name: 'Vital Statistics Form',
    category: 'vital-statistics',
    description: 'Death certificate information form',
    type: 'template',
    fileType: 'PDF',
    dateAdded: '2024-01-15',
  },
  {
    id: 'tmpl-3',
    name: 'Cremation Authorization',
    category: 'legal',
    description: 'Legal authorization for cremation',
    type: 'template',
    fileType: 'PDF',
    dateAdded: '2024-01-15',
  },
  {
    id: 'tmpl-4',
    name: 'Statement of Goods & Services',
    category: 'forms',
    description: 'Itemized pricing statement',
    type: 'template',
    fileType: 'PDF',
    dateAdded: '2024-01-15',
  },
  {
    id: 'tmpl-5',
    name: 'General Price List',
    category: 'forms',
    description: 'FTC-compliant general price list',
    type: 'template',
    fileType: 'PDF',
    dateAdded: '2024-01-15',
  },
  {
    id: 'tmpl-6',
    name: 'Burial Transit Permit',
    category: 'legal',
    description: 'Permit for transporting remains',
    type: 'template',
    fileType: 'PDF',
    dateAdded: '2024-01-15',
  },
  {
    id: 'tmpl-7',
    name: 'Social Security Death Report',
    category: 'vital-statistics',
    description: 'Report death to Social Security Administration',
    type: 'template',
    fileType: 'PDF',
    dateAdded: '2024-01-15',
  },
  {
    id: 'tmpl-8',
    name: 'Veterans Benefits Application',
    category: 'forms',
    description: 'Application for VA burial benefits',
    type: 'template',
    fileType: 'PDF',
    dateAdded: '2024-01-15',
  },
];

export function DocumentLibrary({ onBack }: DocumentLibraryProps) {
  const [documents, setDocuments] = useState<DocumentTemplate[]>(defaultTemplates);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Documents', icon: Archive },
    { id: 'legal', label: 'Legal Documents', icon: FileText },
    { id: 'vital-statistics', label: 'Vital Statistics', icon: File },
    { id: 'forms', label: 'Forms & Applications', icon: Folder },
    { id: 'custom', label: 'Custom Uploads', icon: Upload },
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUploadDocument = (formData: { name: string; description: string; category: string; file: File | null }) => {
    if (!formData.file) return;

    const newDoc: DocumentTemplate = {
      id: `doc-${Date.now()}`,
      name: formData.name,
      category: formData.category as any,
      description: formData.description,
      type: 'upload',
      fileType: formData.file.name.split('.').pop()?.toUpperCase() || 'FILE',
      dateAdded: new Date().toISOString().split('T')[0],
      fileUrl: URL.createObjectURL(formData.file),
    };

    setDocuments([newDoc, ...documents]);
    setIsUploadModalOpen(false);
  };

  const handleDeleteDocument = (id: string) => {
    if (confirm('Delete this document? This action cannot be undone.')) {
      setDocuments(documents.filter(doc => doc.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-gray-900">Document Library</h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Manage templates and uploaded documents
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Upload Document</span>
            </button>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Documents Grid */}
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <Archive className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-1">No documents found</p>
            <p className="text-sm text-gray-400">
              {searchQuery ? 'Try a different search term' : 'Upload your first document to get started'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-sm transition-all group"
              >
                {/* Document Icon & Type */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {doc.fileType}
                    </span>
                    {doc.type === 'upload' && (
                      <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        Custom
                      </span>
                    )}
                  </div>
                </div>

                {/* Document Info */}
                <div className="mb-4">
                  <h3 className="text-gray-900 mb-1.5 line-clamp-1">{doc.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                    {doc.description}
                  </p>
                  <p className="text-xs text-gray-400">
                    Added {new Date(doc.dateAdded).toLocaleDateString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => alert('Preview coming soon')}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => alert('Download coming soon')}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  {doc.type === 'upload' && (
                    <button
                      onClick={() => handleDeleteDocument(doc.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <UploadDocumentModal
          onClose={() => setIsUploadModalOpen(false)}
          onUpload={handleUploadDocument}
        />
      )}
    </div>
  );
}

// Upload Document Modal Component
function UploadDocumentModal({
  onClose,
  onUpload,
}: {
  onClose: () => void;
  onUpload: (data: { name: string; description: string; category: string; file: File | null }) => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'custom',
    file: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, file, name: formData.name || file.name.replace(/\.[^/.]+$/, '') });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.file && formData.name) {
      onUpload(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
          <div>
            <h2 className="text-gray-900">Upload Document</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Add a custom document to your library
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* File Upload */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Document File *</label>
            <div className="relative">
              <input
                type="file"
                required
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt"
                className="w-full px-4 py-3 bg-white border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
              />
            </div>
            {formData.file && (
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-600" />
                {formData.file.name} ({(formData.file.size / 1024).toFixed(1)} KB)
              </div>
            )}
          </div>

          {/* Document Name */}
          <div>
            <label className="block text-sm text-gray-700 mb-1.5">Document Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Custom Release Form"
              className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-700 mb-1.5">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of this document..."
              className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm text-gray-700 mb-1.5">Category *</label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="custom">Custom Uploads</option>
              <option value="legal">Legal Documents</option>
              <option value="vital-statistics">Vital Statistics</option>
              <option value="forms">Forms & Applications</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formData.file || !formData.name}
              className="flex-1 px-4 py-2.5 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload Document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
