import { cn } from '@/components/ui/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div className={cn("relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100", className)}>
      {children}
    </div>
  );
};

