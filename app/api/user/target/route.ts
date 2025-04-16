import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { handleError } from "@/lib/error-handler";
import { TargetSavingsSchema } from "@/lib/validation-schemas";

// Handler for creating a new target savings

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
    const validation = TargetSavingsSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input data", details: validation.error.errors },
        { status: 400 }
      );
    }

    const { name, amount, targetDate, description } = validation.data;

    const targetSavings = await prismadb.targetSavings.create({
      data: {
        name,
        amount,
        targetDate,
        description,
        userId: session.user.id,
      },
    });

    return NextResponse.json(targetSavings, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

// Handler for fetching all target savings for a user
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

    const targetSavings = await prismadb.targetSavings.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(targetSavings);
  } catch (error) {
    return handleError(error);
  }
}
