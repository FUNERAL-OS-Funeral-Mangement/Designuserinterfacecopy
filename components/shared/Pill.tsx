import { cn } from '@/components/ui/utils';

interface PillProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Pill = ({ icon, children, className }: PillProps) => {
  return (
    <div className={cn("inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full", className)}>
      {icon}
      <span className="text-sm text-slate-600 uppercase tracking-wide">{children}</span>
    </div>
  );
};

