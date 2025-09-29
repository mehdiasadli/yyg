'use client';

import { Suspense, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Calendar, MapPin, Car, Users, Phone, MessageCircle, Search, Filter, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DualRangeSlider } from '@/components/ui/dual-range-slider';

export default function BrandContent({ brandData, brandCars }: { brandData: any; brandCars: any }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [1000, 4000] as [number, number],
    yearRange: [2018, 2024] as [number, number],
    seatRange: [2, 8] as [number, number],
    category: 'all',
    transmission: 'all',
    fuel: 'all',
  });


  // Get unique values for filter options
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(brandCars.map((car: any) => car.category))];
    return uniqueCategories;
  }, [brandCars]);

  const transmissions = useMemo(() => {
    const uniqueTransmissions = [...new Set(brandCars.map((car: any) => car.features.transmission))];
    return uniqueTransmissions;
  }, [brandCars]);

  const fuels = useMemo(() => {
    const uniqueFuels = [...new Set(brandCars.map((car: any) => car.features.fuel))];
    return uniqueFuels;
  }, [brandCars]);


  // Filter cars based on search and filters
  const filteredCars = useMemo(() => {
    return brandCars.filter((car: any) => {
      // Search filter
      const matchesSearch =
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Price filter
      const matchesPrice =
        car.price.daily.amount >= filters.priceRange[0] && car.price.daily.amount <= filters.priceRange[1];

      // Year filter
      const matchesYear = car.year >= filters.yearRange[0] && car.year <= filters.yearRange[1];

      // Seat filter
      const matchesSeats = car.features.seats >= filters.seatRange[0] && car.features.seats <= filters.seatRange[1];

      // Category filter
      const matchesCategory = filters.category === 'all' || car.category === filters.category;

      // Transmission filter
      const matchesTransmission = filters.transmission === 'all' || car.features.transmission === filters.transmission;

      // Fuel filter
      const matchesFuel = filters.fuel === 'all' || car.features.fuel === filters.fuel;

      return (
        matchesSearch &&
        matchesPrice &&
        matchesYear &&
        matchesSeats &&
        matchesCategory &&
        matchesTransmission &&
        matchesFuel
      );
    });
  }, [brandCars, searchQuery, filters]);

  const resetFilters = () => {
    setFilters({
      priceRange: [1000, 4000],
      yearRange: [2018, 2024],
      seatRange: [2, 8],
      category: 'all',
      transmission: 'all',
      fuel: 'all',
    });
    setSearchQuery('');
  };

  const hasActiveFilters =
    filters.category !== 'all' || filters.transmission !== 'all' || filters.fuel !== 'all' || searchQuery !== '';

  return (
    <div className='max-w-7xl mx-auto px-6 lg:px-8'>
      {/* Back Button */}
      <div className='mb-8'>
        <Link href='/brands'>
          <Button variant='ghost' className='gap-2 text-gray-600 hover:text-gray-900'>
            <ArrowLeft size={16} />
            Back to Brands
          </Button>
        </Link>
      </div>

      {/* Brand Header */}
      <motion.div
        className='bg-white rounded-lg p-8 md:p-12 border border-gray-50 shadow-sm mb-16'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className='flex flex-col md:flex-row items-start md:items-center gap-8'>
          <div className='flex-grow'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-4'>
              <div>
                <h1 className='text-4xl md:text-5xl font-light text-gray-900 mb-2 tracking-tight'>{brandData.name}</h1>
                <p className='text-xl text-gray-500 font-light'>{brandData.description}</p>
              </div>
              <div className='flex items-center gap-2 mt-4 md:mt-0'>
                <div className='flex items-center gap-1'>
                  <Star className='w-5 h-5 text-yellow-500 fill-current' />
                  <span className='text-lg font-medium text-gray-900'>{brandData.rating}</span>
                </div>
                <Badge variant='secondary' className='ml-2'>
                  {brandData.category}
                </Badge>
              </div>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-6'>
              <div className='text-center'>
                <div className='text-2xl font-bold text-gray-900'>{brandData.vehicleCount}</div>
                <div className='text-sm text-gray-400 font-light'>Available Cars</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-gray-900'>{brandData.established}</div>
                <div className='text-sm text-gray-400 font-light'>Established</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-gray-900'>
                  {new Date().getFullYear() - brandData.established}
                </div>
                <div className='text-sm text-gray-400 font-light'>Years Experience</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-gray-900'>{brandData.country}</div>
                <div className='text-sm text-gray-400 font-light'>Origin</div>
              </div>
            </div>

            <p className='text-gray-500 font-light leading-relaxed mb-6'>{brandData.about}</p>

            <div className='flex flex-wrap gap-4 text-sm text-gray-400'>
              <div className='flex items-center gap-2'>
                <MapPin className='w-4 h-4' />
                <span>{brandData.headquarters}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Users className='w-4 h-4' />
                <span>Founded by {brandData.founder}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Cars Section */}
      <div className='mb-8'>
        <div className='flex items-center justify-between mb-12'>
          <div>
            <h2 className='text-3xl font-light text-gray-900 mb-2'>Available {brandData.name} Cars</h2>
            <p className='text-gray-400 font-light'>Choose from our curated selection of {brandData.name} vehicles</p>
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
                placeholder='Search cars by name or category...'
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
                    <h4 className='text-sm font-light text-gray-600 mb-2'>Price Range (AED)</h4>
                    <div className='flex items-center gap-2 text-xs text-gray-400'>
                      <span>{filters.priceRange[0]} AED</span>
                      <span>-</span>
                      <span>{filters.priceRange[1]} AED</span>
                    </div>
                  </div>
                  <DualRangeSlider
                    min={0}
                    max={5000}
                    step={100}
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
                    min={2015}
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
                      {categories.map((category) => (
                        <SelectItem key={category as string} value={category as string}>
                          {category as string}
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
                      <SelectItem value='all'>All Types</SelectItem>
                      {transmissions.map((transmission) => (
                        <SelectItem key={transmission as string} value={transmission as string}>
                          {transmission as string}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Fuel Filter */}
                <div className='space-y-4'>
                  <label className='text-sm font-light text-gray-600'>Fuel Type</label>
                  <Select
                    value={filters.fuel}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, fuel: value }))}
                  >
                    <SelectTrigger className='w-full border-gray-100 focus:border-gray-300'>
                      <SelectValue placeholder='Select fuel type' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>All Types</SelectItem>
                      {fuels.map((fuel) => (
                        <SelectItem key={fuel as string} value={fuel as string}>
                          {fuel as string}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <Suspense
          fallback={
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className='h-96 bg-gray-200 rounded-2xl animate-pulse' />
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
              {filteredCars.map((car: any) => (
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
              <Button variant='outline' onClick={resetFilters} className='gap-2 border-gray-200 hover:border-gray-300 font-light'>
                <X size={16} />
                Clear All Filters
              </Button>
            </div>
          )}
        </Suspense>
      </div>
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

function CarCard({ car }: { car: any }) {
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
            <Badge className='bg-white/90 text-gray-700 border-0 shadow-sm text-xs font-light'>
              Premium
            </Badge>
          </div>
        )}
        <div className='absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-light'>
          +{car.images.length - 1} more
        </div>
      </div>

      <div className='p-8'>
        <div className='mb-6'>
          <Link href={car.link}>
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
              <Car className='w-4 h-4' />
              {car.category}
            </span>
          </div>
          <div className='flex flex-wrap gap-2 mb-4'>
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
              Contact: <span className='text-gray-600 font-light'>{car.contact.name}</span>
            </p>
            <div className='flex items-center gap-3'>
              <a
                href={`tel:${car.contact.phone}`}
                className='p-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-200'
                onClick={(e) => e.stopPropagation()}
              >
                <Phone size={14} />
              </a>
              <a
                href={`https://wa.me/${car.contact.whatsapp.replace(/[^0-9]/g, '')}`}
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
