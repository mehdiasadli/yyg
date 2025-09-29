'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Calendar, MapPin, Car, Users, Phone, MessageCircle, Shield, Clock, Fuel, Settings, CheckCircle, Camera } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface CarPageProps {
  params: Promise<{ car: string }>;
}

// Mock car data - in a real app, this would come from a database
const getCarData = (carId: string) => {
  const cars = {
    'bmw-x5-2023': {
      id: 'bmw-x5-2023',
      name: 'BMW X5',
      year: 2023,
      brand: 'BMW',
      category: 'SUV',
      location: 'Dubai Marina',
      images: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1000&auto=format&fit=crop',
      ],
      rating: 4.8,
      reviewCount: 124,
      premium: true,
      features: {
        transmission: 'Automatic',
        fuel: 'Petrol',
        seats: 7,
        doors: 5,
        airConditioning: true,
        bluetooth: true,
        gps: true,
        parkingSensors: true,
        sunroof: true,
        leatherSeats: true,
      },
      specifications: {
        engine: '3.0L V6 Twin Turbo',
        power: '340 HP',
        torque: '450 Nm',
        acceleration: '5.8 seconds (0-100 km/h)',
        topSpeed: '245 km/h',
        fuelTank: '83 liters',
        luggage: '650 liters',
      },
      price: {
        daily: { amount: 450, currency: 'AED', km: 300 },
        weekly: { amount: 2800, currency: 'AED', km: 2000 },
        monthly: { amount: 10000, currency: 'AED', km: 5000 },
      },
      owner: {
        name: 'Ahmed Al-Rashid',
        phone: '+971-50-123-4567',
        whatsapp: '+971-50-123-4567',
        rating: 4.9,
        joinedDate: '2022',
        totalCars: 3,
        responseTime: '< 1 hour',
      },
      description: 'Luxury SUV perfect for family trips and business travel. This BMW X5 features premium leather interior, advanced safety systems, and exceptional comfort. Recently serviced and maintained to the highest standards.',
      rules: [
        'No smoking inside the vehicle',
        'Maximum speed limit: 120 km/h',
        'Return with same fuel level',
        'Additional cleaning fee for excessive dirt',
        'Pets allowed with prior approval',
      ],
      included: [
        'Comprehensive insurance',
        'GPS navigation system',
        'Bluetooth connectivity',
        'Air conditioning',
        '24/7 roadside assistance',
      ],
    },
  };

  return cars[carId as keyof typeof cars] || null;
};

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

