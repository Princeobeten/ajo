import { DashboardLayout, NavItem } from '@/components/DashboardLayout';
import { 
  Home, 
  Users, 
  UserRound,
  Wallet, 
  PiggyBank, 
  Target, 
  CreditCard, 
  HelpCircle, 
  UserCircle,
  Bell,
  Landmark,
  Share2,
  DollarSign,
  FileCheck,
  BarChart3
} from 'lucide-react';

export const userNavigation: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard/user', icon: Home },
    { name: 'My Groups', href: '/dashboard/user/groups', icon: Users },
    { name: 'Wallet', href: '/dashboard/user/wallet', icon: Wallet },
    { name: 'Target Savings', href: '/dashboard/user/target-savings', icon: Target},
    { name: 'Loans', href: '/dashboard/user/loans', icon: PiggyBank },
    { name: 'Credit Score', href: '/dashboard/user/credit-score', icon: CreditCard },
    { name: 'Help & Support', href: '/dashboard/user/support', icon: HelpCircle },
    { name: 'Profile', href: '/dashboard/user/profile', icon: UserCircle },
    { name: 'Notifications', href: '/dashboard/user/notifications', icon: Bell }
];

export const agentNavigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard/agent', icon: Home },
  { name: 'Users', href: '/dashboard/agent/users', icon: UserRound },
  { name: 'Ajo Groups', href: '/dashboard/agent/groups', icon: Users },
  { name: 'Deposits', href: '/dashboard/agent/deposits', icon: Landmark},
  { name: 'Withdrawals', href: '/dashboard/agent/withdrawals', icon: Wallet },
  { name: 'Wallet', href: '/dashboard/agent/wallet', icon: Wallet },
  { name: 'Target Savings', href: '/dashboard/agent/target-savings', icon: Target },
  { name: 'Loans', href: '/dashboard/agent/loans', icon: PiggyBank },
  { name: 'Earnings', href: '/dashboard/agent/earnings', icon: DollarSign},
  { name: 'Referrals', href: '/dashboard/agent/referrals', icon: Share2},
  { name: 'My Credit Score', href: '/dashboard/agent/credit-score', icon: CreditCard },
  { name: 'Help & Support', href: '/dashboard/agent/support', icon: HelpCircle },
  { name: 'Profile', href: '/dashboard/agent/profile', icon: UserCircle },
  { name: 'Notifications', href: '/dashboard/agent/notifications', icon: Bell }
];

export const adminNavigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard/admin', icon: Home },
  { name: 'Users', href: '/dashboard/admin/users', icon: Users },
  { name: 'Agents', href: '/dashboard/admin/agents', icon: Users },
  { name: 'Groups', href: '/dashboard/admin/groups', icon: Users },
  { name: 'Transactions', href: '/dashboard/admin/transactions', icon: Wallet },
  { name: 'Loans', href: '/dashboard/admin/loans', icon: PiggyBank },
  { name: 'KYC', href: '/dashboard/admin/kyc', icon: FileCheck },
  { name: 'Analytics', href: '/dashboard/admin/analytics', icon: BarChart3 },
  { name: 'Support Center', href: '/dashboard/admin/support', icon: HelpCircle },
  { name: 'Notifications', href: '/dashboard/admin/notifications', icon: Bell }
];