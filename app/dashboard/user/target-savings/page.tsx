'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout, NavItem, HomeIcon, GroupIcon, WalletIcon, LoanIcon, CreditIcon, HelpIcon, ProfileIcon, TargetIcon } from '@/components/DashboardLayout';
import { userNavigation } from '@/constant/navItem';

// Mock data
const mockUserData = {
  name: 'Amina Johnson',
  email: 'amina@example.com',
  balance: 25000
};

// Define the interface for TargetSaving
interface TargetSaving {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  startDate: string;
  endDate: string;
  frequency: string;
  status: 'active' | 'broken' | 'completed';
  type: 'personal' | 'group';
}

// Mock target savings data with type
const mockTargetSavings: TargetSaving[] = [
  {
    id: 1,
    name: 'New Smartphone',
    targetAmount: 150000,
    currentAmount: 75000,
    startDate: '2025-01-15',
    endDate: '2025-06-15',
    frequency: 'Weekly',
    status: 'active',
    type: 'personal'
  },
  {
    id: 2,
    name: 'Vacation Fund',
    targetAmount: 500000,
    currentAmount: 125000,
    startDate: '2025-02-01',
    endDate: '2025-12-31',
    frequency: 'Monthly',
    status: 'active',
    type: 'personal'
  },
  {
    id: 3,
    name: 'Emergency Fund',
    targetAmount: 300000,
    currentAmount: 300000,
    startDate: '2024-10-01',
    endDate: '2025-03-31',
    frequency: 'Bi-weekly',
    status: 'completed',
    type: 'personal'
  },
  {
    id: 4,
    name: 'Group Laptop Purchase',
    targetAmount: 200000,
    currentAmount: 50000,
    startDate: '2025-03-01',
    endDate: '2025-07-01',
    frequency: 'Weekly',
    status: 'active',
    type: 'group'
  }
];

