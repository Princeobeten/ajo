'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NavItem, HomeIcon, GroupIcon, WalletIcon, LoanIcon, CreditIcon, HelpIcon, UsersIcon, ProfileIcon } from '@/components/DashboardLayout';
import { DashboardLayout } from '@/components/DashboardLayout';
import { agentNavigation } from '@/constant/navItem';

// Mock user data
const mockAgentData = {
  name: 'Fatima Ibrahim',
};

// Added type for User
type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  groups: number;
  totalContributions: number;
  loansTaken: number;
  loanBalance: number;
  creditScore: number;
  kycStatus: string;
  joinedDate: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: 'Amina Johnson',
    email: 'amina@example.com',
    phone: '+234 123 4567 890',
    groups: 2,
    totalContributions: 40000,
    loansTaken: 1,
    loanBalance: 0,
    creditScore: 760,
    kycStatus: 'verified',
    joinedDate: '2024-10-15'
  },
  {
    id: 2,
    name: 'Grace Okafor',
    email: 'grace@example.com',
    phone: '+234 123 9876 543',
    groups: 1,
    totalContributions: 30000,
    loansTaken: 0,
    loanBalance: 0,
    creditScore: 730,
    kycStatus: 'verified',
    joinedDate: '2024-11-05'
  },
  {
    id: 3,
    name: 'Blessing Adeyemi',
    email: 'blessing@example.com',
    phone: '+234 987 5432 109',
    groups: 2,
    totalContributions: 85000,
    loansTaken: 1,
    loanBalance: 35000,
    creditScore: 710,
    kycStatus: 'verified',
    joinedDate: '2024-09-30'
  },
  {
    id: 4,
    name: 'Chinwe Eze',
    email: 'chinwe@example.com',
    phone: '+234 234 5678 901',
    groups: 1,
    totalContributions: 50000,
    loansTaken: 0,
    loanBalance: 0,
    creditScore: 750,
    kycStatus: 'verified',
    joinedDate: '2024-12-10'
  },
  {
    id: 5,
    name: 'Folake Adeleke',
    email: 'folake@example.com',
    phone: '+234 567 8901 234',
    groups: 3,
    totalContributions: 105000,
    loansTaken: 1,
    loanBalance: 75000,
    creditScore: 720,
    kycStatus: 'verified',
    joinedDate: '2024-10-22'
  }
];

export default function AgentUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'inactive'
  const [sortBy, setSortBy] = useState('name'); // 'name', 'credit', 'contributions', 'joined'
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false); // Added for mobile filters
  
  // Form state
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserBvn, setNewUserBvn] = useState('');
  const [newUserNin, setNewUserNin] = useState('');
