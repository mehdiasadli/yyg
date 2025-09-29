'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Car, Wrench, MapPin, Award, ChevronDown } from 'lucide-react';
import Link from 'next/link';
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
        className='fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-slate-900/10'
        variants={navVariants}
        initial='hidden'
        animate='visible'
      >
        <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16 md:h-20'>
            {/* Logo */}
            <motion.div variants={itemVariants}>
              <Link href='/' className='text-white flex items-center group'>
                <TextRoll className='text-xl md:text-2xl font-light tracking-wide font-montserrat group-hover:text-primary transition-colors duration-300'>
                  YAYA
                </TextRoll>
                <TextRoll className='text-xl md:text-2xl tracking-wide font-montserrat group-hover:text-primary transition-colors duration-300 font-semibold'>
                  GO
                </TextRoll>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className='hidden lg:flex items-center gap-8 font-montserrat'>
              <motion.nav variants={itemVariants}>
                <ul className='flex items-center gap-6'>
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.href}>
                        <Link
                          className='flex items-center gap-2 text-white/90 hover:text-primary text-sm font-medium tracking-wide transition-all duration-300 group'
                          href={link.href}
                        >
                          <Icon className='w-4 h-4 group-hover:scale-110 transition-transform duration-300' />
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </motion.nav>

              <motion.div variants={itemVariants}>
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

              <motion.div variants={itemVariants}>
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
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className='lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200'
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
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className='fixed inset-0 bg-slate-900/98 backdrop-blur-xl z-40 lg:hidden'
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
                className='text-center space-y-6 mb-12'
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
                        className='flex items-center justify-center gap-4 text-white text-2xl md:text-3xl font-medium tracking-wide hover:text-primary transition-colors duration-300 py-4 px-6 rounded-2xl hover:bg-white/5'
                        href={link.href}
                        onClick={toggleMobileMenu}
                      >
                        <Icon className='w-7 h-7' />
                        {link.label}
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
                <motion.div variants={mobileItemVariants}>
                  <Link
                    href='/auth'
                    className='w-full flex items-center justify-center gap-3 text-white/90 hover:text-white text-base font-medium py-4 px-8 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300'
                    onClick={toggleMobileMenu}
                  >
                    <UserRound className='w-5 h-5' />
                    Sign in
                  </Link>
                </motion.div>

                <motion.div variants={mobileItemVariants}>
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
