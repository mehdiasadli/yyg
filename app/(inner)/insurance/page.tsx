'use client';

import { motion } from 'framer-motion';
import { Shield, Check, AlertCircle, Phone, Mail, FileText, Users, Car, Heart, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
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

const insurancePlans = [
  {
    name: 'Basic Coverage',
    price: 15,
    period: 'per day',
    description: 'Essential protection for your rental experience',
    features: [
      'Third-party liability coverage',
      'Collision damage waiver',
      'Theft protection',
      '24/7 roadside assistance',
      'Basic personal accident insurance',
    ],
    popular: false,
  },
  {
    name: 'Premium Coverage',
    price: 25,
    period: 'per day',
    description: 'Comprehensive protection with additional benefits',
    features: [
      'All Basic Coverage benefits',
      'Full comprehensive insurance',
      'Personal effects coverage',
      'Emergency medical expenses',
      'Trip interruption coverage',
      'Zero excess on claims',
    ],
    popular: true,
  },
  {
    name: 'Luxury Coverage',
    price: 40,
    period: 'per day',
    description: 'Ultimate protection for premium vehicle rentals',
    features: [
      'All Premium Coverage benefits',
      'Enhanced vehicle protection',
      'VIP claims service',
      'Concierge support',
      'International coverage',
      'Premium replacement vehicle',
    ],
    popular: false,
  },
];

const coverageDetails = [
  {
    icon: <Car className='w-6 h-6' />,
    title: 'Vehicle Protection',
    description: 'Comprehensive coverage for damage, theft, and vandalism to your rental vehicle.',
  },
  {
    icon: <Users className='w-6 h-6' />,
    title: 'Third-Party Liability',
    description: 'Protection against claims from third parties for injury or property damage.',
  },
  {
    icon: <Heart className='w-6 h-6' />,
    title: 'Personal Accident',
    description: 'Medical expenses and personal accident coverage for all passengers.',
  },
  {
    icon: <Shield className='w-6 h-6' />,
    title: 'Roadside Assistance',
    description: '24/7 emergency support including towing, battery jump, and lockout service.',
  },
];

const claimsProcess = [
  {
    step: '1',
    title: 'Report Incident',
    description: 'Contact our 24/7 claims hotline immediately after any incident',
  },
  {
    step: '2',
    title: 'Document Details',
    description: 'Take photos and gather necessary documentation at the scene',
  },
  {
    step: '3',
    title: 'File Claim',
    description: 'Submit your claim through our online portal or mobile app',
  },
  {
    step: '4',
    title: 'Quick Resolution',
    description: 'Our team processes claims within 24-48 hours for fast resolution',
  },
];

export default function InsurancePage() {
  return (
    <main className='min-h-screen bg-white font-montserrat py-20'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        {/* Header */}
        <motion.header
          className='text-center py-16 mb-12'
          variants={headerVariants}
          initial='hidden'
          animate='visible'
        >
          <div className='w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6'>
            <Shield className='w-10 h-10 text-gray-600' />
          </div>
          <h1 className='text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight'>
            Car Rental Insurance
          </h1>
          <p className='text-lg text-gray-500 font-light leading-relaxed max-w-2xl mx-auto'>
            Drive with confidence knowing you're protected with our comprehensive insurance plans designed for every journey
          </p>
        </motion.header>

        {/* Insurance Plans */}
        <motion.section
          className='mb-16'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-light text-gray-900 mb-4'>Choose Your Protection Level</h2>
            <p className='text-gray-500 font-light'>Select the insurance plan that best fits your needs and budget</p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {insurancePlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`bg-white rounded-lg p-8 border transition-all duration-300 relative ${
                  plan.popular
                    ? 'border-gray-900 shadow-lg scale-105'
                    : 'border-gray-50 shadow-sm hover:shadow-md'
                }`}
                variants={cardVariants}
                initial='hidden'
                whileInView='visible'
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: plan.popular ? 0 : -4 }}
              >
                {plan.popular && (
                  <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                    <Badge className='bg-gray-900 text-white border-0 px-4 py-1 font-light'>
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className='text-center mb-6'>
                  <h3 className='text-xl font-light text-gray-900 mb-2'>{plan.name}</h3>
                  <p className='text-sm text-gray-500 font-light mb-4'>{plan.description}</p>
                  <div className='mb-4'>
                    <span className='text-3xl font-light text-gray-900'>{plan.price} AED</span>
                    <span className='text-sm text-gray-500 font-light ml-2'>{plan.period}</span>
                  </div>
                </div>

                <ul className='space-y-3 mb-8'>
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className='flex items-start gap-3'>
                      <Check className='w-5 h-5 text-green-600 flex-shrink-0 mt-0.5' />
                      <span className='text-sm font-light text-gray-700'>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full font-light ${
                    plan.popular
                      ? 'bg-gray-900 hover:bg-gray-800 text-white'
                      : 'bg-white border border-gray-200 hover:border-gray-300 text-gray-900'
                  }`}
                >
                  Select Plan
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Coverage Details */}
        <motion.section
          className='mb-16'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'>
            <h3 className='text-2xl font-light text-gray-900 mb-8 text-center'>What's Covered</h3>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {coverageDetails.map((item, index) => (
                <motion.div
                  key={item.title}
                  className='text-center'
                  variants={cardVariants}
                  initial='hidden'
                  whileInView='visible'
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className='w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-600'>
                    {item.icon}
                  </div>
                  <h4 className='text-lg font-light text-gray-900 mb-2'>{item.title}</h4>
                  <p className='text-sm text-gray-500 font-light leading-relaxed'>{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Claims Process */}
        <motion.section
          className='mb-16'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'>
            <h3 className='text-2xl font-light text-gray-900 mb-8 text-center'>How to Make a Claim</h3>
            <div className='grid md:grid-cols-4 gap-8'>
              {claimsProcess.map((item, index) => (
                <motion.div
                  key={item.step}
                  className='text-center relative'
                  variants={cardVariants}
                  initial='hidden'
                  whileInView='visible'
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className='w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-light'>
                    {item.step}
                  </div>
                  <h4 className='text-lg font-light text-gray-900 mb-2'>{item.title}</h4>
                  <p className='text-sm text-gray-500 font-light leading-relaxed'>{item.description}</p>

                  {index < claimsProcess.length - 1 && (
                    <div className='hidden md:block absolute top-6 left-full w-full h-0.5 bg-gray-200 transform -translate-x-1/2' />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Important Information */}
        <motion.section
          className='mb-16'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='bg-blue-50 rounded-lg p-8 border border-blue-100'>
            <div className='flex items-start gap-4'>
              <AlertCircle className='w-6 h-6 text-blue-600 flex-shrink-0 mt-1' />
              <div>
                <h3 className='text-xl font-light text-gray-900 mb-4'>Important Information</h3>
                <div className='space-y-3 text-sm font-light text-gray-700'>
                  <p>
                    • Insurance coverage is mandatory for all car rentals in the UAE and is included in your rental price.
                  </p>
                  <p>
                    • Additional coverage options provide enhanced protection and reduced excess amounts.
                  </p>
                  <p>
                    • All drivers must possess a valid international or UAE driving license to be covered under the policy.
                  </p>
                  <p>
                    • Coverage excludes damages caused by negligent driving, driving under influence, or off-road activities.
                  </p>
                  <p>
                    • Claims must be reported within 24 hours of the incident to ensure proper coverage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Contact Support */}
        <motion.section
          className='mb-16'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='grid md:grid-cols-2 gap-8'>
            <div className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'>
              <h3 className='text-xl font-light text-gray-900 mb-6'>24/7 Claims Support</h3>
              <div className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <Phone className='w-5 h-5 text-gray-400' />
                  <div>
                    <p className='font-light text-gray-900'>Emergency Hotline</p>
                    <p className='text-sm text-gray-500 font-light'>+971 800 CLAIMS (254467)</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <Mail className='w-5 h-5 text-gray-400' />
                  <div>
                    <p className='font-light text-gray-900'>Email Support</p>
                    <p className='text-sm text-gray-500 font-light'>claims@yayago.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'>
              <h3 className='text-xl font-light text-gray-900 mb-6'>Documentation</h3>
              <div className='space-y-4'>
                <Link href='#' className='flex items-center gap-3 hover:text-gray-700 transition-colors'>
                  <FileText className='w-5 h-5 text-gray-400' />
                  <div>
                    <p className='font-light text-gray-900'>Policy Terms & Conditions</p>
                    <p className='text-sm text-gray-500 font-light'>Download PDF</p>
                  </div>
                </Link>
                <Link href='#' className='flex items-center gap-3 hover:text-gray-700 transition-colors'>
                  <FileText className='w-5 h-5 text-gray-400' />
                  <div>
                    <p className='font-light text-gray-900'>Claims Form</p>
                    <p className='text-sm text-gray-500 font-light'>Download PDF</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'>
            <h3 className='text-2xl font-light text-gray-900 mb-8 text-center'>Frequently Asked Questions</h3>
            <div className='grid md:grid-cols-2 gap-8'>
              <div className='space-y-6'>
                <div>
                  <h4 className='font-light text-gray-900 mb-2'>Is insurance mandatory?</h4>
                  <p className='text-sm text-gray-500 font-light leading-relaxed'>
                    Yes, basic insurance coverage is mandatory and included in all rental prices as per UAE law.
                  </p>
                </div>
                <div>
                  <h4 className='font-light text-gray-900 mb-2'>What is the excess amount?</h4>
                  <p className='text-sm text-gray-500 font-light leading-relaxed'>
                    Basic coverage includes a standard excess. Premium and Luxury plans offer reduced or zero excess options.
                  </p>
                </div>
              </div>
              <div className='space-y-6'>
                <div>
                  <h4 className='font-light text-gray-900 mb-2'>Can I modify my coverage after booking?</h4>
                  <p className='text-sm text-gray-500 font-light leading-relaxed'>
                    Yes, you can upgrade your coverage at any time before or during your rental period.
                  </p>
                </div>
                <div>
                  <h4 className='font-light text-gray-900 mb-2'>How quickly are claims processed?</h4>
                  <p className='text-sm text-gray-500 font-light leading-relaxed'>
                    Most claims are processed within 24-48 hours, with immediate assistance available for emergencies.
                  </p>
                </div>
              </div>
            </div>

            <div className='text-center mt-8'>
              <Link href='/faq'>
                <Button variant='outline' className='border-gray-200 hover:border-gray-300 font-light'>
                  View All FAQs
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}