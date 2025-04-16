import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { handleError } from "@/lib/error-handler";

// Handler for approving or rejecting KYC verification
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

    const kycVerification = await prismadb.kYCVerification.findUnique({
      where: { id: params.id },
    });

    if (!kycVerification) {
      return NextResponse.json(
        { error: "KYC verification not found" },
        { status: 404 }
      );
    }

    const status = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';

    const updatedKYC = await prismadb.kYCVerification.update({
      where: { id: params.id },
      data: { status },
    });

    // Update user's KYC status
    await prismadb.user.update({
      where: { id: kycVerification.userId },
      data: { kycStatus: status },
    });

    return NextResponse.json(updatedKYC);
  } catch (error) {
    return handleError(error);
  }
}
