'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthLayout from '../../../components/AuthLayout';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault();
    // setErrorMessage('');
    // setIsLoading(true);
    
    // try {
    //   const response = await fetch('/api/auth/forgot-password', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email }),
    //   });
      
    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     throw new Error(errorData.error || 'Failed to send reset link');
    //   }
      
    //   setIsSubmitted(true);
    // } catch (error: any) {
    //   setErrorMessage(error.message || 'Something went wrong. Please try again.');
    //   console.error('Error:', error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <AuthLayout 
      title="Reset your password" 
      subtitle="We'll send you a link to reset your password"
      backLinkText="Back to login"
      backLinkHref="/auth/login"
    >
      {!isSubmitted ? (
        <>
          {errorMessage && (
            <div className="mb-4 p-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-[30px]">
              {errorMessage}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-[30px] shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-400 dark:focus:border-red-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter your registered email"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-[30px] shadow-sm text-sm font-medium text-white bg-gradient-to-tr from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 dark:from-red-600 dark:to-red-500 dark:hover:from-red-700 dark:hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-red-400 disabled:opacity-50"
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isLoading ? 'Sending reset link...' : 'Send password reset link'}
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
            <svg className="h-6 w-6 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Check your email</h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              We've sent a password reset link to <span className="font-semibold text-gray-700 dark:text-gray-300">{email}</span>.
              Please check your email and follow the instructions to reset your password.
            </p>
          </div>
          <div className="mt-5">
            <button
              type="button"
              onClick={() => {
                setEmail('');
                setIsSubmitted(false);
              }}
              className="inline-flex items-center px-4 py-2 border border-red-600 dark:border-red-500 rounded-[30px] shadow-sm text-sm font-medium text-red-600 dark:text-red-500 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-red-400"
            >
              Return to login
            </button>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}
