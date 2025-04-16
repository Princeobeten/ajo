import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { handleError } from "@/lib/error-handler";

// Handler for fetching admin dashboard data
export async function GET(req: Request) {
  try {
    const session = await auth();

    // Check if user is authenticated and is an admin
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const totalUsers = await prismadb.user.count();
    const totalAgents = await prismadb.user.count({ where: { role: "AGENT" } });
    const totalAjoGroups = await prismadb.ajoGroup.count();
    const totalTargetSavings = await prismadb.targetSavings.count();
    const totalLoans = await prismadb.loanApplication.count();
    const pendingKYC = await prismadb.kYCVerification.count({ where: { status: "PENDING" } });
    const pendingWithdrawals = await prismadb.withdrawalRequest.count({ where: { status: "PENDING" } });
    const pendingLoanApplications = await prismadb.loanApplication.count({ where: { status: "PENDING" } });
    const totalTransactions = await prismadb.transaction.count();
    const totalSupportTickets = await prismadb.supportTicket.count({ where: { status: "OPEN" } });

    return NextResponse.json({
      totalUsers,
      totalAgents,
      totalAjoGroups,
      totalTargetSavings,
      totalLoans,
      pendingKYC,
      pendingWithdrawals,
      pendingLoanApplications,
      totalTransactions,
      totalSupportTickets,
    });
  } catch (error) {
    return handleError(error);
  }
}
