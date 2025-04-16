'use client';

import { useState, useEffect, Key } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/DashboardLayout';
import { agentNavigation } from '@/constant/navItem';

// Mock agent data
const mockAgentData = {
  name: 'Fatima Ibrahim',
};

// Mock groups data (imported from the groups page)
const mockGroups = [
  {
    id: 1,
    name: 'Market Women Savings',
    members: 12,
    contributionAmount: 5000,
    frequency: 'Weekly',
    totalCollected: 240000,
    nextContribution: '2025-04-20',
    status: 'active',
    createdDate: '2024-10-01',
    description: 'A savings group for market women to help grow their businesses.',
    rules: [
      'Contributions must be made weekly',
      'Late payments incur a ₦500 fee',
      'Members must attend monthly meetings',
    ]
  },
  // ... other groups
];

// Mock contribution schedules (imported from the groups page)
const mockContributionSchedules = {
  1: [
    { date: '2025-04-20', status: 'upcoming', completed: 0, pending: 12, payments: {} }, 
    { date: '2025-04-13', status: 'completed', completed: 12, pending: 0, payments: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true, 11: true, 12: true } }, 
    { date: '2025-04-06', status: 'completed', completed: 12, pending: 0, payments: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true, 11: true, 12: true } },
    { date: '2025-03-30', status: 'completed', completed: 11, pending: 1, payments: { 1: true, 2: true, 3: false, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true, 11: true, 12: true } }, 
  ],
  // Add schedules for other group IDs if needed
};

// Mock members data
const mockMembers = {
  1: [
    { id: 1, name: 'Aisha Mohammed', phone: '08012345678', joinDate: '2024-10-01', status: 'active', totalContributed: 120000, lastContributionDate: '2025-04-13' },
    { id: 2, name: 'Blessing Okafor', phone: '08023456789', joinDate: '2024-10-01', status: 'active', totalContributed: 120000, lastContributionDate: '2025-04-13' },
    { id: 3, name: 'Chioma Eze', phone: '08034567890', joinDate: '2024-10-01', status: 'active', totalContributed: 110000, lastContributionDate: '2025-04-06' },
    // ... other members
  ]
};

type PaymentDetails = Record<number, boolean>;
type Schedule = {
  date: string;
  status: string;
  completed: number;
  pending: number;
  payments: PaymentDetails;
};

type Member = {
  id: number;
  name: string;
  phone: string;
  joinDate: string;
  status: string;
  totalContributed: number;
  lastContributionDate: string;
};

