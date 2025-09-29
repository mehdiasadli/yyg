'use client';

import { Suspense, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, MapPin, Clock, Phone, MessageCircle, Award, Car, Wrench, Sparkles, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DualRangeSlider } from '@/components/ui/dual-range-slider';

// Auto services data - in a real app, this would come from a database
const autoServices = [
  {
    id: 'carcare-pro-detailing',
    slug: 'carcare-pro-detailing',
    name: 'CarCare Pro Detailing',
    location: 'Dubai Marina, Dubai',
    rating: 4.9,
    reviews_count: 234,
    specialties: ['ceramic coating', 'paint correction', 'interior detailing'],
    opening_hours: '09:00-18:00',
    price: { from: 180, to: 800, currency: 'AED' },
    phone: '+971-50-123-4567',
    whatsapp: '+971-50-123-4567',
    badges: ['premium partner', 'detailing expert'],
    category: 'detailing',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'elite-mechanic-workshop',
    slug: 'quick-service-auto-care',
    name: 'Elite Mechanic Workshop',
    location: 'Jumeirah, Dubai',
    rating: 4.8,
    reviews_count: 189,
    specialties: ['engine repair', 'brake service', 'transmission'],
    opening_hours: '08:00-20:00',
    price: { from: 120, to: 1200, currency: 'AED' },
    phone: '+971-50-987-6543',
    whatsapp: '+971-50-987-6543',
    badges: ['certified mechanic', 'warranty included'],
    category: 'repair',
    image:
      'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'premium-car-wash',
    slug: 'carcare-pro-detailing',
    name: 'Premium Car Wash',
    location: 'Downtown Dubai',
    rating: 4.7,
    reviews_count: 156,
    specialties: ['hand wash', 'waxing', 'tire shine'],
    opening_hours: '07:00-22:00',
    price: { from: 50, to: 200, currency: 'AED' },
    phone: '+971-50-555-1234',
    whatsapp: '+971-50-555-1234',
    badges: ['eco-friendly', 'quick service'],
    category: 'cleaning',
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'luxury-auto-spa',
    slug: 'carcare-pro-detailing',
    name: 'Luxury Auto Spa',
    location: 'Palm Jumeirah, Dubai',
    rating: 4.9,
    reviews_count: 98,
    specialties: ['paint protection', 'leather care', 'chrome detailing'],
    opening_hours: '10:00-19:00',
    price: { from: 300, to: 1500, currency: 'AED' },
    phone: '+971-50-777-8888',
    whatsapp: '+971-50-777-8888',
    badges: ['luxury service', 'premium materials'],
    category: 'detailing',
    image:
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'quick-fix-garage',
    slug: 'quick-service-auto-care',
    name: 'Quick Fix Garage',
    location: 'Deira, Dubai',
    rating: 4.6,
    reviews_count: 203,
    specialties: ['oil change', 'tire repair', 'battery service'],
    opening_hours: '06:00-24:00',
    price: { from: 80, to: 400, currency: 'AED' },
    phone: '+971-50-444-5555',
    whatsapp: '+971-50-444-5555',
    badges: ['24/7 service', 'fast turnaround'],
    category: 'maintenance',
    image:
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'performance-tuning',
    slug: 'quick-service-auto-care',
    name: 'Performance Tuning Center',
    location: 'Al Quoz, Dubai',
    rating: 4.8,
    reviews_count: 67,
    specialties: ['engine tuning', 'exhaust upgrade', 'suspension'],
    opening_hours: '09:00-18:00',
    price: { from: 500, to: 3000, currency: 'AED' },
    phone: '+971-50-666-7777',
    whatsapp: '+971-50-666-7777',
    badges: ['performance expert', 'racing certified'],
    category: 'modification',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const categories = ['all', 'detailing', 'repair', 'cleaning', 'maintenance', 'modification'];

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

const statsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.4,
    },
  },
};

const statItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

