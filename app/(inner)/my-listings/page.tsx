'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit3, Eye, Pause, Play, Trash2, Star, Calendar, DollarSign, BarChart3, Settings, Camera } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

// Mock listings data
const listingsData = [
  {
    id: 'CAR001',
    name: '2023 BMW X5',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
    ],
    category: 'SUV',
    year: 2023,
    location: 'Dubai Marina',
    price: {
      daily: 280,
      weekly: 1800,
      monthly: 6500,
    },
    status: 'active',
    rating: 4.9,
    totalBookings: 24,
    earnings: 8420,
    availability: 'available',
    features: ['GPS', 'Bluetooth', 'Backup Camera', 'Leather Seats'],
    lastBooked: '2024-01-18',
    views: 156,
  },
  {
    id: 'CAR002',
    name: '2022 Mercedes C-Class',
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop',
    ],
    category: 'Sedan',
    year: 2022,
    location: 'Business Bay',
    price: {
      daily: 220,
      weekly: 1400,
      monthly: 5200,
    },
    status: 'paused',
    rating: 4.7,
    totalBookings: 18,
    earnings: 6240,
    availability: 'maintenance',
    features: ['GPS', 'Sunroof', 'Premium Sound'],
    lastBooked: '2024-01-10',
    views: 98,
  },
  {
    id: 'CAR003',
    name: '2021 Audi A4',
    images: [
      'https://images.unsplash.com/photo-1606016159991-5de7a9fa2c2e?w=400&h=250&fit=crop',
    ],
    category: 'Sedan',
    year: 2021,
    location: 'Jumeirah',
    price: {
      daily: 180,
      weekly: 1150,
      monthly: 4200,
    },
    status: 'draft',
    rating: 0,
    totalBookings: 0,
    earnings: 0,
    availability: 'pending_approval',
    features: ['GPS', 'Parking Sensors'],
    lastBooked: null,
    views: 12,
  },
];

