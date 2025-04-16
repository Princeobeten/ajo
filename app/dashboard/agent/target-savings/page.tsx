'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { agentNavigation } from '@/constant/navItem';

// Mock data for users and target savings
const mockUsers = [
  { id: 1, name: 'Amina Johnson', status: 'active' },
  { id: 2, name: 'Chidi Okonkwo', status: 'active' },
  { id: 3, name: 'Fatima Bello', status: 'active' },
  { id: 4, name: 'Emeka Nwosu', status: 'active' },
];

const mockTargetSavings: TargetSaving[] = [
  {
    id: 1,
    userId: 1,
    userName: 'Amina Johnson',
    name: 'New Smartphone',
    targetAmount: 150000,
    currentAmount: 75000,
    startDate: '2025-01-15',
    endDate: '2025-06-15',
    status: 'active',
    type: 'personal'
  },
  {
    id: 2,
    userId: 2,
    userName: 'Chidi Okonkwo',
    name: 'School Fees',
    targetAmount: 200000,
    currentAmount: 50000,
    startDate: '2025-02-01',
    endDate: '2025-08-01',
    status: 'active',
    type: 'personal'
  },
  {
    id: 3,
    userId: 3,
    userName: 'Fatima Bello',
    name: 'Business Capital',
    targetAmount: 300000,
    currentAmount: 90000,
    startDate: '2025-01-10',
    endDate: '2025-12-10',
    status: 'active',
    type: 'personal'
  },
  {
    id: 4,
    groupId: 101,
    groupName: 'Book Club',
    name: 'Charity Donation',
    targetAmount: 500,
    currentAmount: 100,
    startDate: '2025-05-01',
    endDate: '2025-07-31',
    status: 'active',
    type: 'group'
  },
  {
    id: 5,
    groupId: 102,
    groupName: 'Weekend Warriors',
    name: 'Camping Trip Gear',
    targetAmount: 800,
    currentAmount: 850,
    startDate: '2025-02-15',
    endDate: '2025-06-15',
    status: 'completed',
    type: 'group'
  },
  {
    id: 6,
    userId: 3,
    userName: 'Charlie Chaplin',
    name: 'Car Downpayment',
    targetAmount: 3000,
    currentAmount: 500,
    startDate: '2025-04-01',
    endDate: '2025-10-01',
    status: 'broken',
    type: 'personal'
  },
  {
    id: 7,
    groupId: 101,
    groupName: 'Book Club',
    name: 'End of Year Party',
    targetAmount: 300,
    currentAmount: 250,
    startDate: '2025-06-01',
    endDate: '2025-11-30',
    status: 'active',
    type: 'group'
  },
];

// Define the type for a target saving object
interface TargetSaving {
  id: number;
  userId?: number; // Optional for group savings
  userName?: string; // Optional for group savings
  groupId?: number; // Optional for personal savings
  groupName?: string; // Optional for personal savings
  name: string;
  targetAmount: number;
  currentAmount: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'broken' | 'completed';
  type: 'personal' | 'group'; // Type field
}

// Define the type for a user object (optional but good practice)
interface User {
  id: number;
  name: string;
  status: string;
}

