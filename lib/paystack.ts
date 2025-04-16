// @ts-ignore - No type definitions available for @paystack/paystack-sdk
// TODO Check later
import Paystack from "@paystack/paystack-sdk";

const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY!);

export interface PaystackTransaction {
  reference: string;
  amount: number;
  email: string;
  metadata?: any;
}

export interface InitializePaymentResponse {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export async function initializePayment(
  amount: number,
  email: string,
  metadata?: any
): Promise<InitializePaymentResponse> {
  try {
    const response = await paystack.transaction.initialize({
      amount: amount * 100, // Convert to kobo
      email,
      metadata,
    });

    return response.data;
  } catch (error) {
    console.error("Paystack payment initialization error:", error);
    throw new Error("Failed to initialize payment");
  }
}

export async function verifyPayment(reference: string) {
  try {
    const response = await paystack.transaction.verify(reference);
    return response.data;
  } catch (error) {
    console.error("Paystack payment verification error:", error);
    throw new Error("Failed to verify payment");
  }
}

export async function createTransferRecipient(
  name: string,
  accountNumber: string,
  bankCode: string
) {
  try {
    const response = await paystack.transferRecipient.create({
      type: "nuban",
      name,
      account_number: accountNumber,
      bank_code: bankCode,
      currency: "NGN",
    });

    return response.data;
  } catch (error) {
    console.error("Paystack recipient creation error:", error);
    throw new Error("Failed to create transfer recipient");
  }
}

export async function initiateTransfer(
  amount: number,
  recipient: string,
  reason?: string
) {
  try {
    const response = await paystack.transfer.create({
      source: "balance",
      amount: amount * 100, // Convert to kobo
      recipient,
      reason,
    });

    return response.data;
  } catch (error) {
    console.error("Paystack transfer initiation error:", error);
    throw new Error("Failed to initiate transfer");
  }
}

export async function verifyTransfer(reference: string) {
  try {
    const response = await paystack.transfer.fetch(reference);
    return response.data;
  } catch (error) {
    console.error("Paystack transfer verification error:", error);
    throw new Error("Failed to verify transfer");
  }
}

export async function getBanks() {
  try {
    const response = await paystack.misc.listBanks();
    return response.data;
  } catch (error) {
    console.error("Paystack banks fetch error:", error);
    throw new Error("Failed to fetch banks");
  }
}

export async function verifyAccountNumber(
  accountNumber: string,
  bankCode: string
) {
  try {
    const response = await paystack.verification.resolveAccount({
      account_number: accountNumber,
      bank_code: bankCode,
    });

    return response.data;
  } catch (error) {
    console.error("Paystack account verification error:", error);
    throw new Error("Failed to verify account number");
  }
} 