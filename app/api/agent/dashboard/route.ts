import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { handleError } from "@/lib/error-handler";

// Handler for fetching agent dashboard data
export async function GET(req: Request) {
  try {
    const session = await auth();

    // Check if user is authenticated and is an agent
    if (!session?.user || session.user.role !== "AGENT") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const totalUsers = await prismadb.user.count({
      where: { agentId: session.user.id },
    });

    const totalGroups = await prismadb.ajoGroup.count({
      where: { agentId: session.user.id },
    });

    const pendingWithdrawals = await prismadb.withdrawalRequest.count({
      where: { status: "PENDING", agentId: session.user.id },
    });

    const pendingLoans = await prismadb.loanApplication.count({
      where: { status: "PENDING", agentId: session.user.id },
    });

    const wallet = await prismadb.wallet.findUnique({
      where: { userId: session.user.id },
    });

    return NextResponse.json({
      totalUsers,
      totalGroups,
      pendingWithdrawals,
      pendingLoans,
      walletBalance: wallet?.balance || 0,
    });
  } catch (error) {
    return handleError(error);
  }
}
