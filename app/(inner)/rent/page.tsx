'use client';

import { Suspense, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, Calendar, MapPin, Car, Users, Phone, MessageCircle, Filter, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DualRangeSlider } from '@/components/ui/dual-range-slider';

// Mock car data - in a real app, this would come from a database
const carsData = [
  {
    id: 'bmw-x5-2023',
    name: 'BMW X5',
    year: 2023,
    brand: 'BMW',
    category: 'SUV',
    location: 'Dubai Marina',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1000&auto=format&fit=crop',
    ],
    rating: 4.8,
    reviewCount: 124,
    premium: true,
    features: {
      transmission: 'Automatic',
      fuel: 'Petrol',
      seats: 7,
      doors: 5,
    },
    price: {
      daily: { amount: 450, currency: 'AED', km: 300 },
      weekly: { amount: 2800, currency: 'AED', km: 2000 },
      monthly: { amount: 10000, currency: 'AED', km: 5000 },
    },
    owner: {
      name: 'Ahmed Al-Rashid',
      phone: '+971-50-123-4567',
      whatsapp: '+971-50-123-4567',
      rating: 4.9,
    },
    description: 'Luxury SUV perfect for family trips and business travel. Well-maintained with all premium features.',
  },
  {
    id: 'mercedes-c200-2022',
    name: 'Mercedes C200',
    year: 2022,
    brand: 'Mercedes-Benz',
    category: 'Sedan',
    location: 'Downtown Dubai',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1000&auto=format&fit=crop',
    ],
    rating: 4.7,
    reviewCount: 89,
    premium: true,
    features: {
      transmission: 'Automatic',
      fuel: 'Petrol',
      seats: 5,
      doors: 4,
    },
    price: {
      daily: { amount: 280, currency: 'AED', km: 250 },
      weekly: { amount: 1800, currency: 'AED', km: 1750 },
      monthly: { amount: 6500, currency: 'AED', km: 5000 },
    },
    owner: {
      name: 'Sarah Johnson',
      phone: '+971-50-987-6543',
      whatsapp: '+971-50-987-6543',
      rating: 4.8,
    },
    description: 'Elegant sedan with modern features and excellent fuel economy. Perfect for city driving.',
  },
  {
    id: 'toyota-camry-2023',
    name: 'Toyota Camry',
    year: 2023,
    brand: 'Toyota',
    category: 'Sedan',
    location: 'Jumeirah',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000&auto=format&fit=crop',
    ],
    rating: 4.6,
    reviewCount: 156,
    premium: false,
    features: {
      transmission: 'Automatic',
      fuel: 'Hybrid',
      seats: 5,
      doors: 4,
    },
    price: {
      daily: { amount: 180, currency: 'AED', km: 300 },
      weekly: { amount: 1200, currency: 'AED', km: 2000 },
      monthly: { amount: 4500, currency: 'AED', km: 5000 },
    },
    owner: {
      name: 'Mohammed Al-Zahra',
      phone: '+971-50-555-1234',
      whatsapp: '+971-50-555-1234',
      rating: 4.7,
    },
    description: 'Reliable and fuel-efficient hybrid sedan. Great for daily commuting and long drives.',
  },
  {
    id: 'range-rover-2023',
    name: 'Range Rover Evoque',
    year: 2023,
    brand: 'Land Rover',
    category: 'SUV',
    location: 'Palm Jumeirah',
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544829099-b9a0c5303bea?q=80&w=1000&auto=format&fit=crop',
    ],
    rating: 4.9,
    reviewCount: 78,
    premium: true,
    features: {
      transmission: 'Automatic',
      fuel: 'Petrol',
      seats: 5,
      doors: 5,
    },
    price: {
      daily: { amount: 520, currency: 'AED', km: 250 },
      weekly: { amount: 3200, currency: 'AED', km: 1750 },
      monthly: { amount: 12000, currency: 'AED', km: 5000 },
    },
    owner: {
      name: 'Emily Chen',
      phone: '+971-50-777-8888',
      whatsapp: '+971-50-777-8888',
      rating: 4.9,
    },
    description: 'Luxury compact SUV with stunning design and advanced technology. Perfect for urban adventures.',
  },
];

