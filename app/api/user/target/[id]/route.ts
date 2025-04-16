import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { handleError } from "@/lib/error-handler";

// Handler for fetching a specific target savings
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const targetSavings = await prismadb.targetSavings.findUnique({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    if (!targetSavings) {
      return NextResponse.json(
        { error: "Target savings not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(targetSavings);
  } catch (error) {
    return handleError(error);
  }
}

// Handler for updating a target savings
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
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
    const targetSavings = await prismadb.targetSavings.update({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      data: body,
    });

    return NextResponse.json(targetSavings);
  } catch (error) {
    return handleError(error);
  }
}

// Handler for deleting a target savings
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const targetSavings = await prismadb.targetSavings.delete({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    return NextResponse.json(targetSavings);
  } catch (error) {
    return handleError(error);
  }
}
