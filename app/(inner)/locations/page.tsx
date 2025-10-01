'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, TrendingUp, Users, Star, Filter, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { locations } from '@/data/locations';

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

export default function LocationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const cities = ['all', ...Array.from(new Set(locations.map((loc) => loc.city)))];

  const filteredLocations = locations.filter((location) => {
    const matchesSearch =
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCity = cityFilter === 'all' || location.city === cityFilter;

    return matchesSearch && matchesCity;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setCityFilter('all');
  };

  const hasActiveFilters = cityFilter !== 'all' || searchQuery !== '';

  return (
    <main className='min-h-screen pt-40 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 font-montserrat py-20 relative overflow-hidden'>
      {/* Subtle background elements */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(148,163,184,0.04)_0%,_transparent_50%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(100,116,139,0.03)_0%,_transparent_50%)]' />

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
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
            <span className='text-sm font-medium text-white tracking-wide'>All Locations</span>
          </motion.div>

          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-6 tracking-tight leading-tight px-4'>
            Explore UAE Locations
          </h1>
          <p className='text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8 font-normal leading-relaxed px-4'>
            Find the best car rentals and auto services across United Arab Emirates
          </p>

          {/* Quick Stats */}
          <div className='grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto mb-12'>
            <div className='bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm'>
              <div className='text-2xl sm:text-3xl font-bold text-slate-900 mb-1'>{locations.length}</div>
              <div className='text-xs sm:text-sm text-slate-500 font-medium'>Locations</div>
            </div>
            <div className='bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm'>
              <div className='text-2xl sm:text-3xl font-bold text-slate-900 mb-1'>
                {locations.reduce((sum, loc) => sum + loc.vehicleCount, 0)}+
              </div>
              <div className='text-xs sm:text-sm text-slate-500 font-medium'>Vehicles</div>
            </div>
            <div className='bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm'>
              <div className='text-2xl sm:text-3xl font-bold text-slate-900 mb-1'>
                {locations.reduce((sum, loc) => sum + loc.serviceCount, 0)}+
              </div>
              <div className='text-xs sm:text-sm text-slate-500 font-medium'>Services</div>
            </div>
          </div>
        </motion.header>

        {/* Search and Filters */}
        <motion.div
          className='bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg shadow-slate-200/50 mb-12'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className='flex flex-col lg:flex-row gap-4 sm:gap-6 mb-6'>
            <div className='relative flex-1'>
              <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400' />
              <Input
                type='text'
                placeholder='Search locations by name or city...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-12 pr-4 py-5 sm:py-6 text-sm sm:text-base bg-white border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-200 rounded-xl font-normal placeholder:text-slate-400'
              />
            </div>

            <div className='flex items-center gap-3'>
              <Button
                variant='outline'
                onClick={() => setShowFilters(!showFilters)}
                className='gap-2 text-slate-700 hover:text-slate-900 whitespace-nowrap border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-normal transition-all duration-200 rounded-xl px-6 py-5 sm:py-6'
              >
                <Filter size={16} />
                Filters
                {hasActiveFilters && <Badge className='ml-1 text-xs bg-slate-900 text-white border-0'>Active</Badge>}
              </Button>
              {hasActiveFilters && (
                <Button
                  variant='ghost'
                  onClick={resetFilters}
                  className='gap-2 text-slate-500 hover:text-slate-700 hover:bg-red-50 text-sm whitespace-nowrap font-normal'
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
              className='border-t border-slate-200 pt-6'
            >
              <div className='space-y-4'>
                <label className='text-sm font-medium text-slate-700'>City</label>
                <Select value={cityFilter} onValueChange={(value) => setCityFilter(value)}>
                  <SelectTrigger className='w-full sm:w-64 border-slate-200 focus:border-slate-400 rounded-xl'>
                    <SelectValue placeholder='Select city' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Cities</SelectItem>
                    {cities.slice(1).map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Locations Grid */}
        {filteredLocations.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
            {filteredLocations.map((location, index) => (
              <motion.div
                key={location.id}
                variants={cardVariants}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
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
                      <div className='absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent' />

                      {/* Badges */}
                      <div className='absolute top-4 right-4 flex flex-col gap-2'>
                        {location.trending && (
                          <div className='flex items-center gap-1.5 px-3 py-1.5 bg-primary/90 backdrop-blur-sm text-white text-xs font-semibold rounded-lg shadow-lg'>
                            <TrendingUp className='w-3.5 h-3.5' />
                            Trending
                          </div>
                        )}
                        {location.featured && (
                          <div className='px-3 py-1.5 bg-amber-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-lg shadow-lg'>
                            Featured
                          </div>
                        )}
                      </div>

                      {/* Location Info Overlay */}
                      <div className='absolute bottom-0 left-0 right-0 p-6'>
                        <h3 className='text-xl sm:text-2xl font-semibold text-white mb-1 group-hover:text-primary transition-colors duration-200'>
                          {location.name}
                        </h3>
                        <div className='flex items-center gap-2 text-white/90 text-sm'>
                          <MapPin className='w-4 h-4' />
                          <span className='font-normal'>{location.city}, UAE</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className='p-6 bg-slate-50'>
                      <div className='grid grid-cols-2 gap-4 mb-4'>
                        <div className='text-center'>
                          <div className='text-lg font-bold text-slate-900'>{location.vehicleCount}</div>
                          <div className='text-xs text-slate-500 font-medium'>Vehicles</div>
                        </div>
                        <div className='text-center'>
                          <div className='text-lg font-bold text-slate-900'>{location.serviceCount}</div>
                          <div className='text-xs text-slate-500 font-medium'>Services</div>
                        </div>
                      </div>
                      <div className='flex items-center justify-center gap-1.5 text-amber-600'>
                        <Star className='w-4 h-4 fill-amber-400' />
                        <span className='text-sm font-semibold'>{location.rating}</span>
                        <span className='text-sm text-slate-500'>rating</span>
                      </div>
                    </div>

                    <div className='absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-2xl sm:rounded-3xl transition-colors duration-300 pointer-events-none' />
                  </div>
                </Link>
              </motion.div>
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
            <h3 className='text-xl sm:text-2xl font-medium text-gray-900 mb-3'>No locations found</h3>
            <p className='text-gray-500 font-light mb-8 max-w-md mx-auto'>
              Try adjusting your search or filters to find locations
            </p>
            <Button
              variant='outline'
              onClick={resetFilters}
              className='gap-2 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-normal rounded-xl px-6 py-5'
            >
              <X size={16} />
              Clear All Filters
            </Button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
