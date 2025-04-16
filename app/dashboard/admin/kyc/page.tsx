'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout, NavItem, HomeIcon, GroupIcon, WalletIcon, LoanIcon, CreditIcon, HelpIcon, UsersIcon, AnalyticsIcon, KycIcon } from '@/components/DashboardLayout';
import { adminNavigation } from '@/constant/navItem';

// Mock data
const mockAdminData = {
  name: 'Admin',
};

// KYC Requests Data
const mockKycRequests = [
  {
    id: 1,
    name: 'James Adebayo',
    email: 'james@example.com',
    phone: '+234 805 1234 567',
    type: 'agent',
    submittedDate: '2025-04-10',
    status: 'pending',
    documents: [
      { id: 1, name: 'ID Card', type: 'National ID', verified: false },
      { id: 2, name: 'Proof of Address', type: 'Utility Bill', verified: false },
      { id: 3, name: 'Business Registration', type: 'CAC Certificate', verified: false },
      { id: 4, name: 'Bank Statement', type: 'First Bank', verified: false },
      { id: 5, name: 'Passport Photo', type: 'Photo', verified: false },
    ]
  },
  {
    id: 2,
    name: 'Mary Okonkwo',
    email: 'mary@example.com',
    phone: '+234 703 9876 543',
    type: 'user',
    submittedDate: '2025-04-11',
    status: 'pending',
    documents: [
      { id: 1, name: 'ID Card', type: 'Voters Card', verified: false },
    ]
  },
  {
    id: 3,
    name: 'Joseph Nnamdi',
    email: 'joseph@example.com',
    phone: '+234 908 5555 123',
    type: 'agent',
    submittedDate: '2025-04-09',
    status: 'pending',
    documents: [
      { id: 1, name: 'ID Card', type: 'International Passport', verified: false },
      { id: 2, name: 'Proof of Address', type: 'Utility Bill', verified: false },
      { id: 3, name: 'Business Registration', type: 'CAC Certificate', verified: false },
      { id: 4, name: 'Bank Statement', type: 'Zenith Bank', verified: false },
      { id: 5, name: 'Passport Photo', type: 'Photo', verified: false },
    ]
  },
  {
    id: 4,
    name: 'Elizabeth Adekunle',
    email: 'elizabeth@example.com',
    phone: '+234 802 3456 789',
    type: 'user',
    submittedDate: '2025-04-12',
    status: 'pending',
    documents: [
      { id: 1, name: 'ID Card', type: 'Drivers License', verified: false },
    ]
  },
  {
    id: 5,
    name: 'Ibrahim Suleiman',
    email: 'ibrahim@example.com',
    phone: '+234 704 9876 123',
    type: 'agent',
    submittedDate: '2025-04-08',
    status: 'verified',
    documents: [
      { id: 1, name: 'ID Card', type: 'National ID', verified: true },
      { id: 2, name: 'Proof of Address', type: 'Utility Bill', verified: true },
      { id: 3, name: 'Business Registration', type: 'CAC Certificate', verified: true },
      { id: 4, name: 'Bank Statement', type: 'GTBank', verified: true },
      { id: 5, name: 'Passport Photo', type: 'Photo', verified: true },
    ]
  },
  {
    id: 6,
    name: 'Aisha Mohammed',
    email: 'aisha@example.com',
    phone: '+234 803 8765 432',
    type: 'user',
    submittedDate: '2025-04-07',
    status: 'verified',
    documents: [
      { id: 1, name: 'ID Card', type: 'International Passport', verified: true },
    ]
  },
  {
    id: 7,
    name: 'Olusegun Williams',
    email: 'olusegun@example.com',
    phone: '+234 809 2345 678',
    type: 'agent',
    submittedDate: '2025-04-05',
    status: 'rejected',
    rejectReason: 'Documents appear to be fraudulent',
    documents: [
      { id: 1, name: 'ID Card', type: 'National ID', verified: false },
      { id: 2, name: 'Proof of Address', type: 'Utility Bill', verified: false },
      { id: 3, name: 'Business Registration', type: 'CAC Certificate', verified: false },
      { id: 4, name: 'Bank Statement', type: 'UBA', verified: false },
      { id: 5, name: 'Passport Photo', type: 'Photo', verified: false },
    ]
  }
];

