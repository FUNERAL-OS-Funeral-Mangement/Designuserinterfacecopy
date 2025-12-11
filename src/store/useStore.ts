import { create } from 'zustand';

export interface CaseData {
  caseId: string;
  deceasedName: string;
  locationOfPickup: string;
  timeOfDeath: string;
  releaseFormUrl: string;
  currentStep: number;
  teamStatus: 'assigned' | 'en-route' | 'arrived';
  bodyLoggedIn: boolean;
  caseFileCreated: boolean;
  notes: string;
}

export interface CatalogItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'package' | 'addon';
  imageUrl: string;
  quantity?: number;
}

export interface SelectedItem extends CatalogItem {
  quantity: number;
  notes?: string;
}

interface StoreState {
  caseData: CaseData;
  selectedItems: SelectedItem[];
  contractGenerating: boolean;
  
  // Actions
  updateCaseData: (data: Partial<CaseData>) => void;
  completeStep: (step: number) => void;
  addItem: (item: CatalogItem) => void;
  removeItem: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  updateItemNotes: (itemId: string, notes: string) => void;
  clearSelection: () => void;
  getTotalPrice: () => number;
}

export const useStore = create<StoreState>((set, get) => ({
  caseData: {
    caseId: `CASE-${Date.now().toString().slice(-6)}`,
    deceasedName: '',
    locationOfPickup: '',
    timeOfDeath: '',
    releaseFormUrl: '',
    currentStep: 1,
    teamStatus: 'assigned',
    bodyLoggedIn: false,
    caseFileCreated: false,
    notes: '',
  },
  selectedItems: [],
  contractGenerating: false,
  
  updateCaseData: (data) => set((state) => ({
    caseData: { ...state.caseData, ...data }
  })),
  
  completeStep: (step) => set((state) => ({
    caseData: { ...state.caseData, currentStep: Math.max(state.caseData.currentStep, step + 1) }
  })),
  
  addItem: (item) => set((state) => {
    const existing = state.selectedItems.find(i => i.id === item.id);
    if (existing) {
      return {
        selectedItems: state.selectedItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
        contractGenerating: true,
      };
    }
    return {
      selectedItems: [...state.selectedItems, { ...item, quantity: 1 }],
      contractGenerating: true,
    };
  }),
  
  removeItem: (itemId) => set((state) => ({
    selectedItems: state.selectedItems.filter(i => i.id !== itemId),
    contractGenerating: true,
  })),
  
  updateItemQuantity: (itemId, quantity) => set((state) => ({
    selectedItems: state.selectedItems.map(i =>
      i.id === itemId ? { ...i, quantity } : i
    ),
    contractGenerating: true,
  })),
  
  updateItemNotes: (itemId, notes) => set((state) => ({
    selectedItems: state.selectedItems.map(i =>
      i.id === itemId ? { ...i, notes } : i
    )
  })),
  
  clearSelection: () => set({ selectedItems: [], contractGenerating: false }),
  
  getTotalPrice: () => {
    const state = get();
    return state.selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
}));
