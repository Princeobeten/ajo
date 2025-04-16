import React, { ReactNode } from 'react';
import Link from 'next/link';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  backLinkText?: string;
  backLinkHref?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  title, 
  subtitle = '', 
  backLinkText = 'Back to Home', 
  backLinkHref = '/' 
}) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/" className="text-3xl font-bold bg-gradient-to-tr from-red-600 to-red-500 text-white px-4 py-2 rounded-[30px]">
            Ajo
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-lg rounded-[30px] sm:px-10 border border-gray-100 dark:border-gray-700">
          {children}
        </div>
        <div className="mt-4 text-center">
          <Link href={backLinkHref} className="text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300">
            {backLinkText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
