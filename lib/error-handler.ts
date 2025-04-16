import { NextResponse } from "next/server";

/**
 * Centralized error handler for API routes
 * @param error - The error object or message
 * @returns NextResponse with appropriate error status and message
 */
export function handleError(error: unknown): NextResponse {
  console.error("API Error:", error);
  
  // Handle specific error types
  if (error instanceof Error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
  
  // Handle string errors
  if (typeof error === "string") {
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
  
  // Default error response
  return NextResponse.json(
    { error: "Internal Server Error" },
    { status: 500 }
  );
}
