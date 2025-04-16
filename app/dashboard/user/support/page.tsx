'use client';

import { useState } from 'react';
import { DashboardLayout, NavItem, HomeIcon, GroupIcon, WalletIcon, LoanIcon, CreditIcon, HelpIcon, ProfileIcon } from '@/components/DashboardLayout';
import { userNavigation } from '@/constant/navItem';

// Mock user data
const mockUserData = {
  name: 'Amina Johnson',
  email: 'amina@example.com',
  phone: '+234 123 4567 890',
};

// FAQ Data
const faqData = [
  {
    category: 'General',
    questions: [
      {
        question: 'What is Digital Ajo?',
        answer: 'Digital Ajo is an AI-powered platform that fosters women\'s financial inclusion through secure group savings, transparent contribution distributions, and micro-loans. It digitizes the traditional Ajo (rotating savings) system widely used in Nigerian communities.'
      },
      {
        question: 'How do I get started with Digital Ajo?',
        answer: 'To get started, register for an account, complete your KYC verification, and join an existing Ajo group or create a new one. You will need to connect with an agent who will help facilitate your transactions and group management.'
      },
      {
        question: 'Is Digital Ajo safe?',
        answer: 'Yes, Digital Ajo employs state-of-the-art security measures to protect your data and finances. All transactions are recorded on a secure system, and we use encryption to safeguard your personal information.'
      }
    ]
  },
  {
    category: 'Groups',
    questions: [
      {
        question: 'How do I join an Ajo group?',
        answer: 'You can join an Ajo group by connecting with an agent in your area. They will guide you through the process of joining an existing group or help you create a new one with other interested individuals.'
      },
      {
        question: 'What happens if I miss a contribution?',
        answer: 'If you miss a contribution, there may be a penalty fee as determined by your group rules. Multiple missed contributions could affect your position in the group and your credit score. Always communicate with your agent if you anticipate challenges with making your contribution.'
      },
      {
        question: 'Can I be in multiple Ajo groups?',
        answer: 'Yes, you can join multiple Ajo groups as long as you can meet the contribution requirements for each. This can be a good way to save for different goals or to increase your savings capacity.'
      }
    ]
  },
  {
    category: 'Payments',
    questions: [
      {
        question: 'How do I make my contributions?',
        answer: 'You can make contributions through your Digital Ajo wallet, which can be funded via bank transfers, USSD, or by paying cash to your agent. Your agent will record and confirm your contribution in the system.'
      },
      {
        question: 'When will I receive my payout?',
        answer: 'Your payout will be based on the rotation schedule of your Ajo group. The specific date will be available in your group details page. Payouts are typically processed within 24 hours of the scheduled date.'
      },
      {
        question: 'Can I request an early payout?',
        answer: 'Early payouts are generally not part of the standard Ajo system as they disrupt the rotation schedule. However, in case of emergencies, you can communicate with your group members and agent to explore possible arrangements.'
      }
    ]
  },
  {
    category: 'Account',
    questions: [
      {
        question: 'How do I update my personal information?',
        answer: 'You can update your personal information in the Profile section of your dashboard. Some updates, especially those related to KYC information, may require verification by our support team.'
      },
      {
        question: 'What should I do if I forget my password?',
        answer: 'If you forget your password, use the "Forgot Password" link on the login page. A password reset link will be sent to your registered email address. If you don\'t have access to your email, please contact support for assistance.'
      },
      {
        question: 'How do I change my bank account details?',
        answer: 'You can update your bank account details in the Profile section under Bank Details. Please ensure accuracy as this affects your ability to receive payouts and withdrawals.'
      }
    ]
  },
  {
    category: 'Loans',
    questions: [
      {
        question: 'How do I qualify for a loan?',
        answer: 'Loan qualification is based on your participation in Ajo groups, your contribution history, and your credit score. Consistent contributions over time improve your chances of loan approval.'
      },
      {
        question: 'What is the maximum loan amount I can get?',
        answer: 'The maximum loan amount is determined by your credit score, saving history, and group participation. Initially, loans are capped at a percentage of your total contributions, but this can increase as you build credibility in the system.'
      },
      {
        question: 'What are the loan repayment terms?',
        answer: 'Loan repayment terms vary but typically range from 1-6 months depending on the loan amount. Repayments can be made through your Digital Ajo wallet, and missed payments will affect your credit score.'
      }
    ]
  }
];


