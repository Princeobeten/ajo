import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { handleError } from "@/lib/error-handler";

// Handler for breaking a target savings before the target date
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const targetSavings = await prismadb.targetSavings.findUnique({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    if (!targetSavings) {
      return NextResponse.json(
        { error: "Target savings not found" },
        { status: 404 }
      );
    }

    // Calculate penalty (5% fee for breaking targeted saving before time)
    const penaltyPercentage = 5;
    const penaltyAmount = (targetSavings.amount * penaltyPercentage) / 100;
    const refundAmount = targetSavings.amount - penaltyAmount;

    // Update user's wallet balance
    const updatedWallet = await prismadb.wallet.update({
      where: { userId: session.user.id },
      data: { balance: { increment: refundAmount } },
    });

    // Delete the target savings record
    await prismadb.targetSavings.delete({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    // Record the transaction
    await prismadb.transaction.create({
      data: {
        userId: session.user.id,
        amount: refundAmount,
        type: "CREDIT",
        description: `Refund from breaking target savings: ${targetSavings.name}`,
        status: "COMPLETED",
      },
    });

    return NextResponse.json({
      message: "Target savings broken successfully",
      refundAmount,
      penaltyAmount,
      updatedWallet,
    });
  } catch (error) {
    return handleError(error);
  }
}
