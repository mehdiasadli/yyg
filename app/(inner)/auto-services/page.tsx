'use client';

import { Suspense, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, MapPin, Clock, Phone, MessageCircle, Filter, X, Wrench } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      {/* Hero Section */}
      <motion.header
        className='text-center py-16 sm:py-20 md:py-24 mb-12 sm:mb-16'
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
          <span className='text-sm font-medium text-white tracking-wide'>Professional Services</span>
        </motion.div>

        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-6 tracking-tight leading-tight px-4'>
          Auto Services & Care
        </h1>
        <p className='text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-12 font-normal leading-relaxed px-4'>
          Curated collection of Dubai's finest automotive service providers
        </p>

        <motion.div
          className='flex flex-wrap justify-center gap-8 sm:gap-12 text-center'
          variants={statsVariants}
          initial='hidden'
          animate='visible'
        >
          <motion.div variants={statItemVariants} className='flex flex-col items-center'>
            <div className='w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-3'>
              <Wrench className='w-8 h-8 text-blue-600' />
            </div>
            <p className='text-2xl sm:text-3xl font-semibold text-slate-900 mb-1'>{autoServices.length}</p>
            <p className='text-sm text-slate-500 font-normal'>Service Providers</p>
          </motion.div>
          <motion.div variants={statItemVariants} className='flex flex-col items-center'>
            <div className='w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mb-3'>
              <Star className='w-8 h-8 text-amber-500 fill-amber-500' />
            </div>
            <p className='text-2xl sm:text-3xl font-semibold text-slate-900 mb-1'>4.8</p>
            <p className='text-sm text-slate-500 font-normal'>Average Rating</p>
          </motion.div>
          <motion.div variants={statItemVariants} className='flex flex-col items-center'>
            <div className='w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mb-3'>
              <Clock className='w-8 h-8 text-green-600' />
            </div>
            <p className='text-2xl sm:text-3xl font-semibold text-slate-900 mb-1'>24/7</p>
            <p className='text-sm text-slate-500 font-normal'>Available Services</p>
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
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4 px-4 sm:px-0'>
        <div>
          <h2 className='text-2xl sm:text-3xl font-light text-gray-900 mb-2'>Available Services</h2>
          <p className='text-sm sm:text-base text-gray-500 font-light'>
            Find the perfect service provider for your car
          </p>
        </div>
        <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200'>
          <div className='w-2 h-2 rounded-full bg-slate-900' />
          <span className='text-sm text-slate-700 font-medium'>{filteredServices.length} services available</span>
        </div>
      </div>

      {/* Search and Filters Section */}
      <div className='bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg shadow-gray-200/50 mb-12 sm:mb-16 mx-4 sm:mx-0'>
        {/* Search and Filter Controls Row */}
        <div className='flex flex-col lg:flex-row gap-6 mb-8'>
          {/* Search Bar */}
          <div className='relative flex-1'>
            <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400' />
            <Input
              type='text'
              placeholder='Search services, locations, or specialties...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='pl-12 pr-4 py-4 sm:py-5 text-sm sm:text-base bg-white border border-slate-200 rounded-xl focus:border-slate-400 focus:ring-1 focus:ring-slate-200 transition-all duration-200 font-normal placeholder:text-slate-400'
            />
          </div>

          {/* Filter Controls */}
          <div className='flex items-center gap-3 flex-wrap sm:flex-nowrap'>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='flex-1 sm:flex-none'>
              <Button
                variant='outline'
                onClick={() => setShowFilters(!showFilters)}
                className='gap-2 w-full sm:w-auto text-slate-700 hover:text-slate-900 whitespace-nowrap border border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-normal transition-all duration-200 rounded-xl px-6 py-5'
              >
                <Filter size={16} />
                Filters
                {hasActiveFilters && (
                  <Badge variant='secondary' className='ml-1 text-xs bg-slate-900 text-white border-0'>
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
                  className='gap-2 text-gray-500 hover:text-gray-700 hover:bg-red-50 text-sm whitespace-nowrap font-light transition-all duration-200 rounded-xl'
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
            className='border-t border-gray-200/50 pt-8 mt-6'
          >
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12'>
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
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-0'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className='h-96 bg-gradient-to-br from-gray-200 to-gray-100 rounded-2xl sm:rounded-3xl animate-pulse'
              />
            ))}
          </div>
        }
      >
        {filteredServices.length > 0 ? (
          <motion.div
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-0'
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
          <div className='text-center py-16 px-4'>
            <div className='w-24 h-24 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-blue-100/50'>
              <Search className='w-12 h-12 text-blue-400' />
            </div>
            <h3 className='text-xl sm:text-2xl font-medium text-gray-900 mb-3'>No services found</h3>
            <p className='text-gray-500 font-light mb-8 max-w-md mx-auto'>
              We couldn't find any services matching your criteria. Try adjusting your search or filters.
            </p>
            <Button
              variant='outline'
              onClick={resetFilters}
              className='gap-2 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 font-light rounded-xl px-6 py-5 transition-all duration-200'
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
  const router = useRouter();

  const categoryColors: Record<string, { badge: string; bg: string }> = {
    detailing: { badge: 'bg-purple-100 text-purple-700 border-purple-200', bg: 'from-purple-500/10 to-violet-500/10' },
    repair: { badge: 'bg-blue-100 text-blue-700 border-blue-200', bg: 'from-blue-500/10 to-cyan-500/10' },
    cleaning: { badge: 'bg-green-100 text-green-700 border-green-200', bg: 'from-green-500/10 to-emerald-500/10' },
    maintenance: { badge: 'bg-orange-100 text-orange-700 border-orange-200', bg: 'from-orange-500/10 to-amber-500/10' },
    modification: { badge: 'bg-red-100 text-red-700 border-red-200', bg: 'from-red-500/10 to-rose-500/10' },
  };

  const colors = categoryColors[service.category] || categoryColors.detailing;

  const handleCardClick = () => {
    router.push(`/auto-services/${service.slug}`);
  };

  return (
    <motion.div
      onClick={handleCardClick}
      className='group relative bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 cursor-pointer'
      variants={cardVariants}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
    >
      {/* Subtle gradient overlay on hover */}
      <div className='absolute inset-0 bg-gradient-to-br from-slate-50/0 to-slate-50/0 group-hover:from-slate-50/50 group-hover:to-slate-100/30 transition-all duration-500 pointer-events-none z-10 rounded-2xl sm:rounded-3xl' />

      <div className='relative h-56 sm:h-64 overflow-hidden'>
        <Image
          src={service.image}
          alt={service.name}
          fill
          className='object-cover group-hover:scale-110 transition-transform duration-700'
          sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
        />
        {/* Image overlay gradient */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent' />

        <div className='absolute top-4 left-4 flex flex-wrap gap-2 z-20'>
          {service.badges.slice(0, 2).map((badge) => (
            <Badge
              key={badge}
              className='bg-white/95 text-slate-700 border-0 shadow-md text-xs font-semibold px-3 py-1.5 capitalize'
            >
              {badge}
            </Badge>
          ))}
        </div>
        <div
          className={`absolute top-4 right-4 ${colors.badge} backdrop-blur-md rounded-lg px-3 py-1.5 text-xs font-semibold shadow-lg z-20 border capitalize`}
        >
          {service.category}
        </div>
      </div>

      <div className='p-6 sm:p-8 relative z-20'>
        <div className='mb-6'>
          <h3 className='text-lg sm:text-xl font-medium text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-200 group-hover:text-blue-600'>
            {service.name}
          </h3>
          <div className='flex items-center gap-3 text-xs sm:text-sm text-gray-600 mb-4 flex-wrap'>
            <span className='flex items-center gap-1.5'>
              <MapPin className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400' />
              <span className='font-normal'>{service.location}</span>
            </span>
            <span className='w-1 h-1 rounded-full bg-gray-300' />
            <span className='flex items-center gap-1.5'>
              <Clock className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400' />
              <span className='font-normal'>{service.opening_hours}</span>
            </span>
          </div>
          <div className='flex items-center gap-2 mb-5'>
            <div className='flex items-center gap-1.5'>
              <Star className='w-4 h-4 text-amber-400 fill-amber-400' />
              <span className='text-sm font-semibold text-gray-900'>{service.rating}</span>
            </div>
            <span className='text-xs sm:text-sm text-gray-400'>· {service.reviews_count} reviews</span>
          </div>
          <div className='flex flex-wrap gap-2 mb-6'>
            {service.specialties.slice(0, 3).map((specialty) => (
              <Badge
                key={specialty}
                variant='secondary'
                className='text-xs bg-slate-100 text-slate-700 border-0 font-medium px-3 py-1.5 capitalize'
              >
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        <div className='mb-6 bg-slate-50 rounded-xl p-5 border border-slate-200'>
          <div className='flex items-baseline justify-between mb-2'>
            <span className='text-sm text-slate-600 font-medium'>Price Range</span>
            <div className='text-right'>
              <span className='text-xl sm:text-2xl font-bold text-slate-900'>
                {service.price.from}-{service.price.to}
              </span>
              <span className='text-sm text-slate-600 ml-1.5 font-medium'>{service.price.currency}</span>
            </div>
          </div>
        </div>

        <div className='pt-6 border-t border-slate-200'>
          <div className='flex items-center justify-between gap-3'>
            <div className='flex-1 min-w-0'>
              <p className='text-xs text-slate-500 font-medium mb-1 uppercase tracking-wide'>Contact Service</p>
              <p className='text-sm text-slate-900 font-semibold truncate'>Available Now</p>
            </div>
            <div className='flex items-center gap-2 shrink-0'>
              <a
                href={`tel:${service.phone}`}
                className='p-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5'
                onClick={(e) => e.stopPropagation()}
              >
                <Phone size={16} />
              </a>
              <a
                href={`https://wa.me/${service.whatsapp.replace(/[^0-9]/g, '')}`}
                target='_blank'
                rel='noopener noreferrer'
                className='p-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5'
                onClick={(e) => e.stopPropagation()}
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AutoServicesPage() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 font-montserrat py-20 relative overflow-hidden'>
      {/* Subtle background elements */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(148,163,184,0.04)_0%,_transparent_50%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(100,116,139,0.03)_0%,_transparent_50%)]' />

      <div className='relative'>
        <AutoServicesContent />
      </div>
    </main>
  );
}
