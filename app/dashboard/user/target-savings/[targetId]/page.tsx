'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout'; // Import Layout
import { userNavigation } from '@/constant/navItem'; // Import Navigation

// Mock user data (needed for layout)
const mockUserData = {
  name: 'Amina Johnson',
};

// Mock data - In a real app, you'd fetch this based on targetId
const mockTargetSavings = [
    {
        id: 1,
        name: 'New Smartphone',
        targetAmount: 150000,
        currentAmount: 75000,
        startDate: '2025-01-15',
        endDate: '2025-06-15',
        frequency: 'Weekly',
        status: 'active',
        type: 'personal',
        autoDebit: true,
        transactions: [
            { date: '2025-01-22', amount: 10000, type: 'deposit' },
            { date: '2025-01-29', amount: 10000, type: 'deposit' },
            { date: '2025-02-05', amount: 10000, type: 'deposit' },
            // ... more transactions
        ]
    },
    {
        id: 2,
        name: 'Vacation Fund',
        targetAmount: 500000,
        currentAmount: 200000,
        startDate: '2025-03-01',
        endDate: '2025-12-01',
        frequency: 'Monthly',
        status: 'active',
        type: 'personal',
        autoDebit: false,
        transactions: [
            { date: '2025-03-15', amount: 50000, type: 'deposit' },
            { date: '2025-04-15', amount: 50000, type: 'deposit' },
            // ... more transactions
        ]
    },
    {
        id: 3,
        name: 'Group Trip Contribution',
        targetAmount: 50000,
        currentAmount: 50000,
        startDate: '2024-05-10',
        endDate: '2024-08-10',
        frequency: 'Once',
        status: 'completed',
        type: 'group',
        autoDebit: false,
        transactions: [
            { date: '2024-05-10', amount: 50000, type: 'deposit' }
        ]
    },
    {
        id: 4,
        name: 'Emergency Fund',
        targetAmount: 1000000,
        currentAmount: 150000,
        startDate: '2024-01-01',
        endDate: 'Ongoing',
        frequency: 'Bi-Weekly',
        status: 'active',
        type: 'personal',
        autoDebit: true,
        transactions: []
    }
];

interface TargetDetailsProps {
    params: { targetId: string };
}

const TargetDetailsPage: React.FC<TargetDetailsProps> = ({ params }) => {
    const targetId = parseInt(params.targetId, 10);
    const target = mockTargetSavings.find(t => t.id === targetId);

    if (!target) {
        return (
            <DashboardLayout
              navigation={userNavigation}
              userType="user"
              userName={mockUserData.name}
              pageTitle="Target Not Found"
            >
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">Target not found.</div>
            </DashboardLayout>
        );
    }

    const progress = (target.currentAmount / target.targetAmount) * 100;

    const handleBreakEarly = () => {
        // Placeholder for break early logic - likely involves a modal confirmation
        alert('Breaking early may incur penalties. Are you sure? (Placeholder)');
    };

    return (
        <DashboardLayout
          navigation={userNavigation}
          userType="user"
          userName={mockUserData.name}
          pageTitle={`Target: ${target.name}`}
        >
            <div className="space-y-6">
                {/* Back Button */}
                <Link href="/dashboard/user/target-savings" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-4">
                    <ArrowLeft size={18} className="mr-1" />
                    Back to Target Savings
                </Link>

                <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">{target.name} Details</h1>

                {/* Target Summary Card */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                        <h2 className="text-xl font-medium text-gray-700 dark:text-gray-200">{target.name}</h2>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${target.status === 'active' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200' :
                                target.status === 'completed' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' :
                                    'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200' // Example for other statuses
                            }`}>
                            {target.status.charAt(0).toUpperCase() + target.status.slice(1)}
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                            <span>₦{target.currentAmount.toLocaleString()}</span>
                            <span>Target: ₦{target.targetAmount.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div
                                className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <div className="text-right text-sm text-gray-600 dark:text-gray-400 mt-1">{progress.toFixed(1)}% Complete</div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                        <p><strong>Start Date:</strong> {target.startDate}</p>
                        <p><strong>End Date:</strong> {target.endDate}</p>
                        <p><strong>Frequency:</strong> {target.frequency}</p>
                        <p><strong>Type:</strong> {target.type.charAt(0).toUpperCase() + target.type.slice(1)}</p>
                        <p><strong>Auto-Debit:</strong> {target.autoDebit ? 'Enabled' : 'Disabled'}</p>
                    </div>
                </div>

                {/* Transaction Timeline (Placeholder) */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">Transaction Timeline</h3>
                    {target.transactions.length > 0 ? (
                        <ul className="space-y-3">
                            {target.transactions.slice(0, 5).map((tx, index) => ( // Show recent 5 for brevity
                                <li key={index} className="flex justify-between items-center border-b dark:border-gray-700 pb-2">
                                    <div>
                                        <p className="font-medium text-gray-800 dark:text-gray-100">{tx.type === 'deposit' ? 'Deposit' : 'Withdrawal'}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{tx.date}</p>
                                    </div>
                                    <span className={`font-medium ${tx.type === 'deposit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                        ₦{tx.amount.toLocaleString()}
                                    </span>
                                </li>
                            ))}
                            {target.transactions.length > 5 && (
                                <li className="text-center text-blue-600 dark:text-blue-400 hover:underline pt-2">
                                    <Link href="#">View All Transactions</Link> {/* Link to a full transaction history page/modal */}
                                </li>
                            )}
                        </ul>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400 italic">No transactions recorded yet.</p>
                    )}
                </div>

                {/* Breakdown (Placeholder) */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">Savings Breakdown</h3>
                    <p className="text-gray-500 dark:text-gray-400 italic">Breakdown details (e.g., principal, interest, bonuses) will be shown here.</p>
                    {/* Add breakdown structure here later */}
                </div>

                {/* Actions */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">Actions</h3>
                    <div className="flex space-x-4">
                        {/* Add other actions like 'Make Deposit', 'Edit Target' etc. if needed */}
                        {target.status === 'active' && (
                             <button
                                onClick={handleBreakEarly}
                                className="flex items-center px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md hover:bg-red-200 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-sm font-medium"
                            >
                                <AlertTriangle size={16} className="mr-2" />
                                Break Early
                            </button>
                        )}
                    </div>
                    {target.status === 'active' && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                            Note: Breaking your target savings early might result in penalties or loss of accrued interest.
                        </p>
                    )}
                </div>

            </div>
        </DashboardLayout>
    );
};

export default TargetDetailsPage;
