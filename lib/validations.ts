import { z } from "zod";
import { SYSTEM_SETTINGS } from "./constants";

// Auth Schemas
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().optional(),
});

// KYC Schemas
export const kycDocumentSchema = z.object({
  type: z.enum(SYSTEM_SETTINGS.KYC.REQUIRED_DOCUMENTS),
  file: z.string(), // Base64 or URL
  metadata: z.record(z.any()).optional(),
});

export const kycSubmissionSchema = z.object({
  documents: z.array(kycDocumentSchema),
  userId: z.string(),
});

// Wallet Schemas
export const fundWalletSchema = z.object({
  amount: z.number().positive(),
  userId: z.string(),
});

export const withdrawalSchema = z.object({
  amount: z.number().positive(),
  userId: z.string(),
  bankCode: z.string(),
  accountNumber: z.string(),
});

// Target Savings Schemas
export const createTargetSavingsSchema = z.object({
  name: z.string(),
  targetAmount: z.number().min(SYSTEM_SETTINGS.TARGET_SAVINGS.MIN_TARGET),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  isGroup: z.boolean().default(false),
  groupMembers: z.array(z.string()).optional(),
});

// Ajo Group Schemas
export const createAjoGroupSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  totalMembers: z.number()
    .min(SYSTEM_SETTINGS.AJO.MIN_MEMBERS)
    .max(SYSTEM_SETTINGS.AJO.MAX_MEMBERS),
  contribution: z.number()
    .min(SYSTEM_SETTINGS.AJO.MIN_CONTRIBUTION)
    .max(SYSTEM_SETTINGS.AJO.MAX_CONTRIBUTION),
  frequency: z.enum(SYSTEM_SETTINGS.AJO.FREQUENCIES),
  startDate: z.string().datetime(),
});

export const joinAjoGroupSchema = z.object({
  groupId: z.string(),
  userId: z.string(),
});

// Loan Schemas
export const loanApplicationSchema = z.object({
  amount: z.number()
    .min(SYSTEM_SETTINGS.LOAN.MIN_LOAN_AMOUNT)
    .max(SYSTEM_SETTINGS.LOAN.MAX_LOAN_AMOUNT),
  duration: z.number()
    .min(1)
    .max(SYSTEM_SETTINGS.LOAN.MAX_LOAN_DURATION),
  purpose: z.string(),
  userId: z.string(),
});

export const loanRepaymentSchema = z.object({
  loanId: z.string(),
  amount: z.number().positive(),
  userId: z.string(),
});

// Support Ticket Schemas
export const createSupportTicketSchema = z.object({
  subject: z.string(),
  description: z.string(),
  category: z.enum(SYSTEM_SETTINGS.SUPPORT.CATEGORIES),
  priority: z.enum(SYSTEM_SETTINGS.SUPPORT.PRIORITIES),
  userId: z.string(),
});

// Admin Schemas
export const updateSystemSettingsSchema = z.object({
  fees: z.object({
    ajoCreatorTotal: z.number().optional(),
    ajoCreatorAgentShare: z.number().optional(),
    withdrawal: z.number().optional(),
    loanInterest: z.number().optional(),
    breakSavings: z.number().optional(),
  }).optional(),
  loan: z.object({
    minCreditScore: z.number().optional(),
    maxDuration: z.number().optional(),
    latePaymentPenalty: z.number().optional(),
    minAmount: z.number().optional(),
    maxAmount: z.number().optional(),
  }).optional(),
});

// Transaction Schema
export const transactionSchema = z.object({
  type: z.enum(Object.values(SYSTEM_SETTINGS.TRANSACTION_TYPES) as [string, ...string[]]),
  amount: z.number().positive(),
  userId: z.string(),
  reference: z.string().optional(),
  description: z.string().optional(),
  metadata: z.record(z.any()).optional(),
}); 