export default function MyListingsPage() {
  const [filter, setFilter] = useState('all');

  const filteredListings = listingsData.filter(listing => {
    if (filter === 'all') return true;
    return listing.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-50 text-green-700 border-0';
      case 'paused':
        return 'bg-orange-50 text-orange-700 border-0';
      case 'draft':
        return 'bg-gray-50 text-gray-700 border-0';
      default:
        return 'bg-gray-50 text-gray-700 border-0';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'bg-green-50 text-green-700 border-0';
      case 'booked':
        return 'bg-blue-50 text-blue-700 border-0';
      case 'maintenance':
        return 'bg-orange-50 text-orange-700 border-0';
      case 'pending_approval':
        return 'bg-yellow-50 text-yellow-700 border-0';
      default:
        return 'bg-gray-50 text-gray-700 border-0';
    }
  };

  return (
    <main className='min-h-screen bg-white font-montserrat py-20'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
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
                My Listings
              </h1>
              <p className='text-lg text-gray-500 font-light leading-relaxed'>
                Manage your vehicle listings and track their performance
              </p>
            </div>
            <div className='mt-6 md:mt-0'>
              <Link href='/listing'>
                <Button className='gap-2 bg-gray-900 hover:bg-gray-800 text-white font-light'>
                  <Plus size={16} />
                  Add New Listing
                </Button>
              </Link>
            </div>
          </div>
        </motion.header>

        {/* Summary Stats */}
        <motion.section
          className='mb-12'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {[
              {
                title: 'Total Listings',
                value: listingsData.length.toString(),
                icon: <Eye className='w-6 h-6' />,
              },
              {
                title: 'Active Listings',
                value: listingsData.filter(l => l.status === 'active').length.toString(),
                icon: <Play className='w-6 h-6' />,
              },
              {
                title: 'Total Earnings',
                value: `${listingsData.reduce((sum, l) => sum + l.earnings, 0).toLocaleString()} AED`,
                icon: <DollarSign className='w-6 h-6' />,
              },
              {
                title: 'Total Bookings',
                value: listingsData.reduce((sum, l) => sum + l.totalBookings, 0).toString(),
                icon: <Calendar className='w-6 h-6' />,
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'
                variants={cardVariants}
                initial='hidden'
                whileInView='visible'
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className='flex items-center gap-3 mb-4'>
                  <div className='flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full text-gray-600'>
                    {stat.icon}
                  </div>
                </div>
                <h3 className='text-sm font-light text-gray-600 mb-2'>{stat.title}</h3>
                <p className='text-2xl font-light text-gray-900'>{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Filter Tabs */}
        <motion.section
          className='mb-8'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='flex gap-2 bg-white rounded-lg p-2 border border-gray-50 shadow-sm w-fit'>
            {[
              { key: 'all', label: 'All Listings' },
              { key: 'active', label: 'Active' },
              { key: 'paused', label: 'Paused' },
              { key: 'draft', label: 'Draft' },
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                className={`px-6 py-2 text-sm font-light rounded-lg transition-colors ${
                  filter === filterOption.key
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Listings Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {filteredListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              className='bg-white rounded-lg overflow-hidden border border-gray-50 shadow-sm hover:shadow-md transition-all duration-300 group'
              variants={cardVariants}
              initial='hidden'
              whileInView='visible'
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              {/* Car Image */}
              <div className='relative h-48 bg-gray-100 overflow-hidden'>
                <Image
                  src={listing.images[0]}
                  alt={listing.name}
                  fill
                  className='object-cover group-hover:scale-105 transition-transform duration-300'
                  sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                />

                {/* Status Badges */}
                <div className='absolute top-4 right-4 flex flex-col gap-2'>
                  <Badge className={`text-xs font-light ${getStatusColor(listing.status)}`}>
                    {listing.status}
                  </Badge>
                  <Badge className={`text-xs font-light ${getAvailabilityColor(listing.availability)}`}>
                    {listing.availability.replace('_', ' ')}
                  </Badge>
                </div>

                {/* Image Count */}
                {listing.images.length > 1 && (
                  <div className='absolute bottom-4 left-4 px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-light rounded-full flex items-center gap-1'>
                    <Camera size={10} />
                    {listing.images.length}
                  </div>
                )}
              </div>

              {/* Listing Details */}
              <div className='p-6'>
                <div className='mb-4'>
                  <h3 className='text-xl font-light text-gray-900 mb-2 group-hover:text-gray-700 transition-colors'>
                    {listing.name}
                  </h3>
                  <div className='flex items-center gap-2 text-sm text-gray-500 mb-3'>
                    <span>{listing.year}</span>
                    <span>•</span>
                    <span>{listing.category}</span>
                    <span>•</span>
                    <span>{listing.location}</span>
                  </div>

                  {/* Stats */}
                  <div className='grid grid-cols-2 gap-4 mb-4'>
                    <div className='text-center'>
                      <p className='text-sm text-gray-400 font-light'>Rating</p>
                      <div className='flex items-center justify-center gap-1'>
                        <Star className='w-4 h-4 text-gray-400 fill-current' />
                        <span className='text-sm font-light text-gray-900'>
                          {listing.rating > 0 ? listing.rating : 'New'}
                        </span>
                      </div>
                    </div>
                    <div className='text-center'>
                      <p className='text-sm text-gray-400 font-light'>Views</p>
                      <p className='text-sm font-light text-gray-900'>{listing.views}</p>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className='mb-4'>
                    <p className='text-sm text-gray-400 font-light mb-1'>Daily Rate</p>
                    <p className='text-lg font-light text-gray-900'>{listing.price.daily} AED</p>
                  </div>

                  {/* Performance */}
                  <div className='grid grid-cols-2 gap-4 mb-6'>
                    <div>
                      <p className='text-xs text-gray-400 font-light'>Bookings</p>
                      <p className='text-sm font-light text-gray-900'>{listing.totalBookings}</p>
                    </div>
                    <div>
                      <p className='text-xs text-gray-400 font-light'>Earnings</p>
                      <p className='text-sm font-light text-gray-900'>{listing.earnings.toLocaleString()} AED</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='flex gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='flex-1 border-gray-200 hover:border-gray-300 font-light gap-2'
                  >
                    <Edit3 size={14} />
                    Edit
                  </Button>

                  {listing.status === 'active' ? (
                    <Button
                      variant='outline'
                      size='sm'
                      className='border-gray-200 hover:border-gray-300 font-light'
                    >
                      <Pause size={14} />
                    </Button>
                  ) : (
                    <Button
                      variant='outline'
                      size='sm'
                      className='border-gray-200 hover:border-gray-300 font-light'
                    >
                      <Play size={14} />
                    </Button>
                  )}

                  <Button
                    variant='outline'
                    size='sm'
                    className='border-gray-200 hover:border-gray-300 font-light'
                  >
                    <BarChart3 size={14} />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredListings.length === 0 && (
          <motion.div
            className='text-center py-16'
            variants={cardVariants}
            initial='hidden'
            animate='visible'
          >
            <div className='w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6'>
              <Eye className='w-12 h-12 text-gray-300' />
            </div>
            <h3 className='text-xl font-light text-gray-900 mb-2'>No listings found</h3>
            <p className='text-gray-500 font-light mb-6'>
              {filter === 'all'
                ? "You haven't created any listings yet."
                : `No ${filter} listings to show.`
              }
            </p>
            <div className='flex gap-4 justify-center'>
              {filter !== 'all' && (
                <Button
                  onClick={() => setFilter('all')}
                  variant='outline'
                  className='border-gray-200 hover:border-gray-300 font-light'
                >
                  View All Listings
                </Button>
              )}
              <Link href='/listing'>
                <Button className='bg-gray-900 hover:bg-gray-800 text-white font-light gap-2'>
                  <Plus size={16} />
                  Create Your First Listing
                </Button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Quick Tips */}
        {listingsData.length > 0 && (
          <motion.section
            className='mt-16'
            variants={cardVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
          >
            <div className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'>
              <h3 className='text-xl font-light text-gray-900 mb-6'>Tips to Improve Your Listings</h3>
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {[
                  {
                    title: 'Add More Photos',
                    description: 'Listings with 5+ photos get 40% more bookings',
                    icon: <Camera className='w-5 h-5' />,
                  },
                  {
                    title: 'Competitive Pricing',
                    description: 'Check similar cars in your area for optimal pricing',
                    icon: <DollarSign className='w-5 h-5' />,
                  },
                  {
                    title: 'Quick Responses',
                    description: 'Respond to inquiries within 1 hour for higher bookings',
                    icon: <Settings className='w-5 h-5' />,
                  },
                ].map((tip, index) => (
                  <div key={tip.title} className='flex items-start gap-3'>
                    <div className='flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full text-gray-600 flex-shrink-0'>
                      {tip.icon}
                    </div>
                    <div>
                      <h4 className='font-light text-gray-900 mb-1'>{tip.title}</h4>
                      <p className='text-sm text-gray-500 font-light leading-relaxed'>{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </div>
    </main>
  );
}