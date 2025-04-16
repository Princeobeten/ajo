import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { handleError } from "@/lib/error-handler";

// Handler for processing agent payouts
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    // Check if user is authenticated and is an admin
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const agent = await prismadb.user.findUnique({
      where: { id: params.id, role: "AGENT" },
      include: { wallet: true },
    });

    if (!agent) {
      return NextResponse.json(
        { error: "Agent not found" },
        { status: 404 }
      );
    }

    if (!agent.wallet) {
      return NextResponse.json(
        { error: "Agent wallet not found" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { amount } = body;

    if (amount > agent.wallet.balance) {
      return NextResponse.json(
        { error: "Requested payout amount exceeds agent balance" },
        { status: 400 }
      );
    }

    // Create payout record
    const payout = await prismadb.agentPayout.create({
      data: {
        amount,
        agentId: agent.id,
        status: "PENDING",
      },
    });

    // Deduct amount from agent's wallet
    await prismadb.wallet.update({
      where: { userId: agent.id },
      data: { balance: { decrement: amount } },
    });

    // Record transaction
    await prismadb.transaction.create({
      data: {
        userId: agent.id,
        amount,
        type: "DEBIT",
        description: "Agent payout request",
        status: "PENDING",
        relatedId: payout.id,
      },
    });

    return NextResponse.json(payout, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
