'use client';

import { useState } from 'react';
import { DashboardLayout, NavItem, HomeIcon, GroupIcon, WalletIcon, LoanIcon, CreditIcon, HelpIcon, ProfileIcon } from '@/components/DashboardLayout';
import { userNavigation } from '@/constant/navItem';

// Mock data
const mockUserData = {
  name: 'Amina Johnson',
  walletBalance: 25000,
};

const mockTransactions = [
  {
    id: 1,
    type: 'Deposit',
    amount: 5000,
    date: '2025-04-10',
    description: 'Wallet funding',
    status: 'completed'
  },
  {
    id: 2,
    type: 'Contribution',
    amount: 5000,
    date: '2025-04-09',
    description: 'Market Women Savings',
    status: 'completed'
  },
  {
    id: 3,
    type: 'Loan Repayment',
    amount: 2500,
    date: '2025-04-05',
    description: 'Business Expansion Loan',
    status: 'completed'
  },
  {
    id: 4,
    type: 'Contribution',
    amount: 10000,
    date: '2025-04-01',
    description: 'Family Support Group',
    status: 'completed'
  },
  {
    id: 5,
    type: 'Withdrawal',
    amount: 15000,
    date: '2025-03-25',
    description: 'Agent: Fatima Ibrahim',
    status: 'completed'
  },
  {
    id: 6,
    type: 'Deposit',
    amount: 20000,
    date: '2025-03-20',
    description: 'Wallet funding',
    status: 'completed'
  }
];

