import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { handleError } from "@/lib/error-handler";

// Handler for funding user's wallet
export async function POST(req: Request) {
  try {
    const session = await auth();

    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { amount, reference } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    // In a real app, this would verify the payment with Paystack API
    // For now, we'll simulate a successful payment
    const paymentVerified = true;

    if (!paymentVerified) {
      return NextResponse.json(
        { error: "Payment verification failed" },
        { status: 400 }
      );
    }

    // Update wallet balance
    const updatedWallet = await prismadb.wallet.update({
      where: { userId: session.user.id },
      data: { balance: { increment: amount } }
    });

    // Record the transaction
    await prismadb.transaction.create({
      data: {
        userId: session.user.id,
        amount,
        type: "DEPOSIT",
        description: "Wallet funding via Paystack",
        status: "COMPLETED",
        relatedId: reference || ""
      }
    });

    return NextResponse.json({
      message: "Wallet funded successfully",
      balance: updatedWallet.balance
    });
  } catch (error) {
    return handleError(error);
  }
}