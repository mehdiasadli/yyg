'use client';

import { motion } from 'framer-motion';
import { Users, Target, Shield, Award, MapPin, Calendar, Car, Globe } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

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

const statsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.4,
    },
  },
};

const statItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
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

const values = [
  {
    icon: <Shield className='w-6 h-6' />,
    title: 'Trust & Safety',
    description: 'Every car and service provider is thoroughly vetted to ensure the highest standards of safety and reliability.',
  },
  {
    icon: <Users className='w-6 h-6' />,
    title: 'Community First',
    description: 'We believe in building a strong community of car owners, renters, and service providers who support each other.',
  },
  {
    icon: <Target className='w-6 h-6' />,
    title: 'Innovation',
    description: 'We continuously innovate to provide the best possible experience for our users through technology and service.',
  },
  {
    icon: <Award className='w-6 h-6' />,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, from customer service to platform functionality.',
  },
];

const milestones = [
  {
    year: '2020',
    title: 'Company Founded',
    description: 'YAYAGO was founded with a vision to revolutionize the automotive sharing economy in the UAE.',
  },
  {
    year: '2021',
    title: 'First 1,000 Cars',
    description: 'Reached our first milestone of 1,000 cars listed on the platform across Dubai and Abu Dhabi.',
  },
  {
    year: '2022',
    title: 'Auto Services Launch',
    description: 'Expanded beyond car rentals to include comprehensive automotive services and maintenance.',
  },
  {
    year: '2023',
    title: '10,000+ Happy Customers',
    description: 'Achieved 10,000 satisfied customers and became the leading car sharing platform in the UAE.',
  },
];

export default function AboutPage() {
  return (
    <main className='min-h-screen bg-white font-montserrat py-20'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        {/* Hero Section */}
        <motion.header
          className='text-center py-24 mb-16'
          variants={headerVariants}
          initial='hidden'
          animate='visible'
        >
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-tight'>
            About YAYAGO
          </h1>
          <p className='text-lg text-gray-500 max-w-3xl mx-auto mb-12 font-light leading-relaxed'>
            Connecting car owners, renters, and automotive professionals in Dubai's premier sharing economy platform
          </p>

          <motion.div
            className='flex flex-wrap justify-center gap-12 text-center'
            variants={statsVariants}
            initial='hidden'
            animate='visible'
          >
            <motion.div variants={statItemVariants} className='flex flex-col items-center'>
              <p className='text-3xl font-light text-gray-900 mb-2'>5,000+</p>
              <p className='text-sm text-gray-400 font-light tracking-wide'>Cars Available</p>
            </motion.div>
            <motion.div variants={statItemVariants} className='flex flex-col items-center'>
              <p className='text-3xl font-light text-gray-900 mb-2'>10,000+</p>
              <p className='text-sm text-gray-400 font-light tracking-wide'>Happy Customers</p>
            </motion.div>
            <motion.div variants={statItemVariants} className='flex flex-col items-center'>
              <p className='text-3xl font-light text-gray-900 mb-2'>500+</p>
              <p className='text-sm text-gray-400 font-light tracking-wide'>Service Providers</p>
            </motion.div>
            <motion.div variants={statItemVariants} className='flex flex-col items-center'>
              <p className='text-3xl font-light text-gray-900 mb-2'>0%</p>
              <p className='text-sm text-gray-400 font-light tracking-wide'>Commission</p>
            </motion.div>
          </motion.div>
        </motion.header>

        {/* Our Story Section */}
        <motion.section
          className='mb-20'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className='bg-white rounded-lg p-8 md:p-12 border border-gray-50 shadow-sm'>
            <div className='grid md:grid-cols-2 gap-12 items-center'>
              <div>
                <h2 className='text-3xl font-light text-gray-900 mb-6'>Our Story</h2>
                <p className='text-gray-500 font-light leading-relaxed mb-6'>
                  Founded in 2020, YAYAGO emerged from a simple observation: Dubai has thousands of cars sitting idle
                  while many people need temporary access to vehicles. We envisioned a platform that would connect
                  car owners with renters directly, eliminating unnecessary middlemen and commissions.
                </p>
                <p className='text-gray-500 font-light leading-relaxed mb-6'>
                  What started as a peer-to-peer car sharing platform has evolved into Dubai's most comprehensive
                  automotive ecosystem, connecting not just car owners and renters, but also trusted service providers,
                  mechanics, and detailing professionals.
                </p>
                <p className='text-gray-500 font-light leading-relaxed'>
                  Today, YAYAGO is proud to operate with 0% commission, ensuring that our community members keep
                  100% of their earnings while accessing the best automotive services in the UAE.
                </p>
              </div>
              <div className='relative h-96 rounded-lg overflow-hidden'>
                <Image
                  src='https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1000&auto=format&fit=crop'
                  alt='Dubai skyline'
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, 50vw'
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Our Values Section */}
        <motion.section
          className='mb-20'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-light text-gray-900 mb-4'>Our Values</h2>
            <p className='text-gray-400 font-light'>The principles that guide everything we do</p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm text-center hover:shadow-md transition-all duration-300'
                variants={cardVariants}
                initial='hidden'
                whileInView='visible'
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
              >
                <div className='inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full text-gray-600 mb-4'>
                  {value.icon}
                </div>
                <h3 className='text-lg font-light text-gray-900 mb-3'>{value.title}</h3>
                <p className='text-gray-400 font-light text-sm leading-relaxed'>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Timeline Section */}
        <motion.section
          className='mb-20'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-light text-gray-900 mb-4'>Our Journey</h2>
            <p className='text-gray-400 font-light'>Key milestones in YAYAGO's growth</p>
          </div>

          <div className='space-y-8'>
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'
                variants={cardVariants}
                initial='hidden'
                whileInView='visible'
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className='flex flex-col md:flex-row md:items-center gap-6'>
                  <div className='flex-shrink-0'>
                    <Badge className='bg-gray-100 text-gray-700 border-0 text-sm font-light px-4 py-2'>
                      {milestone.year}
                    </Badge>
                  </div>
                  <div className='flex-grow'>
                    <h3 className='text-xl font-light text-gray-900 mb-2'>{milestone.title}</h3>
                    <p className='text-gray-500 font-light leading-relaxed'>{milestone.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className='bg-white rounded-lg p-8 md:p-12 border border-gray-50 shadow-sm text-center'>
            <h2 className='text-3xl font-light text-gray-900 mb-6'>Join Our Community</h2>
            <p className='text-gray-500 font-light leading-relaxed max-w-2xl mx-auto mb-8'>
              Whether you're looking to rent a car for your next adventure, list your vehicle to earn extra income,
              or provide automotive services to our community, YAYAGO is here to connect you with the right people.
            </p>
            <div className='flex flex-wrap justify-center gap-6'>
              <div className='flex items-center gap-2 text-gray-400'>
                <MapPin className='w-4 h-4' />
                <span className='text-sm font-light'>Based in Dubai, UAE</span>
              </div>
              <div className='flex items-center gap-2 text-gray-400'>
                <Calendar className='w-4 h-4' />
                <span className='text-sm font-light'>Founded in 2020</span>
              </div>
              <div className='flex items-center gap-2 text-gray-400'>
                <Globe className='w-4 h-4' />
                <span className='text-sm font-light'>Serving the UAE</span>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}