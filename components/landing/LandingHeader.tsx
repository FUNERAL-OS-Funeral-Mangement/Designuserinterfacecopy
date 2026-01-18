'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Bell } from 'lucide-react';
import { DashboardButton } from '@/components/shared/DashboardButton';
import { SignInButton } from '@/components/shared/SignInButton';
import { BookDemoButton } from '@/components/shared/BookDemoButton';
import { UserProfileDropdown } from '@/components/UserProfileDropdown';
import { useUserProfile } from '@/hooks/useUserProfile';
import { landingPageContent } from '@/data/landingPageContent';
import { cn } from '@/components/ui/utils';

interface AuthButtonsProps {
  className?: string;
  onBookDemo?: () => void;
}

interface NavigationLinksProps {
  className?: string;
  itemClassName?: string;
}

const NavigationLinks = ({ className = "", itemClassName = "" }: NavigationLinksProps) => {
  return (
    <>
      {landingPageContent.nav.map((item) => (
        <a
          key={item.label}
          href={item.href ?? "#"}
          className={cn(
            "text-base text-slate-700 transition-all duration-200 hover:text-slate-900",
            itemClassName
          )}
        >
          {item.label}
        </a>
      ))}
    </>
  );
};

const AuthButtons = ({ className = "", onBookDemo }: AuthButtonsProps) => {
  const { userProfile, isAuthenticated, isLoading } = useUserProfile();
  
  if (isLoading) return null;
  
  if (isAuthenticated && userProfile) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <DashboardButton />
        <UserProfileDropdown userProfile={userProfile} />
      </div>
    );
  }
  
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <BookDemoButton onClick={onBookDemo} />
      <SignInButton />
    </div>
  );
};

interface LandingHeaderProps {
  onBookDemo?: () => void;
}

export const LandingHeader = ({ onBookDemo }: LandingHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated } = useUserProfile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={cn(
      "sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm py-4 sm:py-6 transition-all duration-200",
      isScrolled && "border-b border-gray-200 shadow-sm",
      !isScrolled && "shadow-none"
    )}>
      <div className="px-4 mx-auto max-w-screen-2xl sm:px-6 lg:px-8 relative">
        <div className="flex items-center">
          {/* Logo */}
          <div className="shrink-0 ml-6 sm:ml-8 lg:ml-12">
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="/logos/RitePath_logo.webp" 
                alt="Rite Path Logo" 
                width={200} 
                height={48}
                className="h-10 md:h-16 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden ml-auto">
            <button
              type="button"
              className="text-black"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-10 lg:space-x-12 items-center">
            <NavigationLinks />
          </nav>

          {/* CTA / User Profile */}
          <div className="relative hidden md:inline-flex items-center gap-3 group shrink-0 ml-auto">
            {isAuthenticated && (
              <button
                type="button"
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#1aabe2] focus:ring-offset-2"
                title="Notifications"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" aria-hidden="true" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" aria-hidden="true" />
              </button>
            )}
            <AuthButtons onBookDemo={onBookDemo} />
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-6 bg-white backdrop-blur-lg rounded-2xl border border-slate-200 p-6 shadow-xl">
            <div className="flex flex-col space-y-6">
              <NavigationLinks itemClassName="block" />
              <AuthButtons className="flex-col w-full gap-3" onBookDemo={onBookDemo} />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

