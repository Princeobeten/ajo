'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { agentNavigation } from '@/constant/navItem';
import Link from 'next/link';

// Mock agent data
const mockAgentData = {
  name: 'Fatima Ibrahim',
  email: 'fatima.ibrahim@example.com',
  phone: '+234 801 234 5678',
  balance: 45000,
  commission: 12500,
  activeGroups: 3,
  totalUsers: 28
};

// Mock users data
const mockUsers = [
  {
    id: 1,
    name: 'Amina Johnson',
    phone: '+234 802 345 6789',
    groups: ['Market Women Savings', 'Family Support'],
    hasTargetSavings: true,
    status: 'active'
  },
  {
    id: 2,
    name: 'Chidi Okonkwo',
    phone: '+234 803 456 7890',
    groups: ['Community Traders'],
    hasTargetSavings: false,
    status: 'active'
  },
  {
    id: 3,
    name: 'Ngozi Eze',
    phone: '+234 804 567 8901',
    groups: ['Market Women Savings'],
    hasTargetSavings: true,
    status: 'active'
  },
  {
    id: 4,
    name: 'Oluwaseun Adeyemi',
    phone: '+234 805 678 9012',
    groups: ['Family Support'],
    hasTargetSavings: false,
    status: 'inactive'
  },
  {
    id: 5,
    name: 'Blessing Nnamdi',
    phone: '+234 806 789 0123',
    groups: ['Community Traders', 'Family Support'],
    hasTargetSavings: true,
    status: 'active'
  }
];

// Mock deposit history
const mockDepositHistory = [
  {
    id: 1,
    userId: 1,
    userName: 'Amina Johnson',
    amount: 5000,
    destination: 'Market Women Savings (Group)',
    date: '2025-04-12',
    status: 'completed',
    commission: 250
  },
  {
    id: 2,
    userId: 3,
    userName: 'Ngozi Eze',
    amount: 10000,
    destination: 'New Smartphone (Target Saving)',
    date: '2025-04-11',
    status: 'completed',
    commission: 500
  },
  {
    id: 3,
    userId: 2,
    userName: 'Chidi Okonkwo',
    amount: 7500,
    destination: 'Community Traders (Group)',
    date: '2025-04-10',
    status: 'completed',
    commission: 375
  },
  {
    id: 4,
    userId: 5,
    userName: 'Blessing Nnamdi',
    amount: 15000,
    destination: 'Wallet',
    date: '2025-04-09',
    status: 'completed',
    commission: 750
  },
  {
    id: 5,
    userId: 1,
    userName: 'Amina Johnson',
    amount: 5000,
    destination: 'Family Support (Group)',
    date: '2025-04-08',
    status: 'completed',
    commission: 250
  }
];

// Mock groups data
const mockGroups = [
  { id: 1, name: 'Market Women Savings', contributionAmount: 5000, frequency: 'Weekly' },
  { id: 2, name: 'Community Traders', contributionAmount: 7500, frequency: 'Weekly' },
  { id: 3, name: 'Family Support', contributionAmount: 10000, frequency: 'Monthly' }
];

// Mock target savings data
const mockTargetSavings = [
  { id: 1, userId: 1, name: 'New Smartphone', targetAmount: 150000, currentAmount: 75000 },
  { id: 2, userId: 3, name: 'Vacation Fund', targetAmount: 300000, currentAmount: 120000 },
  { id: 3, userId: 5, name: 'Education Fund', targetAmount: 500000, currentAmount: 200000 }
];

