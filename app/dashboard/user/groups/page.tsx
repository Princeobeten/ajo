'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/DashboardLayout';
import { userNavigation } from '@/constant/navItem';

// Mock data
const mockUserData = {
  name: 'Amina Johnson',
};

const mockGroups = [
  {
    id: 1,
    name: 'Market Women Savings',
    members: 12,
    contributionAmount: 5000,
    frequency: 'Weekly',
    nextContribution: '2025-04-20',
    status: 'active',
    totalContributed: 40000,
    membershipDate: '2024-10-15',
    agent: 'Fatima Ibrahim',
    description: 'A savings group for market women to help grow their businesses.', 
    payoutDate: '2025-06-15',
    payoutOrder: 5
  },
  {
    id: 2,
    name: 'Family Support Group',
    members: 8,
    contributionAmount: 10000,
    frequency: 'Monthly',
    nextContribution: '2025-05-01',
    status: 'active',
    totalContributed: 30000,
    membershipDate: '2024-11-01',
    agent: 'Fatima Ibrahim',
    description: 'A group for family members to save together for emergencies and celebrations.',
    payoutDate: '2025-07-01',
    payoutOrder: 3
  },
  {
    id: 3,
    name: 'Community Traders Union',
    members: 20,
    contributionAmount: 15000,
    frequency: 'Monthly',
    nextContribution: '2025-05-15',
    status: 'pending',
    totalContributed: 0,
    membershipDate: '2025-04-10',
    agent: 'Joseph Nnamdi',
    description: 'A large savings group for traders in the community market.',
    payoutDate: 'TBD',
    payoutOrder: 15
  },
  {
    id: 4,
    name: 'School Fees Saver',
    members: 15,
    contributionAmount: 20000,
    frequency: 'Monthly',
    nextContribution: null,
    status: 'completed',
    totalContributed: 60000,
    membershipDate: '2024-05-15',
    agent: 'Fatima Ibrahim',
    description: 'A group dedicated to saving for children\'s education expenses.',
    payoutDate: '2024-12-15',
    payoutOrder: 10
  }
];

const mockContributions = [
  {
    id: 1,
    groupId: 1,
    groupName: 'Market Women Savings',
    amount: 5000,
    date: '2025-04-02',
    status: 'completed'
  },
  {
    id: 2,
    groupId: 1,
    groupName: 'Market Women Savings',
    amount: 5000,
    date: '2025-03-26',
    status: 'completed'
  },
  {
    id: 3,
    groupId: 1,
    groupName: 'Market Women Savings',
    amount: 5000,
    date: '2025-03-19',
    status: 'completed'
  },
  {
    id: 4,
    groupId: 2,
    groupName: 'Family Support Group',
    amount: 10000,
    date: '2025-04-01',
    status: 'completed'
  },
  {
    id: 5,
    groupId: 2,
    groupName: 'Family Support Group',
    amount: 10000,
    date: '2025-03-01',
    status: 'completed'
  },
  {
    id: 6,
    groupId: 2,
    groupName: 'Family Support Group',
    amount: 10000,
    date: '2025-02-01',
    status: 'completed'
  }
];

const mockPayouts = [
  {
    id: 1,
    groupId: 4,
    groupName: 'School Fees Saver',
    amount: 300000,
    date: '2024-12-15',
    status: 'completed'
  }
];

interface Contribution {
  id: number;
  groupId: number;
  groupName: string;
  amount: number;
  date: string;
  status: string;
}

interface Payout {
  id: number;
  groupId: number;
  groupName: string;
  amount: number;
  date: string;
  status: string;
}

interface Group {
  id: number;
  name: string;
  members: number;
  contributionAmount: number;
  frequency: string;
  nextContribution: string | null;
  status: string;
  totalContributed: number;
  membershipDate: string;
  agent: string;
  description: string;
  payoutDate: string;
  payoutOrder: number;
}

