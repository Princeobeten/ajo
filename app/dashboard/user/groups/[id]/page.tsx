'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DashboardLayout } from '../../../../../components/DashboardLayout';
import { userNavigation } from '@/constant/navItem';

// Mock user data
const mockUserData = {
  name: 'Amina Johnson',
};

// Mock group data
const mockGroupData = {
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
  payoutOrder: 5,
  rules: [
    'Members must contribute ₦5,000 weekly.',
    'Contributions must be made by Sunday each week.',
    'Members receive payouts according to the rotation schedule.',
    'Late payments incur a ₦500 penalty fee.',
    'Three consecutive missed payments will result in expulsion from the group.',
  ],
  agentContact: '+234 987 6543 210',
  startDate: '2024-10-01',
  endDate: '2025-10-01',
  membersList: [
    { id: 1, name: 'Amina Johnson', position: 5, status: 'active' },
    { id: 2, name: 'Blessing Okafor', position: 1, status: 'active' },
    { id: 3, name: 'Chioma Eze', position: 2, status: 'active' },
    { id: 4, name: 'Damilola Adeyemi', position: 3, status: 'active' },
    { id: 5, name: 'Esther Nnamdi', position: 4, status: 'active' },
    { id: 6, name: 'Fatima Suleiman', position: 6, status: 'active' },
    { id: 7, name: 'Grace Okoro', position: 7, status: 'active' },
    { id: 8, name: 'Hannah Madaki', position: 8, status: 'active' },
    { id: 9, name: 'Ireti Badmus', position: 9, status: 'active' },
    { id: 10, name: 'Joy Emmanuel', position: 10, status: 'active' },
    { id: 11, name: 'Kafilat Ibrahim', position: 11, status: 'active' },
    { id: 12, name: 'Latifah Yusuf', position: 12, status: 'active' },
  ],
  contributionSchedule: [
    { date: '2025-04-20', status: 'upcoming' },
    { date: '2025-04-13', status: 'completed' },
    { date: '2025-04-06', status: 'completed' },
    { date: '2025-03-30', status: 'completed' },
    { date: '2025-03-23', status: 'completed' },
    { date: '2025-03-16', status: 'completed' },
    { date: '2025-03-09', status: 'completed' },
    { date: '2025-03-02', status: 'completed' },
  ],
  payoutSchedule: [
    { position: 1, member: 'Blessing Okafor', date: '2024-12-15', status: 'completed', amount: 60000 },
    { position: 2, member: 'Chioma Eze', date: '2025-01-19', status: 'completed', amount: 60000 },
    { position: 3, member: 'Damilola Adeyemi', date: '2025-02-23', status: 'completed', amount: 60000 },
    { position: 4, member: 'Esther Nnamdi', date: '2025-03-30', status: 'completed', amount: 60000 },
    { position: 5, member: 'Amina Johnson', date: '2025-06-15', status: 'upcoming', amount: 60000 },
    { position: 6, member: 'Fatima Suleiman', date: '2025-07-20', status: 'upcoming', amount: 60000 },
    { position: 7, member: 'Grace Okoro', date: '2025-08-24', status: 'upcoming', amount: 60000 },
    { position: 8, member: 'Hannah Madaki', date: '2025-09-28', status: 'upcoming', amount: 60000 },
    { position: 9, member: 'Ireti Badmus', date: '2025-11-02', status: 'upcoming', amount: 60000 },
    { position: 10, member: 'Joy Emmanuel', date: '2025-12-07', status: 'upcoming', amount: 60000 },
    { position: 11, member: 'Kafilat Ibrahim', date: '2026-01-11', status: 'upcoming', amount: 60000 },
    { position: 12, member: 'Latifah Yusuf', date: '2026-02-15', status: 'upcoming', amount: 60000 },
  ]
};

