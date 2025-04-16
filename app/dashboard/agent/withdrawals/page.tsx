'use client';

import { useState } from 'react';
import { NavItem, HomeIcon, GroupIcon, WalletIcon, LoanIcon, CreditIcon, HelpIcon, UsersIcon, ProfileIcon } from '@/components/DashboardLayout';
import { DashboardLayout } from '@/components/DashboardLayout';
import { agentNavigation } from '@/constant/navItem';

// Mock agent data
const mockAgentData = {
  name: 'Fatima Ibrahim',
};

// Mock withdrawal requests data
const mockWithdrawalRequests = [
  {
    id: 'WDR-001',
    user: 'Chioma Okafor',
    group: 'Market Women Savings',
    amount: 24000,
    status: 'pending',
    requestDate: '2025-04-11T14:30:00',
    reason: 'School fees payment',
    accountDetails: {
      bank: 'First Bank',
      accountNumber: '3021568974',
      accountName: 'Chioma Okafor'
    }
  },
  {
    id: 'WDR-002',
    user: 'Blessing Adebayo',
    group: 'Market Women Savings',
    amount: 35000,
    status: 'pending',
    requestDate: '2025-04-12T09:15:00',
    reason: 'Medical expenses',
    accountDetails: {
      bank: 'GTBank',
      accountNumber: '0234567891',
      accountName: 'Blessing Adebayo'
    }
  },
  {
    id: 'WDR-003',
    user: 'Ahmed Mohammed',
    group: 'Community Traders Union',
    amount: 18000,
    status: 'processed',
    requestDate: '2025-04-09T11:45:00',
    processedDate: '2025-04-10T13:30:00',
    reason: 'Inventory purchase',
    accountDetails: {
      bank: 'UBA',
      accountNumber: '1098765432',
      accountName: 'Ahmed Mohammed'
    }
  },
  {
    id: 'WDR-004',
    user: 'Emeka Obi',
    group: 'Transport Workers Alliance',
    amount: 45000,
    status: 'processed',
    requestDate: '2025-04-08T16:20:00',
    processedDate: '2025-04-09T10:15:00',
    reason: 'Vehicle repair',
    accountDetails: {
      bank: 'Access Bank',
      accountNumber: '0723456789',
      accountName: 'Emeka Obi'
    }
  },
  {
    id: 'WDR-005',
    user: 'Funke Williams',
    group: 'Teachers Saving Circle',
    amount: 50000,
    status: 'rejected',
    requestDate: '2025-04-10T08:45:00',
    rejectionReason: 'Insufficient savings in group account',
    reason: 'Home renovation',
    accountDetails: {
      bank: 'Zenith Bank',
      accountNumber: '2056789043',
      accountName: 'Funke Williams'
    }
  }
];

