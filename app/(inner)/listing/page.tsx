'use client';

import { motion } from 'framer-motion';
import { Car, DollarSign, Shield, Clock, Users, CheckCircle, Camera, FileText, Zap } from 'lucide-react';
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

const benefits = [
  {
    icon: <DollarSign className='w-6 h-6' />,
    title: '0% Commission',
    description: 'Keep 100% of your earnings. No hidden fees, no commissions. What you earn is what you keep.',
  },
  {
    icon: <Shield className='w-6 h-6' />,
    title: 'Full Insurance Coverage',
    description: 'Your car is fully protected with comprehensive insurance coverage during every rental.',
  },
  {
    icon: <Users className='w-6 h-6' />,
    title: 'Verified Renters',
    description: 'All renters are thoroughly verified with valid licenses and background checks.',
  },
  {
    icon: <Clock className='w-6 h-6' />,
    title: 'Flexible Schedule',
    description: 'Set your own availability and rental rates. You have complete control over your listing.',
  },
];

const steps = [
  {
    icon: <FileText className='w-8 h-8' />,
    title: 'Create Your Profile',
    description: 'Sign up and complete your profile with necessary documents and verification.',
  },
  {
    icon: <Camera className='w-8 h-8' />,
    title: 'Upload Car Details',
    description: 'Add photos, specifications, and set your rental rates for your vehicle.',
  },
  {
    icon: <CheckCircle className='w-8 h-8' />,
    title: 'Get Verified',
    description: 'Our team reviews your listing to ensure it meets our quality standards.',
  },
  {
    icon: <Zap className='w-8 h-8' />,
    title: 'Start Earning',
    description: 'Once approved, your car goes live and you can start accepting bookings.',
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
  { carType: 'Economy Car', dailyRate: '150 - 250 AED', monthlyEarnings: '3,000 - 5,000 AED' },
  { carType: 'Premium Sedan', dailyRate: '300 - 500 AED', monthlyEarnings: '6,000 - 10,000 AED' },
  { carType: 'Luxury Vehicle', dailyRate: '800 - 1,500 AED', monthlyEarnings: '15,000 - 30,000 AED' },
  { carType: 'Sports Car', dailyRate: '1,200 - 2,500 AED', monthlyEarnings: '20,000 - 50,000 AED' },
];

export default function ListingPage() {
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
            List Your Car
          </h1>
          <p className='text-lg text-gray-500 max-w-3xl mx-auto mb-12 font-light leading-relaxed'>
            Turn your idle car into a source of income. Join thousands of car owners earning money by sharing their vehicles on YAYAGO.
          </p>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className='bg-gray-900 hover:bg-gray-800 text-white font-light px-8 py-3 text-lg gap-2'>
              <Car size={20} />
              Start Listing Your Car
            </Button>
          </motion.div>
        </motion.header>

        {/* Benefits Section */}
        <motion.section
          className='mb-20'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-light text-gray-900 mb-4'>Why List with YAYAGO?</h2>
            <p className='text-gray-400 font-light'>The benefits of joining Dubai's premier car sharing platform</p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm text-center hover:shadow-md transition-all duration-300'
                variants={cardVariants}
                initial='hidden'
                whileInView='visible'
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
              >
                <div className='inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full text-gray-600 mb-4'>
                  {benefit.icon}
                </div>
                <h3 className='text-lg font-light text-gray-900 mb-3'>{benefit.title}</h3>
                <p className='text-gray-400 font-light text-sm leading-relaxed'>{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Earnings Potential */}
        <motion.section
          className='mb-20'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className='bg-white rounded-lg p-8 md:p-12 border border-gray-50 shadow-sm'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-light text-gray-900 mb-4'>Earnings Potential</h2>
              <p className='text-gray-400 font-light'>See how much you could earn based on your car type</p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {earnings.map((earning, index) => (
                <motion.div
                  key={earning.carType}
                  className='bg-gray-50 rounded-lg p-6 text-center'
                  variants={cardVariants}
                  initial='hidden'
                  whileInView='visible'
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className='text-lg font-light text-gray-900 mb-3'>{earning.carType}</h4>
                  <div className='space-y-2'>
                    <div>
                      <p className='text-xs text-gray-400 font-light'>Daily Rate</p>
                      <p className='text-sm font-light text-gray-700'>{earning.dailyRate}</p>
                    </div>
                    <div>
                      <p className='text-xs text-gray-400 font-light'>Monthly Potential</p>
                      <p className='text-lg font-light text-gray-900'>{earning.monthlyEarnings}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className='text-center mt-8'>
              <p className='text-xs text-gray-400 font-light'>
                * Earnings are estimates based on market rates and may vary depending on demand, location, and car condition.
              </p>
            </div>
          </div>
        </motion.section>

        {/* How It Works */}
        <motion.section
          className='mb-20'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-light text-gray-900 mb-4'>How It Works</h2>
            <p className='text-gray-400 font-light'>Simple steps to start earning with your car</p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className='text-center relative'
                variants={cardVariants}
                initial='hidden'
                whileInView='visible'
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className='inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full text-gray-600 mb-6'>
                  {step.icon}
                </div>
                <div className='absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-light'>
                  {index + 1}
                </div>
                <h3 className='text-lg font-light text-gray-900 mb-3'>{step.title}</h3>
                <p className='text-gray-400 font-light text-sm leading-relaxed'>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Requirements */}
        <motion.section
          className='mb-20'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-3xl font-light text-gray-900 mb-6'>Requirements</h2>
              <p className='text-gray-500 font-light leading-relaxed mb-8'>
                To ensure the safety and satisfaction of our community, all listed vehicles must meet our quality standards.
              </p>

              <div className='space-y-4'>
                {requirements.map((requirement, index) => (
                  <motion.div
                    key={requirement}
                    className='flex items-center gap-3'
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className='w-5 h-5 text-green-600 flex-shrink-0' />
                    <span className='text-gray-600 font-light'>{requirement}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'>
              <h3 className='text-xl font-light text-gray-900 mb-6'>Ready to Get Started?</h3>
              <p className='text-gray-500 font-light leading-relaxed mb-6'>
                Join thousands of car owners who are already earning money with YAYAGO. The process is simple,
                secure, and completely free to start.
              </p>

              <div className='space-y-3 mb-6'>
                <div className='flex items-center gap-3'>
                  <Badge className='bg-green-50 text-green-700 border-0 text-xs font-light'>
                    Free Registration
                  </Badge>
                </div>
                <div className='flex items-center gap-3'>
                  <Badge className='bg-blue-50 text-blue-700 border-0 text-xs font-light'>
                    24/7 Support
                  </Badge>
                </div>
                <div className='flex items-center gap-3'>
                  <Badge className='bg-purple-50 text-purple-700 border-0 text-xs font-light'>
                    Instant Payouts
                  </Badge>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className='w-full bg-gray-900 hover:bg-gray-800 text-white font-light py-3'>
                  List Your Car Now
                </Button>
              </motion.div>
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
          <div className='bg-white rounded-lg p-8 md:p-12 border border-gray-50 shadow-sm text-center'>
            <h2 className='text-3xl font-light text-gray-900 mb-6'>Need Help?</h2>
            <p className='text-gray-500 font-light leading-relaxed max-w-2xl mx-auto mb-8'>
              Our dedicated support team is here to help you every step of the way. From listing your car
              to managing bookings, we've got you covered.
            </p>

            <div className='flex flex-wrap justify-center gap-4'>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant='outline' className='gap-2 border-gray-200 hover:border-gray-300 font-light'>
                  Contact Support
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant='outline' className='gap-2 border-gray-200 hover:border-gray-300 font-light'>
                  View FAQ
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}