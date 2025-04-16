'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout, NavItem, HomeIcon, GroupIcon, WalletIcon, LoanIcon, CreditIcon, HelpIcon, ProfileIcon, TargetIcon } from '@/components/DashboardLayout';
import { userNavigation } from '@/constant/navItem';

// Mock data
const mockUserData = {
  name: 'Amina Johnson',
  email: 'amina@example.com',
  phone: '+234 123 4567 890',
  balance: 25000,
  creditScore: 720,
  activeGroups: 2,
  pendingLoans: 1,
  completedContributions: 8
};

// Mock target savings data
const mockTargetSavings = [
  {
    id: 1,
    name: 'New Smartphone',
    targetAmount: 150000,
    currentAmount: 75000,
    startDate: '2025-01-15',
    endDate: '2025-06-15',
    frequency: 'Weekly',
    status: 'active'
  },
  {
    id: 2,
    name: 'Vacation Fund',
    targetAmount: 500000,
    currentAmount: 125000,
    startDate: '2025-02-01',
    endDate: '2025-12-31',
    frequency: 'Monthly',
    status: 'active'
  }
];

const mockGroups = [
  {
    id: 1,
    name: 'Market Women Savings',
    members: 12,
    contributionAmount: 5000,
    frequency: 'Weekly',
    nextContribution: '2025-04-20',
    status: 'active'
  },
  {
    id: 2,
    name: 'Family Support Group',
    members: 8,
    contributionAmount: 10000,
    frequency: 'Monthly',
    nextContribution: '2025-05-01',
    status: 'active'
  }
];

const mockTransactions = [
  {
    id: 1,
    type: 'Deposit',
    amount: 5000,
    date: '2025-04-10',
    status: 'completed'
  },
  {
    id: 2,
    type: 'Contribution',
    amount: 5000,
    group: 'Market Women Savings',
    date: '2025-04-09',
    status: 'completed'
  },
  {
    id: 3,
    type: 'Loan Repayment',
    amount: 2500,
    date: '2025-04-05',
    status: 'completed'
  },
  {
    id: 4,
    type: 'Contribution',
    amount: 10000,
    group: 'Family Support Group',
    date: '2025-04-01',
    status: 'completed'
  }
];