export default function AdminKyc() {
  const [activeTab, setActiveTab] = useState('pending');  // 'pending', 'verified', 'rejected', 'all'
  const [filterType, setFilterType] = useState('all');  // 'all', 'user', 'agent'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectingId, setRejectingId] = useState<number | null>(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<{id: number, name: string, type: string} | null>(null);
  
  // Filter KYC requests
  const filteredRequests = mockKycRequests.filter(request => {
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'pending' && request.status === 'pending') ||
      (activeTab === 'verified' && request.status === 'verified') ||
      (activeTab === 'rejected' && request.status === 'rejected');
    
    const matchesType = 
      filterType === 'all' || 
      request.type === filterType;
    
    const matchesSearch = 
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.phone.includes(searchTerm);
    
    return matchesTab && matchesType && matchesSearch;
  });
  
  // Format date string to local date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const handleShowRejectModal = (id: number) => {
    setRejectingId(id);
    setRejectReason('');
    setShowRejectModal(true);
  };
  
  const handleApproveKyc = (id: number) => {
    // This would be an API call in a real implementation
    alert(`Approving KYC request for ID: ${id}`);
  };
  
  const handleRejectKyc = () => {
    if (!rejectingId) return;
    
    // Validate reason
    if (!rejectReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }
    
    // This would be an API call in a real implementation
    alert(`Rejecting KYC request for ID: ${rejectingId} with reason: ${rejectReason}`);
    
    // Close modal and reset state
    setShowRejectModal(false);
    setRejectingId(null);
    setRejectReason('');
  };
  
  const handleViewDocument = (doc: {id: number, name: string, type: string}) => {
    setSelectedDocument(doc);
    setShowDocumentModal(true);
  };

  return (
    <DashboardLayout 
      navigation={adminNavigation}
      userType="admin"
      userName={mockAdminData.name}
      pageTitle="KYC Approvals"
    >
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            KYC Verification Requests
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage and verify user and agent identity documents
          </p>
        </div>
        
        {/* Filters and Search */}
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
            <div className="flex space-x-1">
              <button
                className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                  activeTab === 'pending' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('pending')}
              >
                Pending
              </button>
              <button
                className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                  activeTab === 'verified' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('verified')}
              >
                Verified
              </button>
              <button
                className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                  activeTab === 'rejected' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('rejected')}
              >
                Rejected
              </button>
              <button
                className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                  activeTab === 'all' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('all')}
              >
                All
              </button>
            </div>
            
            <div className="flex flex-warp items-center space-x-2">
              <div>
                <select
                  id="filter-type"
                  name="filter-type"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="mt-1 block pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 rounded-md p-1"
                >
                  <option value="all">All Types</option>
                  <option value="user">Users Only</option>
                  <option value="agent">Agents Only</option>
                </select>
              </div>
              
              <div className="w-full md:w-64">
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
                    placeholder="Search by name, email, or phone"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* KYC Requests List */}
        <div className="overflow-hidden">
          {filteredRequests.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <li key={request.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-semibold">
                          {request.name.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{request.name}</div>
                        <div className="text-sm text-gray-500">{request.email}</div>
                        <div className="text-sm text-gray-500">{request.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-2 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusBadgeClass(request.status)}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                      <span className="ml-2 px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-gray-100 text-gray-800">
                        {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">
                        Submitted: {formatDate(request.submittedDate)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button
                      onClick={() => setSelectedRequest(selectedRequest === request.id ? null : request.id)}
                      className="text-sm text-red-600 hover:text-red-800 focus:outline-none flex items-center"
                    >
                      {selectedRequest === request.id ? 'Hide' : 'Show'} Documents ({request.documents.length})
                      <svg
                        className={`ml-1 h-4 w-4 transform ${selectedRequest === request.id ? 'rotate-180' : ''}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  
                  {selectedRequest === request.id && (
                    <div className="mt-2">
                      <div className="bg-gray-50 rounded-md p-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Submitted Documents</h4>
                        <ul className="space-y-2">
                          {request.documents.map((doc) => (
                            <li key={doc.id} className="flex justify-between items-center bg-white p-2 rounded shadow-sm">
                              <div>
                                <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                                <span className="ml-2 text-xs text-gray-500">({doc.type})</span>
                              </div>
                              <button
                                onClick={() => handleViewDocument(doc)}
                                className="text-xs text-red-600 hover:text-red-800"
                              >
                                View Document
                              </button>
                            </li>
                          ))}
                        </ul>
                        
                        {request.status === 'pending' && (
                          <div className="mt-4 flex justify-end space-x-3">
                            <button
                              onClick={() => handleShowRejectModal(request.id)}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => handleApproveKyc(request.id)}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              Approve
                            </button>
                          </div>
                        )}
                        
                        {request.status === 'rejected' && request.rejectReason && (
                          <div className="mt-3 text-sm text-red-600 bg-red-50 p-2 rounded">
                            <span className="font-medium">Reason for rejection:</span> {request.rejectReason}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-10 sm:px-6 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />z
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No KYC requests found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {activeTab === 'all'
                  ? "There are no KYC requests at the moment."
                  : `There are no ${activeTab} KYC requests.`}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Reject KYC Modal */}
      {showRejectModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Reject KYC Request
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Please provide a reason for rejecting this KYC request. This will be shown to the user.
                      </p>
                    </div>
                    <div className="mt-4">
                      <textarea
                        id="reject-reason"
                        name="reject-reason"
                        rows={4}
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter reason for rejection"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleRejectKyc}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => setShowRejectModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Document Viewer Modal */}
      {showDocumentModal && selectedDocument && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {selectedDocument.name} ({selectedDocument.type})
                      </h3>
                      <button
                        type="button"
                        onClick={() => setShowDocumentModal(false)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="bg-gray-200 rounded-md flex items-center justify-center h-64">
                      {/* In a real app, this would display the actual document image */}
                      <div className="text-center p-4">
                        <svg className="mx-auto h-16 w-16 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-600">
                          Document preview would be displayed here
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowDocumentModal(false)}
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

