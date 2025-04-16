'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout, HomeIcon, GroupIcon, WalletIcon, LoanIcon, CreditIcon, HelpIcon, ProfileIcon, UsersIcon } from '@/components/DashboardLayout';
import { agentNavigation } from '@/constant/navItem';

// Mock data
const mockAgentData = {
  name: 'Fatima Ibrahim',
  email: 'fatima@example.com',
  phone: '+234 987 6543 210',
  balance: 125000,
  creditScore: 810,
  managedGroups: 4,
  totalUsers: 52,
  pendingWithdrawals: 3,
  pendingLoans: 2,
  kycStatus: 'verified'
};

const mockGroups = [
  {
    id: 1,
    name: 'Market Women Savings',
    members: 12,
    contributionAmount: 5000,
    frequency: 'Weekly',
    totalCollected: 240000,
    nextContribution: '2025-04-20',
    status: 'active'
  },
  {
    id: 2,
    name: 'Family Support Group',
    members: 8,
    contributionAmount: 10000,
    frequency: 'Monthly',
    totalCollected: 480000,
    nextContribution: '2025-05-01',
    status: 'active'
  },
  {
    id: 3,
    name: 'Business Investment Club',
    members: 15,
    contributionAmount: 15000,
    frequency: 'Monthly',
    totalCollected: 675000,
    nextContribution: '2025-05-15',
    status: 'active'
  }
];

const mockWithdrawalRequests = [
  {
    id: 1,
    user: 'Amina Johnson',
    amount: 15000,
    requestedDate: '2025-04-12',
    status: 'pending'
  },
  {
    id: 2,
    user: 'Grace Okafor',
    amount: 25000,
    requestedDate: '2025-04-11',
    status: 'pending'
  },
  {
    id: 3,
    user: 'Blessing Adeyemi',
    amount: 10000,
    requestedDate: '2025-04-10',
    status: 'pending'
  }
];

const mockLoanRequests = [
  {
    id: 1,
    user: 'Chinwe Eze',
    amount: 50000,
    purpose: 'Business Expansion',
    creditScore: 750,
    requestedDate: '2025-04-09',
    status: 'pending'
  },
  {
    id: 2,
    user: 'Folake Adeleke',
    amount: 75000,
    purpose: 'Education',
    creditScore: 720,
    requestedDate: '2025-04-08',
    status: 'pending'
  }
];