export default function UserDashboard() {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [showJoinGroupModal, setShowJoinGroupModal] = useState(false);
  const [showCreateTargetModal, setShowCreateTargetModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [joinGroupId, setJoinGroupId] = useState('');

  const handleWithdrawalRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API request
    console.log('Requesting withdrawal for amount:', withdrawAmount);
    
    // Show success message and close modal
    alert(`Withdrawal request for ₦${withdrawAmount} has been sent to an agent for processing.`);
    setWithdrawAmount('');
    setShowWithdrawalModal(false);
  };

  const handleJoinGroup = (groupId: string) => {
    console.log(`Attempting to join group with ID: ${groupId}`);
    // TODO: Implement the actual logic for joining a group
    // This might involve:
    // 1. Making an API call to your backend to join the group
    // 2. Updating the user's group list state
    // 3. Closing the modal or navigating the user
    alert(`Joining group ${groupId} - Implementation pending.`);
    // Example: close modal if applicable
    // if (isGroupDetailsModalOpen) {
    //   setGroupDetailsModalOpen(false);
    // }
  };

  const handleJoinGroupSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    if (joinGroupId) {
      handleJoinGroup(joinGroupId);
      // Optionally close the modal after submission
      // setIsJoinGroupModalOpen(false);
      // setJoinGroupId(''); // Clear the input
    }
  };

  const handleCreateTarget = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    if (joinGroupId) {
      handleJoinGroup(joinGroupId);
      // Optionally close the modal after submission
      // setIsJoinGroupModalOpen(false);
      // setJoinGroupId(''); // Clear the input
    }
  }

  return (
    <DashboardLayout 
      navigation={userNavigation}
      userType="user"
      userName={mockUserData.name}
      pageTitle="Dashboard"
    >
      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Wallet Balance */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-[30px]">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 dark:bg-red-900/20 rounded-[30px] p-3">
               {WalletIcon("h-6 w-6 text-red-600 dark:text-red-400")}
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Wallet Balance
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      ₦{mockUserData.balance.toLocaleString()}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-4 sm:px-6">
            <button
              onClick={() => setShowWithdrawalModal(true)}
              className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300"
            >
              Request Withdrawal
            </button>
          </div>
        </div>

        {/* Credit Score */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-[30px]">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 dark:bg-red-900/20 rounded-[30px] p-3">
                {CreditIcon("h-6 w-6 text-red-600 dark:text-red-400")}
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Credit Score
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      {mockUserData.creditScore} / 900
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-4 sm:px-6">
            <Link
              href="/dashboard/user/credit-score"
              className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300"
            >
              View Details
            </Link>
          </div>
        </div>

        {/* Active Groups */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-[30px]">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 dark:bg-red-900/20 rounded-[30px] p-3">
                {GroupIcon("h-6 w-6 text-red-600 dark:text-red-400")}
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Active Groups
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      {mockUserData.activeGroups}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-4 sm:px-6">
            <Link
              href="/dashboard/user/groups"
              className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300"
            >
              View All Groups
            </Link>
          </div>
        </div>

        {/* Completed Contributions */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-[30px]">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 dark:bg-red-900/20 rounded-[30px] p-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-red-600 dark:text-red-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm3 0h.008v.008H18V12v.008z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Completed Contributions
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      {mockUserData.completedContributions}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-4 sm:px-6">
            <Link
              href="/dashboard/user/contributions"
              className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300"
            >
              View History
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Quick Actions</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Join Ajo Group */}
          <div className="bg-gray-50 dark:bg-gray-700/50 overflow-hidden shadow rounded-[30px] hover:shadow-lg transition-shadow duration-300">
            <button 
              onClick={() => setShowJoinGroupModal(true)}
              className="w-full h-full text-left"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/20 rounded-[30px] p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-blue-600 dark:text-blue-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Join Ajo Group
                      </dt>
                      <dd>
                        <div className="text-sm text-gray-900 dark:text-white">
                          Join an existing savings group
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* Create Target Saving */}
          <div className="bg-gray-50 dark:bg-gray-700/50 overflow-hidden shadow rounded-[30px] hover:shadow-lg transition-shadow duration-300">
            <button 
              onClick={() => setShowCreateTargetModal(true)}
              className="w-full h-full text-left"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/20 rounded-[30px] p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-green-600 dark:text-green-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Create Target Saving
                      </dt>
                      <dd>
                        <div className="text-sm text-gray-900 dark:text-white">
                          Set up a new savings goal
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* Make Deposit */}
          <div className="bg-gray-50 dark:bg-gray-700/50 overflow-hidden shadow rounded-[30px] hover:shadow-lg transition-shadow duration-300">
            <button 
              onClick={() => setShowDepositModal(true)}
              className="w-full h-full text-left"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-100 dark:bg-yellow-900/20 rounded-[30px] p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-yellow-600 dark:text-yellow-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Make Deposit
                      </dt>
                      <dd>
                        <div className="text-sm text-gray-900 dark:text-white">
                          Add funds to your wallet
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* Request Withdrawal */}
          <div className="bg-gray-50 dark:bg-gray-700/50 overflow-hidden shadow rounded-[30px] hover:shadow-lg transition-shadow duration-300">
            <button 
              onClick={() => setShowWithdrawalModal(true)}
              className="w-full h-full text-left"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-red-100 dark:bg-red-900/20 rounded-[30px] p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-red-600 dark:text-red-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Request Withdrawal
                      </dt>
                      <dd>
                        <div className="text-sm text-gray-900 dark:text-white">
                          Withdraw funds from your wallet
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Ajo Groups */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">My Ajo Groups</h2>
          <Link
            href="/dashboard/user/groups"
            className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300"
          >
            View All
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {mockGroups.map((group) => (
            <div
              key={group.id}
              className="bg-gray-50 dark:bg-gray-700/50 overflow-hidden shadow rounded-[30px]"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{group.name}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
                    {group.status}
                  </span>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Members</span>
                    <span className="font-medium text-gray-900 dark:text-white">{group.members}</span>
                  </div>
                  <div className="mt-2 flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Contribution</span>
                    <span className="font-medium text-gray-900 dark:text-white">₦{group.contributionAmount.toLocaleString()} ({group.frequency})</span>
                  </div>
                  <div className="mt-2 flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Next Contribution</span>
                    <span className="font-medium text-gray-900 dark:text-white">{new Date(group.nextContribution).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-4 sm:px-6 flex justify-between">
                <Link
                  href={`/dashboard/user/groups/${group.id}`}
                  className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300"
                >
                  View Details
                </Link>
                <Link
                  href={`/dashboard/user/groups/${group.id}/contribute`}
                  className="text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300"
                >
                  Make Contribution
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Target Savings */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Target Savings</h2>
          <Link
            href="/dashboard/user/target-savings"
            className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300"
          >
            View All
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {mockTargetSavings.map((target) => (
            <div
              key={target.id}
              className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-[30px]"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{target.name}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400">
                    {target.status.charAt(0).toUpperCase() + target.status.slice(1)}
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Progress</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {Math.round((target.currentAmount / target.targetAmount) * 100)}%
                    </span>
                  </div>
                  <div className="mt-2 relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                      <div 
                        style={{ width: `${Math.round((target.currentAmount / target.targetAmount) * 100)}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500 dark:bg-red-400"
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="block text-gray-500 dark:text-gray-400">Current</span>
                    <span className="block mt-1 font-medium text-gray-900 dark:text-white">₦{target.currentAmount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500 dark:text-gray-400">Target</span>
                    <span className="block mt-1 font-medium text-gray-900 dark:text-white">₦{target.targetAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-4 sm:px-6 flex justify-between">
                <Link
                  href={`/dashboard/user/target-savings/${target.id}`}
                  className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300"
                >
                  View Details
                </Link>
                <button
                  onClick={() => {
                    setDepositAmount('');
                    setShowDepositModal(true);
                  }}
                  className="text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300"
                >
                  Deposit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="mt-8 ">
        <div className="flex items-center justify-between">
          <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Recent Transactions</h2>
          <Link
            href="/dashboard/user/wallet"
            className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300"
          >
            View All
          </Link>
        </div>
        <div className="mt-4 bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-[30px]">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {mockTransactions.map((transaction) => (
              <li key={transaction.id}>
                <div className="px-4 py-4 sm:px-6 bg-white dark:bg-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 rounded-[30px] p-2 ${ 
                        transaction.type === 'Deposit' ? 'bg-green-100 dark:bg-green-900/20' : 
                        transaction.type === 'Withdrawal' ? 'bg-red-100 dark:bg-red-900/20' : 
                        transaction.type === 'Contribution' ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-yellow-100 dark:bg-yellow-900/20'
                      }`}>
                        {transaction.type === 'Deposit' && (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-600 dark:text-green-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                        )}
                        {transaction.type === 'Withdrawal' && (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-600 dark:text-red-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                          </svg>
                        )}
                        {transaction.type === 'Contribution' && (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600 dark:text-blue-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                          </svg>
                        )}
                        {transaction.type === 'Loan Repayment' && (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-yellow-600 dark:text-yellow-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {transaction.type}
                          {transaction.group && <span className="text-gray-500 dark:text-gray-400"> ({transaction.group})</span>}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex items-center">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        ₦{transaction.amount.toLocaleString()}
                      </p>
                      <p className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
                        {transaction.status}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Withdrawal Modal */}
      {showWithdrawalModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-[30px] px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20">
                  {WalletIcon("h-6 w-6 text-red-600 dark:text-red-400")}
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Request Withdrawal
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enter the amount you wish to withdraw. An agent will process your request.
                    </p>
                  </div>
                </div>
              </div>
              <form onSubmit={handleWithdrawalRequest} className="mt-5 sm:mt-6">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Amount (₦)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      required
                      min="500"
                      max={mockUserData.balance}
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="shadow-sm focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-500 dark:focus:border-red-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-[30px] p-2"
                      placeholder="Enter amount"
                    />
                  </div>
                  {parseFloat(withdrawAmount) > mockUserData.balance && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      Amount exceeds your available balance.
                    </p>
                  )}
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Available balance: ₦{mockUserData.balance.toLocaleString()}
                  </p>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    disabled={!withdrawAmount || parseFloat(withdrawAmount) > mockUserData.balance || parseFloat(withdrawAmount) < 500}
                    className="w-full inline-flex justify-center rounded-[30px] border border-transparent shadow-sm px-4 py-2 bg-red-600 dark:bg-red-500 text-base font-medium text-white hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-red-400 sm:col-start-2 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Request Withdrawal
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowWithdrawalModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-[30px] border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-red-400 sm:mt-0 sm:col-start-1 sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Join Group Modal */}
      {showJoinGroupModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-[30px] px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-blue-600 dark:text-blue-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Join Ajo Group
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enter the Group ID you want to join.
                    </p>
                  </div>
                </div>
              </div>
              <form onSubmit={handleJoinGroupSubmit} className="mt-5 sm:mt-6">
                <div>
                  <label htmlFor="groupId" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Group ID
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="groupId"
                      id="groupId"
                      required
                      value={joinGroupId}
                      onChange={(e) => setJoinGroupId(e.target.value)}
                      className="shadow-sm focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-[30px] p-2"
                      placeholder="Enter Group ID"
                    />
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    disabled={!joinGroupId}
                    className="w-full inline-flex justify-center rounded-[30px] border border-transparent shadow-sm px-4 py-2 bg-blue-600 dark:bg-blue-500 text-base font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 sm:col-start-2 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Join Group
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowJoinGroupModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-[30px] border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 sm:mt-0 sm:col-start-1 sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Create Target Modal */}
      {showCreateTargetModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-[30px] px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-green-600 dark:text-green-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Create New Target Saving
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Define your saving goal.
                    </p>
                  </div>
                </div>
              </div>
              <form onSubmit={handleCreateTarget} className="mt-5 sm:mt-6 space-y-4">
                <div>
                  <label htmlFor="targetName" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Target Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="targetName"
                      id="targetName"
                      required
                      value={''}
                      onChange={(e) => console.log(e.target.value)}
                      className="shadow-sm focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-[30px] p-2"
                      placeholder="e.g., New Laptop"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Target Amount (₦)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="targetAmount"
                      id="targetAmount"
                      required
                      min="1000"
                      value={''}
                      onChange={(e) => console.log(e.target.value)}
                      className="shadow-sm focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-[30px] p-2"
                      placeholder="Enter target amount"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="targetDate" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Target Date
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      name="targetDate"
                      id="targetDate"
                      required
                      min={new Date().toISOString().split('T')[0]} // Set min date to today
                      value={''}
                      onChange={(e) => console.log(e.target.value)}
                      className="shadow-sm focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-[30px] p-2"
                    />
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    disabled={true}
                    className="w-full inline-flex justify-center rounded-[30px] border border-transparent shadow-sm px-4 py-2 bg-green-600 dark:bg-green-500 text-base font-medium text-white hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-green-400 sm:col-start-2 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create Target
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateTargetModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-[30px] border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-green-400 sm:mt-0 sm:col-start-1 sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-[30px] px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-yellow-600 dark:text-yellow-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Make a Deposit
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Add funds to your wallet using any of the available methods.
                    </p>
                  </div>
                </div>
              </div>
              <form className="mt-5 sm:mt-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="deposit-amount" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Amount (₦)
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="deposit-amount"
                        id="deposit-amount"
                        required
                        min="500"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        className="shadow-sm focus:ring-yellow-500 dark:focus:ring-yellow-400 focus:border-yellow-500 dark:focus:border-yellow-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-[30px] p-2"
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Payment Method
                    </label>
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      <div>
                        <input type="radio" id="card" name="payment-method" value="card" className="sr-only" defaultChecked />
                        <label htmlFor="card" className="flex flex-col items-center p-3 border border-gray-300 dark:border-gray-600 rounded-[30px] cursor-pointer hover:border-red-500 dark:hover:border-red-400 peer-checked:border-red-500 dark:peer-checked:border-red-400">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700 dark:text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                          </svg>
                          <span className="mt-2 text-xs font-medium text-gray-900 dark:text-white">Card</span>
                        </label>
                      </div>
                      
                      <div>
                        <input type="radio" id="ussd" name="payment-method" value="ussd" className="sr-only" />
                        <label htmlFor="ussd" className="flex flex-col items-center p-3 border border-gray-300 dark:border-gray-600 rounded-[30px] cursor-pointer hover:border-red-500 dark:hover:border-red-400 peer-checked:border-red-500 dark:peer-checked:border-red-400">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700 dark:text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                          </svg>
                          <span className="mt-2 text-xs font-medium text-gray-900 dark:text-white">USSD</span>
                        </label>
                      </div>
                      
                      <div>
                        <input type="radio" id="bank" name="payment-method" value="bank" className="sr-only" />
                        <label htmlFor="bank" className="flex flex-col items-center p-3 border border-gray-300 dark:border-gray-600 rounded-[30px] cursor-pointer hover:border-red-500 dark:hover:border-red-400 peer-checked:border-red-500 dark:peer-checked:border-red-400">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700 dark:text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                          </svg>
                          <span className="mt-2 text-xs font-medium text-gray-900 dark:text-white">Bank</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    onClick={() => {
                      alert(`Deposit of ₦${depositAmount} initiated successfully!`);
                      setDepositAmount('');
                      setShowDepositModal(false);
                    }}
                    disabled={!depositAmount || parseFloat(depositAmount) < 500}
                    className="w-full inline-flex justify-center rounded-[30px] border border-transparent shadow-sm px-4 py-2 bg-yellow-600 dark:bg-yellow-500 text-base font-medium text-white hover:bg-yellow-700 dark:hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 dark:focus:ring-yellow-400 sm:col-start-2 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Proceed
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDepositAmount('');
                      setShowDepositModal(false);
                    }}
                    className="mt-3 w-full inline-flex justify-center rounded-[30px] border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-red-400 sm:mt-0 sm:col-start-1 sm:text-sm"
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
