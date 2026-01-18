'use client';

import { cn } from '@/components/ui/utils';

interface BookDemoButtonProps {
  className?: string;
  onClick?: () => void;
}

export const BookDemoButton = ({ className = "", onClick }: BookDemoButtonProps) => {
  const handleClick = () => {
    if (!onClick) return;
    onClick();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    handleClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "inline-flex items-center justify-center gap-2 px-6 py-3 text-base text-slate-700 bg-white border-2 border-slate-300 hover:border-[#1aabe2] hover:text-[#1aabe2] rounded-lg hover:shadow-sm transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-[#1aabe2] focus:ring-offset-2",
        className
      )}
      aria-label="Book a demo"
    >
      <span>Book Demo</span>
    </button>
  );
};

