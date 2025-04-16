'use client';

import { useState } from 'react';
import { HomeIcon, GroupIcon, WalletIcon, LoanIcon, HelpIcon, UsersIcon, AnalyticsIcon, KycIcon, DashboardLayout } from '@/components/DashboardLayout';
import { adminNavigation } from '@/constant/navItem';

// Mock admin data
const mockAdminData = {
  name: 'Admin',
};

// Mock transactions data
const mockTransactions = [
  {
    id: 'TRX-12345',
    type: 'contribution',
    amount: 5000,
    user: 'Chioma Okafor',
    group: 'Market Women Savings',
    agent: 'Fatima Ibrahim',
    status: 'completed',
    date: '2025-04-28T10:30:00',
    description: 'Weekly contribution'
  },
  {
    id: 'TRX-12346',
    type: 'contribution',
    amount: 10000,
    user: 'Ahmed Mohammed',
    group: 'Community Traders Union',
    agent: 'Joseph Nnamdi',
    status: 'completed',
    date: '2025-04-27T14:15:00',
    description: 'Weekly contribution'
  },
  {
    id: 'TRX-12347',
    type: 'withdrawal',
    amount: 24000,
    user: 'Blessing Adebayo',
    group: 'Market Women Savings',
    agent: 'Fatima Ibrahim',
    status: 'completed',
    date: '2025-04-26T16:45:00',
    description: 'Savings withdrawal for school fees'
  },
  {
    id: 'TRX-12348',
    type: 'loan_disbursement',
    amount: 100000,
    user: 'Tunde Bakare',
    group: 'Business Investment Club',
    agent: 'James Adebayo',
    status: 'completed',
    date: '2025-04-25T11:20:00',
    description: 'Business expansion loan'
  },
  {
    id: 'TRX-12349',
    type: 'loan_repayment',
    amount: 22000,
    user: 'Tunde Bakare',
    group: 'Business Investment Club',
    agent: 'James Adebayo',
    status: 'completed',
    date: '2025-04-25T15:30:00',
    description: 'Loan repayment installment'
  },
  {
    id: 'TRX-12350',
    type: 'withdrawal',
    amount: 35000,
    user: 'Funke Williams',
    group: 'Teachers Saving Circle',
    agent: 'James Adebayo',
    status: 'pending',
    date: '2025-04-28T09:45:00',
    description: 'Emergency withdrawal request'
  },
  {
    id: 'TRX-12351',
    type: 'agent_commission',
    amount: 2500,
    user: 'N/A',
    group: 'N/A',
    agent: 'Fatima Ibrahim',
    status: 'completed',
    date: '2025-04-24T18:00:00',
    description: 'Weekly commission payout'
  },
  {
    id: 'TRX-12352',
    type: 'platform_fee',
    amount: 1000,
    user: 'N/A',
    group: 'Market Women Savings',
    agent: 'Fatima Ibrahim',
    status: 'completed',
    date: '2025-04-24T18:05:00',
    description: 'Platform usage fee'
  },
  {
    id: 'TRX-12353',
    type: 'contribution',
    amount: 15000,
    user: 'Ngozi Okonkwo',
    group: 'Business Investment Club',
    agent: 'James Adebayo',
    status: 'failed',
    date: '2025-04-23T13:25:00',
    description: 'Monthly contribution - insufficient funds'
  },
  {
    id: 'TRX-12354',
    type: 'withdrawal',
    amount: 45000,
    user: 'Emeka Obi',
    group: 'Transport Workers Alliance',
    agent: 'Fatima Ibrahim',
    status: 'cancelled',
    date: '2025-04-22T10:15:00',
    description: 'Withdrawal request cancelled by user'
  }
];

