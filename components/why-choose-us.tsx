'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Shield, Clock, Globe, CheckCircle, Zap, DollarSign } from 'lucide-react';

const items = [
  {
    title: '0% Commission',
    description:
      'Zero commission on both car rentals and garage services. Owners and service providers keep 100% of earnings.',
    details: 'Direct connections mean better prices for renters and maximum profits for owners',
    icon: DollarSign,
    gradient: 'from-emerald-500 to-green-600',
    color: 'emerald',
    iconBg: 'from-emerald-500/10 to-green-600/10',
  },
  {
    title: '24/7 Support',
    description:
      'Round-the-clock multilingual customer service in English, Arabic & Russian with local Dubai expertise.',
    details: 'Instant help whenever you need it, wherever you are',
    icon: Clock,
    gradient: 'from-blue-500 to-cyan-600',
    color: 'blue',
    iconBg: 'from-blue-500/10 to-cyan-600/10',
  },
  {
    title: 'Complete Ecosystem',
    description: 'One unified platform for car rentals, maintenance, repairs, detailing, and all automotive needs.',
    details: 'Everything automotive in one place - seamless and convenient',
    icon: Globe,
    gradient: 'from-purple-500 to-violet-600',
    color: 'purple',
    iconBg: 'from-purple-500/10 to-violet-600/10',
  },
  {
    title: 'Verified Partners',
    description: 'All car owners, renters, garages, and auto masters are thoroughly verified with UAE documents.',
    details: 'Trust and safety guaranteed through comprehensive verification',
    icon: Shield,
    gradient: 'from-orange-500 to-red-600',
    color: 'orange',
    iconBg: 'from-orange-500/10 to-red-600/10',
  },
  {
    title: 'Instant Booking',
    description: 'Book cars and garage services instantly with secure payment processing and immediate confirmation.',
    details: 'No waiting - get what you need when you need it',
    icon: Zap,
    gradient: 'from-amber-500 to-orange-600',
    color: 'amber',
    iconBg: 'from-amber-500/10 to-orange-600/10',
  },
  {
    title: 'Transparent Pricing',
    description: 'Crystal clear pricing with no hidden fees. What you see is exactly what you pay - guaranteed.',
    details: 'Real-time pricing updates and honest, upfront costs',
    icon: CheckCircle,
    gradient: 'from-teal-500 to-emerald-600',
    color: 'teal',
    iconBg: 'from-teal-500/10 to-emerald-600/10',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      type: 'spring',
      stiffness: 80,
      damping: 12,
    },
  },
} as const;

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

