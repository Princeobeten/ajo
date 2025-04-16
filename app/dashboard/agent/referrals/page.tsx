'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { agentNavigation } from '@/constant/navItem';

// Mock data for referrals and training materials
const referralData = {
  referralLink: 'https://digitalajo.com/refer/agent/fatima123',
  totalReferrals: 8,
  successfulReferrals: 5,
  bonusEarned: 25000
};

const referralHistory = [
  {
    id: 1,
    name: 'Chidi Okonkwo',
    type: 'User',
    date: '2025-02-15',
    status: 'Successful',
    bonus: 5000
  },
  {
    id: 2,
    name: 'Zainab Adebayo',
    type: 'Agent',
    date: '2025-02-10',
    status: 'Successful',
    bonus: 10000
  },
  {
    id: 3,
    name: 'Emeka Nwosu',
    type: 'User',
    date: '2025-02-05',
    status: 'Successful',
    bonus: 5000
  },
  {
    id: 4,
    name: 'Aisha Mohammed',
    type: 'User',
    date: '2025-01-28',
    status: 'Pending',
    bonus: 0
  },
  {
    id: 5,
    name: 'Ngozi Eze',
    type: 'User',
    date: '2025-01-20',
    status: 'Successful',
    bonus: 5000
  },
];

const trainingMaterials = [
  {
    id: 1,
    title: 'How to Onboard Users',
    type: 'Video',
    duration: '10 min',
    url: '#'
  },
  {
    id: 2,
    title: 'Creating and Managing Ajo Groups',
    type: 'PDF Guide',
    duration: '12 pages',
    url: '#'
  },
  {
    id: 3,
    title: 'Understanding Credit Scores',
    type: 'Video',
    duration: '8 min',
    url: '#'
  },
  {
    id: 4,
    title: 'Processing Deposits and Withdrawals',
    type: 'FAQ',
    duration: '5 min read',
    url: '#'
  },
  {
    id: 5,
    title: 'Loan Application Process',
    type: 'PDF Guide',
    duration: '10 pages',
    url: '#'
  },
];

export default function AgentReferrals() {
  const [activeTab, setActiveTab] = useState('referrals');
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralData.referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <DashboardLayout 
      navigation={agentNavigation}
      userType="agent"
      userName="Fatima Ibrahim"
      pageTitle="Referrals & Training"
    >
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('referrals')}
            className={`${
              activeTab === 'referrals'
                ? 'border-red-500 dark:border-red-400 text-red-600 dark:text-red-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Refer New Users
          </button>
          <button
            onClick={() => setActiveTab('training')}
            className={`${
              activeTab === 'training'
                ? 'border-red-500 dark:border-red-400 text-red-600 dark:text-red-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Training Materials
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'referrals' && (
          <div>
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px] mb-6">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Referral Program
                </h3>
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-[30px] p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Referrals</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{referralData.totalReferrals}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-[30px] p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Successful Referrals</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{referralData.successfulReferrals}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-[30px] p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Bonus Earned</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">₦{referralData.bonusEarned.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">Your Referral Link</h4>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={referralData.referralLink}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-[30px] text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="bg-red-500 dark:bg-red-600 text-white px-4 py-2 rounded-r-[30px] hover:bg-red-600 dark:hover:bg-red-700 text-sm font-medium"
                    >
                      {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Share this link with potential users or agents to earn referral bonuses.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px]">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Referral History
                </h3>
                <div className="mt-5 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date Referred</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Bonus Earned</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {referralHistory.map((referral) => (
                        <tr key={referral.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{referral.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{referral.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{referral.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${referral.status === 'Successful' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300'}`}>{referral.status}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">{referral.bonus > 0 ? `₦${referral.bonus.toLocaleString()}` : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'training' && (
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px]">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Training Materials
              </h3>
              <div className="mt-5 grid grid-cols-1 gap-4">
                {trainingMaterials.map((material) => (
                  <div key={material.id} className="border border-gray-200 dark:border-gray-700 rounded-[30px] p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div>
                      <h4 className="text-md font-medium text-gray-900 dark:text-white">{material.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{material.type} • {material.duration}</p>
                    </div>
                    <a href={material.url} className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium text-sm">
                      View Material
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
