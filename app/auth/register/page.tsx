'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowLeft, Car, Shield, Award, TrendingUp } from 'lucide-react';
import { Checkbox, CheckboxIndicator } from '@/components/animate-ui/primitives/base/checkbox';

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const leftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 },
  },
};

const rightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 },
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

const features = [
  { icon: Car, title: '5,000+ Cars', description: 'Premium vehicles available' },
  { icon: Shield, title: '0% Commission', description: 'Keep 100% of your earnings' },
  { icon: Award, title: 'Verified Users', description: 'Safe and trusted community' },
  { icon: TrendingUp, title: 'Best Prices', description: 'Competitive rates guaranteed' },
];

export default function SignUpPage() {
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
    console.log('Sign up:', formData);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 font-montserrat'>
      <motion.div
        className='min-h-screen grid lg:grid-cols-2'
        variants={pageVariants}
        initial='hidden'
        animate='visible'
      >
        {/* Left Side - Form */}
        <motion.div
          className='flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 lg:py-20 bg-white relative'
          variants={leftVariants}
        >
          {/* Back to Home */}
          <motion.div variants={itemVariants} className='absolute top-8 left-6 sm:left-12 lg:left-16'>
            <Link
              href='/'
              className='inline-flex items-center gap-2 text-slate-600 hover:text-primary transition-colors duration-200 text-sm font-medium'
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </motion.div>

          <div className='max-w-md mx-auto w-full'>
            {/* Header */}
            <motion.div variants={itemVariants} className='mb-8'>
              <Link href='/' className='inline-flex items-center mb-8 group'>
                <span className='text-2xl font-light tracking-wide group-hover:text-primary transition-colors duration-300'>
                  YAYA
                </span>
                <span className='text-2xl font-semibold tracking-wide group-hover:text-primary transition-colors duration-300'>
                  GO
                </span>
              </Link>
              <h1 className='text-3xl sm:text-4xl font-semibold text-slate-900 mb-3 tracking-tight'>Join YAYAGO</h1>
              <p className='text-slate-600 font-normal leading-relaxed'>Create your account and start earning today</p>
            </motion.div>

            {/* Form */}
            <motion.form onSubmit={handleSubmit} className='space-y-4' variants={itemVariants}>
              <div className='grid grid-cols-2 gap-3'>
                <div className='space-y-2'>
                  <label htmlFor='firstName' className='text-sm font-medium text-slate-700'>
                    First name
                  </label>
                  <div className='relative'>
                    <User className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400' />
                    <Input
                      id='firstName'
                      type='text'
                      name='firstName'
                      placeholder='John'
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className='pl-12 pr-4 py-5 bg-slate-50 border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 font-normal transition-all duration-200'
                      required
                    />
                  </div>
                </div>
                <div className='space-y-2'>
                  <label htmlFor='lastName' className='text-sm font-medium text-slate-700'>
                    Last name
                  </label>
                  <Input
                    id='lastName'
                    type='text'
                    name='lastName'
                    placeholder='Doe'
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className='px-4 py-5 bg-slate-50 border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 font-normal transition-all duration-200'
                    required
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <label htmlFor='email' className='text-sm font-medium text-slate-700'>
                  Email address
                </label>
                <div className='relative'>
                  <Mail className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400' />
                  <Input
                    id='email'
                    type='email'
                    name='email'
                    placeholder='you@example.com'
                    value={formData.email}
                    onChange={handleInputChange}
                    className='pl-12 pr-4 py-5 bg-slate-50 border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 font-normal transition-all duration-200'
                    required
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <label htmlFor='phone' className='text-sm font-medium text-slate-700'>
                  Phone number
                </label>
                <div className='relative'>
                  <Phone className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400' />
                  <Input
                    id='phone'
                    type='tel'
                    name='phone'
                    placeholder='+971 50 123 4567'
                    value={formData.phone}
                    onChange={handleInputChange}
                    className='pl-12 pr-4 py-5 bg-slate-50 border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 font-normal transition-all duration-200'
                    required
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <label htmlFor='password' className='text-sm font-medium text-slate-700'>
                  Password
                </label>
                <div className='relative'>
                  <Lock className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400' />
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    placeholder='Create a password'
                    value={formData.password}
                    onChange={handleInputChange}
                    className='pl-12 pr-12 py-5 bg-slate-50 border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 font-normal transition-all duration-200'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200'
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className='space-y-2'>
                <label htmlFor='confirmPassword' className='text-sm font-medium text-slate-700'>
                  Confirm password
                </label>
                <div className='relative'>
                  <Lock className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400' />
                  <Input
                    id='confirmPassword'
                    type={showConfirmPassword ? 'text' : 'password'}
                    name='confirmPassword'
                    placeholder='Confirm your password'
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className='pl-12 pr-12 py-5 bg-slate-50 border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 font-normal transition-all duration-200'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200'
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className='flex items-start gap-2 text-sm pt-2'>
                <Checkbox
                  id='agreeToTerms'
                  className='size-5 flex justify-center items-center border border-slate-300 rounded [&[data-checked],&[data-indeterminate]]:bg-primary [&[data-checked],&[data-indeterminate]]:text-white [&[data-checked],&[data-indeterminate]]:border-primary transition-all duration-200 mt-0.5'
                >
                  <CheckboxIndicator className='size-3.5' />
                </Checkbox>
                <label htmlFor='agreeToTerms' className='text-slate-600 font-normal leading-relaxed cursor-pointer'>
                  I agree to the{' '}
                  <Link
                    href='/terms'
                    className='text-primary hover:text-primary/80 transition-colors duration-200 font-medium'
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    href='/privacy'
                    className='text-primary hover:text-primary/80 transition-colors duration-200 font-medium'
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type='submit'
                className='w-full py-6 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold shadow-lg shadow-primary/25 transition-all duration-200 mt-6'
              >
                Create Account
              </Button>
            </motion.form>

            <motion.div className='mt-6' variants={itemVariants}>
              <Separator className='my-6 bg-slate-200' />
              <p className='text-center text-sm text-slate-600'>
                Already have an account?{' '}
                <Link
                  href='/auth'
                  className='text-primary hover:text-primary/80 transition-colors duration-200 font-semibold'
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Visual */}
        <motion.div
          className='hidden lg:flex flex-col justify-center items-center relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-16 overflow-hidden'
          variants={rightVariants}
        >
          {/* Background Image */}
          <div className='absolute inset-0 opacity-10'>
            <Image
              src='https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop'
              alt='Luxury car'
              fill
              className='object-cover'
              sizes='50vw'
            />
          </div>

          {/* Content */}
          <div className='relative z-10 max-w-lg'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className='text-4xl font-semibold text-white mb-6 leading-tight'>Start Earning Today</h2>
              <p className='text-xl text-slate-300 font-normal mb-12 leading-relaxed'>
                List your car and earn money while you're not using it. No commission, no hassle.
              </p>

              {/* Features Grid */}
              <div className='grid grid-cols-2 gap-6'>
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      className='bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10'
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    >
                      <div className='w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4'>
                        <Icon className='w-6 h-6 text-primary' />
                      </div>
                      <h3 className='text-white font-semibold mb-1'>{feature.title}</h3>
                      <p className='text-slate-400 text-sm font-normal'>{feature.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className='absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl' />
          <div className='absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl' />
        </motion.div>
      </motion.div>
    </div>
  );
}
