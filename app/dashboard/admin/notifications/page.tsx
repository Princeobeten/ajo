'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { adminNavigation } from '@/constant/navItem';

// Mock admin data
const mockAdminData = {
  name: 'Admin User',
};

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: 'agent',
    title: 'New Agent Registration',
    message: 'Sarah Williams has applied to become an agent. Review their application and KYC documents.',
    date: '2024-03-20T10:00:00',
    isRead: false,
    action: 'Review Application',
    actionLink: '/dashboard/admin/agents'
  },
  {
    id: 2,
    type: 'withdrawal',
    title: 'Withdrawal Request Pending',
    message: 'New withdrawal request of ₦500,000 from Agent John Doe requires approval.',
    date: '2024-03-19T15:30:00',
    isRead: true,
    action: 'Review Request',
    actionLink: '/dashboard/admin/withdrawals'
  },
  {
    id: 3,
    type: 'system',
    title: 'System Performance Alert',
    message: 'High traffic detected on the platform. Server load at 85%.',
    date: '2024-03-19T09:15:00',
    isRead: false,
    action: 'View Metrics',
    actionLink: '/dashboard/admin/metrics'
  },
  {
    id: 4,
    type: 'user',
    title: 'User Report',
    message: 'Multiple users reported issues with payment processing.',
    date: '2024-03-18T14:20:00',
    isRead: true,
    action: 'View Reports',
    actionLink: '/dashboard/admin/reports'
  },
  {
    id: 5,
    type: 'security',
    title: 'Security Alert',
    message: 'Multiple failed login attempts detected from IP address 192.168.1.1',
    date: '2024-03-18T11:00:00',
    isRead: false,
    action: 'View Security Logs',
    actionLink: '/dashboard/admin/security'
  }
];

export default function AdminNotifications() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState(mockNotifications);

  const filterNotifications = (filter: string) => {
    setActiveFilter(filter);
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const getFilteredNotifications = () => {
    if (activeFilter === 'all') return notifications;
    if (activeFilter === 'unread') return notifications.filter(n => !n.isRead);
    return notifications.filter(n => n.type === activeFilter);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'agent':
        return (
          <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'withdrawal':
        return (
          <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'system':
        return (
          <svg className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'user':
        return (
          <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'security':
        return (
          <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
      default:
        return (
          <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <DashboardLayout
      navigation={adminNavigation}
      userType="admin"
      userName={mockAdminData.name}
      pageTitle="Notifications"
    >
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">System Notifications</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                  Monitor system alerts, user reports, and administrative tasks
                </p>
              </div>
              <button
                onClick={() => setNotifications(notifications.map(n => ({ ...n, isRead: true })))}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-[20px] text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
              >
                Mark all as read
              </button>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
              <nav className="flex overflow-x-auto py-2 px-4">
                <button
                  className={`text-sm font-medium py-3 px-6 rounded-md mr-2 ${
                    activeFilter === 'all'
                      ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm dark:shadow-gray-900/30'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                  } whitespace-nowrap transition-all duration-150`}
                  onClick={() => filterNotifications('all')}
                >
                  All
                </button>
                <button
                  className={`text-sm font-medium py-3 px-6 rounded-md mr-2 ${
                    activeFilter === 'unread'
                      ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm dark:shadow-gray-900/30'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                  } whitespace-nowrap transition-all duration-150`}
                  onClick={() => filterNotifications('unread')}
                >
                  Unread
                </button>
                <button
                  className={`text-sm font-medium py-3 px-6 rounded-md mr-2 ${
                    activeFilter === 'agent'
                      ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm dark:shadow-gray-900/30'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                  } whitespace-nowrap transition-all duration-150`}
                  onClick={() => filterNotifications('agent')}
                >
                  Agents
                </button>
                <button
                  className={`text-sm font-medium py-3 px-6 rounded-md mr-2 ${
                    activeFilter === 'withdrawal'
                      ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm dark:shadow-gray-900/30'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                  } whitespace-nowrap transition-all duration-150`}
                  onClick={() => filterNotifications('withdrawal')}
                >
                  Withdrawals
                </button>
                <button
                  className={`text-sm font-medium py-3 px-6 rounded-md mr-2 ${
                    activeFilter === 'system'
                      ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm dark:shadow-gray-900/30'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                  } whitespace-nowrap transition-all duration-150`}
                  onClick={() => filterNotifications('system')}
                >
                  System
                </button>
                <button
                  className={`text-sm font-medium py-3 px-6 rounded-md mr-2 ${
                    activeFilter === 'security'
                      ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm dark:shadow-gray-900/30'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                  } whitespace-nowrap transition-all duration-150`}
                  onClick={() => filterNotifications('security')}
                >
                  Security
                </button>
              </nav>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {getFilteredNotifications().map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-6 ${
                      !notification.isRead ? 'bg-red-50/50 dark:bg-red-900/5' : ''
                    } hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {notification.title}
                          </p>
                          <div className="flex items-center space-x-4">
                            {!notification.isRead && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                                New
                              </span>
                            )}
                            <time className="text-xs text-gray-500 dark:text-gray-400" dateTime={notification.date}>
                              {new Date(notification.date).toLocaleDateString()}
                            </time>
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {notification.message}
                        </p>
                        {notification.action && (
                          <div className="mt-3">
                            <a
                              href={notification.actionLink}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-[20px] shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                            >
                              {notification.action}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 