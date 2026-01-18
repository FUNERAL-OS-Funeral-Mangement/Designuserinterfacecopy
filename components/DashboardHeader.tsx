'use client';

import { useRouter } from "next/navigation";
import {
  FolderOpen,
  Bell,
  Search,
  HelpCircle,
} from "lucide-react";
import { DashboardButton } from './shared/DashboardButton';
import { UserProfileDropdown } from './UserProfileDropdown';
import { useUserProfile } from '@/hooks/useUserProfile';

interface DashboardHeaderProps {
  onLogout?: () => void;
}

export function DashboardHeader({ onLogout }: DashboardHeaderProps) {
  const router = useRouter();
  const { userProfile, isLoading } = useUserProfile();

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Logo */}
          <div className="flex items-center gap-2 lg:hidden flex-shrink-0">
            <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
              <FolderOpen className="w-4 h-4 text-white" />
            </div>
            <span className="text-gray-900">Rite Path</span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md lg:mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-300 focus:bg-white transition-colors rounded-lg"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>

            {/* Need Help Button - DRY: Reusable help button */}
            <button
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors text-sm"
              title="Get help and support"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden lg:inline">Need help?</span>
            </button>
            
            {/* Dashboard Button & Profile Dropdown - DRY: Reused from LandingPage */}
            {!isLoading && userProfile && (
              <>
                <DashboardButton />
                <UserProfileDropdown userProfile={userProfile} />
              </>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-300"
            />
          </div>
        </div>
      </div>
    </header>
  );
}


