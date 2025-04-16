import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { handleError } from "@/lib/error-handler";
import { calculateCreditScore } from "@/lib/gemini-ai";

// Handler for fetching user's credit score
export async function GET(req: Request) {
  try {
    const session = await auth();

    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const creditScore = await calculateCreditScore(session.user.id);

    return NextResponse.json({ creditScore });
  } catch (error) {
    return handleError(error);
  }
}
