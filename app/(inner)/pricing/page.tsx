'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  Star,
  Zap,
  Crown,
  ArrowRight,
  Car,
  TrendingUp,
  Shield,
  Headphones,
  BarChart3,
  Users,
} from 'lucide-react';
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

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    icon: Car,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    description: 'Perfect for individuals starting out',
    monthly: 10,
    yearly: 100,
    features: [
      'List 1 car',
      'Up to 10 rentals per month',
      'Basic analytics dashboard',
      'Email support',
      'Standard listing visibility',
      'Mobile app access',
      'Payment processing',
      'Basic insurance coverage',
    ],
    badge: null,
    buttonStyle: 'outline',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    icon: Zap,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    description: 'Most popular for growing businesses',
    monthly: 20,
    yearly: 200,
    features: [
      'List up to 5 cars',
      'Up to 100 rentals per month',
      'Advanced analytics & insights',
      'Priority email & chat support',
      'Featured listing placement',
      'Mobile app access',
      'Priority payment processing',
      'Enhanced insurance coverage',
      'Custom pricing rules',
      'Promotional tools',
      'Verified host badge',
    ],
    badge: 'Most Popular',
    buttonStyle: 'default',
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    icon: Crown,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    description: 'For professional car rental businesses',
    monthly: 50,
    yearly: 500,
    features: [
      'List up to 100 cars',
      'Unlimited rentals per month',
      'Premium analytics & reporting',
      '24/7 dedicated phone support',
      'Top listing placement',
      'Mobile app access',
      'Instant payment processing',
      'Premium insurance coverage',
      'Advanced pricing automation',
      'Marketing & promotional tools',
      'Verified professional badge',
      'API access',
      'Custom branding options',
      'Account manager',
    ],
    badge: 'Best Value',
    buttonStyle: 'premium',
    popular: false,
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const calculateSavings = (monthly: number, yearly: number) => {
    const monthlyCost = monthly * 12;
    const savings = ((monthlyCost - yearly) / monthlyCost) * 100;
    return Math.round(savings);
  };

  return (
    <main className='min-h-screen pt-40 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 font-montserrat py-20 relative overflow-hidden'>
      {/* Subtle background elements */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(148,163,184,0.04)_0%,_transparent_50%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(100,116,139,0.03)_0%,_transparent_50%)]' />

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
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
            <span className='text-sm font-medium text-white tracking-wide'>Pricing Plans</span>
          </motion.div>

          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-6 tracking-tight leading-tight px-4'>
            Start Earning with Your Car
          </h1>
          <p className='text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8 font-normal leading-relaxed px-4'>
            Choose the perfect plan to list your car and start generating income. No hidden fees, cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className='inline-flex items-center gap-4 bg-white rounded-2xl p-2 shadow-lg border border-slate-200'>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                billingCycle === 'monthly' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                billingCycle === 'yearly' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Yearly
              <Badge className='bg-green-100 text-green-700 border-green-200 text-xs font-semibold'>
                Save up to 17%
              </Badge>
            </button>
          </div>
        </motion.header>

        {/* Pricing Cards */}
        <div className='grid md:grid-cols-3 gap-6 lg:gap-8 mb-16'>
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price = billingCycle === 'monthly' ? plan.monthly : plan.yearly;
            const savings = billingCycle === 'yearly' ? calculateSavings(plan.monthly, plan.yearly) : 0;

            return (
              <motion.div
                key={plan.id}
                className={`relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 ${
                  plan.popular
                    ? 'border-2 border-purple-500 shadow-xl shadow-purple-200/50 scale-105 lg:scale-110'
                    : 'border border-slate-200 shadow-sm hover:shadow-lg hover:shadow-slate-200/50'
                }`}
                variants={cardVariants}
                initial='hidden'
                animate='visible'
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: plan.popular ? 0 : -8 }}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div className='absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-purple-500 text-white text-center py-2 text-sm font-semibold'>
                    {plan.badge}
                  </div>
                )}

                <div className={`p-6 sm:p-8 ${plan.badge ? 'pt-12 sm:pt-14' : ''}`}>
                  {/* Plan Header */}
                  <div className='text-center mb-6'>
                    <div
                      className={`w-16 h-16 ${plan.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                    >
                      <Icon className={`w-8 h-8 ${plan.iconColor}`} />
                    </div>
                    <h3 className='text-2xl font-semibold text-slate-900 mb-2'>{plan.name}</h3>
                    <p className='text-sm text-gray-600 font-normal'>{plan.description}</p>
                  </div>

                  {/* Pricing */}
                  <div className='text-center mb-8'>
                    <div className='flex items-baseline justify-center gap-2 mb-2'>
                      <span className='text-5xl font-bold text-slate-900'>${price}</span>
                      <span className='text-lg text-slate-600 font-medium'>
                        /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && savings > 0 && (
                      <Badge className='bg-green-100 text-green-700 border-green-200 text-xs font-semibold'>
                        Save {savings}% annually
                      </Badge>
                    )}
                  </div>

                  {/* Features */}
                  <ul className='space-y-4 mb-8'>
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className='flex items-start gap-3'>
                        <div
                          className={`w-5 h-5 rounded-full ${
                            plan.popular ? 'bg-purple-100' : 'bg-green-100'
                          } flex items-center justify-center mt-0.5 flex-shrink-0`}
                        >
                          <Check className={`w-3.5 h-3.5 ${plan.popular ? 'text-purple-600' : 'text-green-600'}`} />
                        </div>
                        <span className='text-sm text-gray-600 font-normal leading-relaxed'>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link href='/list-car' className='block'>
                    {plan.buttonStyle === 'default' ? (
                      <Button className='w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 text-base'>
                        Get Started
                        <ArrowRight size={18} />
                      </Button>
                    ) : plan.buttonStyle === 'premium' ? (
                      <Button className='w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-medium py-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 text-base border-0'>
                        Get Started
                        <ArrowRight size={18} />
                      </Button>
                    ) : (
                      <Button
                        variant='outline'
                        className='w-full border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-900 font-medium py-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-base'
                      >
                        Get Started
                        <ArrowRight size={18} />
                      </Button>
                    )}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Features Comparison */}
        <motion.section
          className='mb-16'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='text-center mb-10'>
            <h2 className='text-2xl sm:text-3xl font-semibold text-slate-900 mb-3'>Why Choose YayaGo?</h2>
            <p className='text-gray-500 font-normal'>Everything you need to succeed as a car host</p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <div className='bg-white rounded-2xl p-6 border border-slate-200 shadow-sm'>
              <div className='w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4'>
                <TrendingUp className='w-6 h-6 text-blue-600' />
              </div>
              <h3 className='text-lg font-semibold text-slate-900 mb-2'>Maximize Earnings</h3>
              <p className='text-sm text-gray-600 font-normal leading-relaxed'>
                Set your own prices and increase your income with smart pricing tools
              </p>
            </div>

            <div className='bg-white rounded-2xl p-6 border border-slate-200 shadow-sm'>
              <div className='w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4'>
                <Shield className='w-6 h-6 text-green-600' />
              </div>
              <h3 className='text-lg font-semibold text-slate-900 mb-2'>Fully Protected</h3>
              <p className='text-sm text-gray-600 font-normal leading-relaxed'>
                Comprehensive insurance coverage for every rental, giving you peace of mind
              </p>
            </div>

            <div className='bg-white rounded-2xl p-6 border border-slate-200 shadow-sm'>
              <div className='w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4'>
                <BarChart3 className='w-6 h-6 text-purple-600' />
              </div>
              <h3 className='text-lg font-semibold text-slate-900 mb-2'>Track Performance</h3>
              <p className='text-sm text-gray-600 font-normal leading-relaxed'>
                Real-time analytics and insights to optimize your car rental business
              </p>
            </div>

            <div className='bg-white rounded-2xl p-6 border border-slate-200 shadow-sm'>
              <div className='w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4'>
                <Headphones className='w-6 h-6 text-orange-600' />
              </div>
              <h3 className='text-lg font-semibold text-slate-900 mb-2'>24/7 Support</h3>
              <p className='text-sm text-gray-600 font-normal leading-relaxed'>
                Round-the-clock support team ready to help you succeed as a host
              </p>
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          className='mb-16'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 border border-slate-200 shadow-sm'>
            <div className='text-center mb-10'>
              <h2 className='text-2xl sm:text-3xl font-semibold text-slate-900 mb-3'>Frequently Asked Questions</h2>
              <p className='text-gray-500 font-normal'>Everything you need to know about our pricing</p>
            </div>

            <div className='max-w-3xl mx-auto space-y-6'>
              <div className='border-b border-slate-200 pb-6'>
                <h3 className='text-lg font-semibold text-slate-900 mb-2'>Can I change my plan later?</h3>
                <p className='text-gray-600 font-normal leading-relaxed'>
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll
                  prorate any differences in cost.
                </p>
              </div>

              <div className='border-b border-slate-200 pb-6'>
                <h3 className='text-lg font-semibold text-slate-900 mb-2'>What happens if I exceed my rental limit?</h3>
                <p className='text-gray-600 font-normal leading-relaxed'>
                  If you reach your monthly rental limit, you can upgrade your plan or pay a small fee per additional
                  rental. We'll notify you before you reach your limit.
                </p>
              </div>

              <div className='border-b border-slate-200 pb-6'>
                <h3 className='text-lg font-semibold text-slate-900 mb-2'>Is there a setup fee?</h3>
                <p className='text-gray-600 font-normal leading-relaxed'>
                  No setup fees, no hidden costs. You only pay the subscription price for your chosen plan. Cancel
                  anytime without penalties.
                </p>
              </div>

              <div className='pb-6'>
                <h3 className='text-lg font-semibold text-slate-900 mb-2'>How does the payment work?</h3>
                <p className='text-gray-600 font-normal leading-relaxed'>
                  We handle all payments securely. Rental payments are processed automatically, and you receive your
                  earnings directly to your bank account within 2-3 business days.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section
          className='text-center'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-xl'>
            <Users className='w-16 h-16 mx-auto mb-6 text-white/90' />
            <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-4'>Ready to Start Earning?</h2>
            <p className='text-lg text-white/80 font-normal mb-8 max-w-2xl mx-auto leading-relaxed'>
              Join thousands of successful car owners already earning passive income with YayaGo. List your car today
              and start making money.
            </p>
            <Link href='/list-car'>
              <Button className='bg-white text-slate-900 hover:bg-gray-100 font-semibold py-6 px-10 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-lg'>
                List Your Car Now
                <ArrowRight size={20} className='ml-2' />
              </Button>
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