function AutoServicesContent() {
  return (
    <div className='max-w-7xl mx-auto px-6 lg:px-8'>
      {/* Hero Section */}
      <motion.header className='text-center py-24 mb-16' variants={headerVariants} initial='hidden' animate='visible'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-tight'>
          Professional Auto Services
        </h1>
        <p className='text-lg text-gray-500 max-w-3xl mx-auto mb-12 font-light leading-relaxed'>
          Curated collection of Dubai's finest automotive service providers
        </p>

        <motion.div
          className='flex flex-wrap justify-center gap-12 text-center'
          variants={statsVariants}
          initial='hidden'
          animate='visible'
        >
          <motion.div variants={statItemVariants} className='flex flex-col items-center'>
            <p className='text-3xl font-light text-gray-900 mb-2'>{autoServices.length}</p>
            <p className='text-sm text-gray-400 font-light tracking-wide'>Service Providers</p>
          </motion.div>
          <motion.div variants={statItemVariants} className='flex flex-col items-center'>
            <p className='text-3xl font-light text-gray-900 mb-2'>4.8</p>
            <p className='text-sm text-gray-400 font-light tracking-wide'>Average Rating</p>
          </motion.div>
          <motion.div variants={statItemVariants} className='flex flex-col items-center'>
            <p className='text-3xl font-light text-gray-900 mb-2'>24/7</p>
            <p className='text-sm text-gray-400 font-light tracking-wide'>Available Services</p>
          </motion.div>
        </motion.div>
      </motion.header>

      {/* Services List */}
      <AutoServicesList services={autoServices} />
    </div>
  );
}

function AutoServicesList({ services }: { services: typeof autoServices }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [50, 3000] as [number, number],
    rating: [4.0, 5.0] as [number, number],
    category: 'all',
  });

  // Filter services based on search and filters
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesPrice = service.price.from >= filters.priceRange[0] && service.price.to <= filters.priceRange[1];

      const matchesRating = service.rating >= filters.rating[0] && service.rating <= filters.rating[1];

      const matchesCategory = filters.category === 'all' || service.category === filters.category;

      return matchesSearch && matchesPrice && matchesRating && matchesCategory;
    });
  }, [services, searchQuery, filters]);

  const resetFilters = () => {
    setFilters({
      priceRange: [50, 3000],
      rating: [4.0, 5.0],
      category: 'all',
    });
    setSearchQuery('');
  };

  const hasActiveFilters = filters.category !== 'all' || searchQuery !== '';

  return (
    <div className='mb-8'>
      <div className='flex items-center justify-between mb-12'>
        <div>
          <h2 className='text-3xl font-light text-gray-900 mb-2'>Available Services</h2>
          <p className='text-gray-400 font-light'>Find the perfect service provider for your car</p>
        </div>
        <div className='text-sm text-gray-400 font-light'>{filteredServices.length} services available</div>
      </div>

      {/* Search and Filters Section */}
      <div className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm mb-16'>
        {/* Search and Filter Controls Row */}
        <div className='flex flex-col lg:flex-row gap-6 mb-8'>
          {/* Search Bar */}
          <div className='relative flex-1'>
            <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
            <Input
              type='text'
              placeholder='Search services, locations, or specialties...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='pl-12 pr-4 py-4 text-base bg-white border border-gray-100 rounded-lg focus:border-gray-300 focus:ring-0 transition-all duration-200 font-light'
            />
          </div>

          {/* Filter Controls */}
          <div className='flex items-center gap-3'>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant='outline'
                onClick={() => setShowFilters(!showFilters)}
                className='gap-2 text-gray-600 hover:text-gray-900 whitespace-nowrap border-gray-200 hover:border-gray-300 font-light transition-all duration-200'
              >
                <Search size={16} />
                Filters
                {hasActiveFilters && (
                  <Badge variant='secondary' className='ml-1 text-xs bg-gray-100 text-gray-600'>
                    Active
                  </Badge>
                )}
              </Button>
            </motion.div>
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant='ghost'
                  onClick={resetFilters}
                  className='gap-2 text-gray-400 hover:text-gray-600 text-sm whitespace-nowrap font-light transition-all duration-200'
                >
                  <X size={14} />
                  Clear All
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='border-t border-gray-50 pt-8 mt-6'
          >
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12'>
              {/* Price Range */}
              <div className='space-y-6'>
                <div>
                  <h4 className='text-sm font-light text-gray-600 mb-2'>Price Range (AED)</h4>
                  <div className='flex items-center gap-2 text-xs text-gray-400'>
                    <span>{filters.priceRange[0]} AED</span>
                    <span>-</span>
                    <span>{filters.priceRange[1]} AED</span>
                  </div>
                </div>
                <DualRangeSlider
                  min={50}
                  max={3000}
                  step={50}
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, priceRange: value as [number, number] }))}
                  className='w-full'
                />
              </div>

              {/* Rating Range */}
              <div className='space-y-6'>
                <div>
                  <h4 className='text-sm font-light text-gray-600 mb-2'>Rating Range</h4>
                  <div className='flex items-center gap-2 text-xs text-gray-400'>
                    <span>{filters.rating[0].toFixed(1)} ★</span>
                    <span>-</span>
                    <span>{filters.rating[1].toFixed(1)} ★</span>
                  </div>
                </div>
                <DualRangeSlider
                  min={4.0}
                  max={5.0}
                  step={0.1}
                  value={filters.rating}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, rating: value as [number, number] }))}
                  className='w-full'
                />
              </div>

              {/* Category Filter */}
              <div className='space-y-4'>
                <label className='text-sm font-light text-gray-600'>Category</label>
                <Select
                  value={filters.category}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className='w-full border-gray-100 focus:border-gray-300'>
                    <SelectValue placeholder='Select category' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Categories</SelectItem>
                    {categories.slice(1).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Services Grid */}
      <Suspense
        fallback={
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className='h-96 bg-gray-200 rounded-2xl animate-pulse' />
            ))}
          </div>
        }
      >
        {filteredServices.length > 0 ? (
          <motion.div
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'
            initial='hidden'
            animate='visible'
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.2,
                },
              },
            }}
          >
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </motion.div>
        ) : (
          <div className='text-center py-16'>
            <div className='w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6'>
              <Search className='w-12 h-12 text-gray-300' />
            </div>
            <h3 className='text-xl font-light text-gray-900 mb-2'>No services found</h3>
            <p className='text-gray-400 font-light mb-6'>
              Try adjusting your search criteria or filters to find more services.
            </p>
            <Button
              variant='outline'
              onClick={resetFilters}
              className='gap-2 border-gray-200 hover:border-gray-300 font-light'
            >
              <X size={16} />
              Clear All Filters
            </Button>
          </div>
        )}
      </Suspense>
    </div>
  );
}

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

