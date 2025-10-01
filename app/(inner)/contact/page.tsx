'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

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

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    description: "Send us an email and we'll respond within 24 hours",
    contact: 'hello@yayago.com',
    action: 'mailto:hello@yayago.com',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: Phone,
    title: 'Phone',
    description: 'Call us directly for immediate assistance',
    contact: '+971 4 123 4567',
    action: 'tel:+97141234567',
    color: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp',
    description: 'Message us on WhatsApp for quick support',
    contact: '+971 50 123 4567',
    action: 'https://wa.me/971501234567',
    color: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
];

const officeHours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM', available: true },
  { day: 'Saturday', hours: '10:00 AM - 4:00 PM', available: true },
  { day: 'Sunday', hours: 'Closed', available: false },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className='pt-40 min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 font-montserrat py-20 relative overflow-hidden'>
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
            <span className='text-sm font-medium text-white tracking-wide'>Contact Us</span>
          </motion.div>

          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-6 tracking-tight leading-tight px-4'>
            Get in Touch
          </h1>
          <p className='text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8 font-normal leading-relaxed px-4'>
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.header>

        <div className='grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16 sm:mb-20'>
          {/* Contact Form */}
          <motion.div
            className='bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm'
            variants={cardVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
          >
            <h2 className='text-2xl font-semibold text-slate-900 mb-6'>Send us a Message</h2>

            {isSubmitted ? (
              <motion.div
                className='text-center py-12'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className='w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-200'>
                  <Send className='w-10 h-10 text-green-600' />
                </div>
                <h3 className='text-2xl font-semibold text-slate-900 mb-3'>Message Sent!</h3>
                <p className='text-slate-600 font-normal'>Thank you for contacting us. We'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid md:grid-cols-2 gap-6'>
                  <div>
                    <label htmlFor='name' className='block text-sm font-medium text-slate-700 mb-2'>
                      Full Name
                    </label>
                    <Input
                      id='name'
                      name='name'
                      type='text'
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className='w-full border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-200 font-normal rounded-xl'
                      placeholder='Enter your full name'
                    />
                  </div>
                  <div>
                    <label htmlFor='email' className='block text-sm font-medium text-slate-700 mb-2'>
                      Email Address
                    </label>
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className='w-full border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-200 font-normal rounded-xl'
                      placeholder='Enter your email address'
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor='subject' className='block text-sm font-medium text-slate-700 mb-2'>
                    Subject
                  </label>
                  <Input
                    id='subject'
                    name='subject'
                    type='text'
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className='w-full border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-200 font-normal rounded-xl'
                    placeholder='What is this regarding?'
                  />
                </div>

                <div>
                  <label htmlFor='message' className='block text-sm font-medium text-slate-700 mb-2'>
                    Message
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-slate-400 focus:ring-1 focus:ring-slate-200 font-normal resize-none transition-all duration-200'
                    placeholder='Tell us how we can help you...'
                  />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-6 gap-2 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200'
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className='w-5 h-5 animate-spin' />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            )}
          </motion.div>

          {/* Contact Information */}
          <div className='space-y-6 sm:space-y-8'>
            {/* Contact Methods */}
            <motion.div variants={cardVariants} initial='hidden' whileInView='visible' viewport={{ once: true }}>
              <h2 className='text-2xl font-semibold text-slate-900 mb-6'>Contact Information</h2>
              <div className='space-y-4'>
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <motion.a
                      key={method.title}
                      href={method.action}
                      target={method.title === 'WhatsApp' ? '_blank' : undefined}
                      rel={method.title === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                      className='block bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 group'
                      whileHover={{ y: -4 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className='flex items-start gap-4'>
                        <div
                          className={`flex-shrink-0 w-14 h-14 ${method.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                        >
                          <Icon className={`w-7 h-7 ${method.iconColor}`} />
                        </div>
                        <div className='flex-grow'>
                          <h3 className='text-lg font-semibold text-slate-900 mb-1'>{method.title}</h3>
                          <p className='text-slate-500 font-normal text-sm mb-2'>{method.description}</p>
                          <p className='text-slate-900 font-semibold'>{method.contact}</p>
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Office Hours */}
            <motion.div
              className='bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm'
              variants={cardVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className='flex items-center gap-3 mb-6'>
                <div className='w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center'>
                  <Clock className='w-6 h-6 text-blue-600' />
                </div>
                <h3 className='text-xl font-semibold text-slate-900'>Office Hours</h3>
              </div>
              <div className='space-y-4'>
                {officeHours.map((schedule) => (
                  <div key={schedule.day} className='flex justify-between items-center'>
                    <span className='text-slate-600 font-normal'>{schedule.day}</span>
                    <Badge
                      className={`text-xs font-semibold ${
                        schedule.available
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {schedule.hours}
                    </Badge>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Office Location */}
            <motion.div
              className='bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm'
              variants={cardVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className='flex items-center gap-3 mb-6'>
                <div className='w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center'>
                  <MapPin className='w-6 h-6 text-purple-600' />
                </div>
                <h3 className='text-xl font-semibold text-slate-900'>Our Office</h3>
              </div>
              <div className='space-y-2'>
                <p className='text-slate-900 font-semibold'>YAYAGO Headquarters</p>
                <p className='text-slate-600 font-normal'>Dubai International Financial Centre</p>
                <p className='text-slate-600 font-normal'>Level 42, Emirates Towers</p>
                <p className='text-slate-600 font-normal'>Dubai, UAE</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <motion.section
          className='text-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className='bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm'>
            <h2 className='text-2xl sm:text-3xl font-semibold text-slate-900 mb-4'>Frequently Asked Questions</h2>
            <p className='text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto mb-8'>
              Can't find what you're looking for? Visit our FAQ section for quick answers to common questions, or feel
              free to reach out to our support team directly.
            </p>
            <Link href='/faq'>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='inline-block'>
                <Button
                  variant='outline'
                  className='gap-2 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-normal rounded-xl px-8 py-6 transition-all duration-200'
                >
                  Visit FAQ
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
