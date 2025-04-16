'use client';

import { useState } from 'react';
import { NavItem, HomeIcon, GroupIcon, WalletIcon, LoanIcon, CreditIcon, HelpIcon, UsersIcon, ProfileIcon, DashboardLayout } from '@/components/DashboardLayout';
import { agentNavigation } from '@/constant/navItem';

// Mock agent data
const mockAgentData = {
  name: 'Fatima Ibrahim',
  email: 'fatima@example.com',
  phone: '+234 987 6543 210',
  address: '123 Lagos Street, Lagos, Nigeria',
  nationalId: 'NG-ID-12345678',
  accountDetails: {
    bank: 'First Bank',
    accountNumber: '3021568974',
    accountName: 'Fatima Ibrahim'
  },
  joinedDate: '2024-09-01',
  status: 'active',
  creditScore: 810,
  groups: 3,
  users: 52,
  profileImage: null, // Will use initials placeholder
  coverPhoto: null, // Will use gradient placeholder
  bio: 'Agent specializing in community savings groups and financial inclusion for women entrepreneurs',
  role: 'Community Savings Agent & Financial Advisor'
};

// Mock commission history
const mockCommissions = [
  {
    id: 1,
    month: 'April 2025',
    amount: 82500,
    status: 'pending',
    groups: [
      { name: 'Market Women Savings', amount: 24000 },
      { name: 'Transport Workers Alliance', amount: 40000 },
      { name: 'Tech Professionals', amount: 18500 }
    ],
    paymentDate: ''
  },
  {
    id: 2,
    month: 'March 2025',
    amount: 75000,
    status: 'paid',
    groups: [
      { name: 'Market Women Savings', amount: 20000 },
      { name: 'Transport Workers Alliance', amount: 35000 },
      { name: 'Tech Professionals', amount: 20000 }
    ],
    paymentDate: '2025-04-05'
  },
  {
    id: 3,
    month: 'February 2025',
    amount: 68000,
    status: 'paid',
    groups: [
      { name: 'Market Women Savings', amount: 18000 },
      { name: 'Transport Workers Alliance', amount: 32000 },
      { name: 'Tech Professionals', amount: 18000 }
    ],
    paymentDate: '2025-03-05'
  }
];


