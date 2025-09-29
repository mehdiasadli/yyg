'use client';

import { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, Users, Globe, Calendar, TrendingUp, Award, Filter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// Brand data - in a real app, this would come from a database
const brands = [
  {
    id: 'lamborghini',
    name: 'Lamborghini',
    logo: '/car-logos/lambo.png',
    description: 'Italian Excellence',
    category: 'Luxury',
    vehicleCount: 24,
    rating: 4.9,
    established: 1963,
    country: 'Italy',
    featured: true,
  },
  {
    id: 'ferrari',
    name: 'Ferrari',
    logo: '/car-logos/ferrari.png',
    description: 'Racing Heritage',
    category: 'Sports',
    vehicleCount: 18,
    rating: 4.8,
    established: 1939,
    country: 'Italy',
    featured: true,
  },
  {
    id: 'bentley',
    name: 'Bentley',
    logo: '/car-logos/bentley.png',
    description: 'British Luxury',
    category: 'Luxury',
    vehicleCount: 32,
    rating: 4.7,
    established: 1919,
    country: 'United Kingdom',
    featured: true,
  },
  {
    id: 'mercedes',
    name: 'Mercedes-Benz',
    logo: '/car-logos/mercedes.png',
    description: 'German Engineering',
    category: 'Premium',
    vehicleCount: 156,
    rating: 4.6,
    established: 1926,
    country: 'Germany',
    featured: false,
  },
  {
    id: 'pagani',
    name: 'Pagani',
    logo: '/car-logos/pagani.png',
    description: 'Hypercar Artistry',
    category: 'Hypercar',
    vehicleCount: 8,
    rating: 5.0,
    established: 1992,
    country: 'Italy',
    featured: true,
  },
  {
    id: 'rolls-royce',
    name: 'Rolls-Royce',
    logo: '/car-logos/rolls-royce.png',
    description: 'Ultimate Luxury',
    category: 'Ultra-Luxury',
    vehicleCount: 28,
    rating: 4.9,
    established: 1906,
    country: 'United Kingdom',
    featured: true,
  },
  {
    id: 'audi',
    name: 'Audi',
    logo: '/car-logos/audi.png',
    description: 'Progressive Technology',
    category: 'Premium',
    vehicleCount: 134,
    rating: 4.5,
    established: 1909,
    country: 'Germany',
    featured: false,
  },
  {
    id: 'bmw',
    name: 'BMW',
    logo: '/car-logos/bmw.png',
    description: 'Ultimate Driving Machine',
    category: 'Premium',
    vehicleCount: 142,
    rating: 4.6,
    established: 1916,
    country: 'Germany',
    featured: false,
  },
  {
    id: 'porsche',
    name: 'Porsche',
    logo: '/car-logos/porsche.png',
    description: 'Sports Car Excellence',
    category: 'Sports',
    vehicleCount: 89,
    rating: 4.8,
    established: 1931,
    country: 'Germany',
    featured: false,
  },
  {
    id: 'bugatti',
    name: 'Bugatti',
    logo: '/car-logos/bugatti.png',
    description: 'French Passion',
    category: 'Luxury',
    vehicleCount: 41,
    rating: 4.7,
    established: 1914,
    country: 'France',
    featured: false,
  },
  {
    id: 'tesla',
    name: 'Tesla',
    logo: '/car-logos/tesla.png',
    description: 'Electric Innovation',
    category: 'Electric',
    vehicleCount: 78,
    rating: 4.4,
    established: 2003,
    country: 'United States',
    featured: false,
  },
  {
    id: 'lexus',
    name: 'Lexus',
    logo: '/car-logos/lexus.png',
    description: 'Japanese Luxury',
    category: 'Luxury',
    vehicleCount: 67,
    rating: 4.5,
    established: 1989,
    country: 'Japan',
    featured: false,
  },
];

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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

function BrandCard({ brand, index }: { brand: (typeof brands)[0]; index: number }) {
  return (
    <Link href={`/brands/${brand.id}`} className='group block h-full'>
      <motion.div
        className='relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 h-full flex flex-col'
        variants={cardVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ y: -8 }}
      >
        {/* Featured Badge */}
        {brand.featured && (
          <div className='absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-semibold rounded-lg shadow-md'>
            Featured
          </div>
        )}

        {/* Logo */}
        <div className='flex items-center justify-center h-24 sm:h-28 mb-6 flex-shrink-0'>
          <div className='relative transform group-hover:scale-110 transition-transform duration-300'>
            <div className='absolute inset-0 bg-white/20 rounded-full blur-md opacity-60' />
            <Image
              src={brand.logo}
              alt={brand.name}
              width={100}
              height={100}
              className='relative object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-200 filter group-hover:brightness-110 drop-shadow-[0_0_8px_rgba(0,0,0,0.1)]'
            />
          </div>
        </div>

        {/* Brand Info */}
        <div className='flex-grow flex flex-col'>
          <div className='text-center mb-6'>
            <h3 className='text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-200'>
              {brand.name}
            </h3>
            <p className='text-sm text-slate-500 font-normal'>{brand.description}</p>
          </div>

          {/* Stats */}
          <div className='mt-auto space-y-4'>
            <div className='flex items-center justify-between text-sm bg-slate-50 rounded-xl p-3'>
              <div className='flex items-center gap-2 text-slate-600'>
                <Users className='w-4 h-4 text-slate-400' />
                <span className='font-medium'>{brand.vehicleCount} vehicles</span>
              </div>
              <div className='flex items-center gap-1.5 text-amber-600'>
                <Star className='w-4 h-4 fill-amber-400' />
                <span className='font-semibold'>{brand.rating}</span>
              </div>
            </div>

            <div className='flex items-center justify-between text-xs text-slate-500'>
              <div className='flex items-center gap-1.5'>
                <Globe className='w-3.5 h-3.5 text-slate-400' />
                <span className='font-normal'>{brand.country}</span>
              </div>
              <div className='flex items-center gap-1.5'>
                <Calendar className='w-3.5 h-3.5 text-slate-400' />
                <span className='font-normal'>Est. {brand.established}</span>
              </div>
            </div>

            <Badge className='w-full justify-center bg-slate-100 text-slate-700 border-0 font-medium hover:bg-slate-200 transition-colors duration-200'>
              {brand.category}
            </Badge>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function BrandsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const totalVehicles = brands.reduce((sum, brand) => sum + brand.vehicleCount, 0);
  const featuredBrands = brands.filter((brand) => brand.featured);

  const filteredBrands = brands.filter(
    (brand) =>
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className='min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 font-montserrat py-20 relative overflow-hidden'>
      {/* Subtle background elements */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(148,163,184,0.04)_0%,_transparent_50%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(100,116,139,0.03)_0%,_transparent_50%)]' />

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header Section */}
        <motion.header
          className='text-center mb-12 sm:mb-16'
          variants={headerVariants}
          initial='hidden'
          animate='visible'
        >
          <motion.div
            className='inline-block px-4 py-1.5 rounded-full bg-slate-900 mb-6'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className='text-sm font-medium text-white tracking-wide'>Premium Brands</span>
          </motion.div>

          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-6 tracking-tight leading-tight px-4'>
            Explore Iconic Car Brands
          </h1>
          <p className='text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-12 font-normal leading-relaxed px-4'>
            Discover our curated collection of the world's most prestigious automotive manufacturers. From Italian
            supercars to German engineering excellence.
          </p>

          {/* Quick Stats */}
          <div className='grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto mb-12'>
            {[
              { value: brands.length, label: 'Premium Brands', icon: Award },
              { value: `${totalVehicles}+`, label: 'Available Vehicles', icon: TrendingUp },
              { value: featuredBrands.length, label: 'Featured Collections', icon: Star },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className='bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <Icon className='w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-2 sm:mb-3' />
                  <div className='text-xl sm:text-2xl font-bold text-slate-900 mb-1'>{stat.value}</div>
                  <div className='text-xs sm:text-sm text-slate-500 font-medium'>{stat.label}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Search Bar */}
          <motion.div
            className='max-w-2xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className='relative'>
              <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400' />
              <Input
                type='text'
                placeholder='Search for brands by name, category, or origin...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-12 pr-4 py-6 text-base bg-white border-slate-200 rounded-2xl shadow-lg focus:border-slate-400 focus:ring-2 focus:ring-slate-200 transition-all duration-200 font-normal placeholder:text-slate-400'
              />
            </div>
          </motion.div>
        </motion.header>

        {/* Brands Grid */}
        <Suspense
          fallback={
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8'>
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className='h-96 bg-gradient-to-br from-gray-200 to-gray-100 rounded-2xl sm:rounded-3xl animate-pulse'
                />
              ))}
            </div>
          }
        >
          {filteredBrands.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20'>
              {filteredBrands.map((brand, index) => (
                <BrandCard key={brand.id} brand={brand} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              className='text-center py-16'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className='w-24 h-24 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-blue-100/50'>
                <Search className='w-12 h-12 text-blue-400' />
              </div>
              <h3 className='text-xl sm:text-2xl font-medium text-gray-900 mb-3'>No brands found</h3>
              <p className='text-gray-500 font-light mb-8 max-w-md mx-auto'>
                Try adjusting your search to find the brands you're looking for
              </p>
            </motion.div>
          )}
        </Suspense>

        {/* Information Section */}
        <motion.section
          className='bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className='text-center mb-10'>
            <h2 className='text-2xl sm:text-3xl font-semibold text-slate-900 mb-4'>Why Choose Premium Brands?</h2>
            <p className='text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto'>
              Our carefully curated selection of premium automotive brands ensures you have access to the finest
              vehicles with exceptional quality, performance, and luxury features.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8 mb-10'>
            {[
              {
                title: 'Verified Quality',
                description:
                  'Every vehicle undergoes rigorous inspection and meets our premium standards for excellence and reliability.',
                icon: Award,
              },
              {
                title: 'Trusted Owners',
                description:
                  'Connect with verified owners who maintain their vehicles to the highest standards of care and service.',
                icon: Users,
              },
              {
                title: 'Global Selection',
                description:
                  'Access to international brands and models from around the world, bringing luxury to your doorstep.',
                icon: Globe,
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className='text-center'>
                  <div className='w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <Icon className='w-7 h-7 text-blue-600' />
                  </div>
                  <h3 className='text-lg font-semibold text-slate-900 mb-3'>{feature.title}</h3>
                  <p className='text-slate-600 font-normal leading-relaxed'>{feature.description}</p>
                </div>
              );
            })}
          </div>

          <div className='text-center pt-8 border-t border-slate-200'>
            <p className='text-slate-600 font-normal'>
              Can't find your preferred brand?{' '}
              <Link href='/contact' className='text-blue-600 hover:text-blue-700 font-semibold hover:underline'>
                Contact us
              </Link>{' '}
              and we'll help you find the perfect vehicle.
            </p>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
