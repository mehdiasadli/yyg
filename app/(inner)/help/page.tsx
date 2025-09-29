'use client';

import { motion } from 'framer-motion';
import { Search, BookOpen, MessageCircle, Phone, Mail, Video, FileText, HelpCircle, Users, Car, Wrench, Shield } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

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

const helpCategories = [
  {
    icon: <Car className='w-8 h-8' />,
    title: 'Renting a Car',
    description: 'Learn how to find, book, and enjoy your rental experience',
    articles: [
      'How to search for cars',
      'Booking and payment process',
      'Pickup and return procedures',
      'What documents you need',
      'Cancellation policies',
    ],
    link: '/help/renting',
  },
  {
    icon: <Users className='w-8 h-8' />,
    title: 'Listing Your Car',
    description: 'Everything you need to know about earning money with your vehicle',
    articles: [
      'Getting started as a car owner',
      'Creating an attractive listing',
      'Setting competitive prices',
      'Managing bookings',
      'Earnings and payouts',
    ],
    link: '/help/listing',
  },
  {
    icon: <Wrench className='w-8 h-8' />,
    title: 'Auto Services',
    description: 'Find and book reliable automotive services',
    articles: [
      'Finding service providers',
      'Booking maintenance services',
      'Service quality guarantee',
      'Pricing and payments',
      'Scheduling appointments',
    ],
    link: '/help/auto-services',
  },
  {
    icon: <Shield className='w-8 h-8' />,
    title: 'Safety & Security',
    description: 'Stay safe and secure on the YAYAGO platform',
    articles: [
      'Identity verification process',
      'Insurance coverage details',
      'Reporting safety concerns',
      'Emergency procedures',
      'Trust and safety tips',
    ],
    link: '/help/safety',
  },
];

const supportOptions = [
  {
    icon: <MessageCircle className='w-6 h-6' />,
    title: 'Live Chat',
    description: 'Chat with our support team in real-time',
    availability: 'Available 24/7',
    action: 'Start Chat',
    primary: true,
  },
  {
    icon: <Phone className='w-6 h-6' />,
    title: 'Phone Support',
    description: 'Speak directly with a support specialist',
    availability: 'Sun-Thu: 9AM-6PM',
    action: 'Call Now',
    primary: false,
  },
  {
    icon: <Mail className='w-6 h-6' />,
    title: 'Email Support',
    description: 'Send us a detailed message',
    availability: 'Response within 24h',
    action: 'Send Email',
    primary: false,
  },
  {
    icon: <Video className='w-6 h-6' />,
    title: 'Video Tutorials',
    description: 'Watch step-by-step guides',
    availability: 'Available anytime',
    action: 'Watch Videos',
    primary: false,
  },
];

