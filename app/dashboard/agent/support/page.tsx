'use client';

import { useState } from 'react';
import { NavItem, HomeIcon, GroupIcon, WalletIcon, LoanIcon, CreditIcon, HelpIcon, UsersIcon, ProfileIcon } from '@/components/DashboardLayout';
import { DashboardLayout } from '@/components/DashboardLayout';
import { agentNavigation } from '@/constant/navItem';

// Mock agent data
const mockAgentData = {
  name: 'Fatima Ibrahim',
};

// Mock tickets data
const mockTickets = [
  {
    id: 'TICKET-001',
    subject: 'User account verification issue',
    status: 'open',
    priority: 'high',
    createdAt: '2025-04-10T10:30:00',
    lastUpdate: '2025-04-11T14:20:00',
    category: 'Account',
    messages: [
      {
        from: 'agent',
        message: 'One of my users is having trouble with the verification process. The system keeps rejecting their ID.',
        timestamp: '2025-04-10T10:30:00'
      },
      {
        from: 'support',
        message: 'Thank you for reporting this. Could you please provide the user\'s ID and screenshots of the error?',
        timestamp: '2025-04-11T14:20:00'
      }
    ]
  },
  {
    id: 'TICKET-002',
    subject: 'Group creation failure',
    status: 'closed',
    priority: 'medium',
    createdAt: '2025-04-08T09:15:00',
    lastUpdate: '2025-04-09T11:45:00',
    category: 'Groups',
    messages: [
      {
        from: 'agent',
        message: 'I am trying to create a new savings group but getting an error at the final step.',
        timestamp: '2025-04-08T09:15:00'
      },
      {
        from: 'support',
        message: 'Can you please provide more details about the error?',
        timestamp: '2025-04-08T13:30:00'
      },
      {
        from: 'agent',
        message: 'It says "Invalid contribution schedule". I\'ve attached a screenshot.',
        timestamp: '2025-04-08T14:45:00'
      },
      {
        from: 'support',
        message: 'Thank you. This is a known issue with weekly schedules. Please try selecting a monthly schedule first, save, then edit to weekly. We\'ve fixed this bug and it will be deployed soon.',
        timestamp: '2025-04-09T11:45:00'
      }
    ]
  }
];

// Mock FAQs
const mockFaqs = [
  {
    question: 'How do I add a new user to my group?',
    answer: 'To add a new user to your group, go to the Groups page, select your group, click "Manage Members", and then click the "Add Member" button. You can then search for users by name, email, or phone number.'
  },
  {
    question: 'How are my commissions calculated?',
    answer: 'Agent commissions are calculated as 10% of the contributions in your groups. Commissions are paid out monthly and can be viewed in your Profile page under "Commission History".'
  },
  {
    question: 'What should I do if a user wants to withdraw funds?',
    answer: 'When a user requests a withdrawal, you\'ll receive a notification. Go to the Withdrawals page, review the request, and process it. You can either approve or reject the request based on the group\'s rules and the user\'s contribution history.'
  },
  {
    question: 'How can I improve my agent credit score?',
    answer: 'To improve your credit score, focus on maintaining consistent group activities, ensuring members make regular contributions, facilitating timely loan repayments, and processing withdrawal requests promptly.'
  },
  {
    question: 'How do I help a user apply for a loan?',
    answer: 'To help a user apply for a loan, go to the Loans page and click "Apply for New Loan". Select the user, their group, and fill in the loan details including amount, purpose, and duration. The system will automatically check eligibility based on the user\'s contributions and credit score.'
  }
];

