'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Search,
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  Rocket,
  CreditCard,
  Wrench,
  Shield,
  Settings,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const faqData = [
  {
    category: 'Getting Started',
    icon: Rocket,
    color: 'from-blue-500/10 to-cyan-500/10',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    questions: [
      {
        question: 'How do I rent a car on YAYAGO?',
        answer:
          "To rent a car, simply search for your desired location and dates, browse available vehicles, select your preferred car, and complete the booking process. You'll need a valid UAE driving license and credit card.",
      },
      {
        question: 'What documents do I need to rent a car?',
        answer:
          'You need a valid UAE driving license (or valid international driving permit), Emirates ID or passport, and a valid credit card in your name.',
      },
      {
        question: 'How do I list my car for rent?',
        answer:
          'Create an account, go to the "List Your Car" section, upload photos of your vehicle, provide car details, set your rental rates, and submit for verification. Our team will review and approve your listing.',
      },
    ],
  },
  {
    category: 'Booking & Payment',
    icon: CreditCard,
    color: 'from-green-500/10 to-emerald-500/10',
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
    questions: [
      {
        question: 'How do I pay for my rental?',
        answer:
          'We accept all major credit and debit cards. Payment is processed securely through our platform when you confirm your booking.',
      },
      {
        question: 'Can I cancel my booking?',
        answer:
          'Yes, you can cancel your booking. Cancellation policies vary by car owner, but generally free cancellation is available up to 24 hours before pickup.',
      },
      {
        question: 'Do you charge any commission fees?',
        answer:
          "No, YAYAGO charges 0% commission. Car owners keep 100% of their earnings, and renters pay exactly what's listed.",
      },
    ],
  },
  {
    category: 'Auto Services',
    icon: Wrench,
    color: 'from-purple-500/10 to-violet-500/10',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    questions: [
      {
        question: 'How do I book auto services?',
        answer:
          'Browse our auto services section, select your preferred service provider, choose the service you need, and book directly through the platform or contact the provider.',
      },
      {
        question: 'Are the service providers verified?',
        answer:
          'Yes, all auto service providers on YAYAGO are verified and certified. We ensure they meet our quality standards and have proper licensing.',
      },
      {
        question: "What if I'm not satisfied with the service?",
        answer:
          "We have a quality guarantee. If you're not satisfied, contact our support team within 24 hours and we'll work to resolve the issue.",
      },
    ],
  },
  {
    category: 'Safety & Insurance',
    icon: Shield,
    color: 'from-orange-500/10 to-amber-500/10',
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-600',
    questions: [
      {
        question: 'Is insurance included?',
        answer:
          'All rental cars come with comprehensive insurance coverage. Additional coverage options may be available depending on the car owner.',
      },
      {
        question: "What happens if there's an accident?",
        answer:
          'In case of an accident, immediately contact emergency services if needed, then notify the car owner and YAYAGO support. Our insurance will handle the claims process.',
      },
      {
        question: 'Are renters verified?',
        answer:
          'Yes, all renters go through a verification process including driving license validation and background checks to ensure safety for car owners.',
      },
    ],
  },
  {
    category: 'Technical Support',
    icon: Settings,
    color: 'from-red-500/10 to-rose-500/10',
    iconBg: 'bg-red-50',
    iconColor: 'text-red-600',
    questions: [
      {
        question: 'How do I reset my password?',
        answer:
          'Click on "Forgot Password" on the login page, enter your email address, and follow the instructions sent to your email to reset your password.',
      },
      {
        question: "Why can't I see my listing?",
        answer:
          'Your listing may be under review, inactive, or have incomplete information. Check your dashboard for listing status and complete any required fields.',
      },
      {
        question: 'How do I update my profile information?',
        answer:
          'Go to your profile settings in your dashboard where you can update personal information, contact details, and preferences.',
      },
    ],
  },
];

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

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const filteredFAQs = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          (selectedCategory === '' || category.category === selectedCategory) &&
          (searchQuery === '' ||
            q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchQuery.toLowerCase()))
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <main className='pt-40 min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 font-montserrat py-20 relative overflow-hidden'>
      {/* Subtle background elements */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(148,163,184,0.04)_0%,_transparent_50%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(100,116,139,0.03)_0%,_transparent_50%)]' />

      <div className='relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
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
            <span className='text-sm font-medium text-white tracking-wide'>Help Center</span>
          </motion.div>

          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-6 tracking-tight leading-tight px-4'>
            How can we help you?
          </h1>
          <p className='text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8 font-normal leading-relaxed px-4'>
            Find answers to common questions about renting cars, listing vehicles, and using our auto services
          </p>
        </motion.header>

        {/* Search and Filter */}
        <motion.div
          className='mb-12 sm:mb-16'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg shadow-gray-200/50'>
            <div className='grid md:grid-cols-2 gap-4 sm:gap-6'>
              <div className='relative'>
                <Search className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400' />
                <Input
                  type='text'
                  placeholder='Search questions...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-12 pr-4 py-5 sm:py-6 text-sm sm:text-base bg-white border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-200 rounded-xl font-normal placeholder:text-slate-400'
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className='px-4 py-5 sm:py-6 border border-slate-200 rounded-xl focus:border-slate-400 focus:ring-1 focus:ring-slate-200 font-normal text-slate-900 bg-white transition-all duration-200 cursor-pointer'
              >
                <option value=''>All Categories</option>
                {faqData.map((category) => (
                  <option key={category.category} value={category.category}>
                    {category.category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* FAQ Content */}
        <div className='space-y-8 sm:space-y-12'>
          {filteredFAQs.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <motion.section
                key={category.category}
                className='space-y-6'
                variants={cardVariants}
                initial='hidden'
                whileInView='visible'
                transition={{ delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Category Header */}
                <div className='flex items-center gap-4'>
                  <div className={`w-14 h-14 ${category.iconBg} rounded-2xl flex items-center justify-center`}>
                    <Icon className={`w-7 h-7 ${category.iconColor}`} />
                  </div>
                  <h2 className='text-2xl sm:text-3xl font-semibold text-slate-900'>{category.category}</h2>
                </div>

                <div className='space-y-4'>
                  {category.questions.map((faq, index) => {
                    const itemId = `${category.category}-${index}`;
                    const isOpen = openItems.includes(itemId);

                    return (
                      <motion.div
                        key={itemId}
                        className='bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md overflow-hidden transition-all duration-300'
                        whileHover={{ scale: 1.01 }}
                      >
                        <button
                          onClick={() => toggleItem(itemId)}
                          className='w-full px-6 sm:px-8 py-5 sm:py-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors duration-200 group'
                        >
                          <h3 className='text-base sm:text-lg font-medium text-slate-900 pr-4 group-hover:text-blue-600 transition-colors duration-200'>
                            {faq.question}
                          </h3>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className='flex-shrink-0'
                          >
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                                isOpen ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'
                              }`}
                            >
                              <ChevronDown className='w-5 h-5' />
                            </div>
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className='overflow-hidden'
                            >
                              <div className='px-6 sm:px-8 pb-5 sm:pb-6 pt-2'>
                                <div
                                  className={`pl-5 border-l-4 border-blue-200 bg-gradient-to-r ${category.color} rounded-r-xl py-4 pr-5`}
                                >
                                  <p className='text-sm sm:text-base text-slate-600 font-normal leading-relaxed'>
                                    {faq.answer}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>
            );
          })}
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <motion.div className='text-center py-16' variants={cardVariants} initial='hidden' animate='visible'>
            <div className='w-24 h-24 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-blue-100/50'>
              <Search className='w-12 h-12 text-blue-400' />
            </div>
            <h3 className='text-xl sm:text-2xl font-medium text-gray-900 mb-3'>No questions found</h3>
            <p className='text-gray-500 font-light mb-8 max-w-md mx-auto'>
              Try adjusting your search or browse different categories to find what you're looking for
            </p>
            <Button
              variant='outline'
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
              }}
              className='border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 font-light rounded-xl px-6 py-5 transition-all duration-200'
            >
              Clear Search
            </Button>
          </motion.div>
        )}

        {/* Still Need Help */}
        <motion.section
          className='mt-16 sm:mt-20'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white shadow-xl'>
            <div className='text-center mb-10'>
              <HelpCircle className='w-16 h-16 mx-auto mb-6 text-white/90' />
              <h2 className='text-2xl sm:text-3xl font-semibold mb-4'>Still need help?</h2>
              <p className='text-lg text-white/80 font-normal leading-relaxed max-w-2xl mx-auto'>
                Can't find the answer you're looking for? Our support team is here to help you with any questions or
                concerns.
              </p>
            </div>

            <div className='grid md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto'>
              <Link href='/contact' className='block'>
                <motion.div
                  className='bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer group'
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className='w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200'>
                    <Mail className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-lg font-semibold mb-2'>Email Support</h3>
                  <p className='text-sm text-white/70'>We'll respond within 24 hours</p>
                </motion.div>
              </Link>

              <motion.a href='https://wa.me/971501234567' target='_blank' rel='noopener noreferrer' className='block'>
                <motion.div
                  className='bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer group'
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className='w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200'>
                    <MessageCircle className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-lg font-semibold mb-2'>Live Chat</h3>
                  <p className='text-sm text-white/70'>Chat with us on WhatsApp</p>
                </motion.div>
              </motion.a>

              <motion.a href='tel:+97141234567' className='block'>
                <motion.div
                  className='bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer group'
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className='w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200'>
                    <Phone className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-lg font-semibold mb-2'>Call Us</h3>
                  <p className='text-sm text-white/70'>Mon-Fri, 9 AM - 6 PM</p>
                </motion.div>
              </motion.a>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
