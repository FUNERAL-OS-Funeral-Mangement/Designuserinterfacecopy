'use client';

import Link from 'next/link';

interface DashboardButtonProps {
  className?: string;
}

// DRY: Reusable Dashboard button component - Used in LandingPage and Dashboard
export function DashboardButton({ className = "" }: DashboardButtonProps) {
  return (
    <Link href="/dashboard">
      <button
        className={`inline-flex items-center justify-center px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all duration-200 font-medium ${className}`}
      >
        Dashboard
      </button>
    </Link>
  );
}

