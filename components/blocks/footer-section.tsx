'use client';

import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Car,
  Wrench,
  Award,
  Users,
  FileText,
  HelpCircle,
} from 'lucide-react';
import Link from 'next/link';

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: 'Services',
    links: [
      { title: 'Rent Cars', href: '/rent', icon: Car },
      { title: 'Auto Services', href: '/auto-services', icon: Wrench },
      { title: 'Car Brands', href: '/brands', icon: Award },
      { title: 'List Your Car', href: '/listing', icon: Users },
    ],
  },
  {
    label: 'Company',
    links: [
      { title: 'About Us', href: '/about' },
      { title: 'Blog', href: '/blog' },
      { title: 'Contact', href: '/contact' },
      { title: 'Pricing', href: '/pricing' },
      { title: 'FAQs', href: '/faq', icon: HelpCircle },
    ],
  },
  {
    label: 'Legal',
    links: [
      { title: 'Privacy Policy', href: '/privacy', icon: FileText },
      { title: 'Terms of Service', href: '/terms', icon: FileText },
      { title: 'Insurance', href: '/insurance' },
    ],
  },
];

const socialLinks = [
  { title: 'Facebook', href: 'https://www.facebook.com/yayago', icon: Facebook },
  { title: 'Instagram', href: 'https://www.instagram.com/yayago', icon: Instagram },
  { title: 'LinkedIn', href: 'https://www.linkedin.com/company/yayago', icon: Linkedin },
  { title: 'Youtube', href: 'https://www.youtube.com/yayago', icon: Youtube },
];

const contactInfo = [
  { icon: Phone, text: '+971 4 123 4567', href: 'tel:+97141234567' },
  { icon: Mail, text: 'hello@yayago.com', href: 'mailto:hello@yayago.com' },
  { icon: MapPin, text: 'Dubai, UAE', href: '#' },
];

export function Footer() {
  return (
    <footer className='relative w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-montserrat mt-20'>
      {/* Decorative top border */}
      <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent' />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12'>
          {/* Brand Section */}
          <AnimatedContainer className='lg:col-span-4 space-y-6'>
            <Link href='/' className='inline-flex items-center group'>
              <span className='text-2xl font-light tracking-wide text-white group-hover:text-primary transition-colors duration-300'>
                YAYA
              </span>
              <span className='text-2xl font-semibold tracking-wide text-white group-hover:text-primary transition-colors duration-300'>
                GO
              </span>
            </Link>
            <p className='text-slate-400 text-sm leading-relaxed max-w-sm'>
              Dubai's premier car sharing and automotive services marketplace. Connecting car owners, renters, and
              service providers with 0% commission.
            </p>

            {/* Contact Info */}
            <div className='space-y-3'>
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.text}
                    href={item.href}
                    className='flex items-center gap-3 text-slate-400 hover:text-primary transition-colors duration-200 text-sm group'
                  >
                    <div className='w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-200'>
                      <Icon className='w-4 h-4' />
                    </div>
                    {item.text}
                  </a>
                );
              })}
            </div>

            {/* Social Links */}
            <div className='flex items-center gap-3 pt-4'>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.title}
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-10 h-10 rounded-lg bg-white/5 hover:bg-primary/20 flex items-center justify-center text-slate-400 hover:text-primary transition-all duration-200 group'
                    aria-label={social.title}
                  >
                    <Icon className='w-5 h-5 group-hover:scale-110 transition-transform duration-200' />
                  </a>
                );
              })}
            </div>
          </AnimatedContainer>

          {/* Footer Links */}
          <div className='lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8'>
            {footerLinks.map((section, index) => (
              <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                <div>
                  <h3 className='text-white font-semibold text-sm uppercase tracking-wider mb-4'>{section.label}</h3>
                  <ul className='space-y-3'>
                    {section.links.map((link) => {
                      const Icon = link.icon;
                      return (
                        <li key={link.title}>
                          <Link
                            href={link.href}
                            className='text-slate-400 hover:text-primary text-sm transition-colors duration-200 inline-flex items-center gap-2 group'
                          >
                            {Icon && (
                              <Icon className='w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all duration-200' />
                            )}
                            <span className='group-hover:translate-x-1 transition-transform duration-200'>
                              {link.title}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <AnimatedContainer delay={0.4}>
          <div className='bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-2xl p-8 mb-12 border border-primary/20'>
            <div className='max-w-2xl mx-auto text-center'>
              <h3 className='text-white font-semibold text-xl mb-3'>Stay Updated</h3>
              <p className='text-slate-400 text-sm mb-6'>
                Subscribe to our newsletter for the latest cars, services, and exclusive deals.
              </p>
              <div className='flex flex-col sm:flex-row gap-3 max-w-md mx-auto'>
                <input
                  type='email'
                  placeholder='Enter your email'
                  className='flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary/50 transition-colors duration-200 text-sm'
                />
                <button className='px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors duration-200 text-sm shadow-lg shadow-primary/25'>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </AnimatedContainer>

        {/* Bottom Bar */}
        <AnimatedContainer delay={0.5}>
          <div className='pt-8 border-t border-white/10'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
              <p className='text-slate-500 text-sm text-center md:text-left'>
                © {new Date().getFullYear()} YAYAGO. All rights reserved.
              </p>
              <div className='flex items-center gap-6 text-xs text-slate-500'>
                <span className='inline-flex items-center gap-2'>
                  <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse' />
                  0% Commission
                </span>
                <span>Made with ❤️ in Dubai</span>
              </div>
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
