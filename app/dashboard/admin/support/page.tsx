'use client';

import { DashboardLayout } from '@/components/DashboardLayout';
import { adminNavigation } from '@/constant/navItem';
import { useState } from 'react';

// Mock support tickets data
const mockTickets = [
  {
    id: 1,
    user: 'John Doe',
    userType: 'Agent',
    subject: 'Withdrawal Issue',
    message: 'Unable to process withdrawal request for the past 2 hours',
    status: 'open',
    priority: 'high',
    createdAt: '2024-03-20T10:00:00',
    lastUpdated: '2024-03-20T10:00:00'
  },
  {
    id: 2,
    user: 'Sarah Wilson',
    userType: 'User',
    subject: 'Group Creation Problem',
    message: 'Getting error when trying to create a new savings group',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2024-03-19T15:30:00',
    lastUpdated: '2024-03-19T16:45:00'
  },
  {
    id: 3,
    user: 'Michael Brown',
    userType: 'Agent',
    subject: 'Commission Calculation',
    message: 'Commission not reflecting correctly in earnings',
    status: 'resolved',
    priority: 'low',
    createdAt: '2024-03-18T09:15:00',
    lastUpdated: '2024-03-19T11:30:00'
  }
];

export default function AdminSupport() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [tickets, setTickets] = useState(mockTickets);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getFilteredTickets = () => {
    if (activeFilter === 'all') return tickets;
    return tickets.filter(ticket => ticket.status === activeFilter);
  };

  const mockAdminData = {
    name: 'Admin',
  };

  return (
    <DashboardLayout 
    navigation={adminNavigation}
    userType="admin"
    userName={mockAdminData.name}
      pageTitle="Help & Support"
    >
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-[30px] p-6 text-white shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Open Tickets</h3>
            <p className="text-3xl font-bold">{tickets.filter(t => t.status === 'open').length}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-[30px] p-6 text-white shadow-lg">
            <h3 className="text-lg font-semibold mb-2">In Progress</h3>
            <p className="text-3xl font-bold">{tickets.filter(t => t.status === 'in_progress').length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-[30px] p-6 text-white shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Resolved Today</h3>
            <p className="text-3xl font-bold">
              {tickets.filter(t => 
                t.status === 'resolved' && 
                new Date(t.lastUpdated).toDateString() === new Date().toDateString()
              ).length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-[30px] shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
            <nav className="flex overflow-x-auto py-2 px-4">
              <button
                className={`text-sm font-medium py-3 px-6 rounded-md mr-2 ${
                  activeFilter === 'all'
                    ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm dark:shadow-gray-900/30'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                } whitespace-nowrap transition-all duration-150`}
                onClick={() => setActiveFilter('all')}
              >
                All Tickets
              </button>
              <button
                className={`text-sm font-medium py-3 px-6 rounded-md mr-2 ${
                  activeFilter === 'open'
                    ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm dark:shadow-gray-900/30'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                } whitespace-nowrap transition-all duration-150`}
                onClick={() => setActiveFilter('open')}
              >
                Open
              </button>
              <button
                className={`text-sm font-medium py-3 px-6 rounded-md mr-2 ${
                  activeFilter === 'in_progress'
                    ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm dark:shadow-gray-900/30'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                } whitespace-nowrap transition-all duration-150`}
                onClick={() => setActiveFilter('in_progress')}
              >
                In Progress
              </button>
              <button
                className={`text-sm font-medium py-3 px-6 rounded-md mr-2 ${
                  activeFilter === 'resolved'
                    ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm dark:shadow-gray-900/30'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                } whitespace-nowrap transition-all duration-150`}
                onClick={() => setActiveFilter('resolved')}
              >
                Resolved
              </button>
            </nav>
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-6">
          {getFilteredTickets().map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white dark:bg-gray-800 rounded-[30px] shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {ticket.subject}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(ticket.status)}`}>
                      {ticket.status.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityBadgeClass(ticket.priority)}`}>
                      {ticket.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {ticket.message}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>From: {ticket.user} ({ticket.userType})</span>
                    <span>Created: {new Date(ticket.createdAt).toLocaleString()}</span>
                    <span>Last Updated: {new Date(ticket.lastUpdated).toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-[20px] text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                  >
                    View Details
                  </button>
                  {ticket.status !== 'resolved' && (
                    <button
                      className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-[20px] text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                    >
                      Update Status
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
} 