export default function UserWallet() {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'deposits', 'withdrawals', 'contributions', 'loans'
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  
  const filteredTransactions = activeTab === 'all'
    ? mockTransactions
    : mockTransactions.filter(transaction => 
        activeTab === 'deposits' ? transaction.type === 'Deposit' :
        activeTab === 'withdrawals' ? transaction.type === 'Withdrawal' :
        activeTab === 'contributions' ? transaction.type === 'Contribution' :
        activeTab === 'loans' ? ['Loan Disbursement', 'Loan Repayment'].includes(transaction.type) :
        true
      );

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This would be replaced with actual API call
    console.log('Depositing amount:', depositAmount);
    
    // Show success message and close modal
    alert(`Successfully initiated deposit of ₦${depositAmount}. You will be redirected to the payment gateway.`);
    setDepositAmount('');
    setShowDepositModal(false);
  };
  
  const handleWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This would be replaced with actual API call
    console.log('Requesting withdrawal for amount:', withdrawAmount);
    
    // Show success message and close modal
    alert(`Withdrawal request for ₦${withdrawAmount} has been sent to an agent for processing.`);
    setWithdrawAmount('');
    setShowWithdrawalModal(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Deposit':
        return 'bg-green-100 text-green-800';
      case 'Withdrawal':
        return 'bg-red-100 text-red-800';
      case 'Contribution':
        return 'bg-blue-100 text-blue-800';
      case 'Loan Disbursement':
        return 'bg-purple-100 text-purple-800';
      case 'Loan Repayment':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Deposit':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        );
      case 'Withdrawal':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
          </svg>
        );
      case 'Contribution':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
          </svg>
        );
      case 'Loan Disbursement':
      case 'Loan Repayment':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-yellow-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
          </svg>
        );
    }
  };

  return (
    <DashboardLayout 
      navigation={userNavigation}
      userType="user"
      userName={mockUserData.name}
      pageTitle="Wallet"
    >
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-[30px] mb-6">
        <div className="bg-gradient-to-r from-red-500 to-pink-600 dark:from-red-600 dark:to-pink-800 px-4 py-8 sm:p-8 rounded-t-[30px]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <h3 className="text-lg leading-6 font-medium text-white">My Wallet</h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-4xl font-bold text-white">₦{mockUserData.walletBalance.toLocaleString()}</p>
                <p className="ml-2 text-sm text-white/80">Balance</p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 flex space-x-3">
              <button
                type="button"
                onClick={() => setShowDepositModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-[30px] shadow-sm text-white bg-white/20 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Deposit
              </button>
              <button
                type="button"
                onClick={() => setShowWithdrawalModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-[30px] shadow-sm text-white bg-white/20 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
          </svg>
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-[30px]">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Recent Transactions</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                Recent wallet transactions including deposits, withdrawals, and contributions
              </p>
            </div>
            <div>
              <button className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300">
                Sort By
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px overflow-x-auto">
            <button
              className={`text-sm font-medium py-4 px-1 sm:px-4 border-b-2 ${
                activeTab === 'all' 
                  ? 'border-red-500 text-red-600 dark:border-red-400 dark:text-red-400' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              } whitespace-nowrap`}
              onClick={() => setActiveTab('all')}
            >
              All Transactions
            </button>
            <button
              className={`text-sm font-medium py-4 px-1 sm:px-4 border-b-2 ${
                activeTab === 'deposits' 
                  ? 'border-red-500 text-red-600 dark:border-red-400 dark:text-red-400' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              } whitespace-nowrap`}
              onClick={() => setActiveTab('deposits')}
            >
              Deposits
            </button>
            <button
              className={`text-sm font-medium py-4 px-1 sm:px-4 border-b-2 ${
                activeTab === 'withdrawals' 
                  ? 'border-red-500 text-red-600 dark:border-red-400 dark:text-red-400' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              } whitespace-nowrap`}
              onClick={() => setActiveTab('withdrawals')}
            >
              Withdrawals
            </button>
            <button
              className={`text-sm font-medium py-4 px-1 sm:px-4 border-b-2 ${
                activeTab === 'contributions' 
                  ? 'border-red-500 text-red-600 dark:border-red-400 dark:text-red-400' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              } whitespace-nowrap`}
              onClick={() => setActiveTab('contributions')}
            >
              Contributions
            </button>
            <button
              className={`text-sm font-medium py-4 px-1 sm:px-4 border-b-2 ${
                activeTab === 'loans' 
                  ? 'border-red-500 text-red-600 dark:border-red-400 dark:text-red-400' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              } whitespace-nowrap`}
              onClick={() => setActiveTab('loans')}
            >
              Loans
            </button>
          </nav>
        </div>

        {/* Transaction List */}
        {filteredTransactions.length > 0 ? (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredTransactions.map((transaction) => (
              <li key={transaction.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 rounded-[30px] p-2 ${
                        transaction.type === 'Deposit' ? 'bg-green-100 dark:bg-green-900/20' : 
                        transaction.type === 'Withdrawal' ? 'bg-red-100 dark:bg-red-900/20' : 
                        transaction.type === 'Contribution' ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-yellow-100 dark:bg-yellow-900/20'
                      }`}>
                        {transaction.type === 'Deposit' && (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-600 dark:text-green-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                        )}
                        {transaction.type === 'Withdrawal' && (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-600 dark:text-red-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                          </svg>
                        )}
                        {transaction.type === 'Contribution' && (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600 dark:text-blue-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                          </svg>
                        )}
                        {transaction.type === 'Loan Repayment' && (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-yellow-600 dark:text-yellow-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{transaction.type}</p>
                          <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            transaction.status === 'completed' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          }`}>
                            {transaction.status}
                          </span>
                        </div>
                        <div className="flex text-sm text-gray-500 dark:text-gray-400">
                          <p>{transaction.description}</p>
                          <span className="mx-1">•</span>
                          <p>{new Date(transaction.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className={`text-sm font-medium ${
                        transaction.type === 'Deposit' || transaction.type === 'Loan Disbursement'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {transaction.type === 'Deposit' || transaction.type === 'Loan Disbursement'
                          ? '+'
                          : '-'}
                        ₦{transaction.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-4 py-5 sm:p-6 text-center text-gray-500 dark:text-gray-400">
            No transactions found for the selected filter.
          </div>
        )}
      </div>

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-[30px] px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-600 dark:text-green-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Deposit Funds
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enter the amount you wish to deposit into your wallet. You will be redirected to our payment gateway to complete the transaction.
                    </p>
                  </div>
                </div>
              </div>
              <form onSubmit={handleDeposit} className="mt-5 sm:mt-6">
                <div>
                  <label htmlFor="depositAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Amount (₦)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="depositAmount"
                      id="depositAmount"
                      required
                      min="500"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="shadow-sm focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-400 dark:focus:border-red-400 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-[30px] p-3"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    disabled={!depositAmount || Number(depositAmount) < 500}
                    className="w-full inline-flex justify-center rounded-[30px] border border-transparent shadow-sm px-4 py-2 bg-red-600 dark:bg-red-500 text-base font-medium text-white hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 dark:focus:ring-red-400 sm:col-start-2 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Deposit
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDepositModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-[30px] border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 dark:focus:ring-red-400 sm:mt-0 sm:col-start-1 sm:text-sm transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Withdrawal Modal */}
      {showWithdrawalModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-[30px] px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20">
                  {WalletIcon("h-6 w-6 text-red-600 dark:text-red-400")}
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Request Withdrawal
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enter the amount you wish to withdraw. An agent will process your request.
                    </p>
                  </div>
                </div>
              </div>
              <form onSubmit={handleWithdrawal} className="mt-5 sm:mt-6">
                <div>
                  <label htmlFor="withdrawAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Amount (₦)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="withdrawAmount"
                      id="withdrawAmount"
                      required
                      min="500"
                      max={mockUserData.walletBalance}
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="shadow-sm focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-400 dark:focus:border-red-400 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-[30px] p-3"
                      placeholder="Enter amount"
                    />
                  </div>
                  {parseFloat(withdrawAmount) > mockUserData.walletBalance && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      Amount exceeds your available balance.
                    </p>
                  )}
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Available balance: ₦{mockUserData.walletBalance.toLocaleString()}
                  </p>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    disabled={!withdrawAmount || parseFloat(withdrawAmount) > mockUserData.walletBalance || parseFloat(withdrawAmount) < 500}
                    className="w-full inline-flex justify-center rounded-[30px] border border-transparent shadow-sm px-4 py-2 bg-red-600 dark:bg-red-500 text-base font-medium text-white hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 dark:focus:ring-red-400 sm:col-start-2 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Request Withdrawal
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowWithdrawalModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-[30px] border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 dark:focus:ring-red-400 sm:mt-0 sm:col-start-1 sm:text-sm transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
