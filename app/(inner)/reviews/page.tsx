'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, Filter, Search, Calendar, User, Car, MapPin, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

// Mock reviews data
const reviewsData = [
  {
    id: 'REV001',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612bb75?w=60&h=60&fit=crop&crop=face',
      location: 'Dubai, UAE',
      reviewCount: 12,
      memberSince: '2022-03-15',
    },
    car: {
      name: '2023 BMW X5',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=120&h=80&fit=crop',
      year: 2023,
      category: 'SUV',
    },
    rating: 5,
    date: '2024-01-15',
    title: 'Exceptional service and premium vehicle',
    content: 'The BMW X5 exceeded all my expectations. Immaculately clean, perfect condition, and the pickup service was prompt and professional. The car performed flawlessly during our family trip to Abu Dhabi. Highly recommend for anyone looking for a premium SUV experience.',
    helpful: 24,
    verified: true,
    location: 'Dubai Marina',
    duration: '3 days',
  },
  {
    id: 'REV002',
    user: {
      name: 'Ahmed Al-Rashid',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
      location: 'Abu Dhabi, UAE',
      reviewCount: 8,
      memberSince: '2021-11-20',
    },
    car: {
      name: '2022 Mercedes C-Class',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=120&h=80&fit=crop',
      year: 2022,
      category: 'Sedan',
    },
    rating: 4,
    date: '2024-01-12',
    title: 'Great car, minor issues with pickup timing',
    content: 'The Mercedes C-Class was in excellent condition with all the features working perfectly. The only issue was a 30-minute delay in pickup, but the staff apologized and provided excellent service throughout. The car was comfortable for business meetings around the city.',
    helpful: 18,
    verified: true,
    location: 'Business Bay',
    duration: '2 days',
  },
  {
    id: 'REV003',
    user: {
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
      location: 'London, UK',
      reviewCount: 3,
      memberSince: '2023-08-10',
    },
    car: {
      name: '2021 Audi A4',
      image: 'https://images.unsplash.com/photo-1606016159991-5de7a9fa2c2e?w=120&h=80&fit=crop',
      year: 2021,
      category: 'Sedan',
    },
    rating: 5,
    date: '2024-01-08',
    title: 'Perfect for exploring Dubai',
    content: 'As a tourist, I was impressed by how easy the rental process was. The Audi A4 was perfect for exploring Dubai with excellent GPS and comfortable seating. The fuel efficiency was great for longer trips. Customer service was outstanding and very helpful.',
    helpful: 31,
    verified: true,
    location: 'Jumeirah',
    duration: '7 days',
  },
  {
    id: 'REV004',
    user: {
      name: 'Marco Rossi',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
      location: 'Milan, Italy',
      reviewCount: 15,
      memberSince: '2020-05-22',
    },
    car: {
      name: '2023 Range Rover Evoque',
      image: 'https://images.unsplash.com/photo-1606152421802-db8ffe3c2825?w=120&h=80&fit=crop',
      year: 2023,
      category: 'SUV',
    },
    rating: 4,
    date: '2024-01-05',
    title: 'Luxury experience with professional service',
    content: 'The Range Rover Evoque provided a luxury driving experience. The interior was pristine and the performance was excellent. Only minor complaint was that the car could have been delivered with a fuller tank, but overall a great experience for our business trip.',
    helpful: 19,
    verified: true,
    location: 'DIFC',
    duration: '5 days',
  },
  {
    id: 'REV005',
    user: {
      name: 'Fatima Al-Zahra',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=60&h=60&fit=crop&crop=face',
      location: 'Dubai, UAE',
      reviewCount: 7,
      memberSince: '2022-12-01',
    },
    car: {
      name: '2022 Toyota Camry',
      image: 'https://images.unsplash.com/photo-1606016159991-5de7a9fa2c2e?w=120&h=80&fit=crop',
      year: 2022,
      category: 'Sedan',
    },
    rating: 5,
    date: '2024-01-02',
    title: 'Reliable and economical choice',
    content: 'The Toyota Camry was exactly what we needed for daily commuting. Reliable, fuel-efficient, and comfortable. The hybrid system worked perfectly and helped save on fuel costs. Great value for money and the booking process was seamless.',
    helpful: 16,
    verified: true,
    location: 'Al Qusais',
    duration: '14 days',
  },
];

