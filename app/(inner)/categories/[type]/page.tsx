'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, MapPin, Star, Fuel, Users, Calendar, Search, SlidersHorizontal } from 'lucide-react';
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

// Mock cars data by category
const carsData = {
  sedan: [
    {
      id: 'CAR001',
      name: '2023 BMW 3 Series',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop',
      year: 2023,
      rating: 4.8,
      reviewCount: 24,
      price: 220,
      location: 'Dubai Marina',
      features: ['Automatic', 'GPS', 'Bluetooth', 'AC'],
      fuelType: 'Petrol',
      seats: 5,
      available: true,
      slug: 'bmw-3-series-2023',
    },
    {
      id: 'CAR002',
      name: '2022 Mercedes C-Class',
      image: 'https://images.unsplash.com/photo-1606016159991-5de7a9fa2c2e?w=400&h=250&fit=crop',
      year: 2022,
      rating: 4.9,
      reviewCount: 31,
      price: 280,
      location: 'Business Bay',
      features: ['Automatic', 'Sunroof', 'Premium Sound'],
      fuelType: 'Petrol',
      seats: 5,
      available: true,
      slug: 'mercedes-c-class-2022',
    },
    {
      id: 'CAR003',
      name: '2021 Audi A4',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop',
      year: 2021,
      rating: 4.7,
      reviewCount: 18,
      price: 190,
      location: 'Jumeirah',
      features: ['Automatic', 'GPS', 'Parking Sensors'],
      fuelType: 'Petrol',
      seats: 5,
      available: true,
      slug: 'audi-a4-2021',
    },
  ],
  suv: [
    {
      id: 'CAR004',
      name: '2023 BMW X5',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=250&fit=crop',
      year: 2023,
      rating: 4.9,
      reviewCount: 42,
      price: 380,
      location: 'Dubai Mall',
      features: ['AWD', 'Panoramic Roof', 'Premium Sound'],
      fuelType: 'Petrol',
      seats: 7,
      available: true,
      slug: 'bmw-x5-2023',
    },
    {
      id: 'CAR005',
      name: '2022 Range Rover Evoque',
      image: 'https://images.unsplash.com/photo-1606152421802-db8ffe3c2825?w=400&h=250&fit=crop',
      year: 2022,
      rating: 4.8,
      reviewCount: 29,
      price: 420,
      location: 'Marina Walk',
      features: ['AWD', 'Terrain Response', 'Leather'],
      fuelType: 'Petrol',
      seats: 5,
      available: true,
      slug: 'range-rover-evoque-2022',
    },
  ],
  luxury: [
    {
      id: 'CAR006',
      name: '2023 Mercedes S-Class',
      image: 'https://images.unsplash.com/photo-1606016159991-5de7a9fa2c2e?w=400&h=250&fit=crop',
      year: 2023,
      rating: 5.0,
      reviewCount: 15,
      price: 650,
      location: 'Burj Khalifa',
      features: ['Chauffeur Available', 'Massage Seats', 'Premium Interior'],
      fuelType: 'Petrol',
      seats: 4,
      available: true,
      slug: 'mercedes-s-class-2023',
    },
  ],
  economy: [
    {
      id: 'CAR007',
      name: '2022 Toyota Corolla',
      image: 'https://images.unsplash.com/photo-1606016159991-5de7a9fa2c2e?w=400&h=250&fit=crop',
      year: 2022,
      rating: 4.6,
      reviewCount: 67,
      price: 120,
      location: 'Al Qusais',
      features: ['Economic', 'Reliable', 'GPS'],
      fuelType: 'Petrol',
      seats: 5,
      available: true,
      slug: 'toyota-corolla-2022',
    },
  ],
};

const categoryInfo = {
  sedan: {
    title: 'Sedan Cars',
    description: 'Comfortable and efficient sedans perfect for city driving and business trips',
    icon: '🚗',
  },
  suv: {
    title: 'SUV & 4WD',
    description: 'Spacious SUVs ideal for families and adventure trips with extra storage',
    icon: '🚙',
  },
  luxury: {
    title: 'Luxury Cars',
    description: 'Premium vehicles for special occasions and executive transportation',
    icon: '✨',
  },
  economy: {
    title: 'Economy Cars',
    description: 'Budget-friendly options for everyday transportation and cost-conscious travelers',
    icon: '💰',
  },
};

