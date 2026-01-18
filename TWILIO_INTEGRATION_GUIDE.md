# Twilio SMS Integration - Complete Setup Guide

## ✅ Implementation Complete

All Twilio SMS functionality has been integrated into your RitePath application for both e-signature notifications and staff alerts.

---

## 📦 What Was Implemented

### **1. Core Twilio Helper Functions** (`lib/twilio.ts`)
- ✅ `sendSignatureLink()` - Send SMS with e-signature link to families
- ✅ `notifyStaffNewCase()` - Alert staff when new first call case is created
- ✅ `notifyStaffDocumentSigned()` - Alert staff when document is signed
- ✅ `notifyStaffUrgent()` - Send urgent alerts to staff
- ✅ `notifyAllStaff()` - Bulk SMS to multiple staff members

### **2. API Routes Created**
- ✅ `/api/notify-staff` - Handles staff notification requests
- ✅ `/api/send-signature-sms` - Sends SMS with signature links to families
- ✅ `/api/hellosign-webhook` - Receives HelloSign webhooks and triggers staff notifications

### **3. Helper Library** (`lib/notifications.ts`)
- ✅ High-level wrapper functions for easy use in components
- ✅ `notifyStaff()` - Send notification to one staff member
- ✅ `sendSignatureSMS()` - Send signature link via SMS
- ✅ `notifyAllStaffNewCase()` - Bulk notify about new cases
- ✅ `notifyAllStaffDocumentSigned()` - Bulk notify about signed documents
- ✅ `getNotifiableStaff()` - Get list of staff to notify

---

## 🔐 Environment Variables Required

Add these to your `.env.local` file:

```bash
# Twilio Configuration
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_FROM_NUMBER=+15551234567

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📋 How to Get Twilio Credentials

1. Go to [console.twilio.com](https://console.twilio.com)
2. Sign up or log in
3. On dashboard, copy:
   - **Account SID** → `TWILIO_ACCOUNT_SID`
   - **Auth Token** (click "Show") → `TWILIO_AUTH_TOKEN`
4. Go to **Phone Numbers** → **Buy a Number**
5. Select SMS-capable number → Purchase → Copy to `TWILIO_FROM_NUMBER`

---

## 🚀 Usage Examples

### In Components - Send Signature Link
```typescript
import { sendSignatureSMS } from '@/lib/notifications';

await sendSignatureSMS({
  to: '+15551234567',
  signerName: 'Jane Doe',
  deceasedName: 'John Doe',
  signatureUrl: 'https://app.hellosign.com/sign/abc123',
});
```

### Notify Staff of New Case
```typescript
import { notifyStaff } from '@/lib/notifications';

await notifyStaff({
  type: 'new-case',
  staffPhone: '+15551234567',
  deceasedName: 'John Doe',
  nextOfKinName: 'Jane Doe',
  locationOfDeath: 'Home',
  caseId: 'case-123',
});
```

### Notify All Staff
```typescript
import { getNotifiableStaff, notifyAllStaffNewCase } from '@/lib/notifications';

const staffPhones = await getNotifiableStaff();
await notifyAllStaffNewCase(staffPhones, {
  deceasedName: 'John Doe',
  nextOfKinName: 'Jane Doe',
  locationOfDeath: 'Home',
  caseId: 'case-123',
});
```

---

## 💰 Pricing

- **SMS (US/Canada)**: $0.0079 per message
- **Phone Number**: ~$1.00/month
- **Trial Credit**: $15 (enough for ~1,900 SMS)

---

## 📚 Documentation Files

- `TWILIO_INTEGRATION_GUIDE.md` - This file (complete guide)
- `TWILIO_QUICK_START.md` - Quick reference for daily use

---

For more details, see the full documentation in these files.