export default function AgentProfile() {
  const [activeTab, setActiveTab] = useState('personal'); // 'personal', 'account', 'commissions', 'security'
  const [isEditing, setIsEditing] = useState(false);
  
  // Edit form state
  const [formData, setFormData] = useState({
    name: mockAgentData.name,
    email: mockAgentData.email,
    phone: mockAgentData.phone,
    address: mockAgentData.address,
    bank: mockAgentData.accountDetails.bank,
    accountNumber: mockAgentData.accountDetails.accountNumber,
    accountName: mockAgentData.accountDetails.accountName
  });
  
  // Security form state
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle security form input change
  const handleSecurityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecurityForm({
      ...securityForm,
      [name]: value
    });
  };
  
  // Handle save profile
  const handleSaveProfile = () => {
    alert('Profile updated successfully!');
    setIsEditing(false);
  };
  
  // Handle password change
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    alert('Password changed successfully!');
    
    setSecurityForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };
  
  return (
    <DashboardLayout 
      navigation={agentNavigation}
      userType="agent"
      userName={mockAgentData.name}
      pageTitle="My Profile"
    >
      {/* Profile Header with Cover Photo & Avatar - Portfolio Style */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-[30px] overflow-hidden mb-6">
        {/* Cover Photo Section */}
        <div className="h-48 sm:h-56 relative w-full">
          {mockAgentData.coverPhoto ? (
            <div className="h-full w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-400/80 to-purple-500/80 mix-blend-overlay z-10"></div>
              <img 
                src={mockAgentData.coverPhoto} 
                alt="" 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-red-400 to-purple-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full opacity-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Profile Info Section */}
        <div className="px-6 sm:px-10 pb-8 relative">
          <div className="flex flex-col sm:flex-row">
            {/* Profile Image - Large circular version on left */}
            <div className="flex-shrink-0 -mt-20 z-20">
              <div className="h-36 w-36 rounded-full ring-4 ring-white dark:ring-gray-800 overflow-hidden shadow-xl bg-white dark:bg-gray-700">
                {mockAgentData.profileImage ? (
                  <img
                    src={mockAgentData.profileImage}
                    alt={mockAgentData.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-5xl font-bold">
                    {mockAgentData.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            {/* Name, Bio, and Stats - Stacked beside profile pic */}
            <div className="mt-6 sm:mt-0 sm:ml-8 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between">
                <div>
                  <div className="flex items-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {mockAgentData.name}
                    </h1>
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800/30">
                      {mockAgentData.status.charAt(0).toUpperCase() + mockAgentData.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
                    {mockAgentData.role}
                  </p>
                  {mockAgentData.bio && (
                    <p className="mt-2 text-gray-700 dark:text-gray-300 max-w-3xl">
                      {mockAgentData.bio}
                    </p>
                  )}
                </div>
                
                <div className="mt-4 sm:mt-0">
                  <button
                    onClick={() => {
                      if (isEditing) {
                        handleSaveProfile();
                      } else {
                        setIsEditing(true);
                      }
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </button>
                  {isEditing && (
                    <button
                      onClick={() => setIsEditing(false)}
                      className="ml-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {/* Statistics Row */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-[30px]">
                  <span className="block text-2xl font-bold text-gray-900 dark:text-white">
                    {mockAgentData.groups}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Groups</span>
                </div>
                
                <div className="text-center px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-[30px]">
                  <span className="block text-2xl font-bold text-gray-900 dark:text-white">
                    {mockAgentData.users}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Users</span>
                </div>
                
                <div className="text-center px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-[30px]">
                  <span className="block text-2xl font-bold text-gray-900 dark:text-white">
                    {mockAgentData.creditScore}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Credit Score</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Agent Since - Bottom of Profile */}
          <div className="mt-6 flex items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Agent since {new Date(mockAgentData.joinedDate).toLocaleDateString('en-US', {month: 'long', year: 'numeric'})}
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom Tabs Navigation */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-[30px] overflow-hidden mb-8">
        <div className="hidden sm:block">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('personal')}
              className={`${
                activeTab === 'personal'
                  ? 'border-red-500 text-red-600 dark:text-red-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              } py-3 px-1 border-b-2 font-medium text-sm`}
            >
              Personal Information
            </button>
            <button
              onClick={() => setActiveTab('account')}
              className={`${
                activeTab === 'account'
                  ? 'border-red-500 text-red-600 dark:text-red-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              } py-3 px-1 border-b-2 font-medium text-sm`}
            >
              Account Details
            </button>
            <button
              onClick={() => setActiveTab('commissions')}
              className={`${
                activeTab === 'commissions'
                  ? 'border-red-500 text-red-600 dark:text-red-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              } py-3 px-1 border-b-2 font-medium text-sm`}
            >
              Commission History
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`${
                activeTab === 'security'
                  ? 'border-red-500 text-red-600 dark:text-red-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              } py-3 px-1 border-b-2 font-medium text-sm`}
            >
              Security Settings
            </button>
          </nav>
        </div>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">Select a tab</label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-2 focus:border-red-500 focus:ring-red-500"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="personal">Personal Information</option>
            <option value="account">Account Details</option>
            <option value="commissions">Commission History</option>
            <option value="security">Security Settings</option>
          </select>
        </div>
      </div>
      
      {/* Personal Information Tab */}
      {activeTab === 'personal' && (
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px]">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Personal Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              Your personal and contact details
            </p>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  />
                ) : (
                  <div className="mt-1 text-sm text-gray-900 dark:text-white">{mockAgentData.name}</div>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  />
                ) : (
                  <div className="mt-1 text-sm text-gray-900 dark:text-white">{mockAgentData.email}</div>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  />
                ) : (
                  <div className="mt-1 text-sm text-gray-900 dark:text-white">{mockAgentData.phone}</div>
                )}
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Address
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  />
                ) : (
                  <div className="mt-1 text-sm text-gray-900 dark:text-white">{mockAgentData.address}</div>
                )}
              </div>
              
              <div>
                <label htmlFor="nationalId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  National ID
                </label>
                <div className="mt-1 text-sm text-gray-900 dark:text-white">{mockAgentData.nationalId}</div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">National ID cannot be edited</p>
              </div>
              
              <div>
                <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Profile Image
                </label>
                {isEditing ? (
                  <div className="mt-1 flex items-center">
                    <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                      {mockAgentData.profileImage ? (
                        <img src={mockAgentData.profileImage} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <svg className="h-full w-full text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      )}
                    </span>
                    <button
                      type="button"
                      className="ml-5 bg-white dark:bg-gray-700 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {mockAgentData.profileImage ? "Profile image uploaded" : "No profile image uploaded"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Account Details Tab */}
      {activeTab === 'account' && (
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px]">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Account Details
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              Your banking information for commission payments
            </p>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="bank" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Bank
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="bank"
                    id="bank"
                    value={formData.bank}
                    onChange={handleInputChange}
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  />
                ) : (
                  <div className="mt-1 text-sm text-gray-900 dark:text-white">{mockAgentData.accountDetails.bank}</div>
                )}
              </div>
              
              <div>
                <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Account Number
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="accountNumber"
                    id="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  />
                ) : (
                  <div className="mt-1 text-sm text-gray-900 dark:text-white">{mockAgentData.accountDetails.accountNumber}</div>
                )}
              </div>
              
              <div>
                <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Account Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="accountName"
                    id="accountName"
                    value={formData.accountName}
                    onChange={handleInputChange}
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  />
                ) : (
                  <div className="mt-1 text-sm text-gray-900 dark:text-white">{mockAgentData.accountDetails.accountName}</div>
                )}
              </div>
            </div>
            
            <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400 dark:text-yellow-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Account Verification</h3>
                  <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-200">
                    <p>
                      Your account details will be used for commission payments. Please ensure all information is correct.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Commission History Tab */}
      {activeTab === 'commissions' && (
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-[30px]">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Commission History
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              Your earning history as an agent
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Month
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Groups
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Payment Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {mockCommissions.map((commission) => (
                  <tr key={commission.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {commission.month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {formatCurrency(commission.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        commission.status === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                      }`}>
                        {commission.status.charAt(0).toUpperCase() + commission.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <ul>
                        {commission.groups.map((group, index) => (
                          <li key={index}>
                            {group.name}: {formatCurrency(group.amount)}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {commission.paymentDate ? new Date(commission.paymentDate).toLocaleDateString() : 'Pending'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-4 py-5 sm:px-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Commissions are paid on the 5th of each month for the previous month's activity.
            </div>
          </div>
        </div>
      )}
      
      {/* Security Settings Tab */}
      {activeTab === 'security' && (
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-[30px]">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Security Settings
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              Manage your password and account security
            </p>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Change Password</h4>
            <form onSubmit={handlePasswordChange}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
                    required
                    value={securityForm.currentPassword}
                    onChange={handleSecurityInputChange}
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-1"
                  />
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    required
                    value={securityForm.newPassword}
                    onChange={handleSecurityInputChange}
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-1"
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    required
                    value={securityForm.confirmPassword}
                    onChange={handleSecurityInputChange}
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-1"
                  />
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </form>
            
            
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
