'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation, Star, Filter, Search, Car, Users, Fuel } from 'lucide-react';
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

interface LocationInfo {
  name: string;
  city: string;
  description: string;
  image: string;
  coordinates: { lat: number; lng: number };
  operatingHours: string;
  contactPhone: string;
  features: string[];
  nearbyAttractions: string[];
  carsAvailable: number;
}

interface CityData {
  [locationKey: string]: LocationInfo;
}

interface LocationData {
  [cityKey: string]: CityData;
}

// Mock location data
const locationData: LocationData = {
  dubai: {
    'dubai-marina': {
      name: 'Dubai Marina',
      city: 'Dubai',
      description: 'Premium waterfront district with luxury shopping and dining',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=400&fit=crop',
      coordinates: { lat: 25.0657, lng: 55.1395 },
      operatingHours: '24/7',
      contactPhone: '+971 4 123 4567',
      features: ['24/7 Pickup', 'Valet Service', 'Premium Location', 'Multilingual Staff'],
      nearbyAttractions: ['Marina Walk', 'JBR Beach', 'Dubai Marina Mall', 'Atlantis The Palm'],
      carsAvailable: 45,
    },
    'business-bay': {
      name: 'Business Bay',
      city: 'Dubai',
      description: 'Central business district with modern skyscrapers and corporate facilities',
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=400&fit=crop',
      coordinates: { lat: 25.1888, lng: 55.2630 },
      operatingHours: '6:00 AM - 12:00 AM',
      contactPhone: '+971 4 234 5678',
      features: ['Business Center', 'Fast Track Service', 'Corporate Rates', 'Airport Transfer'],
      nearbyAttractions: ['Burj Khalifa', 'Dubai Mall', 'Business Bay Bridge', 'Dubai Canal'],
      carsAvailable: 32,
    },
    'jumeirah': {
      name: 'Jumeirah',
      city: 'Dubai',
      description: 'Prestigious residential area known for luxury resorts and pristine beaches',
      image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&h=400&fit=crop',
      coordinates: { lat: 25.2285, lng: 55.2721 },
      operatingHours: '7:00 AM - 11:00 PM',
      contactPhone: '+971 4 345 6789',
      features: ['Beach Access', 'Luxury Fleet', 'Concierge Service', 'Resort Delivery'],
      nearbyAttractions: ['Burj Al Arab', 'Jumeirah Beach', 'Wild Wadi', 'Souk Madinat Jumeirah'],
      carsAvailable: 28,
    },
  },
  'abu-dhabi': {
    'corniche': {
      name: 'Corniche',
      city: 'Abu Dhabi',
      description: 'Scenic waterfront promenade with parks and cultural attractions',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
      coordinates: { lat: 24.4764, lng: 54.3705 },
      operatingHours: '24/7',
      contactPhone: '+971 2 123 4567',
      features: ['Waterfront Location', '24/7 Service', 'Tourist Information', 'Free Parking'],
      nearbyAttractions: ['Emirates Palace', 'Corniche Beach', 'Heritage Village', 'Marina Mall'],
      carsAvailable: 38,
    },
  },
};

// Mock cars data for location
const locationCars = [
  {
    id: 'CAR001',
    name: '2023 BMW X5',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop',
    category: 'SUV',
    year: 2023,
    rating: 4.9,
    reviewCount: 24,
    price: 380,
    features: ['GPS', 'Bluetooth', 'Backup Camera', 'Leather Seats'],
    fuelType: 'Petrol',
    seats: 7,
    available: true,
    slug: 'bmw-x5-2023',
  },
  {
    id: 'CAR002',
    name: '2022 Mercedes C-Class',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop',
    category: 'Sedan',
    year: 2022,
    rating: 4.8,
    reviewCount: 31,
    price: 220,
    features: ['GPS', 'Sunroof', 'Premium Sound'],
    fuelType: 'Petrol',
    seats: 5,
    available: true,
    slug: 'mercedes-c-class-2022',
  },
  {
    id: 'CAR003',
    name: '2023 Toyota Camry',
    image: 'https://images.unsplash.com/photo-1606016159991-5de7a9fa2c2e?w=400&h=250&fit=crop',
    category: 'Sedan',
    year: 2023,
    rating: 4.7,
    reviewCount: 18,
    price: 150,
    features: ['GPS', 'Apple CarPlay', 'Safety Plus'],
    fuelType: 'Hybrid',
    seats: 5,
    available: true,
    slug: 'toyota-camry-2023',
  },
];

interface LocationPageProps {
  params: {
    city: string;
    location: string;
  };
}

