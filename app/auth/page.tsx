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
import { Car, Briefcase, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Checkbox, CheckboxIndicator } from '@/components/animate-ui/primitives/base/checkbox';

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

function SignInContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('renter');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const asParam = searchParams.get('as');
    if (asParam === 'earner' || asParam === 'renter') {
      setActiveTab(asParam);
    }
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const newUrl = value === 'renter' ? '/auth' : `/auth?as=${value}`;
    router.push(newUrl, { scroll: false });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log('Sign in:', { ...formData, userType: activeTab });
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
          <h1 className='text-4xl font-light text-gray-900 mb-4 tracking-tight'>Welcome back</h1>
          <p className='text-gray-500 font-light leading-relaxed'>Sign in to your YAYAGO account</p>
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
                    <h3 className='text-lg font-light text-gray-900 mb-2'>Rent Your Perfect Ride</h3>
                    <p className='text-sm text-gray-500 font-light'>Access thousands of vehicles from trusted owners</p>
                  </div>

                  <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                      <Input
                        type='email'
                        name='email'
                        placeholder='Email address'
                        value={formData.email}
                        onChange={handleInputChange}
                        className='pl-10 py-3 bg-gray-50 border-gray-100 rounded-lg focus:border-gray-300 focus:ring-0 font-light'
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

                    <div className='flex items-center justify-between text-sm'>
                      <div className='flex items-center space-x-2'>
                        <Checkbox
                          id='remember-me'
                          className='size-5 flex justify-center items-center border [&[data-checked],&[data-indeterminate]]:bg-primary [&[data-checked],&[data-indeterminate]]:text-primary-foreground transition-colors duration-500'
                        >
                          <CheckboxIndicator className='size-3.5' />
                        </Checkbox>
                        <label htmlFor='remember-me'>Remember me</label>
                      </div>
                      <Link href='/auth/forgot-password' className='text-gray-600 hover:text-gray-900 transition-colors duration-200 font-light'>
                        Forgot password?
                      </Link>
                    </div>

                    <Button
                      type='submit'
                      className='w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-light'
                    >
                      Sign In
                    </Button>
                  </form>

                  <div className='mt-6'>
                    <Separator className='my-4' />
                    <p className='text-center text-sm text-gray-600'>
                      Don't have an account?{' '}
                      <Link
                        href={`/auth/register${activeTab === 'earner' ? '?as=earner' : ''}`}
                        className='text-gray-900 hover:text-gray-700 transition-colors duration-200 font-light'
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value='earner'>
                <div className='px-6 pb-6'>
                  <div className='mb-6'>
                    <h3 className='text-lg font-light text-gray-900 mb-2'>Start Earning Today</h3>
                    <p className='text-sm text-gray-500 font-light'>List your vehicle and earn money from rentals</p>
                  </div>

                  <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                      <Input
                        type='email'
                        name='email'
                        placeholder='Email address'
                        value={formData.email}
                        onChange={handleInputChange}
                        className='pl-10 py-3 bg-gray-50 border-gray-100 rounded-lg focus:border-gray-300 focus:ring-0 font-light'
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

                    <div className='flex items-center justify-between text-sm'>
                      <div className='flex items-center space-x-2'>
                        <Checkbox
                          id='remember-me'
                          className='size-5 flex justify-center items-center border [&[data-checked],&[data-indeterminate]]:bg-primary [&[data-checked],&[data-indeterminate]]:text-primary-foreground transition-colors duration-500'
                        >
                          <CheckboxIndicator className='size-3.5' />
                        </Checkbox>
                        <label htmlFor='remember-me'>Remember me</label>
                      </div>
                      <Link href='/auth/forgot-password' className='text-gray-600 hover:text-gray-900 transition-colors duration-200 font-light'>
                        Forgot password?
                      </Link>
                    </div>

                    <Button
                      type='submit'
                      className='w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-light'
                    >
                      Sign In
                    </Button>
                  </form>

                  <div className='mt-6'>
                    <Separator className='my-4' />
                    <p className='text-center text-sm text-gray-600'>
                      Don't have an account?{' '}
                      <Link
                        href={`/auth/register${activeTab === 'earner' ? '?as=earner' : ''}`}
                        className='text-gray-900 hover:text-gray-700 transition-colors duration-200 font-light'
                      >
                        Sign up
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

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
