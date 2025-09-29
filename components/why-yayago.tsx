'use client';

import { motion } from 'framer-motion';
import { Car, DollarSign, MessageCircle } from 'lucide-react';

const features = [
  {
    icon: Car,
    title: '10,000+ Verified Cars',
    description: 'Choose from economy to exotic, luxury, sports cars, and SUVs for any occasion.',
    featured: false,
  },
  {
    icon: MessageCircle,
    title: 'Pay Zero Commission',
    description: 'Skip the middleman and connect directly on WhatsApp or phone with the car rental company.',
    featured: true,
  },
  {
    icon: DollarSign,
    title: 'Unmatched Pricing',
    description: 'Daily, weekly, and monthly rental rates updated in real-time for the best deals.',
    featured: false,
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
} as const;

const featuredItemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      type: 'spring',
      stiffness: 80,
      damping: 12,
    },
  },
} as const;

export default function WhyYayago() {
  return (
    <section className='py-24 px-6 bg-white font-montserrat'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-tight'>
            Why{' '}
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium'>
              YAYAGO
            </span>{' '}
            is the best Car Marketplace
          </h2>
          <p className='text-lg md:text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed'>
            Experience the future of car rentals with our innovative platform designed for both renters and owners.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const isFeatured = feature.featured;

            return (
              <motion.div
                key={feature.title}
                variants={isFeatured ? featuredItemVariants : itemVariants}
                className={`group relative ${isFeatured ? 'md:col-span-1 md:row-span-1' : ''}`}
              >
                <div
                  className={`relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-xl hover:shadow-gray-200/50 h-full flex flex-col ${
                    isFeatured ? 'md:scale-110 md:z-10' : ''
                  }`}
                >
                  {/* Subtle background gradient for featured card */}
                  {isFeatured && (
                    <div className='absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                  )}

                  <div className='relative flex-grow flex flex-col'>
                    <h3
                      className={`text-xl font-medium mb-4 transition-colors duration-300 ${
                        isFeatured
                          ? 'text-gray-900 group-hover:text-blue-600'
                          : 'text-gray-900 group-hover:text-gray-800'
                      }`}
                    >
                      {feature.title}
                    </h3>
                    <p className='text-gray-600 font-light leading-relaxed flex-grow'>{feature.description}</p>
                  </div>

                  {/* Subtle bottom accent for featured card */}
                  {isFeatured && (
                    <div className='absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-blue-200 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500' />
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
