'use client';

import { motion } from 'framer-motion';
import { MapPin, TrendingUp, Users, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const locations = [
  {
    id: 'dubai-marina',
    name: 'Dubai Marina',
    city: 'Dubai',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000&auto=format&fit=crop',
    vehicleCount: 450,
    rating: 4.8,
    trending: true,
  },
  {
    id: 'downtown-dubai',
    name: 'Downtown Dubai',
    city: 'Dubai',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1000&auto=format&fit=crop',
    vehicleCount: 380,
    rating: 4.9,
    trending: true,
  },
  {
    id: 'business-bay',
    name: 'Business Bay',
    city: 'Dubai',
    image: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?q=80&w=1000&auto=format&fit=crop',
    vehicleCount: 320,
    rating: 4.7,
    trending: false,
  },
  {
    id: 'jumeirah',
    name: 'Jumeirah',
    city: 'Dubai',
    image: 'https://images.unsplash.com/photo-1613491485514-0d79579c2f41?q=80&w=1000&auto=format&fit=crop',
    vehicleCount: 290,
    rating: 4.8,
    trending: false,
  },
  {
    id: 'abu-dhabi',
    name: 'Abu Dhabi',
    city: 'Abu Dhabi',
    image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?q=80&w=1000&auto=format&fit=crop',
    vehicleCount: 410,
    rating: 4.8,
    trending: true,
  },
  {
    id: 'sharjah',
    name: 'Sharjah',
    city: 'Sharjah',
    image: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?q=80&w=1000&auto=format&fit=crop',
    vehicleCount: 180,
    rating: 4.6,
    trending: false,
  },
];

export default function HomeLocations() {
  return (
    <section className='font-montserrat relative py-24 px-6 bg-gradient-to-br from-white via-slate-50/50 to-gray-100/60 overflow-hidden'>
      {/* Background Pattern */}
      <div
        className='absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,_rgb(0,0,0)_1px,_transparent_0)] bg-[length:24px_24px]'
        style={{ backgroundPosition: '0 0, 12px 12px' }}
      />

      {/* Background Image */}
      <div className='absolute inset-0 opacity-[0.03]'>
        <Image
          src='https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2000&auto=format&fit=crop'
          alt='Dubai skyline'
          fill
          className='object-cover'
          sizes='100vw'
        />
      </div>

      <div className='relative max-w-7xl mx-auto'>
        {/* Header */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className='inline-block px-4 py-1.5 rounded-full bg-slate-900 mb-6'
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className='text-sm font-medium text-white tracking-wide'>Premium Locations</span>
          </motion.div>

          <h2 className='text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 mb-6 tracking-tight'>
            Explore Top Locations
          </h2>
          <p className='text-lg sm:text-xl text-slate-600 font-normal max-w-3xl mx-auto leading-relaxed'>
            Discover the best car rentals and auto services across UAE's most popular destinations
          </p>
        </motion.div>

        {/* Locations Grid */}
        <motion.div
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
        >
          {locations.map((location, index) => (
            <motion.div key={location.id} variants={itemVariants}>
              <Link href={`/locations/${location.city.toLowerCase()}/${location.id}`} className='group block h-full'>
                <div className='relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 h-full'>
                  {/* Image */}
                  <div className='relative h-56 sm:h-64 overflow-hidden'>
                    <Image
                      src={location.image}
                      alt={location.name}
                      fill
                      className='object-cover group-hover:scale-110 transition-transform duration-500'
                      sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    />
                    {/* Gradient Overlay */}
                    <div className='absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent' />

                    {/* Trending Badge */}
                    {location.trending && (
                      <div className='absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-primary/90 backdrop-blur-sm text-white text-xs font-semibold rounded-lg shadow-lg'>
                        <TrendingUp className='w-3.5 h-3.5' />
                        Trending
                      </div>
                    )}

                    {/* Location Info Overlay */}
                    <div className='absolute bottom-0 left-0 right-0 p-6'>
                      <h3 className='text-xl sm:text-2xl font-semibold text-white mb-1 group-hover:text-primary transition-colors duration-200'>
                        {location.name}
                      </h3>
                      <div className='flex items-center gap-2 text-white/90 text-sm mb-3'>
                        <MapPin className='w-4 h-4' />
                        <span className='font-normal'>{location.city}, UAE</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className='p-6 bg-slate-50'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2 text-slate-600'>
                        <Users className='w-4 h-4 text-slate-400' />
                        <span className='text-sm font-medium'>{location.vehicleCount} vehicles</span>
                      </div>
                      <div className='flex items-center gap-1.5 text-amber-600'>
                        <Star className='w-4 h-4 fill-amber-400' />
                        <span className='text-sm font-semibold'>{location.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className='absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-2xl sm:rounded-3xl transition-colors duration-300 pointer-events-none' />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          className='text-center mt-12'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className='text-slate-600 font-normal'>
            Looking for more locations?{' '}
            <Link
              href='/locations'
              className='text-primary hover:text-primary/80 font-semibold hover:underline transition-colors duration-200'
            >
              View all locations
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
