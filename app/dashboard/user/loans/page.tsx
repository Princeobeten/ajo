'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout, NavItem, HomeIcon, GroupIcon, WalletIcon, LoanIcon, CreditIcon, HelpIcon, ProfileIcon } from '@/components/DashboardLayout';
import { userNavigation } from '@/constant/navItem';

// Mock data
const mockUserData = {
  name: 'Amina Johnson',
  creditScore: 720,
  maxLoanAmount: 75000,
};

const mockLoans = [
  {
    id: 1,
    amount: 50000,
    purpose: 'Business Expansion',
    interestRate: 5.5,
    term: 6,
    status: 'active',
    dateApplied: '2025-01-15',
    dateApproved: '2025-01-17',
    startDate: '2025-01-20',
    endDate: '2025-07-20',
    repaymentAmount: 8750,
    nextPaymentDate: '2025-05-20',
    remainingPayments: 3,
    paidAmount: 26250,
    remainingAmount: 26250,
  },
  {
    id: 2,
    amount: 25000,
    purpose: 'Education',
    interestRate: 6.0,
    term: 3,
    status: 'completed',
    dateApplied: '2024-09-10',
    dateApproved: '2024-09-12',
    startDate: '2024-09-15',
    endDate: '2024-12-15',
    repaymentAmount: 8500,
    paidAmount: 25500,
    remainingAmount: 0,
  },
  {
    id: 3,
    amount: 10000,
    purpose: 'Medical Emergency',
    interestRate: 4.5,
    term: 2,
    status: 'rejected',
    dateApplied: '2024-06-05',
    rejectionReason: 'Insufficient credit score at the time of application',
  }
];

const mockRepaymentHistory = [
  {
    id: 1,
    loanId: 1,
    amount: 8750,
    date: '2025-02-20',
    status: 'completed',
  },
  {
    id: 2,
    loanId: 1,
    amount: 8750,
    date: '2025-03-20',
    status: 'completed',
  },
  {
    id: 3,
    loanId: 1,
    amount: 8750,
    date: '2025-04-20',
    status: 'completed',
  },
  {
    id: 4,
    loanId: 2,
    amount: 8500,
    date: '2024-10-15',
    status: 'completed',
  },
  {
    id: 5,
    loanId: 2,
    amount: 8500,
    date: '2024-11-15',
    status: 'completed',
  },
  {
    id: 6,
    loanId: 2,
    amount: 8500,
    date: '2024-12-15',
    status: 'completed',
  },
];

