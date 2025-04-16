'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from '../../../components/AuthLayout';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userType, setUserType] = useState('user'); // 'user' or 'agent'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'agent') {
      setUserType('agent');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!email || !password) {
      setErrorMessage('Email and password are required');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication
      // In a real app, this would verify credentials against a backend
      if (email === 'demo@example.com' && password === 'password') {
        // Create mock user data
        const mockUser = {
          id: 'user-' + Date.now(),
          email,
          name: userType === 'user' ? 'Amina Johnson' : 'Agent Tunde',
          role: userType === 'user' ? 'USER' : 'AGENT',
          kycStatus: 'approved'
        };
        
        // Mock token
        const mockToken = 'mock-jwt-token-' + Date.now();
        
        // Store in localStorage instead of using context
        localStorage.setItem('mockToken', mockToken);
        localStorage.setItem('mockUser', JSON.stringify(mockUser));
        
        console.log('Login successful with mock data', { user: mockUser });
        
        // Redirect based on user role
        router.push(userType === 'user' ? '/dashboard/user' : '/dashboard/agent');
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title={userType === 'user' ? "Welcome back" : "Agent login"} 
      subtitle={userType === 'user' 
        ? "Enter your details to access your Digital Ajo account" 
        : "Access your agent dashboard"
      }
      backLinkText=""
      backLinkHref=""
    >
      <div>
        <div className="mb-6">
          <div className="flex border border-gray-300 dark:border-gray-600 rounded-[30px] overflow-hidden">
            <button
              type="button"
              className={`w-1/2 py-2 px-4 text-center ${
                userType === 'user' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => setUserType('user')}
            >
              User
            </button>
            <button
              type="button"
              className={`w-1/2 py-2 px-4 text-center ${
                userType === 'agent' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => setUserType('agent')}
            >
              Agent
            </button>
          </div>
        </div>

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
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-[30px] shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-400 dark:focus:border-red-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-red-600 focus:ring-red-500 dark:focus:ring-red-400 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link href="/auth/forgot-password" className="text-red-600 hover:text-red-500 dark:text-red-500 dark:hover:text-red-400">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-[30px] shadow-sm text-sm font-medium text-white bg-gradient-to-tr from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 dark:from-red-600 dark:to-red-500 dark:hover:from-red-700 dark:hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-red-400 disabled:opacity-50"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                Don't have an account?
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Link 
              href={`/auth/register${userType === 'agent' ? '?type=agent' : ''}`}
              className="w-full flex justify-center py-2 px-4 border border-red-600 dark:border-red-500 rounded-[30px] shadow-sm text-sm font-medium text-red-600 dark:text-red-500 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Register as {userType === 'user' ? 'User' : 'Agent'}
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

// Wrap the login form in a suspense boundary for useSearchParams
export default function Login() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
