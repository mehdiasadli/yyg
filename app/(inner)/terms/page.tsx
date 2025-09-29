'use client';

import { motion } from 'framer-motion';
import { FileText, Scale, Shield, AlertCircle, Users, Gavel } from 'lucide-react';

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
    icon: <Users className='w-6 h-6' />,
    title: 'Acceptance of Terms',
    content: [
      'By accessing and using YAYAGO, you accept and agree to be bound by these Terms of Service',
      'These terms apply to all users, including car owners, renters, and auto service providers',
      'If you do not agree with any part of these terms, you must not use our platform',
      'Use of our platform constitutes acceptance of these terms and our Privacy Policy',
      'You must be at least 21 years old and hold a valid UAE driving license to use our services',
    ],
  },
  {
    icon: <FileText className='w-6 h-6' />,
    title: 'Platform Usage',
    content: [
      'YAYAGO provides a platform connecting car owners with renters and auto service providers',
      'We facilitate bookings but are not a party to the rental agreements or service contracts',
      'You are responsible for all activities under your account and must keep login credentials secure',
      'Accounts are non-transferable and may only be used by the registered account holder',
      'You must provide accurate, current, and complete information when using our platform',
      'Commercial use of the platform requires explicit written permission from YAYAGO',
    ],
  },
  {
    icon: <Scale className='w-6 h-6' />,
    title: 'User Responsibilities',
    content: [
      'Car owners must ensure their vehicles are roadworthy, insured, and legally registered',
      'Renters must possess valid driving licenses and comply with UAE traffic laws',
      'All users must treat each other with respect and maintain professional conduct',
      'Users are responsible for any damages, fines, or legal issues arising from their use',
      'False or misleading information in listings or profiles is strictly prohibited',
      'Users must report any incidents, accidents, or disputes through our platform',
    ],
  },
  {
    icon: <Shield className='w-6 h-6' />,
    title: 'Safety and Verification',
    content: [
      'All users undergo identity and document verification before platform access',
      'Vehicle inspections may be required before listing approval',
      'Background checks are conducted for enhanced safety and security',
      'We reserve the right to suspend or terminate accounts for safety violations',
      'Emergency contact information must be kept current and accessible',
      'Users must report safety concerns or suspicious activities immediately',
    ],
  },
  {
    icon: <AlertCircle className='w-6 h-6' />,
    title: 'Prohibited Activities',
    content: [
      'Using the platform for illegal activities or purposes is strictly forbidden',
      'Creating multiple accounts or providing false information',
      'Circumventing our payment system or commission structure',
      'Harassing, threatening, or discriminating against other users',
      'Listing stolen, damaged, or uninsured vehicles',
      'Interfering with platform security or attempting unauthorized access',
      'Using the platform to compete directly with YAYAGO services',
    ],
  },
  {
    icon: <Gavel className='w-6 h-6' />,
    title: 'Liability and Disputes',
    content: [
      'YAYAGO acts as an intermediary and is not liable for user interactions or transactions',
      'Users engage in rentals and services at their own risk and responsibility',
      'We provide dispute resolution services but cannot guarantee outcomes',
      'Our liability is limited to the maximum extent permitted by UAE law',
      'Users agree to indemnify YAYAGO against claims arising from their platform use',
      'All disputes are subject to UAE jurisdiction and applicable laws',
    ],
  },
];

