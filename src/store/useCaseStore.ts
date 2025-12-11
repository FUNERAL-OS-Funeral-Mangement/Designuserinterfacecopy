import { create } from 'zustand';

export interface CatalogItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'package' | 'addon' | 'memorial' | 'service';
  imageUrl?: string;
  details?: string;
  included?: string[];
  quantity?: number;
  status?: 'draft' | 'ordered' | 'pending' | 'completed';
}

export interface RegulatoryInfo {
  burialTransitNumber?: string;
  embalmerName?: string;
  embalmerLicense?: string;
  methodOfDisposal?: string;
  countyOfDeath?: string;
  directorInCharge?: string;
  directorLicense?: string;
}

export interface CaseData {
  id: string;
  caseNumber: string;
  deceasedName: string;
  caseType: string;
  dateCreated: string;
  photoUrl?: string;
  catalogSelections: {
    package?: CatalogItem;
    addons: CatalogItem[];
    memorials: CatalogItem[];
  };
  regulatoryInfo?: RegulatoryInfo;
}

interface CaseStore {
  cases: Map<string, CaseData>;
  
  // Actions
  addCatalogItemToCase: (caseId: string, item: CatalogItem, itemType: 'package' | 'addon' | 'memorial') => void;
  removeCatalogItemFromCase: (caseId: string, itemId: string, itemType: 'addon' | 'memorial') => void;
  getCaseById: (caseId: string) => CaseData | undefined;
  updateCasePhoto: (caseId: string, photoUrl: string) => void;
  updateCaseNumber: (caseId: string, newCaseNumber: string) => void;
  updateRegulatoryInfo: (caseId: string, regulatoryInfo: RegulatoryInfo) => void;
  getCatalogItems: (caseId: string) => { package?: CatalogItem; addons: CatalogItem[]; memorials: CatalogItem[] } | undefined;
  initializeCase: (caseData: CaseData) => void;
  generateCaseNumber: () => string;
}

export const useCaseStore = create<CaseStore>((set, get) => ({
  cases: new Map(),

  addCatalogItemToCase: (caseId, item, itemType) => {
    set((state) => {
      const newCases = new Map(state.cases);
      const caseData = newCases.get(caseId);
      
      if (!caseData) return state;

      const updatedCase = { ...caseData };
      
      if (itemType === 'package') {
        updatedCase.catalogSelections.package = item;
      } else if (itemType === 'addon') {
        const existingIndex = updatedCase.catalogSelections.addons.findIndex(a => a.id === item.id);
        if (existingIndex === -1) {
          updatedCase.catalogSelections.addons = [...updatedCase.catalogSelections.addons, item];
        }
      } else if (itemType === 'memorial') {
        const existingIndex = updatedCase.catalogSelections.memorials.findIndex(m => m.id === item.id);
        if (existingIndex === -1) {
          updatedCase.catalogSelections.memorials = [...updatedCase.catalogSelections.memorials, item];
        }
      }
      
      newCases.set(caseId, updatedCase);
      return { cases: newCases };
    });
  },

  removeCatalogItemFromCase: (caseId, itemId, itemType) => {
    set((state) => {
      const newCases = new Map(state.cases);
      const caseData = newCases.get(caseId);
      
      if (!caseData) return state;

      const updatedCase = { ...caseData };
      
      if (itemType === 'addon') {
        updatedCase.catalogSelections.addons = updatedCase.catalogSelections.addons.filter(a => a.id !== itemId);
      } else if (itemType === 'memorial') {
        updatedCase.catalogSelections.memorials = updatedCase.catalogSelections.memorials.filter(m => m.id !== itemId);
      }
      
      newCases.set(caseId, updatedCase);
      return { cases: newCases };
    });
  },

  getCaseById: (caseId) => {
    return get().cases.get(caseId);
  },

  updateCasePhoto: (caseId, photoUrl) => {
    set((state) => {
      const newCases = new Map(state.cases);
      const caseData = newCases.get(caseId);
      
      if (!caseData) return state;

      newCases.set(caseId, { ...caseData, photoUrl });
      return { cases: newCases };
    });
  },

  updateCaseNumber: (caseId, newCaseNumber) => {
    set((state) => {
      const newCases = new Map(state.cases);
      const caseData = newCases.get(caseId);
      
      if (!caseData) return state;

      newCases.set(caseId, { ...caseData, caseNumber: newCaseNumber });
      return { cases: newCases };
    });
  },

  updateRegulatoryInfo: (caseId, regulatoryInfo) => {
    set((state) => {
      const newCases = new Map(state.cases);
      const caseData = newCases.get(caseId);
      
      if (!caseData) return state;

      newCases.set(caseId, { ...caseData, regulatoryInfo });
      return { cases: newCases };
    });
  },

  getCatalogItems: (caseId) => {
    const caseData = get().cases.get(caseId);
    return caseData?.catalogSelections;
  },

  initializeCase: (caseData) => {
    set((state) => {
      const newCases = new Map(state.cases);
      newCases.set(caseData.id, caseData);
      return { cases: newCases };
    });
  },

  generateCaseNumber: () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const cases = get().cases;
    
    // Get all case numbers for current year/month
    const prefix = `RTP-${year}${month}`;
    const casesThisMonth = Array.from(cases.values())
      .filter(c => c.caseNumber.startsWith(prefix))
      .map(c => {
        const parts = c.caseNumber.split('-');
        return parseInt(parts[parts.length - 1], 10);
      })
      .filter(n => !isNaN(n));
    
    const maxNumber = casesThisMonth.length > 0 ? Math.max(...casesThisMonth) : 0;
    const nextNumber = String(maxNumber + 1).padStart(4, '0');
    
    return `${prefix}-${nextNumber}`;
  },
}));