//   
// 
  
  // Filter users based on search and filters
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    
    // Updated filter logic slightly for clarity
    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'active') return matchesSearch && user.loanBalance === 0; // No active loans
    if (filterStatus === 'inactive') return matchesSearch && user.loanBalance > 0; // With active loans
    
    return matchesSearch;
  });
  
  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'credit') return b.creditScore - a.creditScore;
    if (sortBy === 'contributions') return b.totalContributions - a.totalContributions;
    if (sortBy === 'joined') return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime();
    return 0;
  });

  // Get status badge class with dark mode support (similar to AgentGroups)
  const getLoanStatusBadgeClass = (loanBalance: number) => {
    if (loanBalance > 0) {
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    }
    return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
  };

  // Format date string to local date (similar to AgentGroups)
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be replaced with actual API call in production
    console.log('Adding new user:', {
      name: newUserName,
      email: newUserEmail,
      phone: newUserPhone
    });
    
    // Show success message
    alert(`User ${newUserName} has been added successfully!`);
    
    // Reset form and close modal
    setNewUserName('');
    setNewUserEmail('');
    setNewUserPhone('');
    setShowAddUserModal(false);
  };

  // Close mobile filter when tab changes (Keep this for later use)
  useEffect(() => {
    setIsMobileFilterOpen(false);
  }, [filterStatus, sortBy]);

  return (
    <DashboardLayout 
      navigation={agentNavigation}
      userType="agent"
      userName={mockAgentData.name}
      pageTitle="Manage Users"
    >
      {/* Updated container with dark mode */}
      <div className="bg-white dark:bg-gray-900 shadow overflow-hidden rounded-[30px]">
        {/* Updated header with dark mode and border */}
        <div className="px-4 py-5 sm:px-6 flex flex-wrap justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              My Users
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              Manage all users under your agency
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            {/* Updated button with icon and dark mode focus */}
            <button
              onClick={() => setShowAddUserModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add New User
            </button>
          </div>
        </div>
        
        {/* Mobile Filter Toggle */}
        <div className="md:hidden px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="w-full flex justify-between items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 rounded-md shadow-sm border border-gray-300 dark:border-gray-600"
          >
            <span>
              Filter: {filterStatus === 'all' ? 'All' : filterStatus === 'active' ? 'No Active Loans' : 'With Active Loans'} | Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
            </span>
            <svg 
              className={`ml-2 h-5 w-5 transform ${isMobileFilterOpen ? 'rotate-180' : ''}`} 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Mobile Filters */}
        {isMobileFilterOpen && (
          <div className="md:hidden px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Filter by Loan Status</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    className={`px-3 py-1.5 text-xs font-medium rounded-md ${filterStatus === 'all' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' : 'bg-white text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                    onClick={() => setFilterStatus('all')}
                  >
                    All
                  </button>
                  <button
                    className={`px-3 py-1.5 text-xs font-medium rounded-md ${filterStatus === 'active' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' : 'bg-white text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                    onClick={() => setFilterStatus('active')}
                  >
                    No Loans
                  </button>
                  <button
                    className={`px-3 py-1.5 text-xs font-medium rounded-md ${filterStatus === 'inactive' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' : 'bg-white text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                    onClick={() => setFilterStatus('inactive')}
                  >
                    Active Loans
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="mobile-sort" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Sort By</label>
                <select
                  id="mobile-sort"
                  name="mobile-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="block w-full text-sm border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white p-1"
                >
                  <option value="name">Name</option>
                  <option value="credit">Credit Score</option>
                  <option value="contributions">Contributions</option>
                  <option value="joined">Join Date</option>
                </select>
              </div>
            </div>
          </div>
        )}
        
        {/* Desktop Filters and Search - Replaced previous table filters */}
        <div className="hidden md:block px-4 py-5 sm:px-6 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
            <div className="w-full md:w-1/3">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
              
                <input
                  type="text"
                  name="search"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white p-1"
                  placeholder="Search by name, email, or phone"
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <div>
                 <label htmlFor="filter" className="sr-only">Filter by Status</label>
                <select
                  id="filter"
                  name="filter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="all">All Users</option>
                  <option value="active">No Active Loans</option>
                  <option value="inactive">With Active Loans</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="sort" className="sr-only">Sort By</label>
                <select
                  id="sort"
                  name="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
        
        {/* Mobile Search */} 
        <div className="md:hidden px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <input
              type="text"
              name="mobile-search"
              id="mobile-search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white p-1"
              placeholder="Search users..."
            />
          </div>
        </div>

        {/* Users List - Card Layout */}
        {/* Updated container for cards */}
        <div className="overflow-hidden bg-gray-50 dark:bg-gray-900">
          {sortedUsers.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3  sm:p-6">
              {sortedUsers.map((user) => (
                <div key={user.id} className="bg-white dark:bg-gray-800 shadow rounded-[30px] overflow-hidden divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700">
                  {/* Card Header */}
                  <div className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div className='min-w-0 flex-1'>
                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.phone}</div>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Joined: {formatDate(user.joinedDate)}</span>
                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getLoanStatusBadgeClass(user.loanBalance)}`}>
                        {user.loanBalance > 0 ? `Loan: ${formatCurrency(user.loanBalance)}` : 'No Active Loans'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Card Body/Stats */}
                  <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700 bg-gray-50 dark:bg-gray-700/50">
                    <div className="px-3 py-2 text-center">
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Credit Score</div>
                      <div className="mt-1 flex items-center justify-center">
                        <div className={`h-2 w-2 rounded-full mr-1.5 ${ 
                          user.creditScore >= 750 ? 'bg-green-500 dark:bg-green-400' : 
                          user.creditScore >= 700 ? 'bg-yellow-500 dark:bg-yellow-400' : 'bg-red-500 dark:bg-red-400'
                        }`}></div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{user.creditScore}</span>
                      </div>
                    </div>
                    <div className="px-3 py-2 text-center">
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Groups</div>
                      <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{user.groups}</div>
                    </div>
                    <div className="px-3 py-2 text-center">
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Contributions</div>
                      <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(user.totalContributions)}</div>
                    </div>
                  </div>

                  {/* Card Footer/Actions */}
                  <div className="p-3 bg-gray-50 dark:bg-gray-800/50 text-right">
                    <div className="flex justify-end space-x-2">
                      <Link
                        href={`/dashboard/agent/users/${user.id}`}
                        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                      >
                        View
                      </Link>
                      <Link
                        href={`/dashboard/agent/loans/apply?user=${user.id}`}
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                      >
                        Apply Loan
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Updated No Users Found state
            <div className="px-4 py-10 sm:px-6 text-center">
              <svg 
                  className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  aria-hidden="true"
              >
                  <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No users found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                No users match your current filter or search criteria.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterStatus('all');
                    setSortBy('name');
                  }}
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  Clear Filters & Search
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Add User Modal - Updated dark mode styling */}
      {showAddUserModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75 dark:bg-gray-900/75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-[30px] text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-semibold">
                    {UsersIcon("h-6 w-6")}
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Add New User
                    </h3>
                    <div className="mt-4">
                      <form onSubmit={handleAddUser}>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Full Name
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                value={newUserName}
                                onChange={(e) => setNewUserName(e.target.value)}
                                className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-1"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Email Address (Optional)
                            </label>
                            <div className="mt-1">
                              <input
                                type="email"
                                name="email"
                                id="email"
                                value={newUserEmail}
                                onChange={(e) => setNewUserEmail(e.target.value)}
                                className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-1"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Phone Number
                            </label>
                            <div className="mt-1">
                              <input
                                type="tel"
                                name="phone"
                                id="phone"
                                required
                                value={newUserPhone}
                                onChange={(e) => setNewUserPhone(e.target.value)}
                                className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-1"
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="bvn" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              BVN
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="bvn"
                                id="bvn"
                                required
                                value={newUserBvn}
                                onChange={(e) => setNewUserBvn(e.target.value)}
                                className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-1"
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="nin" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              NIN
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="nin"
                                id="nin"
                                required
                                value={newUserNin}
                                onChange={(e) => setNewUserNin(e.target.value)}
                                className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-1"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  onClick={handleAddUser}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-offset-gray-800"
                >
                  Add User
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800"
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