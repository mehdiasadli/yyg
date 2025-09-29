'use client';

import { motion } from 'framer-motion';
import { ShimmerButton } from '../ui/shimmer-button';
import DatePicker from '../date-picker/date-time';
import { useState } from 'react';
import ActionSearchBar from '../kokonutui/action-search-bar';
import { AnimateIcon } from '../animate-ui/icons/icon';
import { SearchIcon } from '../animate-ui/icons/search';
import { useRouter } from 'next/navigation';

export default function HeroSearchSection() {
  const today = new Date();
  const router = useRouter();
  const [query, setQuery] = useState('');

  const [pickupDate, setPickupDate] = useState<Date | undefined>();
  const [pickupTime, setPickupTime] = useState<string | undefined>();

  const [dropoffDate, setDropoffDate] = useState<Date | undefined>();
  const [dropoffTime, setDropoffTime] = useState<string | undefined>();

  const handleSearch = () => {
    const searchParams = new URLSearchParams();

    if (query.trim()) {
      searchParams.set('q', query.trim());
    }

    if (pickupDate) {
      searchParams.set('pickup_date', pickupDate.toISOString().split('T')[0]);
    }

    if (pickupTime) {
      searchParams.set('pickup_time', pickupTime);
    }

    if (dropoffDate) {
      searchParams.set('dropoff_date', dropoffDate.toISOString().split('T')[0]);
    }

    if (dropoffTime) {
      searchParams.set('dropoff_time', dropoffTime);
    }

    const searchString = searchParams.toString();
    router.push(`/rent${searchString ? `?${searchString}` : ''}`);
  };

  return (
    <motion.div
      className='bg-white/95 backdrop-blur-md rounded-2xl md:rounded-full shadow-2xl border border-gray-100/50 font-montserrat'
      whileHover={{
        scale: 1.02,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Desktop Layout */}
      <div className='hidden md:flex items-center gap-6 justify-between px-6 py-4'>
        <div className='flex-1 min-w-0 relative z-10'>
          <ActionSearchBar query={query} setQuery={setQuery} />
        </div>

        <div className='relative flex flex-col items-center text-xs text-gray-500'>
          <label className='absolute text-gray-700 z-50 -top-7 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium shadow-sm border border-gray-100'>
            Pick up
          </label>
          <DatePicker
            width='120px'
            minDate={today}
            date={pickupDate}
            time={pickupTime}
            onSelectTime={(time) => setPickupTime(time)}
            onSelectDate={(date) => setPickupDate(date)}
          />
        </div>

        <div className='relative flex flex-col items-center text-xs text-gray-500'>
          <label className='absolute text-gray-700 z-50 -top-7 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium shadow-sm border border-gray-100'>
            Drop off
          </label>
          <DatePicker
            width='120px'
            minDate={pickupDate}
            minTime={pickupTime}
            date={dropoffDate}
            time={dropoffTime}
            onSelectTime={(time) => setDropoffTime(time)}
            onSelectDate={(date) => setDropoffDate(date)}
          />
        </div>

        <AnimateIcon animateOnHover>
          <ShimmerButton
            shimmerSize='2px'
            background='var(--primary)'
            borderRadius='50%'
            className='shadow-xl hover:shadow-2xl w-14 h-14 p-0 transition-shadow duration-300'
            onClick={handleSearch}
          >
            <SearchIcon />
          </ShimmerButton>
        </AnimateIcon>
      </div>

      {/* Mobile Layout */}
      <div className='md:hidden p-6 space-y-6'>
        <div className='w-full relative z-10'>
          <ActionSearchBar query={query} setQuery={setQuery} />
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div className='relative'>
            <label className='block text-gray-700 text-sm font-medium mb-2'>Pick up</label>
            <DatePicker
              width='100%'
              minDate={today}
              date={pickupDate}
              time={pickupTime}
              onSelectTime={(time) => setPickupTime(time)}
              onSelectDate={(date) => setPickupDate(date)}
            />
          </div>

          <div className='relative'>
            <label className='block text-gray-700 text-sm font-medium mb-2'>Drop off</label>
            <DatePicker
              width='100%'
              minDate={pickupDate}
              minTime={pickupTime}
              date={dropoffDate}
              time={dropoffTime}
              onSelectTime={(time) => setDropoffTime(time)}
              onSelectDate={(date) => setDropoffDate(date)}
            />
          </div>
        </div>

        <div className='flex justify-center pt-2'>
          <AnimateIcon animateOnHover>
            <ShimmerButton
              shimmerSize='2px'
              background='var(--primary)'
              borderRadius='12px'
              className='shadow-xl hover:shadow-2xl px-8 py-4 transition-shadow duration-300'
              onClick={handleSearch}
            >
              <div className='flex items-center gap-2'>
                <SearchIcon className='w-5 h-5' />
                <span className='text-white font-medium'>Search</span>
              </div>
            </ShimmerButton>
          </AnimateIcon>
        </div>
      </div>
    </motion.div>
  );
}