export default function WhyChooseUs() {
  return (
    <section className='font-montserrat relative py-32 px-6 bg-gradient-to-br from-white via-slate-50/50 to-gray-100/60 overflow-hidden'>
      {/* Light sophisticated background with automotive service theme */}
      <div className='absolute inset-0 bg-gradient-to-br from-white via-gray-50/70 to-stone-100/60' />

      {/* Automotive service background */}
      <div className='absolute inset-0 opacity-[0.015]'>
        <img
          src='https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=1920&h=1080&fit=crop&crop=center'
          alt='Automotive service background'
          className='w-full h-full object-cover'
        />
      </div>

      {/* Elegant overlay gradients */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-50/15 via-transparent to-purple-50/10' />
      <div className='absolute inset-0 bg-gradient-to-tr from-transparent via-amber-50/8 to-transparent' />

      {/* Sophisticated floating elements */}
      <div
        className='absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full blur-3xl animate-pulse'
        style={{ animationDuration: '8s' }}
      />
      <div
        className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-bl from-purple-100/15 to-transparent rounded-full blur-3xl animate-pulse'
        style={{ animationDuration: '10s', animationDelay: '2s' }}
      />

      <div className='max-w-7xl mx-auto relative'>
        {/* Header */}
        <motion.header
          className='text-center mb-20'
          variants={headerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className='inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-100/80 to-purple-100/80 border border-blue-200/50 mb-6'
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className='text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Why YayaGo?
            </span>
          </motion.div>

          <h2 className='text-4xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight leading-tight'>
            Your Complete{' '}
            <span className='bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 bg-clip-text text-transparent font-medium'>
              Automotive Partner
            </span>
          </h2>
          <p className='text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed'>
            Experience the future of car sharing and automotive services with our innovative platform designed for the
            modern world
          </p>
        </motion.header>

        {/* Features Grid */}
        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
        >
          {items.map((item, index) => (
            <FeatureCard key={item.title} item={item} index={index} />
          ))}
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          className='mt-24 max-w-4xl mx-auto'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className='text-center mb-12'>
            <h3 className='text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-tight'>Why We Stand Out</h3>
            <p className='text-gray-600 font-light'>See how YayaGo compares to traditional platforms</p>
          </div>

          <div className='bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-200/80 shadow-xl shadow-gray-200/50 overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-200'>
                    <th className='text-left py-6 px-8 text-sm font-semibold text-gray-700 uppercase tracking-wide'>
                      Feature
                    </th>
                    <th className='text-center py-6 px-8 text-sm font-semibold text-gray-900 uppercase tracking-wide'>
                      <div className='flex items-center justify-center gap-2'>
                        <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                          YayaGo
                        </span>
                      </div>
                    </th>
                    <th className='text-center py-6 px-8 text-sm font-semibold text-gray-500 uppercase tracking-wide'>
                      Others
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-100'>
                  <ComparisonRow feature='Commission Rate' yayago='0%' others='~10-20%' highlight={true} />
                  <ComparisonRow feature='Customer Support' yayago='24/7 Multilingual' others='Limited Hours' />
                  <ComparisonRow
                    feature='Verification Process'
                    yayago='UAE Documents Required'
                    others='Basic Verification'
                  />
                  <ComparisonRow
                    feature='Platform Coverage'
                    yayago='Rentals + Garage Services'
                    others='Rentals Only'
                    highlight={true}
                  />
                  <ComparisonRow feature='Payment Processing' yayago='Instant & Secure' others='Delayed Processing' />
                  <ComparisonRow feature='Hidden Fees' yayago='None' others='Multiple Fees' highlight={true} />
                  <ComparisonRow feature='Insurance Coverage' yayago='Comprehensive' others='Basic/Optional' />
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className='text-center mt-20 space-y-4'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className='flex items-center justify-center gap-8 flex-wrap'>
            <div className='text-center'>
              <div className='text-3xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                10,000+
              </div>
              <div className='text-sm text-gray-500 font-light'>Happy Users</div>
            </div>
            <div className='w-px h-12 bg-gray-200' />
            <div className='text-center'>
              <div className='text-3xl font-semibold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent'>
                500+
              </div>
              <div className='text-sm text-gray-500 font-light'>Verified Partners</div>
            </div>
            <div className='w-px h-12 bg-gray-200' />
            <div className='text-center'>
              <div className='text-3xl font-semibold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent'>
                50,000+
              </div>
              <div className='text-sm text-gray-500 font-light'>Successful Bookings</div>
            </div>
          </div>
          <p className='text-gray-400 text-sm font-light mt-6'>
            Trusted by thousands across Dubai for all automotive needs
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ComparisonRow({
  feature,
  yayago,
  others,
  highlight = false,
}: {
  feature: string;
  yayago: string;
  others: string;
  highlight?: boolean;
}) {
  return (
    <tr className={`transition-colors duration-200 ${highlight ? 'bg-blue-50/30' : 'hover:bg-gray-50'}`}>
      <td className='py-5 px-8 text-sm font-medium text-gray-700'>{feature}</td>
      <td className='py-5 px-8 text-center'>
        <div className='flex items-center justify-center'>
          <span className='inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50'>
            <CheckCircle className='w-4 h-4 text-green-600' />
            <span className='text-sm font-semibold text-gray-900'>{yayago}</span>
          </span>
        </div>
      </td>
      <td className='py-5 px-8 text-center'>
        <span className='text-sm font-normal text-gray-500'>{others}</span>
      </td>
    </tr>
  );
}

function FeatureCard({ item, index }: { item: (typeof items)[0]; index: number }) {
  return (
    <motion.div variants={itemVariants} className='group relative'>
      {/* Card Background */}
      <div className='relative h-full bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/80 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 overflow-hidden'>
        {/* Gradient overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-all duration-500 rounded-3xl`}
        />

        {/* Subtle corner accent */}
        <div
          className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.gradient} opacity-5 blur-2xl group-hover:opacity-10 transition-all duration-500`}
        />

        {/* Icon Container */}
        <div className='relative mb-6'>
          <div
            className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.iconBg} border border-gray-200/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm`}
          >
            <item.icon className={`w-7 h-7 text-${item.color}-600`} strokeWidth={1.5} />
          </div>

          {/* Animated glow effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}
          />
        </div>

        {/* Content */}
        <div className='relative space-y-3'>
          <h3 className='text-xl font-semibold text-gray-900 group-hover:text-gray-900 transition-colors duration-300'>
            {item.title}
          </h3>

          <p className='text-sm text-gray-600 leading-relaxed font-light'>{item.description}</p>

          {/* Additional details with fade-in effect */}
          <div className='pt-2 border-t border-gray-200/50 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0'>
            <p className='text-xs text-gray-500 font-light italic'>{item.details}</p>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl`}
        />
      </div>
    </motion.div>
  );
}
