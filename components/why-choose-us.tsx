'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Shield, Clock, Globe, CheckCircle, Zap, DollarSign } from 'lucide-react';

const items = [
  {
    title: '0% Commission',
    description:
      'Zero commission on both car rentals and garage services. Owners and service providers keep 100% of earnings',
    icon: DollarSign,
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    title: '24/7 Support',
    description: 'Multilingual customer service in English, Arabic & Russian with local Dubai expertise',
    icon: Clock,
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    title: 'Complete Ecosystem',
    description: 'One platform for car rentals, maintenance, repairs, detailing, and all automotive needs',
    icon: Globe,
    gradient: 'from-purple-500 to-violet-600',
  },
  {
    title: 'Verified Partners',
    description: 'All car owners, renters, garages, and auto masters are verified with UAE documents',
    icon: Shield,
    gradient: 'from-orange-500 to-red-600',
  },
  {
    title: 'Instant Booking',
    description: 'Book cars and garage services instantly with secure payment processing',
    icon: Zap,
    gradient: 'from-yellow-500 to-orange-600',
  },
  {
    title: 'Transparent Pricing',
    description: 'Clear pricing with no hidden fees. What you see is what you pay - guaranteed',
    icon: CheckCircle,
    gradient: 'from-teal-500 to-green-600',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: 100,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
} as const;

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

export default function WhyChooseUs() {
  return (
    <section className='font-montserrat relative py-24 px-6 bg-gradient-to-br from-white via-slate-50/50 to-gray-100/60 overflow-hidden'>
      {/* Light sophisticated background with automotive service theme */}
      <div className='absolute inset-0 bg-gradient-to-br from-white via-gray-50/70 to-stone-100/60' />

      {/* Automotive service background */}
      <div className='absolute inset-0 opacity-[0.02]'>
        <img
          src='https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=1920&h=1080&fit=crop&crop=center'
          alt='Automotive service background'
          className='w-full h-full object-cover'
        />
      </div>

      {/* Elegant overlay gradients */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/15' />
      <div className='absolute inset-0 bg-gradient-to-tr from-transparent via-amber-50/10 to-transparent' />

      {/* Sophisticated floating elements */}
      <div
        className='absolute top-0 left-20 w-64 h-64 bg-gradient-to-br from-blue-100/25 to-transparent rounded-full blur-3xl animate-pulse'
        style={{ animationDelay: '2s' }}
      />
      <div
        className='absolute bottom-10 right-20 w-80 h-80 bg-gradient-to-bl from-purple-100/20 to-transparent rounded-full blur-3xl animate-pulse'
        style={{ animationDelay: '3s' }}
      />

      {/* Subtle automotive service elements */}
      <div className='absolute top-1/3 right-1/3 w-36 h-24 opacity-[0.015]'>
        <img
          src='https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=400&h=200&fit=crop'
          alt='Service silhouette'
          className='w-full h-full object-cover rounded-lg'
        />
      </div>

      <div className='max-w-7xl mx-auto relative'>
        {/* Header */}
        <motion.header
          className='text-center mb-16'
          variants={headerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className='text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight'>
            Why Choose{' '}
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium'>
              YayaGo
            </span>
          </h2>
          <p className='text-lg text-gray-500 font-light max-w-2xl mx-auto leading-relaxed'>
            Experience the future of car sharing with our innovative platform designed for the modern world
          </p>
        </motion.header>

        {/* Features Grid */}

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto'>
          {items.map((item, index) => (
            <FeatureCard key={item.title} item={item} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className='text-center mt-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className='text-gray-400 text-sm font-light'>
            Join thousands of satisfied users who trust YayaGo for their automotive needs
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({ item, index }: { item: (typeof items)[0]; index: number }) {
  return (
    <div
      className={cn(
        'flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800',
        (index === 0 || index === 4) && 'lg:border-l dark:border-neutral-800',
        index < 4 && 'lg:border-b dark:border-neutral-800'
      )}
    >
      {index < 4 && (
        <div className='opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none' />
      )}
      {index >= 4 && (
        <div className='opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none' />
      )}
      <div className='mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400'>
        <item.icon className='w-6 h-6 text-primary' />
      </div>
      <div className='text-lg font-bold mb-2 relative z-10 px-10'>
        <div className='absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-primary transition-all duration-200 origin-center' />
        <span className='group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100'>
          {item.title}
        </span>
      </div>
      <p className='text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10'>{item.description}</p>
    </div>
  );
}
