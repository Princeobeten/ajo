'use client';

import { useState } from 'react';
import { NavItem, HomeIcon, GroupIcon, WalletIcon, LoanIcon, CreditIcon, HelpIcon, UsersIcon, ProfileIcon, DashboardLayout } from '@/components/DashboardLayout';
import { agentNavigation } from '@/constant/navItem';
// Mock agent data
const mockAgentData = {
  name: 'Fatima Ibrahim',
};

// Mock loans data
const mockLoans = [
  {
    id: 'LN-001',
    applicant: 'Tunde Bakare',
    group: 'Business Investment Club',
    amount: 100000,
    purpose: 'Business expansion',
    duration: 6,
    status: 'active',
    applicationDate: '2025-04-20',
    disbursementDate: '2025-04-25',
    dueDate: '2025-10-25',
    amountRepaid: 22000,
    creditScore: 780
  },
  {
    id: 'LN-002',
    applicant: 'Ngozi Okonkwo',
    group: 'Market Women Savings',
    amount: 50000,
    purpose: 'Inventory purchase',
    duration: 3,
    status: 'active',
    applicationDate: '2025-04-10',
    disbursementDate: '2025-04-15',
    dueDate: '2025-07-15',
    amountRepaid: 18000,
    creditScore: 740
  },
  {
    id: 'LN-004',
    applicant: 'Blessing Adebayo',
    group: 'Market Women Savings',
    amount: 30000,
    purpose: 'Medical expenses',
    duration: 3,
    status: 'pending',
    applicationDate: '2025-04-27',
    creditScore: 720
  },
  {
    id: 'LN-005',
    applicant: 'Emmanuel Osei',
    group: 'Teachers Saving Circle',
    amount: 60000,
    purpose: 'School fees',
    duration: 5,
    status: 'pending',
    applicationDate: '2025-04-26',
    creditScore: 690
  }
];

// Types for user history
interface UserHistory {
  creditScore: number;
  totalContributions: number;
  monthsActive: number;
  completedLoans: number;
  activeLoans: number;
}

interface UserHistoryMap {
  [key: string]: UserHistory;
}

// Mock user contribution history
const mockUserHistory: UserHistoryMap = {
  'Tunde Bakare': {
    creditScore: 780,
    totalContributions: 250000,
    monthsActive: 12,
    completedLoans: 2,
    activeLoans: 1
  },
  'Ngozi Okonkwo': {
    creditScore: 740,
    totalContributions: 180000,
    monthsActive: 8,
    completedLoans: 1,
    activeLoans: 1
  },
  'Blessing Adebayo': {
    creditScore: 720,
    totalContributions: 120000,
    monthsActive: 6,
    completedLoans: 0,
    activeLoans: 0
  },
  'Emmanuel Osei': {
    creditScore: 690,
    totalContributions: 90000,
    monthsActive: 4,
    completedLoans: 0,
    activeLoans: 0
  }
};

