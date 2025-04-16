'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { agentNavigation } from '@/constant/navItem';

// Mock data for wallet and transactions
const walletData = {
  currentBalance: 185000,
  totalCommissions: 125000,
  availableWithdrawal: 95000
};

const recentTransactions = [
  {
    id: 1,
    date: '2025-03-15',
    type: 'Commission',
    description: 'Deposit by Amina Johnson',
    amount: 2500,
    status: 'Completed'
  },
  {
    id: 2,
    date: '2025-03-10',
    type: 'Referral Bonus',
    description: 'New User: Chidi Okonkwo',
    amount: 5000,
    status: 'Completed'
  },
  {
    id: 3,
    date: '2025-03-05',
    type: 'Commission',
    description: 'Loan Application for Fatima Bello',
    amount: 10000,
    status: 'Pending'
  },
  {
    id: 4,
    date: '2025-02-28',
    type: 'Payout',
    description: 'Withdrawal to Bank Account',
    amount: -30000,
    status: 'Completed'
  },
  {
    id: 5,
    date: '2025-02-20',
    type: 'Deposit',
    description: 'Fund Wallet',
    amount: 50000,
    status: 'Completed'
  },
];

export default function AgentWallet() {
  const [activeTab, setActiveTab] = useState('overview');
  const [fundAmount, setFundAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  
  return (
    <DashboardLayout 
      navigation={agentNavigation}
      userType="agent"
      userName="Fatima Ibrahim"
      pageTitle="Agent Wallet"
    >
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`${
              activeTab === 'overview'
                ? 'border-red-500 dark:border-red-400 text-red-600 dark:text-red-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Wallet Overview
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`${
              activeTab === 'transactions'
                ? 'border-red-500 dark:border-red-400 text-red-600 dark:text-red-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Transactions
          </button>
          <button
            onClick={() => setActiveTab('fund')}
            className={`${
              activeTab === 'fund'
                ? 'border-red-500 dark:border-red-400 text-red-600 dark:text-red-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Fund Wallet
          </button>
          <button
            onClick={() => setActiveTab('withdraw')}
            className={`${
              activeTab === 'withdraw'
                ? 'border-red-500 dark:border-red-400 text-red-600 dark:text-red-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Withdraw
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-6">
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px]">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Current Balance</h3>
                  <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">₦{walletData.currentBalance.toLocaleString()}</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px]">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Commissions Earned</h3>
                  <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">₦{walletData.totalCommissions.toLocaleString()}</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px]">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Available for Withdrawal</h3>
                  <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">₦{walletData.availableWithdrawal.toLocaleString()}</p>
                  <button className="mt-4 text-sm bg-red-500 dark:bg-red-600 text-white rounded-[30px] px-4 py-2 hover:bg-red-600 dark:hover:bg-red-700"
                    onClick={() => setActiveTab('withdraw')}
                  >
                    Withdraw Funds
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px]">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Recent Transactions
                  </h3>
                  <button className="text-sm text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                    onClick={() => setActiveTab('transactions')}
                  >
                    View All
                  </button>
                </div>
                <div className="mt-5 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {recentTransactions.slice(0, 3).map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{transaction.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{transaction.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{transaction.description}</td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${transaction.amount < 0 ? 'text-red-500 dark:text-red-400' : 'text-green-500 dark:text-green-400'}`}>₦{Math.abs(transaction.amount).toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.status === 'Completed' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300'}`}>{transaction.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'transactions' && (
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px]">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Transaction History
              </h3>
              <div className="mt-5 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {recentTransactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{transaction.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{transaction.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{transaction.description}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${transaction.amount < 0 ? 'text-red-500 dark:text-red-400' : 'text-green-500 dark:text-green-400'}`}>₦{Math.abs(transaction.amount).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.status === 'Completed' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300'}`}>{transaction.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'fund' && (
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px]">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Fund Wallet
              </h3>
              <form className="mt-5 space-y-6">
                <div>
                  <label htmlFor="fundAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Amount to Fund (₦)
                  </label>
                  <input
                    type="number"
                    id="fundAmount"
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                    placeholder="10000"
                    min="500"
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-[30px] shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Payment Method
                  </label>
                  <select
                    id="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white rounded-[30px]"
                  >
                    <option value="">Select Payment Method</option>
                    <option value="card">Card Payment</option>
                    <option value="bank">Bank Transfer</option>
                  </select>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={!fundAmount || !paymentMethod}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-[30px] shadow-sm text-sm font-medium text-white bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                  >
                    Fund Wallet
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {activeTab === 'withdraw' && (
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px]">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Withdraw Funds
              </h3>
              <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                <p>Available Balance: ₦{walletData.availableWithdrawal.toLocaleString()}</p>
              </div>
              <form className="mt-5 space-y-6">
                <div>
                  <label htmlFor="withdrawAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Amount to Withdraw (₦)
                  </label>
                  <input
                    type="number"
                    id="withdrawAmount"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="10000"
                    min="500"
                    max={walletData.availableWithdrawal}
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
                    disabled={!withdrawAmount || !bankAccount || parseInt(withdrawAmount) > walletData.availableWithdrawal}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-[30px] shadow-sm text-sm font-medium text-white bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                  >
                    Withdraw Funds
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
