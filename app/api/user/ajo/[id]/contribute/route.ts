import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { handleError } from "@/lib/error-handler";

// Handler for making a contribution to an Ajo group
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

    // Check if user is a member of the group
    const isMember = ajoGroup.members.some((member: any) => member.userId === session.user.id);
    if (!isMember) {
      return NextResponse.json(
        { error: "You are not a member of this group" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { amount } = body;

    // Check if contribution amount matches the group's required amount
    if (amount !== ajoGroup.contributionAmount) {
      return NextResponse.json(
        { error: `Contribution amount must be ${ajoGroup.contributionAmount}` },
        { status: 400 }
      );
    }

    // Check user's wallet balance
    const wallet = await prismadb.wallet.findUnique({
      where: { userId: session.user.id },
    });

    if (!wallet || wallet.balance < amount) {
      return NextResponse.json(
        { error: "Insufficient funds in wallet" },
        { status: 400 }
      );
    }

    // Deduct amount from user's wallet
    await prismadb.wallet.update({
      where: { userId: session.user.id },
      data: { balance: { decrement: amount } },
    });

    // Record the contribution
    const contribution = await prismadb.ajoContribution.create({
      data: {
        amount,
        ajoGroupId: ajoGroup.id,
        userId: session.user.id,
      },
    });

    // Record the transaction
    await prismadb.transaction.create({
      data: {
        userId: session.user.id,
        amount,
        type: "DEBIT",
        description: `Contribution to Ajo group: ${ajoGroup.name}`,
        status: "COMPLETED",
      },
    });

    // Update group's total saved amount
    await prismadb.ajoGroup.update({
      where: { id: ajoGroup.id },
      data: { totalSaved: { increment: amount } },
    });

    return NextResponse.json(contribution, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