export default function UserGroups() {
  const [activeTab, setActiveTab] = useState('active'); // 'active', 'pending', 'completed', 'all'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null); // For expanding history
  const [historyTab, setHistoryTab] = useState('contributions'); // 'contributions', 'payouts'

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Filter groups based on active tab and search term
  const filteredGroups = mockGroups.filter(group => {
    const matchesTab =
      activeTab === 'all' ||
      group.status === activeTab;

    const matchesSearch =
      group.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  // Get contributions for a specific group
  const getGroupContributions = (groupId: number): Contribution[] => {
    return mockContributions.filter(c => c.groupId === groupId);
  };

  // Get payouts for a specific group
  const getGroupPayouts = (groupId: number): Payout[] => {
    return mockPayouts.filter(p => p.groupId === groupId);
  };

  // Format date string to local date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <DashboardLayout
      navigation={userNavigation}
      userType="user"
      userName={mockUserData.name}
      pageTitle="My Ajo Groups"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Groups Header Card (Similar to Agent Page) */}
        <div className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-900/30 rounded-[30px] overflow-hidden transition-colors duration-200">
          <div className="px-6 py-5 sm:flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">My Ajo Groups</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage your participation in Ajo groups
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link
                href="/dashboard/user/groups/join"
                className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Join New Group
              </Link>
              <Link
                href="/dashboard/user/groups/create"
                className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-all duration-200"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                 </svg>
                Create New Group
              </Link>
            </div>
          </div>

          {/* Navigation Tabs (Similar to Agent Page) */}
          <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 transition-colors duration-200">
            <nav className="flex overflow-x-auto py-2 px-4">
              {['active', 'pending', 'completed', 'all'].map((tab) => (
                <button
                  key={tab}
                  className={`text-sm font-medium py-3 px-6 rounded-md mr-2 ${
                    activeTab === tab
                      ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm dark:shadow-gray-900/30'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                  } whitespace-nowrap transition-all duration-150`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Groups
                </button>
              ))}
            </nav>
          </div>

          {/* Search Bar (Similar to Agent Page) */}
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

        {/* Groups Grid (Adapted from Agent Page) */}
        {filteredGroups.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredGroups.map((group) => {
              const groupContributions = getGroupContributions(group.id);
              const groupPayouts = getGroupPayouts(group.id);
              const isExpanded = selectedGroupId === group.id;

              return (
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
                      <span><span className="font-medium">Members:</span> {group.members}</span>
                      <span><span className="font-medium">Agent:</span> {group.agent}</span>
                      <span><span className="font-medium">Joined:</span> {formatDate(group.membershipDate)}</span>
                      <span><span className="font-medium">Frequency:</span> {group.frequency}</span>
                      {group.status === 'completed' && group.payoutDate && (
                        <span><span className="font-medium">Paid Out:</span> {formatDate(group.payoutDate)}</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700 bg-gray-50 dark:bg-gray-700/50">
                    <div className="px-3 py-2 text-center">
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Contribution</div>
                      <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">₦{group.contributionAmount.toLocaleString()}</div>
                    </div>
                    <div className="px-3 py-2 text-center">
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400">You Contributed</div>
                      <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">₦{group.totalContributed.toLocaleString()}</div>
                    </div>
                    <div className="px-3 py-2 text-center">
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Next Due</div>
                      <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{formatDate(group.nextContribution)}</div>
                    </div>
                  </div>

                  {/* Collapsible History Section Trigger */}
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                     <div className="flex items-center justify-between">
                        <button
                          onClick={() => setSelectedGroupId(isExpanded ? null : group.id)}
                          className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-500 focus:outline-none flex items-center justify-between w-full"
                         >
                          <span>View History</span>
                          <svg
                              className={`ml-1 h-4 w-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                          >
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <Link
                          href={`/dashboard/user/groups/${group.id}`}
                          className="ml-4 inline-flex justify-center items-center px-3 py-1 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-all duration-200 whitespace-nowrap"
                        >
                         Details
                        </Link>
                      </div>
                  </div>

                  {/* Collapsible History Content */}                  
                  {isExpanded && (
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                     {/* History Tabs */} 
                      <div className="mb-3 border-b border-gray-200 dark:border-gray-700">
                         <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                           <button
                             onClick={() => setHistoryTab('contributions')}
                             className={`${ historyTab === 'contributions' ? 'border-red-500 text-red-600 dark:border-red-400 dark:text-red-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600' } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-xs`}
                           > 
                            Contributions ({groupContributions.length})
                           </button>
                           <button
                             onClick={() => setHistoryTab('payouts')}
                             className={`${ historyTab === 'payouts' ? 'border-red-500 text-red-600 dark:border-red-400 dark:text-red-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600' } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-xs`}
                           >
                             Payouts ({groupPayouts.length})
                           </button>
                         </nav>
                      </div>

                      {/* History Table */} 
                      {historyTab === 'contributions' && (
                        groupContributions.length > 0 ? (
                          <div className="overflow-x-auto text-xs">
                            <table className="min-w-full">
                              <thead>
                                <tr className="text-left text-gray-500 dark:text-gray-400">
                                  <th className="pb-1 pr-2 font-normal">Date</th>
                                  <th className="pb-1 px-2 font-normal text-right">Amount</th>
                                  <th className="pb-1 pl-2 font-normal">Status</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {groupContributions.map(c => (
                                  <tr key={c.id} className="dark:text-gray-200">
                                    <td className="py-1 pr-2 whitespace-nowrap">{formatDate(c.date)}</td>
                                    <td className="py-1 px-2 whitespace-nowrap text-right">₦{c.amount.toLocaleString()}</td>
                                    <td className="py-1 pl-2 whitespace-nowrap">
                                      <span className={`px-1.5 py-0.5 inline-flex text-[10px] leading-4 font-medium rounded-full ${getStatusBadgeClass(c.status)}`}>
                                        {c.status}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p className="text-xs text-center text-gray-500 dark:text-gray-400 py-2">No contribution history for this group.</p>
                        )
                      )}

                      {historyTab === 'payouts' && (
                        groupPayouts.length > 0 ? (
                          <div className="overflow-x-auto text-xs">
                             <table className="min-w-full">
                              <thead>
                                <tr className="text-left text-gray-500 dark:text-gray-400">
                                  <th className="pb-1 pr-2 font-normal">Date</th>
                                  <th className="pb-1 px-2 font-normal text-right">Amount</th>
                                  <th className="pb-1 pl-2 font-normal">Status</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {groupPayouts.map(p => (
                                  <tr key={p.id} className="dark:text-gray-200">
                                    <td className="py-1 pr-2 whitespace-nowrap">{formatDate(p.date)}</td>
                                    <td className="py-1 px-2 whitespace-nowrap text-right">₦{p.amount.toLocaleString()}</td>
                                    <td className="py-1 pl-2 whitespace-nowrap">
                                      <span className={`px-1.5 py-0.5 inline-flex text-[10px] leading-4 font-medium rounded-full ${getStatusBadgeClass(p.status)}`}>
                                        {p.status}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p className="text-xs text-center text-gray-500 dark:text-gray-400 py-2">No payout history for this group.</p>
                        )
                      )}
                    </div>
                  )}
                   {/* Make Contribution Button */} 
                    {group.status === 'active' && ( 
                      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                          <Link
                              href={`/dashboard/user/groups/${group.id}/contribute`}
                              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-all duration-200"
                          >
                            Make Contribution
                          </Link>
                      </div>
                    )} 
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-900/30 rounded-[30px] overflow-hidden transition-colors duration-200">
            <div className="px-4 py-12 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No groups found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {searchTerm
                  ? 'No groups match your search.'
                  : activeTab === 'all'
                    ? "You haven't joined any Ajo groups yet."
                    : `You don't have any ${activeTab} groups.`}
              </p>
              <div className="mt-6">
                <Link
                  href="/dashboard/user/groups/join"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-all duration-200"
                >
                  Join a Group
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
