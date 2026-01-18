'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-browser';

interface UserProfile {
  fullName: string | null;
  role: string | null;
  email: string | null;
  initials: string;
}

// DRY: Helper to extract name from email (e.g., michelle@ritepath.com -> "Michelle")
const getNameFromEmail = (email: string | null): string | null => {
  if (!email) return null;
  const localPart = email.split('@')[0];
  return localPart.charAt(0).toUpperCase() + localPart.slice(1);
};

// DRY: Helper to get first initial from name or email
const getInitial = (name: string | null, email: string | null): string => {
  if (name) {
    return name.trim().charAt(0).toUpperCase();
  }
  if (email) {
    return email.charAt(0).toUpperCase();
  }
  return 'U';
};

// DRY: Reusable hook for fetching user profile data
export function useUserProfile() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);

        if (session?.user) {
          // Fetch user profile from profiles table
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('full_name, role, email')
            .eq('id', session.user.id)
            .single();

          if (!error && profile) {
            const email = profile.email || session.user.email || null;
            // Always prefer email-derived name over "owner" or empty full_name
            const profileName = profile.full_name && profile.full_name.toLowerCase() !== 'owner' 
              ? profile.full_name 
              : null;
            const name = profileName || getNameFromEmail(email);
            setUserProfile({
              fullName: name,
              role: profile.role || 'Funeral Home Director',
              email: email,
              initials: getInitial(name, email),
            });
          } else {
            // Fallback to auth user data if profile doesn't exist
            const email = session.user.email || null;
            const metadataName = session.user.user_metadata?.full_name;
            // Ignore "owner" and prefer email-derived name
            const name = (metadataName && metadataName.toLowerCase() !== 'owner') 
              ? metadataName 
              : getNameFromEmail(email);
            setUserProfile({
              fullName: name,
              role: 'Funeral Home Director',
              email: email,
              initials: getInitial(name, email),
            });
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { userProfile, isAuthenticated, isLoading };
}

