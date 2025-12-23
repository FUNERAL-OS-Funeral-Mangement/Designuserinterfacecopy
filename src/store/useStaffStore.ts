import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface StaffMember {
  id: string;
  name: string;
  role: 'removal-team' | 'funeral-director' | 'embalmer' | 'administrative' | 'other';
  phone: string;
  email: string;
  availability: 'available' | 'on-call' | 'unavailable';
  certifications?: string[];
  notes?: string;
  dateAdded: string;
  photoUrl?: string;
}

export interface Vendor {
  id: string;
  companyName: string;
  contactPerson: string;
  vendorType: 'removal-service' | 'florist' | 'caterer' | 'transport' | 'cemetery' | 'crematory' | 'other';
  phone: string;
  email: string;
  address?: string;
  website?: string;
  notes?: string;
  dateAdded: string;
  logoUrl?: string;
}

interface StaffState {
  staff: StaffMember[];
  vendors: Vendor[];
  
  // Staff actions
  addStaff: (member: StaffMember) => void;
  updateStaff: (id: string, updates: Partial<StaffMember>) => void;
  deleteStaff: (id: string) => void;
  
  // Vendor actions
  addVendor: (vendor: Vendor) => void;
  updateVendor: (id: string, updates: Partial<Vendor>) => void;
  deleteVendor: (id: string) => void;
  
  // Helpers
  getRemovalTeams: () => (StaffMember | Vendor)[];
  resetToDefaults: () => void;
}

// Default removal teams
const defaultStaff: StaffMember[] = [
  {
    id: 'staff-1',
    name: 'John Mitchell',
    role: 'removal-team',
    phone: '(555) 123-4567',
    email: 'john.mitchell@funeral.com',
    availability: 'available',
    certifications: ['Licensed Removal Technician', 'CPR Certified'],
    dateAdded: '2024-01-15',
  },
  {
    id: 'staff-2',
    name: 'Sarah Chen',
    role: 'removal-team',
    phone: '(555) 234-5678',
    email: 'sarah.chen@funeral.com',
    availability: 'on-call',
    certifications: ['Licensed Removal Technician'],
    dateAdded: '2024-01-20',
  },
  {
    id: 'staff-3',
    name: 'Michael Torres',
    role: 'funeral-director',
    phone: '(555) 345-6789',
    email: 'michael.torres@funeral.com',
    availability: 'available',
    certifications: ['Licensed Funeral Director', 'Embalmer'],
    dateAdded: '2024-01-10',
  },
];

const defaultVendors: Vendor[] = [
  {
    id: 'vendor-1',
    companyName: 'Premier Removal Services',
    contactPerson: 'David Rodriguez',
    vendorType: 'removal-service',
    phone: '(555) 456-7890',
    email: 'contact@premierremoval.com',
    address: '123 Service Rd, City, ST 12345',
    dateAdded: '2024-02-01',
  },
  {
    id: 'vendor-2',
    companyName: 'Eternal Gardens Crematory',
    contactPerson: 'Lisa Anderson',
    vendorType: 'crematory',
    phone: '(555) 567-8901',
    email: 'info@eternalgardens.com',
    address: '456 Memorial Ave, City, ST 12345',
    dateAdded: '2024-02-15',
  },
];

export const useStaffStore = create<StaffState>()(
  persist(
    (set, get) => ({
      staff: defaultStaff,
      vendors: defaultVendors,
      
      // Staff actions
      addStaff: (member) =>
        set((state) => ({
          staff: [...state.staff, member],
        })),
      
      updateStaff: (id, updates) =>
        set((state) => ({
          staff: state.staff.map((member) =>
            member.id === id ? { ...member, ...updates } : member
          ),
        })),
      
      deleteStaff: (id) =>
        set((state) => ({
          staff: state.staff.filter((member) => member.id !== id),
        })),
      
      // Vendor actions
      addVendor: (vendor) =>
        set((state) => ({
          vendors: [...state.vendors, vendor],
        })),
      
      updateVendor: (id, updates) =>
        set((state) => ({
          vendors: state.vendors.map((vendor) =>
            vendor.id === id ? { ...vendor, ...updates } : vendor
          ),
        })),
      
      deleteVendor: (id) =>
        set((state) => ({
          vendors: state.vendors.filter((vendor) => vendor.id !== id),
        })),
      
      // Get all removal teams (both staff and vendors)
      getRemovalTeams: () => {
        const state = get();
        const staffRemovalTeams = state.staff.filter(s => s.role === 'removal-team');
        const vendorRemovalTeams = state.vendors.filter(v => v.vendorType === 'removal-service');
        return [...staffRemovalTeams, ...vendorRemovalTeams];
      },
      
      // Reset to defaults
      resetToDefaults: () =>
        set({
          staff: defaultStaff,
          vendors: defaultVendors,
        }),
    }),
    {
      name: 'staff-storage',
    }
  )
);