export default function LocationPage({ params }: LocationPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const cityData = locationData[params.city as keyof typeof locationData];
  const location = cityData?.[params.location as keyof typeof cityData];

  const filteredCars = locationCars.filter(car => {
    const matchesSearch = searchQuery === '' ||
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || car.category.toLowerCase() === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  if (!location) {
    return (
      <main className='min-h-screen bg-white font-montserrat py-20 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-3xl font-light text-gray-900 mb-4'>Location Not Found</h1>
          <p className='text-gray-500 font-light'>The location you're looking for doesn't exist.</p>
          <Link href='/rent'>
            <Button className='mt-6 bg-gray-900 hover:bg-gray-800 text-white font-light'>
              Browse All Locations
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
          <div className='relative h-64 md:h-80 rounded-lg overflow-hidden mb-8'>
            <Image
              src={location.image}
              alt={location.name}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 100vw'
            />
            <div className='absolute inset-0 bg-black/40' />
            <div className='absolute inset-0 flex items-center justify-center text-center text-white'>
              <div>
                <div className='flex items-center justify-center gap-2 mb-4'>
                  <MapPin className='w-6 h-6' />
                  <span className='text-lg font-light'>{location.city}</span>
                </div>
                <h1 className='text-4xl md:text-5xl font-light mb-4 tracking-tight'>
                  {location.name}
                </h1>
                <p className='text-lg font-light leading-relaxed max-w-2xl'>
                  {location.description}
                </p>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Location Info */}
        <motion.section
          className='mb-12'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'>
              <h3 className='text-xl font-light text-gray-900 mb-6'>Location Details</h3>
              <div className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <Clock className='w-5 h-5 text-gray-400' />
                  <div>
                    <p className='font-light text-gray-900'>Operating Hours</p>
                    <p className='text-sm text-gray-500 font-light'>{location.operatingHours}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <Phone className='w-5 h-5 text-gray-400' />
                  <div>
                    <p className='font-light text-gray-900'>Contact</p>
                    <p className='text-sm text-gray-500 font-light'>{location.contactPhone}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <Car className='w-5 h-5 text-gray-400' />
                  <div>
                    <p className='font-light text-gray-900'>Available Cars</p>
                    <p className='text-sm text-gray-500 font-light'>{location.carsAvailable} vehicles</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'>
              <h3 className='text-xl font-light text-gray-900 mb-6'>Location Features</h3>
              <div className='flex flex-wrap gap-2'>
                {location.features.map((feature) => (
                  <Badge key={feature} className='bg-gray-50 text-gray-600 border-0 text-xs font-light'>
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            <div className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'>
              <h3 className='text-xl font-light text-gray-900 mb-6'>Nearby Attractions</h3>
              <ul className='space-y-2'>
                {location.nearbyAttractions.map((attraction) => (
                  <li key={attraction} className='flex items-center gap-2'>
                    <Navigation className='w-4 h-4 text-gray-400' />
                    <span className='text-sm font-light text-gray-700'>{attraction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Search and Filter */}
        <motion.section
          className='mb-8'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='bg-white rounded-lg p-6 border border-gray-50 shadow-sm'>
            <div className='grid md:grid-cols-3 gap-4'>
              <div className='relative'>
                <Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                <Input
                  type='text'
                  placeholder='Search cars...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-10 border-gray-100 focus:border-gray-300 focus:ring-0 font-light'
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className='px-3 py-2 border border-gray-100 rounded-md focus:border-gray-300 focus:ring-0 font-light'
              >
                <option value='all'>All Categories</option>
                <option value='sedan'>Sedan</option>
                <option value='suv'>SUV</option>
                <option value='luxury'>Luxury</option>
                <option value='economy'>Economy</option>
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

        {/* Available Cars */}
        <motion.section
          className='mb-16'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <h2 className='text-2xl font-light text-gray-900 mb-8'>Available Cars at {location.name}</h2>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {filteredCars.map((car, index) => (
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
                          Available Now
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className='p-6'>
                    <div className='mb-4'>
                      <h3 className='text-xl font-light text-gray-900 mb-2 group-hover:text-gray-700 transition-colors'>
                        {car.name}
                      </h3>
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

          {filteredCars.length === 0 && (
            <div className='text-center py-16'>
              <div className='w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Search className='w-12 h-12 text-gray-300' />
              </div>
              <h3 className='text-xl font-light text-gray-900 mb-2'>No cars found</h3>
              <p className='text-gray-500 font-light mb-6'>
                Try adjusting your search criteria or browse all locations.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('all');
                }}
                variant='outline'
                className='border-gray-200 hover:border-gray-300 font-light mr-4'
              >
                Clear Filters
              </Button>
              <Link href='/rent'>
                <Button className='bg-gray-900 hover:bg-gray-800 text-white font-light'>
                  Browse All Cars
                </Button>
              </Link>
            </div>
          )}
        </motion.section>

        {/* Map Section (Placeholder) */}
        <motion.section
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'>
            <h3 className='text-2xl font-light text-gray-900 mb-6'>Location & Directions</h3>
            <div className='bg-gray-100 rounded-lg h-64 flex items-center justify-center'>
              <div className='text-center text-gray-500'>
                <MapPin className='w-12 h-12 mx-auto mb-4' />
                <p className='font-light'>Interactive map coming soon</p>
                <p className='text-sm font-light'>
                  Coordinates: {location.coordinates.lat}, {location.coordinates.lng}
                </p>
              </div>
            </div>
            <div className='mt-6 flex gap-4'>
              <Button variant='outline' className='border-gray-200 hover:border-gray-300 font-light'>
                Get Directions
              </Button>
              <Button variant='outline' className='border-gray-200 hover:border-gray-300 font-light'>
                Call Location
              </Button>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}