export default async function CarPage({ params }: CarPageProps) {
  const { car } = await params;
  const carData = getCarData(car);

  if (!carData) {
    return (
      <main className='min-h-screen bg-white font-montserrat py-20'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='text-center py-24'>
            <h1 className='text-4xl font-light text-gray-900 mb-4'>Car Not Found</h1>
            <p className='text-gray-500 font-light mb-8'>The car you're looking for doesn't exist or is no longer available.</p>
            <Link href='/rent'>
              <Button variant='outline' className='gap-2 border-gray-200 hover:border-gray-300 font-light'>
                <ArrowLeft size={16} />
                Back to Cars
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='min-h-screen bg-white font-montserrat py-20'>
      <CarContent carData={carData} />
    </main>
  );
}

function CarContent({ carData }: { carData: any }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [rentalPeriod, setRentalPeriod] = useState('daily');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const getCurrentPrice = () => {
    switch (rentalPeriod) {
      case 'weekly':
        return carData.price.weekly;
      case 'monthly':
        return carData.price.monthly;
      default:
        return carData.price.daily;
    }
  };

  return (
    <div className='max-w-7xl mx-auto px-6 lg:px-8'>
      {/* Back Button */}
      <div className='mb-8'>
        <Link href='/rent'>
          <Button variant='ghost' className='gap-2 text-gray-600 hover:text-gray-900 font-light'>
            <ArrowLeft size={16} />
            Back to Cars
          </Button>
        </Link>
      </div>

      <div className='grid lg:grid-cols-2 gap-16 mb-16'>
        {/* Image Gallery */}
        <motion.div
          variants={cardVariants}
          initial='hidden'
          animate='visible'
        >
          <div className='space-y-4'>
            <div className='relative h-96 rounded-lg overflow-hidden'>
              <Image
                src={carData.images[currentImageIndex]}
                alt={carData.name}
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, 50vw'
              />
              {carData.premium && (
                <div className='absolute top-4 left-4'>
                  <Badge className='bg-white/90 text-gray-700 border-0 shadow-sm text-xs font-light'>
                    Premium
                  </Badge>
                </div>
              )}
              <div className='absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-light flex items-center gap-1'>
                <Camera size={12} />
                {currentImageIndex + 1} / {carData.images.length}
              </div>
            </div>

            <div className='grid grid-cols-4 gap-2'>
              {carData.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    currentImageIndex === index ? 'border-gray-400' : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${carData.name} - ${index + 1}`}
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 25vw, 12.5vw'
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Car Details */}
        <motion.div
          variants={cardVariants}
          initial='hidden'
          animate='visible'
          transition={{ delay: 0.2 }}
        >
          <div className='space-y-6'>
            {/* Header */}
            <div>
              <h1 className='text-3xl font-light text-gray-900 mb-2'>{carData.name}</h1>
              <div className='flex items-center gap-4 text-sm text-gray-400 mb-4'>
                <span className='flex items-center gap-1'>
                  <Calendar className='w-4 h-4' />
                  {carData.year}
                </span>
                <span className='flex items-center gap-1'>
                  <Car className='w-4 h-4' />
                  {carData.category}
                </span>
                <span className='flex items-center gap-1'>
                  <MapPin className='w-4 h-4' />
                  {carData.location}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-1'>
                  <Star className='w-4 h-4 text-gray-400 fill-current' />
                  <span className='text-sm font-light text-gray-900'>{carData.rating}</span>
                </div>
                <Link href='/reviews' className='text-sm text-gray-400 hover:text-gray-600 transition-colors'>
                  ({carData.reviewCount} reviews)
                </Link>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className='text-gray-500 font-light leading-relaxed'>{carData.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className='text-lg font-light text-gray-900 mb-4'>Features</h3>
              <div className='grid grid-cols-2 gap-3'>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <Settings className='w-4 h-4 text-gray-400' />
                  <span className='font-light'>{carData.features.transmission}</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <Fuel className='w-4 h-4 text-gray-400' />
                  <span className='font-light'>{carData.features.fuel}</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <Users className='w-4 h-4 text-gray-400' />
                  <span className='font-light'>{carData.features.seats} seats</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <Car className='w-4 h-4 text-gray-400' />
                  <span className='font-light'>{carData.features.doors} doors</span>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className='bg-gray-50 rounded-lg p-6'>
              <h3 className='text-lg font-light text-gray-900 mb-4'>Rental Rates</h3>
              <div className='space-y-3'>
                <div className='flex items-center justify-between py-2 border-b border-gray-200 last:border-0'>
                  <span className='text-gray-600 font-light'>Daily Rate</span>
                  <span className='font-light text-gray-900'>
                    {carData.price.daily.amount} {carData.price.daily.currency}
                  </span>
                </div>
                <div className='flex items-center justify-between py-2 border-b border-gray-200 last:border-0'>
                  <span className='text-gray-600 font-light'>Weekly Rate</span>
                  <span className='font-light text-gray-900'>
                    {carData.price.weekly.amount} {carData.price.weekly.currency}
                  </span>
                </div>
                <div className='flex items-center justify-between py-2'>
                  <span className='text-gray-600 font-light'>Monthly Rate</span>
                  <span className='font-light text-gray-900'>
                    {carData.price.monthly.amount} {carData.price.monthly.currency}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Owner */}
            <div className='flex items-center gap-4'>
              <motion.div className='flex-1' whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a
                  href={`tel:${carData.owner.phone}`}
                  className='w-full bg-gray-900 hover:bg-gray-800 text-white font-light py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2'
                >
                  <Phone size={16} />
                  Call Owner
                </a>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a
                  href={`https://wa.me/${carData.owner.whatsapp.replace(/[^0-9]/g, '')}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200'
                >
                  <MessageCircle size={16} />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Additional Details */}
      <div className='grid lg:grid-cols-3 gap-8 mb-16'>
        {/* Specifications */}
        <motion.div
          className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <h3 className='text-xl font-light text-gray-900 mb-6'>Specifications</h3>
          <div className='space-y-4'>
            {Object.entries(carData.specifications).map(([key, value]) => (
              <div key={key} className='flex items-center justify-between py-2 border-b border-gray-100 last:border-0'>
                <span className='text-gray-600 font-light capitalize'>{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className='font-light text-gray-900'>{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* What's Included */}
        <motion.div
          className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h3 className='text-xl font-light text-gray-900 mb-6'>What's Included</h3>
          <div className='space-y-3'>
            {carData.included.map((item: string, index: number) => (
              <div key={index} className='flex items-center gap-3'>
                <CheckCircle className='w-4 h-4 text-green-600 flex-shrink-0' />
                <span className='text-gray-600 font-light text-sm'>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Owner Information */}
        <motion.div
          className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h3 className='text-xl font-light text-gray-900 mb-6'>Owner</h3>
          <div className='space-y-4'>
            <div>
              <p className='font-light text-gray-900 mb-1'>{carData.owner.name}</p>
              <div className='flex items-center gap-1 mb-2'>
                <Star className='w-4 h-4 text-gray-400 fill-current' />
                <span className='text-sm font-light text-gray-900'>{carData.owner.rating}</span>
              </div>
            </div>
            <div className='space-y-2 text-sm'>
              <div className='flex justify-between'>
                <span className='text-gray-500 font-light'>Member since</span>
                <span className='text-gray-900 font-light'>{carData.owner.joinedDate}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-500 font-light'>Total cars</span>
                <span className='text-gray-900 font-light'>{carData.owner.totalCars}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-500 font-light'>Response time</span>
                <span className='text-gray-900 font-light'>{carData.owner.responseTime}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Rules and Policies */}
      <motion.section
        className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'
        variants={cardVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
      >
        <h3 className='text-xl font-light text-gray-900 mb-6'>Rental Rules & Policies</h3>
        <div className='grid md:grid-cols-2 gap-8'>
          <div>
            <h4 className='text-lg font-light text-gray-900 mb-4'>Rental Rules</h4>
            <ul className='space-y-3'>
              {carData.rules.map((rule: string, index: number) => (
                <li key={index} className='flex items-start gap-3'>
                  <div className='w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0' />
                  <span className='text-gray-600 font-light text-sm'>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className='text-lg font-light text-gray-900 mb-4'>Important Information</h4>
            <div className='space-y-4'>
              <div className='flex items-start gap-3'>
                <Shield className='w-5 h-5 text-green-600 mt-0.5 flex-shrink-0' />
                <div>
                  <p className='text-sm font-light text-gray-900 mb-1'>Fully Insured</p>
                  <p className='text-xs text-gray-500 font-light'>Comprehensive insurance coverage included</p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <Clock className='w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0' />
                <div>
                  <p className='text-sm font-light text-gray-900 mb-1'>24/7 Support</p>
                  <p className='text-xs text-gray-500 font-light'>Round-the-clock assistance available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}