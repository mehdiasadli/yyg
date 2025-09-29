'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Car, Wrench, Award } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { LiquidButton } from './animate-ui/primitives/buttons/liquid';
import { UserRound } from './animate-ui/icons/user-round';
import { AnimateIcon } from './animate-ui/icons/icon';
import TextRoll from './text-roll';

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -20,
    transition: { duration: 0.2 },
  },
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.2 },
  },
};

const navLinks = [
  { href: '/rent', label: 'Rent Cars', icon: Car },
  { href: '/auto-services', label: 'Auto Services', icon: Wrench },
  { href: '/brands', label: 'Brands', icon: Award },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <motion.header
        className='font-montserrat fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-slate-900/10'
        variants={navVariants}
        initial='hidden'
        animate='visible'
      >
        <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16 md:h-20'>
            {/* Logo */}
            <motion.div variants={itemVariants}>
              <Link href='/' className='flex items-center gap-3 group'>
                <div className='relative w-12 h-12 flex-shrink-0'>
                  <Image
                    src='/logos/logo-icon.svg'
                    alt='YayaGo Logo'
                    fill
                    className='object-contain group-hover:scale-110 transition-transform duration-300'
                  />
                </div>
                <div className='text-white flex items-center'>
                  <TextRoll className='text-xl md:text-2xl font-light tracking-wide font-montserrat group-hover:text-primary transition-colors duration-300'>
                    YAYA
                  </TextRoll>
                  <TextRoll className='text-xl md:text-2xl tracking-wide font-montserrat group-hover:text-primary transition-colors duration-300 font-semibold'>
                    Go
                  </TextRoll>
                </div>
              </Link>
            </motion.div>

            {/* Right Side Actions */}
            <div className='flex items-center gap-4'>
              <motion.div variants={itemVariants} className='hidden sm:block'>
                <AnimateIcon
                  className='flex items-center gap-2 cursor-pointer text-white/90 hover:text-white transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-white/5'
                  animateOnHover
                >
                  <UserRound className='w-4 h-4' />
                  <Link href='/auth' className='text-sm font-medium'>
                    Sign in
                  </Link>
                </AnimateIcon>
              </motion.div>

              <motion.div variants={itemVariants} className='hidden sm:block'>
                <LiquidButton
                  delay='0.2s'
                  fillHeight='2px'
                  hoverScale={1.05}
                  tapScale={0.95}
                  className='cursor-pointer text-sm font-semibold px-6 py-2.5 h-10 overflow-hidden rounded-lg [--liquid-button-color:var(--primary)] [--liquid-button-background-color:var(--primary)] text-white hover:text-white bg-primary shadow-lg shadow-primary/25'
                >
                  <Link href='/listing' className='text-sm font-medium'>
                    List Your Car
                  </Link>
                </LiquidButton>
              </motion.div>

              {/* Hamburger Menu Button - Always Visible */}
              <motion.button
                className='text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200'
                onClick={toggleMobileMenu}
                variants={itemVariants}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode='wait'>
                  {isMobileMenuOpen ? (
                    <motion.div
                      key='close'
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key='menu'
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Full Page Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className='fixed inset-0 bg-slate-900/98 backdrop-blur-xl z-40'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleMobileMenu}
          >
            <motion.div
              className='absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-600/5'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />

            <div className='relative flex flex-col h-full justify-center items-center px-8 font-montserrat'>
              {/* Navigation Links */}
              <motion.nav
                className='text-center space-y-4 mb-12'
                variants={mobileMenuVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                onClick={(e) => e.stopPropagation()}
              >
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <motion.div key={link.href} variants={mobileItemVariants}>
                      <Link
                        href={link.href}
                        className='group relative flex items-center justify-center gap-4 text-white text-2xl md:text-3xl lg:text-4xl font-medium tracking-wide py-4 px-6 rounded-2xl hover:bg-white/5 transition-all duration-300'
                        onClick={toggleMobileMenu}
                      >
                        <Icon className='w-7 h-7 md:w-8 md:h-8 group-hover:scale-110 transition-transform duration-300' />
                        <span className='relative'>
                          {link.label}
                          {/* Animated Underline */}
                          <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ease-out' />
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>

              {/* Action Buttons */}
              <motion.div
                className='space-y-4 w-full max-w-sm'
                variants={mobileMenuVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div variants={mobileItemVariants} className='sm:hidden'>
                  <Link
                    href='/auth'
                    className='w-full flex items-center justify-center gap-3 text-white/90 hover:text-white text-base font-medium py-4 px-8 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300'
                    onClick={toggleMobileMenu}
                  >
                    <UserRound className='w-5 h-5' />
                    Sign in
                  </Link>
                </motion.div>

                <motion.div variants={mobileItemVariants} className='sm:hidden'>
                  <Link
                    href='/listing'
                    className='w-full flex items-center justify-center text-base font-semibold py-4 px-8 rounded-xl bg-primary shadow-lg shadow-primary/25 text-white hover:bg-primary/90 transition-all duration-300'
                    onClick={toggleMobileMenu}
                  >
                    List Your Car
                  </Link>
                </motion.div>
              </motion.div>

              {/* Close hint */}
              <motion.p
                className='absolute bottom-8 text-white/40 text-sm font-light'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Tap anywhere to close
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
