'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout, NavItem, HomeIcon, GroupIcon, WalletIcon, LoanIcon, CreditIcon, HelpIcon, UsersIcon, AnalyticsIcon, KycIcon } from '@/components/DashboardLayout';
import { adminNavigation } from '@/constant/navItem';

// Mock admin data
const mockAdminData = {
  name: 'Admin',
};

// Mock loans data
const mockLoans = [
  {
    id: 'LN-001',
    applicant: 'Tunde Bakare',
    agent: 'James Adebayo',
    group: 'Business Investment Club',
    amount: 100000,
    purpose: 'Business expansion',
    duration: 6,
    interestRate: 5,
    status: 'active',
    disbursementDate: '2025-04-25',
    dueDate: '2025-10-25',
    amountRepaid: 22000,
    nextPaymentDate: '2025-05-25',
    creditScore: 780,
    collateral: 'None (Group-backed)',
    applicationDate: '2025-04-20'
  },
  {
    id: 'LN-002',
    applicant: 'Ngozi Okonkwo',
    agent: 'Fatima Ibrahim',
    group: 'Market Women Savings',
    amount: 50000,
    purpose: 'Inventory purchase',
    duration: 3,
    interestRate: 5,
    status: 'active',
    disbursementDate: '2025-04-15',
    dueDate: '2025-07-15',
    amountRepaid: 18000,
    nextPaymentDate: '2025-05-15',
    creditScore: 740,
    collateral: 'None (Group-backed)',
    applicationDate: '2025-04-10'
  },
  {
    id: 'LN-003',
    applicant: 'Michael Adeyemi',
    agent: 'Joseph Nnamdi',
    group: 'Community Traders Union',
    amount: 75000,
    purpose: 'Equipment purchase',
    duration: 4,
    interestRate: 5,
    status: 'active',
    disbursementDate: '2025-04-18',
    dueDate: '2025-08-18',
    amountRepaid: 20000,
    nextPaymentDate: '2025-05-18',
    creditScore: 760,
    collateral: 'None (Group-backed)',
    applicationDate: '2025-04-12'
  },
  {
    id: 'LN-004',
    applicant: 'Blessing Adebayo',
    agent: 'Fatima Ibrahim',
    group: 'Market Women Savings',
    amount: 30000,
    purpose: 'Medical expenses',
    duration: 3,
    interestRate: 5,
    status: 'pending',
    disbursementDate: '',
    dueDate: '',
    amountRepaid: 0,
    nextPaymentDate: '',
    creditScore: 720,
    collateral: 'None (Group-backed)',
    applicationDate: '2025-04-27'
  },
  {
    id: 'LN-005',
    applicant: 'Emmanuel Osei',
    agent: 'James Adebayo',
    group: 'Teachers Saving Circle',
    amount: 60000,
    purpose: 'School fees',
    duration: 5,
    interestRate: 5,
    status: 'pending',
    disbursementDate: '',
    dueDate: '',
    amountRepaid: 0,
    nextPaymentDate: '',
    creditScore: 690,
    collateral: 'None (Group-backed)',
    applicationDate: '2025-04-26'
  },
  {
    id: 'LN-006',
    applicant: 'Aminat Hassan',
    agent: 'Fatima Ibrahim',
    group: 'Tech Professionals',
    amount: 150000,
    purpose: 'Laptop purchase',
    duration: 8,
    interestRate: 5,
    status: 'active',
    disbursementDate: '2025-04-10',
    dueDate: '2025-12-10',
    amountRepaid: 19000,
    nextPaymentDate: '2025-05-10',
    creditScore: 810,
    collateral: 'None (Group-backed)',
    applicationDate: '2025-04-05'
  },
  {
    id: 'LN-007',
    applicant: 'Chioma Okafor',
    agent: 'Joseph Nnamdi',
    group: 'Healthcare Workers Fund',
    amount: 70000,
    purpose: 'Medical certification course',
    duration: 6,
    interestRate: 5,
    status: 'rejected',
    disbursementDate: '',
    dueDate: '',
    amountRepaid: 0,
    nextPaymentDate: '',
    creditScore: 650,
    collateral: 'None (Group-backed)',
    applicationDate: '2025-04-15',
    rejectionReason: 'Insufficient credit score and group contribution history'
  },
  {
    id: 'LN-008',
    applicant: 'Uche Nwachukwu',
    agent: 'Joseph Nnamdi',
    group: 'Community Traders Union',
    amount: 40000,
    purpose: 'Market stall renovation',
    duration: 3,
    interestRate: 5,
    status: 'completed',
    disbursementDate: '2025-01-15',
    dueDate: '2025-04-15',
    amountRepaid: 40000,
    nextPaymentDate: 'N/A',
    creditScore: 790,
    collateral: 'None (Group-backed)',
    applicationDate: '2025-01-10'
  }
];


