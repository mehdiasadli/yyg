'use client';

import { motion } from 'motion/react';
import { HeroHighlight, Highlight } from './ui/hero-highlight';
import { LiquidButton } from './animate-ui/primitives/buttons/liquid';
import Link from 'next/link';

export default function HomeRentalCompany() {
  return (
    <HeroHighlight className='font-montserrat flex flex-col items-center justify-center gap-10'>
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
        className='text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto '
      >
        Are you a car rental company? Join <Highlight className='text-black dark:text-white'>YAYAGO</Highlight>{' '}
        marketplace, get bookings, and{' '}
        <Highlight className='text-black dark:text-white'>keep 100% of your earnings.</Highlight>
      </motion.h1>

      <motion.button>
        <LiquidButton
          delay='0.2s'
          fillHeight='2px'
          hoverScale={1.05}
          tapScale={0.95}
          className='cursor-pointer text-sm font-medium px-18 py-6 overflow-hidden [--liquid-button-color:var(--primary)] [--liquid-button-background-color:var(--accent)] text-primary hover:text-primary-foreground'
        >
          <Link href='/auth/register?as=earner'>List Your Cars</Link>
        </LiquidButton>
      </motion.button>
    </HeroHighlight>
  );
}
