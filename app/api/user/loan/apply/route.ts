import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { handleError } from "@/lib/error-handler";
import { LoanApplicationSchema } from "@/lib/validation-schemas";
import { calculateCreditScore } from "@/lib/gemini-ai";

// Handler for applying for a loan
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
    const validation = LoanApplicationSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input data", details: validation.error.errors },
        { status: 400 }
      );
    }

    const { amount, purpose, repaymentPeriod } = validation.data;

    // Calculate credit score using Gemini AI
    const creditScore = await calculateCreditScore(session.user.id);

    // Check if user has a sufficient credit score for the loan
    if (creditScore < 500) {
      return NextResponse.json(
        { error: "Insufficient credit score for loan application" },
        { status: 400 }
      );
    }

    // Calculate interest (20% interest rate)
    const interestRate = 20;
    const interestAmount = (amount * interestRate) / 100;
    const totalRepayment = amount + interestAmount;

    const loanApplication = await prismadb.loanApplication.create({
      data: {
        amount,
        purpose,
        repaymentPeriod,
        totalRepayment,
        interestAmount,
        userId: session.user.id,
        status: "PENDING",
      },
    });

    return NextResponse.json(loanApplication, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
