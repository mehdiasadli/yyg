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
      className='bg-slate-900/40 backdrop-blur-2xl rounded-[2rem] shadow-[0_20px_70px_-10px_rgba(0,0,0,0.3)] border border-white/10 font-montserrat relative overflow-visible'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      {/* Elegant dark background with subtle gradients */}
      <div className='absolute inset-0 bg-gradient-to-br from-slate-900/50 via-gray-900/40 to-black/50 rounded-[2rem]' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.1)_0%,_transparent_50%)] rounded-[2rem]' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(168,85,247,0.08)_0%,_transparent_50%)] rounded-[2rem]' />

      {/* Desktop Layout */}
      <div className='hidden md:flex items-center gap-0 relative'>
        {/* Search Input Section */}
        <div className='flex-[2.5] p-8 relative z-20'>
          <ActionSearchBar query={query} setQuery={setQuery} />
        </div>

        {/* Vertical Divider */}
        <div className='w-px bg-gradient-to-b from-transparent via-white/10 to-transparent my-6' />

        {/* Pick Up Section */}
        <div className='flex-1 p-8'>
          <label className='text-white/60 text-xs font-light mb-2 block tracking-wide uppercase'>Pick up</label>
          <DatePicker
            width='100%'
            minDate={today}
            date={pickupDate}
            time={pickupTime}
            onSelectTime={(time) => setPickupTime(time)}
            onSelectDate={(date) => setPickupDate(date)}
            placeholder='Pick a date'
          />
        </div>

        {/* Vertical Divider */}
        <div className='w-px bg-gradient-to-b from-transparent via-white/10 to-transparent my-6' />

        {/* Drop Off Section */}
        <div className='flex-1 p-8'>
          <label className='text-white/60 text-xs font-light mb-2 block tracking-wide uppercase'>Drop off</label>
          <DatePicker
            width='100%'
            minDate={pickupDate}
            minTime={pickupTime}
            date={dropoffDate}
            time={dropoffTime}
            onSelectTime={(time) => setDropoffTime(time)}
            onSelectDate={(date) => setDropoffDate(date)}
            placeholder='Pick a date'
          />
        </div>

        {/* Vertical Divider */}
        <div className='w-px bg-gradient-to-b from-transparent via-white/10 to-transparent my-6' />

        {/* Search Button Section */}
        <div className='px-8 py-8 flex items-center justify-center'>
          <AnimateIcon animateOnHover>
            <ShimmerButton
              shimmerSize='3px'
              background='linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.9) 100%)'
              borderRadius='1rem'
              className='shadow-2xl hover:shadow-[0_20px_50px_-10px_rgba(var(--primary-rgb),0.4)] w-14 h-14 p-0 transition-all duration-300 hover:scale-105'
              onClick={handleSearch}
            >
              <SearchIcon className='w-6 h-6' />
            </ShimmerButton>
          </AnimateIcon>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className='md:hidden p-6 space-y-6 relative z-20'>
        <div className='w-full relative'>
          <ActionSearchBar query={query} setQuery={setQuery} />
        </div>

        {/* Elegant horizontal separator */}
        <div className='w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent' />

        <div className='space-y-5'>
          <div className='relative'>
            <label className='block text-white/60 text-xs font-light mb-2 tracking-wide uppercase'>Pick up</label>
            <DatePicker
              width='100%'
              minDate={today}
              date={pickupDate}
              time={pickupTime}
              onSelectTime={(time) => setPickupTime(time)}
              onSelectDate={(date) => setPickupDate(date)}
              placeholder='Pick a date'
            />
          </div>

          <div className='relative'>
            <label className='block text-white/60 text-xs font-light mb-2 tracking-wide uppercase'>Drop off</label>
            <DatePicker
              width='100%'
              minDate={pickupDate}
              minTime={pickupTime}
              date={dropoffDate}
              time={dropoffTime}
              onSelectTime={(time) => setDropoffTime(time)}
              onSelectDate={(date) => setDropoffDate(date)}
              placeholder='Pick a date'
            />
          </div>
        </div>

        {/* Elegant horizontal separator */}
        <div className='w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent' />

        <div className='flex justify-center pt-2'>
          <AnimateIcon animateOnHover>
            <ShimmerButton
              shimmerSize='3px'
              background='linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.9) 100%)'
              borderRadius='1rem'
              className='shadow-2xl hover:shadow-[0_20px_50px_-10px_rgba(var(--primary-rgb),0.4)] px-12 py-4 transition-all duration-300 hover:scale-105'
              onClick={handleSearch}
            >
              <div className='flex items-center gap-3'>
                <SearchIcon className='w-5 h-5' />
                <span className='text-white font-normal tracking-wide'>Search Vehicles</span>
              </div>
            </ShimmerButton>
          </AnimateIcon>
        </div>
      </div>
    </motion.div>
  );
}
