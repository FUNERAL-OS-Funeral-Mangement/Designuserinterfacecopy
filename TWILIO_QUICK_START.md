# 🚀 Twilio SMS - Quick Start

## 1️⃣ Setup (5 minutes)

### Get Twilio Credentials
1. Sign up at [twilio.com/try-twilio](https://www.twilio.com/try-twilio)
2. Copy **Account SID** and **Auth Token** from dashboard
3. Buy a phone number: **Phone Numbers** → **Buy a Number** → Select SMS-capable number

### Configure Environment Variables
Create `.env.local` in your project root:

```bash
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_FROM_NUMBER=+15551234567
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 2️⃣ How to Use

### Send Signature Link to Family
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

### Notify All Staff at Once
```typescript
import { notifyAllStaffNewCase, getNotifiableStaff } from '@/lib/notifications';

const staffPhones = await getNotifiableStaff();
await notifyAllStaffNewCase(staffPhones, {
  deceasedName: 'John Doe',
  nextOfKinName: 'Jane Doe',
  locationOfDeath: 'Home',
  caseId: 'case-123',
});
```

---

## 3️⃣ Testing

Open browser console on your app:

```javascript
fetch('/api/notify-staff', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'new-case',
    staffPhone: '+15551234567',
    deceasedName: 'Test',
    nextOfKinName: 'Test Family',
    locationOfDeath: 'Test',
    caseId: 'test-123',
  }),
});
```

---

## 📞 Support

- Twilio Docs: [twilio.com/docs](https://www.twilio.com/docs)
- Twilio Console: [console.twilio.com](https://console.twilio.com)

**Cost:** ~$0.0079/SMS + $1/month for phone number
