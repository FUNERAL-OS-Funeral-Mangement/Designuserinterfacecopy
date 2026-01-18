'use client';

import Link from 'next/link';
import { cn } from '@/components/ui/utils';

interface SignInButtonProps {
  className?: string;
}

export const SignInButton = ({ className = "" }: SignInButtonProps) => {
  return (
    <Link
      href="/auth/login"
      className={cn(
        "inline-flex items-center justify-center gap-2 px-6 py-3 text-base text-white bg-[#1aabe2] hover:bg-[#1aabe2]/90 rounded-lg hover:shadow-sm transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-[#1aabe2] focus:ring-offset-2",
        className
      )}
      aria-label="Sign in to your account"
    >
      <span>Log In</span>
    </Link>
  );
};

