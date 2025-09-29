'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
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
      staggerChildren: 0.1,
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

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <motion.header
        className='fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10'
        variants={navVariants}
        initial='hidden'
        animate='visible'
      >
        <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16 md:h-20'>
            {/* Logo */}
            <motion.div variants={itemVariants}>
              <Link href='/' className='text-white flex items-center'>
                <TextRoll className='text-xl md:text-2xl font-light tracking-wide font-montserrat hover:text-primary transition-colors duration-300'>
                  YAYA
                </TextRoll>
                <TextRoll className='text-xl md:text-2xl tracking-wide font-montserrat hover:text-primary transition-colors duration-300 font-medium'>
                  GO
                </TextRoll>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className='hidden lg:flex items-center gap-12 font-montserrat'>
              <motion.nav variants={itemVariants}>
                <ul className='flex items-center gap-8'>
                  <li>
                    <Link
                      className='text-white/90 hover:text-primary text-sm font-light tracking-wide transition-colors duration-300'
                      href='/rent'
                    >
                      Rent a car
                    </Link>
                  </li>
                  <li>
                    <Link
                      className='text-white/90 hover:text-primary text-sm font-light tracking-wide transition-colors duration-300'
                      href='/auto-services'
                    >
                      Auto Services
                    </Link>
                  </li>
                </ul>
              </motion.nav>

              <motion.div variants={itemVariants}>
                <AnimateIcon
                  className='flex items-center gap-2 cursor-pointer text-white/90 hover:text-white transition-colors duration-300'
                  animateOnHover
                >
                  <UserRound className='w-4 h-4' />
                  <Link href='/auth' className='text-sm font-light'>
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
                  className='cursor-pointer text-sm font-medium px-6 py-2 h-10 overflow-hidden [--liquid-button-color:var(--primary)] [--liquid-button-background-color:var(--primary)] text-white hover:text-white bg-primary/20 border border-primary/30 backdrop-blur-sm'
                >
                  <Link href='/auth/register?as=earner' className='text-sm font-light'>
                    Earn With Us
                  </Link>
                </LiquidButton>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className='lg:hidden text-white p-2'
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
            className='fixed inset-0 bg-black/30 backdrop-blur-xl z-40 lg:hidden'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleMobileMenu}
          >
            {/* Full Page Mobile Menu Panel */}
            <motion.div
              className='absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-2xl'
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className='flex flex-col h-full justify-center items-center px-8 font-montserrat'>
                {/* Navigation Links */}
                <motion.nav
                  className='text-center space-y-8 mb-16'
                  variants={mobileMenuVariants}
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                >
                  <motion.div variants={mobileItemVariants}>
                    <Link
                      className='block text-white text-3xl md:text-4xl font-light tracking-wide hover:text-primary transition-colors duration-500 py-4'
                      href='/rent'
                      onClick={toggleMobileMenu}
                    >
                      Rent a car
                    </Link>
                  </motion.div>
                  <motion.div variants={mobileItemVariants}>
                    <Link
                      className='block text-white text-3xl md:text-4xl font-light tracking-wide hover:text-primary transition-colors duration-500 py-4'
                      href='/auto-services'
                      onClick={toggleMobileMenu}
                    >
                      Auto Services
                    </Link>
                  </motion.div>
                </motion.nav>

                {/* Action Buttons */}
                <motion.div
                  className='space-y-6 w-full max-w-sm'
                  variants={mobileMenuVariants}
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                >
                  <motion.button
                    variants={mobileItemVariants}
                    className='w-full flex items-center justify-center gap-3 text-white/90 hover:text-white text-lg font-light py-4 px-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300'
                    onClick={toggleMobileMenu}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <UserRound className='w-5 h-5' />
                    <Link href='/auth' className='text-sm font-light'>
                      Sign in
                    </Link>
                  </motion.button>

                  <motion.div variants={mobileItemVariants}>
                    <LiquidButton
                      delay='0.2s'
                      fillHeight='2px'
                      hoverScale={1.02}
                      tapScale={0.98}
                      className='w-full cursor-pointer text-lg font-medium py-4 px-8 rounded-2xl overflow-hidden [--liquid-button-color:var(--primary)] [--liquid-button-background-color:var(--primary)] text-white hover:text-white bg-primary/80 backdrop-blur-sm border border-primary/30'
                      onClick={toggleMobileMenu}
                    >
                      <Link href='/auth/register?as=earner' className='text-sm font-light'>
                        Earn With Us
                      </Link>
                    </LiquidButton>
                  </motion.div>
                </motion.div>

                {/* Close hint */}
                <motion.p
                  className='absolute bottom-8 text-white/60 text-sm font-light'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Tap anywhere to close
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
