import { NextRequest, NextResponse } from "next/server";
import { notifyStaffNewCase, notifyStaffDocumentSigned } from "@/lib/twilio";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, staffPhone, ...data } = body;

    if (!staffPhone) {
      return NextResponse.json(
        { error: "Staff phone number is required" },
        { status: 400 }
      );
    }

    let result;

    switch (type) {
      case "new-case":
        result = await notifyStaffNewCase(
          staffPhone,
          data.deceasedName,
          data.nextOfKinName,
          data.locationOfDeath,
          data.caseId
        );
        break;

      case "document-signed":
        result = await notifyStaffDocumentSigned(
          staffPhone,
          data.signerName,
          data.documentType,
          data.deceasedName,
          data.caseId
        );
        break;

      default:
        return NextResponse.json(
          { error: "Invalid notification type" },
          { status: 400 }
        );
    }

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        messageSid: result.messageSid 
      });
    } else {
      return NextResponse.json(
        { error: "Failed to send SMS", details: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Notification API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

