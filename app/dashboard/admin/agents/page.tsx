'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout, NavItem, HomeIcon, GroupIcon, WalletIcon, LoanIcon, CreditIcon, HelpIcon, UsersIcon, AnalyticsIcon, KycIcon } from '@/components/DashboardLayout';
import { adminNavigation } from '@/constant/navItem';

// Mock admin data
const mockAdminData = {
  name: 'Admin',
};

// Mock agents data
const mockAgents = [
  {
    id: 1,
    name: 'Fatima Ibrahim',
    email: 'fatima@example.com',
    phone: '+234 987 6543 210',
    groups: 3,
    users: 52,
    totalContributions: 825000,
    creditScore: 810,
    commissions: 82500,
    kycStatus: 'verified',
    joinedDate: '2024-09-01',
    status: 'active'
  },
  {
    id: 2,
    name: 'James Adebayo',
    email: 'james@example.com',
    phone: '+234 805 1234 567',
    groups: 2,
    users: 30,
    totalContributions: 550000,
    creditScore: 780,
    commissions: 55000,
    kycStatus: 'verified',
    joinedDate: '2024-10-10',
    status: 'active'
  },
  {
    id: 3,
    name: 'Joseph Nnamdi',
    email: 'joseph@example.com',
    phone: '+234 908 5555 123',
    groups: 1,
    users: 22,
    totalContributions: 880000,
    creditScore: 790,
    commissions: 88000,
    kycStatus: 'verified',
    joinedDate: '2024-11-05',
    status: 'active'
  },
  {
    id: 4,
    name: 'Caroline Osei',
    email: 'caroline@example.com',
    phone: '+234 706 7890 123',
    groups: 0,
    users: 0,
    totalContributions: 0,
    creditScore: 0,
    commissions: 0,
    kycStatus: 'pending',
    joinedDate: '2025-04-05',
    status: 'pending'
  },
  {
    id: 5,
    name: 'Ibrahim Suleiman',
    email: 'ibrahim@example.com',
    phone: '+234 704 9876 123',
    groups: 0,
    users: 0,
    totalContributions: 0,
    creditScore: 750,
    commissions: 0,
    kycStatus: 'verified',
    joinedDate: '2025-04-08',
    status: 'inactive'
  },
  {
    id: 6,
    name: 'Olusegun Williams',
    email: 'olusegun@example.com',
    phone: '+234 809 2345 678',
    groups: 0,
    users: 0,
    totalContributions: 0,
    creditScore: 0,
    commissions: 0,
    kycStatus: 'rejected',
    joinedDate: '2025-04-05',
    status: 'rejected'
  }
];

