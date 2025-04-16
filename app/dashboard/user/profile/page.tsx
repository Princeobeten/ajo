'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { userNavigation } from '@/constant/navItem';

// Mock user data
const mockUserData = {
  name: 'Amina Johnson',
  email: 'amina@example.com',
  phone: '+234 123 4567 890',
  address: '14 Market Street, Lagos',
  bvnNin: '12345678901',
  kycStatus: 'verified',
  profileImage: null, // Will use initials placeholder
  coverPhoto: null, // Will use gradient placeholder
  memberSince: '2024-09-15',
  bio: 'Financial inclusion advocate and entrepreneur based in Lagos',
  role: 'Business Owner & Savings Group Leader',
  bankDetails: {
    bankName: 'First Bank',
    accountNumber: '1234567890',
    accountName: 'Amina Johnson'
  }
};


export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('personal'); // 'personal', 'security', 'bank'
  const [isEditing, setIsEditing] = useState(false);
  
  // Form states
  const [name, setName] = useState(mockUserData.name);
  const [email, setEmail] = useState(mockUserData.email);
  const [phone, setPhone] = useState(mockUserData.phone);
  const [address, setAddress] = useState(mockUserData.address);
  const [bankName, setBankName] = useState(mockUserData.bankDetails.bankName);
  const [accountNumber, setAccountNumber] = useState(mockUserData.bankDetails.accountNumber);
  const [accountName, setAccountName] = useState(mockUserData.bankDetails.accountName);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Error state
  const [error, setError] = useState('');
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // This would be replaced with actual API call
    console.log('Updating profile with:', {
      name,
      email,
      phone,
      address
    });
    
    // Show success message
    alert('Profile updated successfully!');
    setIsEditing(false);
  };
  
  const handleUpdateBankDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // This would be replaced with actual API call
    console.log('Updating bank details with:', {
      bankName,
      accountNumber,
      accountName
    });
    
    // Show success message
    alert('Bank details updated successfully!');
  };
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    // This would be replaced with actual API call
    console.log('Changing password');
    
    // Show success message
    alert('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <DashboardLayout 
      navigation={userNavigation}
      userType="user"
      userName={mockUserData.name}
      pageTitle="My Profile"
    >
      {/* Profile Header with Cover Photo & Avatar - Portfolio Style */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-[30px] overflow-hidden mb-6">
        {/* Cover Photo Section */}
        <div className="h-48 sm:h-56 relative w-full">
          {mockUserData.coverPhoto ? (
            <div className="h-full w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-400/80 to-purple-500/80 mix-blend-overlay z-10"></div>
              <img 
                src={mockUserData.coverPhoto} 
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
                {mockUserData.profileImage ? (
                  <img
                    src={mockUserData.profileImage}
                    alt={mockUserData.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-5xl font-bold">
                    {mockUserData.name.charAt(0).toUpperCase()}
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
                      {mockUserData.name}
                    </h1>
                    {mockUserData.kycStatus === 'verified' && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800/30">
                        <svg className="h-3 w-3 mr-1 text-red-500 dark:text-red-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
                    {mockUserData.role}
                  </p>
                  {mockUserData.bio && (
                    <p className="mt-2 text-gray-700 dark:text-gray-300 max-w-3xl">
                      {mockUserData.bio}
                    </p>
                  )}
                </div>
                
                <div className="mt-4 sm:mt-0">
                  {!isEditing && (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>

              {/* Additional Profile Info */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="text-center px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-[30px]">
                  <span className="block text-lg font-bold text-gray-900 dark:text-white">
                    Member
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Since {new Date(mockUserData.memberSince).toLocaleDateString('en-US', {year: 'numeric', month: 'short'})}
                  </span>
                </div>
                
                <div className="text-center px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-[30px]">
                  <span className="block text-lg font-bold text-gray-900 dark:text-white">
                    Verified
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Status
                  </span>
                </div>
                
                <div className="text-center px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-[30px]">
                  <span className="block text-lg font-bold text-gray-900 dark:text-white">
                    Active
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Account
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom Tabs Navigation */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-[30px] overflow-hidden mb-8">
        <div className="px-2">
          <nav className="flex space-x-4 overflow-x-auto" aria-label="Tabs">
            <button
              className={`py-3 px-6 text-center border-b-2 font-medium ${
                activeTab === 'personal'
                  ? 'border-red-500 text-red-600 dark:text-red-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('personal')}
            >
              Personal Information
            </button>
            <button
              className={`py-3 px-6 text-center border-b-2 font-medium ${
                activeTab === 'bank'
                  ? 'border-red-500 text-red-600 dark:text-red-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('bank')}
            >
              Bank Details
            </button>
            <button
              className={`py-3 px-6 text-center border-b-2 font-medium ${
                activeTab === 'security'
                  ? 'border-red-500 text-red-600 dark:text-red-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('security')}
            >
              Security
            </button>
          </nav>
        </div>
      </div>

      {/* Personal Information */}
      {activeTab === 'personal' && (
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Personal Information
            </h3>
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Edit Profile
              </button>
            )}
          </div>
          
          {isEditing ? (
            <form onSubmit={handleUpdateProfile}>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-white dark:bg-gray-800 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</h4>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">{mockUserData.name}</p>
              </div>

              <div className="sm:col-span-3">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</h4>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">{mockUserData.email}</p>
              </div>

              <div className="sm:col-span-3">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</h4>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">{mockUserData.phone}</p>
              </div>

              <div className="sm:col-span-3">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</h4>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">{new Date(mockUserData.memberSince).toLocaleDateString()}</p>
              </div>

              <div className="sm:col-span-3">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</h4>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">{mockUserData.address}</p>
              </div>

              <div className="sm:col-span-3">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">KYC Status</h4>
                <p className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
                  {mockUserData.kycStatus.charAt(0).toUpperCase() + mockUserData.kycStatus.slice(1)}
                </p>
              </div>

              <div className="sm:col-span-3">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">BVN/NIN</h4>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">{mockUserData.bvnNin}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bank Details */}
      {activeTab === 'bank' && (
        <div className="px-4 py-5 sm:p-6">
          <div className="mb-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Bank Account Details
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              Your bank details are used for processing withdrawals and loan disbursements.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleUpdateBankDetails}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Bank Name
                </label>
                <div className="mt-1">
                  <select
                    id="bankName"
                    name="bankName"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-1"
                  >
                    <option value="First Bank">First Bank</option>
                    <option value="UBA">UBA</option>
                    <option value="Zenith Bank">Zenith Bank</option>
                    <option value="GTBank">GTBank</option>
                    <option value="Access Bank">Access Bank</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Account Number
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="accountNumber"
                    id="accountNumber"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-1"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Account Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="accountName"
                    id="accountName"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-1"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
              >
                Update Bank Details
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Security */}
      {activeTab === 'security' && (
        <div className="px-4 py-5 sm:p-6">
          <div className="mb-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Security Settings
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              Manage your password and account security settings.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 rounded-md">
              {error}
            </div>
          )}
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="text-base font-medium text-gray-900 dark:text-white">Change Password</h4>
            
            <form onSubmit={handleChangePassword} className="mt-4">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Current Password
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      name="currentPassword"
                      id="currentPassword"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-1"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    New Password
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-1"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Password must be at least 8 characters long.
                  </p>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confirm New Password
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-1"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
            <h4 className="text-base font-medium text-gray-900 dark:text-white">Account Security Tips</h4>
            
            <ul className="mt-4 space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Use a strong, unique password that you don't use on other websites.</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Never share your password with anyone, including Digital Ajo customer support.</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Change your password regularly, at least once every 3 months.</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Always log out when using shared or public computers.</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
