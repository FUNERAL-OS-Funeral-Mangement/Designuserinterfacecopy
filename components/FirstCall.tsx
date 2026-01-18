import { FirstCallTimeline } from './FirstCallTimeline';

interface FirstCallProps {
  onBack: () => void;
  onNavigateToCases?: () => void;
}

export function FirstCall({ onBack, onNavigateToCases }: FirstCallProps) {
  return (
    <FirstCallTimeline
      onBack={onBack}
      onNavigateToCases={onNavigateToCases}
    />
  );
}