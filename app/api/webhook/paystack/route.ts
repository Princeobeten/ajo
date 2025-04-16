import { NextResponse } from "next/server";
import crypto from "crypto";
import { verifyPayment } from "@/lib/paystack";
import { processFunding } from "@/lib/wallet";
import { createApiResponse, handleApiError } from "@/lib/api-utils";

// Verify Paystack webhook signature
function verifySignature(req: Request, body: string) {
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest("hex");

  return hash === req.headers.get("x-paystack-signature");
}

export async function POST(req: Request) {
  try {
    const body = await req.text();

    // Verify webhook signature
    if (!verifySignature(req, body)) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    const event = JSON.parse(body);

    // Handle only successful charges
    if (event.event === "charge.success") {
      const payment = await verifyPayment(event.data.reference);

      // Process only successful payments
      if (payment.status === "success") {
        const metadata = payment.metadata;

        // Handle different payment types
        switch (metadata.type) {
          case "WALLET_FUNDING":
            await processFunding(
              metadata.userId,
              payment.amount / 100, // Convert from kobo to naira
              payment.reference
            );
            break;

          // Add other payment types here (e.g., loan repayment, savings)
          default:
            console.log(`Unhandled payment type: ${metadata.type}`);
        }
      }
    }

    return createApiResponse(null, "Webhook processed successfully");
  } catch (error) {
    return handleApiError(error);
  }
}

// Disable body parsing, verify raw body
export const config = {
  api: {
    bodyParser: false,
  },
}; 