export default function AgentSupport() {
  const [activeTab, setActiveTab] = useState('tickets'); // 'tickets', 'faqs', 'contact'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketCategory, setNewTicketCategory] = useState('');
  const [newTicketMessage, setNewTicketMessage] = useState('');
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  
  // Filter tickets based on search
  const filteredTickets = mockTickets.filter(ticket => 
    ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter FAQs based on search
  const filteredFaqs = mockFaqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Handle send message in ticket
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    alert(`Message sent: ${newMessage}`);
    setNewMessage('');
  };
  
  // Handle create new ticket
  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTicketSubject || !newTicketCategory || !newTicketMessage) {
      alert('Please fill all fields');
      return;
    }
    
    alert(`New ticket created: ${newTicketSubject}`);
    
    setNewTicketSubject('');
    setNewTicketCategory('');
    setNewTicketMessage('');
    setShowNewTicketForm(false);
  };
  
  return (
    <DashboardLayout 
      navigation={agentNavigation}
      userType="agent"
      userName={mockAgentData.name}
      pageTitle="Help & Support"
    >
      {/* Tabs */}
      <div className="mb-6">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">Select a tab</label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-red-500 focus:ring-red-500"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="tickets">My Tickets</option>
            <option value="faqs">FAQs</option>
            <option value="contact">Contact Support</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('tickets')}
                className={`${
                  activeTab === 'tickets'
                    ? 'border-red-500 text-red-600 dark:text-red-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                My Tickets
              </button>
              <button
                onClick={() => setActiveTab('faqs')}
                className={`${
                  activeTab === 'faqs'
                    ? 'border-red-500 text-red-600 dark:text-red-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                FAQs
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`${
                  activeTab === 'contact'
                    ? 'border-red-500 text-red-600 dark:text-red-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Contact Support
              </button>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Search Bar */}
      {activeTab !== 'contact' && (
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="focus:ring-red-500 focus:border-red-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-[15px]"
              placeholder={`Search ${activeTab === 'tickets' ? 'tickets' : 'FAQs'}...`}
            />
          </div>
        </div>
      )}
      
      {/* Tickets Tab */}
      {activeTab === 'tickets' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Support Tickets</h2>
            <button
              onClick={() => setShowNewTicketForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-[15px] shadow-sm text-white bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
            >
              Create New Ticket
            </button>
          </div>
          
          {showNewTicketForm ? (
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-[30px] mb-6 border border-gray-100 dark:border-gray-700">
              <div className="px-6 py-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Create New Support Ticket</h3>
                <div className="mt-5">
                  <form onSubmit={handleCreateTicket}>
                    <div className="grid grid-cols-1 gap-6">
                      <div className="col-span-1">
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Subject
                        </label>
                        <input
                          type="text"
                          name="subject"
                          id="subject"
                          className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-[15px]"
                          value={newTicketSubject}
                          onChange={(e) => setNewTicketSubject(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="col-span-1">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Category
                        </label>
                        <select
                          id="category"
                          name="category"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-[15px]"
                          value={newTicketCategory}
                          onChange={(e) => setNewTicketCategory(e.target.value)}
                          required
                        >
                          <option value="">Select a category</option>
                          <option value="Account">Account</option>
                          <option value="Groups">Groups</option>
                          <option value="Loans">Loans</option>
                          <option value="Withdrawals">Withdrawals</option>
                          <option value="Payments">Payments</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      
                      <div className="col-span-1">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-[15px]"
                          value={newTicketMessage}
                          onChange={(e) => setNewTicketMessage(e.target.value)}
                          required
                        ></textarea>
                      </div>
                    </div>
                    
                    <div className="mt-5 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowNewTicketForm(false)}
                        className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-[15px] shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-[15px] text-white bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                      >
                        Submit Ticket
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : selectedTicket ? (
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-[30px] mb-6 border border-gray-100 dark:border-gray-700">
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      {selectedTicket.subject}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                      Ticket #{selectedTicket.id} • {selectedTicket.category}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-[15px] text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-800"
                  >
                    Back to List
                  </button>
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    selectedTicket.status === 'open' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {selectedTicket.status.charAt(0).toUpperCase() + selectedTicket.status.slice(1)}
                  </span>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    selectedTicket.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                    selectedTicket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                  }`}>
                    {selectedTicket.priority.charAt(0).toUpperCase() + selectedTicket.priority.slice(1)} Priority
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Created on {formatDate(selectedTicket.createdAt)}
                  </span>
                </div>
              </div>
              
              <div className="px-6 py-5">
                <div className="space-y-6">
                  {selectedTicket.messages.map((message: any, index: number) => (
                    <div key={index} className={`flex ${message.from === 'agent' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-lg rounded-[15px] px-4 py-3 ${
                        message.from === 'agent' ? 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        <div className="text-sm">{message.message}</div>
                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{formatDate(message.timestamp)}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {selectedTicket.status === 'open' && (
                  <div className="mt-6">
                    <label htmlFor="reply" className="sr-only">Reply</label>
                    <textarea
                      id="reply"
                      name="reply"
                      rows={3}
                      className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-[15px]"
                      placeholder="Type your reply..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    ></textarea>
                    <div className="mt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={handleSendMessage}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-[15px] shadow-sm text-white bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="bg-white dark:bg-gray-800 shadow-lg rounded-[30px] p-6 border border-gray-100 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-900/50 transition-colors duration-200 cursor-pointer"
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                          {ticket.subject}
                        </h3>
                        <div className="mt-1 flex items-center space-x-2">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            ticket.status === 'open' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {ticket.id} • {ticket.category}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Last updated: {formatDate(ticket.lastUpdate)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-[30px] p-6 text-center border border-gray-100 dark:border-gray-700">
                  <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No tickets found</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    No tickets match your search criteria.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* FAQs Tab */}
      {activeTab === 'faqs' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-[30px] overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                Find answers to common questions about the Digital Ajo platform
              </p>
            </div>
            
            {filteredFaqs.length > 0 ? (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredFaqs.map((faq, index) => (
                  <div key={index} className="px-6 py-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                    <dt className="text-lg font-medium text-gray-900 dark:text-white">
                      {faq.question}
                    </dt>
                    <dd className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-6 py-5 text-center">
                <p className="text-gray-500 dark:text-gray-400">No FAQs found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Contact Support Tab */}
      {activeTab === 'contact' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 rounded-[30px] shadow-lg p-6 text-white">
            <h3 className="text-2xl font-bold">Need Help?</h3>
            <p className="mt-2 text-red-100">
              Our support team is here to assist you 24/7. Choose your preferred way to reach us.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-[30px] p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-12 w-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Customer Support</h4>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Our customer support team is ready to help with any questions or issues.
                  </p>
                  <div className="mt-4 space-y-3">
                    <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-medium mr-2">Phone:</span>
                      +234 1 234 5678
                    </p>
                    <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-medium mr-2">Email:</span>
                      support@digitalajo.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-[30px] p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-12 w-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Technical Support</h4>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Get help with technical issues related to the platform or app.
                  </p>
                  <div className="mt-4 space-y-3">
                    <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-medium mr-2">Phone:</span>
                      +234 1 234 5679
                    </p>
                    <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-medium mr-2">Email:</span>
                      tech@digitalajo.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-[30px] p-6 border border-gray-100 dark:border-gray-700">
            <button
              onClick={() => {
                setActiveTab('tickets');
                setShowNewTicketForm(true);
              }}
              className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-[15px] text-white bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create New Support Ticket
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}