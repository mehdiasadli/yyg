'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Search, HelpCircle, MessageCircle, Mail, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const faqData = [
  {
    category: 'Getting Started',
    questions: [
      {
        question: 'How do I rent a car on YAYAGO?',
        answer: 'To rent a car, simply search for your desired location and dates, browse available vehicles, select your preferred car, and complete the booking process. You\'ll need a valid UAE driving license and credit card.',
      },
      {
        question: 'What documents do I need to rent a car?',
        answer: 'You need a valid UAE driving license (or valid international driving permit), Emirates ID or passport, and a valid credit card in your name.',
      },
      {
        question: 'How do I list my car for rent?',
        answer: 'Create an account, go to the "List Your Car" section, upload photos of your vehicle, provide car details, set your rental rates, and submit for verification. Our team will review and approve your listing.',
      },
    ],
  },
  {
    category: 'Booking & Payment',
    questions: [
      {
        question: 'How do I pay for my rental?',
        answer: 'We accept all major credit and debit cards. Payment is processed securely through our platform when you confirm your booking.',
      },
      {
        question: 'Can I cancel my booking?',
        answer: 'Yes, you can cancel your booking. Cancellation policies vary by car owner, but generally free cancellation is available up to 24 hours before pickup.',
      },
      {
        question: 'Do you charge any commission fees?',
        answer: 'No, YAYAGO charges 0% commission. Car owners keep 100% of their earnings, and renters pay exactly what\'s listed.',
      },
    ],
  },
  {
    category: 'Auto Services',
    questions: [
      {
        question: 'How do I book auto services?',
        answer: 'Browse our auto services section, select your preferred service provider, choose the service you need, and book directly through the platform or contact the provider.',
      },
      {
        question: 'Are the service providers verified?',
        answer: 'Yes, all auto service providers on YAYAGO are verified and certified. We ensure they meet our quality standards and have proper licensing.',
      },
      {
        question: 'What if I\'m not satisfied with the service?',
        answer: 'We have a quality guarantee. If you\'re not satisfied, contact our support team within 24 hours and we\'ll work to resolve the issue.',
      },
    ],
  },
  {
    category: 'Safety & Insurance',
    questions: [
      {
        question: 'Is insurance included?',
        answer: 'All rental cars come with comprehensive insurance coverage. Additional coverage options may be available depending on the car owner.',
      },
      {
        question: 'What happens if there\'s an accident?',
        answer: 'In case of an accident, immediately contact emergency services if needed, then notify the car owner and YAYAGO support. Our insurance will handle the claims process.',
      },
      {
        question: 'Are renters verified?',
        answer: 'Yes, all renters go through a verification process including driving license validation and background checks to ensure safety for car owners.',
      },
    ],
  },
  {
    category: 'Technical Support',
    questions: [
      {
        question: 'How do I reset my password?',
        answer: 'Click on "Forgot Password" on the login page, enter your email address, and follow the instructions sent to your email to reset your password.',
      },
      {
        question: 'Why can\'t I see my listing?',
        answer: 'Your listing may be under review, inactive, or have incomplete information. Check your dashboard for listing status and complete any required fields.',
      },
      {
        question: 'How do I update my profile information?',
        answer: 'Go to your profile settings in your dashboard where you can update personal information, contact details, and preferences.',
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
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      (selectedCategory === '' || category.category === selectedCategory) &&
      (searchQuery === '' ||
       q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
       q.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    ),
  })).filter(category => category.questions.length > 0);

  return (
    <main className='min-h-screen bg-white font-montserrat py-20'>
      <div className='max-w-4xl mx-auto px-6 lg:px-8'>
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
            Frequently Asked Questions
          </h1>
          <p className='text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed'>
            Find answers to common questions about renting cars, listing vehicles, and using our auto services
          </p>
        </motion.header>

        {/* Search and Filter */}
        <motion.div
          className='mb-12'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='bg-white rounded-lg p-6 border border-gray-50 shadow-sm'>
            <div className='grid md:grid-cols-2 gap-4'>
              <div className='relative'>
                <Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                <Input
                  type='text'
                  placeholder='Search questions...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-10 border-gray-100 focus:border-gray-300 focus:ring-0 font-light'
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className='px-3 py-2 border border-gray-100 rounded-lg focus:border-gray-300 focus:ring-0 font-light text-gray-900'
              >
                <option value=''>All Categories</option>
                {faqData.map(category => (
                  <option key={category.category} value={category.category}>
                    {category.category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* FAQ Content */}
        <div className='space-y-8'>
          {filteredFAQs.map((category, categoryIndex) => (
            <motion.section
              key={category.category}
              className='space-y-4'
              variants={cardVariants}
              initial='hidden'
              whileInView='visible'
              transition={{ delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h2 className='text-2xl font-light text-gray-900 mb-6'>{category.category}</h2>

              <div className='space-y-4'>
                {category.questions.map((faq, index) => {
                  const itemId = `${category.category}-${index}`;
                  const isOpen = openItems.includes(itemId);

                  return (
                    <motion.div
                      key={itemId}
                      className='bg-white rounded-lg border border-gray-50 shadow-sm overflow-hidden'
                      whileHover={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}
                    >
                      <button
                        onClick={() => toggleItem(itemId)}
                        className='w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200'
                      >
                        <h3 className='text-lg font-light text-gray-900 pr-4'>
                          {faq.question}
                        </h3>
                        {isOpen ? (
                          <ChevronUp className='w-5 h-5 text-gray-400 flex-shrink-0' />
                        ) : (
                          <ChevronDown className='w-5 h-5 text-gray-400 flex-shrink-0' />
                        )}
                      </button>

                      <motion.div
                        initial={false}
                        animate={{
                          height: isOpen ? 'auto' : 0,
                          opacity: isOpen ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className='overflow-hidden'
                      >
                        <div className='px-6 pb-5 pt-2'>
                          <p className='text-gray-600 font-light leading-relaxed'>
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          ))}
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <motion.div
            className='text-center py-16'
            variants={cardVariants}
            initial='hidden'
            animate='visible'
          >
            <div className='w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6'>
              <Search className='w-12 h-12 text-gray-300' />
            </div>
            <h3 className='text-xl font-light text-gray-900 mb-2'>No questions found</h3>
            <p className='text-gray-500 font-light mb-6'>
              Try adjusting your search or browse different categories
            </p>
            <Button
              variant='outline'
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
              }}
              className='border-gray-200 hover:border-gray-300 font-light'
            >
              Clear Search
            </Button>
          </motion.div>
        )}

        {/* Still Need Help */}
        <motion.section
          className='mt-20 text-center'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='bg-white rounded-lg p-8 md:p-12 border border-gray-50 shadow-sm'>
            <h2 className='text-3xl font-light text-gray-900 mb-6'>Still need help?</h2>
            <p className='text-gray-500 font-light leading-relaxed max-w-2xl mx-auto mb-8'>
              Can't find the answer you're looking for? Our support team is here to help you with any questions or concerns.
            </p>

            <div className='grid md:grid-cols-3 gap-6 max-w-2xl mx-auto'>
              <motion.div
                className='text-center'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant='outline'
                  className='w-full flex flex-col items-center gap-3 h-auto py-6 border-gray-200 hover:border-gray-300 font-light'
                >
                  <Mail className='w-6 h-6 text-gray-600' />
                  <span>Email Support</span>
                </Button>
              </motion.div>

              <motion.div
                className='text-center'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant='outline'
                  className='w-full flex flex-col items-center gap-3 h-auto py-6 border-gray-200 hover:border-gray-300 font-light'
                >
                  <MessageCircle className='w-6 h-6 text-gray-600' />
                  <span>Live Chat</span>
                </Button>
              </motion.div>

              <motion.div
                className='text-center'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant='outline'
                  className='w-full flex flex-col items-center gap-3 h-auto py-6 border-gray-200 hover:border-gray-300 font-light'
                >
                  <Phone className='w-6 h-6 text-gray-600' />
                  <span>Call Us</span>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}