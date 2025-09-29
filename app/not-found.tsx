'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Home, Search, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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

const quickLinks = [
  {
    icon: <Home className='w-5 h-5' />,
    title: 'Homepage',
    description: 'Return to the main page',
    link: '/',
  },
  {
    icon: <Search className='w-5 h-5' />,
    title: 'Browse Cars',
    description: 'Find available rentals',
    link: '/rent',
  },
  {
    icon: <HelpCircle className='w-5 h-5' />,
    title: 'Help Center',
    description: 'Get support and answers',
    link: '/help',
  },
];

export default function NotFound() {
  return (
    <main className='min-h-screen bg-white font-montserrat flex items-center justify-center py-20'>
      <div className='max-w-2xl mx-auto px-6 lg:px-8 text-center'>
        {/* 404 Illustration */}
        <motion.div
          className='mb-12'
          variants={headerVariants}
          initial='hidden'
          animate='visible'
        >
          <div className='relative'>
            <div className='text-8xl md:text-9xl font-light text-gray-100 select-none'>
              404
            </div>
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center'>
                <Search className='w-12 h-12 text-gray-300' />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Header */}
        <motion.header
          className='mb-12'
          variants={cardVariants}
          initial='hidden'
          animate='visible'
          transition={{ delay: 0.2 }}
        >
          <h1 className='text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-tight'>
            Page Not Found
          </h1>
          <p className='text-lg text-gray-500 font-light leading-relaxed max-w-lg mx-auto'>
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
        </motion.header>

        {/* Quick Actions */}
        <motion.section
          className='mb-12'
          variants={cardVariants}
          initial='hidden'
          animate='visible'
          transition={{ delay: 0.4 }}
        >
          <div className='grid md:grid-cols-3 gap-6'>
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.title}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={link.link}>
                  <div className='bg-white rounded-lg p-6 border border-gray-50 shadow-sm hover:shadow-md transition-all duration-300 group'>
                    <div className='flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full text-gray-600 mb-4 group-hover:bg-gray-200 transition-colors mx-auto'>
                      {link.icon}
                    </div>
                    <h3 className='text-lg font-light text-gray-900 mb-2 group-hover:text-gray-700 transition-colors'>
                      {link.title}
                    </h3>
                    <p className='text-sm text-gray-500 font-light leading-relaxed'>
                      {link.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Back Button */}
        <motion.div
          variants={cardVariants}
          initial='hidden'
          animate='visible'
          transition={{ delay: 0.6 }}
        >
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => window.history.back()}
                variant='outline'
                className='gap-2 border-gray-200 hover:border-gray-300 font-light px-6'
              >
                <ArrowLeft size={16} />
                Go Back
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href='/'>
                <Button className='bg-gray-900 hover:bg-gray-800 text-white font-light px-6'>
                  <Home size={16} className='mr-2' />
                  Go Home
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Additional Help */}
        <motion.section
          className='mt-16'
          variants={cardVariants}
          initial='hidden'
          animate='visible'
          transition={{ delay: 0.8 }}
        >
          <div className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'>
            <h2 className='text-xl font-light text-gray-900 mb-4'>Still can't find what you're looking for?</h2>
            <p className='text-gray-500 font-light leading-relaxed mb-6'>
              Our support team is here to help you navigate the platform and find exactly what you need.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/help'>
                <Button variant='outline' className='border-gray-200 hover:border-gray-300 font-light'>
                  <HelpCircle size={16} className='mr-2' />
                  Visit Help Center
                </Button>
              </Link>
              <Link href='/contact'>
                <Button variant='outline' className='border-gray-200 hover:border-gray-300 font-light'>
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}