export default function AgentDeposits() {
  const [activeTab, setActiveTab] = useState('deposit'); // 'deposit', 'history'
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [destinationType, setDestinationType] = useState(''); // 'group', 'target', 'wallet'
  const [selectedDestination, setSelectedDestination] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterDestination, setFilterDestination] = useState('all'); // 'all', 'group', 'target', 'wallet'

  // Handle deposit form submission
  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  // Handle deposit confirmation
  const handleConfirmDeposit = () => {
    // Simulate API request
    console.log('Deposit confirmed:', {
      user: selectedUser,
      destinationType,
      destination: selectedDestination,
      amount
    });
    
    // Show success message and reset form
    alert('Deposit successful!');
    setSelectedUser(null);
    setDestinationType('');
    setSelectedDestination(null);
    setAmount('');
    setShowConfirmModal(false);
  };

  // Filter deposit history based on search term, date, and destination
  const filteredDepositHistory = mockDepositHistory.filter(deposit => {
    const matchesSearch = deposit.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = filterDate ? deposit.date === filterDate : true;
    const matchesDestination = filterDestination === 'all' ? true : 
      filterDestination === 'group' ? deposit.destination.includes('Group') :
      filterDestination === 'target' ? deposit.destination.includes('Target') :
      deposit.destination === 'Wallet';
    
    return matchesSearch && matchesDate && matchesDestination;
  });

  return (
    <DashboardLayout 
      navigation={agentNavigation}
      userType="agent"
      userName={mockAgentData.name}
      pageTitle="Deposits Portal"
    >
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('deposit')}
            className={`${
              activeTab === 'deposit'
                ? 'border-red-500 dark:border-red-400 text-red-600 dark:text-red-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Make Deposit
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`${
              activeTab === 'history'
                ? 'border-red-500 dark:border-red-400 text-red-600 dark:text-red-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Deposit History
          </button>
        </nav>
      </div>

      {/* Make Deposit Form */}
      {activeTab === 'deposit' && (
        <div className="mt-6">
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px]">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Make a Deposit for User
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
                <p>
                  Select a user and destination to make a deposit. You will earn a commission on each deposit.
                </p>
              </div>
              <form onSubmit={handleDeposit} className="mt-5">
                <div className="space-y-6">
                  {/* Select User */}
                  <div>
                    <label htmlFor="user" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Select User
                    </label>
                    <div className="mt-1">
                      <select
                        id="user"
                        name="user"
                        required
                        value={selectedUser ? selectedUser.id : ''}
                        onChange={(e) => {
                          const userId = parseInt(e.target.value);
                          const user = mockUsers.find(u => u.id === userId);
                          setSelectedUser(user);
                          setDestinationType('');
                          setSelectedDestination(null);
                        }}
                        className="shadow-sm focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-500 dark:focus:border-red-400 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-[30px] p-2"
                      >
                        <option value="">Select a user</option>
                        {mockUsers
                          .filter(user => user.status === 'active')
                          .map(user => (
                            <option key={user.id} value={user.id}>
                              {user.name} ({user.phone})
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  {/* Select Destination Type */}
                  {selectedUser && (
                    <div>
                      <label htmlFor="destination-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Destination Type
                      </label>
                      <div className="mt-1">
                        <select
                          id="destination-type"
                          name="destination-type"
                          required
                          value={destinationType}
                          onChange={(e) => {
                            setDestinationType(e.target.value);
                            setSelectedDestination(null);
                          }}
                          className="shadow-sm focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-500 dark:focus:border-red-400 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-[30px] p-2"
                        >
                          <option value="">Select destination type</option>
                          {selectedUser.groups.length > 0 && <option value="group">Ajo Group</option>}
                          {selectedUser.hasTargetSavings && <option value="target">Target Saving</option>}
                          <option value="wallet">Wallet</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Select Specific Destination */}
                  {selectedUser && destinationType === 'group' && (
                    <div>
                      <label htmlFor="group" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Select Group
                      </label>
                      <div className="mt-1">
                        <select
                          id="group"
                          name="group"
                          required
                          value={selectedDestination ? selectedDestination.id : ''}
                          onChange={(e) => {
                            const groupId = parseInt(e.target.value);
                            const group = mockGroups.find(g => g.id === groupId);
                            setSelectedDestination(group);
                          }}
                          className="shadow-sm focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-500 dark:focus:border-red-400 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-[30px] p-2"
                        >
                          <option value="">Select a group</option>
                          {mockGroups
                            .filter(group => selectedUser.groups.includes(group.name))
                            .map(group => (
                              <option key={group.id} value={group.id}>
                                {group.name} (₦{group.contributionAmount.toLocaleString()} {group.frequency})
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Select Target Saving */}
                  {selectedUser && destinationType === 'target' && (
                    <div>
                      <label htmlFor="target" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Select Target Saving
                      </label>
                      <div className="mt-1">
                        <select
                          id="target"
                          name="target"
                          required
                          value={selectedDestination ? selectedDestination.id : ''}
                          onChange={(e) => {
                            const targetId = parseInt(e.target.value);
                            const target = mockTargetSavings.find(t => t.id === targetId);
                            setSelectedDestination(target);
                          }}
                          className="shadow-sm focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-500 dark:focus:border-red-400 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-[30px] p-2"
                        >
                          <option value="">Select a target saving</option>
                          {mockTargetSavings
                            .filter(target => target.userId === selectedUser.id)
                            .map(target => (
                              <option key={target.id} value={target.id}>
                                {target.name} (₦{target.currentAmount.toLocaleString()} / ₦{target.targetAmount.toLocaleString()})
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Amount Input */}
                  {selectedUser && destinationType && (destinationType !== 'group' || selectedDestination) && (
                    <div>
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Amount (₦)
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="amount"
                          id="amount"
                          required
                          min={destinationType === 'group' && selectedDestination ? selectedDestination.contributionAmount : 500}
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="shadow-sm focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-500 dark:focus:border-red-400 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-[30px] p-2"
                          placeholder="Enter amount"
                        />
                      </div>
                      {destinationType === 'group' && selectedDestination && (
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          Minimum contribution: ₦{selectedDestination.contributionAmount.toLocaleString()}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Submit Button */}
                  {selectedUser && destinationType && (destinationType !== 'group' || selectedDestination) && amount && (
                    <div>
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-[30px] shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600"
                      >
                        Make Deposit
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Deposit History */}
      {activeTab === 'history' && (
        <div className="mt-6">
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px]">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Deposit History
              </h3>
              
              {/* Filters */}
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {/* Search by User */}
                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Search by User
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="search"
                      id="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="shadow-sm focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-500 dark:focus:border-red-400 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-[30px] p-2"
                      placeholder="Search by name"
                    />
                  </div>
                </div>

                {/* Filter by Date */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Filter by Date
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      name="date"
                      id="date"
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                      className="shadow-sm focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-500 dark:focus:border-red-400 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-[30px] p-2"
                    />
                  </div>
                </div>

                {/* Filter by Destination */}
                <div>
                  <label htmlFor="destination" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Filter by Destination
                  </label>
                  <div className="mt-1">
                    <select
                      id="destination"
                      name="destination"
                      value={filterDestination}
                      onChange={(e) => setFilterDestination(e.target.value)}
                      className="shadow-sm focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-500 dark:focus:border-red-400 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-[30px] p-2"
                    >
                      <option value="all">All Destinations</option>
                      <option value="group">Ajo Groups</option>
                      <option value="target">Target Savings</option>
                      <option value="wallet">Wallet</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Deposit History Table */}
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Destination
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Commission
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredDepositHistory.length > 0 ? (
                      filteredDepositHistory.map((deposit) => (
                        <tr key={deposit.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(deposit.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {deposit.userName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              ID: {deposit.userId}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            ₦{deposit.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {deposit.destination}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
                              {deposit.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            ₦{deposit.commission.toLocaleString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">
                          No deposits found matching your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Deposit Modal */}
      {showConfirmModal && (
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
                    Confirm Deposit
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Please confirm the deposit details:
                    </p>
                    <div className="mt-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-[30px]">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-left text-gray-500 dark:text-gray-400">User:</div>
                        <div className="text-right font-medium text-gray-900 dark:text-white">{selectedUser?.name}</div>
                        
                        <div className="text-left text-gray-500 dark:text-gray-400">Destination:</div>
                        <div className="text-right font-medium text-gray-900 dark:text-white">
                          {destinationType === 'group' ? selectedDestination?.name + ' (Group)' : 
                           destinationType === 'target' ? selectedDestination?.name + ' (Target)' : 
                           'Wallet'}
                        </div>
                        
                        <div className="text-left text-gray-500 dark:text-gray-400">Amount:</div>
                        <div className="text-right font-medium text-gray-900 dark:text-white">₦{parseInt(amount).toLocaleString()}</div>
                        
                        <div className="text-left text-gray-500 dark:text-gray-400">Commission (5%):</div>
                        <div className="text-right font-medium text-gray-900 dark:text-white">₦{(parseInt(amount) * 0.05).toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  onClick={handleConfirmDeposit}
                  className="w-full inline-flex justify-center rounded-[30px] border border-transparent shadow-sm px-4 py-2 bg-red-600 dark:bg-red-500 text-base font-medium text-white hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-red-400 sm:col-start-2 sm:text-sm"
                >
                  Confirm Deposit
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
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
