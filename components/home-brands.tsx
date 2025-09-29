'use client';

import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { LiquidButton } from './animate-ui/primitives/buttons/liquid';

const brands = [
  {
    name: 'Lamborghini',
    image: '/car-logos/lambo.png',
    link: '/cars/lamborghini',
    description: 'Italian Excellence',
    accent: 'from-orange-500 to-red-600',
    glow: 'shadow-orange-200/50',
  },
  {
    name: 'Ferrari',
    image: '/car-logos/ferrari.png',
    link: '/cars/ferrari',
    description: 'Racing Heritage',
    accent: 'from-red-500 to-red-700',
    glow: 'shadow-red-200/50',
  },
  {
    name: 'Bentley',
    image: '/car-logos/bentley.png',
    link: '/cars/bentley',
    description: 'British Luxury',
    accent: 'from-amber-600 to-amber-800',
    glow: 'shadow-amber-200/50',
  },
  {
    name: 'Mercedes',
    image: '/car-logos/mercedes.png',
    link: '/cars/mercedes-benz',
    description: 'German Engineering',
    accent: 'from-slate-600 to-slate-800',
    glow: 'shadow-slate-200/50',
  },
  {
    name: 'Pagani',
    image: '/car-logos/pagani.png',
    link: '/cars/pagani',
    description: 'Hypercar Artistry',
    accent: 'from-purple-500 to-indigo-600',
    glow: 'shadow-purple-200/50',
  },
  {
    name: 'Rolls-Royce',
    image: '/car-logos/rolls-royce.png',
    link: '/cars/rolls-royce',
    description: 'Ultimate Luxury',
    accent: 'from-gray-600 to-gray-800',
    glow: 'shadow-gray-200/50',
  },
  {
    name: 'Audi',
    image: '/car-logos/audi.png',
    link: '/cars/audi',
    description: 'Progressive Technology',
    accent: 'from-blue-600 to-blue-800',
    glow: 'shadow-blue-200/50',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.85, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.7,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
    },
  },
};

export default function HomeBrands() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className='font-montserrat relative py-32 px-6 overflow-hidden'>
      {/* Dark sophisticated background with luxury car imagery */}
      <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black' />

      {/* Luxury car background image */}
      <div className='absolute inset-0 opacity-[0.03]'>
        <img
          src='https://images.unsplash.com/photo-1563720223185-11003d516935?w=1920&h=1080&fit=crop&crop=center'
          alt='Luxury cars background'
          className='w-full h-full object-cover'
        />
      </div>

      {/* Elegant overlay gradients for dark theme */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/15' />
      <div className='absolute inset-0 bg-gradient-to-tr from-transparent via-amber-900/10 to-transparent' />

      {/* Subtle luxury car silhouettes */}
      <div className='absolute top-20 right-20 w-48 h-32 opacity-[0.02]'>
        <img
          src='https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=200&fit=crop'
          alt='Car silhouette'
          className='w-full h-full object-cover rounded-lg'
        />
      </div>
      <div className='absolute bottom-20 left-20 w-40 h-24 opacity-[0.02]'>
        <img
          src='https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=200&fit=crop'
          alt='Car silhouette'
          className='w-full h-full object-cover rounded-lg'
        />
      </div>

      <div className='max-w-7xl mx-auto relative'>
        <motion.header
          className='text-center mb-20'
          variants={headerVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className='relative inline-block mb-8'>
            <h2 className='text-5xl md:text-6xl lg:text-7xl font-light mb-6 tracking-tight bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent'>
              Premium Brands
            </h2>
          </div>

          <p className='text-xl text-gray-300 max-w-2xl mx-auto mb-16 font-light leading-relaxed'>
            Discover the world's most prestigious automotive manufacturers, each representing decades of innovation and
            excellence
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <LiquidButton
              delay='0.2s'
              fillHeight='3px'
              hoverScale={1.08}
              tapScale={0.92}
              asChild
              className='cursor-pointer text-sm font-semibold px-8 py-4 h-14 overflow-hidden [--liquid-button-color:var(--primary)] [--liquid-button-background-color:var(--accent)] text-primary hover:text-primary-foreground shadow-lg hover:shadow-xl transition-shadow duration-300'
            >
              <motion.button whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.92 }} className='relative'>
                <Link href='/brands' className='inline-flex items-center gap-3'>
                  <span>Explore All Brands</span>
                  <motion.div
                    animate={{ x: 0 }}
                    whileHover={{ x: 6 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <ChevronRight size={20} />
                  </motion.div>
                </Link>
              </motion.button>
            </LiquidButton>
          </motion.div>
        </motion.header>

        <motion.div
          className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6 sm:gap-8'
          variants={containerVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        >
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              variants={itemVariants}
              whileHover={{
                scale: 1.08,
                y: -12,
                rotateY: 5,
                transition: {
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                  duration: 0.4,
                },
              }}
              whileTap={{ scale: 0.95 }}
              className='perspective-1000'
            >
              <Link href={brand.link} className='group block h-full'>
                <div
                  className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-gray-700/60 hover:border-gray-600/80 transition-all duration-500 hover:shadow-2xl hover:${brand.glow} h-full flex flex-col group-hover:bg-white/15 overflow-hidden transform-gpu`}
                >
                  {/* Enhanced gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${brand.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}
                  />

                  {/* Animated border gradient */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${brand.accent} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm -z-10`}
                  />

                  {/* Subtle inner glow */}
                  <div className='absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-gray-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl' />

                  {/* Logo Container with enhanced effects */}
                  <div className='relative mb-8 flex items-center justify-center h-20 flex-shrink-0'>
                    <div className='relative transform group-hover:scale-110 transition-all duration-500 group-hover:rotate-3'>
                      {/* White glow effect for better visibility */}
                      <div className='absolute inset-0 bg-white/20 rounded-full blur-md opacity-60' />
                      <div className='absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                      <Image
                        src={brand.image}
                        alt={`${brand.name} logo`}
                        width={72}
                        height={72}
                        className='relative object-contain opacity-90 group-hover:opacity-100 transition-all duration-500 filter group-hover:brightness-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]'
                        priority={index < 4}
                        loading={index < 4 ? 'eager' : 'lazy'}
                      />
                    </div>
                  </div>

                  {/* Brand Info with enhanced typography */}
                  <div className='relative text-center flex-grow flex flex-col justify-center'>
                    <h3 className='font-semibold text-white mb-3 text-base tracking-wide group-hover:text-gray-200 transition-colors duration-300 group-hover:scale-105 transform-gpu'>
                      {brand.name}
                    </h3>
                    <p className='text-sm text-gray-400 font-light group-hover:text-gray-300 transition-colors duration-300 leading-relaxed'>
                      {brand.description}
                    </p>
                  </div>

                  {/* Subtle corner accent */}
                  <div
                    className={`absolute top-4 right-4 w-2 h-2 bg-gradient-to-br ${brand.accent} rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
