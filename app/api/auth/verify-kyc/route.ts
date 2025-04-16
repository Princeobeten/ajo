import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { handleError } from "@/lib/error-handler";

// Handler for submitting KYC documents for verification
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
    const { documentType, documentUrl, bvnOrNin, utilityBill, bankStatement, signature, guarantorName, guarantorPhone, guarantorAddress, guarantorSignature } = body;

    const kycVerification = await prismadb.kYCVerification.create({
      data: {
        documentType: documentType || 'BVN/NIN',
        documentUrl: documentUrl || '',
        userId: session.user.id,
        status: "PENDING",
        bvnOrNin: bvnOrNin || '',
        utilityBill: utilityBill || '',
        bankStatement: bankStatement || '',
        signature: signature || '',
        guarantorName: guarantorName || '',
        guarantorPhone: guarantorPhone || '',
        guarantorAddress: guarantorAddress || '',
        guarantorSignature: guarantorSignature || ''
      },
    });

    return NextResponse.json(kycVerification, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