export default function GroupDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'members', 'schedule'
  const groupId = parseInt(params.id);
  
  // In a real application, you would fetch this data based on the groupId
  // For now, we'll just use our mock data
  const group = mockGroupData;
  
  // Format date string to local date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  // Get current member position
  const currentMemberPosition = group.membersList.find(member => member.name === mockUserData.name)?.position || 0;
  
  // Get user payout information
  const userPayout = group.payoutSchedule.find(payout => payout.position === currentMemberPosition);

  return (
    <DashboardLayout 
      navigation={userNavigation}
      userType="user"
      userName={mockUserData.name}
      pageTitle={`Group: ${group.name}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with back button and group name */}
        <div className="mb-6 flex flex-wrap gap-2 items-center">
          <button
            onClick={() => router.back()}
            className="mr-4 inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="-ml-0.5 mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              {group.name}
              <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusBadgeClass(group.status)}`}>
                {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
              </span>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{group.description}</p>
          </div>
        </div>

        {/* Group Data Summary */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-[30px] mb-6 overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Group Summary
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-[30px] p-4">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Your Position</div>
                <div className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
                  {currentMemberPosition} of {group.members}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-[30px] p-4">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Weekly Contribution</div>
                <div className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
                  ₦{group.contributionAmount.toLocaleString()}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-[30px] p-4">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Next Contribution Date</div>
                <div className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
                  {formatDate(group.nextContribution)}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-[30px] p-4">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Contributed</div>
                <div className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
                  ₦{group.totalContributed.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Your Payout */}
        {userPayout && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-[30px] mb-6 overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Your Payout Information
              </h3>
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/30 rounded-[30px] p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-red-600 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-red-800 dark:text-red-400">Estimated Payout Amount</h4>
                    <div className="mt-1 text-2xl font-bold text-red-900 dark:text-red-300">₦{userPayout.amount.toLocaleString()}</div>
                    <p className="mt-1 text-sm text-red-700 dark:text-red-400">
                      Expected payout date: <span className="font-medium">{formatDate(userPayout.date)}</span>
                    </p>
                    <div className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(userPayout.status)}`}>
                      {userPayout.status.charAt(0).toUpperCase() + userPayout.status.slice(1)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-[30px] overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex">
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-red-500 text-red-600 dark:text-red-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'members'
                    ? 'border-red-500 text-red-600 dark:text-red-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => setActiveTab('members')}
              >
                Members
              </button>
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'schedule'
                    ? 'border-red-500 text-red-600 dark:text-red-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => setActiveTab('schedule')}
              >
                Schedule
              </button>
            </nav>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="px-4 py-5 sm:p-6">
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Group Details</h3>
                <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 gap-x-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Agent Name</h4>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{group.agent}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Agent Contact</h4>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{group.agentContact}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Contribution Frequency</h4>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{group.frequency}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Group Start Date</h4>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{formatDate(group.startDate)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Group End Date</h4>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{formatDate(group.endDate)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Your Membership Date</h4>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{formatDate(group.membershipDate)}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Group Rules</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  {group.rules.map((rule, index) => (
                    <li key={index}>{rule}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/dashboard/user/groups/${group.id}/contribute`}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                  >
                    Make Contribution
                  </Link>
                  <Link
                    href={`/dashboard/user/support?topic=group&id=${group.id}`}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                  >
                    Contact Support
                  </Link>
                  <button
                    className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                  >
                    Leave Group
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Members Tab */}
          {activeTab === 'members' && (
            <div className="px-4 py-5 sm:p-6">
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Group Members ({group.members})</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  Your Position: {currentMemberPosition}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Position
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {group.membersList.map((member) => (
                      <tr 
                        key={member.id} 
                        className={member.name === mockUserData.name ? 'bg-red-50 dark:bg-red-900/10' : ''}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {member.position}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {member.name}
                          {member.name === mockUserData.name && (
                            <span className="ml-2 text-xs text-red-600 dark:text-red-400">(You)</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(member.status)}`}>
                            {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div className="px-4 py-5 sm:p-6">
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Contribution Schedule</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {group.contributionSchedule.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {formatDate(item.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            ₦{group.contributionAmount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(item.status)}`}>
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Payout Schedule</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          Position
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          Member
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {group.payoutSchedule.map((payout) => (
                        <tr 
                          key={payout.position} 
                          className={payout.member === mockUserData.name ? 'bg-red-50 dark:bg-red-900/10' : ''}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {payout.position}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {payout.member}
                            {payout.member === mockUserData.name && (
                              <span className="ml-2 text-xs text-red-600 dark:text-red-400">(You)</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {formatDate(payout.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            ₦{payout.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(payout.status)}`}>
                              {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
