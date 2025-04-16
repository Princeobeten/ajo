'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout, NavItem, HomeIcon, GroupIcon, WalletIcon, LoanIcon, CreditIcon, HelpIcon, UsersIcon, AnalyticsIcon, KycIcon } from '@/components/DashboardLayout';
import { adminNavigation } from '@/constant/navItem';

// Mock data
const mockAdminData = {
  name: 'Admin',
  totalUsers: 175,
  totalAgents: 14,
  totalGroups: 28,
  pendingKyc: 8,
  activeLoans: 43,
  totalContributions: 4350000,
  totalLoanAmount: 2760000,
  averageCreditScore: 710
};

const mockKycRequests = [
  {
    id: 1,
    name: 'James Adebayo',
    type: 'agent',
    submittedDate: '2025-04-10',
    status: 'pending',
    documents: 5
  },
  {
    id: 2,
    name: 'Mary Okonkwo',
    type: 'user',
    submittedDate: '2025-04-11',
    status: 'pending',
    documents: 1
  },
  {
    id: 3,
    name: 'Joseph Nnamdi',
    type: 'agent',
    submittedDate: '2025-04-09',
    status: 'pending',
    documents: 5
  },
  {
    id: 4,
    name: 'Elizabeth Adekunle',
    type: 'user',
    submittedDate: '2025-04-12',
    status: 'pending',
    documents: 1
  }
];

const mockRecentTransactions = [
  {
    id: 1,
    user: 'Amina Johnson',
    type: 'Contribution',
    amount: 5000,
    date: '2025-04-12',
    status: 'completed'
  },
  {
    id: 2,
    user: 'Fatima Ibrahim',
    type: 'Loan Disbursement',
    amount: 75000,
    date: '2025-04-11',
    status: 'completed'
  },
  {
    id: 3,
    user: 'Grace Okafor',
    type: 'Withdrawal',
    amount: 25000,
    date: '2025-04-10',
    status: 'completed'
  },
  {
    id: 4,
    user: 'Blessing Adeyemi',
    type: 'Loan Repayment',
    amount: 15000,
    date: '2025-04-09',
    status: 'completed'
  }
];

const mockGroups = [
  {
    id: 1,
    name: 'Market Women Savings',
    members: 12,
    agent: 'Fatima Ibrahim',
    totalSavings: 240000,
    status: 'active'
  },
  {
    id: 2,
    name: 'Family Support Group',
    members: 8,
    agent: 'Fatima Ibrahim',
    totalSavings: 480000,
    status: 'active'
  },
  {
    id: 3,
    name: 'Business Investment Club',
    members: 15,
    agent: 'James Adebayo',
    totalSavings: 675000,
    status: 'active'
  },
  {
    id: 4,
    name: 'Community Traders Union',
    members: 22,
    agent: 'Joseph Nnamdi',
    totalSavings: 880000,
    status: 'active'
  }
];


