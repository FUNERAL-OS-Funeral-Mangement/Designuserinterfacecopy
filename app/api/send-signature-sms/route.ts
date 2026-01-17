import { NextRequest, NextResponse } from "next/server";
import { sendSignatureLink } from "@/lib/twilio";

export async function POST(request: NextRequest) {
  try {
    const { to, signerName, deceasedName, signatureUrl } = await request.json();

    if (!to || !signerName || !deceasedName || !signatureUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await sendSignatureLink(
      to,
      signerName,
      deceasedName,
      signatureUrl
    );

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
    console.error("Signature SMS API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


