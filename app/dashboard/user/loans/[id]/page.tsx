'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout, NavItem, HomeIcon, GroupIcon, WalletIcon, LoanIcon, CreditIcon, HelpIcon, ProfileIcon } from '@/components/DashboardLayout';
import { userNavigation } from '@/constant/navItem';

// Mock data - same as in the loans page
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
    description: 'Loan for expanding my small retail business, purchasing inventory and renovating the shop.',
    approvedBy: 'Olabisi Adeyemi',
    documents: ['Business Plan', 'Financial Statements', 'Inventory List'],
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
    description: 'Loan for completing my professional certification in financial management.',
    approvedBy: 'Olabisi Adeyemi',
    documents: ['Admission Letter', 'Course Outline', 'Fee Structure'],
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
    description: 'Loan for covering medical expenses for a family emergency.',
    documents: ['Medical Report', 'Hospital Bill Estimate'],
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

export default function LoanDetail() {
  const params = useParams();
  const router = useRouter();
  const [loan, setLoan] = useState<any>(null);
  const [loanRepayments, setLoanRepayments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'repayments', 'documents'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const loanId = Number(params.id);
    const foundLoan = mockLoans.find(l => l.id === loanId);
    
    if (foundLoan) {
      setLoan(foundLoan);
      const repayments = mockRepaymentHistory.filter(r => r.loanId === loanId);
      setLoanRepayments(repayments);
    }
    
    setLoading(false);
  }, [params.id]);

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

  if (loading) {
    return (
      <DashboardLayout 
        navigation={userNavigation}
        userType="user"
        userName={mockUserData.name}
        pageTitle="Loan Details"
      >
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 dark:border-red-400"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!loan) {
    return (
      <DashboardLayout 
        navigation={userNavigation}
        userType="user"
        userName={mockUserData.name}
        pageTitle="Loan Details"
      >
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-[30px] mb-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Loan Not Found</h3>
            </div>
            <Link
              href="/dashboard/user/loans"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-[30px] shadow-sm text-white bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-colors duration-200"
            >
              Back to Loans
            </Link>
          </div>
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
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Loan not found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              The loan you are looking for does not exist or you do not have access to it.
            </p>
            <div className="mt-6">
              <Link
                href="/dashboard/user/loans"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-[30px] text-white bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-colors duration-200"
              >
                Go Back to Loans
              </Link>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout 
      navigation={userNavigation}
      userType="user"
      userName={mockUserData.name}
      pageTitle={`Loan - ${loan.purpose}`}
    >
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-[30px] mb-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Loan Details</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              {loan.purpose} - ₦{loan.amount.toLocaleString()}
            </p>
          </div>
          <div className="flex space-x-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(loan.status)}`}>
              {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
            </span>
            <Link
              href="/dashboard/user/loans"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-[30px] text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-colors duration-200"
            >
              Back to Loans
            </Link>
          </div>
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
              Overview
            </button>
            <button
              className={`text-sm font-medium py-3 px-6 rounded-md mr-2 ${
                activeTab === 'repayments' 
                  ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm dark:shadow-gray-900/30' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
              } whitespace-nowrap transition-all duration-150`}
              onClick={() => setActiveTab('repayments')}
            >
              Repayment History
            </button>
            <button
              className={`text-sm font-medium py-3 px-6 rounded-md ${
                activeTab === 'documents' 
                  ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm dark:shadow-gray-900/30' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
              } whitespace-nowrap transition-all duration-150`}
              onClick={() => setActiveTab('documents')}
            >
              Documents
            </button>
          </nav>
        </div>
        
        {/* Overview Tab Content */}
        {activeTab === 'overview' && (
          <div className="p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-6">
              <div className="bg-white dark:bg-gray-800 p-5 rounded-[30px] shadow-sm dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Loan Amount</dt>
                <dd className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">₦{loan.amount.toLocaleString()}</dd>
              </div>
              <div className="bg-white dark:bg-gray-800 p-5 rounded-[30px] shadow-sm dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Interest Rate</dt>
                <dd className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{loan.interestRate}%</dd>
              </div>
              <div className="bg-white dark:bg-gray-800 p-5 rounded-[30px] shadow-sm dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Term</dt>
                <dd className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{loan.term} months</dd>
              </div>
              <div className="bg-white dark:bg-gray-800 p-5 rounded-[30px] shadow-sm dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Date Applied</dt>
                <dd className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{new Date(loan.dateApplied).toLocaleDateString()}</dd>
              </div>
              {loan.dateApproved && (
                <div className="bg-white dark:bg-gray-800 p-5 rounded-[30px] shadow-sm dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Date Approved</dt>
                  <dd className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{new Date(loan.dateApproved).toLocaleDateString()}</dd>
                </div>
              )}
              {loan.startDate && (
                <div className="bg-white dark:bg-gray-800 p-5 rounded-[30px] shadow-sm dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Start Date</dt>
                  <dd className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{new Date(loan.startDate).toLocaleDateString()}</dd>
                </div>
              )}
              {loan.endDate && (
                <div className="bg-white dark:bg-gray-800 p-5 rounded-[30px] shadow-sm dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">End Date</dt>
                  <dd className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{new Date(loan.endDate).toLocaleDateString()}</dd>
                </div>
              )}
            </div>
            
            {/* Loan Description */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-[30px] shadow-sm dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700 mb-6">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Purpose Description</h4>
              <p className="text-gray-700 dark:text-gray-300">{loan.description}</p>
            </div>
            
            {/* Loan Progress for active loans */}
            {loan.status === 'active' && (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-[30px] shadow-sm dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700 mb-6">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Repayment Progress</h4>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 dark:text-green-400 bg-green-200 dark:bg-green-900/20">
                        {Math.round(((loan.paidAmount ?? 0) / ((loan.paidAmount ?? 0) + (loan.remainingAmount ?? 0))) * 100)}% Repaid
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-green-600 dark:text-green-400">
                        ₦{(loan.paidAmount ?? 0).toLocaleString()} / ₦{((loan.paidAmount ?? 0) + (loan.remainingAmount ?? 0)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-green-200 dark:bg-green-900/20">
                    <div
                      style={{ width: `${((loan.paidAmount ?? 0) / ((loan.paidAmount ?? 0) + (loan.remainingAmount ?? 0))) * 100}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 dark:bg-green-600 rounded-full"
                    ></div>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-[30px]">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Payment</dt>
                    <dd className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">₦{loan?.repaymentAmount?.toLocaleString() || '0'}</dd>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-[30px]">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Next Payment Date</dt>
                    <dd className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {loan?.nextPaymentDate ? new Date(loan.nextPaymentDate).toLocaleDateString() : 'N/A'}
                    </dd>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-[30px]">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Remaining Payments</dt>
                    <dd className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{loan?.remainingPayments || 'N/A'}</dd>
                  </div>
                </div>
              </div>
            )}
            
            {/* Rejection Reason for rejected loans */}
            {loan.status === 'rejected' && (
              <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-[30px] shadow-sm dark:shadow-gray-900/20 border border-red-100 dark:border-red-900/30">
                <h4 className="text-lg font-medium text-red-800 dark:text-red-400 mb-2">Rejection Reason</h4>
                <p className="text-red-700 dark:text-red-300">{loan.rejectionReason}</p>
              </div>
            )}
          </div>
        )}
        
        {/* Repayments Tab Content */}
        {activeTab === 'repayments' && (
          <div className="p-6">
            {loanRepayments.length > 0 ? (
              <div className="overflow-hidden rounded-[30px] border border-gray-200 dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date
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
                    {loanRepayments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {new Date(payment.date).toLocaleDateString()}
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
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-4 py-5 sm:px-6 text-center text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-[30px]">
                No repayment history found for this loan.
              </div>
            )}
          </div>
        )}
        
        {/* Documents Tab Content */}
        {activeTab === 'documents' && (
          <div className="p-6">
            {loan.documents && loan.documents.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {loan.documents.map((doc: string, index: number) => (
                  <div 
                    key={index} 
                    className="bg-white dark:bg-gray-800 p-4 rounded-[30px] shadow-sm dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                        <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{doc}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PDF Document</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-4 py-5 sm:px-6 text-center text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-[30px]">
                No documents available for this loan.
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
