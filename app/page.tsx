'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { BotIcon } from "lucide-react";

export default function Home() {
  // State for FAQ dropdowns
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-900 shadow-sm py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-tr from-red-600 to-red-500 text-white px-4 py-2 rounded-[30px]">Ajo</h1>
          </div>
          <div className="hidden lg:flex space-x-8">
            <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition">Features</a>
            <a href="#how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition">How It Works</a>
            <a href="#testimonials" className="text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition">Testimonials</a>
            <a href="#faq" className="text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition">FAQ</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/login" className="text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition">Login</Link>
            <Link href="/auth/register" className="bg-gradient-to-r from-red-500 to-red-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition">Register</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col justify-center items-center">
          <div className="mb-10 pb-10 md:mb-0 flex flex-col items-center">
            <div className="flex items-center justify-center gap-x-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium mb-4 bg-gradient-to-r from-red-50 to-red-100">
              <BotIcon className="-mt-1 animate-pulse"/> AI-Powered Financial Platform
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-gray-800 dark:text-white mb-6 leading-tight text-center">
              Smart Financial <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-500">Inclusion</span> Platform
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
              Secure group savings, AI-driven financial insights, and access <br/>
              to micro-loans. Taking financial collaboration to the next level.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center">
              <Link href="/auth/register" className="bg-gradient-to-r from-red-500 to-red-500 text-white px-6 py-3 rounded-lg text-center hover:opacity-90 shadow-lg shadow-red-500/20 transition">
                Get Started
              </Link>
              <Link href="/auth/login?type=agent" className="border border-red-500 text-red-500 dark:text-red-400 px-6 py-3 rounded-lg text-center hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                Register as Agent
              </Link>
            </div>
          </div>
          <div className="relative w-full max-w-md">
              {/* SVG Dashboard Mockup */}
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 400 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-2xl rounded-[30px]"
              >
                {/* Dashboard Background */}
                <rect width="400" height="300" rx="12" fill="white" className="dark:fill-gray-800" />
                
                {/* Header */}
                <path d="M0 12C0 5.37258 5.37258 0 12 0H388C394.627 0 400 5.37258 400 12V40H0V12Z" fill="url(#headerGradient)" />
                <text x="20" y="25" fontFamily="Arial" fontSize="14" fontWeight="600" fill="white">Ajo Dashboard</text>
                
                {/* Avatar in Header */}
                <circle cx="370" cy="20" r="10" fill="white" fillOpacity="0.3" />
                
                {/* Financial Overview Cards */}
                <rect x="20" y="50" width="175" height="70" rx="8" fill="#F3F4F6" className="dark:fill-gray-700" />
                <text x="30" y="70" fontFamily="Arial" fontSize="10" fill="#6B7280" className="dark:fill-gray-400">Total Savings</text>
                <text x="30" y="95" fontFamily="Arial" fontSize="18" fontWeight="bold" fill="#111827" className="dark:fill-white">₦458,950</text>
                
                <rect x="205" y="50" width="175" height="70" rx="8" fill="#F3F4F6" className="dark:fill-gray-700" />
                <text x="215" y="70" fontFamily="Arial" fontSize="10" fill="#6B7280" className="dark:fill-gray-400">Credit Score</text>
                <text x="215" y="95" fontFamily="Arial" fontSize="18" fontWeight="bold" fill="#D74747FF" className="dark:fill-red-400">720</text>
                <rect x="270" y="80" width="100" height="8" rx="4" fill="#E5E7EB" className="dark:fill-gray-600" />
                <rect x="270" y="80" width="72" height="8" rx="4" fill="#D74747FF" />
                
                {/* Chart Area */}
                <rect x="20" y="130" width="360" height="100" rx="8" fill="#F3F4F6" className="dark:fill-gray-700" />
                <text x="30" y="150" fontFamily="Arial" fontSize="10" fill="#6B7280" className="dark:fill-gray-400">Savings Growth</text>
                
                {/* Chart Bars */}
                <rect x="40" y="200" width="30" height="20" rx="2" fill="#D74747FF" className="animate-pulse" />
                <rect x="80" y="185" width="30" height="35" rx="2" fill="#D74747FF" className="animate-pulse" />
                <rect x="120" y="170" width="30" height="50" rx="2" fill="#D74747FF" className="animate-pulse" />
                <rect x="160" y="180" width="30" height="40" rx="2" fill="#D74747FF" className="animate-pulse" />
                <rect x="200" y="165" width="30" height="55" rx="2" fill="#D74747FF" className="animate-pulse" />
                <rect x="240" y="155" width="30" height="65" rx="2" fill="url(#barGradient)" className="animate-pulse" />
                <rect x="280" y="160" width="30" height="60" rx="2" fill="url(#barGradient)" className="animate-pulse" />
                <rect x="320" y="140" width="30" height="80" rx="2" fill="url(#barGradient)" className="animate-pulse" />
                
                {/* Bottom Action Buttons */}
                <rect x="20" y="240" width="110" height="40" rx="8" fill="#ECFDF5" className="dark:fill-red-900/30" />
                <circle cx="45" cy="260" r="12" fill="#D74747FF" />
                <path d="M45 255V265M40 260H50" stroke="white" strokeWidth="2" strokeLinecap="round" />
                
                <rect x="140" y="240" width="110" height="40" rx="8" fill="#ECFDF5" className="dark:fill-red-900/30" />
                <circle cx="165" cy="260" r="12" fill="#D74747FF" />
                <path d="M160 260H170M165 255V265" stroke="white" strokeWidth="2" strokeLinecap="round" />
                
                <rect x="260" y="240" width="110" height="40" rx="8" fill="#ECFDF5" className="dark:fill-red-900/30" />
                <circle cx="285" cy="260" r="12" fill="#D74747FF" />
                <path d="M281 260L284 263L289 258" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Gradients */}
                <defs>
                  <linearGradient id="headerGradient" x1="0" y1="0" x2="400" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#D74747FF" />
                    <stop offset="1" stopColor="#D74747FF" />
                  </linearGradient>
                  <linearGradient id="barGradient" x1="280" y1="160" x2="350" y2="220" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#D74747FF" />
                    <stop offset="1" stopColor="#D74747FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium mb-4">
              Core Capabilities
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">Powerful Financial Features</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">AI-powered financial tools designed to help you save, grow, and manage your finances more effectively</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-[30px] shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition duration-300 relative overflow-hidden group">
              <div className="animate-pulse absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-red-50 to-transparent dark:from-red-900/10 rounded-bl-full"></div>
              <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-red-600 dark:text-red-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">Secure Group Savings</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Join or create Ajo groups for secure collective savings with transparent tracking and distributions.</p>
              
              {/* Stats */}
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-[30px]">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Average Group Size</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white">15.8</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Growth Rate</p>
                    <p className="text-lg font-bold text-red-500">+24%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-[30px] shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition duration-300 relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-red-50 to-transparent dark:from-red-900/10 rounded-bl-full"></div>
              <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-red-600 dark:text-red-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">Micro-Loans Access</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Access micro-loans based on your credit score built through consistent Ajo contributions.</p>
              
              {/* Mini chart */}
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-[30px]">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Loan Approval Rate</p>
                  <p className="text-sm font-semibold text-red-500">94.3%</p>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div className="h-full animate-pulse bg-gradient-to-r from-red-500 to-red-500 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-[30px] shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition duration-300 relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-red-50 to-transparent dark:from-red-900/10 rounded-bl-full"></div>
              <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-red-600 dark:text-red-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">AI Credit Scoring</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Build your credit score through consistent participation, enabling access to larger loans over time.</p>
              
              {/* Circular progress */}
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-[30px] flex items-center justify-between">
                <div className="relative w-14 h-14">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      className="stroke-current text-gray-200 dark:text-gray-600"
                      fill="none"
                      strokeWidth="3"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="stroke-current text-red-500"
                      fill="none"
                      strokeWidth="3"
                      strokeDasharray="85, 100"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.5" className="text-xs font-medium text-gray-800 dark:text-white" textAnchor="middle">85%</text>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Avg. Credit Score</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-white animate-pulse">720</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Modern Fintech Style */}
      <section id="how-it-works" className="max-w-7xl mx-auto py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl my-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium mb-4">
              Simple Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">How Ajo Works</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Our platform simplifies traditional Ajo with technology, making financial collaboration accessible to everyone</p>
          </div>
          
          {/* Desktop Process Flow */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-500 dark:from-red-400 dark:to-red-400 -translate-y-1/2 z-0"></div>
              
              {/* Steps Container */}
              <div className="grid grid-cols-4 gap-6 relative z-10">
                {/* Step 1 */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-500 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg mb-6 relative z-10">
                    <span>01</span>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-[30px] shadow-lg border border-gray-100 dark:border-gray-700 w-full transition duration-300 hover:shadow-xl">
                    <h3 className="text-xl font-semibold mb-3 text-center dark:text-white">Register</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center">Create your account with our simplified KYC process and get verified in minutes.</p>
                    <div className="mt-4 flex justify-center">
                      <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-red-50 text-red-500 text-xs dark:bg-red-900/30 dark:text-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        2 Minutes
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-500 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg mb-6 relative z-10">
                    <span>02</span>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-[30px] shadow-lg border border-gray-100 dark:border-gray-700 w-full transition duration-300 hover:shadow-xl">
                    <h3 className="text-xl font-semibold mb-3 text-center dark:text-white">Join a Group</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center">Join an existing Ajo group or create your own with your network.</p>
                    <div className="mt-4 flex justify-center">
                      <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-red-50 text-red-500 text-xs dark:bg-red-900/30 dark:text-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                        1000+ Groups
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-500 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg mb-6 relative z-10">
                    <span>03</span>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-[30px] shadow-lg border border-gray-100 dark:border-gray-700 w-full transition duration-300 hover:shadow-xl">
                    <h3 className="text-xl font-semibold mb-3 text-center dark:text-white">Make Contributions</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center">Contribute regularly through our secure digital payment system.</p>
                    <div className="mt-4 flex justify-center">
                      <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-red-50 text-red-500 text-xs dark:bg-red-900/30 dark:text-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        Real-time Tracking
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-500 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg mb-6 relative z-10">
                    <span>04</span>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-[30px] shadow-lg border border-gray-100 dark:border-gray-700 w-full transition duration-300 hover:shadow-xl">
                    <h3 className="text-xl font-semibold mb-3 text-center dark:text-white">Access Benefits</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center">Receive funds, build credit, and apply for microloans when you need them.</p>
                    <div className="mt-4 flex justify-center">
                      <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-red-50 text-red-500 text-xs dark:bg-red-900/30 dark:text-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                      Low Interest Rates
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
          {/* Mobile Process Flow */}
          <div className="flex flex-col md:hidden w-full">
            <div className="relative flex flex-col space-y-12 w-full">
              {/* Connecting Line */}
              <div className="absolute top-0 bottom-0 left-[28px] w-1 bg-gradient-to-b from-red-500 to-red-500 dark:from-red-400 dark:to-red-400 z-0"></div>
              
              {/* Step 1 */}
              <div className="flex items-start relative z-10">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-red-500 text-white rounded-full flex items-center justify-center text-base font-bold shadow-lg flex-shrink-0 mr-4">
                  01
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-[30px] shadow-lg border border-gray-100 dark:border-gray-700 flex-grow">
                  <h3 className="text-lg font-semibold mb-2 dark:text-white">Register</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Create your account with our simplified KYC process and get verified in minutes.</p>
                  <div className="mt-3">
                    <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-red-50 text-red-500 text-xs dark:bg-red-900/30 dark:text-red-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      2 Minutes
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="flex items-start relative z-10">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-red-500 text-white rounded-full flex items-center justify-center text-base font-bold shadow-lg flex-shrink-0 mr-4">
                  02
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-[30px] shadow-lg border border-gray-100 dark:border-gray-700 flex-grow">
                  <h3 className="text-lg font-semibold mb-2 dark:text-white">Join a Group</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Join an existing Ajo group or create your own with your network.</p>
                  <div className="mt-3">
                    <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-red-50 text-red-500 text-xs dark:bg-red-900/30 dark:text-red-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                      1000+ Groups
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="flex items-start relative z-10">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-red-500 text-white rounded-full flex items-center justify-center text-base font-bold shadow-lg flex-shrink-0 mr-4">
                  03
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-[30px] shadow-lg border border-gray-100 dark:border-gray-700 flex-grow">
                  <h3 className="text-lg font-semibold mb-2 dark:text-white">Make Contributions</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Contribute regularly through our secure digital payment system.</p>
                  <div className="mt-3">
                    <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-red-50 text-red-500 text-xs dark:bg-red-900/30 dark:text-red-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      Real-time Tracking
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="flex items-start relative z-10">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-full flex items-center justify-center text-base font-bold shadow-lg flex-shrink-0 mr-4">
                  04
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-[30px] shadow-lg border border-gray-100 dark:border-gray-700 flex-grow">
                  <h3 className="text-lg font-semibold mb-2 dark:text-white">Access Benefits</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Receive funds, build credit, and apply for microloans when you need them.</p>
                  <div className="mt-3">
                    <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-red-50 text-red-500 text-xs dark:bg-red-900/30 dark:text-red-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                      Low Interest Rates
                    </span>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="max-w-7xl mx-auto py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-[30px] shadow-sm border border-gray-100 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-300 italic">"Digital Ajo helped me save enough to expand my business. The group contributions kept me accountable, and the micro-loan helped me when I needed it most."</p>
              <div className="flex items-center mt-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold dark:text-white">Amina Johnson</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Market Vendor</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-[30px] shadow-sm border border-gray-100 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-300 italic">"As an agent, I've been able to help dozens of women in my community access financial services. The platform makes it easy to manage groups and requests."</p>
              <div className="flex items-center mt-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold dark:text-white">Fatima Ibrahim</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Ajo Agent</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-[30px] shadow-sm border border-gray-100 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-300 italic">"I've participated in traditional Ajo for years, but the digital platform brings transparency and security. I love being able to track everything on my phone."</p>
              <div className="flex items-center mt-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold dark:text-white">Grace Okafor</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Small Business Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Interactive with Dropdowns */}
      <section id="faq" className="w-full max-w-7xl mx-auto py-16">
        <div className="w-full mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-[30px] shadow-sm overflow-hidden">
              <button 
                onClick={() => toggleFaq(0)} 
                className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
              >
                <h3 className="text-xl font-semibold dark:text-white">What is an Ajo group?</h3>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-6 w-6 text-gray-500 dark:text-gray-300 transition-transform duration-200 ${openFaq === 0 ? 'transform rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`px-6 pb-6 ${openFaq === 0 ? 'block' : 'hidden'}`}>
                <p className="text-gray-600 dark:text-gray-200">An Ajo group is a traditional rotating savings group where members contribute regularly, and each member gets a turn to receive the full pool of contributions. Our digital platform enhances this traditional system with security, transparency, and additional financial services.</p>
              </div>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-[30px] shadow-sm overflow-hidden">
              <button 
                onClick={() => toggleFaq(1)} 
                className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
              >
                <h3 className="text-xl font-semibold dark:text-white">How do I qualify for a loan?</h3>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-6 w-6 text-gray-500 dark:text-gray-300 transition-transform duration-200 ${openFaq === 1 ? 'transform rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`px-6 pb-6 ${openFaq === 1 ? 'block' : 'hidden'}`}>
                <p className="text-gray-600 dark:text-gray-200">Loans are based on your credit score, which builds through consistent participation in Ajo groups. Regular contributions improve your score, qualifying you for increasing loan amounts over time.</p>
              </div>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-[30px] shadow-sm overflow-hidden">
              <button 
                onClick={() => toggleFaq(2)} 
                className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
              >
                <h3 className="text-xl font-semibold dark:text-white">What role do agents play?</h3>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-6 w-6 text-gray-500 dark:text-gray-300 transition-transform duration-200 ${openFaq === 2 ? 'transform rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`px-6 pb-6 ${openFaq === 2 ? 'block' : 'hidden'}`}>
                <p className="text-gray-600 dark:text-gray-200">Agents help facilitate group creation, manage contributions, process withdrawals, and assist users who may not be technically savvy. They serve as trusted intermediaries in the Ajo ecosystem.</p>
              </div>
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-white dark:bg-gray-800 rounded-[30px] shadow-sm overflow-hidden">
              <button 
                onClick={() => toggleFaq(3)} 
                className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
              >
                <h3 className="text-xl font-semibold dark:text-white">Is my information secure?</h3>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-6 w-6 text-gray-500 dark:text-gray-300 transition-transform duration-200 ${openFaq === 3 ? 'transform rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`px-6 pb-6 ${openFaq === 3 ? 'block' : 'hidden'}`}>
                <p className="text-gray-600 dark:text-gray-200">Yes, we use advanced encryption technologies to protect your personal and financial information. Our KYC process ensures all users are verified while maintaining data security.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-red-700 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of individuals who are taking control of their financial future with Digital Ajo.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/auth/register" className="bg-white text-red-500 px-6 py-3 rounded-lg text-center hover:bg-gray-100 transition">
              Register Now
            </Link>
            <Link href="/auth/register?type=agent" className="border border-white text-white px-6 py-3 rounded-lg text-center hover:bg-red-500 transition">
              Become an Agent
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-start flex-wrap gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Digital Ajo</h3>
              <p className="text-gray-400 max-w-md">Empowering individuals through financial inclusion and collaborative savings.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition">How It Works</a></li>
                <li><a href="#testimonials" className="text-gray-400 hover:text-white transition">Testimonials</a></li>
                <li><a href="#faq" className="text-gray-400 hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            {/* <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/help-center" className="text-gray-400 hover:text-white transition">Help Center</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition">Blog</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link></li>
              </ul>
            </div> */}
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">Email: support@digitalajo.com</li>
                <li className="text-gray-400">Phone: +234 800 AJO-HELP</li>
                {/* <li className="flex space-x-4 mt-4">
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8 11.623 5.176-1.332 9-6.03 9-11.623 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M2.25 3c-.966 0-1.75 1.284-1.75 2.25h.012c.966 0 1.75-1.284 1.75-2.25H2.25zm12.75 0c-.966 0-1.75 1.284-1.75 2.25H16.25c.966 0 1.75-1.284 1.75-2.25H15C15 4.484 13.522 3 12 3c-1.522 0-3 1.484-3 3v1c0 2.418 1.479 4.5 3 4.5s3-2.082 3-4.5v-1c0-1.516-.478-2.996-1-4C6.878 5.516 6 6.41 6 7.5V11c0 2.418 1.479 4.5 3 4.5s3-2.082 3-4.5v-3.5c0-1.09.42-2.484 1-3.5h-.012a2.25 2.25 0 01-.75 2.25v3.75c0 2.418 1.479 4.5 3 4.5s3-2.082 3-4.5V7.5c0-.59-.11-1.18-.25-1.75zM12 7.5V3.75L7.5 12h1.75L12 7.5z" clipRule="evenodd" />
                    </svg>
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Digital Ajo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
