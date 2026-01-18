import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const event = body.event;

    console.log("📩 HelloSign webhook received:", event?.event_type);

    // Handle different event types
    switch (event?.event_type) {
      case "signature_request_signed":
        // Document has been signed by all parties
        const signatureRequest = event.signature_request;
        const metadata = signatureRequest?.metadata;

        if (metadata?.case_id) {
          // Notify staff that document was signed
          try {
            // Get staff phone numbers from settings
            // In production, this would query the database for staff to notify
            const staffPhones = [
              // These would come from your staff/settings store
              // For now, using placeholder
            ];

            // Send notification to each staff member
            for (const phone of staffPhones) {
              await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/notify-staff`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  type: "document-signed",
                  staffPhone: phone,
                  signerName: signatureRequest.signatures[0]?.signer_name || "Family member",
                  documentType: metadata.document_type || "Document",
                  deceasedName: metadata.deceased_name || "Case",
                  caseId: metadata.case_id,
                }),
              });
            }

            console.log(`✅ Staff notified of signed document for case ${metadata.case_id}`);
          } catch (error) {
            console.error("Failed to notify staff:", error);
          }
        }
        break;

      case "signature_request_viewed":
        // Document has been opened by signer
        console.log("📖 Document viewed");
        break;

      case "signature_request_sent":
        // Document has been sent to signer
        console.log("📤 Document sent");
        break;

      case "signature_request_declined":
        // Document was declined by signer
        console.log("❌ Document declined");
        // Could notify staff here as well
        break;

      default:
        console.log(`ℹ️ Unhandled event type: ${event?.event_type}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("HelloSign webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}