// Rating summary
const ratingSummary = {
  average: 4.6,
  total: 156,
  breakdown: {
    5: 89,
    4: 42,
    3: 18,
    2: 5,
    1: 2,
  },
};

export default function ReviewsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredReviews = reviewsData.filter(review => {
    const matchesSearch = searchQuery === '' ||
      review.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRating = ratingFilter === 'all' || review.rating.toString() === ratingFilter;

    return matchesSearch && matchesRating;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'sm') => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    return (
      <div className='flex items-center gap-1'>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${sizeClasses[size]} ${
              i < rating ? 'text-gray-400 fill-current' : 'text-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <main className='min-h-screen bg-white font-montserrat py-20'>
      <div className='max-w-6xl mx-auto px-6 lg:px-8'>
        {/* Header */}
        <motion.header
          className='text-center py-16 mb-12'
          variants={headerVariants}
          initial='hidden'
          animate='visible'
        >
          <h1 className='text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight'>
            Customer Reviews
          </h1>
          <p className='text-lg text-gray-500 font-light leading-relaxed max-w-2xl mx-auto'>
            Real experiences from our valued customers who have rented vehicles through YAYAGO
          </p>
        </motion.header>

        {/* Rating Summary */}
        <motion.section
          className='mb-12'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'>
            <div className='grid md:grid-cols-2 gap-8'>
              <div className='text-center'>
                <div className='text-5xl font-light text-gray-900 mb-2'>{ratingSummary.average}</div>
                <div className='mb-2'>{renderStars(Math.floor(ratingSummary.average), 'lg')}</div>
                <p className='text-gray-500 font-light'>{ratingSummary.total} reviews</p>
              </div>

              <div className='space-y-2'>
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = ratingSummary.breakdown[rating as keyof typeof ratingSummary.breakdown];
                  const percentage = (count / ratingSummary.total) * 100;

                  return (
                    <div key={rating} className='flex items-center gap-3'>
                      <div className='flex items-center gap-1 w-12'>
                        <span className='text-sm font-light text-gray-600'>{rating}</span>
                        <Star className='w-3 h-3 text-gray-400 fill-current' />
                      </div>
                      <div className='flex-grow bg-gray-100 rounded-full h-2'>
                        <div
                          className='bg-gray-400 h-2 rounded-full transition-all duration-500'
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className='text-sm font-light text-gray-500 w-8'>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Filters */}
        <motion.section
          className='mb-8'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='bg-white rounded-lg p-6 border border-gray-50 shadow-sm'>
            <div className='grid md:grid-cols-4 gap-4'>
              <div className='relative'>
                <Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                <Input
                  type='text'
                  placeholder='Search reviews...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-10 border-gray-100 focus:border-gray-300 focus:ring-0 font-light'
                />
              </div>

              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className='px-3 py-2 border border-gray-100 rounded-md focus:border-gray-300 focus:ring-0 font-light'
              >
                <option value='all'>All Ratings</option>
                <option value='5'>5 Stars</option>
                <option value='4'>4 Stars</option>
                <option value='3'>3 Stars</option>
                <option value='2'>2 Stars</option>
                <option value='1'>1 Star</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className='px-3 py-2 border border-gray-100 rounded-md focus:border-gray-300 focus:ring-0 font-light'
              >
                <option value='newest'>Newest First</option>
                <option value='oldest'>Oldest First</option>
                <option value='highest'>Highest Rating</option>
                <option value='lowest'>Lowest Rating</option>
                <option value='helpful'>Most Helpful</option>
              </select>

              <Button
                variant='outline'
                className='gap-2 border-gray-200 hover:border-gray-300 font-light'
              >
                <Filter size={16} />
                More Filters
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Reviews List */}
        <div className='space-y-6'>
          {sortedReviews.map((review, index) => (
            <motion.div
              key={review.id}
              className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm hover:shadow-md transition-all duration-300'
              variants={cardVariants}
              initial='hidden'
              whileInView='visible'
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className='flex gap-6'>
                {/* User Avatar */}
                <div className='flex-shrink-0'>
                  <div className='w-12 h-12 rounded-full overflow-hidden border-2 border-gray-100'>
                    <Image
                      src={review.user.avatar}
                      alt={review.user.name}
                      width={48}
                      height={48}
                      className='w-full h-full object-cover'
                    />
                  </div>
                </div>

                {/* Review Content */}
                <div className='flex-grow'>
                  <div className='flex items-start justify-between mb-4'>
                    <div>
                      <div className='flex items-center gap-3 mb-2'>
                        <h3 className='font-light text-gray-900'>{review.user.name}</h3>
                        {review.verified && (
                          <Badge className='bg-green-50 text-green-700 border-0 text-xs font-light'>
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className='flex items-center gap-4 text-sm text-gray-500 mb-2'>
                        <div className='flex items-center gap-1'>
                          <User className='w-4 h-4' />
                          <span>{review.user.location}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Calendar className='w-4 h-4' />
                          <span>{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className='flex items-center gap-2 mb-4'>
                        {renderStars(review.rating, 'sm')}
                        <span className='text-sm font-light text-gray-600'>
                          {review.rating}/5
                        </span>
                      </div>
                    </div>

                    <Button variant='ghost' size='sm' className='text-gray-400 hover:text-gray-600'>
                      <MoreHorizontal size={16} />
                    </Button>
                  </div>

                  <h4 className='text-lg font-light text-gray-900 mb-3'>{review.title}</h4>
                  <p className='text-gray-700 font-light leading-relaxed mb-4'>{review.content}</p>

                  {/* Car Info */}
                  <div className='flex items-center gap-4 mb-4 p-4 bg-gray-50 rounded-lg'>
                    <div className='w-16 h-12 rounded overflow-hidden'>
                      <Image
                        src={review.car.image}
                        alt={review.car.name}
                        width={64}
                        height={48}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div className='flex-grow'>
                      <p className='font-light text-gray-900'>{review.car.name}</p>
                      <div className='flex items-center gap-4 text-xs text-gray-500'>
                        <div className='flex items-center gap-1'>
                          <Car className='w-3 h-3' />
                          <span>{review.car.category}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <MapPin className='w-3 h-3' />
                          <span>{review.location}</span>
                        </div>
                        <span>{review.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Review Actions */}
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='gap-2 text-gray-500 hover:text-gray-700 font-light'
                      >
                        <ThumbsUp size={14} />
                        Helpful ({review.helpful})
                      </Button>
                    </div>
                    <div className='text-xs text-gray-400 font-light'>
                      {review.user.reviewCount} reviews • Member since{' '}
                      {new Date(review.user.memberSince).getFullYear()}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {sortedReviews.length === 0 && (
          <motion.div
            className='text-center py-16'
            variants={cardVariants}
            initial='hidden'
            animate='visible'
          >
            <div className='w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6'>
              <Star className='w-12 h-12 text-gray-300' />
            </div>
            <h3 className='text-xl font-light text-gray-900 mb-2'>No reviews found</h3>
            <p className='text-gray-500 font-light mb-6'>
              Try adjusting your search criteria or filters.
            </p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setRatingFilter('all');
              }}
              variant='outline'
              className='border-gray-200 hover:border-gray-300 font-light'
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Load More */}
        {sortedReviews.length > 0 && (
          <motion.div
            className='text-center mt-12'
            variants={cardVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
          >
            <Button
              variant='outline'
              className='border-gray-200 hover:border-gray-300 font-light px-8'
            >
              Load More Reviews
            </Button>
          </motion.div>
        )}

        {/* Write Review CTA */}
        <motion.section
          className='mt-16'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='bg-gray-50 rounded-lg p-8 text-center'>
            <h3 className='text-2xl font-light text-gray-900 mb-4'>Share Your Experience</h3>
            <p className='text-gray-500 font-light mb-6 max-w-lg mx-auto'>
              Help other customers make informed decisions by sharing your rental experience
            </p>
            <Link href='/my-bookings'>
              <Button className='bg-gray-900 hover:bg-gray-800 text-white font-light px-8'>
                Write a Review
              </Button>
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  );
}