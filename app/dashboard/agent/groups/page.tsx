'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NavItem, HomeIcon, GroupIcon, WalletIcon, LoanIcon, CreditIcon, HelpIcon, UsersIcon, ProfileIcon } from '@/components/DashboardLayout';
import { DashboardLayout } from '@/components/DashboardLayout';
import { agentNavigation } from '@/constant/navItem';

// Mock agent data
const mockAgentData = {
  name: 'Fatima Ibrahim',
};

const mockGroups = [
  {
    id: 1,
    name: 'Market Women Savings',
    members: 12,
    contributionAmount: 5000,
    frequency: 'Weekly',
    totalCollected: 240000,
    nextContribution: '2025-04-20',
    status: 'active',
    createdDate: '2024-10-01'
  },
  {
    id: 2,
    name: 'Family Support Group',
    members: 8,
    contributionAmount: 10000,
    frequency: 'Monthly',
    totalCollected: 480000,
    nextContribution: '2025-05-01',
    status: 'active',
    createdDate: '2024-11-01'
  },
  {
    id: 3,
    name: 'Business Investment Club',
    members: 15,
    contributionAmount: 15000,
    frequency: 'Monthly',
    totalCollected: 675000,
    nextContribution: '2025-05-15',
    status: 'active',
    createdDate: '2024-09-15'
  },
  {
    id: 4,
    name: 'School Fees Saver',
    members: 5,
    contributionAmount: 20000,
    frequency: 'Monthly',
    totalCollected: 0,
    nextContribution: '2025-05-01',
    status: 'pending',
    createdDate: '2025-04-05'
  },
  {
    id: 5,
    name: 'Community Traders Union',
    members: 18,
    contributionAmount: 5000,
    frequency: 'Weekly',
    totalCollected: 0,
    nextContribution: null,
    status: 'completed',
    createdDate: '2024-01-10',
    completedDate: '2024-12-15'
  }
];

// Define the type for the schedule items
type ContributionSchedule = {
  date: string;
  status: string;
  completed: number;
  pending: number;
};

// Define the type for mockContributionSchedules with an index signature
type ContributionSchedules = {
  [key: number]: ContributionSchedule[];
};

// Contribution details for each group
const mockContributionSchedules: ContributionSchedules = {
  1: [
    { date: '2025-04-20', status: 'upcoming', completed: 0, pending: 12 },
    { date: '2025-04-13', status: 'completed', completed: 12, pending: 0 },
    { date: '2025-04-06', status: 'completed', completed: 12, pending: 0 },
    { date: '2025-03-30', status: 'completed', completed: 11, pending: 1 },
  ],
  2: [
    { date: '2025-05-01', status: 'upcoming', completed: 0, pending: 8 },
    { date: '2025-04-01', status: 'completed', completed: 8, pending: 0 },
    { date: '2025-03-01', status: 'completed', completed: 8, pending: 0 },
  ],
  3: [
    { date: '2025-05-15', status: 'upcoming', completed: 0, pending: 15 },
    { date: '2025-04-15', status: 'completed', completed: 15, pending: 0 },
    { date: '2025-03-15', status: 'completed', completed: 13, pending: 2 },
  ],
  4: [],
  5: []
};


