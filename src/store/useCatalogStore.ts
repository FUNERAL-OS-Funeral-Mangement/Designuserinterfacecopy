import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { packages as initialPackages, addons as initialAddons, caskets as initialCaskets } from '../data/catalogData';
import type { PackageItem, AddonItem, CasketItem } from '../data/catalogData';

interface CatalogState {
  packages: PackageItem[];
  addons: AddonItem[];
  caskets: CasketItem[];
  
  // Actions
  updatePackage: (id: string, updates: Partial<PackageItem>) => void;
  addPackage: (packageItem: PackageItem) => void;
  deletePackage: (id: string) => void;
  
  updateAddon: (id: string, updates: Partial<AddonItem>) => void;
  addAddon: (addonItem: AddonItem) => void;
  deleteAddon: (id: string) => void;
  
  updateCasket: (id: string, updates: Partial<CasketItem>) => void;
  addCasket: (casketItem: CasketItem) => void;
  deleteCasket: (id: string) => void;
  
  resetToDefaults: () => void;
}

export const useCatalogStore = create<CatalogState>()(
  persist(
    (set) => ({
      packages: initialPackages,
      addons: initialAddons,
      caskets: initialCaskets,
      
      // Package actions
      updatePackage: (id, updates) =>
        set((state) => ({
          packages: state.packages.map((pkg) =>
            pkg.id === id ? { ...pkg, ...updates } : pkg
          ),
        })),
      
      addPackage: (packageItem) =>
        set((state) => ({
          packages: [...state.packages, packageItem],
        })),
      
      deletePackage: (id) =>
        set((state) => ({
          packages: state.packages.filter((pkg) => pkg.id !== id),
        })),
      
      // Addon actions
      updateAddon: (id, updates) =>
        set((state) => ({
          addons: state.addons.map((addon) =>
            addon.id === id ? { ...addon, ...updates } : addon
          ),
        })),
      
      addAddon: (addonItem) =>
        set((state) => ({
          addons: [...state.addons, addonItem],
        })),
      
      deleteAddon: (id) =>
        set((state) => ({
          addons: state.addons.filter((addon) => addon.id !== id),
        })),
      
      // Casket actions
      updateCasket: (id, updates) =>
        set((state) => ({
          caskets: state.caskets.map((casket) =>
            casket.id === id ? { ...casket, ...updates } : casket
          ),
        })),
      
      addCasket: (casketItem) =>
        set((state) => ({
          caskets: [...state.caskets, casketItem],
        })),
      
      deleteCasket: (id) =>
        set((state) => ({
          caskets: state.caskets.filter((casket) => casket.id !== id),
        })),
      
      // Reset to defaults
      resetToDefaults: () =>
        set({
          packages: initialPackages,
          addons: initialAddons,
          caskets: initialCaskets,
        }),
    }),
    {
      name: 'catalog-storage',
    }
  )
);
