'use client';

import React from 'react';
import { useNotification, NotificationType } from '@/app/contexts/NotificationContext';
import { BellIcon, XMarkIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationIcon = ({ type }: { type: NotificationType }) => {
  const iconClass = 'w-5 h-5';
  switch (type) {
    case 'success':
      return <CheckCircleIcon className={`${iconClass} text-green-500`} />;
    case 'error':
      return <ExclamationCircleIcon className={`${iconClass} text-red-500`} />;
    case 'warning':
      return <ExclamationCircleIcon className={`${iconClass} text-yellow-500`} />;
    case 'info':
      return <InformationCircleIcon className={`${iconClass} text-blue-500`} />;
  }
};

const Toast = ({ id, type, title, message, onClose }: {
  id: string;
  type: NotificationType;
  title?: string;
  message: string;
  onClose?: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`flex items-start p-4 mb-2 rounded-lg shadow-lg bg-white dark:bg-gray-800 border-l-4 ${
        type === 'success' ? 'border-green-500' :
        type === 'error' ? 'border-red-500' :
        type === 'warning' ? 'border-yellow-500' :
        'border-blue-500'
      }`}
    >
      <div className="flex-shrink-0">
        <NotificationIcon type={type} />
      </div>
      <div className="ml-3 flex-1">
        {title && <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{title}</h3>}
        <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </motion.div>
  );
};

const NotificationList = () => {
  const { notifications, markAsRead, removeNotification } = useNotification();

  return (
    <div className="max-h-[400px] overflow-y-auto">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors duration-200 ${
            notification.isRead ? 'bg-white dark:bg-gray-800' : 'bg-blue-50 dark:bg-blue-900/20'
          }`}
          onClick={() => markAsRead(notification.id)}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <NotificationIcon type={notification.type} />
            </div>
            <div className="ml-3 flex-1">
              {notification.title && (
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{notification.title}</p>
              )}
              <p className="text-sm text-gray-500 dark:text-gray-400">{notification.message}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeNotification(notification.id);
              }}
              className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export function NotificationCenter() {
  const { toasts, notifications, unreadCount, markAllAsRead, clearNotifications } = useNotification();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Toasts */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
        </AnimatePresence>
      </div>

      {/* Notification Bell */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none transition-colors duration-200"
        >
          <BellIcon className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Notification Panel */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-80 rounded-lg bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/30 ring-1 ring-black ring-opacity-5 dark:ring-gray-700">
            <div className="p-4 border-b dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Notifications</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Mark all as read
                  </button>
                  <button
                    onClick={clearNotifications}
                    className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            </div>
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No notifications
              </div>
            ) : (
              <NotificationList />
            )}
          </div>
        )}
      </div>
    </>
  );
} 