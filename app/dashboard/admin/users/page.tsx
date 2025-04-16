'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout, NavItem, HomeIcon, GroupIcon, WalletIcon, LoanIcon, HelpIcon, UsersIcon, AnalyticsIcon, KycIcon } from '@/components/DashboardLayout';
import { adminNavigation } from '@/constant/navItem';

// Mock admin data
const mockAdminData = {
  name: 'Admin',
};

// Mock users data
const mockUsers = [
  {
    id: 1,
    name: 'Amina Johnson',
    email: 'amina@example.com',
    phone: '+234 123 4567 890',
    groups: 2,
    totalContributions: 40000,
    creditScore: 760,
    loansTaken: 1,
    loanBalance: 0,
    kycStatus: 'verified',
    agent: 'Fatima Ibrahim',
    joinedDate: '2024-10-15',
    status: 'active'
  },
  {
    id: 2,
    name: 'Grace Okafor',
    email: 'grace@example.com',
    phone: '+234 123 9876 543',
    groups: 1,
    totalContributions: 30000,
    creditScore: 730,
    loansTaken: 0,
    loanBalance: 0,
    kycStatus: 'verified',
    agent: 'Fatima Ibrahim',
    joinedDate: '2024-11-05',
    status: 'active'
  },
  {
    id: 3,
    name: 'Blessing Adeyemi',
    email: 'blessing@example.com',
    phone: '+234 987 5432 109',
    groups: 2,
    totalContributions: 85000,
    creditScore: 710,
    loansTaken: 1,
    loanBalance: 35000,
    kycStatus: 'verified',
    agent: 'Fatima Ibrahim',
    joinedDate: '2024-09-30',
    status: 'active'
  },
  {
    id: 4,
    name: 'Chinwe Eze',
    email: 'chinwe@example.com',
    phone: '+234 234 5678 901',
    groups: 1,
    totalContributions: 50000,
    creditScore: 750,
    loansTaken: 0,
    loanBalance: 0,
    kycStatus: 'verified',
    agent: 'James Adebayo',
    joinedDate: '2024-12-10',
    status: 'active'
  },
  {
    id: 5,
    name: 'Folake Adeleke',
    email: 'folake@example.com',
    phone: '+234 567 8901 234',
    groups: 3,
    totalContributions: 105000,
    creditScore: 720,
    loansTaken: 1,
    loanBalance: 75000,
    kycStatus: 'verified',
    agent: 'Fatima Ibrahim',
    joinedDate: '2024-10-22',
    status: 'active'
  },
  {
    id: 6,
    name: 'Mary Okonkwo',
    email: 'mary@example.com',
    phone: '+234 703 9876 543',
    groups: 0,
    totalContributions: 0,
    creditScore: 0,
    loansTaken: 0,
    loanBalance: 0,
    kycStatus: 'pending',
    agent: 'Joseph Nnamdi',
    joinedDate: '2025-04-11',
    status: 'pending'
  },
  {
    id: 7,
    name: 'Elizabeth Adekunle',
    email: 'elizabeth@example.com',
    phone: '+234 802 3456 789',
    groups: 0,
    totalContributions: 0,
    creditScore: 0,
    loansTaken: 0,
    loanBalance: 0,
    kycStatus: 'pending',
    agent: 'James Adebayo',
    joinedDate: '2025-04-12',
    status: 'pending'
  },
  {
    id: 8,
    name: 'Aisha Mohammed',
    email: 'aisha@example.com',
    phone: '+234 803 8765 432',
    groups: 0,
    totalContributions: 0,
    creditScore: 0,
    loansTaken: 0,
    loanBalance: 0,
    kycStatus: 'verified',
    agent: 'Joseph Nnamdi',
    joinedDate: '2025-04-07',
    status: 'inactive'
  }
];

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'pending', 'inactive'
  const [filterAgent, setFilterAgent] = useState('all');
  const [sortBy, setSortBy] = useState('name'); // 'name', 'credit', 'contributions', 'joined'
  
  // Get unique agent list from users
  const agents = Array.from(new Set(mockUsers.map(user => user.agent))).sort();
  
  // Filter users based on search, status and agent filters
  const filteredUsers = mockUsers.filter(user => {
    // Search term match
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    
    // Status match
    const matchesStatus = 
      filterStatus === 'all' || user.status === filterStatus;
    
    // Agent match
    const matchesAgent = 
      filterAgent === 'all' || user.agent === filterAgent;
    
    return matchesSearch && matchesStatus && matchesAgent;
  });
  
  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'credit') return b.creditScore - a.creditScore;
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

  return (
    <DashboardLayout 
      navigation={adminNavigation}
      userType="admin"
      userName={mockAdminData.name}
      pageTitle="Users Management"
    >
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Users
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage all users on the Digital Ajo platform
          </p>
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
                  <option value="name">Sort by Name</option>
                  <option value="credit">Sort by Credit Score</option>
                  <option value="contributions">Sort by Contributions</option>
                  <option value="joined">Sort by Join Date</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Users List */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  User
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
                  Agent
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Groups
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total Contributions
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
              {sortedUsers.length > 0 ? (
                sortedUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          <div className="text-sm text-gray-500">{user.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.creditScore > 0 ? (
                        <div className="flex items-center">
                          <div className={`h-2.5 w-2.5 rounded-full mr-2 ${
                            user.creditScore >= 750 ? 'bg-green-500' : 
                            user.creditScore >= 700 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          <span className="text-sm text-gray-900">{user.creditScore}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.agent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.groups}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.totalContributions > 0 ? (
                        <span>₦{user.totalContributions.toLocaleString()}</span>
                      ) : (
                        <span className="text-gray-500">₦0</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(user.status)}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        Joined: {formatDate(user.joinedDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col space-y-1">
                        <Link
                          href={`/dashboard/admin/users/${user.id}`}
                          className="text-red-600 hover:text-red-900"
                        >
                          View Details
                        </Link>
                        {user.kycStatus === 'pending' && (
                          <Link
                            href={`/dashboard/admin/kyc?user=${user.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Review KYC
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{sortedUsers.length}</span> users
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

