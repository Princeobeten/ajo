import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface UserFinancialData {
  savingsHistory: {
    amount: number;
    frequency: string;
    consistency: number; // Percentage of successful savings
  };
  loanHistory: {
    totalLoans: number;
    repaidLoans: number;
    defaultedLoans: number;
    averageRepaymentTime: number; // in days
  };
  income: {
    monthly: number;
    sources: string[];
  };
  expenses: {
    monthly: number;
    categories: string[];
  };
}

interface CreditScoreResult {
  score: number; // 0-100
  risk: "LOW" | "MEDIUM" | "HIGH";
  maxLoanAmount: number;
  reasons: string[];
  recommendations: string[];
}

export async function generateCreditScore(
  userData: UserFinancialData
): Promise<CreditScoreResult> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      As a financial AI model, analyze the following user data and generate a credit score:

      Savings History:
      - Amount: ${userData.savingsHistory.amount}
      - Frequency: ${userData.savingsHistory.frequency}
      - Consistency: ${userData.savingsHistory.consistency}%

      Loan History:
      - Total Loans: ${userData.loanHistory.totalLoans}
      - Repaid Loans: ${userData.loanHistory.repaidLoans}
      - Defaulted Loans: ${userData.loanHistory.defaultedLoans}
      - Average Repayment Time: ${userData.loanHistory.averageRepaymentTime} days

      Income:
      - Monthly: ${userData.income.monthly}
      - Sources: ${userData.income.sources.join(", ")}

      Expenses:
      - Monthly: ${userData.expenses.monthly}
      - Categories: ${userData.expenses.categories.join(", ")}

      Please provide:
      1. A credit score (0-100)
      2. Risk level (LOW, MEDIUM, HIGH)
      3. Maximum recommended loan amount
      4. Reasons for the score
      5. Recommendations for improvement

      Format the response as a JSON object.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonStr = text.substring(
      text.indexOf("{"),
      text.lastIndexOf("}") + 1
    );
    
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Credit score generation error:", error);
    throw new Error("Failed to generate credit score");
  }
}

export async function analyzeLoanApplication(
  application: any,
  userHistory: any
): Promise<any> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Analyze this loan application and user history to provide insights:
      
      Application: ${JSON.stringify(application, null, 2)}
      User History: ${JSON.stringify(userHistory, null, 2)}

      Please provide:
      1. Risk assessment
      2. Red flags (if any)
      3. Recommendation (approve/reject)
      4. Suggested loan terms
      5. Justification

      Format the response as a JSON object.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonStr = text.substring(
      text.indexOf("{"),
      text.lastIndexOf("}") + 1
    );
    
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Loan analysis error:", error);
    throw new Error("Failed to analyze loan application");
  }
} 