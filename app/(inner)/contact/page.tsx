'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

const contactMethods = [
  {
    icon: <Mail className='w-6 h-6' />,
    title: 'Email',
    description: 'Send us an email and we\'ll respond within 24 hours',
    contact: 'hello@yayago.com',
    action: 'mailto:hello@yayago.com',
  },
  {
    icon: <Phone className='w-6 h-6' />,
    title: 'Phone',
    description: 'Call us directly for immediate assistance',
    contact: '+971 4 123 4567',
    action: 'tel:+97141234567',
  },
  {
    icon: <MessageSquare className='w-6 h-6' />,
    title: 'WhatsApp',
    description: 'Message us on WhatsApp for quick support',
    contact: '+971 50 123 4567',
    action: 'https://wa.me/971501234567',
  },
];

const officeHours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
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
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
            Get in Touch
          </h1>
          <p className='text-lg text-gray-500 max-w-3xl mx-auto mb-12 font-light leading-relaxed'>
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.header>

        <div className='grid lg:grid-cols-2 gap-16 mb-20'>
          {/* Contact Form */}
          <motion.div
            className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'
            variants={cardVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
          >
            <h2 className='text-2xl font-light text-gray-900 mb-6'>Send us a Message</h2>

            {isSubmitted ? (
              <motion.div
                className='text-center py-12'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Send className='w-8 h-8 text-green-600' />
                </div>
                <h3 className='text-xl font-light text-gray-900 mb-2'>Message Sent!</h3>
                <p className='text-gray-500 font-light'>Thank you for contacting us. We'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid md:grid-cols-2 gap-6'>
                  <div>
                    <label htmlFor='name' className='block text-sm font-light text-gray-600 mb-2'>
                      Full Name
                    </label>
                    <Input
                      id='name'
                      name='name'
                      type='text'
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className='w-full border-gray-100 focus:border-gray-300 focus:ring-0 font-light'
                      placeholder='Enter your full name'
                    />
                  </div>
                  <div>
                    <label htmlFor='email' className='block text-sm font-light text-gray-600 mb-2'>
                      Email Address
                    </label>
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className='w-full border-gray-100 focus:border-gray-300 focus:ring-0 font-light'
                      placeholder='Enter your email address'
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor='subject' className='block text-sm font-light text-gray-600 mb-2'>
                    Subject
                  </label>
                  <Input
                    id='subject'
                    name='subject'
                    type='text'
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className='w-full border-gray-100 focus:border-gray-300 focus:ring-0 font-light'
                    placeholder='What is this regarding?'
                  />
                </div>

                <div>
                  <label htmlFor='message' className='block text-sm font-light text-gray-600 mb-2'>
                    Message
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-100 rounded-lg focus:border-gray-300 focus:ring-0 font-light resize-none'
                    placeholder='Tell us how we can help you...'
                  />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full bg-gray-900 hover:bg-gray-800 text-white font-light py-3 gap-2'
                  >
                    {isSubmitting ? (
                      <>
                        <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            )}
          </motion.div>

          {/* Contact Information */}
          <div className='space-y-8'>
            {/* Contact Methods */}
            <motion.div
              variants={cardVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
            >
              <h2 className='text-2xl font-light text-gray-900 mb-6'>Contact Information</h2>
              <div className='space-y-6'>
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.title}
                    href={method.action}
                    target={method.title === 'WhatsApp' ? '_blank' : undefined}
                    rel={method.title === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                    className='block bg-white rounded-lg p-6 border border-gray-50 shadow-sm hover:shadow-md transition-all duration-300 group'
                    whileHover={{ y: -2 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className='flex items-start gap-4'>
                      <div className='flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 group-hover:bg-gray-200 transition-colors'>
                        {method.icon}
                      </div>
                      <div className='flex-grow'>
                        <h3 className='text-lg font-light text-gray-900 mb-1'>{method.title}</h3>
                        <p className='text-gray-400 font-light text-sm mb-2'>{method.description}</p>
                        <p className='text-gray-700 font-light'>{method.contact}</p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Office Hours */}
            <motion.div
              className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'
              variants={cardVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className='flex items-center gap-3 mb-6'>
                <Clock className='w-6 h-6 text-gray-600' />
                <h3 className='text-xl font-light text-gray-900'>Office Hours</h3>
              </div>
              <div className='space-y-3'>
                {officeHours.map((schedule) => (
                  <div key={schedule.day} className='flex justify-between items-center'>
                    <span className='text-gray-600 font-light'>{schedule.day}</span>
                    <Badge
                      variant='secondary'
                      className={`text-xs font-light ${
                        schedule.hours === 'Closed'
                          ? 'bg-gray-100 text-gray-500'
                          : 'bg-green-50 text-green-700'
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
              className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'
              variants={cardVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className='flex items-center gap-3 mb-6'>
                <MapPin className='w-6 h-6 text-gray-600' />
                <h3 className='text-xl font-light text-gray-900'>Our Office</h3>
              </div>
              <div className='space-y-2'>
                <p className='text-gray-600 font-light'>YAYAGO Headquarters</p>
                <p className='text-gray-600 font-light'>Dubai International Financial Centre</p>
                <p className='text-gray-600 font-light'>Level 42, Emirates Towers</p>
                <p className='text-gray-600 font-light'>Dubai, UAE</p>
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
          <div className='bg-white rounded-lg p-8 md:p-12 border border-gray-50 shadow-sm'>
            <h2 className='text-3xl font-light text-gray-900 mb-6'>Frequently Asked Questions</h2>
            <p className='text-gray-500 font-light leading-relaxed max-w-2xl mx-auto mb-8'>
              Can't find what you're looking for? Visit our FAQ section for quick answers to common questions,
              or feel free to reach out to our support team directly.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant='outline'
                className='gap-2 border-gray-200 hover:border-gray-300 font-light'
              >
                Visit FAQ
              </Button>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}