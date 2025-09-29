'use client';

import { motion } from 'framer-motion';
import { Users, Target, Shield, Award, MapPin, Calendar, Globe, TrendingUp, Heart, Zap, Star } from 'lucide-react';
import Image from 'next/image';

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

const values = [
  {
    icon: Shield,
    title: 'Trust & Safety',
    description:
      'Every car and service provider is thoroughly vetted to ensure the highest standards of safety and reliability.',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: Users,
    title: 'Community First',
    description:
      'We believe in building a strong community of car owners, renters, and service providers who support each other.',
    color: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    icon: Target,
    title: 'Innovation',
    description:
      'We continuously innovate to provide the best possible experience for our users through technology and service.',
    color: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, from customer service to platform functionality.',
    color: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
];

const milestones = [
  {
    year: '2020',
    icon: Zap,
    title: 'Company Founded',
    description: 'YAYAGO was founded with a vision to revolutionize the automotive sharing economy in the UAE.',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    year: '2021',
    icon: TrendingUp,
    title: 'First 1,000 Cars',
    description: 'Reached our first milestone of 1,000 cars listed on the platform across Dubai and Abu Dhabi.',
    color: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    year: '2022',
    icon: Heart,
    title: 'Auto Services Launch',
    description: 'Expanded beyond car rentals to include comprehensive automotive services and maintenance.',
    color: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    year: '2023',
    icon: Star,
    title: '10,000+ Happy Customers',
    description: 'Achieved 10,000 satisfied customers and became the leading car sharing platform in the UAE.',
    color: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
];

export default function AboutPage() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 font-montserrat py-20 relative overflow-hidden'>
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
            <span className='text-sm font-medium text-white tracking-wide'>About Us</span>
          </motion.div>

          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-6 tracking-tight leading-tight px-4'>
            About YAYAGO
          </h1>
          <p className='text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-12 font-normal leading-relaxed px-4'>
            Connecting car owners, renters, and automotive professionals in Dubai's premier sharing economy platform
          </p>

          {/* Stats */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto'>
            {[
              { value: '5,000+', label: 'Cars Available', icon: Target },
              { value: '10,000+', label: 'Happy Customers', icon: Users },
              { value: '500+', label: 'Service Providers', icon: Award },
              { value: '0%', label: 'Commission', icon: TrendingUp },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className='bg-white rounded-2xl p-6 border border-slate-200 shadow-sm'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <Icon className='w-8 h-8 text-blue-600 mx-auto mb-3' />
                  <p className='text-2xl sm:text-3xl font-bold text-slate-900 mb-1'>{stat.value}</p>
                  <p className='text-xs sm:text-sm text-slate-500 font-medium'>{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.header>

        {/* Our Story Section */}
        <motion.section
          className='mb-16 sm:mb-20'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className='bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm'>
            <div className='grid md:grid-cols-2 gap-8 sm:gap-12 items-center'>
              <div>
                <h2 className='text-2xl sm:text-3xl font-semibold text-slate-900 mb-6'>Our Story</h2>
                <p className='text-slate-600 font-normal leading-relaxed mb-6'>
                  Founded in 2020, YAYAGO emerged from a simple observation: Dubai has thousands of cars sitting idle
                  while many people need temporary access to vehicles. We envisioned a platform that would connect car
                  owners with renters directly, eliminating unnecessary middlemen and commissions.
                </p>
                <p className='text-slate-600 font-normal leading-relaxed mb-6'>
                  What started as a peer-to-peer car sharing platform has evolved into Dubai's most comprehensive
                  automotive ecosystem, connecting not just car owners and renters, but also trusted service providers,
                  mechanics, and detailing professionals.
                </p>
                <p className='text-slate-600 font-normal leading-relaxed'>
                  Today, YAYAGO is proud to operate with 0% commission, ensuring that our community members keep 100% of
                  their earnings while accessing the best automotive services in the UAE.
                </p>
              </div>
              <div className='relative h-80 sm:h-96 rounded-2xl overflow-hidden'>
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
          className='mb-16 sm:mb-20'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className='text-center mb-10 sm:mb-12'>
            <h2 className='text-2xl sm:text-3xl font-semibold text-slate-900 mb-4'>Our Values</h2>
            <p className='text-slate-600 font-normal'>The principles that guide everything we do</p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  className='bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 group'
                  variants={cardVariants}
                  initial='hidden'
                  whileInView='visible'
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <div
                    className={`w-14 h-14 ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-7 h-7 ${value.iconColor}`} />
                  </div>
                  <h3 className='text-lg font-semibold text-slate-900 mb-3'>{value.title}</h3>
                  <p className='text-slate-600 font-normal text-sm leading-relaxed'>{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Timeline Section */}
        <motion.section
          className='mb-16 sm:mb-20'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className='text-center mb-10 sm:mb-12'>
            <h2 className='text-2xl sm:text-3xl font-semibold text-slate-900 mb-4'>Our Journey</h2>
            <p className='text-slate-600 font-normal'>Key milestones in YAYAGO's growth</p>
          </div>

          <div className='grid md:grid-cols-2 gap-6 sm:gap-8'>
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <motion.div
                  key={milestone.year}
                  className='bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300'
                  variants={cardVariants}
                  initial='hidden'
                  whileInView='visible'
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className='flex items-start gap-6'>
                    <div
                      className={`w-16 h-16 ${milestone.color} rounded-2xl flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className={`w-8 h-8 ${milestone.iconColor}`} />
                    </div>
                    <div className='flex-1'>
                      <div className='inline-block px-3 py-1 bg-slate-100 rounded-lg text-sm font-semibold text-slate-700 mb-3'>
                        {milestone.year}
                      </div>
                      <h3 className='text-xl font-semibold text-slate-900 mb-2'>{milestone.title}</h3>
                      <p className='text-slate-600 font-normal leading-relaxed'>{milestone.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Join Community Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className='bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white shadow-xl'>
            <div className='text-center mb-10'>
              <Users className='w-16 h-16 mx-auto mb-6 text-white/90' />
              <h2 className='text-2xl sm:text-3xl font-semibold mb-4'>Join Our Community</h2>
              <p className='text-lg text-white/80 font-normal leading-relaxed max-w-2xl mx-auto mb-8'>
                Whether you're looking to rent a car for your next adventure, list your vehicle to earn extra income, or
                provide automotive services to our community, YAYAGO is here to connect you with the right people.
              </p>
            </div>

            <div className='grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto'>
              <div className='text-center'>
                <div className='w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3'>
                  <MapPin className='w-6 h-6 text-white' />
                </div>
                <p className='text-sm text-white/70'>Based in Dubai, UAE</p>
              </div>
              <div className='text-center'>
                <div className='w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3'>
                  <Calendar className='w-6 h-6 text-white' />
                </div>
                <p className='text-sm text-white/70'>Founded in 2020</p>
              </div>
              <div className='text-center'>
                <div className='w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3'>
                  <Globe className='w-6 h-6 text-white' />
                </div>
                <p className='text-sm text-white/70'>Serving the UAE</p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