export default function AgentWithdrawals() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'pending', 'processed', 'rejected'
  const [sortBy, setSortBy] = useState('date'); // 'date', 'amount'
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  
  // Filter withdrawal requests
  const filteredRequests = mockWithdrawalRequests.filter(request => {
    // Search term match
    const matchesSearch = 
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      request.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.group.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status match
    const matchesStatus = 
      filterStatus === 'all' || request.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  // Sort withdrawal requests
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime();
    }
    if (sortBy === 'amount') {
      return b.amount - a.amount;
    }
    return 0;
  });
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };
  
  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Handle process withdrawal
  const handleProcessWithdrawal = () => {
    alert(`Withdrawal ${selectedRequest?.id} processed successfully!`);
    setShowProcessModal(false);
    setSelectedRequest(null);
  };
  
  // Handle reject withdrawal
  const handleRejectWithdrawal = () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }
    
    alert(`Withdrawal ${selectedRequest?.id} rejected with reason: ${rejectionReason}`);
    setShowRejectModal(false);
    setSelectedRequest(null);
    setRejectionReason('');
  };
  
  return (
    <DashboardLayout 
      navigation={agentNavigation}
      userType="agent"
      userName={mockAgentData.name}
      pageTitle="Withdrawal Requests"
    >
      <div className="space-y-6">
        {/* Page Header */}
            <div>
          {/* <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Withdrawal Requests</h1> */}
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Process withdrawal requests from your group members
              </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 rounded-[20px] p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">Pending Requests</p>
                <p className="text-2xl font-bold mt-1">
                  {sortedRequests.filter(r => r.status === 'pending').length}
                </p>
              </div>
              <div className="bg-white/20 rounded-full p-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 rounded-[20px] p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">Processed Today</p>
                <p className="text-2xl font-bold mt-1">
                  {sortedRequests.filter(r => 
                    r.status === 'processed' && 
                    r.processedDate && 
                    new Date(r.processedDate).toDateString() === new Date().toDateString()
                  ).length}
                </p>
              </div>
              <div className="bg-white/20 rounded-full p-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-[20px] p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">Total Amount Today</p>
                <p className="text-2xl font-bold mt-1">
                  {formatCurrency(sortedRequests.filter(r => new Date(r.requestDate).toDateString() === new Date().toDateString())
                    .reduce((sum, req) => sum + req.amount, 0))}
                </p>
              </div>
              <div className="bg-white/20 rounded-full p-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters Section */}
        <div className="bg-white dark:bg-gray-800 rounded-[20px] p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full rounded-[15px] border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-red-500 focus:border-red-500"
                placeholder="Search requests..."
                />
            </div>
            
                <select
                  id="filter-status"
                  name="filter-status"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-[15px] border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-red-500 focus:border-red-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="processed">Processed</option>
                  <option value="rejected">Rejected</option>
                </select>
              
                <select
                  id="sort"
                  name="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
              className="rounded-[15px] border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-red-500 focus:border-red-500"
                >
                  <option value="date">Sort by Date</option>
                  <option value="amount">Sort by Amount</option>
                </select>

            <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-[15px] text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              More Filters
            </button>
          </div>
        </div>
        
        {/* Withdrawal Requests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedRequests.length > 0 ? (
                sortedRequests.map((request) => (
              <div key={request.id} className="bg-white dark:bg-gray-800 rounded-[20px] shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-4">
                  {/* Header with ID and Status */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {request.id}
                    </div>
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      request.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400' :
                      request.status === 'processed' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' :
                      'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
                    }`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>

                  {/* Amount */}
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(request.amount)}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Requested: {formatDate(request.requestDate)}
                    </div>
                  </div>

                  {/* User and Group Info */}
                  <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-[15px]">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                          <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                            {request.user.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{request.user}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{request.group}</div>
                      </div>
                    </div>
                  </div>

                  {/* Bank Details */}
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Bank Details</h4>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-[15px] text-sm">
                      <div className="font-medium text-gray-900 dark:text-white">{request.accountDetails.bank}</div>
                      <div className="text-gray-500 dark:text-gray-400">{request.accountDetails.accountNumber}</div>
                      <div className="text-gray-500 dark:text-gray-400">{request.accountDetails.accountName}</div>
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Reason</h4>
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      {request.reason}
                    </div>
                  </div>

                  {/* Status-specific information */}
                      {request.status === 'processed' && request.processedDate && (
                    <div className="mb-4 text-xs text-gray-500 dark:text-gray-400">
                          Processed: {formatDate(request.processedDate)}
                        </div>
                      )}
                      {request.status === 'rejected' && request.rejectionReason && (
                    <div className="mb-4 text-xs text-red-600 dark:text-red-400">
                          {request.rejectionReason}
                        </div>
                      )}

                  {/* Action Buttons */}
                  <div className="mt-4 flex flex-col space-y-2">
                    {request.status === 'pending' ? (
                      <>
                          <button
                            onClick={() => {
                              setSelectedRequest(request);
                              setShowProcessModal(true);
                            }}
                          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-[15px] text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                            Process
                          </button>
                          <button
                            onClick={() => {
                              setSelectedRequest(request);
                              setShowRejectModal(true);
                            }}
                          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-[15px] text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                            Reject
                          </button>
                      </>
                    ) : (
                        <button
                          onClick={() => {
                            setSelectedRequest(request);
                          }}
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-[15px] text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                          View Details
                        </button>
                      )}
                  </div>
                </div>
              </div>
                ))
              ) : (
            <div className="col-span-full text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4">
                <svg className="h-full w-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No withdrawal requests found</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">No withdrawal requests match your search criteria.</p>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing <span className="font-medium">{sortedRequests.length}</span> requests
            </div>
          <div className="flex space-x-2">
                <button
                  type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-[15px] text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Previous
                </button>
                <button
                  type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-[15px] text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Next
                </button>
          </div>
        </div>
      </div>
      
      {/* Process Withdrawal Modal */}
      {showProcessModal && selectedRequest && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-[30px] text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 sm:mx-0 sm:h-10 sm:w-10">
                    {WalletIcon("h-6 w-6 text-green-600 dark:text-green-400")}
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Process Withdrawal Request
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Are you sure you want to process this withdrawal request? Please verify all details before proceeding.
                      </p>
                      
                      <div className="mt-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-[20px]">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Request ID</p>
                            <p className="text-sm text-gray-900 dark:text-white">{selectedRequest.id}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Amount</p>
                            <p className="text-sm text-gray-900 dark:text-white">{formatCurrency(selectedRequest.amount)}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">User</p>
                            <p className="text-sm text-gray-900 dark:text-white">{selectedRequest.user}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Group</p>
                            <p className="text-sm text-gray-900 dark:text-white">{selectedRequest.group}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Bank Details</p>
                            <p className="text-sm text-gray-900 dark:text-white">
                              {selectedRequest.accountDetails.bank} - {selectedRequest.accountDetails.accountNumber} - {selectedRequest.accountDetails.accountName}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleProcessWithdrawal}
                  className="w-full inline-flex justify-center rounded-[15px] border border-transparent shadow-sm px-4 py-2 bg-green-600 dark:bg-green-500 text-base font-medium text-white hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Process Withdrawal
                </button>
                <button
                  type="button"
                  onClick={() => setShowProcessModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-[15px] border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Reject Withdrawal Modal */}
      {showRejectModal && selectedRequest && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-[30px] text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Reject Withdrawal Request
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Please provide a reason for rejecting this withdrawal request.
                      </p>
                      
                      <div className="mt-4">
                        <label htmlFor="rejection-reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Rejection Reason
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="rejection-reason"
                            name="rejection-reason"
                            rows={3}
                            className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-[15px]"
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            placeholder="Enter the reason for rejection"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleRejectWithdrawal}
                  className="w-full inline-flex justify-center rounded-[15px] border border-transparent shadow-sm px-4 py-2 bg-red-600 dark:bg-red-500 text-base font-medium text-white hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Reject Withdrawal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectionReason('');
                  }}
                  className="mt-3 w-full inline-flex justify-center rounded-[15px] border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
