'use client';

import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Users, Globe, FileText } from 'lucide-react';

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

const sections = [
  {
    icon: <Eye className='w-6 h-6' />,
    title: 'Information We Collect',
    content: [
      'Personal information such as name, email address, phone number, and Emirates ID when you create an account',
      'Vehicle information when you list your car, including photos, specifications, and documentation',
      'Booking and transaction data when you rent or list vehicles',
      'Communication data when you contact other users or our support team',
      'Device and usage information to improve our platform and services',
      'Location data to provide location-based services and verify vehicle availability',
    ],
  },
  {
    icon: <Globe className='w-6 h-6' />,
    title: 'How We Use Your Information',
    content: [
      'To provide and maintain our car rental and auto services platform',
      'To process bookings, payments, and facilitate communication between users',
      'To verify identity and ensure the safety of all platform users',
      'To send important notifications about your bookings and account',
      'To improve our services and develop new features',
      'To prevent fraud and ensure platform security',
      'To comply with legal obligations and UAE regulations',
    ],
  },
  {
    icon: <Users className='w-6 h-6' />,
    title: 'Information Sharing',
    content: [
      'We share necessary information between car owners and renters to facilitate bookings',
      'Auto service providers receive relevant information to provide their services',
      'We may share information with verified third-party service providers who assist in platform operations',
      'Information may be disclosed to law enforcement or regulatory authorities when required by law',
      'We do not sell, rent, or trade your personal information to third parties for marketing purposes',
      'Anonymous, aggregated data may be used for analytics and business insights',
    ],
  },
  {
    icon: <Lock className='w-6 h-6' />,
    title: 'Data Security',
    content: [
      'We implement industry-standard security measures to protect your data',
      'All payment transactions are processed through secure, encrypted channels',
      'Personal data is stored on secure servers with restricted access',
      'We regularly update our security protocols and conduct security audits',
      'Employee access to personal data is limited and monitored',
      'Data breaches are immediately investigated and users are notified as required',
    ],
  },
  {
    icon: <Shield className='w-6 h-6' />,
    title: 'Your Rights',
    content: [
      'Access and review your personal information stored on our platform',
      'Request correction of inaccurate or incomplete information',
      'Request deletion of your account and associated data',
      'Opt-out of non-essential communications and marketing messages',
      'Download a copy of your data in a portable format',
      'File complaints with relevant data protection authorities',
    ],
  },
  {
    icon: <FileText className='w-6 h-6' />,
    title: 'Data Retention',
    content: [
      'Account information is retained while your account remains active',
      'Booking and transaction data is kept for 7 years for legal and tax purposes',
      'Communication logs are retained for 3 years for customer service purposes',
      'Verification documents are stored as required by UAE regulations',
      'Deleted accounts have personal data removed within 30 days, except where legally required',
      'Auto service records are maintained according to service provider agreements',
    ],
  },
];

export default function PrivacyPage() {
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
            <Shield size={24} />
          </div>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-tight'>
            Privacy Policy
          </h1>
          <p className='text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed'>
            Your privacy is important to us. This policy explains how we collect, use, and protect your information on YAYAGO.
          </p>
          <div className='mt-8 text-sm text-gray-400 font-light'>
            Last updated: January 2024
          </div>
        </motion.header>

        {/* Introduction */}
        <motion.section
          className='mb-16'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'>
            <h2 className='text-2xl font-light text-gray-900 mb-4'>Introduction</h2>
            <div className='text-gray-600 font-light leading-relaxed space-y-4'>
              <p>
                YAYAGO operates a peer-to-peer car rental platform and auto services marketplace in the United Arab Emirates.
                We are committed to protecting your privacy and handling your data in an open and transparent manner.
              </p>
              <p>
                This Privacy Policy explains what information we collect, how we use it, and what rights you have
                regarding your personal data. By using our platform, you agree to the collection and use of
                information in accordance with this policy.
              </p>
              <p>
                We comply with applicable UAE data protection laws and international best practices to ensure
                your information is handled securely and responsibly.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Privacy Sections */}
        <div className='space-y-8'>
          {sections.map((section, index) => (
            <motion.section
              key={section.title}
              className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'
              variants={cardVariants}
              initial='hidden'
              whileInView='visible'
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className='flex items-center gap-3 mb-6'>
                <div className='flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full text-gray-600'>
                  {section.icon}
                </div>
                <h2 className='text-2xl font-light text-gray-900'>{section.title}</h2>
              </div>

              <ul className='space-y-3'>
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className='flex items-start gap-3'>
                    <div className='w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 flex-shrink-0' />
                    <span className='text-gray-600 font-light leading-relaxed'>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          ))}
        </div>

        {/* Cookies Policy */}
        <motion.section
          className='mt-8 bg-white rounded-lg p-8 border border-gray-50 shadow-sm'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <h2 className='text-2xl font-light text-gray-900 mb-6'>Cookies and Tracking</h2>
          <div className='text-gray-600 font-light leading-relaxed space-y-4'>
            <p>
              We use cookies and similar tracking technologies to improve your experience on our platform.
              Cookies help us remember your preferences, keep you logged in, and analyze how our platform is used.
            </p>
            <p>
              You can control cookie settings through your browser, though disabling certain cookies may
              affect platform functionality. We use both session cookies (deleted when you close your browser)
              and persistent cookies (stored until expiration or deletion).
            </p>
          </div>
        </motion.section>

        {/* Updates to Policy */}
        <motion.section
          className='mt-8 bg-white rounded-lg p-8 border border-gray-50 shadow-sm'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <h2 className='text-2xl font-light text-gray-900 mb-6'>Policy Updates</h2>
          <div className='text-gray-600 font-light leading-relaxed space-y-4'>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices,
              technology, legal requirements, or other factors. We will notify you of any material changes
              by posting the updated policy on our platform and updating the "Last updated" date.
            </p>
            <p>
              We encourage you to review this Privacy Policy periodically to stay informed about how we
              protect your information. Continued use of our platform after policy updates constitutes
              acceptance of the revised terms.
            </p>
          </div>
        </motion.section>

        {/* Contact Information */}
        <motion.section
          className='mt-8 bg-white rounded-lg p-8 border border-gray-50 shadow-sm'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <h2 className='text-2xl font-light text-gray-900 mb-6'>Contact Us</h2>
          <div className='text-gray-600 font-light leading-relaxed space-y-4'>
            <p>
              If you have any questions about this Privacy Policy or our data practices,
              or if you would like to exercise your rights regarding your personal information,
              please contact us:
            </p>
            <div className='space-y-2'>
              <p><strong className='font-medium'>Email:</strong> privacy@yayago.com</p>
              <p><strong className='font-medium'>Phone:</strong> +971 4 123 4567</p>
              <p><strong className='font-medium'>Address:</strong> YAYAGO, Dubai International Financial Centre, Dubai, UAE</p>
            </div>
            <p>
              We will respond to your inquiry within 30 days and work with you to address any concerns
              about your privacy and data protection.
            </p>
          </div>
        </motion.section>
      </div>
    </main>
  );
}