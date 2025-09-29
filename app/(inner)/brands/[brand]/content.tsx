'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Star,
  Calendar,
  MapPin,
  Users,
  Phone,
  MessageCircle,
  Search,
  Filter,
  X,
  Globe,
  Award,
  Gauge,
  Fuel,
  Settings,
} from 'lucide-react';
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
      const matchesSearch =
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPrice =
        car.price.daily.amount >= filters.priceRange[0] && car.price.daily.amount <= filters.priceRange[1];

      const matchesYear = car.year >= filters.yearRange[0] && car.year <= filters.yearRange[1];

      const matchesSeats = car.features.seats >= filters.seatRange[0] && car.features.seats <= filters.seatRange[1];

      const matchesCategory = filters.category === 'all' || car.category === filters.category;

      const matchesTransmission = filters.transmission === 'all' || car.features.transmission === filters.transmission;

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
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      {/* Back Button */}
      <div className='mb-8'>
        <Link href='/brands'>
          <Button
            variant='ghost'
            className='gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-200 font-normal'
          >
            <ArrowLeft size={16} />
            Back to Brands
          </Button>
        </Link>
      </div>

      {/* Brand Header */}
      <motion.div
        className='bg-white rounded-2xl sm:rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm mb-12 sm:mb-16'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className='grid md:grid-cols-3 gap-8 md:gap-12 items-center mb-8'>
          {/* Logo */}
          <div className='flex justify-center md:justify-start'>
            <div className='relative w-32 h-32 sm:w-40 sm:h-40'>
              <div className='absolute inset-0 bg-slate-50 rounded-2xl' />
              <div className='absolute inset-0 flex items-center justify-center'>
                <Image
                  src={brandData.logo}
                  alt={brandData.name}
                  width={120}
                  height={120}
                  className='object-contain drop-shadow-lg'
                />
              </div>
            </div>
          </div>

          {/* Brand Info */}
          <div className='md:col-span-2'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4'>
              <div>
                <h1 className='text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 mb-2 tracking-tight'>
                  {brandData.name}
                </h1>
                <p className='text-lg sm:text-xl text-slate-600 font-normal'>{brandData.description}</p>
              </div>
              <div className='flex items-center gap-2 mt-4 sm:mt-0'>
                <div className='flex items-center gap-1.5 bg-amber-50 px-4 py-2 rounded-xl'>
                  <Star className='w-5 h-5 text-amber-500 fill-amber-500' />
                  <span className='text-lg font-semibold text-slate-900'>{brandData.rating}</span>
                </div>
                <Badge className='bg-blue-50 text-blue-700 border-blue-200 font-semibold'>{brandData.category}</Badge>
              </div>
            </div>

            <p className='text-slate-600 font-normal leading-relaxed mb-6'>{brandData.about}</p>

            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
              {[
                { icon: Users, label: 'Available Cars', value: brandData.vehicleCount },
                { icon: Calendar, label: 'Established', value: brandData.established },
                { icon: Award, label: 'Years Experience', value: new Date().getFullYear() - brandData.established },
                { icon: Globe, label: 'Origin', value: brandData.country },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className='text-center bg-slate-50 rounded-xl p-4'>
                    <Icon className='w-6 h-6 text-blue-600 mx-auto mb-2' />
                    <div className='text-xl font-bold text-slate-900'>{stat.value}</div>
                    <div className='text-xs text-slate-500 font-medium'>{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className='flex flex-wrap gap-6 text-sm text-slate-600 pt-6 border-t border-slate-200'>
          <div className='flex items-center gap-2'>
            <MapPin className='w-4 h-4 text-slate-400' />
            <span className='font-normal'>{brandData.headquarters}</span>
          </div>
          <div className='flex items-center gap-2'>
            <Users className='w-4 h-4 text-slate-400' />
            <span className='font-normal'>Founded by {brandData.founder}</span>
          </div>
        </div>
      </motion.div>

      {/* Cars Section Header */}
      <div className='mb-8'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6'>
          <div>
            <h2 className='text-2xl sm:text-3xl font-semibold text-slate-900 mb-2'>
              Available {brandData.name} Vehicles
            </h2>
            <p className='text-slate-600 font-normal'>Choose from our curated selection</p>
          </div>
          <Badge className='bg-slate-100 text-slate-700 border-0 font-medium px-4 py-2 mt-4 sm:mt-0'>
            {filteredCars.length} vehicles available
          </Badge>
        </div>

        {/* Search and Filters */}
        <div className='bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8'>
          <div className='flex flex-col lg:flex-row gap-4 sm:gap-6 mb-6'>
            <div className='relative flex-1'>
              <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400' />
              <Input
                type='text'
                placeholder='Search vehicles by name or category...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-12 pr-4 py-5 text-sm sm:text-base bg-white border-slate-200 rounded-xl focus:border-slate-400 focus:ring-1 focus:ring-slate-200 transition-all duration-200 font-normal placeholder:text-slate-400'
              />
            </div>

            <div className='flex items-center gap-3'>
              <Button
                variant='outline'
                onClick={() => setShowFilters(!showFilters)}
                className='gap-2 text-slate-700 hover:text-slate-900 whitespace-nowrap border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-normal transition-all duration-200 rounded-xl px-6 py-5'
              >
                <Filter size={16} />
                Filters
                {hasActiveFilters && <Badge className='ml-1 text-xs bg-slate-900 text-white border-0'>Active</Badge>}
              </Button>
              {hasActiveFilters && (
                <Button
                  variant='ghost'
                  onClick={resetFilters}
                  className='gap-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 text-sm whitespace-nowrap font-normal transition-all duration-200'
                >
                  <X size={14} />
                  Clear All
                </Button>
              )}
            </div>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className='border-t border-slate-200 pt-6 mt-6'
            >
              <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'>
                {/* Price Range */}
                <div className='space-y-4'>
                  <div>
                    <h4 className='text-sm font-medium text-slate-700 mb-2'>Daily Price (AED)</h4>
                    <div className='flex items-center gap-2 text-xs text-slate-500'>
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
                    onValueChange={(value) =>
                      setFilters((prev) => ({ ...prev, priceRange: value as [number, number] }))
                    }
                    className='w-full'
                  />
                </div>

                {/* Year Range */}
                <div className='space-y-4'>
                  <div>
                    <h4 className='text-sm font-medium text-slate-700 mb-2'>Year Range</h4>
                    <div className='flex items-center gap-2 text-xs text-slate-500'>
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
                <div className='space-y-4'>
                  <div>
                    <h4 className='text-sm font-medium text-slate-700 mb-2'>Seat Count</h4>
                    <div className='flex items-center gap-2 text-xs text-slate-500'>
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

                {/* Category */}
                <div className='space-y-4'>
                  <label className='text-sm font-medium text-slate-700'>Category</label>
                  <Select
                    value={filters.category}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className='w-full border-slate-200 focus:border-slate-400 rounded-xl'>
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

                {/* Transmission */}
                <div className='space-y-4'>
                  <label className='text-sm font-medium text-slate-700'>Transmission</label>
                  <Select
                    value={filters.transmission}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, transmission: value }))}
                  >
                    <SelectTrigger className='w-full border-slate-200 focus:border-slate-400 rounded-xl'>
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

                {/* Fuel */}
                <div className='space-y-4'>
                  <label className='text-sm font-medium text-slate-700'>Fuel Type</label>
                  <Select
                    value={filters.fuel}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, fuel: value }))}
                  >
                    <SelectTrigger className='w-full border-slate-200 focus:border-slate-400 rounded-xl'>
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

        {/* Cars Grid */}
        {filteredCars.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
            {filteredCars.map((car: any, index: number) => (
              <CarCard key={car.id} car={car} index={index} />
            ))}
          </div>
        ) : (
          <div className='text-center py-16'>
            <div className='w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-slate-200'>
              <Search className='w-12 h-12 text-slate-400' />
            </div>
            <h3 className='text-xl font-medium text-slate-900 mb-2'>No vehicles found</h3>
            <p className='text-slate-600 font-normal mb-6'>Try adjusting your search or filters</p>
            <Button
              variant='outline'
              onClick={resetFilters}
              className='gap-2 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-normal rounded-xl px-6 py-5'
            >
              <X size={16} />
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function CarCard({ car, index }: { car: any; index: number }) {
  return (
    <motion.div
      className='group relative bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50'
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
    >
      {/* Image */}
      <div className='relative h-52 sm:h-64 overflow-hidden bg-slate-100'>
        <Image
          src={car.images[0]}
          alt={car.name}
          fill
          className='object-cover group-hover:scale-110 transition-transform duration-500'
          sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
        />
        {car.premium && (
          <div className='absolute top-4 left-4'>
            <Badge className='bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 shadow-lg text-xs font-semibold px-3 py-1.5 uppercase tracking-wide'>
              Premium
            </Badge>
          </div>
        )}
        <div className='absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md rounded-lg px-3 py-1.5 text-white text-xs font-medium shadow-lg'>
          {car.images.length} photos
        </div>
      </div>

      {/* Content */}
      <div className='p-6 sm:p-8'>
        <div className='mb-6'>
          <Link href={car.link}>
            <h3 className='text-lg sm:text-xl font-semibold text-slate-900 mb-3 hover:text-blue-600 transition-colors duration-200 cursor-pointer'>
              {car.name}
            </h3>
          </Link>
          <div className='flex items-center gap-3 text-xs sm:text-sm text-slate-600 mb-4 flex-wrap'>
            <span className='flex items-center gap-1.5'>
              <Calendar className='w-4 h-4 text-slate-400' />
              {car.year}
            </span>
            <div className='w-1 h-1 rounded-full bg-slate-300' />
            <span className='flex items-center gap-1.5'>
              <Gauge className='w-4 h-4 text-slate-400' />
              {car.category}
            </span>
          </div>
          <div className='flex flex-wrap gap-2 mb-4'>
            <Badge className='text-xs bg-slate-100 text-slate-700 border-0 font-medium px-3 py-1.5'>
              <Settings className='w-3 h-3 mr-1' />
              {car.features.transmission}
            </Badge>
            <Badge className='text-xs bg-slate-100 text-slate-700 border-0 font-medium px-3 py-1.5'>
              <Fuel className='w-3 h-3 mr-1' />
              {car.features.fuel}
            </Badge>
            <Badge className='text-xs bg-slate-100 text-slate-700 border-0 font-medium px-3 py-1.5'>
              <Users className='w-3 h-3 mr-1' />
              {car.features.seats} seats
            </Badge>
          </div>
        </div>

        <div className='mb-6 bg-slate-50 rounded-xl p-5 border border-slate-200'>
          <div className='flex items-baseline justify-between mb-1'>
            <span className='text-sm text-slate-600 font-normal'>Daily Rate</span>
            <div className='flex items-baseline gap-1'>
              <span className='text-3xl font-bold text-slate-900'>{car.price.daily.amount}</span>
              <span className='text-sm text-slate-600 ml-1.5 font-medium'>{car.price.daily.currency}</span>
            </div>
          </div>
          <div className='text-xs text-slate-500 text-right'>Up to {car.price.daily.km} km included</div>
        </div>

        <div className='pt-6 border-t border-slate-200'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-xs text-slate-500 font-normal mb-1'>Owner</p>
              <p className='text-sm text-slate-900 font-semibold truncate'>{car.contact.name}</p>
            </div>
            <div className='flex items-center gap-2 shrink-0'>
              <a
                href={`tel:${car.contact.phone}`}
                className='p-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5'
                onClick={(e) => e.stopPropagation()}
              >
                <Phone size={16} />
              </a>
              <a
                href={`https://wa.me/${car.contact.whatsapp.replace(/[^0-9]/g, '')}`}
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
