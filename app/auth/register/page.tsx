'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Tabs,
  TabsList,
  TabsHighlight,
  TabsHighlightItem,
  TabsTrigger,
  TabsContents,
  TabsContent,
} from '@/components/animate-ui/primitives/animate/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Car, Briefcase, Mail, Lock, Eye, EyeOff, User, Phone, ArrowLeft } from 'lucide-react';
import { Checkbox } from '@/components/animate-ui/primitives/base/checkbox';
import { CheckboxIndicator } from '@/components/animate-ui/primitives/base/checkbox';

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

function SignUpContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('renter');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  useEffect(() => {
    const asParam = searchParams.get('as');
    if (asParam === 'earner' || asParam === 'renter') {
      setActiveTab(asParam);
    }
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const newUrl = value === 'renter' ? '/auth/register' : `/auth/register?as=${value}`;
    router.push(newUrl, { scroll: false });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Handle sign up logic here
    console.log('Sign up:', { ...formData, userType: activeTab });
  };

  return (
    <div className='min-h-screen bg-white flex items-center justify-center p-4 font-montserrat'>
      <motion.div className='w-full max-w-md' variants={pageVariants} initial='hidden' animate='visible'>
        {/* Back to Home */}
        <motion.div variants={itemVariants} className='mb-8'>
          <Link
            href='/'
            className='inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors duration-200 text-sm font-light'
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div variants={itemVariants} className='text-center mb-8'>
          <h1 className='text-4xl font-light text-gray-900 mb-4 tracking-tight'>Join YAYAGO</h1>
          <p className='text-gray-500 font-light leading-relaxed'>Create your account and get started</p>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          variants={itemVariants}
          className='bg-white rounded-lg shadow-sm border border-gray-50 overflow-hidden'
        >
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className='w-full'>
            <div className='relative p-6 pb-4'>
              <TabsList className='grid w-full grid-cols-2 gap-2 bg-gray-50 p-1 rounded-lg'>
                <TabsHighlight className='bg-white shadow-sm rounded-md'>
                  <TabsHighlightItem value='renter' className='flex items-center justify-center'>
                    <TabsTrigger
                      value='renter'
                      className='relative flex items-center justify-center gap-2 px-4 py-3 text-sm font-light transition-colors duration-200 rounded-md data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-600'
                    >
                      <Car size={16} />
                      As a Renter
                    </TabsTrigger>
                  </TabsHighlightItem>
                  <TabsHighlightItem value='earner' className='flex items-center justify-center'>
                    <TabsTrigger
                      value='earner'
                      className='relative flex items-center justify-center gap-2 px-4 py-3 text-sm font-light transition-colors duration-200 rounded-md data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-600'
                    >
                      <Briefcase size={16} />
                      As an Earner
                    </TabsTrigger>
                  </TabsHighlightItem>
                </TabsHighlight>
              </TabsList>
            </div>

            <TabsContents>
              <TabsContent value='renter'>
                <div className='px-6 pb-6'>
                  <div className='mb-6'>
                    <h3 className='text-lg font-light text-gray-900 mb-2'>Start Your Journey</h3>
                    <p className='text-sm text-gray-500 font-light'>Access thousands of vehicles from trusted owners</p>
                  </div>

                  <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='grid grid-cols-2 gap-3'>
                      <div className='relative'>
                        <User className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                        <Input
                          type='text'
                          name='firstName'
                          placeholder='First name'
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className='pl-10 py-3 bg-gray-50 border-gray-100 rounded-lg focus:border-gray-300 focus:ring-0 font-light'
                          required
                        />
                      </div>
                      <div className='relative'>
                        <Input
                          type='text'
                          name='lastName'
                          placeholder='Last name'
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className='py-3 bg-gray-50 border-gray-100 rounded-lg focus:border-gray-300 focus:ring-0 font-light'
                          required
                        />
                      </div>
                    </div>

                    <div className='relative'>
                      <Mail className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                      <Input
                        type='email'
                        name='email'
                        placeholder='Email address'
                        value={formData.email}
                        onChange={handleInputChange}
                        className='pl-10 py-3 bg-gray-50/50 border-gray-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary'
                        required
                      />
                    </div>

                    <div className='relative'>
                      <Phone className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                      <Input
                        type='tel'
                        name='phone'
                        placeholder='Phone number'
                        value={formData.phone}
                        onChange={handleInputChange}
                        className='pl-10 py-3 bg-gray-50/50 border-gray-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary'
                        required
                      />
                    </div>

                    <div className='relative'>
                      <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleInputChange}
                        className='pl-10 pr-10 py-3 bg-gray-50 border-gray-100 rounded-lg focus:border-gray-300 focus:ring-0 font-light'
                        required
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-3 top-3 text-gray-400 hover:text-gray-600'
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    <div className='relative'>
                      <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name='confirmPassword'
                        placeholder='Confirm password'
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className='pl-10 pr-10 py-3 bg-gray-50 border-gray-100 rounded-lg focus:border-gray-300 focus:ring-0 font-light'
                        required
                      />
                      <button
                        type='button'
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className='absolute right-3 top-3 text-gray-400 hover:text-gray-600'
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    <div className='flex items-center space-x-2 text-sm'>
                      <Checkbox
                        id='agreeToTerms'
                        className='size-5 flex justify-center items-center border [&[data-checked],&[data-indeterminate]]:bg-primary [&[data-checked],&[data-indeterminate]]:text-primary-foreground transition-colors duration-500'
                      >
                        <CheckboxIndicator className='size-3.5' />
                      </Checkbox>
                      <p className='text-gray-600 font-light leading-relaxed'>
                        I agree to the{' '}
                        <Link href='/terms' className='text-gray-900 hover:text-gray-700 transition-colors duration-200 font-light'>
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href='/privacy' className='text-gray-900 hover:text-gray-700 transition-colors duration-200 font-light'>
                          Privacy Policy
                        </Link>
                      </p>
                    </div>

                    <Button
                      type='submit'
                      className='w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-light'
                    >
                      Create Account
                    </Button>
                  </form>

                  <div className='mt-6'>
                    <Separator className='my-4' />
                    <p className='text-center text-sm text-gray-600'>
                      Already have an account?{' '}
                      <Link
                        href={`/auth${activeTab === 'earner' ? '?as=earner' : ''}`}
                        className='text-gray-900 hover:text-gray-700 transition-colors duration-200 font-light'
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value='earner'>
                <div className='px-6 pb-6'>
                  <div className='mb-6'>
                    <h3 className='text-lg font-light text-gray-900 mb-2'>Become an Earner</h3>
                    <p className='text-sm text-gray-500 font-light'>List your vehicle and start earning money today</p>
                  </div>

                  <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='grid grid-cols-2 gap-3'>
                      <div className='relative'>
                        <User className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                        <Input
                          type='text'
                          name='firstName'
                          placeholder='First name'
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className='pl-10 py-3 bg-gray-50 border-gray-100 rounded-lg focus:border-gray-300 focus:ring-0 font-light'
                          required
                        />
                      </div>
                      <div className='relative'>
                        <Input
                          type='text'
                          name='lastName'
                          placeholder='Last name'
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className='py-3 bg-gray-50 border-gray-100 rounded-lg focus:border-gray-300 focus:ring-0 font-light'
                          required
                        />
                      </div>
                    </div>

                    <div className='relative'>
                      <Mail className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                      <Input
                        type='email'
                        name='email'
                        placeholder='Email address'
                        value={formData.email}
                        onChange={handleInputChange}
                        className='pl-10 py-3 bg-gray-50/50 border-gray-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary'
                        required
                      />
                    </div>

                    <div className='relative'>
                      <Phone className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                      <Input
                        type='tel'
                        name='phone'
                        placeholder='Phone number'
                        value={formData.phone}
                        onChange={handleInputChange}
                        className='pl-10 py-3 bg-gray-50/50 border-gray-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary'
                        required
                      />
                    </div>

                    <div className='relative'>
                      <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleInputChange}
                        className='pl-10 pr-10 py-3 bg-gray-50 border-gray-100 rounded-lg focus:border-gray-300 focus:ring-0 font-light'
                        required
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-3 top-3 text-gray-400 hover:text-gray-600'
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    <div className='relative'>
                      <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name='confirmPassword'
                        placeholder='Confirm password'
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className='pl-10 pr-10 py-3 bg-gray-50 border-gray-100 rounded-lg focus:border-gray-300 focus:ring-0 font-light'
                        required
                      />
                      <button
                        type='button'
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className='absolute right-3 top-3 text-gray-400 hover:text-gray-600'
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    <div className='p-4 bg-gray-50 rounded-lg border border-gray-100'>
                      <p className='text-sm text-gray-900 font-light mb-1'>Ready to earn?</p>
                      <p className='text-xs text-gray-600 font-light'>
                        After registration, you'll be guided through vehicle listing and verification process.
                      </p>
                    </div>

                    <div className='flex items-center space-x-2 text-sm'>
                      <Checkbox
                        id='agreeToTerms'
                        className='size-5 flex justify-center items-center border [&[data-checked],&[data-indeterminate]]:bg-primary [&[data-checked],&[data-indeterminate]]:text-primary-foreground transition-colors duration-500'
                      >
                        <CheckboxIndicator className='size-3.5' />
                      </Checkbox>
                      <p className='text-gray-600 font-light leading-relaxed'>
                        I agree to the{' '}
                        <Link href='/terms' className='text-gray-900 hover:text-gray-700 transition-colors duration-200 font-light'>
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href='/privacy' className='text-gray-900 hover:text-gray-700 transition-colors duration-200 font-light'>
                          Privacy Policy
                        </Link>
                      </p>
                    </div>

                    <Button
                      type='submit'
                      className='w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-light'
                    >
                      Start Earning
                    </Button>
                  </form>

                  <div className='mt-6'>
                    <Separator className='my-4' />
                    <p className='text-center text-sm text-gray-600'>
                      Already have an account?{' '}
                      <Link
                        href={`/auth${activeTab === 'earner' ? '?as=earner' : ''}`}
                        className='text-gray-900 hover:text-gray-700 transition-colors duration-200 font-light'
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              </TabsContent>
            </TabsContents>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpContent />
    </Suspense>
  );
}