const brands = ['All Brands', 'BMW', 'Mercedes-Benz', 'Toyota', 'Land Rover', 'Audi', 'Lexus', 'Porsche'];
const categories = ['All Categories', 'Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible'];
const transmissions = ['All Types', 'Automatic', 'Manual'];
const fuels = ['All Types', 'Petrol', 'Hybrid', 'Electric'];

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

function RentContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [100, 600] as [number, number],
    yearRange: [2018, 2024] as [number, number],
    seatRange: [2, 8] as [number, number],
    brand: 'All Brands',
    category: 'All Categories',
    transmission: 'All Types',
    fuel: 'All Types',
  });

  // Filter cars based on search and filters
  const filteredCars = useMemo(() => {
    return carsData.filter((car) => {
      const matchesSearch =
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPrice =
        car.price.daily.amount >= filters.priceRange[0] && car.price.daily.amount <= filters.priceRange[1];

      const matchesYear = car.year >= filters.yearRange[0] && car.year <= filters.yearRange[1];

      const matchesSeats = car.features.seats >= filters.seatRange[0] && car.features.seats <= filters.seatRange[1];

      const matchesBrand = filters.brand === 'All Brands' || car.brand === filters.brand;

      const matchesCategory = filters.category === 'All Categories' || car.category === filters.category;

      const matchesTransmission =
        filters.transmission === 'All Types' || car.features.transmission === filters.transmission;

      const matchesFuel = filters.fuel === 'All Types' || car.features.fuel === filters.fuel;

      return (
        matchesSearch &&
        matchesPrice &&
        matchesYear &&
        matchesSeats &&
        matchesBrand &&
        matchesCategory &&
        matchesTransmission &&
        matchesFuel
      );
    });
  }, [searchQuery, filters]);

  const resetFilters = () => {
    setFilters({
      priceRange: [100, 600],
      yearRange: [2018, 2024],
      seatRange: [2, 8],
      brand: 'All Brands',
      category: 'All Categories',
      transmission: 'All Types',
      fuel: 'All Types',
    });
    setSearchQuery('');
  };

  const hasActiveFilters =
    filters.brand !== 'All Brands' ||
    filters.category !== 'All Categories' ||
    filters.transmission !== 'All Types' ||
    filters.fuel !== 'All Types' ||
    searchQuery !== '';

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
          <span className='text-sm font-medium text-white tracking-wide'>Premium Car Rentals</span>
        </motion.div>

        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-6 tracking-tight px-4 leading-tight'>
          Find Your Perfect Ride
        </h1>
        <p className='text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 font-light leading-relaxed px-4'>
          Discover verified vehicles from trusted owners. From economy to luxury, find the perfect car for your journey.
        </p>
      </motion.header>

      {/* Cars List */}
      <CarsList cars={filteredCars} />
    </div>
  );
}