export default function GroupDetail() {
  const params = useParams();
  const router = useRouter();
  const groupIdParam = params.id; // Get the 'id' param from the route

  // State variables...
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'members', 'schedule'
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [paidMembers, setPaidMembers] = useState<Record<number, boolean>>({});
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedScheduleDetails, setSelectedScheduleDetails] = useState<Schedule | null>(null);
  const [memberSearchTerm, setMemberSearchTerm] = useState('');
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberPhone, setNewMemberPhone] = useState('');

  // --- FIX START ---
  // 1. Parse groupIdParam to a number
  const groupId = typeof groupIdParam === 'string' ? parseInt(groupIdParam, 10) : NaN;

  // Handle invalid ID
  useEffect(() => {
    if (isNaN(groupId)) {
      console.error("Invalid Group ID provided in URL.");
      // Optionally redirect to a not-found page or an error page
      // router.push('/dashboard/agent/groups'); // Example redirect
    }
  }, [groupId, router]);

  // Find the current group (handle case where groupId is NaN or group not found)
  const group = !isNaN(groupId) ? mockGroups.find(g => g.id === groupId) : undefined;

  // 2. Use type assertion for mockMembers and mockContributionSchedules
  // Make members list stateful
  const [members, setMembers] = useState<Member[]>(
    !isNaN(groupId) ? (mockMembers as Record<number, Member[]>)[groupId] || [] : []
  );

  // Get contribution schedules for the current group
  const contributionSchedules: Schedule[] = !isNaN(groupId)
    ? (mockContributionSchedules as Record<number, Schedule[]>)[groupId] || []
    : [];
  // --- FIX END ---

  // Format date string to local date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'upcoming':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const handleCheckboxChange = (memberId: number, isChecked: boolean) => {
    setPaidMembers(prev => ({ ...prev, [memberId]: isChecked }));
  };

  const handleCollectContributions = () => {
    console.log(`Collecting for date: ${selectedDate}`);
    console.log('Paid members:', paidMembers);
    // Add actual collection logic here (e.g., API call)
    // Reset state and close modal
    setPaidMembers({});
    setShowCollectModal(false);
    setSelectedDate(null);
  };

  const handleAddMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding new member:', { name: newMemberName, phone: newMemberPhone });
    
    const newMember: Member = {
      id: Date.now(), // Simple unique ID for mock
      name: newMemberName,
      phone: newMemberPhone,
      joinDate: new Date().toISOString().split('T')[0], // Today's date
      status: 'active',
      totalContributed: 0,
      lastContributionDate: '', // Or set to null/undefined
    };

    // Update the members state
    setMembers(prevMembers => [...prevMembers, newMember]);

    // Add actual API call logic here to add the member to the backend

    // Reset form and close modal
    setNewMemberName('');
    setNewMemberPhone('');
    setShowAddMemberModal(false);
  };

  // Filter members based on search term
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(memberSearchTerm.toLowerCase()) ||
    member.phone.includes(memberSearchTerm)
  );

  if (!group) {
    return (
      <DashboardLayout
        navigation={agentNavigation}
        userType="agent"
        userName={mockAgentData.name}
        pageTitle="Group Not Found"
      >
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Group not found</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">The group you're looking for doesn't exist.</p>
          <div className="mt-4">
            <Link
              href="/dashboard/agent/groups"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              Return to Groups
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      navigation={agentNavigation}
      userType="agent"
      userName={mockAgentData.name}
      pageTitle={`Group: ${group.name}`}
    >
      <div className="mb-4"> 
        <button
          onClick={() => router.back()}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
        >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          Back to Groups
        </button>
      </div>

      <div className="space-y-6">
        {/* Group Overview Card */}
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-[30px]">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{group.name}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{group.description}</p>
              </div>
              <span className={`px-2 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusBadgeClass(group.status)}`}>
                {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4"> 
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-[30px]">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Members</dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{members.length}</dd> 
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-[30px]">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Contribution Amount</dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">₦{group.contributionAmount.toLocaleString()}</dd>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-[30px]">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Next Contribution</dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{formatDate(group.nextContribution)}</dd>
            </div>
             <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-[30px]"> 
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Frequency</dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{group.frequency}</dd>
            </div>
             <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-[30px]"> 
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created Date</dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{formatDate(group.createdDate)}</dd>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${
                activeTab === 'overview'
                  ? 'border-red-500 text-red-600 dark:text-red-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`${
                activeTab === 'members'
                  ? 'border-red-500 text-red-600 dark:text-red-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Members
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`${
                activeTab === 'schedule'
                  ? 'border-red-500 text-red-600 dark:text-red-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Contribution Schedule
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-[30px]">
          {activeTab === 'overview' && (
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Group Rules</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                    {group.rules.map((rule, index) => (
                      <li key={index}>{rule}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Group Statistics</h4>
                  <dl className="grid grid-cols-1 gap-5 sm:grid-cols-1"> 
                    <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-5 sm:p-6 rounded-[30px]">
                       <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Group Status</dt>
                       <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                          <span className={`px-3 py-1 inline-flex text-xl leading-5 font-medium rounded-full ${getStatusBadgeClass(group.status)}`}>
                              {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
                          </span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'members' && (
            <div className="rounded-[30px]">
              {/* Search and Add Member Bar */}
              <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <input
                  type="text"
                  placeholder="Search members by name or phone..."
                  value={memberSearchTerm}
                  onChange={(e) => setMemberSearchTerm(e.target.value)}
                  className="focus:ring-red-500 focus:border-red-500 block w-full sm:w-auto sm:flex-grow text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                />
                <button
                  onClick={() => setShowAddMemberModal(true)}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm dark:focus:ring-offset-gray-800 whitespace-nowrap"
                >
                  Add Member
                </button>
              </div>

              <div className="overflow-x-auto rounded-b-[30px]">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Member
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Phone
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Join Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Total Contributed
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredMembers.length > 0 ? (
                      filteredMembers.map((member) => (
                        <tr key={member.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {member.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {member.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {formatDate(member.joinDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusBadgeClass(member.status)}`}>
                              {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            ₦{member.totalContributed.toLocaleString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                          No members found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="overflow-x-auto rounded-[30px]">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-[30px]">
                <thead className="bg-gray-50 dark:bg-gray-700 rounded-[30px]">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Completed
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Pending
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {contributionSchedules.map((schedule: Schedule, index: Key | null | undefined) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {formatDate(schedule.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusBadgeClass(schedule.status)}`}>
                          {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {schedule.completed}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {schedule.pending}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {schedule.status === 'upcoming' ? (
                          <button
                            onClick={() => {
                              setSelectedDate(schedule.date);
                              setPaidMembers({}); // Reset paid members when opening modal
                              setShowCollectModal(true);
                            }}
                            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-500"
                          >
                            Collect
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              const scheduleData = contributionSchedules.find((s: { date: string; }) => s.date === schedule.date);
                              if (scheduleData) {
                                setSelectedScheduleDetails(scheduleData);
                                setShowDetailsModal(true);
                              }
                            }}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500"
                          >
                            View Details
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Collection Modal */}
      {showCollectModal && selectedDate && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-[30px] text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                      Collect Contributions
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                         Collection date: <span className="font-medium">{formatDate(selectedDate)}</span>
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Expected amount per member: <span className="font-medium">₦{group.contributionAmount.toLocaleString()}</span>
                      </p>

                      {/* Member List */}
                      <div className="space-y-3 max-h-60 overflow-y-auto border dark:border-gray-700 rounded-[30px] p-4">
                         <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mark Collected Contributions:</h4>
                        {members.map((member) => (
                          <div key={member.id} className="flex items-center justify-between">
                            <label htmlFor={`member-${member.id}`} className="text-sm text-gray-800 dark:text-gray-200">{member.name}</label>
                            <input
                              id={`member-${member.id}`}
                              type="checkbox"
                              checked={!!paidMembers[member.id]}
                              onChange={(e) => handleCheckboxChange(member.id, e.target.checked)}
                              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:focus:ring-offset-gray-800"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-[30px] border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm dark:focus:ring-offset-gray-800"
                  onClick={handleCollectContributions}
                >
                  Confirm Collection ({Object.values(paidMembers).filter(Boolean).length}/{members.length})
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-[30px] border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:focus:ring-offset-gray-800"
                  onClick={() => setShowCollectModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showDetailsModal && selectedScheduleDetails && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-[30px] text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                      Contribution Details
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Date: <span className="font-medium">{formatDate(selectedScheduleDetails.date)}</span>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Status: <span className={`font-medium px-2 py-0.5 rounded-full text-xs ${getStatusBadgeClass(selectedScheduleDetails.status)}`}>{selectedScheduleDetails.status.charAt(0).toUpperCase() + selectedScheduleDetails.status.slice(1)}</span>
                    </p>

                    {/* Member Payment Status List */}
                    <div className="space-y-3 max-h-60 overflow-y-auto border dark:border-gray-700 rounded-md p-4">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Status:</h4>
                      {members.map((member) => (
                        <div key={member.id} className="flex items-center justify-between">
                          <span className="text-sm text-gray-800 dark:text-gray-200">{member.name}</span>
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${selectedScheduleDetails.payments[member.id] ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                            {selectedScheduleDetails.payments[member.id] ? 'Paid' : 'Missed'}
                          </span>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:focus:ring-offset-gray-800"
                  onClick={() => setShowDetailsModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-[30px] text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleAddMemberSubmit}>
                <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                        Add New Member to {group.name}
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="new-member-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                          <input
                            type="text"
                            id="new-member-name"
                            value={newMemberName}
                            onChange={(e) => setNewMemberName(e.target.value)}
                            required
                            className="mt-1 shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-2"
                          />
                        </div>
                        <div>
                          <label htmlFor="new-member-phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                          <input
                            type="tel" // Use 'tel' for phone numbers
                            id="new-member-phone"
                            value={newMemberPhone}
                            onChange={(e) => setNewMemberPhone(e.target.value)}
                            required
                            className="mt-1 shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm dark:focus:ring-offset-gray-800"
                  >
                    Add Member
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:focus:ring-offset-gray-800"
                    onClick={() => setShowAddMemberModal(false)}
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
