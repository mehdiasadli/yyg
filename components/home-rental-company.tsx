'use client';

import { motion } from 'motion/react';
import { HeroHighlight, Highlight } from './ui/hero-highlight';
import { LiquidButton } from './animate-ui/primitives/buttons/liquid';
import Link from 'next/link';

export default function HomeRentalCompany() {
  return (
    <section className='font-montserrat relative py-32 px-6 overflow-hidden'>
      {/* Dark sophisticated background with business theme */}
      <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black' />

      {/* Business/partnership background */}
      <div className='absolute inset-0 opacity-[0.02]'>
        <img
          src='https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1920&h=1080&fit=crop&crop=center'
          alt='Business partnership background'
          className='w-full h-full object-cover'
        />
      </div>

      {/* Elegant overlay gradients for dark theme */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/15' />
      <div className='absolute inset-0 bg-gradient-to-tr from-transparent via-amber-900/10 to-transparent' />

      {/* Sophisticated floating elements */}
      <div
        className='absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl animate-pulse'
        style={{ animationDuration: '8s' }}
      />
      <div
        className='absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-amber-100/15 to-orange-100/15 rounded-full blur-3xl animate-pulse'
        style={{ animationDuration: '10s', animationDelay: '2s' }}
      />

      <div className='max-w-7xl mx-auto relative flex flex-col items-center justify-center gap-10 min-h-[40rem]'>
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className='text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto '
        >
          Are you a car rental company? Join <Highlight className='text-white'>YAYAGO</Highlight> marketplace, get
          bookings, and <Highlight className='text-white'>keep 100% of your earnings.</Highlight>
        </motion.h1>

        <LiquidButton
          delay='0.2s'
          fillHeight='2px'
          hoverScale={1.05}
          tapScale={0.95}
          asChild
          className='cursor-pointer text-sm font-medium px-18 py-6 overflow-hidden [--liquid-button-color:var(--primary)] [--liquid-button-background-color:var(--accent)] text-primary hover:text-primary-foreground'
        >
          <motion.button>
            <Link href='/auth/register?as=earner'>List Your Cars</Link>
          </motion.button>
        </LiquidButton>
      </div>
    </section>
  );
}