function ServiceCard({ service }: { service: (typeof autoServices)[0] }) {
  return (
    <Link href={`/auto-services/${service.slug}`} className='block'>
      <motion.div
        className='group relative bg-white rounded-lg overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-sm cursor-pointer'
        variants={cardVariants}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3 }}
      >
      <div className='relative h-48 overflow-hidden'>
        <Image
          src={service.image}
          alt={service.name}
          fill
          className='object-cover group-hover:scale-105 transition-transform duration-500'
          sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
        />
        <div className='absolute top-4 left-4 flex flex-wrap gap-2'>
          {service.badges.map((badge) => (
            <Badge key={badge} className='bg-white/90 text-gray-700 border-0 shadow-sm text-xs font-light'>
              {badge}
            </Badge>
          ))}
        </div>
        <div className='absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-light'>
          {service.category}
        </div>
      </div>

      <div className='p-8'>
        <div className='mb-6'>
          <h3 className='text-xl font-light text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-200'>
            {service.name}
          </h3>
          <div className='flex items-center gap-4 text-sm text-gray-400 mb-4'>
            <span className='flex items-center gap-1'>
              <MapPin className='w-4 h-4' />
              {service.location}
            </span>
            <span className='flex items-center gap-1'>
              <Clock className='w-4 h-4' />
              {service.opening_hours}
            </span>
          </div>
          <div className='flex items-center gap-2 mb-4'>
            <div className='flex items-center gap-1'>
              <Star className='w-4 h-4 text-gray-400 fill-current' />
              <span className='text-sm font-light text-gray-900'>{service.rating}</span>
            </div>
            <span className='text-sm text-gray-400'>({service.reviews_count} reviews)</span>
          </div>
          <div className='flex flex-wrap gap-2 mb-6'>
            {service.specialties.map((specialty) => (
              <Badge key={specialty} variant='secondary' className='text-xs bg-gray-50 text-gray-600 border-0'>
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        <div className='mb-6'>
          <div className='flex items-center justify-between mb-2'>
            <span className='text-sm text-gray-400 font-light'>Price Range</span>
            <span className='text-lg font-light text-gray-900'>
              {service.price.from} - {service.price.to} {service.price.currency}
            </span>
          </div>
        </div>

        <div className='pt-6 border-t border-gray-50'>
          <div className='flex items-center justify-between'>
            <p className='text-xs text-gray-400 font-light'>Contact Service Provider</p>
            <div className='flex items-center gap-3'>
              <a
                href={`tel:${service.phone}`}
                className='p-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-200'
                onClick={(e) => e.stopPropagation()}
              >
                <Phone size={14} />
              </a>
              <a
                href={`https://wa.me/${service.whatsapp.replace(/[^0-9]/g, '')}`}
                target='_blank'
                rel='noopener noreferrer'
                className='p-2 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-200'
                onClick={(e) => e.stopPropagation()}
              >
                <MessageCircle size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
    </Link>
  );
}

export default function AutoServicesPage() {
  return (
    <main className='min-h-screen bg-white font-montserrat py-20'>
      <AutoServicesContent />
    </main>
  );
}