export default function TargetSavings() {
  const [activeTab, setActiveTab] = useState<'personal' | 'group' | 'all'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showBreakModal, setShowBreakModal] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<TargetSaving | null>(null);
  const [newTargetName, setNewTargetName] = useState('');
  const [newTargetAmount, setNewTargetAmount] = useState('');
  const [newTargetDuration, setNewTargetDuration] = useState('');
  const [newTargetFrequency, setNewTargetFrequency] = useState('weekly');
  const [autoDebit, setAutoDebit] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');

  const handleCreateTarget = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating new personal target saving:', {
      name: newTargetName,
      amount: newTargetAmount,
      duration: newTargetDuration,
      frequency: newTargetFrequency,
      autoDebit: autoDebit
    });
    
    alert(`New personal target saving "${newTargetName}" has been created.`);
    resetForm();
    setShowCreateModal(false);
  };

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Depositing to target:', selectedTarget?.name, 'Amount:', depositAmount);
    
    alert(`Successfully deposited ₦${depositAmount} to "${selectedTarget?.name}".`);
    setDepositAmount('');
    setShowDepositModal(false);
  };

  const handleBreakTarget = () => {
    console.log('Breaking target:', selectedTarget?.name);
    
    alert(`Target "${selectedTarget?.name}" has been broken. ₦${selectedTarget?.currentAmount} will be transferred to your wallet.`);
    setShowBreakModal(false);
  };

  const resetForm = () => {
    setNewTargetName('');
    setNewTargetAmount('');
    setNewTargetDuration('');
    setNewTargetFrequency('weekly');
    setAutoDebit(false);
  };

  const openDepositModal = (target: TargetSaving) => {
    setSelectedTarget(target);
    setShowDepositModal(true);
  };

  const openBreakModal = (target: TargetSaving) => {
    setSelectedTarget(target);
    setShowBreakModal(true);
  };

  const calculateDaysLeft = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  const filteredTargets = mockTargetSavings.filter(target => 
    activeTab === 'all' || target.type === activeTab
  );

  return (
    <DashboardLayout 
      navigation={userNavigation}
      userType="user"
      userName={mockUserData.name}
      pageTitle="Target Savings"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">My Target Savings</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-[30px] shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Create New Target
        </button>
      </div>

      <div className="mt-4 border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('all')}
            className={`${activeTab === 'all' ? 'border-red-500 text-red-600 dark:border-red-400 dark:text-red-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            All Targets
          </button>
          <button
            onClick={() => setActiveTab('personal')}
            className={`${activeTab === 'personal' ? 'border-red-500 text-red-600 dark:border-red-400 dark:text-red-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Personal
          </button>
          <button
            onClick={() => setActiveTab('group')}
            className={`${activeTab === 'group' ? 'border-red-500 text-red-600 dark:border-red-400 dark:text-red-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Group
          </button>
        </nav>
      </div>

      {filteredTargets.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTargets.map((target) => (
            <Link key={target.id} href={`/dashboard/user/target-savings/${target.id}`} className="block hover:shadow-lg transition-shadow duration-200">
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-[30px] h-full flex flex-col">
                <div className="px-4 py-5 sm:p-6 flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{target.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      target.status === 'completed' 
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' 
                        : 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400'
                    }`}>
                      {target.status.charAt(0).toUpperCase() + target.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Progress</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {calculateProgress(target.currentAmount, target.targetAmount)}%
                      </span>
                    </div>
                    <div className="mt-2 relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                        <div 
                          style={{ width: `${calculateProgress(target.currentAmount, target.targetAmount)}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500 dark:bg-red-400"
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="block text-gray-500 dark:text-gray-400">Current</span>
                      <span className="block mt-1 font-medium text-gray-900 dark:text-white">₦{target.currentAmount.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 dark:text-gray-400">Target</span>
                      <span className="block mt-1 font-medium text-gray-900 dark:text-white">₦{target.targetAmount.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 dark:text-gray-400">Frequency</span>
                      <span className="block mt-1 font-medium text-gray-900 dark:text-white">{target.frequency}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 dark:text-gray-400">Days Left</span>
                      <span className="block mt-1 font-medium text-gray-900 dark:text-white">
                        {target.status === 'completed' ? 'Completed' : calculateDaysLeft(target.endDate)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-4 sm:px-6">
                  <div className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 flex items-center justify-end">
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-6 bg-white dark:bg-gray-800 shadow rounded-[30px] py-12 px-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.25V6.75a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25v7.5m16.5-7.5l-8.25 4.875L3.75 6.75m16.5 7.5v4.5a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25v-4.5m16.5 0l-8.25 4.875L3.75 14.25" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No target savings found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {activeTab === 'all' ? 'Get started by creating a new target.' : `You have no ${activeTab} target savings.`}
          </p>
          <div className="mt-6">
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-[30px] shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create New Target
            </button>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-[30px] px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600 dark:text-red-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Create New Target Saving
                  </h3>
                </div>
              </div>
              <form onSubmit={handleCreateTarget} className="mt-5 sm:mt-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="target-name" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Target Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="target-name"
                        id="target-name"
                        required
                        value={newTargetName}
                        onChange={(e) => setNewTargetName(e.target.value)}
                        className="shadow-sm focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-500 dark:focus:border-red-400 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-[30px]"
                        placeholder="e.g. New Smartphone, Vacation Fund"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="target-amount" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Target Amount (₦)
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="target-amount"
                        id="target-amount"
                        required
                        min="1000"
                        value={newTargetAmount}
                        onChange={(e) => setNewTargetAmount(e.target.value)}
                        className="shadow-sm focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-500 dark:focus:border-red-400 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-[30px]"
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="target-duration" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Duration (days)
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="target-duration"
                        id="target-duration"
                        required
                        min="30"
                        value={newTargetDuration}
                        onChange={(e) => setNewTargetDuration(e.target.value)}
                        className="shadow-sm focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-500 dark:focus:border-red-400 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-[30px]"
                        placeholder="Enter number of days"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="target-frequency" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Saving Frequency
                    </label>
                    <div className="mt-1">
                      <select
                        id="target-frequency"
                        name="target-frequency"
                        value={newTargetFrequency}
                        onChange={(e) => setNewTargetFrequency(e.target.value)}
                        className="shadow-sm focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-500 dark:focus:border-red-400 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-[30px]"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="bi-weekly">Bi-Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="auto-debit"
                        name="auto-debit"
                        type="checkbox"
                        checked={autoDebit}
                        onChange={(e) => setAutoDebit(e.target.checked)}
                        className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="auto-debit" className="font-medium text-gray-700 dark:text-gray-400">Enable Auto-Debit</label>
                      <p className="text-xs text-gray-500 dark:text-gray-500">Automatically debit from your wallet based on the selected frequency.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-[30px] border border-transparent shadow-sm px-4 py-2 bg-red-600 dark:bg-red-500 text-base font-medium text-white hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-red-400 sm:col-start-2 sm:text-sm"
                  >
                    Create Target
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setShowCreateModal(false);
                    }}
                    className="mt-3 w-full inline-flex justify-center rounded-[30px] border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-red-400 sm:mt-0 sm:col-start-1 sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showBreakModal && selectedTarget && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-[30px] px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600 dark:text-red-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Break Target Saving
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Are you sure you want to break your "{selectedTarget.name}" target? The current amount of ₦{selectedTarget.currentAmount.toLocaleString()} will be transferred to your wallet.
                    </p>
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      Note: A 2% penalty fee may apply for breaking the target before completion.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  onClick={handleBreakTarget}
                  className="w-full inline-flex justify-center rounded-[30px] border border-transparent shadow-sm px-4 py-2 bg-red-600 dark:bg-red-500 text-base font-medium text-white hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-red-400 sm:col-start-2 sm:text-sm"
                >
                  Break Target
                </button>
                <button
                  type="button"
                  onClick={() => setShowBreakModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-[30px] border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-red-400 sm:mt-0 sm:col-start-1 sm:text-sm"
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
