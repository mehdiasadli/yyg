'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Car, Clock, MapPin, Phone, MessageCircle, Star, Filter, Search, Download, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

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

// Mock bookings data
const bookingsData = [
  {
    id: 'BK001',
    car: {
      name: '2023 BMW X5',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop',
      year: 2023,
      category: 'SUV',
    },
    owner: {
      name: 'Ahmed Al-Rashid',
      rating: 4.9,
      phone: '+971 50 123 4567',
    },
    dates: {
      start: '2024-01-25',
      end: '2024-01-28',
      startTime: '10:00',
      endTime: '18:00',
    },
    location: {
      pickup: 'Dubai Marina Mall',
      dropoff: 'Dubai Marina Mall',
    },
    amount: 850,
    status: 'upcoming',
    bookingDate: '2024-01-20',
  },
  {
    id: 'BK002',
    car: {
      name: '2022 Mercedes C-Class',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop',
      year: 2022,
      category: 'Sedan',
    },
    owner: {
      name: 'Sarah Johnson',
      rating: 4.8,
      phone: '+971 55 987 6543',
    },
    dates: {
      start: '2024-01-15',
      end: '2024-01-18',
      startTime: '09:00',
      endTime: '19:00',
    },
    location: {
      pickup: 'Dubai International Airport',
      dropoff: 'Dubai International Airport',
    },
    amount: 650,
    status: 'completed',
    bookingDate: '2024-01-10',
    rating: 5,
  },
  {
    id: 'BK003',
    car: {
      name: '2023 Audi A4',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop',
      year: 2023,
      category: 'Sedan',
    },
    owner: {
      name: 'Marco Rossi',
      rating: 4.7,
      phone: '+971 56 456 7890',
    },
    dates: {
      start: '2024-01-05',
      end: '2024-01-08',
      startTime: '08:00',
      endTime: '20:00',
    },
    location: {
      pickup: 'Business Bay Metro',
      dropoff: 'Business Bay Metro',
    },
    amount: 420,
    status: 'completed',
    bookingDate: '2024-01-01',
    rating: 4,
  },
  {
    id: 'BK004',
    car: {
      name: '2021 Toyota Camry',
      image: 'https://images.unsplash.com/photo-1606016159991-5de7a9fa2c2e?w=400&h=250&fit=crop',
      year: 2021,
      category: 'Sedan',
    },
    owner: {
      name: 'Emma Wilson',
      rating: 4.9,
      phone: '+971 52 321 9876',
    },
    dates: {
      start: '2023-12-20',
      end: '2023-12-23',
      startTime: '11:00',
      endTime: '17:00',
    },
    location: {
      pickup: 'Mall of the Emirates',
      dropoff: 'Mall of the Emirates',
    },
    amount: 380,
    status: 'cancelled',
    bookingDate: '2023-12-15',
  },
];

