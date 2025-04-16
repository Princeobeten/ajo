'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout, NavItem, HomeIcon, GroupIcon, WalletIcon, LoanIcon, CreditIcon, HelpIcon, UsersIcon, AnalyticsIcon, KycIcon } from '../../../../components/DashboardLayout';
import { adminNavigation } from '@/constant/navItem';

// Mock admin data
const mockAdminData = {
  name: 'Admin',
};

// Mock analytics data
const mockAnalyticsData = {
  totalUsers: 175,
  totalAgents: 6,
  totalGroups: 28,
  totalContributions: 4350000,
  totalLoanAmount: 2760000,
  totalRepaid: 1250000,
  totalFees: 235000,
  averageCreditScore: 710,
  userGrowth: [
    { month: 'Jan', users: 85 },
    { month: 'Feb', users: 95 },
    { month: 'Mar', users: 125 },
    { month: 'Apr', users: 175 }
  ],
  agentGrowth: [
    { month: 'Jan', agents: 2 },
    { month: 'Feb', agents: 3 },
    { month: 'Mar', agents: 4 },
    { month: 'Apr', agents: 6 }
  ],
  contributionsByMonth: [
    { month: 'Jan', amount: 950000 },
    { month: 'Feb', amount: 1200000 },
    { month: 'Mar', amount: 2000000 },
    { month: 'Apr', amount: 4350000 }
  ],
  loansByMonth: [
    { month: 'Jan', disbursed: 500000, repaid: 100000 },
    { month: 'Feb', disbursed: 750000, repaid: 250000 },
    { month: 'Mar', disbursed: 1200000, repaid: 500000 },
    { month: 'Apr', disbursed: 2760000, repaid: 1250000 }
  ],
  topAgents: [
    { name: 'Fatima Ibrahim', users: 52, contributions: 825000 },
    { name: 'James Adebayo', users: 30, contributions: 550000 },
    { name: 'Joseph Nnamdi', users: 22, contributions: 880000 }
  ],
  creditScoreDistribution: [
    { range: '600-650', count: 15 },
    { range: '651-700', count: 35 },
    { range: '701-750', count: 75 },
    { range: '751-800', count: 40 },
    { range: '801-850', count: 10 }
  ],
  topGroups: [
    { name: 'Market Women Savings', members: 12, contributions: 240000 },
    { name: 'Community Traders Union', members: 22, contributions: 880000 },
    { name: 'Business Investment Club', members: 15, contributions: 675000 }
  ]
};

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState('month'); // 'week', 'month', 'quarter', 'year'
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };
  
  return (
    <DashboardLayout 
      navigation={adminNavigation}
      userType="admin"
      userName={mockAdminData.name}
      pageTitle="Analytics Dashboard"
    >
      {/* Export Buttons */}
      <div className="flex justify-end mb-10">
        <button
          onClick={() => alert('This would generate a CSV export')}
          className="inline-flex items-center mr-2 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Export CSV
        </button>
        <button
          onClick={() => alert('This would generate a PDF report')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Generate Report
        </button>
      </div>

      {/* Date Range Filter */}
      <div className="bg-white shadow px-4 py-3 sm:px-6 sm:rounded-lg mb-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Platform Analytics
        </h3>
        <div>
          <select
            id="time-range"
            name="time-range"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

{/* KPIs */}
<div className="bg-white shadow sm:rounded-lg mb-6">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Key Performance Indicators
          </h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-gray-50 rounded-md p-4">
              <h4 className="text-sm font-medium text-gray-500">Average Credit Score</h4>
              <div className="mt-1 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  {mockAnalyticsData.averageCreditScore}
                </p>
                <p className="ml-2 text-sm font-medium text-green-600">
                  ↑ 5%
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-md p-4">
              <h4 className="text-sm font-medium text-gray-500">Total Groups</h4>
              <div className="mt-1 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  {mockAnalyticsData.totalGroups}
                </p>
                <p className="ml-2 text-sm font-medium text-green-600">
                  ↑ 40%
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-md p-4">
              <h4 className="text-sm font-medium text-gray-500">Platform Fees</h4>
              <div className="mt-1 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(mockAnalyticsData.totalFees)}
                </p>
                <p className="ml-2 text-sm font-medium text-green-600">
                  ↑ 125%
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-md p-4">
              <h4 className="text-sm font-medium text-gray-500">Loan Default Rate</h4>
              <div className="mt-1 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  2.3%
                </p>
                <p className="ml-2 text-sm font-medium text-green-600">
                  ↓ 0.7%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {/* Total Users */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                {UsersIcon("h-6 w-6 text-blue-600") }
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Users
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {mockAnalyticsData.totalUsers}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <span className="text-green-500 font-semibold">↑ 40%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </div>
        </div>
        
        {/* Total Agents */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                {UsersIcon("h-6 w-6 text-red-600") }
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Agents
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {mockAnalyticsData.totalAgents}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <span className="text-green-500 font-semibold">↑ 50%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </div>
        </div>
        
        {/* Total Contributions */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                {WalletIcon("h-6 w-6 text-green-600") }
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Contributions
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {formatCurrency(mockAnalyticsData.totalContributions)}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <span className="text-green-500 font-semibold">↑ 117%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </div>
        </div>
        
        {/* Total Loans */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                {LoanIcon("h-6 w-6 text-yellow-600") }
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Loans
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {formatCurrency(mockAnalyticsData.totalLoanAmount)}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <span className="text-green-500 font-semibold">↑ 130%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Financial Summary */}
      <div className="bg-white shadow sm:rounded-lg mb-6">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Financial Summary
          </h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-1">
                <div className="text-sm font-medium text-gray-500">Total Contributions</div>
                <div className="text-sm font-semibold text-green-600">
                  <span>+{formatCurrency(mockAnalyticsData.contributionsByMonth[3].amount - mockAnalyticsData.contributionsByMonth[2].amount)}</span>
                </div>
              </div>
              <div className="text-xl font-bold text-gray-900">{formatCurrency(mockAnalyticsData.totalContributions)}</div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-500">Jan</div>
                  <div className="text-gray-500">Feb</div>
                  <div className="text-gray-500">Mar</div>
                  <div className="text-gray-500">Apr</div>
                </div>
                <div className="mt-1 relative">
                  <div className="flex h-5 overflow-hidden rounded bg-gray-200">
                    <div className="bg-green-500" style={{ width: `${mockAnalyticsData.contributionsByMonth[0].amount / mockAnalyticsData.totalContributions * 100}%` }}></div>
                    <div className="bg-green-600" style={{ width: `${mockAnalyticsData.contributionsByMonth[1].amount / mockAnalyticsData.totalContributions * 100}%` }}></div>
                    <div className="bg-green-700" style={{ width: `${mockAnalyticsData.contributionsByMonth[2].amount / mockAnalyticsData.totalContributions * 100}%` }}></div>
                    <div className="bg-green-800" style={{ width: `${mockAnalyticsData.contributionsByMonth[3].amount / mockAnalyticsData.totalContributions * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-1">
                <div className="text-sm font-medium text-gray-500">Total Loans</div>
                <div className="text-sm font-semibold text-yellow-600">
                  <span>+{formatCurrency(mockAnalyticsData.loansByMonth[3].disbursed - mockAnalyticsData.loansByMonth[2].disbursed)}</span>
                </div>
              </div>
              <div className="text-xl font-bold text-gray-900">{formatCurrency(mockAnalyticsData.totalLoanAmount)}</div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-500">Jan</div>
                  <div className="text-gray-500">Feb</div>
                  <div className="text-gray-500">Mar</div>
                  <div className="text-gray-500">Apr</div>
                </div>
                <div className="mt-1 relative">
                  <div className="flex h-5 overflow-hidden rounded bg-gray-200">
                    <div className="bg-yellow-500" style={{ width: `${mockAnalyticsData.loansByMonth[0].disbursed / mockAnalyticsData.totalLoanAmount * 100}%` }}></div>
                    <div className="bg-yellow-600" style={{ width: `${mockAnalyticsData.loansByMonth[1].disbursed / mockAnalyticsData.totalLoanAmount * 100}%` }}></div>
                    <div className="bg-yellow-700" style={{ width: `${mockAnalyticsData.loansByMonth[2].disbursed / mockAnalyticsData.totalLoanAmount * 100}%` }}></div>
                    <div className="bg-yellow-800" style={{ width: `${mockAnalyticsData.loansByMonth[3].disbursed / mockAnalyticsData.totalLoanAmount * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-1">
                <div className="text-sm font-medium text-gray-500">Total Repaid</div>
                <div className="text-sm font-semibold text-blue-600">
                  <span>+{formatCurrency(mockAnalyticsData.loansByMonth[3].repaid - mockAnalyticsData.loansByMonth[2].repaid)}</span>
                </div>
              </div>
              <div className="text-xl font-bold text-gray-900">{formatCurrency(mockAnalyticsData.totalRepaid)}</div>
              <div className="mt-1 text-sm text-gray-500">
                <span className="font-medium">{Math.round(mockAnalyticsData.totalRepaid / mockAnalyticsData.totalLoanAmount * 100)}%</span> of total loans
              </div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-600 rounded-full" style={{ width: `${mockAnalyticsData.totalRepaid / mockAnalyticsData.totalLoanAmount * 100}%` }}></div>
              </div>
              <div className="mt-4 flex justify-between text-xs text-gray-500">
                <div>0%</div>
                <div>25%</div>
                <div>50%</div>
                <div>75%</div>
                <div>100%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Top Performers */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
        {/* Top Agents */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Top Performing Agents
            </h3>
          </div>
          <div className="p-4">
            <ul className="divide-y divide-gray-200">
              {mockAnalyticsData.topAgents.map((agent, index) => (
                <li key={index} className="py-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-semibold">
                      {agent.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{agent.name}</p>
                      <p className="text-sm text-gray-500">{agent.users} users</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{formatCurrency(agent.contributions)}</p>
                    <p className="text-xs text-gray-500">Total contributions</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link
                href="/dashboard/admin/agents"
                className="text-sm font-medium text-red-600 hover:text-red-500"
              >
                View all agents
              </Link>
            </div>
          </div>
        </div>
        
        {/* Top Groups */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Top Performing Groups
            </h3>
          </div>
          <div className="p-4">
            <ul className="divide-y divide-gray-200">
              {mockAnalyticsData.topGroups.map((group, index) => (
                <li key={index} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{group.name}</p>
                    <p className="text-sm text-gray-500">{group.members} members</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{formatCurrency(group.contributions)}</p>
                    <p className="text-xs text-gray-500">Total contributions</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link
                href="/dashboard/admin/groups"
                className="text-sm font-medium text-red-600 hover:text-red-500"
              >
                View all groups
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* User Growth & Credit Score Distribution */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
        {/* User Growth */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              User Growth
            </h3>
          </div>
          <div className="p-4 h-72 flex items-end justify-around">
            {mockAnalyticsData.userGrowth.map((data, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-xs text-gray-500 mb-1">
                  {data.users}
                </div>
                <div 
                  className="w-12 bg-blue-500 rounded-t"
                  style={{ 
                    height: `${data.users / Math.max(...mockAnalyticsData.userGrowth.map(d => d.users)) * 200}px`
                  }}
                ></div>
                <div className="text-sm text-gray-600 mt-2">
                  {data.month}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Credit Score Distribution */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Credit Score Distribution
            </h3>
          </div>
          <div className="p-4 h-72 flex items-end justify-around">
            {mockAnalyticsData.creditScoreDistribution.map((data, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-xs text-gray-500 mb-1">
                  {data.count}
                </div>
                <div 
                  className={`w-12 rounded-t ${
                    index === 0 ? 'bg-red-500' :
                    index === 1 ? 'bg-yellow-500' :
                    index === 2 ? 'bg-green-500' :
                    index === 3 ? 'bg-blue-500' :
                    'bg-purple-500'
                  }`}
                  style={{ 
                    height: `${data.count / Math.max(...mockAnalyticsData.creditScoreDistribution.map(d => d.count)) * 200}px`
                  }}
                ></div>
                <div className="text-sm text-gray-600 mt-2">
                  {data.range}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      
    </DashboardLayout>
  );
}

