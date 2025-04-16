import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { withdrawalSchema } from "@/lib/validations";
import { createApiResponse, handleApiError } from "@/lib/api-utils";
import { processWithdrawal } from "@/lib/wallet";
import { verifyAccountNumber } from "@/lib/paystack";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id as string; // Cast to string to resolve type error

    if (!userId) {
      return NextResponse.json(
        { error: "User ID not found" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validatedData = withdrawalSchema.parse({
      ...body,
      userId: userId,
    });

    // Verify bank account details
    const accountVerification = await verifyAccountNumber(
      validatedData.accountNumber,
      validatedData.bankCode
    );

    // Calculate transaction fee (1% for admin)
    const transactionFeePercentage = 1;
    const transactionFee = (validatedData.amount * transactionFeePercentage) / 100;
    const netAmount = validatedData.amount - transactionFee;

    // Process withdrawal
    const transaction = await processWithdrawal(
      userId,
      netAmount,
      {
        bankCode: validatedData.bankCode,
        accountNumber: validatedData.accountNumber,
      }
    );

    return createApiResponse(
      {
        transaction,
        accountName: accountVerification.account_name,
        transactionFee,
      },
      "Withdrawal request processed successfully"
    );
  } catch (error) {
    return handleApiError(error);
  }
}