export default function MyBookingsPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookings = bookingsData.filter(booking => {
    const matchesFilter = filter === 'all' || booking.status === filter;
    const matchesSearch = searchQuery === '' ||
      booking.car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.owner.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-50 text-blue-700 border-0';
      case 'completed':
        return 'bg-green-50 text-green-700 border-0';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-0';
      default:
        return 'bg-gray-50 text-gray-700 border-0';
    }
  };

  return (
    <main className='min-h-screen bg-white font-montserrat py-20'>
      <div className='max-w-6xl mx-auto px-6 lg:px-8'>
        {/* Header */}
        <motion.header
          className='mb-12'
          variants={headerVariants}
          initial='hidden'
          animate='visible'
        >
          <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
            <div>
              <h1 className='text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight'>
                My Bookings
              </h1>
              <p className='text-lg text-gray-500 font-light leading-relaxed'>
                View and manage your rental history and upcoming trips
              </p>
            </div>
            <div className='mt-6 md:mt-0'>
              <Button
                variant='outline'
                className='gap-2 border-gray-200 hover:border-gray-300 font-light'
              >
                <Download size={16} />
                Export History
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Filter and Search */}
        <motion.section
          className='mb-8'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='bg-white rounded-lg p-6 border border-gray-50 shadow-sm'>
            <div className='grid md:grid-cols-2 gap-4'>
              <div className='relative'>
                <Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                <Input
                  type='text'
                  placeholder='Search by car or owner name...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-10 border-gray-100 focus:border-gray-300 focus:ring-0 font-light'
                />
              </div>
              <div className='flex gap-2'>
                {[
                  { key: 'all', label: 'All Bookings' },
                  { key: 'upcoming', label: 'Upcoming' },
                  { key: 'completed', label: 'Completed' },
                  { key: 'cancelled', label: 'Cancelled' },
                ].map((filterOption) => (
                  <button
                    key={filterOption.key}
                    onClick={() => setFilter(filterOption.key)}
                    className={`px-4 py-2 text-sm font-light rounded-lg transition-colors ${
                      filter === filterOption.key
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {filterOption.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Bookings List */}
        <div className='space-y-6'>
          {filteredBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm hover:shadow-md transition-all duration-300'
              variants={cardVariants}
              initial='hidden'
              whileInView='visible'
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -2 }}
            >
              <div className='flex flex-col lg:flex-row gap-6'>
                {/* Car Image */}
                <div className='lg:w-80 h-48 relative rounded-lg overflow-hidden bg-gray-100'>
                  <Image
                    src={booking.car.image}
                    alt={booking.car.name}
                    fill
                    className='object-cover'
                    sizes='(max-width: 1024px) 100vw, 320px'
                  />
                  <div className='absolute top-4 right-4'>
                    <Badge className={`text-xs font-light ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </Badge>
                  </div>
                </div>

                {/* Booking Details */}
                <div className='flex-grow'>
                  <div className='flex flex-col md:flex-row md:items-start md:justify-between mb-6'>
                    <div>
                      <h3 className='text-2xl font-light text-gray-900 mb-2'>{booking.car.name}</h3>
                      <div className='flex items-center gap-4 text-sm text-gray-500 mb-4'>
                        <span>{booking.car.year}</span>
                        <span>•</span>
                        <span>{booking.car.category}</span>
                        <span>•</span>
                        <span>Booking #{booking.id}</span>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='text-2xl font-light text-gray-900 mb-1'>{booking.amount} AED</p>
                      <p className='text-sm text-gray-500 font-light'>Total Amount</p>
                    </div>
                  </div>

                  <div className='grid md:grid-cols-2 gap-6'>
                    {/* Dates and Times */}
                    <div className='space-y-4'>
                      <div>
                        <h4 className='text-sm font-light text-gray-600 mb-2'>Rental Period</h4>
                        <div className='flex items-center gap-2 text-gray-900 font-light'>
                          <Calendar className='w-4 h-4 text-gray-400' />
                          <span>
                            {new Date(booking.dates.start).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })} - {new Date(booking.dates.end).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className='text-sm font-light text-gray-600 mb-2'>Pickup & Drop-off</h4>
                        <div className='flex items-center gap-2 text-gray-900 font-light'>
                          <MapPin className='w-4 h-4 text-gray-400' />
                          <span>{booking.location.pickup}</span>
                        </div>
                      </div>
                    </div>

                    {/* Owner Details */}
                    <div className='space-y-4'>
                      <div>
                        <h4 className='text-sm font-light text-gray-600 mb-2'>Car Owner</h4>
                        <div className='flex items-center gap-3'>
                          <div className='w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center'>
                            <span className='text-sm font-light text-gray-600'>
                              {booking.owner.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className='font-light text-gray-900'>{booking.owner.name}</p>
                            <div className='flex items-center gap-1'>
                              <Star className='w-3 h-3 text-gray-400 fill-current' />
                              <span className='text-xs text-gray-500 font-light'>{booking.owner.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className='flex gap-3'>
                        {booking.status === 'upcoming' && (
                          <>
                            <a
                              href={`tel:${booking.owner.phone}`}
                              className='p-2 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors'
                            >
                              <Phone size={16} className='text-gray-600' />
                            </a>
                            <a
                              href={`https://wa.me/${booking.owner.phone.replace(/[^0-9]/g, '')}`}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='p-2 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors'
                            >
                              <MessageCircle size={16} className='text-gray-600' />
                            </a>
                            <Button
                              variant='outline'
                              className='flex-grow border-gray-200 hover:border-gray-300 font-light'
                            >
                              Modify Booking
                            </Button>
                          </>
                        )}

                        {booking.status === 'completed' && !booking.rating && (
                          <Button
                            className='flex-grow bg-gray-900 hover:bg-gray-800 text-white font-light'
                          >
                            Rate Experience
                          </Button>
                        )}

                        {booking.status === 'completed' && booking.rating && (
                          <div className='flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg'>
                            <span className='text-sm font-light text-gray-600'>Your Rating:</span>
                            <div className='flex items-center gap-1'>
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < booking.rating! ? 'text-gray-400 fill-current' : 'text-gray-200'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {booking.status === 'cancelled' && (
                          <div className='px-4 py-2 bg-red-50 rounded-lg'>
                            <span className='text-sm font-light text-red-700'>Booking Cancelled</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredBookings.length === 0 && (
          <motion.div
            className='text-center py-16'
            variants={cardVariants}
            initial='hidden'
            animate='visible'
          >
            <div className='w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6'>
              <Car className='w-12 h-12 text-gray-300' />
            </div>
            <h3 className='text-xl font-light text-gray-900 mb-2'>No bookings found</h3>
            <p className='text-gray-500 font-light mb-6'>
              {filter === 'all'
                ? "You haven't made any bookings yet."
                : `No ${filter} bookings match your search.`
              }
            </p>
            <Button
              onClick={() => {
                setFilter('all');
                setSearchQuery('');
              }}
              variant='outline'
              className='border-gray-200 hover:border-gray-300 font-light mr-4'
            >
              Clear Filters
            </Button>
            <Button className='bg-gray-900 hover:bg-gray-800 text-white font-light'>
              Browse Cars
            </Button>
          </motion.div>
        )}
      </div>
    </main>
  );
}