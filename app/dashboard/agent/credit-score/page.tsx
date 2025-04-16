'use client';

import { useState } from 'react';
import { NavItem, HomeIcon, GroupIcon, WalletIcon, LoanIcon, CreditIcon, HelpIcon, UsersIcon, ProfileIcon } from '@/components/DashboardLayout';
import { DashboardLayout } from '@/components/DashboardLayout';
import { agentNavigation } from '@/constant/navItem';

// Mock agent data
const mockAgentData = {
  name: 'Fatima Ibrahim',
  email: 'fatima@example.com',
  phone: '+234 987 6543 210',
  groups: 3,
  users: 52,
  creditScore: 810,
  joinedDate: '2024-09-01',
};

// Mock credit history data
const mockCreditHistory = [
  {
    id: 1,
    date: '2025-04-01',
    score: 810,
    change: +5,
    reason: 'Successful loan facilitation'
  },
  {
    id: 2,
    date: '2025-03-01',
    score: 805,
    change: +10,
    reason: 'Increased group size'
  },
  {
    id: 3,
    date: '2025-02-01',
    score: 795,
    change: -5,
    reason: 'Delayed withdrawal processing'
  },
  {
    id: 4,
    date: '2025-01-01',
    score: 800,
    change: +20,
    reason: 'Perfect repayment record for group loans'
  },
  {
    id: 5,
    date: '2024-12-01',
    score: 780,
    change: 0,
    reason: 'No change'
  },
  {
    id: 6,
    date: '2024-11-01',
    score: 780,
    change: +30,
    reason: 'Excellent member retention rate'
  }
];

// Mock credit factors data
const mockCreditFactors = [
  {
    factor: 'Group Performance',
    score: 95,
    outOf: 100,
    description: 'Based on repayment rates and savings consistency of your groups',
    tips: 'Encourage regular contributions and timely loan repayments in your groups'
  },
  {
    factor: 'User Growth',
    score: 85,
    outOf: 100,
    description: 'Based on new user acquisition and retention rates',
    tips: 'Focus on member retention and recruit new members to your groups'
  },
  {
    factor: 'Withdrawal Processing',
    score: 90,
    outOf: 100,
    description: 'Based on timeliness and accuracy of withdrawal processing',
    tips: 'Process withdrawal requests promptly and accurately'
  },
  {
    factor: 'Loan Facilitation',
    score: 88,
    outOf: 100,
    description: 'Based on loan application quality and repayment rates',
    tips: 'Help users complete loan applications thoroughly and encourage repayments'
  },
  {
    factor: 'Platform Engagement',
    score: 92,
    outOf: 100,
    description: 'Based on activity level and platform feature utilization',
    tips: 'Use all platform features regularly and stay active on the platform'
  }
];

