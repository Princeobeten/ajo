'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout, NavItem, HomeIcon, GroupIcon, WalletIcon, LoanIcon, CreditIcon, HelpIcon, UsersIcon, AnalyticsIcon, KycIcon } from '@/components/DashboardLayout';
import { adminNavigation } from '@/constant/navItem';

// Mock admin data
const mockAdminData = {
  name: 'Admin',
};

// Mock groups data
const mockGroups = [
  {
    id: 1,
    name: 'Market Women Savings',
    description: 'Savings group for women in the local market',
    members: 12,
    agent: 'Fatima Ibrahim',
    totalContributions: 240000,
    contributionAmount: 5000,
    frequency: 'Weekly',
    status: 'active',
    createdDate: '2024-01-15',
    nextContribution: '2025-05-01'
  },
  {
    id: 2,
    name: 'Community Traders Union',
    description: 'Savings group for community traders',
    members: 22,
    agent: 'Joseph Nnamdi',
    totalContributions: 880000,
    contributionAmount: 10000,
    frequency: 'Weekly',
    status: 'active',
    createdDate: '2024-02-02',
    nextContribution: '2025-05-03'
  },
  {
    id: 3,
    name: 'Business Investment Club',
    description: 'Group for small business owners looking to save and invest',
    members: 15,
    agent: 'James Adebayo',
    totalContributions: 675000,
    contributionAmount: 15000,
    frequency: 'Monthly',
    status: 'active',
    createdDate: '2024-02-15',
    nextContribution: '2025-05-15'
  },
  {
    id: 4,
    name: 'Teachers Saving Circle',
    description: 'Savings group for local school teachers',
    members: 18,
    agent: 'James Adebayo',
    totalContributions: 360000,
    contributionAmount: 5000,
    frequency: 'Weekly',
    status: 'active',
    createdDate: '2024-03-01',
    nextContribution: '2025-05-02'
  },
  {
    id: 5,
    name: 'Transport Workers Alliance',
    description: 'Savings group for transport workers',
    members: 20,
    agent: 'Fatima Ibrahim',
    totalContributions: 400000,
    contributionAmount: 5000,
    frequency: 'Weekly',
    status: 'active',
    createdDate: '2024-03-10',
    nextContribution: '2025-05-01'
  },
  {
    id: 6,
    name: 'Tech Professionals',
    description: 'Savings group for tech professionals and entrepreneurs',
    members: 8,
    agent: 'Fatima Ibrahim',
    totalContributions: 480000,
    contributionAmount: 20000,
    frequency: 'Monthly',
    status: 'active',
    createdDate: '2024-03-15',
    nextContribution: '2025-05-15'
  },
  {
    id: 7,
    name: 'Healthcare Workers Fund',
    description: 'Savings group for healthcare workers',
    members: 10,
    agent: 'Joseph Nnamdi',
    totalContributions: 300000,
    contributionAmount: 7500,
    frequency: 'Bi-weekly',
    status: 'active',
    createdDate: '2024-04-01',
    nextContribution: '2025-05-08'
  },
  {
    id: 8,
    name: 'New Graduates Club',
    description: 'Savings group for recent university graduates',
    members: 0,
    agent: 'James Adebayo',
    totalContributions: 0,
    contributionAmount: 5000,
    frequency: 'Weekly',
    status: 'pending',
    createdDate: '2025-04-10',
    nextContribution: 'N/A'
  }
];

