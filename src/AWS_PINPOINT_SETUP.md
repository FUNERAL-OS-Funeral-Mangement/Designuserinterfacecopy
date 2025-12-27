# AWS Pinpoint SMS/Email Notification Setup

## Overview

Rite Path uses AWS Pinpoint to send real-time SMS and email notifications to funeral directors when documents are eSigned via HelloSign.

---

## 📋 Configuration Provided

- **AWS Region**: `us-east-1` (N. Virginia)
- **Pinpoint Project ID**: `81790639de234b668daec0520642b18e`
- **Origination Phone Number**: `+1 855-582-7097` (Toll-free, TRANSACTIONAL)
- **Permission**: `mobiletargeting:SendMessages`

---

## ⚠️ Still Needed

To complete the AWS Pinpoint integration, please provide:

1. **AWS Access Key ID**
2. **AWS Secret Access Key**

These credentials should have IAM permissions for:
- `mobiletargeting:SendMessages`
- `mobiletargeting:SendEmailMessage` (if using email)

---

## 🔧 Setup Instructions

### Step 1: Create IAM User with Pinpoint Permissions

1. Go to AWS IAM Console
2. Create a new user: `ritepath-pinpoint-user`
3. Attach the following policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "mobiletargeting:SendMessages",
        "mobiletargeting:SendEmailMessage"
      ],
      "Resource": "arn:aws:mobiletargeting:us-east-1:*:apps/81790639de234b668daec0520642b18e*"
    }
  ]
}
```

4. Generate Access Keys and save them securely

---

### Step 2: Add Secrets to Supabase Edge Functions

Once you have the AWS credentials, add them to Supabase:

```bash
supabase secrets set AWS_PINPOINT_REGION=us-east-1
supabase secrets set AWS_PINPOINT_APP_ID=81790639de234b668daec0520642b18e
supabase secrets set AWS_PINPOINT_PHONE_NUMBER=+18555827097
supabase secrets set AWS_ACCESS_KEY_ID=<your-access-key-id>
supabase secrets set AWS_SECRET_ACCESS_KEY=<your-secret-access-key>
```

---

## 📱 Notification Flow

```
HelloSign Document Signed
         ↓
Webhook → Supabase Edge Function
         ↓
Check Director's Notification Preferences
         ↓
    ┌────────┴────────┐
    ↓                 ↓
SMS Enabled?     Email Enabled?
    ↓                 ↓
AWS Pinpoint     AWS Pinpoint
SendMessages     SendEmailMessage
    ↓                 ↓
📱 Director      📧 Director
Receives SMS     Receives Email
```

---

## 🎯 User Profile Settings

Funeral directors can configure their notification preferences in **Profile Settings**:

### Features:
- ✅ Add mobile phone number (auto-formatted)
- ✅ Add email address
- ✅ Toggle SMS notifications ON/OFF
- ✅ Toggle Email notifications ON/OFF
- ✅ Preview notification examples

### Storage:
Notification preferences are stored in Zustand with localStorage persistence:

```typescript
{
  profile: {
    phoneNumber: "(555) 123-4567",
    emailAddress: "director@funeralhome.com",
    notifications: {
      smsEnabled: true,
      emailEnabled: true,
      phoneNumber: "(555) 123-4567",
      emailAddress: "director@funeralhome.com"
    }
  }
}
```

---

## 📨 Notification Templates

### SMS Notification (160 characters max)
```
✅ Document signed!
Sarah Johnson completed Body Release Form for case RTP-202412-0042.
View: ritepath.app/cases/abc123
```

### Email Notification
```
Subject: ✅ Document Signed - Case RTP-202412-0042

Body:
Hello [Director Name],

Sarah Johnson has completed the eSignature for:
- Document: Body Release Form
- Case: RTP-202412-0042
- Date: December 24, 2024 at 3:45 PM

View case details: https://ritepath.app/cases/abc123

---
Rite Path
Funeral Home Management System
```

---

## 🚀 Implementation Checklist

### ✅ Completed:
- [x] Profile Settings UI created
- [x] Zustand store for notification preferences
- [x] Phone number formatting (US format)
- [x] SMS/Email toggle switches
- [x] Notification preview examples
- [x] Dashboard "Settings" button added
- [x] Navigation routing for Profile Settings

### ⏳ Pending (waiting for AWS credentials):
- [ ] Supabase Edge Function for sending SMS
- [ ] Supabase Edge Function for sending Email
- [ ] AWS Pinpoint API integration
- [ ] HelloSign webhook handler update
- [ ] Error handling & retry logic
- [ ] Delivery status tracking

---

## 📝 Next Steps

1. **Provide AWS Access Key ID + Secret Access Key**
2. I'll create the Supabase Edge Functions:
   - `/supabase/functions/send-signature-notification/index.ts`
   - AWS SDK integration for Pinpoint
3. Update HelloSign webhook handler to trigger notifications
4. Test with real phone number and email

---

## 🔒 Security Notes

- AWS credentials stored as Supabase secrets (encrypted)
- Never expose credentials in client-side code
- Use environment variables for all sensitive data
- Phone numbers validated before sending SMS
- Email addresses validated before sending emails
- Rate limiting on notification sending

---

## 📞 AWS Pinpoint Limits

**SMS:**
- US Toll-Free: 3 messages/second
- Monthly spend limit: Check AWS Console

**Email:**
- Default SES sandbox: 200 emails/day
- Request production access for higher limits

---

## 🛠️ Testing

Once credentials are provided, test with:

1. **Test SMS**: Send to your personal phone
2. **Test Email**: Send to your personal email
3. **Test Toggles**: Verify ON/OFF switches work
4. **Test Formatting**: Ensure phone/email formats are correct
5. **Test Fallback**: Email sent if SMS fails

---

## 📚 References

- [AWS Pinpoint SMS API](https://docs.aws.amazon.com/pinpoint/latest/developerguide/send-messages-sms.html)
- [AWS Pinpoint Email API](https://docs.aws.amazon.com/pinpoint/latest/developerguide/send-messages-email.html)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)

---

**Status**: ⏳ Waiting for AWS Access Key ID + Secret Access Key to complete integration.
