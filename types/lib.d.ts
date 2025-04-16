declare module '@/lib/auth' {
  export function auth(): Promise<any>;
}

declare module '@/lib/prismadb' {
  const prismadb: any;
  export default prismadb;
}

declare module '@/lib/error-handler' {
  export function handleError(error: any): any;
}

declare module '@/lib/validation-schemas' {
  export const TargetSavingsSchema: any;
  export const AjoGroupSchema: any;
  export const LoanApplicationSchema: any;
  export const SupportTicketSchema: any;
}

declare module '@/lib/gemini-ai' {
  export function calculateCreditScore(userId: string): Promise<number>;
}
