'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { userNavigation } from '@/constant/navItem';
import Link from 'next/link';

const mockUserData = {
  name: 'Amina Johnson',
};

export default function JoinGroup() {
  const [inviteCode, setInviteCode] = useState('');

  const handleJoinWithCode = () => {
    console.log('Joining with code:', inviteCode);
    // Add logic to validate code and join group
  };

  // Mock public groups (optional feature)
  const mockPublicGroups = [
    { id: 101, name: 'Lagos Tech Startups Savings', members: 25, contribution: 10000 },
    { id: 102, name: 'Abuja Entrepreneurs Circle', members: 18, contribution: 15000 },
  ];

  return (
    <DashboardLayout
      navigation={userNavigation}
      userType="user"
      userName={mockUserData.name}
      pageTitle="Join a New Ajo Group"
    >
      <div className="max-w-2xl mx-auto space-y-6">
         {/* Back Button */}
         <Link href="/dashboard/user/groups" className="text-sm text-red-600 dark:text-red-400 hover:underline flex items-center mb-4">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
           </svg>
           Back to My Groups
         </Link>

        {/* Join via Invite Code */}
        <div className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-900/30 rounded-[30px] p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Join with Invite Code</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            If you have an invite code from an existing group, enter it below.
          </p>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              placeholder="Enter invite code"
              className="flex-grow block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm transition-colors duration-200"
            />
            <button
              onClick={handleJoinWithCode}
              disabled={!inviteCode}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Join Group
            </button>
          </div>
        </div>

        {/* Request via Agent (Placeholder) */}
        <div className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-900/30 rounded-[30px] p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Request to Join via Agent</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Contact your Ajo agent to request access to a group they manage.
          </p>
          {/* Placeholder for agent contact/request form */}
          <button
            // onClick={() => {/* Handle Agent Request */}}
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-all duration-200"
          >
            Find My Agent (Coming Soon)
          </button>
        </div>

        {/* Discover Public Groups (Optional Feature - Placeholder) */}
        {/* <div className="bg-white dark:bg-gray-800 shadow rounded-[30px] p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Discover Public Groups</h2>
          <ul className="space-y-3">
            {mockPublicGroups.map(group => (
              <li key={group.id} className="flex justify-between items-center p-3 border dark:border-gray-700 rounded-lg">
                <div>
                  <p className="font-medium dark:text-white">{group.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{group.members} Members | ₦{group.contribution.toLocaleString()} Contribution</p>
                </div>
                <button className="text-xs text-red-600 dark:text-red-400 hover:underline">Request Join</button>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </DashboardLayout>
  );
}
