'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { agentNavigation } from '@/constant/navItem';

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: 'Amina Johnson',
    email: 'amina@example.com',
    phone: '+234 123 4567 890',
    address: '12, Lagos Street, Abuja',
    groups: [
      { id: 1, name: 'Monthly Savers', contribution: 10000, startDate: '2024-10-15' },
      { id: 2, name: 'Women in Business', contribution: 15000, startDate: '2024-11-01' }
    ],
    totalContributions: 40000,
    loansTaken: 1,
    loanBalance: 0,
    creditScore: 760,
    kycStatus: 'verified',
    joinedDate: '2024-10-15',
    deposits: [
      { id: 1, date: '2025-03-15', amount: 10000, group: 'Monthly Savers', status: 'Completed' },
      { id: 2, date: '2025-02-15', amount: 10000, group: 'Monthly Savers', status: 'Completed' },
      { id: 3, date: '2025-02-01', amount: 15000, group: 'Women in Business', status: 'Completed' }
    ],
    withdrawals: [
      { id: 1, date: '2025-01-10', amount: 20000, status: 'Completed' }
    ]
  },
  {
    id: 2,
    name: 'Grace Okafor',
    email: 'grace@example.com',
    phone: '+234 123 9876 543',
    address: '25, Adeyemi Close, Lagos',
    groups: [
      { id: 1, name: 'Monthly Savers', contribution: 10000, startDate: '2024-11-05' }
    ],
    totalContributions: 30000,
    loansTaken: 0,
    loanBalance: 0,
    creditScore: 730,
    kycStatus: 'verified',
    joinedDate: '2024-11-05',
    deposits: [
      { id: 1, date: '2025-03-05', amount: 10000, group: 'Monthly Savers', status: 'Completed' },
      { id: 2, date: '2025-02-05', amount: 10000, group: 'Monthly Savers', status: 'Completed' },
      { id: 3, date: '2025-01-05', amount: 10000, group: 'Monthly Savers', status: 'Completed' }
    ],
    withdrawals: []
  },
  {
    id: 3,
    name: 'Blessing Adeyemi',
    email: 'blessing@example.com',
    phone: '+234 987 5432 109',
    address: '7, Oba Road, Ibadan',
    groups: [
      { id: 1, name: 'Monthly Savers', contribution: 20000, startDate: '2024-09-30' },
      { id: 3, name: 'Family Support', contribution: 15000, startDate: '2024-10-15' }
    ],
    totalContributions: 85000,
    loansTaken: 1,
    loanBalance: 35000,
    creditScore: 710,
    kycStatus: 'verified',
    joinedDate: '2024-09-30',
    deposits: [
      { id: 1, date: '2025-03-15', amount: 20000, group: 'Monthly Savers', status: 'Completed' },
      { id: 2, date: '2025-03-15', amount: 15000, group: 'Family Support', status: 'Completed' },
      { id: 3, date: '2025-02-15', amount: 20000, group: 'Monthly Savers', status: 'Completed' }
    ],
    withdrawals: []
  },
  {
    id: 4,
    name: 'Chinwe Eze',
    email: 'chinwe@example.com',
    phone: '+234 234 5678 901',
    address: '15, Market Road, Enugu',
    groups: [
      { id: 4, name: 'Traders Union', contribution: 25000, startDate: '2024-12-10' }
    ],
    totalContributions: 50000,
    loansTaken: 0,
    loanBalance: 0,
    creditScore: 750,
    kycStatus: 'verified',
    joinedDate: '2024-12-10',
    deposits: [
      { id: 1, date: '2025-03-10', amount: 25000, group: 'Traders Union', status: 'Completed' },
      { id: 2, date: '2025-02-10', amount: 25000, group: 'Traders Union', status: 'Completed' }
    ],
    withdrawals: []
  },
  {
    id: 5,
    name: 'Folake Adeleke',
    email: 'folake@example.com',
    phone: '+234 567 8901 234',
    address: '3, School Lane, Port Harcourt',
    groups: [
      { id: 1, name: 'Monthly Savers', contribution: 15000, startDate: '2024-10-22' },
      { id: 2, name: 'Women in Business', contribution: 20000, startDate: '2024-11-15' },
      { id: 5, name: 'Education Fund', contribution: 10000, startDate: '2024-12-01' }
    ],
    totalContributions: 105000,
    loansTaken: 1,
    loanBalance: 75000,
    creditScore: 720,
    kycStatus: 'verified',
    joinedDate: '2024-10-22',
    deposits: [
      { id: 1, date: '2025-03-15', amount: 15000, group: 'Monthly Savers', status: 'Completed' },
      { id: 2, date: '2025-03-15', amount: 20000, group: 'Women in Business', status: 'Completed' },
      { id: 3, date: '2025-03-01', amount: 10000, group: 'Education Fund', status: 'Completed' }
    ],
    withdrawals: []
  }
];