export default function UserLoans() {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [loanAmount, setLoanAmount] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [loanTerm, setLoanTerm] = useState('6');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'history', 'repayments'
  const [selectedLoanId, setSelectedLoanId] = useState<number | null>(null);
  
  const activeLoan = mockLoans.find(loan => loan.status === 'active');
  
  const filteredRepaymentHistory = mockRepaymentHistory.filter(
    payment => selectedLoanId === null || payment.loanId === selectedLoanId
  );

  const handleApplyForLoan = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This would be replaced with actual API call
    console.log('Applying for loan:', {
      amount: loanAmount,
      purpose: loanPurpose,
      term: loanTerm
    });
    
    // Show success message and close modal
    alert(`Loan application for ₦${loanAmount} has been submitted successfully.`);
    setLoanAmount('');
    setLoanPurpose('');
    setLoanTerm('6');
    setShowApplyModal(false);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <DashboardLayout 
      navigation={userNavigation}
      userType="user"
      userName={mockUserData.name}
      pageTitle="Loans"
    >
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-[30px] overflow-hidden">
            <div className="px-4 py-5 sm:px-6 flex flex-wrap gap-2 justify-between items-center border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Your Loan Overview</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                  View your current loans and apply for new ones based on your credit score.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowApplyModal(true)}
                disabled={!!activeLoan}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-[30px] shadow-sm text-white bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-colors duration-200 ${
                  activeLoan ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Apply for Loan
              </button>
            </div>
            
            {/* Tabs Navigation */}
            <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 transition-colors duration-200">
              <nav className="flex overflow-x-auto py-2 px-4">
                <button
                  className={`text-sm font-medium py-3 px-6 rounded-md mr-2 ${
                    activeTab === 'overview' 
                      ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm dark:shadow-gray-900/30' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                  } whitespace-nowrap transition-all duration-150`}
                  onClick={() => setActiveTab('overview')}
                >
                  Loan Overview
                </button>
                <button
                  className={`text-sm font-medium py-3 px-6 rounded-md mr-2 ${
                    activeTab === 'history' 
                      ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm dark:shadow-gray-900/30' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                  } whitespace-nowrap transition-all duration-150`}
                  onClick={() => setActiveTab('history')}
                >
                  Loan History
                </button>
                <button
                  className={`text-sm font-medium py-3 px-6 rounded-md ${
                    activeTab === 'repayments' 
                      ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm dark:shadow-gray-900/30' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                  } whitespace-nowrap transition-all duration-150`}
                  onClick={() => setActiveTab('repayments')}
                >
                  Repayment History
                </button>
              </nav>
            </div>
            
            {/* Content Area */}
            <div className="bg-gray-50 dark:bg-gray-800/50">
              {/* Overview Tab Content */}
              {activeTab === 'overview' && (
                <>
                  {activeLoan ? (
                    <div className="p-6">
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-white dark:bg-gray-800 p-5 rounded-[30px] shadow-sm dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Loan Amount</dt>
                          <dd className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">₦{activeLoan.amount.toLocaleString()}</dd>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-5 rounded-[30px] shadow-sm dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Purpose</dt>
                          <dd className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{activeLoan.purpose}</dd>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-5 rounded-[30px] shadow-sm dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Interest Rate</dt>
                          <dd className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{activeLoan.interestRate}%</dd>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-5 rounded-[30px] shadow-sm dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Term</dt>
                          <dd className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{activeLoan.term} months</dd>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-5 rounded-[30px] shadow-sm dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Start Date</dt>
                          <dd className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{activeLoan.startDate ? new Date(activeLoan.startDate).toLocaleDateString() : 'Not set'}</dd>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-5 rounded-[30px] shadow-sm dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700">
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">End Date</dt>
                          <dd className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{activeLoan.endDate ? new Date(activeLoan.endDate).toLocaleDateString() : 'Not set'}</dd>
                        </div>
                      </div>
                      
                      <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-[30px] shadow-sm dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Repayment Progress</h4>
                        <div className="relative pt-1">
                          <div className="flex mb-2 items-center justify-between">
                            <div>
                              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 dark:text-green-400 bg-green-200 dark:bg-green-900/20">
                                {Math.round(((activeLoan.paidAmount ?? 0) / ((activeLoan.paidAmount ?? 0) + (activeLoan.remainingAmount ?? 0))) * 100)}% Repaid
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-semibold inline-block text-green-600 dark:text-green-400">
                                ₦{(activeLoan.paidAmount ?? 0).toLocaleString()} / ₦{((activeLoan.paidAmount ?? 0) + (activeLoan.remainingAmount ?? 0)).toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-green-200 dark:bg-green-900/20">
                            <div
                              style={{ width: `${((activeLoan.paidAmount ?? 0) / ((activeLoan.paidAmount ?? 0) + (activeLoan.remainingAmount ?? 0))) * 100}%` }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 dark:bg-green-600 rounded-full"
                            ></div>
                          </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                          <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-[30px]">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Payment</dt>
                            <dd className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">₦{activeLoan?.repaymentAmount?.toLocaleString() || '0'}</dd>
                          </div>
                          <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-[30px]">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Next Payment Date</dt>
                            <dd className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                              {activeLoan?.nextPaymentDate ? new Date(activeLoan.nextPaymentDate).toLocaleDateString() : 'N/A'}
                            </dd>
                          </div>
                          <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-[30px]">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Remaining Payments</dt>
                            <dd className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{activeLoan?.remainingPayments || 'N/A'}</dd>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="px-4 py-8 sm:px-6 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No active loans</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        You currently don't have any active loans. Apply for a loan to get started.
                      </p>
                      <div className="mt-6">
                        <button
                          type="button"
                          onClick={() => setShowApplyModal(true)}
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-[30px] text-white bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                        >
                          Apply for Loan
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
              
              {/* History Tab Content */}
              {activeTab === 'history' && (
                <div className="p-6">
                  {mockLoans.length > 0 ? (
                    <div className="overflow-hidden rounded-[20px] border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Date Applied
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Amount
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Purpose
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Term
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">Actions</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {mockLoans.map((loan) => (
                            <tr key={loan.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {new Date(loan.dateApplied).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                ₦{loan.amount.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {loan.purpose}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {loan.term} months
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(loan.status)}`}>
                                  {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Link
                                  href={`/dashboard/user/loans/${loan.id}`}
                                  className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 mr-4"
                                >
                                  View Details
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="px-4 py-5 sm:px-6 text-center text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700/50 rounded-[20px]">
                      No loan history found.
                    </div>
                  )}
                </div>
              )}
              
              {/* Repayments Tab Content */}
              {activeTab === 'repayments' && (
                <div className="p-6">
                  <div className="flex justify-end mb-4">
                    <select
                      id="filter-loan"
                      name="filter-loan"
                      value={selectedLoanId !== null ? selectedLoanId : ''}
                      onChange={(e) => setSelectedLoanId(e.target.value ? Number(e.target.value) : null)}
                      className="block pl-3 pr-10 py-2 text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-[20px] transition-colors duration-200"
                    >
                      <option value="">All Loans</option>
                      {mockLoans.map((loan) => (
                        <option key={loan.id} value={loan.id}>
                          {loan.purpose} - ₦{loan.amount.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {filteredRepaymentHistory.length > 0 ? (
                    <div className="overflow-hidden rounded-[20px] border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Loan
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Amount
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {filteredRepaymentHistory.map((payment) => {
                            const relatedLoan = mockLoans.find(loan => loan.id === payment.loanId);
                            return (
                              <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                  {new Date(payment.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                  {relatedLoan?.purpose || `Loan #${payment.loanId}`}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                  ₦{payment.amount.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    payment.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                  }`}>
                                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="px-4 py-5 sm:px-6 text-center text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700/50 rounded-[20px]">
                      No repayment history found.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Apply for Loan Modal */}
      {showApplyModal && (
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
                      Fill out the form below to apply for a loan based on your credit score.
                    </p>
                  </div>
                </div>
              </div>
              <form onSubmit={handleApplyForLoan} className="mt-5 sm:mt-6">
                <div className="mb-4">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Loan Amount (₦)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      required
                      min="5000"
                      max={mockUserData.maxLoanAmount}
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-[30px] p-3"
                      placeholder="Enter amount"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Maximum loan amount: ₦{mockUserData.maxLoanAmount.toLocaleString()} (based on your credit score)
                  </p>
                </div>

                <div className="mb-4">
                  <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Loan Purpose
                  </label>
                  <div className="mt-1">
                    <select
                      id="purpose"
                      name="purpose"
                      required
                      value={loanPurpose}
                      onChange={(e) => setLoanPurpose(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-[30px]"
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

                <div className="mb-4">
                  <label htmlFor="term" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Loan Term (Months)
                  </label>
                  <div className="mt-1">
                    <select
                      id="term"
                      name="term"
                      required
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-[30px]"
                    >
                      <option value="3">3 months</option>
                      <option value="6">6 months</option>
                      <option value="9">9 months</option>
                      <option value="12">12 months</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-[30px]">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Estimated Monthly Payment</h4>
                  <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                    {loanAmount && loanTerm
                      ? `₦${Math.round(
                          (Number(loanAmount) * (1 + 0.06 * (Number(loanTerm) / 12))) / Number(loanTerm)
                        ).toLocaleString()}`
                      : '₦0'}
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    This is an estimate based on a 6% annual interest rate. Actual rate may vary.
                  </p>
                </div>

                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    disabled={!loanAmount || !loanPurpose || Number(loanAmount) > mockUserData.maxLoanAmount}
                    className="w-full inline-flex justify-center rounded-[30px] border border-transparent shadow-sm px-4 py-2 bg-red-600 dark:bg-red-500 text-base font-medium text-white hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 dark:focus:ring-red-400 sm:col-start-2 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-[30px] border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 dark:focus:ring-red-400 sm:mt-0 sm:col-start-1 sm:text-sm transition-colors duration-200"
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
