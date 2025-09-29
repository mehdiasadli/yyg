'use client';

import { motion } from 'framer-motion';
import { GradientText } from '../animate-ui/primitives/texts/gradient';
import HeroBackground from './background';
import HeroSearchSection from './search-section';

const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
} as const;

export default function Hero() {
  return (
    <section className='min-h-screen relative overflow-hidden'>
      <HeroBackground />

      <motion.div
        className='relative z-10 max-w-4xl mx-auto flex flex-col gap-8 md:gap-12 items-center justify-center h-screen px-4 md:px-6'
        variants={heroVariants}
        initial='hidden'
        animate='visible'
      >
        <motion.div variants={itemVariants} className='text-center'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white mb-6 font-montserrat tracking-tight leading-tight'>
            Connect. Share.{' '}
            <span className='block md:inline'>
              <GradientText text='Drive Forward.' />
            </span>
          </h1>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className='bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 md:px-8 md:py-6 shadow-xl border border-white/20 max-w-3xl'
        >
          <p className='text-white text-center font-montserrat text-sm md:text-base lg:text-lg font-light leading-relaxed'>
            Dubai's complete automotive ecosystem. Car rentals + garage services with 0% commission. Connect with car
            owners, renters, and trusted auto professionals.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className='w-full max-w-4xl'>
          <HeroSearchSection />
        </motion.div>
      </motion.div>
    </section>
  );
}