export default function TermsPage() {
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
            <FileText size={24} />
          </div>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-tight'>
            Terms of Service
          </h1>
          <p className='text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed'>
            These terms govern your use of YAYAGO and outline the rights and responsibilities of all platform users.
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
            <h2 className='text-2xl font-light text-gray-900 mb-4'>Welcome to YAYAGO</h2>
            <div className='text-gray-600 font-light leading-relaxed space-y-4'>
              <p>
                YAYAGO is a peer-to-peer car rental platform and auto services marketplace operating in the
                United Arab Emirates. These Terms of Service ("Terms") create a legally binding agreement
                between you and YAYAGO when you use our platform.
              </p>
              <p>
                Our platform connects car owners with people who need vehicles, and facilitates access to
                automotive services. We provide the technology and support to make these connections safe,
                reliable, and convenient for everyone involved.
              </p>
              <p>
                Please read these Terms carefully before using our services. Your use of YAYAGO indicates
                your acceptance of these Terms and your agreement to comply with them.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Terms Sections */}
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

        {/* Payment and Fees */}
        <motion.section
          className='mt-8 bg-white rounded-lg p-8 border border-gray-50 shadow-sm'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <h2 className='text-2xl font-light text-gray-900 mb-6'>Payment and Fees</h2>
          <div className='text-gray-600 font-light leading-relaxed space-y-4'>
            <p>
              YAYAGO operates on a 0% commission model. Car owners keep 100% of their rental earnings,
              and renters pay exactly what is listed by the car owner. We may charge nominal fees for
              additional services such as premium listings or enhanced verification.
            </p>
            <p>
              Payments are processed securely through our platform using encrypted payment gateways.
              All transactions are recorded and receipts are provided. Refunds are processed according
              to our cancellation policy and individual car owner terms.
            </p>
            <p>
              Users are responsible for any applicable taxes, fees, or charges imposed by banks,
              payment processors, or government authorities related to their transactions.
            </p>
          </div>
        </motion.section>

        {/* Intellectual Property */}
        <motion.section
          className='mt-8 bg-white rounded-lg p-8 border border-gray-50 shadow-sm'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <h2 className='text-2xl font-light text-gray-900 mb-6'>Intellectual Property</h2>
          <div className='text-gray-600 font-light leading-relaxed space-y-4'>
            <p>
              The YAYAGO platform, including its software, design, content, and trademarks, is owned by
              YAYAGO and protected by intellectual property laws. Users are granted a limited license
              to use the platform for its intended purposes only.
            </p>
            <p>
              Users retain ownership of content they upload (such as vehicle photos and descriptions)
              but grant YAYAGO a license to use this content for platform operations, marketing,
              and service improvement purposes.
            </p>
            <p>
              Users must not copy, modify, distribute, or create derivative works from our platform
              without explicit written permission. Violation of intellectual property rights may
              result in account termination and legal action.
            </p>
          </div>
        </motion.section>

        {/* Termination */}
        <motion.section
          className='mt-8 bg-white rounded-lg p-8 border border-gray-50 shadow-sm'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <h2 className='text-2xl font-light text-gray-900 mb-6'>Account Termination</h2>
          <div className='text-gray-600 font-light leading-relaxed space-y-4'>
            <p>
              Users may terminate their accounts at any time by contacting our support team.
              Upon termination, access to the platform will be revoked, but data may be retained
              as required by law or for legitimate business purposes.
            </p>
            <p>
              YAYAGO reserves the right to suspend or terminate accounts for violations of these Terms,
              illegal activities, or behavior that threatens platform safety and integrity.
              We will provide notice when possible, but immediate termination may occur for serious violations.
            </p>
            <p>
              Terminated users are prohibited from creating new accounts without explicit permission.
              Outstanding obligations and liabilities survive account termination.
            </p>
          </div>
        </motion.section>

        {/* Changes to Terms */}
        <motion.section
          className='mt-8 bg-white rounded-lg p-8 border border-gray-50 shadow-sm'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <h2 className='text-2xl font-light text-gray-900 mb-6'>Changes to Terms</h2>
          <div className='text-gray-600 font-light leading-relaxed space-y-4'>
            <p>
              We may update these Terms from time to time to reflect changes in our services,
              legal requirements, or business practices. Users will be notified of material changes
              through the platform or email, and continued use constitutes acceptance of updated Terms.
            </p>
            <p>
              If you do not agree with updated Terms, you must stop using the platform and may
              terminate your account. It is your responsibility to review Terms periodically
              for changes and updates.
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
              If you have questions about these Terms of Service or need clarification on any
              provisions, please contact us:
            </p>
            <div className='space-y-2'>
              <p><strong className='font-medium'>Email:</strong> legal@yayago.com</p>
              <p><strong className='font-medium'>Phone:</strong> +971 4 123 4567</p>
              <p><strong className='font-medium'>Address:</strong> YAYAGO, Dubai International Financial Centre, Dubai, UAE</p>
            </div>
            <p>
              We are committed to addressing your concerns and ensuring you understand your
              rights and obligations when using our platform.
            </p>
          </div>
        </motion.section>
      </div>
    </main>
  );
}