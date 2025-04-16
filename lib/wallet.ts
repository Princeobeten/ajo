import { prisma } from "./prisma";
import { SYSTEM_SETTINGS } from "./constants";
import { ApiError } from "./api-utils";
import { TransactionType, TransactionStatus } from "@prisma/client";

export async function getUserWallet(userId: string) {
  const wallet = await prisma.wallet.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          email: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  if (!wallet) {
    throw new ApiError("Wallet not found", 404);
  }

  return wallet;
}

export async function createTransaction(
  userId: string,
  type: TransactionType,
  amount: number,
  {
    reference,
    description,
    metadata,
    status = TransactionStatus.PENDING,
  }: {
    reference?: string;
    description?: string;
    metadata?: any;
    status?: TransactionStatus;
  }
) {
  const wallet = await getUserWallet(userId);

  const transaction = await prisma.transaction.create({
    data: {
      type,
      amount,
      status,
      reference,
      description,
      metadata,
      userId,
      walletId: wallet.id,
    },
  });

  return transaction;
}

export async function updateWalletBalance(
  userId: string,
  amount: number,
  type: "CREDIT" | "DEBIT"
) {
  const wallet = await getUserWallet(userId);

  if (type === "DEBIT" && wallet.balance < amount) {
    throw new ApiError("Insufficient funds", 400);
  }

  const updatedWallet = await prisma.wallet.update({
    where: { userId },
    data: {
      balance: type === "CREDIT" 
        ? { increment: amount }
        : { decrement: amount },
    },
  });

  return updatedWallet;
}

export async function processWithdrawal(
  userId: string,
  amount: number,
  bankDetails: {
    bankCode: string;
    accountNumber: string;
  }
) {
  // Calculate withdrawal fee
  const fee = (amount * SYSTEM_SETTINGS.FEES.WITHDRAWAL) / 100;
  const totalDeduction = amount + fee;

  // Check if user has sufficient balance
  const wallet = await getUserWallet(userId);
  if (wallet.balance < totalDeduction) {
    throw new ApiError("Insufficient funds including withdrawal fee", 400);
  }

  // Create withdrawal transaction
  const transaction = await createTransaction(userId, "WITHDRAWAL", amount, {
    description: "Withdrawal request",
    metadata: {
      fee,
      bankDetails,
    },
  });

  // Create fee transaction
  await createTransaction(userId, "WITHDRAWAL", fee, {
    description: "Withdrawal fee",
    reference: `FEE-${transaction.id}`,
    status: TransactionStatus.COMPLETED,
  });

  // Deduct total amount from wallet
  await updateWalletBalance(userId, totalDeduction, "DEBIT");

  return transaction;
}

export async function processFunding(
  userId: string,
  amount: number,
  reference: string
) {
  // Create funding transaction
  const transaction = await createTransaction(userId, "DEPOSIT", amount, {
    reference,
    description: "Wallet funding",
    status: TransactionStatus.COMPLETED,
  });

  // Credit wallet
  await updateWalletBalance(userId, amount, "CREDIT");

  return transaction;
}

export async function getWalletTransactions(
  userId: string,
  {
    page = 1,
    limit = 10,
    type,
    startDate,
    endDate,
  }: {
    page?: number;
    limit?: number;
    type?: TransactionType;
    startDate?: Date;
    endDate?: Date;
  }
) {
  const wallet = await getUserWallet(userId);

  const where = {
    walletId: wallet.id,
    ...(type && { type }),
    ...(startDate && endDate && {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    }),
  };

  const [transactions, total] = await Promise.all([
    prisma.transaction.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.transaction.count({ where }),
  ]);

  return {
    data: transactions,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
} 