export default function AdminDashboard() {
  const [filterKycType, setFilterKycType] = useState('all'); // 'all', 'user', 'agent'
  
  const filteredKycRequests = filterKycType === 'all' 
    ? mockKycRequests 
    : mockKycRequests.filter(request => request.type === filterKycType);
  
  const handleApproveKyc = (id: number) => {
    // In a real implementation, this would call an API
    alert(`Approving KYC request #${id}`);
  };
  
  const handleRejectKyc = (id: number) => {
    // In a real implementation, this would call an API
    alert(`Rejecting KYC request #${id}`);
  };

  return (
    <DashboardLayout 
      navigation={adminNavigation}
      userType="admin"
      userName={mockAdminData.name}
      pageTitle="Admin Dashboard"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Users */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                {UsersIcon("h-6 w-6 text-blue-600")}
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Users
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {mockAdminData.totalUsers}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <Link
              href="/dashboard/admin/users"
              className="text-sm font-medium text-red-600 hover:text-red-500"
            >
              View All Users
            </Link>
          </div>
        </div>

        {/* Total Agents */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                {UsersIcon("h-6 w-6 text-green-600")}
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Agents
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {mockAdminData.totalAgents}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <Link
              href="/dashboard/admin/agents"
              className="text-sm font-medium text-red-600 hover:text-red-500"
            >
              View All Agents
            </Link>
          </div>
        </div>

        {/* Active Groups */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                {GroupIcon("h-6 w-6 text-purple-600")}
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Groups
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {mockAdminData.totalGroups}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <Link
              href="/dashboard/admin/groups"
              className="text-sm font-medium text-red-600 hover:text-red-500"
            >
              View All Groups
            </Link>
          </div>
        </div>

        {/* Active Loans */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                {LoanIcon("h-6 w-6 text-yellow-600")}
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Loans
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {mockAdminData.activeLoans}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <Link
              href="/dashboard/admin/loans"
              className="text-sm font-medium text-red-600 hover:text-red-500"
            >
              View All Loans
            </Link>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="mt-8">
        <h2 className="text-lg leading-6 font-medium text-gray-900">Financial Summary</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Total Contributions
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                ₦{mockAdminData.totalContributions.toLocaleString()}
              </dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Total Loan Amount
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                ₦{mockAdminData.totalLoanAmount.toLocaleString()}
              </dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Average Credit Score
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {mockAdminData.averageCreditScore} / 900
              </dd>
            </div>
          </div>
        </div>
      </div>

      {/* KYC Approval Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Pending KYC Approvals</h2>
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setFilterKycType('all')}
              className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                filterKycType === 'all' 
                  ? 'text-red-600 bg-red-50 border-red-500 z-10' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilterKycType('user')}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                filterKycType === 'user' 
                  ? 'text-red-600 bg-red-50 border-red-500 z-10' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Users
            </button>
            <button
              type="button"
              onClick={() => setFilterKycType('agent')}
              className={`relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                filterKycType === 'agent' 
                  ? 'text-red-600 bg-red-50 border-red-500 z-10' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Agents
            </button>
          </div>
        </div>
        <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredKycRequests.length > 0 ? (
              filteredKycRequests.map((request) => (
                <li key={request.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className={`h-10 w-10 rounded-full ${
                            request.type === 'agent' ? 'bg-green-100' : 'bg-blue-100'
                          } flex items-center justify-center ${
                            request.type === 'agent' ? 'text-green-600' : 'text-blue-600'
                          } font-semibold`}>
                            {request.name.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-gray-900">{request.name}</p>
                            <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              request.type === 'agent' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {request.type}
                            </span>
                          </div>
                          <div className="flex text-sm text-gray-500">
                            <p>Submitted: {new Date(request.submittedDate).toLocaleDateString()}</p>
                            <span className="mx-1">•</span>
                            <p>Documents: {request.documents}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApproveKyc(request.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectKyc(request.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Reject
                        </button>
                        <Link
                          href={`/dashboard/admin/kyc/${request.id}`}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-6 sm:px-6 text-center text-sm text-gray-500">
                No pending KYC requests found with the selected filter.
              </li>
            )}
          </ul>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <Link
              href="/dashboard/admin/kyc"
              className="text-sm font-medium text-red-600 hover:text-red-500"
            >
              View All KYC Requests
            </Link>
          </div>
        </div>
      </div>

      {/* Two Column Layout for Recent Transactions and Top Groups */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Recent Transactions</h2>
            <Link
              href="/dashboard/admin/transactions"
              className="text-sm font-medium text-red-600 hover:text-red-500"
            >
              View All
            </Link>
          </div>
          <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {mockRecentTransactions.map((transaction) => (
                <li key={transaction.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-semibold">
                            {transaction.user.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">{transaction.user}</p>
                          <p className="text-xs text-gray-500">
                            {transaction.type} • {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <p className="px-2 text-sm font-semibold text-gray-900">
                          ₦{transaction.amount.toLocaleString()}
                        </p>
                        <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Top Groups */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Top Performing Groups</h2>
            <Link
              href="/dashboard/admin/groups"
              className="text-sm font-medium text-red-600 hover:text-red-500"
            >
              View All
            </Link>
          </div>
          <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {mockGroups.map((group) => (
                <li key={group.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{group.name}</p>
                        <div className="mt-1 flex text-xs text-gray-500">
                          <p>{group.members} members</p>
                          <span className="mx-1">•</span>
                          <p>Agent: {group.agent}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">₦{group.totalSavings.toLocaleString()}</p>
                          <p className="mt-1 text-xs text-gray-500">Total Savings</p>
                        </div>
                        <Link
                          href={`/dashboard/admin/groups/${group.id}`}
                          className="ml-4 inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}