export default function AdminAgents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'pending', 'inactive', 'rejected'
  const [sortBy, setSortBy] = useState('name'); // 'name', 'users', 'groups', 'contributions', 'joined'
  const [showAddAgentModal, setShowAddAgentModal] = useState(false);
  
  // Form state for new agent
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentEmail, setNewAgentEmail] = useState('');
  const [newAgentPhone, setNewAgentPhone] = useState('');
  
  // Filter agents based on search and status
  const filteredAgents = mockAgents.filter(agent => {
    // Search term match
    const matchesSearch = 
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.phone.includes(searchTerm);
    
    // Status match
    const matchesStatus = 
      filterStatus === 'all' || agent.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  // Sort agents
  const sortedAgents = [...filteredAgents].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'users') return b.users - a.users;
    if (sortBy === 'groups') return b.groups - a.groups;
    if (sortBy === 'contributions') return b.totalContributions - a.totalContributions;
    if (sortBy === 'joined') return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime();
    return 0;
  });
  
  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'verified':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  const handleAddAgent = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be replaced with actual API call in production
    console.log('Adding new agent:', {
      name: newAgentName,
      email: newAgentEmail,
      phone: newAgentPhone
    });
    
    // Show success message
    alert(`Agent ${newAgentName} has been added successfully! They will need to complete KYC verification.`);
    
    // Reset form and close modal
    setNewAgentName('');
    setNewAgentEmail('');
    setNewAgentPhone('');
    setShowAddAgentModal(false);
  };

  return (
    <DashboardLayout 
      navigation={adminNavigation}
      userType="admin"
      userName={mockAdminData.name}
      pageTitle="Agents Management"
    >
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex flex-wrap justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Agents
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Manage all agents on the Digital Ajo platform
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={() => setShowAddAgentModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Add New Agent
            </button>
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
                  placeholder="Search by name, email, or phone"
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
                  <option value="inactive">Inactive</option>
                  <option value="rejected">Rejected</option>
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
                  <option value="name">Sort by Name</option>
                  <option value="users">Sort by Users</option>
                  <option value="groups">Sort by Groups</option>
                  <option value="contributions">Sort by Contributions</option>
                  <option value="joined">Sort by Join Date</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Agents List */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Agent
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Performance
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Credit Score
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Commissions
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
              {sortedAgents.length > 0 ? (
                sortedAgents.map((agent) => (
                  <tr key={agent.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-semibold">
                          {agent.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                          <div className="text-sm text-gray-500">{agent.email}</div>
                          <div className="text-sm text-gray-500">{agent.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{agent.users} Users</div>
                      <div className="text-sm text-gray-500">{agent.groups} Groups</div>
                      <div className="text-sm text-gray-500">
                        {agent.totalContributions > 0 ? (
                          <span>₦{agent.totalContributions.toLocaleString()} Total</span>
                        ) : (
                          <span>No contributions yet</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {agent.creditScore > 0 ? (
                        <div className="flex items-center">
                          <div className={`h-2.5 w-2.5 rounded-full mr-2 ${
                            agent.creditScore >= 800 ? 'bg-green-500' : 
                            agent.creditScore >= 750 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          <span className="text-sm text-gray-900">{agent.creditScore}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {agent.commissions > 0 ? (
                        <span>₦{agent.commissions.toLocaleString()}</span>
                      ) : (
                        <span className="text-gray-500">₦0</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(agent.status)}`}>
                        {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        KYC: <span className={`px-2 py-0.5 rounded-full ${getStatusBadgeClass(agent.kycStatus)}`}>
                          {agent.kycStatus.charAt(0).toUpperCase() + agent.kycStatus.slice(1)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Joined: {formatDate(agent.joinedDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col space-y-1">
                        <Link
                          href={`/dashboard/admin/agents/${agent.id}`}
                          className="text-red-600 hover:text-red-900"
                        >
                          View Details
                        </Link>
                        {agent.kycStatus === 'pending' && (
                          <Link
                            href={`/dashboard/admin/kyc?agent=${agent.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Review KYC
                          </Link>
                        )}
                        {agent.status === 'active' && (
                          <button
                            onClick={() => alert(`This would suspend agent ${agent.name}`)}
                            className="text-yellow-600 hover:text-yellow-900"
                          >
                            Suspend
                          </button>
                        )}
                        {agent.status === 'inactive' && (
                          <button
                            onClick={() => alert(`This would reactivate agent ${agent.name}`)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Reactivate
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No agents found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{sortedAgents.length}</span> agents
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
      
      {/* Add Agent Modal */}
      {showAddAgentModal && (
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
                    {UsersIcon("h-6 w-6 text-red-600") }
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Add New Agent
                    </h3>
                    <div className="mt-4">
                      <form onSubmit={handleAddAgent}>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                              Full Name
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                value={newAgentName}
                                onChange={(e) => setNewAgentName(e.target.value)}
                                className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                              Email Address
                            </label>
                            <div className="mt-1">
                              <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                value={newAgentEmail}
                                onChange={(e) => setNewAgentEmail(e.target.value)}
                                className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                              Phone Number
                            </label>
                            <div className="mt-1">
                              <input
                                type="tel"
                                name="phone"
                                id="phone"
                                required
                                value={newAgentPhone}
                                onChange={(e) => setNewAgentPhone(e.target.value)}
                                className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  onClick={handleAddAgent}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-black font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add Agent
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddAgentModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-black font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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

