'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from '../../../components/AuthLayout';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userType, setUserType] = useState('user'); // 'user' or 'agent'
  const [step, setStep] = useState(1); // Registration step (1: basic info, 2: KYC)
  
  // Basic info form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  
  // KYC form state (different for users and agents)
  const [bvnOrNin, setBvnOrNin] = useState('');
  
  // Additional agent KYC fields
  const [utilityBill, setUtilityBill] = useState<File | null>(null);
  const [bankStatement, setBankStatement] = useState<File | null>(null);
  const [signature, setSignature] = useState<File | null>(null);
  const [guarantorName, setGuarantorName] = useState('');
  const [guarantorPhone, setGuarantorPhone] = useState('');
  const [guarantorAddress, setGuarantorAddress] = useState('');
  const [guarantorSignature, setGuarantorSignature] = useState<File | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Set user type based on URL parameter
  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'agent') {
      setUserType('agent');
    }
  }, [searchParams]);

  const validateStep1 = () => {
    if (!email || !password || !confirmPassword || !fullName || !phone) {
      setErrorMessage('All fields are required');
      return false;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return false;
    }
    
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      return false;
    }
    
    setErrorMessage('');
    return true;
  };

  const validateStep2 = () => {
    if (!bvnOrNin) {
      setErrorMessage('BVN or NIN is required');
      return false;
    }
    
    if (userType === 'agent') {
      if (!utilityBill || !bankStatement || !signature || !guarantorName || 
          !guarantorPhone || !guarantorAddress || !guarantorSignature) {
        setErrorMessage('All fields are required for agent registration');
        return false;
      }
    }
    
    setErrorMessage('');
    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) {
      return;
    }
    
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create mock user data
      const mockUser = {
        id: 'user-' + Date.now(),
        email,
        name: fullName,
        phoneNumber: phone,
        role: userType === 'user' ? 'USER' : 'AGENT',
        kycStatus: 'pending'
      };
      
      // Mock token
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      // Store user data in localStorage instead of using context
      localStorage.setItem('mockToken', mockToken);
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      
      console.log('Registration successful with mock data', {
        user: mockUser,
        kycData: {
          bvnOrNin,
          utilityBill: userType === 'agent' ? utilityBill?.name : null,
          bankStatement: userType === 'agent' ? bankStatement?.name : null,
          signature: userType === 'agent' ? signature?.name : null,
          guarantorName: userType === 'agent' ? guarantorName : null,
          guarantorPhone: userType === 'agent' ? guarantorPhone : null, 
          guarantorAddress: userType === 'agent' ? guarantorAddress : null,
          guarantorSignature: userType === 'agent' ? guarantorSignature?.name : null,
        }
      });
      
      // Redirect to the appropriate dashboard or verification page
      router.push(userType === 'user' 
        ? '/dashboard/user' 
        : '/auth/verification');
    } catch (error: any) {
      setErrorMessage('Something went wrong. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (
    setter: React.Dispatch<React.SetStateAction<File | null>>,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  return (
    <AuthLayout 
      title={userType === 'user' ? "Create your account" : "Register as an Agent"} 
      subtitle={userType === 'user' 
        ? "Join Digital Ajo and take control of your finances" 
        : "Help your community access financial services"
      }
      backLinkText={step === 1 ? "Back to Login" : "Back to Step 1"}
      backLinkHref={step === 1 ? "/auth/login" : "#"}
    >
      {step === 1 ? (
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

          <form className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-[30px] shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-400 dark:focus:border-red-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

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
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-[30px] shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-400 dark:focus:border-red-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-[30px] shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-400 dark:focus:border-red-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-[30px] shadow-sm text-sm font-medium text-white bg-gradient-to-tr from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 dark:from-red-600 dark:to-red-500 dark:hover:from-red-700 dark:hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-red-400"
              >
                Next: KYC Information
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
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link 
                href="/auth/login"
                className="w-full flex justify-center py-2 px-4 border border-red-600 dark:border-red-500 rounded-[30px] shadow-sm text-sm font-medium text-red-600 dark:text-red-500 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              KYC Information {userType === 'agent' && '(Step 1 of 2)'}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Please provide the following details to verify your identity.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-4 p-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-[30px]">
              {errorMessage}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="bvnOrNin" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                BVN or NIN
              </label>
              <div className="mt-1">
                <input
                  id="bvnOrNin"
                  name="bvnOrNin"
                  type="text"
                  required
                  value={bvnOrNin}
                  onChange={(e) => setBvnOrNin(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-[30px] shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-400 dark:focus:border-red-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={userType === 'user' ? "Enter BVN or NIN" : "Enter BVN or NIN (required)"}
                />
              </div>
            </div>

            {/* Additional fields for agent */}
            {userType === 'agent' && (
              <>
                <div>
                  <label htmlFor="utilityBill" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Utility Bill Image
                  </label>
                  <div className="mt-1">
                    <input
                      id="utilityBill"
                      name="utilityBill"
                      type="file"
                      required
                      onChange={(e) => handleFileChange(setUtilityBill, e)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-[30px] shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-400 dark:focus:border-red-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      accept="image/*,.pdf"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Upload a clear image of a recent utility bill (not older than 3 months)
                    </p>
                  </div>
                </div>

                <div>
                  <label htmlFor="bankStatement" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Bank Statement Image
                  </label>
                  <div className="mt-1">
                    <input
                      id="bankStatement"
                      name="bankStatement"
                      type="file"
                      required
                      onChange={(e) => handleFileChange(setBankStatement, e)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-[30px] shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-400 dark:focus:border-red-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      accept="image/*,.pdf"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Upload a clear image of your recent bank statement (last 3 months)
                    </p>
                  </div>
                </div>

                <div>
                  <label htmlFor="signature" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Signature
                  </label>
                  <div className="mt-1">
                    <input
                      id="signature"
                      name="signature"
                      type="file"
                      required
                      onChange={(e) => handleFileChange(setSignature, e)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-[30px] shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-400 dark:focus:border-red-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      accept="image/*"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Upload a clear image of your signature
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mt-4">
                  <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-2">Guarantor Information</h4>
                  
                  <div>
                    <label htmlFor="guarantorName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Guarantor Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="guarantorName"
                        name="guarantorName"
                        type="text"
                        required
                        value={guarantorName}
                        onChange={(e) => setGuarantorName(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-[30px] shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-400 dark:focus:border-red-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <label htmlFor="guarantorPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Guarantor Phone
                    </label>
                    <div className="mt-1">
                      <input
                        id="guarantorPhone"
                        name="guarantorPhone"
                        type="tel"
                        required
                        value={guarantorPhone}
                        onChange={(e) => setGuarantorPhone(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-[30px] shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-400 dark:focus:border-red-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <label htmlFor="guarantorAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Guarantor Address
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="guarantorAddress"
                        name="guarantorAddress"
                        required
                        value={guarantorAddress}
                        onChange={(e) => setGuarantorAddress(e.target.value)}
                        rows={2}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-[30px] shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-400 dark:focus:border-red-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <label htmlFor="guarantorSignature" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Guarantor Signature
                    </label>
                    <div className="mt-1">
                      <input
                        id="guarantorSignature"
                        name="guarantorSignature"
                        type="file"
                        required
                        onChange={(e) => handleFileChange(setGuarantorSignature, e)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-[30px] shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-400 dark:focus:border-red-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        accept="image/*"
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Upload a clear image of your guarantor's signature
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="flex space-x-3 pt-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-[30px] shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-red-400"
              >
                Back
              </button>
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
                {isLoading ? 'Registering...' : 'Create Account'}
              </button>
            </div>
          </form>
        </div>
      )}
    </AuthLayout>
  );
}

// Wrap the register form in a suspense boundary for useSearchParams
export default function Register() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