function CarsList({ cars }: { cars: typeof carsData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [100, 600] as [number, number],
    yearRange: [2018, 2024] as [number, number],
    seatRange: [2, 8] as [number, number],
    brand: 'All Brands',
    category: 'All Categories',
    transmission: 'All Types',
    fuel: 'All Types',
  });

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesSearch =
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPrice =
        car.price.daily.amount >= filters.priceRange[0] && car.price.daily.amount <= filters.priceRange[1];

      const matchesYear = car.year >= filters.yearRange[0] && car.year <= filters.yearRange[1];

      const matchesSeats = car.features.seats >= filters.seatRange[0] && car.features.seats <= filters.seatRange[1];

      const matchesBrand = filters.brand === 'All Brands' || car.brand === filters.brand;

      const matchesCategory = filters.category === 'All Categories' || car.category === filters.category;

      const matchesTransmission =
        filters.transmission === 'All Types' || car.features.transmission === filters.transmission;

      const matchesFuel = filters.fuel === 'All Types' || car.features.fuel === filters.fuel;

      return (
        matchesSearch &&
        matchesPrice &&
        matchesYear &&
        matchesSeats &&
        matchesBrand &&
        matchesCategory &&
        matchesTransmission &&
        matchesFuel
      );
    });
  }, [cars, searchQuery, filters]);

  const resetFilters = () => {
    setFilters({
      priceRange: [100, 600],
      yearRange: [2018, 2024],
      seatRange: [2, 8],
      brand: 'All Brands',
      category: 'All Categories',
      transmission: 'All Types',
      fuel: 'All Types',
    });
    setSearchQuery('');
  };

  const hasActiveFilters =
    filters.brand !== 'All Brands' ||
    filters.category !== 'All Categories' ||
    filters.transmission !== 'All Types' ||
    filters.fuel !== 'All Types' ||
    searchQuery !== '';

  return (
    <div className='mb-8'>
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4 px-4 sm:px-0'>
        <div>
          <h2 className='text-2xl sm:text-3xl font-light text-gray-900 mb-2'>Available Cars</h2>
          <p className='text-sm sm:text-base text-gray-500 font-light'>Find the perfect car for your needs</p>
        </div>
        <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200'>
          <div className='w-2 h-2 rounded-full bg-slate-900' />
          <span className='text-sm text-slate-700 font-medium'>{filteredCars.length} cars available</span>
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
              placeholder='Search cars by name, brand, or location...'
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
                  <h4 className='text-sm font-light text-gray-600 mb-2'>Daily Rate (AED)</h4>
                  <div className='flex items-center gap-2 text-xs text-gray-400'>
                    <span>{filters.priceRange[0]} AED</span>
                    <span>-</span>
                    <span>{filters.priceRange[1]} AED</span>
                  </div>
                </div>
                <DualRangeSlider
                  min={100}
                  max={600}
                  step={50}
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, priceRange: value as [number, number] }))}
                  className='w-full'
                />
              </div>

              {/* Year Range */}
              <div className='space-y-6'>
                <div>
                  <h4 className='text-sm font-light text-gray-600 mb-2'>Year Range</h4>
                  <div className='flex items-center gap-2 text-xs text-gray-400'>
                    <span>{filters.yearRange[0]}</span>
                    <span>-</span>
                    <span>{filters.yearRange[1]}</span>
                  </div>
                </div>
                <DualRangeSlider
                  min={2018}
                  max={2024}
                  step={1}
                  value={filters.yearRange}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, yearRange: value as [number, number] }))}
                  className='w-full'
                />
              </div>

              {/* Seat Range */}
              <div className='space-y-6'>
                <div>
                  <h4 className='text-sm font-light text-gray-600 mb-2'>Seat Count</h4>
                  <div className='flex items-center gap-2 text-xs text-gray-400'>
                    <span>{filters.seatRange[0]} seats</span>
                    <span>-</span>
                    <span>{filters.seatRange[1]} seats</span>
                  </div>
                </div>
                <DualRangeSlider
                  min={2}
                  max={8}
                  step={1}
                  value={filters.seatRange}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, seatRange: value as [number, number] }))}
                  className='w-full'
                />
              </div>

              {/* Brand Filter */}
              <div className='space-y-4'>
                <label className='text-sm font-light text-gray-600'>Brand</label>
                <Select
                  value={filters.brand}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, brand: value }))}
                >
                  <SelectTrigger className='w-full border-gray-100 focus:border-gray-300'>
                    <SelectValue placeholder='Select brand' />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Transmission Filter */}
              <div className='space-y-4'>
                <label className='text-sm font-light text-gray-600'>Transmission</label>
                <Select
                  value={filters.transmission}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, transmission: value }))}
                >
                  <SelectTrigger className='w-full border-gray-100 focus:border-gray-300'>
                    <SelectValue placeholder='Select transmission' />
                  </SelectTrigger>
                  <SelectContent>
                    {transmissions.map((transmission) => (
                      <SelectItem key={transmission} value={transmission}>
                        {transmission}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Cars Grid */}
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
        {filteredCars.length > 0 ? (
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
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </motion.div>
        ) : (
          <div className='text-center py-16 px-4'>
            <div className='w-24 h-24 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-blue-100/50'>
              <Search className='w-12 h-12 text-blue-400' />
            </div>
            <h3 className='text-xl sm:text-2xl font-medium text-gray-900 mb-3'>No cars found</h3>
            <p className='text-gray-500 font-light mb-8 max-w-md mx-auto'>
              We couldn't find any cars matching your criteria. Try adjusting your search or filters.
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

function CarCard({ car }: { car: (typeof carsData)[0] }) {
  return (
    <motion.div
      className='group relative bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50'
      variants={cardVariants}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
    >
      {/* Subtle gradient overlay on hover */}
      <div className='absolute inset-0 bg-gradient-to-br from-slate-50/0 to-slate-50/0 group-hover:from-slate-50/50 group-hover:to-slate-100/30 transition-all duration-500 pointer-events-none z-10 rounded-2xl sm:rounded-3xl' />

      <div className='relative h-56 sm:h-64 overflow-hidden'>
        <Image
          src={car.images[0]}
          alt={car.name}
          fill
          className='object-cover group-hover:scale-110 transition-transform duration-700'
          sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
        />
        {/* Image overlay gradient */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent' />

        {car.premium && (
          <div className='absolute top-4 left-4 z-20'>
            <Badge className='bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 shadow-lg text-xs font-semibold px-3 py-1.5 uppercase tracking-wide'>
              Premium
            </Badge>
          </div>
        )}
        <div className='absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md rounded-lg px-3 py-1.5 text-white text-xs font-medium shadow-lg z-20 border border-slate-700/50'>
          <span className='opacity-90'>+{car.images.length - 1} photos</span>
        </div>
      </div>

      <div className='p-6 sm:p-8 relative z-20'>
        <div className='mb-6'>
          <Link href={`/rent/${car.id}`}>
            <h3 className='text-lg sm:text-xl font-medium text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-200 cursor-pointer group-hover:text-blue-600'>
              {car.name}
            </h3>
          </Link>
          <div className='flex items-center gap-3 text-xs sm:text-sm text-gray-600 mb-4 flex-wrap'>
            <span className='flex items-center gap-1.5'>
              <Calendar className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400' />
              <span className='font-normal'>{car.year}</span>
            </span>
            <span className='w-1 h-1 rounded-full bg-gray-300' />
            <span className='flex items-center gap-1.5'>
              <MapPin className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400' />
              <span className='font-normal'>{car.location}</span>
            </span>
          </div>
          <div className='flex items-center gap-2 mb-5'>
            <div className='flex items-center gap-1.5'>
              <Star className='w-4 h-4 text-amber-400 fill-amber-400' />
              <span className='text-sm font-semibold text-gray-900'>{car.rating}</span>
            </div>
            <span className='text-xs sm:text-sm text-gray-400'>· {car.reviewCount} reviews</span>
          </div>
          <div className='flex flex-wrap gap-2 mb-6'>
            <Badge variant='secondary' className='text-xs bg-slate-100 text-slate-700 border-0 font-medium px-3 py-1.5'>
              {car.features.transmission}
            </Badge>
            <Badge variant='secondary' className='text-xs bg-slate-100 text-slate-700 border-0 font-medium px-3 py-1.5'>
              {car.features.fuel}
            </Badge>
            <Badge variant='secondary' className='text-xs bg-slate-100 text-slate-700 border-0 font-medium px-3 py-1.5'>
              <Users className='w-3 h-3 inline mr-1' />
              {car.features.seats} seats
            </Badge>
          </div>
        </div>

        <div className='mb-6 bg-slate-50 rounded-xl p-5 border border-slate-200'>
          <div className='flex items-baseline justify-between mb-2'>
            <span className='text-sm text-slate-600 font-medium'>From</span>
            <div className='text-right'>
              <span className='text-3xl font-bold text-slate-900'>{car.price.daily.amount}</span>
              <span className='text-sm text-slate-600 ml-1.5 font-medium'>{car.price.daily.currency}/day</span>
            </div>
          </div>
          <div className='text-xs text-slate-500 flex items-center gap-1.5'>
            <Car className='w-3.5 h-3.5' />
            Includes {car.price.daily.km} km per day
          </div>
        </div>

        <div className='pt-6 border-t border-slate-200'>
          <div className='flex items-center justify-between gap-3'>
            <div className='flex-1 min-w-0'>
              <p className='text-xs text-slate-500 font-medium mb-1 uppercase tracking-wide'>Owner</p>
              <p className='text-sm text-slate-900 font-semibold truncate'>{car.owner.name}</p>
            </div>
            <div className='flex items-center gap-2 shrink-0'>
              <a
                href={`tel:${car.owner.phone}`}
                className='p-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5'
                onClick={(e) => e.stopPropagation()}
              >
                <Phone size={16} />
              </a>
              <a
                href={`https://wa.me/${car.owner.whatsapp.replace(/[^0-9]/g, '')}`}
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

export default function RentPage() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 font-montserrat py-20 relative overflow-hidden'>
      {/* Subtle background elements */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(148,163,184,0.04)_0%,_transparent_50%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(100,116,139,0.03)_0%,_transparent_50%)]' />

      <div className='relative'>
        <RentContent />
      </div>
    </main>
  );
}
