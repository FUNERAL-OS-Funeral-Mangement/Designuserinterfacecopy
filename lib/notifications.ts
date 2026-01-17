/**
 * Notification Helper Functions
 * 
 * High-level functions for sending notifications in your app.
 * These wrap the API routes for easier use in components.
 */

export interface NotifyStaffParams {
  type: 'new-case' | 'document-signed';
  staffPhone: string;
  deceasedName: string;
  nextOfKinName?: string;
  locationOfDeath?: string;
  signerName?: string;
  documentType?: string;
  caseId: string;
}

export interface SendSignatureSMSParams {
  to: string;
  signerName: string;
  deceasedName: string;
  signatureUrl: string;
}

/**
 * Send notification to a staff member
 */
export const notifyStaff = async (params: NotifyStaffParams) => {
  try {
    const response = await fetch('/api/notify-staff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`Failed to notify staff: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, messageSid: data.messageSid };
  } catch (error) {
    console.error('Failed to notify staff:', error);
    return { success: false, error };
  }
};

/**
 * Send SMS with signature link to family member
 */
export const sendSignatureSMS = async (params: SendSignatureSMSParams) => {
  try {
    const response = await fetch('/api/send-signature-sms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`Failed to send signature SMS: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, messageSid: data.messageSid };
  } catch (error) {
    console.error('Failed to send signature SMS:', error);
    return { success: false, error };
  }
};

/**
 * Notify all staff members about a new case
 */
export const notifyAllStaffNewCase = async (
  staffPhones: string[],
  caseData: {
    deceasedName: string;
    nextOfKinName: string;
    locationOfDeath: string;
    caseId: string;
  }
) => {
  const results = await Promise.allSettled(
    staffPhones.map((phone) =>
      notifyStaff({
        type: 'new-case',
        staffPhone: phone,
        ...caseData,
      })
    )
  );

  const successful = results.filter((r) => r.status === 'fulfilled');
  const failed = results.filter((r) => r.status === 'rejected');

  return {
    success: successful.length > 0,
    totalSent: successful.length,
    totalFailed: failed.length,
  };
};

/**
 * Notify all staff members about a signed document
 */
export const notifyAllStaffDocumentSigned = async (
  staffPhones: string[],
  documentData: {
    signerName: string;
    documentType: string;
    deceasedName: string;
    caseId: string;
  }
) => {
  const results = await Promise.allSettled(
    staffPhones.map((phone) =>
      notifyStaff({
        type: 'document-signed',
        staffPhone: phone,
        ...documentData,
      })
    )
  );

  const successful = results.filter((r) => r.status === 'fulfilled');
  const failed = results.filter((r) => r.status === 'rejected');

  return {
    success: successful.length > 0,
    totalSent: successful.length,
    totalFailed: failed.length,
  };
};

/**
 * Get phone numbers of staff who should be notified
 */
export const getNotifiableStaff = async () => {
  // Dynamically import to avoid circular dependencies
  const { useStaffStore } = await import('@/store/useStaffStore');
  const { useProfileStore } = await import('@/store/useProfileStore');

  const staffStore = useStaffStore.getState();
  const profileStore = useProfileStore.getState();

  // Get staff phone numbers (funeral directors and available removal teams)
  const staffPhones = staffStore.staff
    .filter(
      (s) =>
        (s.role === 'funeral-director' || s.role === 'removal-team') &&
        s.availability !== 'unavailable' &&
        s.phone
    )
    .map((s) => s.phone);

  // Add current user if notifications enabled
  if (
    profileStore.profile.notifications.smsEnabled &&
    profileStore.profile.notifications.phoneNumber
  ) {
    staffPhones.push(profileStore.profile.notifications.phoneNumber);
  }

  // Remove duplicates and filter out empty values
  return [...new Set(staffPhones)].filter(Boolean);
};


