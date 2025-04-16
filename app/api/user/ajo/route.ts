import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { handleError } from "@/lib/error-handler";
import { AjoGroupSchema } from "@/lib/validation-schemas";

// Handler for creating a new Ajo group
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
    const validation = AjoGroupSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input data", details: validation.error.errors },
        { status: 400 }
      );
    }

    const { name, description, contributionAmount, maxParticipants, isPrivate } = validation.data;

    const ajoGroup = await prismadb.ajoGroup.create({
      data: {
        name,
        description,
        contributionAmount,
        maxParticipants,
        isPrivate,
        creatorId: session.user.id,
      },
    });

    // Automatically join the creator to the group
    await prismadb.ajoGroupMember.create({
      data: {
        ajoGroupId: ajoGroup.id,
        userId: session.user.id,
        role: "CREATOR",
      },
    });

    return NextResponse.json(ajoGroup, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

// Handler for fetching all Ajo groups for a user
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

    const ajoGroups = await prismadb.ajoGroupMember.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        ajoGroup: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(ajoGroups.map((member: any) => member.ajoGroup));
  } catch (error) {
    return handleError(error);
  }
}
