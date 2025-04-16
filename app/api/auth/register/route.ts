import { NextResponse } from "next/server";
import { handleError } from "@/lib/error-handler";
import prismadb from "@/lib/prismadb";

// Handler for user registration
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, phoneNumber } = body;

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prismadb.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Create new user
    const user = await prismadb.user.create({
      data: {
        email,
        password, // In a real app, hash this password with bcrypt
        name,
        phoneNumber: phoneNumber || null,
        role: "USER",
        kycStatus: "PENDING"
      }
    });

    // Create a wallet for the new user
    await prismadb.wallet.create({
      data: {
        userId: user.id,
        balance: 0
      }
    });

    return NextResponse.json(
      { message: "Registration successful", user: { id: user.id, email: user.email, name: user.name } },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error);
  }
}