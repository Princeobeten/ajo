'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { agentNavigation } from '@/constant/navItem';

// Mock agent data
const mockAgentData = {
  name: 'Sarah Williams',
};

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: 'group',
    title: 'New Group Member Request',
    message: 'Amina Johnson has requested to join "Market Women Group". Review and approve the request.',
    date: '2024-03-20T10:00:00',
    isRead: false,
    action: 'Review Request',
    actionLink: '/dashboard/agent/groups'
  },
  {
    id: 2,
    type: 'loan',
    title: 'Loan Application Review Required',
    message: 'New loan application from John Doe for ₦100,000 needs your review.',
    date: '2024-03-19T15:30:00',
    isRead: true,
    action: 'Review Application',
    actionLink: '/dashboard/agent/loans'
  },
  {
    id: 3,
    type: 'earnings',
    title: 'Commission Earned',
    message: 'You earned ₦5,000 commission from successful loan repayments today.',
    date: '2024-03-19T09:15:00',
    isRead: true,
    action: 'View Earnings',
    actionLink: '/dashboard/agent/earnings'
  },
  {
    id: 4,
    type: 'referral',
    title: 'New Referral Bonus',
    message: 'Your referral Mary Smith has completed KYC. You earned ₦1,000 bonus!',
    date: '2024-03-18T14:20:00',
    isRead: false,
    action: 'View Referrals',
    actionLink: '/dashboard/agent/referrals'
  },
  {
    id: 5,
    type: 'system',
    title: 'System Update',
    message: 'New features added to agent dashboard. Check the changelog for details.',
    date: '2024-03-18T11:00:00',
    isRead: true,
  }
];

export default function AgentNotifications() {
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
      case 'group':
        return (
          <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'loan':
        return (
          <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'earnings':
        return (
          <svg className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'referral':
        return (
          <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
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
      navigation={agentNavigation}
      userType="agent"
      userName={mockAgentData.name}
      pageTitle="Notifications"
    >
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-[30px] overflow-hidden">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Notifications</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                  Stay updated with your groups, loans, and agent activities
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
                    activeFilter === 'group'
                      ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm dark:shadow-gray-900/30'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                  } whitespace-nowrap transition-all duration-150`}
                  onClick={() => filterNotifications('group')}
                >
                  Groups
                </button>
                <button
                  className={`text-sm font-medium py-3 px-6 rounded-md mr-2 ${
                    activeFilter === 'loan'
                      ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm dark:shadow-gray-900/30'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                  } whitespace-nowrap transition-all duration-150`}
                  onClick={() => filterNotifications('loan')}
                >
                  Loans
                </button>
                <button
                  className={`text-sm font-medium py-3 px-6 rounded-md mr-2 ${
                    activeFilter === 'earnings'
                      ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm dark:shadow-gray-900/30'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                  } whitespace-nowrap transition-all duration-150`}
                  onClick={() => filterNotifications('earnings')}
                >
                  Earnings
                </button>
                <button
                  className={`text-sm font-medium py-3 px-6 rounded-md ${
                    activeFilter === 'referral'
                      ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm dark:shadow-gray-900/30'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                  } whitespace-nowrap transition-all duration-150`}
                  onClick={() => filterNotifications('referral')}
                >
                  Referrals
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