export default function AgentTargetSavings() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<TargetSaving | null>(null);
  const [amount, setAmount] = useState('');
  const [targetName, setTargetName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <DashboardLayout 
      navigation={agentNavigation}
      userType="agent"
      userName="Fatima Ibrahim"
      pageTitle="Target Savings Management"
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
            Overview
          </button>
          <button
            onClick={() => setActiveTab('createPersonal')}
            className={`${ // Renamed tab
              activeTab === 'createPersonal'
                ? 'border-red-500 dark:border-red-400 text-red-600 dark:text-red-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Create Personal Target
          </button>
          {/* Add Create Group Target Tab */}
          <button
            onClick={() => setActiveTab('createGroup')}
            className={`${ // New tab
              activeTab === 'createGroup'
                ? 'border-red-500 dark:border-red-400 text-red-600 dark:text-red-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Create Group Target
          </button>
          <button
            onClick={() => setActiveTab('deposit')}
            className={`${
              activeTab === 'deposit'
                ? 'border-red-500 dark:border-red-400 text-red-600 dark:text-red-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Deposit to Target
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Target Savings Cards */}
            {mockTargetSavings.map(target => (
              <div key={target.id} className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-[30px]">
                <div className="p-5">
                  <div className='flex justify-between items-center flex-wrap-reverse'>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{target.name}</h3>
                  <span className={`text-sm ${target.type === 'personal' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'} rounded-[30px] px-3 py-1`}>
                      {target.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{target.type === 'personal' ? `User: ${target.userName}` : `Group: ${target.groupName}`}</p>
                  <div className='flex justify-between items-center mt-2'>
                    <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                      Target: ₦{target.targetAmount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Current: ₦{target.currentAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
                    <div 
                      className="bg-red-600 dark:bg-red-400 h-2.5 rounded-full" 
                      style={{ width: `${(target.currentAmount / target.targetAmount) * 100}%` }}
                    ></div>
                  </div>
                  <div className='flex justify-between items-center mt-2'>
                    <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                      Ends: {target.endDate}
                    </p>
                    <p className={`text-sm font-medium ${ 
                        target.status === 'completed' ? 'text-green-600 dark:text-green-400' : 
                        target.status === 'broken' ? 'text-red-600 dark:text-red-400' : 
                        'text-blue-500 dark:text-blue-400' 
                      }`}>
                      Status: {target.status}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <button className="text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-[30px] px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                      Details
                    </button>
                    <button className="text-sm bg-red-500 dark:bg-red-600 text-white rounded-[30px] px-4 py-2 hover:bg-red-600 dark:hover:bg-red-700">
                      Deposit
                    </button>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'createPersonal' && (
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px]">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Create Personal Target Saving
              </h3>
              <form className="mt-5 space-y-6">
                <div>
                  <label htmlFor="user" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Select User
                  </label>
                  <select
                    id="user"
                    value={selectedUser ? selectedUser.id : ''}
                    onChange={(e) => {
                      const userId = parseInt(e.target.value);
                      const user = mockUsers.find(u => u.id === userId) || null;
                      setSelectedUser(user);
                    }}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white rounded-[30px]"
                  >
                    <option value="">Select a user</option>
                    {mockUsers.map(user => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="targetName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Target Name
                  </label>
                  <input
                    type="text"
                    id="targetName"
                    value={targetName}
                    onChange={(e) => setTargetName(e.target.value)}
                    placeholder="e.g., New Phone"
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-[30px] shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Target Amount (₦)
                  </label>
                  <input
                    type="number"
                    id="targetAmount"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    placeholder="50000"
                    min="1000"
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-[30px] shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Duration (months)
                  </label>
                  <input
                    type="number"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="6"
                    min="1"
                    max="24"
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-[30px] shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={!selectedUser || !targetName || !targetAmount || !duration}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-[30px] shadow-sm text-sm font-medium text-white bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                  >
                    Create Target Saving
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {activeTab === 'createGroup' && (
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px]">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Create Group Target Saving
              </h3>
              <form className="mt-5 space-y-6">
                <div>
                  <label htmlFor="user" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Select User
                  </label>
                  <select
                    id="user"
                    value={selectedUser ? selectedUser.id : ''}
                    onChange={(e) => {
                      const userId = parseInt(e.target.value);
                      const user = mockUsers.find(u => u.id === userId) || null;
                      setSelectedUser(user);
                    }}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white rounded-[30px]"
                  >
                    <option value="">Select a user</option>
                    {mockUsers.map(user => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="targetName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Target Name
                  </label>
                  <input
                    type="text"
                    id="targetName"
                    value={targetName}
                    onChange={(e) => setTargetName(e.target.value)}
                    placeholder="e.g., New Phone"
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-[30px] shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Target Amount (₦)
                  </label>
                  <input
                    type="number"
                    id="targetAmount"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    placeholder="50000"
                    min="1000"
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-[30px] shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Duration (months)
                  </label>
                  <input
                    type="number"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="6"
                    min="1"
                    max="24"
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-[30px] shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={!selectedUser || !targetName || !targetAmount || !duration}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-[30px] shadow-sm text-sm font-medium text-white bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                  >
                    Create Target Saving
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {activeTab === 'deposit' && (
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px]">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Deposit to Target Saving
              </h3>
              <form className="mt-5 space-y-6">
                <div>
                  <label htmlFor="target" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Select Target Saving Plan
                  </label>
                  <select
                    id="target"
                    value={selectedTarget ? selectedTarget.id : ''}
                    onChange={(e) => {
                      const targetId = parseInt(e.target.value);
                      const target = mockTargetSavings.find(t => t.id === targetId) || null;
                      setSelectedTarget(target);
                    }}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white rounded-[30px]"
                  >
                    <option value="">Select a plan</option>
                    {mockTargetSavings.map(target => (
                      <option key={target.id} value={target.id}>{target.type === 'personal' ? `Personal: ${target.name} (${target.userName})` : `Group: ${target.name} (${target.groupName})`}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Deposit Amount (₦)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="5000"
                    min="100"
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-[30px] shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={!selectedTarget || !amount}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-[30px] shadow-sm text-sm font-medium text-white bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                  >
                    Deposit to Target
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