export default function AdminLoans() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'pending', 'completed', 'rejected'
  const [filterAgent, setFilterAgent] = useState('all');
  const [sortBy, setSortBy] = useState('date'); // 'date', 'amount', 'duration', 'creditScore'
  
  // Extract unique agents for filter
  const agents = Array.from(new Set(mockLoans.map(loan => loan.agent)));
  
  // Filter loans based on search and filters
  const filteredLoans = mockLoans.filter(loan => {
    // Search term match
    const matchesSearch = 
      loan.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      loan.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.group.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status match
    const matchesStatus = 
      filterStatus === 'all' || loan.status === filterStatus;
    
    // Agent match
    const matchesAgent = 
      filterAgent === 'all' || loan.agent === filterAgent;
    
    return matchesSearch && matchesStatus && matchesAgent;
  });
  
  // Sort loans
  const sortedLoans = [...filteredLoans].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime();
    }
    if (sortBy === 'amount') return b.amount - a.amount;
    if (sortBy === 'duration') return b.duration - a.duration;
    if (sortBy === 'creditScore') return b.creditScore - a.creditScore;
    return 0;
  });
  
  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get credit score badge class
  const getCreditScoreBadgeClass = (score: number) => {
    if (score >= 800) return 'bg-green-100 text-green-800';
    if (score >= 750) return 'bg-green-50 text-green-700';
    if (score >= 700) return 'bg-yellow-100 text-yellow-800';
    if (score >= 650) return 'bg-yellow-50 text-yellow-700';
    return 'bg-red-100 text-red-800';
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString || dateString === 'N/A') return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };
  
  // Calculate repayment progress
  const calculateRepaymentProgress = (loan: any) => {
    if (loan.status !== 'active') return 0;
    return (loan.amountRepaid / loan.amount) * 100;
  };
  
  return (
    <DashboardLayout 
      navigation={adminNavigation}
      userType="admin"
      userName={mockAdminData.name}
      pageTitle="Loans Management"
    >
      {/* Export Buttons */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => alert('This would generate a CSV export of all loans')}
          className="inline-flex items-center mr-2 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Export CSV
        </button>
        <button
          onClick={() => alert('This would generate a PDF report of loan statistics')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Generate Report
        </button>
      </div>

{/* Loan Statistics */}
<div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                {LoanIcon("h-6 w-6 text-purple-600") }
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Active Loans
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {mockLoans.filter(loan => loan.status === 'active').length}
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
                {LoanIcon("h-6 w-6 text-yellow-600") }
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending Applications
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {mockLoans.filter(loan => loan.status === 'pending').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                {WalletIcon("h-6 w-6 text-red-600") }
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Loan Amount
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {formatCurrency(
                      mockLoans
                        .filter(loan => loan.status === 'active' || loan.status === 'completed')
                        .reduce((sum, loan) => sum + loan.amount, 0)
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
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                {WalletIcon("h-6 w-6 text-green-600") }
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Repaid
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {formatCurrency(
                      mockLoans.reduce((sum, loan) => sum + loan.amountRepaid, 0)
                    )}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      


      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex flex-wrap justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Loan Applications
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Manage all loan applications and repayments
            </p>
          </div>
        </div>
        
        {/* Filters and Search */}
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
            <div className="w-full md:w-1/3">
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
                  placeholder="Search by loan ID, applicant, or purpose"
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <div>
                <select
                  id="filter-status"
                  name="filter-status"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-black border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              
              <div>
                <select
                  id="filter-agent"
                  name="filter-agent"
                  value={filterAgent}
                  onChange={(e) => setFilterAgent(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-black border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Agents</option>
                  {agents.map((agent, index) => (
                    <option key={index} value={agent}>{agent}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <select
                  id="sort"
                  name="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-black border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                >
                  <option value="date">Sort by Date</option>
                  <option value="amount">Sort by Amount</option>
                  <option value="duration">Sort by Duration</option>
                  <option value="creditScore">Sort by Credit Score</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Loans List */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Loan Details
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Applicant
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount & Terms
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Repayment
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedLoans.length > 0 ? (
                sortedLoans.map((loan) => (
                  <tr key={loan.id}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{loan.id}</div>
                      <div className="text-sm text-gray-500">Purpose: {loan.purpose}</div>
                      <div className="text-sm text-gray-500">Applied: {formatDate(loan.applicationDate)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{loan.applicant}</div>
                      <div className="text-sm text-gray-500">Group: {loan.group}</div>
                      <div className="text-sm text-gray-500">Agent: {loan.agent}</div>
                      <div className="flex items-center mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${getCreditScoreBadgeClass(loan.creditScore)}`}>
                          Credit Score: {loan.creditScore}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(loan.amount)}</div>
                      <div className="text-sm text-gray-500">{loan.duration} months</div>
                      <div className="text-sm text-gray-500">{loan.interestRate}% interest</div>
                      {loan.disbursementDate && (
                        <div className="text-sm text-gray-500">Due: {formatDate(loan.dueDate)}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {loan.status === 'active' && (
                        <>
                          <div className="text-sm font-medium text-gray-900">
                            {formatCurrency(loan.amountRepaid)} / {formatCurrency(loan.amount)}
                          </div>
                          <div className="mt-1 relative pt-1">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                              <div 
                                style={{ width: `${calculateRepaymentProgress(loan)}%` }} 
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                              ></div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            Next payment: {formatDate(loan.nextPaymentDate)}
                          </div>
                        </>
                      )}
                      {loan.status === 'completed' && (
                        <div className="text-sm text-green-600 font-medium">
                          Fully Repaid
                        </div>
                      )}
                      {loan.status === 'pending' && (
                        <div className="text-sm text-yellow-600">
                          Awaiting Approval
                        </div>
                      )}
                      {loan.status === 'rejected' && (
                        <div className="text-sm text-red-600">
                          Not Disbursed
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(loan.status)}`}>
                        {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                      </span>
                      {loan.rejectionReason && (
                        <div className="text-xs text-red-600 mt-1">
                          {loan.rejectionReason}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col space-y-1">
                        <Link
                          href={`/dashboard/admin/loans/${loan.id}`}
                          className="text-red-600 hover:text-red-900"
                        >
                          View Details
                        </Link>
                        
                        {loan.status === 'pending' && (
                          <>
                            <button
                              onClick={() => alert(`This would approve loan ${loan.id}`)}
                              className="text-green-600 hover:text-green-900"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => alert(`This would reject loan ${loan.id}`)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        
                        {loan.status === 'active' && (
                          <Link
                            href={`/dashboard/admin/loans/${loan.id}/payments`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View Payments
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No loans found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{sortedLoans.length}</span> loans
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

