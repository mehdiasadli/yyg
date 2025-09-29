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
    <div className='max-w-7xl mx-auto px-6 lg:px-8'>
      {/* Hero Section */}
      <motion.header
        className='text-center py-24 mb-16'
        variants={headerVariants}
        initial='hidden'
        animate='visible'
      >
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-tight'>
          Rent a Car
        </h1>
        <p className='text-lg text-gray-500 max-w-3xl mx-auto mb-12 font-light leading-relaxed'>
          Discover the perfect car for your journey. From economy to luxury, find verified vehicles from trusted owners.
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
      <div className='flex items-center justify-between mb-12'>
        <div>
          <h2 className='text-3xl font-light text-gray-900 mb-2'>Available Cars</h2>
          <p className='text-gray-400 font-light'>Find the perfect car for your needs</p>
        </div>
        <div className='text-sm text-gray-400 font-light'>{filteredCars.length} cars available</div>
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
              placeholder='Search cars by name, brand, or location...'
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
                <Filter size={16} />
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
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className='h-96 bg-gray-200 rounded-lg animate-pulse' />
            ))}
          </div>
        }
      >
        {filteredCars.length > 0 ? (
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
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </motion.div>
        ) : (
          <div className='text-center py-16'>
            <div className='w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6'>
              <Search className='w-12 h-12 text-gray-300' />
            </div>
            <h3 className='text-xl font-light text-gray-900 mb-2'>No cars found</h3>
            <p className='text-gray-400 font-light mb-6'>
              Try adjusting your search criteria or filters to find more cars.
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

function CarCard({ car }: { car: (typeof carsData)[0] }) {
  return (
    <motion.div
      className='group relative bg-white rounded-lg overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-sm'
      variants={cardVariants}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
    >
      <div className='relative h-64 overflow-hidden'>
        <Image
          src={car.images[0]}
          alt={car.name}
          fill
          className='object-cover group-hover:scale-105 transition-transform duration-500'
          sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
        />
        {car.premium && (
          <div className='absolute top-4 left-4'>
            <Badge className='bg-white/90 text-gray-700 border-0 shadow-sm text-xs font-light'>Premium</Badge>
          </div>
        )}
        <div className='absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-light'>
          +{car.images.length - 1} photos
        </div>
      </div>

      <div className='p-8'>
        <div className='mb-6'>
          <Link href={`/rent/${car.id}`}>
            <h3 className='text-xl font-light text-gray-900 mb-3 hover:text-gray-700 transition-colors duration-200 cursor-pointer'>
              {car.name}
            </h3>
          </Link>
          <div className='flex items-center gap-4 text-sm text-gray-400 mb-4'>
            <span className='flex items-center gap-1'>
              <Calendar className='w-4 h-4' />
              {car.year}
            </span>
            <span className='flex items-center gap-1'>
              <MapPin className='w-4 h-4' />
              {car.location}
            </span>
          </div>
          <div className='flex items-center gap-2 mb-4'>
            <div className='flex items-center gap-1'>
              <Star className='w-4 h-4 text-gray-400 fill-current' />
              <span className='text-sm font-light text-gray-900'>{car.rating}</span>
            </div>
            <span className='text-sm text-gray-400'>({car.reviewCount} reviews)</span>
          </div>
          <div className='flex flex-wrap gap-2 mb-6'>
            <Badge variant='secondary' className='text-xs bg-gray-50 text-gray-600 border-0'>
              {car.features.transmission}
            </Badge>
            <Badge variant='secondary' className='text-xs bg-gray-50 text-gray-600 border-0'>
              {car.features.fuel}
            </Badge>
            <Badge variant='secondary' className='text-xs bg-gray-50 text-gray-600 border-0'>
              {car.features.seats} seats
            </Badge>
          </div>
        </div>

        <div className='mb-6'>
          <div className='flex items-center justify-between mb-2'>
            <span className='text-sm text-gray-400 font-light'>Daily Rate</span>
            <span className='text-lg font-light text-gray-900'>
              {car.price.daily.amount} {car.price.daily.currency}
            </span>
          </div>
          <div className='text-xs text-gray-400'>Up to {car.price.daily.km} km included</div>
        </div>

        <div className='pt-6 border-t border-gray-50'>
          <div className='flex items-center justify-between'>
            <p className='text-xs text-gray-400 font-light'>
              Owner: <span className='text-gray-600 font-light'>{car.owner.name}</span>
            </p>
            <div className='flex items-center gap-3'>
              <a
                href={`tel:${car.owner.phone}`}
                className='p-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-200'
                onClick={(e) => e.stopPropagation()}
              >
                <Phone size={14} />
              </a>
              <a
                href={`https://wa.me/${car.owner.whatsapp.replace(/[^0-9]/g, '')}`}
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
  );
}

export default function RentPage() {
  return (
    <main className='min-h-screen bg-white font-montserrat py-20'>
      <RentContent />
    </main>
  );
}