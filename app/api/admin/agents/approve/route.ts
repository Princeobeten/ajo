import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { handleError } from "@/lib/error-handler";

// Handler for approving or rejecting agent applications
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

    const body = await req.json();
    const { action } = body; // 'APPROVE' or 'REJECT'

    if (!['APPROVE', 'REJECT'].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Use 'APPROVE' or 'REJECT'" },
        { status: 400 }
      );
    }

    const agentApplication = await prismadb.agentApplication.findUnique({
      where: { id: params.id },
    });

    if (!agentApplication) {
      return NextResponse.json(
        { error: "Agent application not found" },
        { status: 404 }
      );
    }

    const status = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';

    const updatedApplication = await prismadb.agentApplication.update({
      where: { id: params.id },
      data: { status },
    });

    // If approved, update user's role to AGENT
    if (action === 'APPROVE') {
      await prismadb.user.update({
        where: { id: agentApplication.userId },
        data: { role: "AGENT" },
      });
    }

    return NextResponse.json(updatedApplication);
  } catch (error) {
    return handleError(error);
  }
}
