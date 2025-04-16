export const SYSTEM_SETTINGS = {
  FEES: {
    AJO_CREATOR_TOTAL: 3.33333333, // Total percentage for Ajo group creation
    AJO_CREATOR_AGENT_SHARE: 2.0, // Agent's share of the fee
    AJO_CREATOR_ADMIN_SHARE: 1.33333333, // Admin's share of the fee
    WITHDRAWAL: 1.0, // Percentage fee for withdrawals
    LOAN_INTEREST: 20.0, // Percentage interest on loans
    BREAK_SAVINGS: 5.0, // Percentage fee for breaking target savings early
  },
  LOAN: {
    MIN_CREDIT_SCORE: 60, // Minimum credit score required for loan approval
    MAX_LOAN_DURATION: 12, // Maximum loan duration in months
    LATE_PAYMENT_PENALTY: 5, // Percentage penalty for late payments
    MIN_LOAN_AMOUNT: 5000, // Minimum loan amount in Naira
    MAX_LOAN_AMOUNT: 500000, // Maximum loan amount in Naira
  },
  AJO: {
    MIN_MEMBERS: 2,
    MAX_MEMBERS: 12,
    FREQUENCIES: ["DAILY", "WEEKLY", "MONTHLY"] as const,
    MIN_CONTRIBUTION: 1000, // Minimum contribution amount in Naira
    MAX_CONTRIBUTION: 100000, // Maximum contribution amount in Naira
  },
  TARGET_SAVINGS: {
    MIN_DURATION: 1, // Minimum duration in months
    MAX_DURATION: 60, // Maximum duration in months
    MIN_TARGET: 5000, // Minimum target amount in Naira
    GROUP: {
      MIN_MEMBERS: 2,
      MAX_MEMBERS: 50,
    },
  },
  KYC: {
    REQUIRED_DOCUMENTS: [
      "VALID_ID",
      "PROOF_OF_ADDRESS",
      "BANK_STATEMENT",
    ] as const,
    VALID_ID_TYPES: [
      "NATIONAL_ID",
      "DRIVERS_LICENSE",
      "PASSPORT",
      "VOTERS_CARD",
    ] as const,
  },
  ROLES: {
    USER: "USER",
    AGENT: "AGENT",
    ADMIN: "ADMIN",
  } as const,
  TRANSACTION_TYPES: {
    DEPOSIT: "DEPOSIT",
    WITHDRAWAL: "WITHDRAWAL",
    TRANSFER: "TRANSFER",
    LOAN_REPAYMENT: "LOAN_REPAYMENT",
    SAVINGS: "SAVINGS",
    COMMISSION: "COMMISSION",
    REFUND: "REFUND",
  } as const,
  SUPPORT: {
    CATEGORIES: [
      "ACCOUNT",
      "PAYMENTS",
      "SAVINGS",
      "LOANS",
      "TECHNICAL",
      "OTHER",
    ] as const,
    PRIORITIES: ["LOW", "MEDIUM", "HIGH", "URGENT"] as const,
  },
};

export const API_ROUTES = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    LOGOUT: "/api/auth/logout",
    SESSION: "/api/auth/session",
    VERIFY_KYC: "/api/auth/verify-kyc",
  },
  USER: {
    PROFILE: "/api/user/profile",
    UPDATE_PROFILE: "/api/user/update-profile",
    KYC_UPLOAD: "/api/user/kyc-upload",
    WALLET: {
      BALANCE: "/api/user/wallet/balance",
      FUND: "/api/user/wallet/fund",
      WITHDRAW: "/api/user/wallet/withdraw",
      TRANSACTIONS: "/api/user/wallet/transactions",
    },
    TARGET_SAVINGS: {
      CREATE: "/api/user/target/create",
      ALL: "/api/user/target",
      GROUP_JOIN: "/api/user/target/group/join",
      GROUP_CREATE: "/api/user/target/group/create",
      BREAK: "/api/user/target/break",
    },
    AJO_GROUPS: {
      ALL: "/api/user/ajo",
      JOIN: "/api/user/ajo/join",
      CREATE: "/api/user/ajo/create",
    },
    LOAN: {
      APPLY: "/api/user/loan/apply",
      HISTORY: "/api/user/loan/history",
      REPAY: "/api/user/loan/repay",
      SCORE: "/api/user/loan/score",
    },
    SUPPORT: {
      TICKETS: "/api/user/support",
      CREATE: "/api/user/support/create",
    },
  },
  AGENT: {
    DASHBOARD: "/api/agent/dashboard",
    USERS: "/api/agent/users",
    ASSIGNED_GROUPS: "/api/agent/groups",
    WALLET: {
      BALANCE: "/api/agent/wallet/balance",
      TRANSACTIONS: "/api/agent/wallet/transactions",
      PAYOUT: "/api/agent/wallet/payout",
    },
    SAVINGS: {
      CREATE_FOR_USER: "/api/agent/target/create",
      GROUP_CREATE: "/api/agent/target/group/create",
    },
    AJO: {
      CREATE_FOR_USER: "/api/agent/ajo/create",
    },
    LOAN_ASSISTANCE: "/api/agent/loan/assist",
    SUPPORT: "/api/agent/support",
  },
  ADMIN: {
    DASHBOARD: "/api/admin/dashboard",
    USERS: {
      ALL: "/api/admin/users",
      KYC_APPROVE: "/api/admin/users/kyc/approve",
      SUSPEND: "/api/admin/users/suspend",
    },
    AGENTS: {
      ALL: "/api/admin/agents",
      APPROVE: "/api/admin/agents/approve",
      PAYOUT: "/api/admin/agents/payout",
    },
    AJO: {
      ALL: "/api/admin/ajo",
      DETAIL: "/api/admin/ajo/[id]",
      TERMINATE: "/api/admin/ajo/terminate",
    },
    TARGET_SAVINGS: {
      ALL: "/api/admin/target",
      DETAIL: "/api/admin/target/[id]",
      BREAK: "/api/admin/target/break",
    },
    LOANS: {
      APPLICATIONS: "/api/admin/loan/applications",
      APPROVE: "/api/admin/loan/approve",
      REJECT: "/api/admin/loan/reject",
      ACTIVE: "/api/admin/loan/active",
    },
    TRANSACTIONS: "/api/admin/transactions",
    SETTINGS: {
      FEES: "/api/admin/settings/fees",
      RULES: "/api/admin/settings/rules",
      ROLES: "/api/admin/settings/roles",
    },
    SUPPORT: "/api/admin/support",
    ANALYTICS: "/api/admin/analytics",
  },
  UPLOAD: {
    CLOUDINARY_SIGNATURE: "/api/upload/signature",
  },
  WEBHOOK: {
    PAYSTACK: "/api/webhook/paystack",
  },
}; 