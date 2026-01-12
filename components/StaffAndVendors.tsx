import { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Users, 
  Building2, 
  Phone, 
  Mail, 
  Edit, 
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  Award,
  User,
  MapPin,
  Globe,
  FileText,
  X
} from 'lucide-react';
import { useStaffStore, StaffMember, Vendor } from '../store/useStaffStore';

interface StaffAndVendorsProps {
  onBack: () => void;
}

export function StaffAndVendors({ onBack }: StaffAndVendorsProps) {
  const [view, setView] = useState<'staff' | 'vendors'>('staff');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StaffMember | Vendor | null>(null);

  const staff = useStaffStore((state) => state.staff);
  const vendors = useStaffStore((state) => state.vendors);
  const deleteStaff = useStaffStore((state) => state.deleteStaff);
  const deleteVendor = useStaffStore((state) => state.deleteVendor);

  const currentItems = view === 'staff' ? staff : vendors;
  const filteredItems = currentItems.filter((item) => {
    const searchLower = searchQuery.toLowerCase();
    if (view === 'staff') {
      const member = item as StaffMember;
      return (
        member.name.toLowerCase().includes(searchLower) ||
        member.role.toLowerCase().includes(searchLower) ||
        member.email.toLowerCase().includes(searchLower)
      );
    } else {
      const vendor = item as Vendor;
      return (
        vendor.companyName.toLowerCase().includes(searchLower) ||
        vendor.contactPerson.toLowerCase().includes(searchLower) ||
        vendor.vendorType.toLowerCase().includes(searchLower)
      );
    }
  });

  const handleDelete = (id: string) => {
    if (confirm('Delete this item? This action cannot be undone.')) {
      if (view === 'staff') {
        deleteStaff(id);
      } else {
        deleteVendor(id);
      }
    }
  };

  const getAvailabilityIcon = (availability: string) => {
    switch (availability) {
      case 'available':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'on-call':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'unavailable':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'removal-team':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'funeral-director':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'embalmer':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'administrative':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getVendorBadgeColor = (type: string) => {
    switch (type) {
      case 'removal-service':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'crematory':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'cemetery':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'florist':
        return 'bg-pink-50 text-pink-700 border-pink-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
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
                <h1 className="text-gray-900">Staff & Vendors</h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Manage your team and vendor relationships
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setEditingItem(null);
                setIsAddModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add {view === 'staff' ? 'Staff' : 'Vendor'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {/* View Toggle & Search */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setView('staff')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-all ${
                view === 'staff'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Users className="w-4 h-4" />
              Staff ({staff.length})
            </button>
            <button
              onClick={() => setView('vendors')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-all ${
                view === 'vendors'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Vendors ({vendors.length})
            </button>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${view}...`}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            {view === 'staff' ? (
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            ) : (
              <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            )}
            <p className="text-gray-500 mb-1">No {view} found</p>
            <p className="text-sm text-gray-400">
              {searchQuery ? 'Try a different search term' : `Add your first ${view === 'staff' ? 'staff member' : 'vendor'} to get started`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => {
              if (view === 'staff') {
                const member = item as StaffMember;
                return (
                  <div
                    key={member.id}
                    className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-sm transition-all"
                  >
                    {/* Photo & Availability */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                          {member.photoUrl ? (
                            <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-gray-900 text-sm mb-0.5">{member.name}</h3>
                          <div className="flex items-center gap-1.5">
                            {getAvailabilityIcon(member.availability)}
                            <span className="text-xs text-gray-500 capitalize">
                              {member.availability}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Role Badge */}
                    <div className="mb-3">
                      <span className={`inline-block px-2.5 py-1 rounded text-xs border ${getRoleBadgeColor(member.role)}`}>
                        {member.role.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </span>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {member.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 truncate">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {member.email}
                      </div>
                    </div>

                    {/* Certifications */}
                    {member.certifications && member.certifications.length > 0 && (
                      <div className="mb-4 pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                          <Award className="w-3.5 h-3.5" />
                          Certifications
                        </div>
                        <div className="space-y-1">
                          {member.certifications.map((cert, idx) => (
                            <div key={idx} className="text-xs text-gray-600 pl-5">
                              • {cert}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingItem(member);
                          setIsAddModalOpen(true);
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              } else {
                const vendor = item as Vendor;
                return (
                  <div
                    key={vendor.id}
                    className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-sm transition-all"
                  >
                    {/* Logo & Company */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                          {vendor.logoUrl ? (
                            <img src={vendor.logoUrl} alt={vendor.companyName} className="w-full h-full object-cover" />
                          ) : (
                            <Building2 className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-gray-900 text-sm mb-0.5">{vendor.companyName}</h3>
                          <p className="text-xs text-gray-500">Contact: {vendor.contactPerson}</p>
                        </div>
                      </div>
                    </div>

                    {/* Vendor Type Badge */}
                    <div className="mb-3">
                      <span className={`inline-block px-2.5 py-1 rounded text-xs border ${getVendorBadgeColor(vendor.vendorType)}`}>
                        {vendor.vendorType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </span>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {vendor.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 truncate">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {vendor.email}
                      </div>
                      {vendor.address && (
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-2">{vendor.address}</span>
                        </div>
                      )}
                      {vendor.website && (
                        <div className="flex items-center gap-2 text-sm text-blue-600 truncate">
                          <Globe className="w-4 h-4" />
                          <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            Website
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingItem(vendor);
                          setIsAddModalOpen(true);
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(vendor.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isAddModalOpen && (
        <AddEditModal
          view={view}
          editingItem={editingItem}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingItem(null);
          }}
        />
      )}
    </div>
  );
}

// Add/Edit Modal Component
function AddEditModal({
  view,
  editingItem,
  onClose,
}: {
  view: 'staff' | 'vendors';
  editingItem: StaffMember | Vendor | null;
  onClose: () => void;
}) {
  const addStaff = useStaffStore((state) => state.addStaff);
  const updateStaff = useStaffStore((state) => state.updateStaff);
  const addVendor = useStaffStore((state) => state.addVendor);
  const updateVendor = useStaffStore((state) => state.updateVendor);

  const isEditing = !!editingItem;
  const isStaff = view === 'staff';

  const [formData, setFormData] = useState(() => {
    if (isStaff) {
      const member = editingItem as StaffMember | null;
      return {
        name: member?.name || '',
        role: member?.role || 'removal-team',
        phone: member?.phone || '',
        email: member?.email || '',
        availability: member?.availability || 'available',
        certifications: member?.certifications?.join(', ') || '',
        notes: member?.notes || '',
      };
    } else {
      const vendor = editingItem as Vendor | null;
      return {
        companyName: vendor?.companyName || '',
        contactPerson: vendor?.contactPerson || '',
        vendorType: vendor?.vendorType || 'removal-service',
        phone: vendor?.phone || '',
        email: vendor?.email || '',
        address: vendor?.address || '',
        website: vendor?.website || '',
        notes: vendor?.notes || '',
      };
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isStaff) {
      const staffData: StaffMember = {
        id: editingItem?.id || `staff-${Date.now()}`,
        name: formData.name,
        role: formData.role as any,
        phone: formData.phone,
        email: formData.email,
        availability: formData.availability as any,
        certifications: formData.certifications
          ? formData.certifications.split(',').map(c => c.trim()).filter(Boolean)
          : [],
        notes: formData.notes,
        dateAdded: editingItem?.dateAdded || new Date().toISOString().split('T')[0],
      };

      if (isEditing) {
        updateStaff(staffData.id, staffData);
      } else {
        addStaff(staffData);
      }
    } else {
      const vendorData: Vendor = {
        id: editingItem?.id || `vendor-${Date.now()}`,
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        vendorType: formData.vendorType as any,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        website: formData.website,
        notes: formData.notes,
        dateAdded: editingItem?.dateAdded || new Date().toISOString().split('T')[0],
      };

      if (isEditing) {
        updateVendor(vendorData.id, vendorData);
      } else {
        addVendor(vendorData);
      }
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 bg-white">
          <div>
            <h2 className="text-gray-900">
              {isEditing ? 'Edit' : 'Add'} {isStaff ? 'Staff Member' : 'Vendor'}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {isStaff ? 'Add team member details' : 'Add vendor information'}
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
          {isStaff ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm text-gray-700 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">Role *</label>
                  <select
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="removal-team">Removal Team</option>
                    <option value="funeral-director">Funeral Director</option>
                    <option value="embalmer">Embalmer</option>
                    <option value="administrative">Administrative</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">Availability *</label>
                  <select
                    required
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="available">Available</option>
                    <option value="on-call">On Call</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@funeral.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm text-gray-700 mb-1.5">
                    Certifications <span className="text-gray-400">(comma-separated)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.certifications}
                    onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                    placeholder="Licensed Removal Technician, CPR Certified"
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm text-gray-700 mb-1.5">Notes</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Additional notes..."
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm text-gray-700 mb-1.5">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Premier Services Inc."
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">Contact Person *</label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="Jane Smith"
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">Vendor Type *</label>
                  <select
                    required
                    value={formData.vendorType}
                    onChange={(e) => setFormData({ ...formData, vendorType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="removal-service">Removal Service</option>
                    <option value="florist">Florist</option>
                    <option value="caterer">Caterer</option>
                    <option value="transport">Transport</option>
                    <option value="cemetery">Cemetery</option>
                    <option value="crematory">Crematory</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1.5">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@vendor.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm text-gray-700 mb-1.5">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="123 Main St, City, ST 12345"
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm text-gray-700 mb-1.5">Website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://www.vendor.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm text-gray-700 mb-1.5">Notes</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Additional notes..."
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                  />
                </div>
              </div>
            </>
          )}

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
              className="flex-1 px-4 py-2.5 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isEditing ? 'Update' : 'Add'} {isStaff ? 'Staff' : 'Vendor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