interface CategoryPageProps {
  params: {
    type: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('price');

  const categoryType = params.type as keyof typeof carsData;
  const cars = carsData[categoryType] || [];
  const category = categoryInfo[categoryType];

  const filteredCars = cars.filter(car => {
    const matchesSearch = searchQuery === '' ||
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPrice = priceFilter === 'all' ||
      (priceFilter === 'budget' && car.price <= 150) ||
      (priceFilter === 'mid' && car.price > 150 && car.price <= 300) ||
      (priceFilter === 'premium' && car.price > 300);

    return matchesSearch && matchesPrice;
  });

  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      case 'year':
        return b.year - a.year;
      default:
        return 0;
    }
  });

  if (!category) {
    return (
      <main className='min-h-screen bg-white font-montserrat py-20 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-3xl font-light text-gray-900 mb-4'>Category Not Found</h1>
          <p className='text-gray-500 font-light'>The category you're looking for doesn't exist.</p>
          <Link href='/rent'>
            <Button className='mt-6 bg-gray-900 hover:bg-gray-800 text-white font-light'>
              Browse All Cars
            </Button>
          </Link>
        </div>
      </main>
    );
  }

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
          <div className='text-center mb-8'>
            <div className='text-6xl mb-4'>{category.icon}</div>
            <h1 className='text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight'>
              {category.title}
            </h1>
            <p className='text-lg text-gray-500 font-light leading-relaxed max-w-2xl mx-auto'>
              {category.description}
            </p>
          </div>

          <div className='flex flex-col md:flex-row gap-4 justify-center items-center'>
            <div className='text-center'>
              <span className='text-2xl font-light text-gray-900'>{sortedCars.length}</span>
              <p className='text-sm text-gray-500 font-light'>Available Cars</p>
            </div>
            <div className='hidden md:block w-px h-12 bg-gray-200' />
            <div className='text-center'>
              <span className='text-2xl font-light text-gray-900'>
                {sortedCars.length > 0 ? `${Math.min(...sortedCars.map(c => c.price))} - ${Math.max(...sortedCars.map(c => c.price))}` : '0'} AED
              </span>
              <p className='text-sm text-gray-500 font-light'>Price Range</p>
            </div>
          </div>
        </motion.header>

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
                  placeholder='Search cars or locations...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-10 border-gray-100 focus:border-gray-300 focus:ring-0 font-light'
                />
              </div>

              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className='px-3 py-2 border border-gray-100 rounded-md focus:border-gray-300 focus:ring-0 font-light'
              >
                <option value='all'>All Prices</option>
                <option value='budget'>Budget (≤150 AED)</option>
                <option value='mid'>Mid-range (150-300 AED)</option>
                <option value='premium'>Premium (≥300 AED)</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className='px-3 py-2 border border-gray-100 rounded-md focus:border-gray-300 focus:ring-0 font-light'
              >
                <option value='price'>Sort by Price</option>
                <option value='rating'>Sort by Rating</option>
                <option value='year'>Sort by Year</option>
              </select>

              <Button
                variant='outline'
                className='gap-2 border-gray-200 hover:border-gray-300 font-light'
              >
                <SlidersHorizontal size={16} />
                More Filters
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Cars Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {sortedCars.map((car, index) => (
            <motion.div
              key={car.id}
              className='bg-white rounded-lg overflow-hidden border border-gray-50 shadow-sm hover:shadow-md transition-all duration-300 group'
              variants={cardVariants}
              initial='hidden'
              whileInView='visible'
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <Link href={`/rent/${car.slug}`}>
                <div className='relative h-48 bg-gray-100 overflow-hidden'>
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-300'
                    sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                  />
                  {car.available && (
                    <div className='absolute top-4 right-4'>
                      <Badge className='bg-green-50 text-green-700 border-0 text-xs font-light'>
                        Available
                      </Badge>
                    </div>
                  )}
                </div>

                <div className='p-6'>
                  <div className='mb-4'>
                    <h3 className='text-xl font-light text-gray-900 mb-2 group-hover:text-gray-700 transition-colors'>
                      {car.name}
                    </h3>
                    <div className='flex items-center gap-2 text-sm text-gray-500 mb-3'>
                      <MapPin className='w-4 h-4' />
                      <span>{car.location}</span>
                    </div>

                    <div className='flex items-center gap-4 mb-4'>
                      <div className='flex items-center gap-1'>
                        <Star className='w-4 h-4 text-gray-400 fill-current' />
                        <span className='text-sm font-light text-gray-900'>{car.rating}</span>
                        <span className='text-xs text-gray-400'>({car.reviewCount})</span>
                      </div>
                      <div className='flex items-center gap-1 text-sm text-gray-500'>
                        <Users className='w-4 h-4' />
                        <span>{car.seats} seats</span>
                      </div>
                      <div className='flex items-center gap-1 text-sm text-gray-500'>
                        <Fuel className='w-4 h-4' />
                        <span>{car.fuelType}</span>
                      </div>
                    </div>

                    <div className='flex flex-wrap gap-2 mb-4'>
                      {car.features.slice(0, 3).map((feature) => (
                        <Badge key={feature} className='bg-gray-50 text-gray-600 border-0 text-xs font-light'>
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-2xl font-light text-gray-900'>{car.price} AED</p>
                      <p className='text-xs text-gray-400 font-light'>per day</p>
                    </div>
                    <Button className='bg-gray-900 hover:bg-gray-800 text-white font-light'>
                      Book Now
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {sortedCars.length === 0 && (
          <motion.div
            className='text-center py-16'
            variants={cardVariants}
            initial='hidden'
            animate='visible'
          >
            <div className='w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6'>
              <Search className='w-12 h-12 text-gray-300' />
            </div>
            <h3 className='text-xl font-light text-gray-900 mb-2'>No cars found</h3>
            <p className='text-gray-500 font-light mb-6'>
              Try adjusting your filters or search for different criteria.
            </p>
            <div className='flex gap-4 justify-center'>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setPriceFilter('all');
                }}
                variant='outline'
                className='border-gray-200 hover:border-gray-300 font-light'
              >
                Clear Filters
              </Button>
              <Link href='/rent'>
                <Button className='bg-gray-900 hover:bg-gray-800 text-white font-light'>
                  Browse All Cars
                </Button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Category Navigation */}
        <motion.section
          className='mt-16'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'>
            <h3 className='text-xl font-light text-gray-900 mb-6 text-center'>Explore Other Categories</h3>
            <div className='grid md:grid-cols-4 gap-6'>
              {Object.entries(categoryInfo)
                .filter(([key]) => key !== categoryType)
                .map(([key, info]) => (
                  <Link key={key} href={`/categories/${key}`}>
                    <div className='text-center p-6 border border-gray-50 rounded-lg hover:shadow-md transition-all duration-300 group'>
                      <div className='text-4xl mb-3'>{info.icon}</div>
                      <h4 className='font-light text-gray-900 mb-2 group-hover:text-gray-700 transition-colors'>
                        {info.title}
                      </h4>
                      <p className='text-sm text-gray-500 font-light leading-relaxed'>
                        {carsData[key as keyof typeof carsData]?.length || 0} cars available
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}