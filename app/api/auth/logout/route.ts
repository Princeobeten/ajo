import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { handleError } from "@/lib/error-handler";

// Handler for user logout
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

    // In a real app, this would invalidate the session
    // For now, just return a success message
    return NextResponse.json({ message: "Logout successful" });
  } catch (error) {
    return handleError(error);
  }
}
