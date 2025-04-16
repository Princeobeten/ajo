import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { handleError } from "@/lib/error-handler";

// Handler for getting current session information
export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role
      },
      isAuthenticated: true
    });
  } catch (error) {
    return handleError(error);
  }
}