export default function UserDetails() {
  const params = useParams();
  const userId = parseInt(params.id as string);
  const user = mockUsers.find(u => u.id === userId) || null;
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!user) {
    return (
      <DashboardLayout 
        navigation={agentNavigation}
        userType="agent"
        userName="Fatima Ibrahim"
        pageTitle="User Not Found"
      >
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px] p-6">
          <p className="text-red-500 dark:text-red-400 text-lg font-medium">User with ID {userId} not found.</p>
          <Link href="/dashboard/agent/users" className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-[30px] shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Back to Users
          </Link>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout 
      navigation={agentNavigation}
      userType="agent"
      userName="Fatima Ibrahim"
      pageTitle={`User: ${user.name}`}
    >
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px] mb-6">
        <div className="px-4 py-5 sm:px-6 flex flex-wrap justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <div>
            <Link href="/dashboard/agent/users" className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Users
            </Link>
            <h3 className="text-xl leading-6 font-medium text-gray-900 dark:text-white">
              {user.name}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              User since {user.joinedDate}
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-2">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-[30px] shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Deposit for User
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-[30px] shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Apply for Loan
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-[30px] shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Add to Group
            </button>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${
                activeTab === 'overview'
                  ? 'border-red-500 dark:border-red-400 text-red-600 dark:text-red-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('groups')}
              className={`${
                activeTab === 'groups'
                  ? 'border-red-500 dark:border-red-400 text-red-600 dark:text-red-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Groups ({user.groups.length})
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`${
                activeTab === 'transactions'
                  ? 'border-red-500 dark:border-red-400 text-red-600 dark:text-red-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Transactions
            </button>
            <button
              onClick={() => setActiveTab('kyc')}
              className={`${
                activeTab === 'kyc'
                  ? 'border-red-500 dark:border-red-400 text-red-600 dark:text-red-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              KYC Documents
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="px-4 py-5 sm:p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-[30px] p-4 md:col-span-3">
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-md font-medium text-gray-900 dark:text-white">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="text-md font-medium text-gray-900 dark:text-white">{user.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                    <p className="text-md font-medium text-gray-900 dark:text-white">{user.address}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px] p-4">
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Credit Score</h4>
                <div className="flex justify-center mb-2">
                  <div className="w-24 h-24 rounded-full border-8 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{user.creditScore}</span>
                  </div>
                </div>
                <p className="text-sm text-center text-gray-500 dark:text-gray-400">{user.creditScore >= 750 ? 'Excellent' : user.creditScore >= 700 ? 'Good' : 'Fair'}</p>
                <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-1">Updated: March 2025</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px] p-4">
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Savings Activity</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Contributions</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">₦{user.totalContributions.toLocaleString()}</p>
                <div className="mt-3">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Active Groups</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{user.groups.length}</p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px] p-4">
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Loan Activity</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Loans Taken</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">{user.loansTaken}</p>
                <div className="mt-3">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Current Balance</p>
                  <p className={`text-lg font-medium ${user.loanBalance > 0 ? 'text-red-500 dark:text-red-400' : 'text-green-500 dark:text-green-400'}`}>₦{user.loanBalance.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'groups' && (
            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Active Groups</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {user.groups.map(group => (
                  <div key={group.id} className="border border-gray-200 dark:border-gray-700 rounded-[30px] p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <h5 className="text-md font-medium text-gray-900 dark:text-white">{group.name}</h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Contribution: ₦{group.contribution.toLocaleString()} / cycle</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Joined: {group.startDate}</p>
                    <div className="mt-3 flex space-x-2">
                      <button className="text-xs bg-red-500 dark:bg-red-600 text-white rounded-[30px] px-3 py-1 hover:bg-red-600 dark:hover:bg-red-700">
                        Deposit
                      </button>
                      <button className="text-xs border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-[30px] px-3 py-1 hover:bg-gray-50 dark:hover:bg-gray-800">
                        Group Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-[30px] shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  Add to New Group
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'transactions' && (
            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Deposit History</h4>
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Group</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {user.deposits.map((deposit) => (
                      <tr key={deposit.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{deposit.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{deposit.group}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-500 dark:text-green-400">₦{deposit.amount.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${deposit.status === 'Completed' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300'}`}>{deposit.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Withdrawal History</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {user.withdrawals.length > 0 ? (
                      user.withdrawals.map((withdrawal) => (
                        <tr key={withdrawal.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{withdrawal.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-500 dark:text-red-400">₦{withdrawal.amount.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${withdrawal.status === 'Completed' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300'}`}>{withdrawal.status}</span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                          No withdrawals recorded for this user.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'kyc' && (
            <div>
              <div className="mb-6 bg-gray-50 dark:bg-gray-700 rounded-[30px] p-4">
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">KYC Status</h4>
                <div className="flex items-center">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full mr-2 ${user.kycStatus === 'verified' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'}`}>{user.kycStatus === 'verified' ? 'Verified' : 'Pending'}</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: March 15, 2025</p>
                </div>
              </div>
              
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">KYC Documents</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Documents submitted for Know Your Customer verification.</p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="border border-gray-200 dark:border-gray-700 rounded-[30px] p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="text-md font-medium text-gray-900 dark:text-white">Government ID</h5>
                      <p className="text-sm text-gray-500 dark:text-gray-400">National ID Card • Uploaded Mar 10, 2025</p>
                    </div>
                    <button className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium">
                      View Document
                    </button>
                  </div>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-[30px] p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="text-md font-medium text-gray-900 dark:text-white">Proof of Address</h5>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Utility Bill • Uploaded Mar 10, 2025</p>
                    </div>
                    <button className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium">
                      View Document
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
