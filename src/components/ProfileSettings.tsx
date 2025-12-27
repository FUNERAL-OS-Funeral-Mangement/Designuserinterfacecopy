import { useState } from 'react';
import { ArrowLeft, Save, Bell, Mail, Phone, User, Award, CheckCircle2 } from 'lucide-react';
import { useProfileStore } from '../store/useProfileStore';

interface ProfileSettingsProps {
  onBack: () => void;
}

export function ProfileSettings({ onBack }: ProfileSettingsProps) {
  const { profile, updateProfile, updatePhoneNumber, updateEmailAddress, toggleSmsNotifications, toggleEmailNotifications } = useProfileStore();
  
  const [displayName, setDisplayName] = useState(profile.displayName || '');
  const [title, setTitle] = useState(profile.title || '');
  const [licenseNumber, setLicenseNumber] = useState(profile.licenseNumber || '');
  const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber || '');
  const [emailAddress, setEmailAddress] = useState(profile.emailAddress || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    updateProfile({
      displayName,
      title,
      licenseNumber,
    });
    updatePhoneNumber(phoneNumber);
    updateEmailAddress(emailAddress);
    
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const cleaned = value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setPhoneNumber(formatted);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 transition-colors rounded-lg"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex-1">
              <h1 className="text-gray-900">Profile Settings</h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage your profile and notification preferences
              </p>
            </div>
            <button
              onClick={handleSave}
              className="px-4 md:px-6 py-2.5 bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-2 rounded-lg"
            >
              <Save className="w-4 h-4" />
              <span className="hidden md:inline">Save Changes</span>
              <span className="md:hidden">Save</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Save Success Message */}
        {saveSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 p-4 rounded-lg flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-sm text-green-900">Profile settings saved successfully!</p>
          </div>
        )}

        {/* Personal Information */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <User className="w-5 h-5 text-gray-600" />
            <h2 className="text-gray-900">Personal Information</h2>
          </div>

          <div className="space-y-6">
            {/* Display Name */}
            <div>
              <label className="block text-sm text-gray-900 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="John Smith"
                className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 transition-colors rounded-lg"
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm text-gray-900 mb-2">
                Title / Position
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Funeral Director"
                className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 transition-colors rounded-lg"
              />
            </div>

            {/* License Number */}
            <div>
              <label className="block text-sm text-gray-900 mb-2">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>License Number</span>
                </div>
              </label>
              <input
                type="text"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                placeholder="FD-12345"
                className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 transition-colors rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <Phone className="w-5 h-5 text-gray-600" />
            <h2 className="text-gray-900">Contact Information</h2>
          </div>

          <div className="space-y-6">
            {/* Phone Number */}
            <div>
              <label className="block text-sm text-gray-900 mb-2">
                Mobile Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="(555) 123-4567"
                  maxLength={14}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 transition-colors rounded-lg"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Used for SMS notifications when documents are signed
              </p>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm text-gray-900 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="john@funeralhome.com"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 transition-colors rounded-lg"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Used for email notifications and account recovery
              </p>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <Bell className="w-5 h-5 text-gray-600" />
            <h2 className="text-gray-900">Notification Preferences</h2>
          </div>

          <div className="space-y-6">
            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <p className="text-sm text-gray-900 mb-2">
                📱 Get notified instantly when documents are signed
              </p>
              <p className="text-xs text-gray-600">
                Receive real-time alerts when families complete eSignatures on body release forms, cremation authorizations, and other critical documents.
              </p>
            </div>

            {/* SMS Notifications Toggle */}
            <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <h3 className="text-gray-900">SMS Text Messages</h3>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  Receive instant SMS alerts to {phoneNumber || 'your mobile phone'}
                </p>
                <p className="text-xs text-gray-500">
                  Powered by AWS Pinpoint • Standard SMS rates may apply
                </p>
              </div>
              <button
                onClick={toggleSmsNotifications}
                disabled={!phoneNumber}
                className={`
                  relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                  transition-colors duration-200 ease-in-out focus:outline-none
                  ${profile.notifications.smsEnabled ? 'bg-blue-600' : 'bg-gray-200'}
                  ${!phoneNumber ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <span
                  className={`
                    inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                    ${profile.notifications.smsEnabled ? 'translate-x-5' : 'translate-x-0'}
                  `}
                />
              </button>
            </div>

            {!phoneNumber && profile.notifications.smsEnabled && (
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
                <p className="text-xs text-amber-900">
                  ⚠️ Please add your phone number above to enable SMS notifications
                </p>
              </div>
            )}

            {/* Email Notifications Toggle */}
            <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <h3 className="text-gray-900">Email Notifications</h3>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  Receive email alerts to {emailAddress || 'your email address'}
                </p>
                <p className="text-xs text-gray-500">
                  Includes PDF attachments of signed documents
                </p>
              </div>
              <button
                onClick={toggleEmailNotifications}
                disabled={!emailAddress}
                className={`
                  relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                  transition-colors duration-200 ease-in-out focus:outline-none
                  ${profile.notifications.emailEnabled ? 'bg-blue-600' : 'bg-gray-200'}
                  ${!emailAddress ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <span
                  className={`
                    inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                    ${profile.notifications.emailEnabled ? 'translate-x-5' : 'translate-x-0'}
                  `}
                />
              </button>
            </div>

            {!emailAddress && profile.notifications.emailEnabled && (
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
                <p className="text-xs text-amber-900">
                  ⚠️ Please add your email address above to enable email notifications
                </p>
              </div>
            )}

            {/* Example Notification Preview */}
            {(profile.notifications.smsEnabled || profile.notifications.emailEnabled) && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-900 mb-3">📬 Example notification:</p>
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                  {profile.notifications.smsEnabled && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-1">SMS:</p>
                      <p className="text-sm text-gray-900 font-mono">
                        ✅ Document signed!<br />
                        Sarah Johnson completed Body Release Form for case RTP-202412-0042.<br />
                        View: ritepath.app/cases/...
                      </p>
                    </div>
                  )}
                  {profile.notifications.emailEnabled && (
                    <div className={profile.notifications.smsEnabled ? 'pt-3 border-t border-gray-200' : ''}>
                      <p className="text-xs text-gray-500 mb-1">Email:</p>
                      <p className="text-sm text-gray-900">
                        <strong>Subject:</strong> ✅ Document Signed - Case RTP-202412-0042<br />
                        <span className="text-gray-600 text-xs mt-1 block">
                          Includes signed PDF attachment and case details
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Save Button (Mobile Fixed) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <button
            onClick={handleSave}
            className="w-full px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 rounded-lg"
          >
            <Save className="w-5 h-5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
}
