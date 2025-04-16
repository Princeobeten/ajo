import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { handleError } from "@/lib/error-handler";
import prismadb from "@/lib/prismadb";

// Handler for user login
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Attempt to authenticate user
    const user = await prismadb.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Here you would typically check the password using bcrypt or similar
    // For now, we'll assume a simple check (NOT SECURE, just for demo)
    if (user.password !== password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // If successful, create a session (handled by NextAuth in a real app)
    // For now, just return a success message without actual session creation
    return NextResponse.json({ message: "Login successful", user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    return handleError(error);
  }
}
