import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { handleError } from "@/lib/error-handler";
import { SupportTicketSchema } from "@/lib/validation-schemas";

// Handler for creating a support ticket
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
    const validation = SupportTicketSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input data", details: validation.error.errors },
        { status: 400 }
      );
    }

    const { subject, description, category } = validation.data;

    const supportTicket = await prismadb.supportTicket.create({
      data: {
        subject,
        description,
        category,
        userId: session.user.id,
        status: "OPEN",
      },
    });

    return NextResponse.json(supportTicket, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