export default function AdminGroups() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'pending', 'inactive'
  const [filterAgent, setFilterAgent] = useState('all');
  const [sortBy, setSortBy] = useState('name'); // 'name', 'members', 'contributions', 'date'
  
  // Extract unique agents for filter
  const agents = Array.from(new Set(mockGroups.map(group => group.agent)));
  
  // Filter groups based on search and filters
  const filteredGroups = mockGroups.filter(group => {
    // Search term match
    const matchesSearch = 
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      group.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status match
    const matchesStatus = 
      filterStatus === 'all' || group.status === filterStatus;
    
    // Agent match
    const matchesAgent = 
      filterAgent === 'all' || group.agent === filterAgent;
    
    return matchesSearch && matchesStatus && matchesAgent;
  });
  
  // Sort groups
  const sortedGroups = [...filteredGroups].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'members') return b.members - a.members;
    if (sortBy === 'contributions') return b.totalContributions - a.totalContributions;
    if (sortBy === 'date') return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
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
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    if (dateString === 'N/A') return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };
  
  return (
    <DashboardLayout 
      navigation={adminNavigation}
      userType="admin"
      userName={mockAdminData.name}
      pageTitle="Groups Management"
    >
       {/* Export Buttons */}
       <div className="mt-6 flex justify-end">
        <button
          onClick={() => alert('This would generate a CSV export of all groups')}
          className="inline-flex items-center mr-2 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Export CSV
        </button>
        <button
          onClick={() => alert('This would generate a PDF report of groups')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Generate Report
        </button>
      </div>

      {/* Group Statistics */}
      <div className="mt-6 bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Group Statistics
          </h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-50 px-4 py-5 sm:px-6 rounded-lg overflow-hidden">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Total Groups
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {mockGroups.length}
              </dd>
            </div>
            
            <div className="bg-gray-50 px-4 py-5 sm:px-6 rounded-lg overflow-hidden">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Active Groups
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {mockGroups.filter(group => group.status === 'active').length}
              </dd>
            </div>
            
            <div className="bg-gray-50 px-4 py-5 sm:px-6 rounded-lg overflow-hidden">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Total Members
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {mockGroups.reduce((sum, group) => sum + group.members, 0)}
              </dd>
            </div>
            
            <div className="bg-gray-50 px-4 py-5 sm:px-6 rounded-lg overflow-hidden">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Total Contributions
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {formatCurrency(mockGroups.reduce((sum, group) => sum + group.totalContributions, 0))}
              </dd>
            </div>
            
            <div className="bg-gray-50 px-4 py-5 sm:px-6 rounded-lg overflow-hidden">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Average Group Size
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {Math.round(mockGroups.reduce((sum, group) => sum + group.members, 0) / mockGroups.filter(group => group.status === 'active').length)}
              </dd>
            </div>
            
            <div className="bg-gray-50 px-4 py-5 sm:px-6 rounded-lg overflow-hidden">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Average Contribution
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {formatCurrency(Math.round(
                  mockGroups.reduce((sum, group) => sum + group.contributionAmount, 0) / 
                  mockGroups.filter(group => group.status === 'active').length
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      
     

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-10">
        <div className="px-4 py-5 sm:px-6 flex flex-wrap justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Ajo Groups
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Manage all savings groups on the Digital Ajo platform
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
                  placeholder="Search by name or description"
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
                  <option value="members">Sort by Members</option>
                  <option value="contributions">Sort by Contributions</option>
                  <option value="date">Sort by Date Created</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Groups List */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Group
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
                  Members
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Contribution Details
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
              {sortedGroups.length > 0 ? (
                sortedGroups.map((group) => (
                  <tr key={group.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-semibold">
                          {group.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{group.name}</div>
                          <div className="text-sm text-gray-500">{group.description}</div>
                          <div className="text-xs text-gray-500">Created: {formatDate(group.createdDate)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{group.agent}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {group.members} 
                      {group.members === 1 ? ' member' : ' members'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatCurrency(group.contributionAmount)} / {group.frequency}
                      </div>
                      <div className="text-sm text-gray-500">
                        Total: {formatCurrency(group.totalContributions)}
                      </div>
                      <div className="text-xs text-gray-500">
                        Next Contribution: {formatDate(group.nextContribution)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(group.status)}`}>
                        {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col space-y-1">
                        <Link
                          href={`/dashboard/admin/groups/${group.id}`}
                          className="text-red-600 hover:text-red-900"
                        >
                          View Details
                        </Link>
                        <Link
                          href={`/dashboard/admin/groups/${group.id}/members`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Manage Members
                        </Link>
                        <Link
                          href={`/dashboard/admin/groups/${group.id}/contributions`}
                          className="text-green-600 hover:text-green-900"
                        >
                          View Contributions
                        </Link>
                        {group.status === 'pending' && (
                          <button
                            onClick={() => alert(`This would approve group ${group.name}`)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Approve
                          </button>
                        )}
                        {group.status === 'active' && (
                          <button
                            onClick={() => alert(`This would suspend group ${group.name}`)}
                            className="text-yellow-600 hover:text-yellow-900"
                          >
                            Suspend
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No groups found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{sortedGroups.length}</span> groups
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