export default function UserSupport() {
  const [activeTab, setActiveTab] = useState('faq'); // 'faq', 'contact', 'ticket'
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [expandedQuestions, setExpandedQuestions] = useState<{ [key: string]: boolean }>({});
  
  // For support ticket
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [ticketType, setTicketType] = useState('general');
  const [success, setSuccess] = useState(false);
  
  // Toggle FAQ question expansion
  const toggleQuestion = (category: string, index: number) => {
    const key = `${category}-${index}`;
    setExpandedQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  // Submit support ticket
  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be replaced with actual API call
    console.log('Submitting ticket:', {
      subject,
      message,
      ticketType,
      userEmail: mockUserData.email,
      userName: mockUserData.name,
      userPhone: mockUserData.phone
    });
    
    // Show success message
    setSuccess(true);
    
    // Reset form
    setSubject('');
    setMessage('');
    setTicketType('general');
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  return (
    <DashboardLayout 
      navigation={userNavigation}
      userType="user"
      userName={mockUserData.name}
      pageTitle="Help & Support"
    >
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-[30px] overflow-hidden">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Help & Support Center</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                  Get help with your account, groups, or general inquiries
                </p>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 transition-colors duration-200">
              <nav className="flex overflow-x-auto py-2 px-4">
                <button
                  className={`text-sm font-medium py-3 px-6 rounded-md mr-2 ${
                    activeTab === 'faq' 
                      ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm dark:shadow-gray-900/30' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                  } whitespace-nowrap transition-all duration-150`}
                  onClick={() => setActiveTab('faq')}
                >
                  FAQs
                </button>
                <button
                  className={`text-sm font-medium py-3 px-6 rounded-md mr-2 ${
                    activeTab === 'contact' 
                      ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm dark:shadow-gray-900/30' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                  } whitespace-nowrap transition-all duration-150`}
                  onClick={() => setActiveTab('contact')}
                >
                  Contact Us
                </button>
                <button
                  className={`text-sm font-medium py-3 px-6 rounded-md ${
                    activeTab === 'ticket' 
                      ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm dark:shadow-gray-900/30' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                  } whitespace-nowrap transition-all duration-150`}
                  onClick={() => setActiveTab('ticket')}
                >
                  Submit a Ticket
                </button>
              </nav>
            </div>

            {/* Content Area */}
            <div className="bg-gray-50 dark:bg-gray-800/50">
              {/* FAQs Tab */}
              {activeTab === 'faq' && (
                <div className="p-6">
                  <div className="md:grid md:grid-cols-12 md:gap-6">
                    <div className="md:col-span-3">
                      <nav className="space-y-1" aria-label="FAQ Categories">
                        {faqData.map((category) => (
                          <button
                            key={category.category}
                            onClick={() => setSelectedCategory(category.category)}
                            className={`${
                              selectedCategory === category.category
                                ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-500'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
                            } group flex items-center px-4 py-3 text-sm font-medium rounded-[20px] w-full text-left transition-colors duration-200`}
                          >
                            {category.category}
                          </button>
                        ))}
                      </nav>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-9">
                      <div className="space-y-4">
                        {faqData
                          .find(category => category.category === selectedCategory)
                          ?.questions.map((faq, index) => (
                            <div
                              key={index}
                              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[20px] overflow-hidden transition-colors duration-200"
                            >
                              <button
                                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 focus:outline-none transition-colors duration-200"
                                onClick={() => toggleQuestion(selectedCategory, index)}
                              >
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{faq.question}</span>
                                <svg
                                  className={`h-5 w-5 text-gray-500 dark:text-gray-400 transform ${
                                    expandedQuestions[`${selectedCategory}-${index}`] ? '-rotate-180' : 'rotate-0'
                                  } transition-transform duration-150 ease-in-out`}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                              {expandedQuestions[`${selectedCategory}-${index}`] && (
                                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 transition-colors duration-200">
                                  <p className="text-sm text-gray-700 dark:text-gray-300">{faq.answer}</p>
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Us Tab */}
              {activeTab === 'contact' && (
                <div className="p-6">
                  <div className="max-w-3xl mx-auto space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-[20px] shadow-sm border border-gray-200 dark:border-gray-700">
                        <h4 className="text-base font-medium text-gray-900 dark:text-white flex items-center">
                          <svg className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          Phone Support
                        </h4>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          Our customer support team is available from Monday to Friday, 9:00 AM - 5:00 PM.
                        </p>
                        <p className="mt-2 text-sm text-gray-900 dark:text-white font-medium">
                          +234 800 123 4567
                        </p>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-[20px] shadow-sm border border-gray-200 dark:border-gray-700">
                        <h4 className="text-base font-medium text-gray-900 dark:text-white flex items-center">
                          <svg className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Email Support
                        </h4>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          For general inquiries and non-urgent matters, please email us. We respond within 24 hours.
                        </p>
                        <p className="mt-2 text-sm text-gray-900 dark:text-white font-medium">
                          support@digitalajo.com
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-[20px] shadow-sm border border-gray-200 dark:border-gray-700">
                      <h4 className="text-base font-medium text-gray-900 dark:text-white flex items-center">
                        <svg className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Office Address
                      </h4>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Visit our office for in-person support. We recommend scheduling an appointment in advance.
                      </p>
                      <p className="mt-2 text-sm text-gray-900 dark:text-white">
                        123 Lagos Business District<br />
                        Victoria Island, Lagos<br />
                        Nigeria
                      </p>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-[20px] shadow-sm border border-gray-200 dark:border-gray-700">
                      <h4 className="text-base font-medium text-gray-900 dark:text-white flex items-center">
                        <svg className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Social Media
                      </h4>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Follow us on social media for updates, tips, and quick support.
                      </p>
                      <div className="mt-4 flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                          <span className="sr-only">Facebook</span>
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                          <span className="sr-only">Instagram</span>
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                          <span className="sr-only">Twitter</span>
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit a Ticket Tab */}
              {activeTab === 'ticket' && (
                <div className="p-6">
                  <div className="max-w-3xl mx-auto">
                    {success && (
                      <div className="mb-6 p-4 rounded-[20px] bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-green-800 dark:text-green-400">Ticket Submitted Successfully</h3>
                            <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                              <p>Thank you for your message. Our team will review your ticket and respond as soon as possible.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="bg-white dark:bg-gray-800 rounded-[20px] shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Submit a Support Ticket</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          Need personalized help? Submit a ticket and our support team will get back to you within 24 hours.
                        </p>
                      </div>
                      
                      <form onSubmit={handleSubmitTicket} className="p-6 space-y-6">
                        <div>
                          <label htmlFor="ticket-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Ticket Type
                          </label>
                          <select
                            id="ticket-type"
                            name="ticket-type"
                            value={ticketType}
                            onChange={(e) => setTicketType(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-[20px] transition-colors duration-200"
                          >
                            <option value="general">General Inquiry</option>
                            <option value="account">Account Issues</option>
                            <option value="payment">Payment Issues</option>
                            <option value="group">Group Issues</option>
                            <option value="agent">Agent Issues</option>
                            <option value="technical">Technical Support</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Subject
                          </label>
                          <input
                            type="text"
                            name="subject"
                            id="subject"
                            required
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="mt-1 block w-full shadow-sm focus:ring-red-500 p-2 focus:border-red-500 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-[20px] transition-colors duration-200"
                            placeholder="Brief description of your issue"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={6}
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="mt-1 block w-full shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-[20px] transition-colors duration-200"
                            placeholder="Please describe your issue in detail..."
                          ></textarea>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="terms"
                              name="terms"
                              type="checkbox"
                              required
                              className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300 dark:border-gray-600 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="font-medium text-gray-700 dark:text-gray-300">
                              I agree to the privacy policy
                            </label>
                            <p className="text-gray-500 dark:text-gray-400">
                              Your information will only be used to respond to this ticket and improve our services.
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-[20px] text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-all duration-200"
                          >
                            Submit Ticket
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
