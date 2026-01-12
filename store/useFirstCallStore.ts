import { create } from 'zustand';
import { FirstCallCase, getStatusFromStage } from '../types/firstCall';

export interface FirstCallCase {
  id: string;
  createdAt: Date;
  deceasedName: string;
  nextOfKinName: string;
  nextOfKinPhone?: string;
  familyContactName?: string;
  callerName?: string;
  callerPhone?: string;
  callerRelationship?: string;
  address?: string;
  dateOfBirth?: string;
  timeOfDeath?: string;
  locationOfPickup?: string;
  weight?: string;
  isWeightKnown?: string;
  readyForPickup?: string;
  readyTime?: string;
  hasStairs?: string;
  isFamilyPresent?: string;
  isVerbalRelease?: boolean;
  status: string;
  currentStage: string;
  completedStages: string[];
  updatedAt: Date;
  intakeComplete: boolean;
  documentsGenerated: number;
  signaturesReceived: number;
  signaturesTotal: number;
  faxesSent: number;
  faxesTotal: number;
}

interface FirstCallStore {
  cases: Record<string, FirstCallCase>;
  activeCaseId: string | null;
  
  // Case management
  createCase: (deceasedName: string, nextOfKinName: string) => string;
  switchCase: (caseId: string) => void;
  updateCase: (caseId: string, updates: Partial<FirstCallCase>) => void;
  deleteCase: (caseId: string) => void;
  
  // Active cases helpers
  getActiveCase: () => FirstCallCase | null;
  getAllActiveCases: () => FirstCallCase[];
  getCasesNeedingAttention: () => FirstCallCase[];
}

export const useFirstCallStore = create<FirstCallStore>((set, get) => ({
  cases: {},
  activeCaseId: null,
  
  createCase: (deceasedName: string, nextOfKinName: string) => {
    const id = `case-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newCase: FirstCallCase = {
      id,
      deceasedName,
      nextOfKinName,
      status: 'intake-in-progress',
      currentStage: 'intake',
      completedStages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      intakeComplete: false,
      documentsGenerated: 0,
      signaturesReceived: 0,
      signaturesTotal: 0,
      faxesSent: 0,
      faxesTotal: 0,
    };
    
    set((state) => ({
      cases: { ...state.cases, [id]: newCase },
      activeCaseId: id,
    }));
    
    return id;
  },
  
  switchCase: (caseId: string) => {
    set({ activeCaseId: caseId });
  },
  
  updateCase: (caseId: string, updates: Partial<FirstCallCase>) => {
    set((state) => {
      const existingCase = state.cases[caseId];
      if (!existingCase) return state;
      
      const updatedCase = { ...existingCase, ...updates, updatedAt: new Date() };
      
      // Auto-calculate status based on stage
      updatedCase.status = getStatusFromStage(
        updatedCase.currentStage,
        updatedCase.signaturesReceived,
        updatedCase.signaturesTotal
      );
      
      return {
        cases: { ...state.cases, [caseId]: updatedCase },
      };
    });
  },
  
  deleteCase: (caseId: string) => {
    set((state) => {
      const newCases = { ...state.cases };
      delete newCases[caseId];
      
      return {
        cases: newCases,
        activeCaseId: state.activeCaseId === caseId ? null : state.activeCaseId,
      };
    });
  },
  
  getActiveCase: () => {
    const { cases, activeCaseId } = get();
    return activeCaseId ? cases[activeCaseId] || null : null;
  },
  
  getAllActiveCases: () => {
    const { cases } = get();
    return Object.values(cases)
      .filter(c => c.status !== 'complete')
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  },
  
  getCasesNeedingAttention: () => {
    const { cases } = get();
    return Object.values(cases)
      .filter(c => c.status === 'action-needed')
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  },
}));