export default function AgentDashboard() {
  const [showApplyForLoanModal, setShowApplyForLoanModal] = useState(false);
  const [loanAmount, setLoanAmount] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [loanType, setLoanType] = useState('personal'); // 'personal' or 'for-user'
  const [selectedUser, setSelectedUser] = useState('');
  
  // These would be fetched from API in a real implementation
  const users = [
    { id: 1, name: 'Amina Johnson' },
    { id: 2, name: 'Grace Okafor' },
    { id: 3, name: 'Blessing Adeyemi' },
    { id: 4, name: 'Chinwe Eze' },
    { id: 5, name: 'Folake Adeleke' }
  ];

  const handleLoanApplication = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API request
    console.log('Applying for loan:', {
      amount: loanAmount,
      purpose: loanPurpose,
      type: loanType,
      forUser: loanType === 'for-user' ? selectedUser : null
    });
    
    // Show success message and close modal
    alert(`Loan application for ₦${loanAmount} has been submitted successfully.`);
    setLoanAmount('');
    setLoanPurpose('');
    setShowApplyForLoanModal(false);
  };
  
  const handleProcessWithdrawal = (id: number) => {
    // In a real implementation, this would call an API
    alert(`Processing withdrawal request #${id}`);
  };
  
  const handleProcessLoan = (id: number) => {
    // In a real implementation, this would call an API
    alert(`Processing loan request #${id}`);
  };

  return (
    <DashboardLayout 
      navigation={agentNavigation}
      userType="agent"
      userName={mockAgentData.name}
      pageTitle="Agent Dashboard"
    >
      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Wallet Balance */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-[30px]">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 dark:bg-red-900/20 rounded-md p-3">
                {WalletIcon("h-6 w-6 text-red-600 dark:text-red-400")}
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Wallet Balance
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      ₦{mockAgentData.balance.toLocaleString()}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-4 sm:px-6">
            <button
              onClick={() => setShowApplyForLoanModal(true)}
              className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300"
            >
              Apply for Loan
            </button>
          </div>
        </div>

        {/* Credit Score */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-[30px]">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/20 rounded-md p-3">
                {CreditIcon("h-6 w-6 text-green-600 dark:text-green-400")}
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Credit Score
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      {mockAgentData.creditScore} / 900
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-4 sm:px-6">
            <Link
              href="/dashboard/agent/credit-score"
              className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300"
            >
              View Details
            </Link>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-[30px]">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/20 rounded-md p-3">
                {UsersIcon("h-6 w-6 text-blue-600 dark:text-blue-400")}
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Total Users
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      {mockAgentData.totalUsers}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-4 sm:px-6">
            <Link
              href="/dashboard/agent/users"
              className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300"
            >
              Manage Users
            </Link>
          </div>
        </div>

        {/* Managed Groups */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-[30px]">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900/20 rounded-md p-3">
                {GroupIcon("h-6 w-6 text-purple-600 dark:text-purple-400")}
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Managed Groups
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      {mockAgentData.managedGroups}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-4 sm:px-6">
            <Link
              href="/dashboard/agent/groups"
              className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300"
            >
              Manage Groups
            </Link>
          </div>
        </div>
      </div>

      {/* Pending Actions */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Pending Withdrawal Requests */}
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden  rounded-[30px]">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Pending Withdrawal Requests
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                Users waiting for you to process their withdrawal requests.
              </p>
            </div>
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400">
              {mockWithdrawalRequests.length} Pending
            </div>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {mockWithdrawalRequests.length > 0 ? (
              mockWithdrawalRequests.map((request) => (
                <li key={request.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400 font-semibold">
                            {request.user.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{request.user}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Requested: {new Date(request.requestedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <p className="px-2 mr-4 text-sm font-semibold text-gray-900 dark:text-white">
                          ₦{request.amount.toLocaleString()}
                        </p>
                        <button
                          onClick={() => handleProcessWithdrawal(request.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600"
                        >
                          Process
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-6 sm:px-6 text-center text-sm text-gray-500 dark:text-gray-400">
                No pending withdrawal requests.
              </li>
            )}
          </ul>
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-4 sm:px-6">
            <Link
              href="/dashboard/agent/withdrawals"
              className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300"
            >
              View All Withdrawals
            </Link>
          </div>
        </div>

        {/* Pending Loan Requests */}
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden  rounded-[30px]">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Pending Loan Requests
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                Users waiting for you to process their loan applications.
              </p>
            </div>
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400">
              {mockLoanRequests.length} Pending
            </div>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {mockLoanRequests.length > 0 ? (
              mockLoanRequests.map((request) => (
                <li key={request.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold">
                            {request.user.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{request.user}</p>
                          <div className="flex text-sm text-gray-500 dark:text-gray-400">
                            <p>Purpose: {request.purpose}</p>
                            <span className="mx-1">•</span>
                            <p>Score: {request.creditScore}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <p className="px-2 mr-4 text-sm font-semibold text-gray-900 dark:text-white">
                          ₦{request.amount.toLocaleString()}
                        </p>
                        <button
                          onClick={() => handleProcessLoan(request.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600"
                        >
                          Process
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-6 sm:px-6 text-center text-sm text-gray-500 dark:text-gray-400">
                No pending loan requests.
              </li>
            )}
          </ul>
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-4 sm:px-6">
            <Link
              href="/dashboard/agent/loans"
              className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300"
            >
              View All Loans
            </Link>
          </div>
        </div>
      </div>

      {/* Managed Groups */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Managed Ajo Groups</h2>
          <Link
            href="/dashboard/agent/groups/create"
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600"
          >
            Create New Group
          </Link>
        </div>
        <div className="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-[30px]">
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                  Group Name
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Members
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Contribution
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Total Collected
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Next Contribution
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Status
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
              {mockGroups.map((group) => (
                <tr key={group.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                    {group.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {group.members}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    ₦{group.contributionAmount.toLocaleString()} ({group.frequency})
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    ₦{group.totalCollected.toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(group.nextContribution).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
                      {group.status}
                    </span>
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <Link
                      href={`/dashboard/agent/groups/${group.id}`}
                      className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-right">
          <Link
            href="/dashboard/agent/groups"
            className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300"
          >
            View All Groups
          </Link>
        </div>
      </div>

      {/* Apply for Loan Modal */}
      {showApplyForLoanModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-[30px] px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20">
                  {LoanIcon("h-6 w-6 text-red-600 dark:text-red-400")}
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Apply for Loan
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Submit your loan application based on your credit score.
                    </p>
                  </div>
                </div>
              </div>
              <form onSubmit={handleLoanApplication} className="mt-5 sm:mt-6">
                <div className="mb-4">
                  <div className="flex border border-gray-300 dark:border-gray-600 rounded-[30px] overflow-hidden">
                    <button
                      type="button"
                      className={`w-1/2 py-2 px-4 text-center ${
                        loanType === 'personal' 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setLoanType('personal')}
                    >
                      Personal Loan
                    </button>
                    <button
                      type="button"
                      className={`w-1/2 py-2 px-4 text-center ${
                        loanType === 'for-user' 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setLoanType('for-user')}
                    >
                      Apply for User
                    </button>
                  </div>
                </div>

                {loanType === 'for-user' && (
                  <div className="mb-4">
                    <label htmlFor="user" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Select User
                    </label>
                    <select
                      id="user"
                      name="user"
                      required
                      value={selectedUser}
                      onChange={(e) => setSelectedUser(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white p-1"
                    >
                      <option value="">Select a user</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.name}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="mb-4">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Loan Amount (₦)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      required
                      min="5000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white p-1"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Loan Purpose
                  </label>
                  <div className="mt-1">
                    <select
                      id="purpose"
                      name="purpose"
                      required
                      value={loanPurpose}
                      onChange={(e) => setLoanPurpose(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white p-1"
                    >
                      <option value="">Select a purpose</option>
                      <option value="Business Expansion">Business Expansion</option>
                      <option value="Education">Education</option>
                      <option value="Medical Expenses">Medical Expenses</option>
                      <option value="Home Improvement">Home Improvement</option>
                      <option value="Personal Needs">Personal Needs</option>
                      <option value="Agricultural Projects">Agricultural Projects</option>
                      <option value="Debt Consolidation">Debt Consolidation</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <p>Your Credit Score: <span className="font-semibold">{mockAgentData.creditScore} / 900</span></p>
                  <p>Loan Eligibility: <span className="font-semibold text-green-600 dark:text-green-400">Eligible for up to ₦250,000</span></p>
                </div>

                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    disabled={!loanAmount || (loanType === 'for-user' && !selectedUser) || !loanPurpose}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 dark:bg-red-500 text-base font-medium text-white hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-red-400 sm:col-start-2 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowApplyForLoanModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-red-400 sm:mt-0 sm:col-start-1 sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
