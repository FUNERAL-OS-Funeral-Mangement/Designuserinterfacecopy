import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface NotificationPreferences {
  smsEnabled: boolean;
  emailEnabled: boolean;
  phoneNumber: string;
  emailAddress: string;
}

export interface UserProfile {
  displayName: string;
  phoneNumber: string;
  emailAddress: string;
  title?: string;
  licenseNumber?: string;
  notifications: NotificationPreferences;
}

interface ProfileStore {
  profile: UserProfile;
  
  // Actions
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateNotificationPreferences: (preferences: Partial<NotificationPreferences>) => void;
  toggleSmsNotifications: () => void;
  toggleEmailNotifications: () => void;
  updatePhoneNumber: (phoneNumber: string) => void;
  updateEmailAddress: (emailAddress: string) => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: {
        displayName: '',
        phoneNumber: '',
        emailAddress: '',
        title: '',
        licenseNumber: '',
        notifications: {
          smsEnabled: true,
          emailEnabled: true,
          phoneNumber: '',
          emailAddress: '',
        },
      },

      updateProfile: (updates) => {
        set((state) => ({
          profile: { ...state.profile, ...updates },
        }));
      },

      updateNotificationPreferences: (preferences) => {
        set((state) => ({
          profile: {
            ...state.profile,
            notifications: {
              ...state.profile.notifications,
              ...preferences,
            },
          },
        }));
      },

      toggleSmsNotifications: () => {
        set((state) => ({
          profile: {
            ...state.profile,
            notifications: {
              ...state.profile.notifications,
              smsEnabled: !state.profile.notifications.smsEnabled,
            },
          },
        }));
      },

      toggleEmailNotifications: () => {
        set((state) => ({
          profile: {
            ...state.profile,
            notifications: {
              ...state.profile.notifications,
              emailEnabled: !state.profile.notifications.emailEnabled,
            },
          },
        }));
      },

      updatePhoneNumber: (phoneNumber) => {
        set((state) => ({
          profile: {
            ...state.profile,
            phoneNumber,
            notifications: {
              ...state.profile.notifications,
              phoneNumber,
            },
          },
        }));
      },

      updateEmailAddress: (emailAddress) => {
        set((state) => ({
          profile: {
            ...state.profile,
            emailAddress,
            notifications: {
              ...state.profile.notifications,
              emailAddress,
            },
          },
        }));
      },
    }),
    {
      name: 'rite-path-profile-storage',
    }
  )
);
