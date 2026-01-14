import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// =====================================================
// 1. Send E-Signature Link to Family
// =====================================================
export async function sendSignatureLink(
  to: string,
  signerName: string,
  deceasedName: string,
  signatureUrl: string
) {
  try {
    const message = await client.messages.create({
      from: process.env.TWILIO_FROM_NUMBER,
      to,
      body: `Hi ${signerName}, please sign the documents for ${deceasedName}'s arrangements. Click here: ${signatureUrl} - RitePath Funeral Services`,
    });

    console.log("✅ Signature SMS sent:", message.sid);
    return { success: true, messageSid: message.sid };
  } catch (error) {
    console.error("❌ Failed to send signature SMS:", error);
    return { success: false, error };
  }
}

// =====================================================
// 2. Notify Staff of New First Call Case
// =====================================================
export async function notifyStaffNewCase(
  staffPhone: string,
  deceasedName: string,
  nextOfKinName: string,
  locationOfDeath: string,
  caseId: string
) {
  try {
    const message = await client.messages.create({
      from: process.env.TWILIO_FROM_NUMBER,
      to: staffPhone,
      body: `🔔 NEW FIRST CALL\n\nDeceased: ${deceasedName}\nNext of Kin: ${nextOfKinName}\nLocation: ${locationOfDeath}\n\nView: ${process.env.NEXT_PUBLIC_APP_URL}/first-call?case=${caseId}`,
    });

    console.log("✅ Staff notification sent:", message.sid);
    return { success: true, messageSid: message.sid };
  } catch (error) {
    console.error("❌ Failed to send staff notification:", error);
    return { success: false, error };
  }
}

// =====================================================
// 3. Notify Staff of Document Signed
// =====================================================
export async function notifyStaffDocumentSigned(
  staffPhone: string,
  signerName: string,
  documentType: string,
  deceasedName: string,
  caseId: string
) {
  try {
    const message = await client.messages.create({
      from: process.env.TWILIO_FROM_NUMBER,
      to: staffPhone,
      body: `✅ DOCUMENT SIGNED\n\n${signerName} signed ${documentType}\nCase: ${deceasedName}\n\nView: ${process.env.NEXT_PUBLIC_APP_URL}/first-call?case=${caseId}`,
    });

    console.log("✅ Staff signature notification sent:", message.sid);
    return { success: true, messageSid: message.sid };
  } catch (error) {
    console.error("❌ Failed to send staff notification:", error);
    return { success: false, error };
  }
}

// =====================================================
// 4. Notify Staff of Urgent Updates
// =====================================================
export async function notifyStaffUrgent(
  staffPhone: string,
  message: string
) {
  try {
    const sms = await client.messages.create({
      from: process.env.TWILIO_FROM_NUMBER,
      to: staffPhone,
      body: `🚨 URGENT: ${message}\n\n- RitePath`,
    });

    console.log("✅ Urgent notification sent:", sms.sid);
    return { success: true, messageSid: sms.sid };
  } catch (error) {
    console.error("❌ Failed to send urgent notification:", error);
    return { success: false, error };
  }
}

// =====================================================
// 5. Bulk Notify Multiple Staff Members
// =====================================================
export async function notifyAllStaff(
  staffPhones: string[],
  message: string
) {
  const results = await Promise.allSettled(
    staffPhones.map((phone) =>
      client.messages.create({
        from: process.env.TWILIO_FROM_NUMBER,
        to: phone,
        body: message,
      })
    )
  );

  const successful = results.filter((r) => r.status === "fulfilled");
  const failed = results.filter((r) => r.status === "rejected");

  console.log(`✅ Sent to ${successful.length}/${staffPhones.length} staff members`);
  
  return {
    success: successful.length > 0,
    totalSent: successful.length,
    totalFailed: failed.length,
  };
}
