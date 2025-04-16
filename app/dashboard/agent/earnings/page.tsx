'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { agentNavigation } from '@/constant/navItem';

// Mock data for earnings and commissions
const earningsSummary = {
  totalEarned: 125000,
  depositCommission: 75000,
  loanCommission: 30000,
  referralBonus: 20000,
  withdrawableBalance: 95000
};

const commissionHistory = [
  {
    id: 1,
    date: '2025-03-15',
    source: 'Deposit Commission',
    linkedTransaction: 'Deposit by Amina Johnson',
    amount: 2500,
    status: 'Paid'
  },
  {
    id: 2,
    date: '2025-03-10',
    source: 'Referral Bonus',
    linkedTransaction: 'New User: Chidi Okonkwo',
    amount: 5000,
    status: 'Paid'
  },
  {
    id: 3,
    date: '2025-03-05',
    source: 'Loan Commission',
    linkedTransaction: 'Loan Application for Fatima Bello',
    amount: 10000,
    status: 'Pending'
  },
  {
    id: 4,
    date: '2025-02-28',
    source: 'Deposit Commission',
    linkedTransaction: 'Deposit by Emeka Nwosu',
    amount: 3000,
    status: 'Paid'
  },
  {
    id: 5,
    date: '2025-02-20',
    source: 'Referral Bonus',
    linkedTransaction: 'New Agent: Zainab Adebayo',
    amount: 10000,
    status: 'Paid'
  },
];

export default function AgentEarnings() {
  const [activeTab, setActiveTab] = useState('summary');
  const [payoutAmount, setPayoutAmount] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  
  return (
    <DashboardLayout 
      navigation={agentNavigation}
      userType="agent"
      userName="Fatima Ibrahim"
      pageTitle="Earnings & Commission"
    >
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('summary')}
            className={`${
              activeTab === 'summary'
                ? 'border-red-500 dark:border-red-400 text-red-600 dark:text-red-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Earnings Summary
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`${
              activeTab === 'history'
                ? 'border-red-500 dark:border-red-400 text-red-600 dark:text-red-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Commission History
          </button>
          <button
            onClick={() => setActiveTab('payout')}
            className={`${
              activeTab === 'payout'
                ? 'border-red-500 dark:border-red-400 text-red-600 dark:text-red-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Request Payout
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'summary' && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px]">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Earned</h3>
                <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">₦{earningsSummary.totalEarned.toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px]">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Deposit Commission</h3>
                <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">₦{earningsSummary.depositCommission.toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px]">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Loan Commission</h3>
                <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">₦{earningsSummary.loanCommission.toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px]">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Referral Bonus</h3>
                <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">₦{earningsSummary.referralBonus.toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px]">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Withdrawable Balance</h3>
                <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">₦{earningsSummary.withdrawableBalance.toLocaleString()}</p>
                <button className="mt-4 text-sm bg-red-500 dark:bg-red-600 text-white rounded-[30px] px-4 py-2 hover:bg-red-600 dark:hover:bg-red-700"
                  onClick={() => setActiveTab('payout')}
                >
                  Request Payout
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'history' && (
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px]">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Commission History
              </h3>
              <div className="mt-5 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Source</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Linked Transaction</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {commissionHistory.map((commission) => (
                      <tr key={commission.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{commission.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{commission.source}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{commission.linkedTransaction}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">₦{commission.amount.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${commission.status === 'Paid' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300'}`}>{commission.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'payout' && (
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px]">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Request Payout
              </h3>
              <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                <p>Available Balance: ₦{earningsSummary.withdrawableBalance.toLocaleString()}</p>
              </div>
              <form className="mt-5 space-y-6">
                <div>
                  <label htmlFor="payoutAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Amount to Withdraw (₦)
                  </label>
                  <input
                    type="number"
                    id="payoutAmount"
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                    placeholder="10000"
                    min="500"
                    max={earningsSummary.withdrawableBalance}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-[30px] shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="bankAccount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Bank Account
                  </label>
                  <select
                    id="bankAccount"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white rounded-[30px]"
                  >
                    <option value="">Select Bank Account</option>
                    <option value="1">First Bank - **** 1234</option>
                    <option value="2">GT Bank - **** 5678</option>
                  </select>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={!payoutAmount || !bankAccount || parseInt(payoutAmount) > earningsSummary.withdrawableBalance}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-[30px] shadow-sm text-sm font-medium text-white bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                  >
                    Request Payout
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
