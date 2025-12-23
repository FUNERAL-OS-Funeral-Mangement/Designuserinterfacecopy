// First Call Case State Types

export type FirstCallStatus = 
  | 'intake-in-progress'
  | 'waiting-on-family'
  | 'action-needed'
  | 'faxing'
  | 'complete';

export interface FirstCallCase {
  id: string;
  deceasedName: string;
  nextOfKinName: string;
  status: FirstCallStatus;
  currentStage: 'intake' | 'documents' | 'signatures' | 'faxing' | 'complete';
  completedStages: string[];
  createdAt: string;
  updatedAt: string;
  
  // Progress tracking
  intakeComplete: boolean;
  documentsGenerated: number;
  signaturesReceived: number;
  signaturesTotal: number;
  faxesSent: number;
  faxesTotal: number;
  
  // Intake data
  callerName?: string;
  callerPhone?: string;
  address?: string;
  timeOfDeath?: string;
}

export interface FirstCallStatusLabel {
  emoji: string;
  label: string;
  description: string;
  color: string;
}

export const FIRST_CALL_STATUS_LABELS: Record<FirstCallStatus, FirstCallStatusLabel> = {
  'intake-in-progress': {
    emoji: '📞',
    label: 'Intake in progress',
    description: 'Director is working',
    color: 'text-blue-600',
  },
  'waiting-on-family': {
    emoji: '⏳',
    label: 'Waiting on family',
    description: 'Grace period',
    color: 'text-amber-600',
  },
  'action-needed': {
    emoji: '🔔',
    label: 'Action needed',
    description: 'Something stalled',
    color: 'text-red-600',
  },
  'faxing': {
    emoji: '📠',
    label: 'Faxing',
    description: 'Auto-processing',
    color: 'text-purple-600',
  },
  'complete': {
    emoji: '✅',
    label: 'Complete',
    description: 'Done',
    color: 'text-green-600',
  },
};

export function getStatusFromStage(
  stage: FirstCallCase['currentStage'],
  signaturesReceived: number,
  signaturesTotal: number
): FirstCallStatus {
  switch (stage) {
    case 'intake':
      return 'intake-in-progress';
    case 'documents':
      return 'intake-in-progress';
    case 'signatures':
      return signaturesReceived < signaturesTotal ? 'waiting-on-family' : 'action-needed';
    case 'faxing':
      return 'faxing';
    case 'complete':
      return 'complete';
    default:
      return 'intake-in-progress';
  }
}