export default function AgentLoans() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [showNewLoanModal, setShowNewLoanModal] = useState(false);
  
  // Form state for new loan
  const [newLoanUser, setNewLoanUser] = useState('');
  const [newLoanGroup, setNewLoanGroup] = useState('');
  const [newLoanAmount, setNewLoanAmount] = useState('');
  const [newLoanPurpose, setNewLoanPurpose] = useState('');
  const [newLoanDuration, setNewLoanDuration] = useState('3');
  
  const [selectedUserHistory, setSelectedUserHistory] = useState<UserHistory | null>(null);
  const [loanType, setLoanType] = useState('group');
  const [maxLoanAmount, setMaxLoanAmount] = useState(0);
  
  // Filter loans
  const filteredLoans = mockLoans.filter(loan => {
    const matchesSearch = 
      loan.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      loan.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || loan.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  // Sort loans
  const sortedLoans = [...filteredLoans].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime();
    }
    if (sortBy === 'amount') return b.amount - a.amount;
    if (sortBy === 'creditScore') return b.creditScore - a.creditScore;
    return 0;
  });
  
  // Helper functions
  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-900/50';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900/50';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-900/50';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border border-gray-200 dark:border-gray-900/50';
    }
  };
  
  const handleNewLoanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newLoanUser || !newLoanGroup || !newLoanAmount || !newLoanPurpose || !newLoanDuration) {
      alert('Please fill all fields');
      return;
    }
    
    alert(`New loan application submitted for ${newLoanUser} (${newLoanGroup}) for ${formatCurrency(Number(newLoanAmount))}`);
    
    // Reset form
    setNewLoanUser('');
    setNewLoanGroup('');
    setNewLoanAmount('');
    setNewLoanPurpose('');
    setNewLoanDuration('3');
    setShowNewLoanModal(false);
  };
  
  // Update user selection handler
  const handleUserSelect = (userName: string) => {
    setNewLoanUser(userName);
    const userHistory = mockUserHistory[userName];
    setSelectedUserHistory(userHistory);
    
    // Calculate max loan amount based on credit score and contribution history
    const baseAmount = userHistory.totalContributions * 1.5;
    const creditScoreMultiplier = userHistory.creditScore >= 750 ? 2 : 
                                 userHistory.creditScore >= 700 ? 1.5 : 1;
    setMaxLoanAmount(baseAmount * creditScoreMultiplier);
  };
  
  return (
    <DashboardLayout 
      navigation={agentNavigation}
      userType="agent"
      userName={mockAgentData.name}
      pageTitle="Loan Management"
    >
      <div className="min-h-screen  dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Active Loans Card */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 border border-green-200 dark:border-green-900/50 rounded-[30px] p-6 shadow-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Active Loans</p>
                  <p className="text-2xl font-semibold text-green-900 dark:text-green-300">{mockLoans.filter(loan => loan.status === 'active').length}</p>
                </div>
              </div>
            </div>

            {/* Pending Loans Card */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-900/10 border border-yellow-200 dark:border-yellow-900/50 rounded-[30px] p-6 shadow-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                  <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Pending Loans</p>
                  <p className="text-2xl font-semibold text-yellow-900 dark:text-yellow-300">{mockLoans.filter(loan => loan.status === 'pending').length}</p>
                </div>
              </div>
            </div>

            {/* Total Amount Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 border border-blue-200 dark:border-blue-900/50 rounded-[30px] p-6 shadow-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Amount</p>
                  <p className="text-2xl font-semibold text-blue-900 dark:text-blue-300">{formatCurrency(mockLoans.reduce((sum, loan) => sum + loan.amount, 0))}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Header Card */}
          <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-[30px] overflow-hidden transition-colors duration-200">
        <div className="px-4 py-5 sm:px-6 flex flex-wrap justify-between items-center">
          <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Loans</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              Manage loan applications for your group members
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={() => setShowNewLoanModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Apply for New Loan
            </button>
          </div>
        </div>
        
        {/* Filters and Search */}
            <div className="px-4 py-5 sm:px-6 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
            <div className="w-full md:w-1/3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                      className="focus:ring-red-500 focus:border-red-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md p-1 border"
                  placeholder="Search loans"
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                    className="block pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                    className="block pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
              >
                <option value="date">Recent First</option>
                <option value="amount">Amount (High to Low)</option>
                <option value="creditScore">Credit Score</option>
              </select>
                </div>
            </div>
          </div>
        </div>
        
          {/* Loans Table Card */}
          <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-[30px] overflow-hidden transition-colors duration-200">
        <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Loan Details
                </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Applicant
                </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount & Duration
                </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {sortedLoans.length > 0 ? (
                sortedLoans.map((loan) => (
                      <tr key={loan.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                    <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{loan.id}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Purpose: {loan.purpose}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Applied: {formatDate(loan.applicationDate)}</div>
                      {loan.disbursementDate && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">Disbursed: {formatDate(loan.disbursementDate)}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{loan.applicant}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Group: {loan.group}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Credit Score: {loan.creditScore}</div>
                    </td>
                    <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{formatCurrency(loan.amount)}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{loan.duration} months</div>
                      {loan.dueDate && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">Due: {formatDate(loan.dueDate)}</div>
                      )}
                      {loan.amountRepaid !== undefined && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                          Repaid: {formatCurrency(loan.amountRepaid)} / {formatCurrency(loan.amount)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(loan.status)}`}>
                        {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => alert(`View details for loan ${loan.id}`)}
                            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                      >
                        View Details
                      </button>
                      
                      {loan.status === 'pending' && (
                        <div className="mt-1">
                          <button
                            onClick={() => alert(`Edit loan ${loan.id}`)}
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                      
                      {loan.status === 'active' && (
                        <div className="mt-1">
                          <button
                            onClick={() => alert(`Record payment for loan ${loan.id}`)}
                                className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                          >
                            Record Payment
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    No loans found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-700 sm:px-6">
          <div className="flex justify-between items-center">
                <div className="text-sm text-gray-700 dark:text-gray-400">
              Showing <span className="font-medium">{sortedLoans.length}</span> loans
            </div>
            <div className="flex-1 flex justify-end">
              <div className="relative z-0 inline-flex shadow-sm rounded-md">
                    <button className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600">
                  Previous
                </button>
                    <button className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600">
                  Next
                </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* New Loan Modal */}
      {showNewLoanModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-[30px] text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <form onSubmit={handleNewLoanSubmit}>
                <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                        Apply for New Loan
                      </h3>

                      {/* User Selection and Credit Info */}
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="user" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Select User
                          </label>
                          <select
                            id="user"
                            required
                            value={newLoanUser}
                            onChange={(e) => handleUserSelect(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                          >
                            <option value="">Select User</option>
                            {Object.keys(mockUserHistory).map(user => (
                              <option key={user} value={user}>{user}</option>
                            ))}
                          </select>
                        </div>
                        
                        {/* Credit Score and History Card */}
                        {selectedUserHistory && (
                          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500 dark:text-gray-400">Credit Score</span>
                              <span className={`text-lg font-semibold ${
                                selectedUserHistory.creditScore >= 750 ? 'text-green-600 dark:text-green-400' :
                                selectedUserHistory.creditScore >= 700 ? 'text-yellow-600 dark:text-yellow-400' :
                                'text-red-600 dark:text-red-400'
                              }`}>{selectedUserHistory.creditScore}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500 dark:text-gray-400">Total Contributions</span>
                              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {formatCurrency(selectedUserHistory.totalContributions)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500 dark:text-gray-400">Months Active</span>
                              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {selectedUserHistory.monthsActive} months
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500 dark:text-gray-400">Loan History</span>
                              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {selectedUserHistory.completedLoans} completed, {selectedUserHistory.activeLoans} active
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500 dark:text-gray-400">Maximum Eligible Amount</span>
                              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                {formatCurrency(maxLoanAmount)}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Loan Type Selection */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Loan Type
                          </label>
                          <div className="grid grid-cols-2 gap-4">
                            <button
                              type="button"
                              onClick={() => setLoanType('group')}
                              className={`px-4 py-3 rounded-lg text-sm font-medium ${
                                loanType === 'group'
                                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-2 border-red-500'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent'
                              }`}
                            >
                              Group Loan
                            </button>
                            <button
                              type="button"
                              onClick={() => setLoanType('personal')}
                              className={`px-4 py-3 rounded-lg text-sm font-medium ${
                                loanType === 'personal'
                                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-2 border-red-500'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent'
                              }`}
                            >
                              Personal Loan
                            </button>
                          </div>
                        </div>

                        {/* Group Selection (only for group loans) */}
                        {loanType === 'group' && (
                          <div>
                            <label htmlFor="group" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Select Group
                          </label>
                          <select
                            id="group"
                            required
                            value={newLoanGroup}
                            onChange={(e) => setNewLoanGroup(e.target.value)}
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                          >
                            <option value="">Select Group</option>
                            <option value="Market Women Savings">Market Women Savings</option>
                            <option value="Business Investment Club">Business Investment Club</option>
                            <option value="Teachers Saving Circle">Teachers Saving Circle</option>
                          </select>
                        </div>
                        )}
                        
                        {/* Amount Input */}
                        <div>
                          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Loan Amount (₦)
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            type="number"
                            id="amount"
                            required
                            value={newLoanAmount}
                            onChange={(e) => setNewLoanAmount(e.target.value)}
                              max={maxLoanAmount}
                              className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md p-2"
                            placeholder="Enter amount"
                            />
                            {maxLoanAmount > 0 && (
                              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Maximum amount: {formatCurrency(maxLoanAmount)}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Purpose Input */}
                        <div>
                          <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Loan Purpose
                          </label>
                          <textarea
                            id="purpose"
                            value={newLoanPurpose}
                            onChange={(e) => setNewLoanPurpose(e.target.value)}
                            rows={3}
                            className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md p-2"
                            placeholder="Enter purpose (optional)"
                          />
                        </div>
                        
                        {/* Duration Selection */}
                        <div>
                          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Duration (months)
                          </label>
                          <select
                            id="duration"
                            required
                            value={newLoanDuration}
                            onChange={(e) => setNewLoanDuration(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                          >
                            <option value="1">1 month</option>
                            <option value="3">3 months</option>
                            <option value="6">6 months</option>
                            <option value="12">12 months</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!newLoanUser || (loanType === 'group' && !newLoanGroup) || !newLoanAmount || Number(newLoanAmount) > maxLoanAmount}
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewLoanModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