const quickLinks = [
  { title: 'Account Settings', link: '/profile' },
  { title: 'Booking History', link: '/my-bookings' },
  { title: 'Payment Methods', link: '/profile/payments' },
  { title: 'Verification Status', link: '/profile/verification' },
  { title: 'Earnings Dashboard', link: '/dashboard' },
  { title: 'My Listings', link: '/my-listings' },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <main className='min-h-screen bg-white font-montserrat py-20'>
      <div className='max-w-6xl mx-auto px-6 lg:px-8'>
        {/* Header */}
        <motion.header
          className='text-center py-24 mb-16'
          variants={headerVariants}
          initial='hidden'
          animate='visible'
        >
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full text-gray-600 mb-6'>
            <HelpCircle size={24} />
          </div>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-tight'>
            Help Center
          </h1>
          <p className='text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed'>
            Get the help you need to make the most of YAYAGO's car rental and auto services platform
          </p>
        </motion.header>

        {/* Search */}
        <motion.section
          className='mb-16'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='max-w-2xl mx-auto'>
            <div className='relative'>
              <Search className='absolute left-4 top-4 h-5 w-5 text-gray-400' />
              <Input
                type='text'
                placeholder='Search for help articles, guides, or topics...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-12 py-4 text-lg border-gray-100 focus:border-gray-300 focus:ring-0 font-light'
              />
            </div>
          </div>
        </motion.section>

        {/* Help Categories */}
        <motion.section
          className='mb-20'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-light text-gray-900 mb-4'>Browse by Category</h2>
            <p className='text-gray-500 font-light'>Find detailed guides and articles organized by topic</p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {helpCategories.map((category, index) => (
              <motion.div
                key={category.title}
                className='group'
                variants={cardVariants}
                initial='hidden'
                whileInView='visible'
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                <Link href={category.link}>
                  <div className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm hover:shadow-md transition-all duration-300 h-full'>
                    <div className='flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full text-gray-600 mb-6 group-hover:bg-gray-200 transition-colors'>
                      {category.icon}
                    </div>

                    <h3 className='text-xl font-light text-gray-900 mb-3 group-hover:text-gray-700 transition-colors'>
                      {category.title}
                    </h3>

                    <p className='text-gray-500 font-light text-sm mb-6 leading-relaxed'>
                      {category.description}
                    </p>

                    <div className='space-y-2'>
                      {category.articles.slice(0, 3).map((article, articleIndex) => (
                        <div key={articleIndex} className='flex items-center gap-2 text-xs text-gray-400'>
                          <div className='w-1 h-1 bg-gray-300 rounded-full' />
                          <span>{article}</span>
                        </div>
                      ))}
                      {category.articles.length > 3 && (
                        <div className='text-xs text-gray-400 font-light mt-2'>
                          +{category.articles.length - 3} more articles
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          className='mb-20'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-light text-gray-900 mb-4'>Quick Actions</h2>
            <p className='text-gray-500 font-light'>Common tasks and helpful links</p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.title}
                variants={cardVariants}
                initial='hidden'
                whileInView='visible'
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={link.link}>
                  <div className='bg-white rounded-lg p-6 border border-gray-50 shadow-sm hover:shadow-md transition-all duration-300'>
                    <div className='flex items-center gap-3'>
                      <BookOpen className='w-5 h-5 text-gray-400' />
                      <span className='font-light text-gray-900'>{link.title}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Support Options */}
        <motion.section
          className='mb-20'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-light text-gray-900 mb-4'>Contact Support</h2>
            <p className='text-gray-500 font-light'>Choose the best way to get help from our team</p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {supportOptions.map((option, index) => (
              <motion.div
                key={option.title}
                className='group'
                variants={cardVariants}
                initial='hidden'
                whileInView='visible'
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
              >
                <div className={`bg-white rounded-lg p-6 border border-gray-50 shadow-sm hover:shadow-md transition-all duration-300 h-full ${
                  option.primary ? 'ring-1 ring-gray-200' : ''
                }`}>
                  <div className='flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full text-gray-600 mb-4 group-hover:bg-gray-200 transition-colors'>
                    {option.icon}
                  </div>

                  <h3 className='text-lg font-light text-gray-900 mb-2'>
                    {option.title}
                  </h3>

                  <p className='text-gray-500 font-light text-sm mb-3 leading-relaxed'>
                    {option.description}
                  </p>

                  <div className='text-xs text-gray-400 font-light mb-4'>
                    {option.availability}
                  </div>

                  <Button
                    className={`w-full font-light ${
                      option.primary
                        ? 'bg-gray-900 hover:bg-gray-800 text-white'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    variant={option.primary ? undefined : 'outline'}
                  >
                    {option.action}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Popular Articles */}
        <motion.section
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'>
            <div className='text-center mb-8'>
              <h2 className='text-3xl font-light text-gray-900 mb-4'>Popular Articles</h2>
              <p className='text-gray-500 font-light'>Most accessed help articles this week</p>
            </div>

            <div className='grid md:grid-cols-2 gap-6'>
              <div className='space-y-4'>
                <h3 className='text-lg font-light text-gray-900 mb-4'>For Renters</h3>
                {[
                  'How to book your first car rental',
                  'Understanding rental pricing',
                  'What to do in case of an accident',
                  'Cancellation and refund policies',
                  'Extending your rental period',
                ].map((article, index) => (
                  <Link key={index} href={`/help/article/${article.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200'>
                      <FileText className='w-4 h-4 text-gray-400' />
                      <span className='font-light text-gray-700 hover:text-gray-900'>{article}</span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className='space-y-4'>
                <h3 className='text-lg font-light text-gray-900 mb-4'>For Car Owners</h3>
                {[
                  'Setting up your car listing',
                  'Optimizing your rental rates',
                  'Managing booking requests',
                  'Understanding insurance coverage',
                  'Getting paid for rentals',
                ].map((article, index) => (
                  <Link key={index} href={`/help/article/${article.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200'>
                      <FileText className='w-4 h-4 text-gray-400' />
                      <span className='font-light text-gray-700 hover:text-gray-900'>{article}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className='text-center mt-8'>
              <Link href='/faq'>
                <Button variant='outline' className='border-gray-200 hover:border-gray-300 font-light'>
                  View All FAQ
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}