export default function AdminTransactions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('date_desc');
  
  // Filter transactions
  const filteredTransactions = mockTransactions.filter(transaction => {
    // Search term match
    const searchMatch = 
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.group.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Type match
    const typeMatch = filterType === 'all' || transaction.type === filterType;
    
    // Status match
    const statusMatch = filterStatus === 'all' || transaction.status === filterStatus;
    
    // Date range logic would go here - simplified for mock
    const dateMatch = true;
    
    return searchMatch && typeMatch && statusMatch && dateMatch;
  });
  
  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === 'date_desc') return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === 'date_asc') return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sortBy === 'amount_desc') return b.amount - a.amount;
    if (sortBy === 'amount_asc') return a.amount - b.amount;
    return 0;
  });
  
  // Helper functions
  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getTransactionTypeClass = (type: string) => {
    switch (type) {
      case 'contribution':
        return 'bg-blue-100 text-blue-800';
      case 'withdrawal':
        return 'bg-yellow-100 text-yellow-800';
      case 'loan_disbursement':
        return 'bg-purple-100 text-purple-800';
      case 'loan_repayment':
        return 'bg-indigo-100 text-indigo-800';
      case 'agent_commission':
        return 'bg-pink-100 text-pink-800';
      case 'platform_fee':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <DashboardLayout 
      navigation={adminNavigation}
      userType="admin"
      userName={mockAdminData.name}
      pageTitle="Transactions"
    >

      
      {/* Transaction Summary */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                  <dd className="text-lg font-medium text-gray-900">
                    {formatCurrency(
                      mockTransactions
                        .filter(t => t.type === 'contribution' && t.status === 'completed')
                        .reduce((sum, t) => sum + t.amount, 0)
                    )}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                {WalletIcon("h-6 w-6 text-yellow-600") }
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Withdrawals
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {formatCurrency(
                      mockTransactions
                        .filter(t => t.type === 'withdrawal' && t.status === 'completed')
                        .reduce((sum, t) => sum + t.amount, 0)
                    )}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                {LoanIcon("h-6 w-6 text-purple-600") }
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Loans
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {formatCurrency(
                      mockTransactions
                        .filter(t => t.type === 'loan_disbursement' && t.status === 'completed')
                        .reduce((sum, t) => sum + t.amount, 0)
                    )}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                {WalletIcon("h-6 w-6 text-blue-600") }
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Platform Revenue
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {formatCurrency(
                      mockTransactions
                        .filter(t => t.type === 'platform_fee' && t.status === 'completed')
                        .reduce((sum, t) => sum + t.amount, 0)
                    )}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-10">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Financial Transactions
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Monitor all financial activities on the Digital Ajo platform
            </p>
          </div>
          <div>
            <button
              onClick={() => alert('This would generate a transaction report')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Generate Report
            </button>
          </div>
        </div>
        
        {/* Filters and Search */}
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/4">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="focus:ring-red-500 focus:border-red-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-1 border"
                  placeholder="Search transactions"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <select
                id="filter-type"
                name="filter-type"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="block  pl-3 pr-10 py-2 text-black border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
              >
                <option value="all">All Types</option>
                <option value="contribution">Contributions</option>
                <option value="withdrawal">Withdrawals</option>
                <option value="loan_disbursement">Loan Disbursements</option>
                <option value="loan_repayment">Loan Repayments</option>
                <option value="agent_commission">Agent Commissions</option>
                <option value="platform_fee">Platform Fees</option>
              </select>
              
              <select
                id="filter-status"
                name="filter-status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="block  pl-3 pr-10 py-2 text-black border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              
              <select
                id="date-range"
                name="date-range"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="block  pl-3 pr-10 py-2 text-black border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="custom">Custom Range</option>
              </select>
              
              <select
                id="sort-by"
                name="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block  pl-3 pr-10 py-2 text-black border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
              >
                <option value="date_desc">Newest First</option>
                <option value="date_asc">Oldest First</option>
                <option value="amount_desc">Amount (High to Low)</option>
                <option value="amount_asc">Amount (Low to High)</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Transactions List */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Parties
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedTransactions.length > 0 ? (
                sortedTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTransactionTypeClass(transaction.type)}`}>
                        {transaction.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {transaction.user !== 'N/A' && (
                          <div><span className="font-medium">User:</span> {transaction.user}</div>
                        )}
                        <div><span className="font-medium">Agent:</span> {transaction.agent}</div>
                        {transaction.group !== 'N/A' && (
                          <div><span className="font-medium">Group:</span> {transaction.group}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(transaction.status)}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => alert(`View details for transaction ${transaction.id}`)}
                        className="text-red-600 hover:text-red-900 mr-2"
                      >
                        View
                      </button>
                      {transaction.status === 'pending' && (
                        <>
                          <button
                            onClick={() => alert(`Approve transaction ${transaction.id}`)}
                            className="text-green-600 hover:text-green-900 mr-2"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => alert(`Reject transaction ${transaction.id}`)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        </>
                        
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    No transactions found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{sortedTransactions.length}</span> transactions
            </div>
            <div className="flex-1 flex justify-end">
              <div className="relative z-0 inline-flex shadow-sm rounded-md">
                <button
                  type="button"
                  className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

