'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { userNavigation } from '@/constant/navItem';
import Link from 'next/link';

const mockUserData = {
  name: 'Amina Johnson',
};

export default function CreateGroup() {
  const [groupName, setGroupName] = useState('');
  const [contributionAmount, setContributionAmount] = useState('');
  const [frequency, setFrequency] = useState('Weekly'); // Weekly, Monthly
  const [numberOfMembers, setNumberOfMembers] = useState('');

  const handleCreateGroup = () => {
    console.log('Creating group:', { groupName, contributionAmount, frequency, numberOfMembers });
    // Add logic to create group and generate invite code/link
  };

  return (
    <DashboardLayout
      navigation={userNavigation}
      userType="user"
      userName={mockUserData.name}
      pageTitle="Create a New Ajo Group"
    >
      <div className="max-w-2xl mx-auto space-y-6">
          {/* Back Button */}
          <Link href="/dashboard/user/groups" className="text-sm text-red-600 dark:text-red-400 hover:underline flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to My Groups
          </Link>

        <div className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-900/30 rounded-[30px] p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Group Details</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleCreateGroup(); }} className="space-y-4">
            <div>
              <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Group Name</label>
              <input
                type="text"
                id="groupName"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="contributionAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contribution Amount (₦)</label>
              <input
                type="number"
                id="contributionAmount"
                value={contributionAmount}
                onChange={(e) => setContributionAmount(e.target.value)}
                required
                min="1"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contribution Frequency</label>
              <select
                id="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                required
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
              >
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>

            <div>
              <label htmlFor="numberOfMembers" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Target Number of Members</label>
              <input
                type="number"
                id="numberOfMembers"
                value={numberOfMembers}
                onChange={(e) => setNumberOfMembers(e.target.value)}
                required
                min="2"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-all duration-200"
              >
                Create Group & Get Invite Link
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
