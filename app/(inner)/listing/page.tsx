'use client';

import { motion } from 'framer-motion';
import {
  Car,
  DollarSign,
  Shield,
  Clock,
  Users,
  CheckCircle,
  Camera,
  FileText,
  Zap,
  TrendingUp,
  Award,
  Headphones,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const benefits = [
  {
    icon: DollarSign,
    title: '0% Commission',
    description: 'Keep 100% of your earnings. No hidden fees, no commissions. What you earn is what you keep.',
    color: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    icon: Shield,
    title: 'Full Insurance Coverage',
    description: 'Your car is fully protected with comprehensive insurance coverage during every rental.',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: Users,
    title: 'Verified Renters',
    description: 'All renters are thoroughly verified with valid licenses and background checks.',
    color: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Set your own availability and rental rates. You have complete control over your listing.',
    color: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
];

const steps = [
  {
    icon: FileText,
    title: 'Create Your Profile',
    description: 'Sign up and complete your profile with necessary documents and verification.',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: Camera,
    title: 'Upload Car Details',
    description: 'Add photos, specifications, and set your rental rates for your vehicle.',
    color: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    icon: CheckCircle,
    title: 'Get Verified',
    description: 'Our team reviews your listing to ensure it meets our quality standards.',
    color: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    icon: Zap,
    title: 'Start Earning',
    description: 'Once approved, your car goes live and you can start accepting bookings.',
    color: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
];

const requirements = [
  'Valid UAE driving license',
  'Car registration documents',
  'Comprehensive insurance policy',
  'Car must be less than 10 years old',
  'Regular maintenance records',
  'Clean interior and exterior',
];

const earnings = [
  { carType: 'Economy Car', dailyRate: '150 - 250 AED', monthlyEarnings: '3,000 - 5,000 AED', icon: Car },
  { carType: 'Premium Sedan', dailyRate: '300 - 500 AED', monthlyEarnings: '6,000 - 10,000 AED', icon: TrendingUp },
  { carType: 'Luxury Vehicle', dailyRate: '800 - 1,500 AED', monthlyEarnings: '15,000 - 30,000 AED', icon: Award },
  {
    carType: 'Sports Car',
    dailyRate: '1,200 - 2,500 AED',
    monthlyEarnings: '20,000 - 50,000 AED',
    icon: Zap,
  },
];

export default function ListingPage() {
  return (
    <main className='min-h-screen pt-40 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 font-montserrat py-20 relative overflow-hidden'>
      {/* Subtle background elements */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(148,163,184,0.04)_0%,_transparent_50%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(100,116,139,0.03)_0%,_transparent_50%)]' />

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Hero Section */}
        <motion.header
          className='text-center mb-12 sm:mb-16'
          variants={headerVariants}
          initial='hidden'
          animate='visible'
        >
          <motion.div
            className='inline-block px-4 py-1.5 rounded-full bg-slate-900 mb-6'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className='text-sm font-medium text-white tracking-wide'>List Your Car</span>
          </motion.div>

          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-6 tracking-tight leading-tight px-4'>
            Turn Your Car Into Income
          </h1>
          <p className='text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8 font-normal leading-relaxed px-4'>
            Join thousands of car owners earning money by sharing their vehicles on YAYAGO. Easy setup, full control,
            and 0% commission.
          </p>

          <Link href='/pricing'>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='inline-block'>
              <Button className='bg-slate-900 hover:bg-slate-800 text-white font-medium px-10 py-6 text-lg gap-3 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200'>
                <Car size={22} />
                Start Listing Your Car
                <ArrowRight size={22} />
              </Button>
            </motion.div>
          </Link>
        </motion.header>

        {/* Benefits Section */}
        <motion.section
          className='mb-16 sm:mb-20'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className='text-center mb-10 sm:mb-12'>
            <h2 className='text-2xl sm:text-3xl font-semibold text-slate-900 mb-4'>Why List with YAYAGO?</h2>
            <p className='text-slate-600 font-normal'>The benefits of joining Dubai's premier car sharing platform</p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  className='bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 group'
                  variants={cardVariants}
                  initial='hidden'
                  whileInView='visible'
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <div
                    className={`w-14 h-14 ${benefit.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-7 h-7 ${benefit.iconColor}`} />
                  </div>
                  <h3 className='text-lg font-semibold text-slate-900 mb-3'>{benefit.title}</h3>
                  <p className='text-slate-600 font-normal text-sm leading-relaxed'>{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Earnings Potential */}
        <motion.section
          className='mb-16 sm:mb-20'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className='bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm'>
            <div className='text-center mb-10 sm:mb-12'>
              <h2 className='text-2xl sm:text-3xl font-semibold text-slate-900 mb-4'>Earnings Potential</h2>
              <p className='text-slate-600 font-normal'>See how much you could earn based on your car type</p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {earnings.map((earning, index) => {
                const Icon = earning.icon;
                return (
                  <motion.div
                    key={earning.carType}
                    className='bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border border-slate-200'
                    variants={cardVariants}
                    initial='hidden'
                    whileInView='visible'
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Icon className='w-8 h-8 text-blue-600 mb-4' />
                    <h4 className='text-lg font-semibold text-slate-900 mb-4'>{earning.carType}</h4>
                    <div className='space-y-3'>
                      <div>
                        <p className='text-xs text-slate-500 font-medium mb-1'>Daily Rate</p>
                        <p className='text-sm font-semibold text-slate-700'>{earning.dailyRate}</p>
                      </div>
                      <div>
                        <p className='text-xs text-slate-500 font-medium mb-1'>Monthly Potential</p>
                        <p className='text-lg font-bold text-slate-900'>{earning.monthlyEarnings}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className='text-center mt-8'>
              <p className='text-xs text-slate-500 font-normal'>
                * Earnings are estimates based on market rates and may vary depending on demand, location, and car
                condition.
              </p>
            </div>
          </div>
        </motion.section>

        {/* How It Works */}
        <motion.section
          className='mb-16 sm:mb-20'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className='text-center mb-10 sm:mb-12'>
            <h2 className='text-2xl sm:text-3xl font-semibold text-slate-900 mb-4'>How It Works</h2>
            <p className='text-slate-600 font-normal'>Simple steps to start earning with your car</p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  className='relative bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300'
                  variants={cardVariants}
                  initial='hidden'
                  whileInView='visible'
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                >
                  <div className='absolute -top-3 -right-3 w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg'>
                    {index + 1}
                  </div>
                  <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className={`w-7 h-7 ${step.iconColor}`} />
                  </div>
                  <h3 className='text-lg font-semibold text-slate-900 mb-3'>{step.title}</h3>
                  <p className='text-slate-600 font-normal text-sm leading-relaxed'>{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Requirements */}
        <motion.section
          className='mb-16 sm:mb-20'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className='grid lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
            <div>
              <h2 className='text-2xl sm:text-3xl font-semibold text-slate-900 mb-6'>Requirements</h2>
              <p className='text-slate-600 font-normal leading-relaxed mb-8'>
                To ensure the safety and satisfaction of our community, all listed vehicles must meet our quality
                standards.
              </p>

              <div className='space-y-4'>
                {requirements.map((requirement, index) => (
                  <motion.div
                    key={requirement}
                    className='flex items-center gap-3 bg-white rounded-xl p-4 border border-slate-200'
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className='w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0'>
                      <CheckCircle className='w-4 h-4 text-green-600' />
                    </div>
                    <span className='text-slate-700 font-medium'>{requirement}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className='bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm'>
              <h3 className='text-2xl font-semibold text-slate-900 mb-4'>Ready to Get Started?</h3>
              <p className='text-slate-600 font-normal leading-relaxed mb-8'>
                Join thousands of car owners who are already earning money with YAYAGO. The process is simple, secure,
                and completely free to start.
              </p>

              <div className='grid grid-cols-3 gap-3 mb-8'>
                <div className='text-center'>
                  <Badge className='bg-green-50 text-green-700 border-green-200 text-xs font-semibold px-3 py-2 w-full'>
                    Free
                  </Badge>
                  <p className='text-xs text-slate-600 mt-2'>Registration</p>
                </div>
                <div className='text-center'>
                  <Badge className='bg-blue-50 text-blue-700 border-blue-200 text-xs font-semibold px-3 py-2 w-full'>
                    24/7
                  </Badge>
                  <p className='text-xs text-slate-600 mt-2'>Support</p>
                </div>
                <div className='text-center'>
                  <Badge className='bg-purple-50 text-purple-700 border-purple-200 text-xs font-semibold px-3 py-2 w-full'>
                    Instant
                  </Badge>
                  <p className='text-xs text-slate-600 mt-2'>Payouts</p>
                </div>
              </div>

              <Link href='/pricing'>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className='w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2'>
                    List Your Car Now
                    <ArrowRight size={20} />
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Support Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className='bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white shadow-xl'>
            <div className='text-center mb-10'>
              <Headphones className='w-16 h-16 mx-auto mb-6 text-white/90' />
              <h2 className='text-2xl sm:text-3xl font-semibold mb-4'>Need Help?</h2>
              <p className='text-lg text-white/80 font-normal leading-relaxed max-w-2xl mx-auto'>
                Our dedicated support team is here to help you every step of the way. From listing your car to managing
                bookings, we've got you covered.
              </p>
            </div>

            <div className='flex flex-wrap justify-center gap-4'>
              <Link href='/contact'>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='inline-block'>
                  <Button
                    variant='outline'
                    className='gap-2 border-2 border-white/20 hover:border-white/40 hover:bg-white/10 text-white font-normal rounded-xl px-6 py-5 backdrop-blur-sm transition-all duration-200'
                  >
                    Contact Support
                  </Button>
                </motion.div>
              </Link>
              <Link href='/faq'>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='inline-block'>
                  <Button
                    variant='outline'
                    className='gap-2 border-2 border-white/20 hover:border-white/40 hover:bg-white/10 text-white font-normal rounded-xl px-6 py-5 backdrop-blur-sm transition-all duration-200'
                  >
                    View FAQ
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
