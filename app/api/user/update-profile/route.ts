import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { handleError } from "@/lib/error-handler";

// Handler for updating user profile
export async function PATCH(req: Request) {
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
    const { name, phoneNumber, email } = body;

    // Check if email is being updated and if it's already in use
    if (email && email !== session.user.email) {
      const existingUser = await prismadb.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 409 }
        );
      }
    }

    const updatedUser = await prismadb.user.update({
      where: { id: session.user.id },
      data: {
        name: name || session.user.name,
        phoneNumber: phoneNumber || session.user.phoneNumber,
        email: email || session.user.email
      },
      select: {
        id: true,
        email: true,
        name: true,
        phoneNumber: true,
        role: true,
        kycStatus: true
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return handleError(error);
  }
}
