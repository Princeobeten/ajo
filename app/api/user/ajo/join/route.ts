import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { handleError } from "@/lib/error-handler";

// Handler for joining an Ajo group
export async function POST(
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

    const ajoGroup = await prismadb.ajoGroup.findUnique({
      where: { id: params.id },
      include: { members: true },
    });

    if (!ajoGroup) {
      return NextResponse.json(
        { error: "Ajo group not found" },
        { status: 404 }
      );
    }

    // Check if group is full
    if (ajoGroup.members.length >= ajoGroup.maxParticipants) {
      return NextResponse.json(
        { error: "Ajo group is full" },
        { status: 400 }
      );
    }

    // Check if user is already a member
    const isMember = ajoGroup.members.some(member => member.userId === session.user.id);
    if (isMember) {
      return NextResponse.json(
        { error: "You are already a member of this group" },
        { status: 400 }
      );
    }

    // Join the group
    await prismadb.ajoGroupMember.create({
      data: {
        ajoGroupId: ajoGroup.id,
        userId: session.user.id,
        role: "MEMBER",
      },
    });

    return NextResponse.json({ message: "Successfully joined the group" });
  } catch (error) {
    return handleError(error);
  }
}
