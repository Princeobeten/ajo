'use client';

import { DashboardLayout } from '@/components/DashboardLayout';
import { userNavigation } from '@/constant/navItem';

// Mock data
const mockUserData = {
  name: 'Amina Johnson',
  creditScore: 720,
  maxScore: 900,
  history: [
    { date: '2025-04-01', score: 705 },
    { date: '2025-03-01', score: 690 },
    { date: '2025-02-01', score: 675 },
    { date: '2025-01-01', score: 660 },
    { date: '2024-12-01', score: 650 },
    { date: '2024-11-01', score: 640 }
  ],
  factors: [
    { 
      name: 'Payment History', 
      value: 85,
      description: 'Your history of making contributions on time',
      status: 'excellent'
    },
    { 
      name: 'Group Participation', 
      value: 75,
      description: 'Number and duration of active group memberships',
      status: 'good'
    },
    { 
      name: 'Contribution Amounts', 
      value: 80,
      description: 'Total value of your contributions',
      status: 'excellent'
    },
    { 
      name: 'Loan Repayment', 
      value: 70,
      description: 'Your history of repaying loans on time',
      status: 'good'
    },
    { 
      name: 'Account Duration', 
      value: 65,
      description: 'How long you have been using Digital Ajo',
      status: 'fair'
    }
  ],
  loanEligibility: {
    maxAmount: 75000,
    interestRate: 6.5,
    term: 12
  }
};

export default function UserCreditScore() {
  // Calculate percentage of credit score
  const scorePercentage = (mockUserData.creditScore / mockUserData.maxScore) * 100;

  // Determine credit score rating
  const getCreditRating = (score: number) => {
    if (score >= 800) return { label: 'Excellent', color: 'text-green-600 dark:text-green-400' };
    if (score >= 700) return { label: 'Good', color: 'text-blue-600 dark:text-blue-400' };
    if (score >= 600) return { label: 'Fair', color: 'text-yellow-600 dark:text-yellow-400' };
    if (score >= 500) return { label: 'Poor', color: 'text-orange-600 dark:text-orange-400' };
    return { label: 'Very Poor', color: 'text-red-600 dark:text-red-400' };
  };

  const creditRating = getCreditRating(mockUserData.creditScore);

  // Helper function for factor status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'good': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'fair': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'poor': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
    }
  };

  return (
    <DashboardLayout 
      navigation={userNavigation}
      userType="user"
      userName={mockUserData.name}
      pageTitle="Credit Score"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Credit Score Card */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl mb-6 overflow-hidden">
          <div className="p-6 flex flex-col md:flex-row items-center gap-6">
            {/* Credit Score Circle */}
            <div className="relative w-36 h-36 flex-shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="3"
                  className="dark:stroke-gray-700"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  strokeDasharray={`${scorePercentage}, 100`}
                  className="rotate-90 origin-center"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="50%" stopColor="#eab308" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{mockUserData.creditScore}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">/{mockUserData.maxScore}</span>
              </div>
            </div>

            {/* Score Details */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your Credit Score</h2>
              <div className={`text-xl font-medium ${creditRating.color} mb-2`}>{creditRating.label}</div>
              
              {/* Loan Eligibility Summary */}
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/30 rounded-lg">
                <div className="font-medium text-red-700 dark:text-red-400 mb-2">Loan Eligibility</div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500 dark:text-gray-400">Max Amount</div>
                    <div className="font-semibold text-gray-900 dark:text-white">₦{mockUserData.loanEligibility.maxAmount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400">Interest</div>
                    <div className="font-semibold text-gray-900 dark:text-white">{mockUserData.loanEligibility.interestRate}%</div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400">Term</div>
                    <div className="font-semibold text-gray-900 dark:text-white">{mockUserData.loanEligibility.term} months</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout for Factors and Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Score Factors */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Score Factors</h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {mockUserData.factors.map((factor, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{factor.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(factor.status)}`}>
                        {factor.value}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          factor.status === 'excellent' ? 'bg-green-500' :
                          factor.status === 'good' ? 'bg-blue-500' :
                          factor.status === 'fair' ? 'bg-yellow-500' :
                          factor.status === 'poor' ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${factor.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tips for Improvement */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Improve Your Score</h3>
            </div>
            <div className="p-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-700 dark:text-gray-300"><strong>Make timely contributions</strong></span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-700 dark:text-gray-300"><strong>Join more groups</strong></span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-700 dark:text-gray-300"><strong>Repay loans promptly</strong></span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-700 dark:text-gray-300"><strong>Increase contribution amounts</strong></span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-700 dark:text-gray-300"><strong>Maintain long-term activity</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Score History */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Score History</h3>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {mockUserData.history.map((record, index, arr) => {
                  const change = index === arr.length - 1 ? 0 : record.score - arr[index + 1].score;
                  return (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        {new Date(record.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        {record.score}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {change !== 0 && (
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${change > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'}`}>
                            {change > 0 ? '+' : ''}{change}
                          </span>
                        )}
                        {change === 0 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                            —
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
