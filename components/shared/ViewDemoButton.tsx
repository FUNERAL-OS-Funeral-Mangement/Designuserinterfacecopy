'use client';

import { Eye } from 'lucide-react';
import { cn } from '@/components/ui/utils';

interface ViewDemoButtonProps {
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const ViewDemoButton = ({ className = "", onClick, type = 'button' }: ViewDemoButtonProps) => {
  const handleClick = () => {
    if (!onClick) return;
    onClick();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    if (type === 'submit') return;
    e.preventDefault();
    handleClick();
  };

  return (
    <button
      type={type}
      onClick={type === 'submit' ? undefined : handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "inline-flex items-center justify-center gap-2 px-6 py-3 text-base text-white bg-[#1aabe2] hover:bg-[#1aabe2]/90 rounded-lg hover:shadow-lg transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-[#1aabe2] focus:ring-offset-2",
        className
      )}
      aria-label="Start 14 day free trial"
    >
      <span>14 Day Free Trial</span>
      <Eye className="w-4 h-4" aria-hidden="true" />
    </button>
  );
};