export default function AgentGroups() {
  const [activeTab, setActiveTab] = useState('active'); // 'active', 'pending', 'completed', 'all'
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Form state for new group
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupFrequency, setNewGroupFrequency] = useState('weekly');
  const [newGroupAmount, setNewGroupAmount] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  
  // Filter groups based on active tab and search term
  const filteredGroups = mockGroups.filter(group => {
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'active' && group.status === 'active') ||
      (activeTab === 'pending' && group.status === 'pending') ||
      (activeTab === 'completed' && group.status === 'completed');
    
    const matchesSearch = 
      group.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });
  
  // Get status badge class with dark mode support
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'upcoming':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  // Format date string to local date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };
  
  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be replaced with actual API call in production
    console.log('Creating new group:', {
      name: newGroupName,
      frequency: newGroupFrequency,
      amount: newGroupAmount,
      description: newGroupDescription
    });
    
    // Show success message
    alert(`Group ${newGroupName} has been created successfully!`);
    
    // Reset form and close modal
    setNewGroupName('');
    setNewGroupFrequency('weekly');
    setNewGroupAmount('');
    setNewGroupDescription('');
    setShowCreateGroupModal(false);
  };

  // Close mobile filter when tab changes
  useEffect(() => {
    setIsMobileFilterOpen(false);
  }, [activeTab]);
  
  return (
    <DashboardLayout 
      navigation={agentNavigation}
      userType="agent"
      userName={mockAgentData.name}
      pageTitle="Ajo Groups Management"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Groups Header Card */}
        <div className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-900/30 rounded-[30px] overflow-hidden transition-colors duration-200">
          <div className="px-6 py-5 sm:flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">My Ajo Groups</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage all Ajo groups under your supervision
            </p>
          </div>
            <button
              onClick={() => setShowCreateGroupModal(true)}
              className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create Group
            </button>
        </div>
        
          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 transition-colors duration-200">
            <nav className="flex overflow-x-auto py-2 px-4">
              <button
                className={`text-sm font-medium py-3 px-6 rounded-md mr-2 ${
                  activeTab === 'active' 
                    ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm dark:shadow-gray-900/30' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                } whitespace-nowrap transition-all duration-150`}
                onClick={() => setActiveTab('active')}
              >
                Active Groups
              </button>
              <button
                className={`text-sm font-medium py-3 px-6 rounded-md mr-2 ${
                  activeTab === 'pending' 
                    ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm dark:shadow-gray-900/30' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                } whitespace-nowrap transition-all duration-150`}
                onClick={() => setActiveTab('pending')}
              >
                Pending Groups
              </button>
              <button
                className={`text-sm font-medium py-3 px-6 rounded-md mr-2 ${
                  activeTab === 'completed' 
                    ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm dark:shadow-gray-900/30' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                } whitespace-nowrap transition-all duration-150`}
                onClick={() => setActiveTab('completed')}
              >
                Completed Groups
              </button>
              <button
                className={`text-sm font-medium py-3 px-6 rounded-md ${
                  activeTab === 'all' 
                    ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm dark:shadow-gray-900/30' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                } whitespace-nowrap transition-all duration-150`}
                onClick={() => setActiveTab('all')}
              >
                All Groups
              </button>
            </nav>
            </div>

          {/* Search Bar */}
          <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-xl w-full">
              <label htmlFor="search" className="sr-only">Search groups</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm transition-colors duration-200"
                  placeholder="Search groups by name..."
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Groups Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredGroups.map((group) => (
            <div 
              key={group.id} 
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[30px] overflow-hidden shadow-sm hover:shadow-md dark:shadow-gray-900/20 dark:hover:shadow-gray-900/30 transition-all duration-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900/70"
            >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white truncate mr-2">{group.name}</h4>
                      <span className={`flex-shrink-0 px-2 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusBadgeClass(group.status)}`}>
                        {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                      <span>
                        <span className="font-medium">Members:</span> {group.members}
                      </span>
                      <span>
                        <span className="font-medium">Created:</span> {formatDate(group.createdDate)}
                      </span>
                      <span>
                        <span className="font-medium">Frequency:</span> {group.frequency}
                      </span>
                      {group.status === 'completed' && group.completedDate && (
                        <span>
                          <span className="font-medium">Completed:</span> {formatDate(group.completedDate)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700 bg-gray-50 dark:bg-gray-700/50">
                    <div className="px-3 py-2 text-center">
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Amount</div>
                      <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">₦{group.contributionAmount.toLocaleString()}</div>
                    </div>
                    <div className="px-3 py-2 text-center">
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Collected</div>
                      <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">₦{group.totalCollected.toLocaleString()}</div>
                    </div>
                    <div className="px-3 py-2 text-center">
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Next Due</div>
                      <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{formatDate(group.nextContribution)}</div>
                    </div>
                  </div>

                  {group.status === 'active' && (
                    <div className="p-4">
                      <button
                        onClick={() => setSelectedGroupId(selectedGroupId === group.id ? null : group.id)}
                        className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-500 focus:outline-none flex items-center w-full justify-between"
                      >
                        <span>Contribution Schedule</span>
                        <svg
                          className={`ml-1 h-4 w-4 transform ${selectedGroupId === group.id ? 'rotate-180' : ''}`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {selectedGroupId === group.id && mockContributionSchedules[group.id] && mockContributionSchedules[group.id].length > 0 && (
                        <div className="mt-2 overflow-x-auto">
                          <table className="min-w-full text-sm">
                            <thead className="sr-only">
                              <tr>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Completed</th>
                                <th>Pending</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                              {mockContributionSchedules[group.id].map((schedule, index) => (
                                <tr key={index} className="dark:text-gray-200 text-xs">
                                  <td className="py-1.5 pr-2 whitespace-nowrap">{formatDate(schedule.date)}</td>
                                  <td className="py-1.5 px-2 whitespace-nowrap">
                                    <span className={`px-1.5 py-0.5 inline-flex text-[10px] leading-4 font-medium rounded-full ${getStatusBadgeClass(schedule.status)}`}>
                                      {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                                    </span>
                                  </td>
                                  <td className="py-1.5 px-2 whitespace-nowrap text-center">{schedule.completed}/{schedule.completed + schedule.pending}</td>
                                  <td className="py-1.5 pl-2 whitespace-nowrap text-right">
                                    {schedule.status === 'upcoming' && (
                                      <Link
                                        href={`/dashboard/agent/groups/${group.id}/collect?date=${schedule.date}`}
                                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-500 font-medium"
                                      >
                                        Collect
                                      </Link>
                                    )}
                                    {schedule.status === 'completed' && (
                                      <Link
                                        href={`/dashboard/agent/groups/${group.id}/view?date=${schedule.date}`}
                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500 font-medium"
                                      >
                                        View
                                      </Link>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 text-right">
                    <Link
                      href={`/dashboard/agent/groups/${group.id}`}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                    >
                      View Group Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

        {/* Empty State */}
        {filteredGroups.length === 0 && (
          <div className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-900/30 rounded-[30px] overflow-hidden transition-colors duration-200">
            <div className="px-4 py-12 text-center">
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No groups found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {activeTab === 'all'
                  ? "You haven't created any Ajo groups yet."
                  : `You don't have any ${activeTab} groups.`}
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setShowCreateGroupModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Create New Group
                </button>
              </div>
              </div>
            </div>
          )}
      </div>
      
      {/* Create Group Modal */}
      {showCreateGroupModal && (
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
                    {GroupIcon("h-6 w-6 text-red-600 dark:text-red-400")}
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Create New Ajo Group
                    </h3>
                    <div className="mt-4">
                      <form onSubmit={handleCreateGroup}>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="group-name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                              Group Name
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="group-name"
                                id="group-name"
                                required
                                value={newGroupName}
                                onChange={(e) => setNewGroupName(e.target.value)}
                                className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                              Contribution Frequency
                            </label>
                            <div className="mt-1">
                              <select
                                id="frequency"
                                name="frequency"
                                value={newGroupFrequency}
                                onChange={(e) => setNewGroupFrequency(e.target.value)}
                                className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                              >
                                <option value="weekly">Weekly</option>
                                <option value="bi-weekly">Bi-Weekly</option>
                                <option value="monthly">Monthly</option>
                              </select>
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                              Contribution Amount (₦)
                            </label>
                            <div className="mt-1">
                              <input
                                type="number"
                                name="amount"
                                id="amount"
                                required
                                min="1000"
                                value={newGroupAmount}
                                onChange={(e) => setNewGroupAmount(e.target.value)}
                                className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                              Group Description
                            </label>
                            <div className="mt-1">
                              <textarea
                                id="description"
                                name="description"
                                rows={3}
                                value={newGroupDescription}
                                onChange={(e) => setNewGroupDescription(e.target.value)}
                                className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  onClick={handleCreateGroup}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 dark:bg-red-700 text-base font-medium text-white hover:bg-red-700 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-200"
                >
                  Create Group
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateGroupModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-200"
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