export default function AgentCreditScore() {
  const [timeRange, setTimeRange] = useState('6months');
  const [activeTab, setActiveTab] = useState('history'); // 'history' or 'factors'
  
  // Get credit score color based on score value
  const getCreditScoreColor = (score: number) => {
    if (score >= 800) return 'text-green-600';
    if (score >= 750) return 'text-green-500';
    if (score >= 700) return 'text-yellow-500';
    if (score >= 650) return 'text-yellow-600';
    if (score >= 600) return 'text-orange-500';
    return 'text-red-600';
  };
  
  // Get credit score label based on score value
  const getCreditScoreLabel = (score: number) => {
    if (score >= 800) return 'Excellent';
    if (score >= 750) return 'Very Good';
    if (score >= 700) return 'Good';
    if (score >= 650) return 'Fair';
    if (score >= 600) return 'Poor';
    return 'Very Poor';
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      month: 'long',
      year: 'numeric'
    });
  };
  
  return (
    <DashboardLayout 
      navigation={agentNavigation}
      userType="agent"
      userName={mockAgentData.name}
      pageTitle="My Credit Score"
    >
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Top Grid: Score Card and Tips */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Credit Score Header Card */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-[30px] overflow-hidden transition-colors duration-200">
              <div className="px-6 py-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Your Agent Credit Score
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                      Your credit score determines your eligibility for higher commission rates and special incentives
                    </p>
                  </div>
                  <div className="flex-shrink-0 mt-4 md:mt-0">
                    <div className="flex flex-col items-center">
                      <div className="text-5xl font-bold mb-1 mt-2 md:mt-0" style={{ lineHeight: '1' }}>
                        <span className={`${getCreditScoreColor(mockAgentData.creditScore)} dark:text-opacity-90`}>
                          {mockAgentData.creditScore}
                        </span>
                      </div>
                      <div className={`text-sm font-medium ${getCreditScoreColor(mockAgentData.creditScore)} dark:text-opacity-90`}>
                        {getCreditScoreLabel(mockAgentData.creditScore)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
                    <div>500</div>
                    <div>600</div>
                    <div>700</div>
                    <div>800</div>
                    <div>850</div>
                  </div>
                  <div 
                    className="flex justify-center mt-2"
                    style={{ 
                      marginLeft: `${((mockAgentData.creditScore - 500) / (850 - 500)) * 100}%`,
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <div className="w-3 h-3 bg-red-600 dark:bg-red-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Tips Card */}
            <div className="bg-red-50 dark:bg-red-900/20 shadow-sm border border-red-100 dark:border-red-900/50 rounded-[30px] overflow-hidden transition-colors duration-200">
              <div className="px-6 py-6">
                <h3 className="text-lg leading-6 font-medium text-red-900 dark:text-red-300">
                  Quick Tips
                </h3>
                <div className="mt-4 text-sm text-red-700 dark:text-red-300">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Maintain high repayment rates</li>
                    <li>Process withdrawals promptly</li>
                    <li>Grow your member base</li>
                    <li>Stay active on the platform</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-[30px] overflow-hidden transition-colors duration-200">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-4 px-6" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('history')}
                  className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                    activeTab === 'history'
                      ? 'border-red-500 text-red-600 dark:text-red-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Score History
                </button>
                <button
                  onClick={() => setActiveTab('factors')}
                  className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                    activeTab === 'factors'
                      ? 'border-red-500 text-red-600 dark:text-red-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Score Factors
                </button>
              </nav>
            </div>

            <div className="px-6 py-6">
              {activeTab === 'history' ? (
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <select
                      id="time-range"
                      name="time-range"
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                      className="block pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                    >
                      <option value="3months">Last 3 Months</option>
                      <option value="6months">Last 6 Months</option>
                      <option value="1year">Last Year</option>
                    </select>
                  </div>

                  {/* Credit Score Chart */}
                  <div className="relative overflow-x-auto pb-4">
                    <div className="min-w-[640px]">
                      <div className="h-64 flex items-end justify-between px-6">
                        {mockCreditHistory.map((historyPoint) => (
                          <div key={historyPoint.id} className="flex flex-col items-center">
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                              {historyPoint.score}
                            </div>
                            <div 
                              className={`w-12 sm:w-10 rounded-t ${
                                historyPoint.score >= 800 ? 'bg-green-500 dark:bg-green-400' :
                                historyPoint.score >= 750 ? 'bg-green-400 dark:bg-green-500' :
                                historyPoint.score >= 700 ? 'bg-yellow-500 dark:bg-yellow-400' :
                                historyPoint.score >= 650 ? 'bg-yellow-400 dark:bg-yellow-500' : 'bg-red-500 dark:bg-red-400'
                              }`}
                              style={{ 
                                height: `${((historyPoint.score - 500) / (850 - 500)) * 200}px`
                              }}
                            ></div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center whitespace-nowrap">
                              {formatDate(historyPoint.date)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Credit Score History Table */}
                  <div className="mt-6 -mx-6 sm:mx-0">
                    <div className="inline-block min-w-full align-middle">
                      <div className="overflow-x-auto border-t border-gray-200 dark:border-gray-700">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                              <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Date
                              </th>
                              <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Score
                              </th>
                              <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Change
                              </th>
                              <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Reason
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {mockCreditHistory.map((historyPoint) => (
                              <tr key={historyPoint.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                  {formatDate(historyPoint.date)}
                                </td>
                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                                  <span className={`${getCreditScoreColor(historyPoint.score)} dark:text-opacity-90`}>
                                    {historyPoint.score}
                                  </span>
                                </td>
                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                                  {historyPoint.change > 0 ? (
                                    <span className="text-green-600 dark:text-green-400">+{historyPoint.change}</span>
                                  ) : historyPoint.change < 0 ? (
                                    <span className="text-red-600 dark:text-red-400">{historyPoint.change}</span>
                                  ) : (
                                    <span className="text-gray-500 dark:text-gray-400">0</span>
                                  )}
                                </td>
                                <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                  <div className="max-w-xs sm:max-w-none truncate">
                                    {historyPoint.reason}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {mockCreditFactors.map((factor, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{factor.factor}</div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{factor.score}/{factor.outOf}</div>
                      </div>
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                          <div 
                            style={{ width: `${(factor.score / factor.outOf) * 100}%` }} 
                            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                              factor.score >= 90 ? 'bg-green-500 dark:bg-green-400' :
                              factor.score >= 80 ? 'bg-green-400 dark:bg-green-500' :
                              factor.score >= 70 ? 'bg-yellow-500 dark:bg-yellow-400' :
                              factor.score >= 60 ? 'bg-yellow-400 dark:bg-yellow-500' : 'bg-red-500 dark:bg-red-400'
                            }`}
                          ></div>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-col sm:flex-row sm:justify-between">
                        <div className="text-xs text-gray-500 dark:text-gray-400">{factor.description}</div>
                        <div className="text-xs text-green-600 dark:text-green-400 font-medium mt-1 sm:mt-0">Tip: {factor.tips}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

