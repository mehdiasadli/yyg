'use client';

import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LiquidButton } from './animate-ui/primitives/buttons/liquid';

const brands = [
  {
    name: 'Lamborghini',
    image: '/car-logos/lambo.png',
    link: '/cars/lamborghini',
    description: 'Italian Excellence',
  },
  {
    name: 'Ferrari',
    image: '/car-logos/ferrari.png',
    link: '/cars/ferrari',
    description: 'Racing Heritage',
  },
  {
    name: 'Bentley',
    image: '/car-logos/bentley.png',
    link: '/cars/bentley',
    description: 'British Luxury',
  },
  {
    name: 'Mercedes',
    image: '/car-logos/mercedes.png',
    link: '/cars/mercedes-benz',
    description: 'German Engineering',
  },
  {
    name: 'Pagani',
    image: '/car-logos/pagani.png',
    link: '/cars/pagani',
    description: 'Hypercar Artistry',
  },
  {
    name: 'Rolls-Royce',
    image: '/car-logos/rolls-royce.png',
    link: '/cars/rolls-royce',
    description: 'Ultimate Luxury',
  },
  {
    name: 'Audi',
    image: '/car-logos/audi.png',
    link: '/cars/audi',
    description: 'Progressive Technology',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
    },
  },
};

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

export default function HomeBrands() {
  return (
    <section className='font-montserrat relative py-24 px-6 bg-white'>
      <div className='max-w-7xl mx-auto'>
        <motion.header
          className='text-center mb-16'
          variants={headerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-tight'>
            Premium Brands
          </h2>

          <p className='text-lg text-gray-500 max-w-xl mx-auto mb-12 font-light leading-relaxed'>
            Curated collection of the world's finest automotive manufacturers
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <LiquidButton
              delay='0.2s'
              fillHeight='2px'
              hoverScale={1.05}
              tapScale={0.95}
              className='cursor-pointer text-sm font-medium px-6 py-3 h-12 overflow-hidden [--liquid-button-color:var(--primary)] [--liquid-button-background-color:var(--accent)] text-primary hover:text-primary-foreground'
            >
              <Link href='/brands' className='inline-flex items-center gap-2'>
                <span>Show All Brands</span>
                <ChevronRight size={18} />
              </Link>
            </LiquidButton>
          </motion.div>
        </motion.header>

        <motion.div
          className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-50px' }}
        >
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -8,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={brand.link} className='group block h-full'>
                <div className='relative bg-white rounded-lg p-8 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-sm h-full flex flex-col group-hover:bg-gray-50/30'>
                  {/* Logo Container */}
                  <div className='relative mb-6 flex items-center justify-center h-16 flex-shrink-0'>
                    <div className='relative transform group-hover:scale-105 transition-transform duration-200'>
                      <Image
                        src={brand.image}
                        alt={brand.name}
                        width={64}
                        height={64}
                        className='object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-200'
                        priority={index < 4}
                      />
                    </div>
                  </div>

                  {/* Brand Info */}
                  <div className='text-center flex-grow flex flex-col justify-center'>
                    <h3 className='font-medium text-gray-900 mb-2 text-sm tracking-wide'>{brand.name}</h3>
                    <p className='text-xs text-gray-400 font-light'>{brand.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
