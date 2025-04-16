import { NextResponse } from "next/server";
import { ZodError } from "zod";

export type ApiResponse<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
  error?: string | null;
  errors?: any[];
};

export class ApiError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 400,
    public errors?: any[]
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function createApiResponse<T>(
  data?: T,
  message?: string,
  statusCode: number = 200
): NextResponse {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };

  return NextResponse.json(response, { status: statusCode });
}

export function handleApiError(error: unknown): NextResponse {
  console.error("API Error:", error);

  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        errors: error.errors,
      },
      { status: error.statusCode }
    );
  }

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        message: "Validation error",
        errors: error.errors,
      },
      { status: 400 }
    );
  }

  // Handle other types of errors
  const statusCode = error instanceof Error ? 400 : 500;
  const message =
    error instanceof Error
      ? error.message
      : "An unexpected error occurred";

  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status: statusCode }
  );
}

export async function withErrorHandler(
  handler: () => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    return await handler();
  } catch (error) {
    return handleApiError(error);
  }
}

// Utility function to get authenticated user from the request
export async function getAuthUser(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) {
    throw new ApiError("Unauthorized", 401);
  }

  try {
    // Verify and decode the token
    // Implementation depends on your auth strategy
    return {}; // Return decoded user
  } catch (error) {
    throw new ApiError("Invalid token", 401);
  }
} 