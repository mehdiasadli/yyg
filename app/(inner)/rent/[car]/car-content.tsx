'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Star,
  Calendar,
  MapPin,
  Car,
  Users,
  Phone,
  MessageCircle,
  Shield,
  Clock,
  Fuel,
  Settings,
  CheckCircle,
  Camera,
  Award,
  DollarSign,
} from 'lucide-react';
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

export default function CarContent({ carData }: { carData: any }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      {/* Back Button */}
      <motion.div
        className='mb-8'
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href='/rent'>
          <Button
            variant='ghost'
            className='gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-normal rounded-xl transition-all duration-200'
          >
            <ArrowLeft size={16} />
            Back to Cars
          </Button>
        </Link>
      </motion.div>

      {/* Hero Section with Image Gallery */}
      <motion.div className='relative mb-12 sm:mb-16' variants={headerVariants} initial='hidden' animate='visible'>
        {/* Main Image */}
        <div className='relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden mb-6'>
          <Image
            src={carData.images[currentImageIndex]}
            alt={carData.name}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
            priority
          />
          {/* Gradient overlays */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent' />
          <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent' />

          {/* Premium Badge */}
          {carData.premium && (
            <div className='absolute top-4 sm:top-6 left-4 sm:left-6'>
              <Badge className='bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 shadow-lg text-sm font-semibold px-4 py-2 uppercase tracking-wide'>
                Premium
              </Badge>
            </div>
          )}

          {/* Photo Counter */}
          <div className='absolute top-4 sm:top-6 right-4 sm:right-6 bg-white/95 backdrop-blur-md rounded-xl px-4 py-2 text-slate-900 text-sm font-medium shadow-lg flex items-center gap-2'>
            <Camera size={16} />
            {currentImageIndex + 1} / {carData.images.length}
          </div>

          {/* Car Info Overlay */}
          <div className='absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10'>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg'>
              {carData.name}
            </h1>

            <div className='flex items-center gap-3 sm:gap-4 text-sm text-white/90 mb-4 flex-wrap'>
              <div className='flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-lg px-3 py-1.5'>
                <Calendar className='w-4 h-4' />
                <span className='font-normal'>{carData.year}</span>
              </div>
              <div className='flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-lg px-3 py-1.5'>
                <Car className='w-4 h-4' />
                <span className='font-normal'>{carData.category}</span>
              </div>
              <div className='flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-lg px-3 py-1.5'>
                <MapPin className='w-4 h-4' />
                <span className='font-normal'>{carData.location}</span>
              </div>
            </div>

            <div className='inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-lg px-3 py-1.5'>
              <Star className='w-4 h-4 text-amber-400 fill-amber-400' />
              <span className='text-sm font-semibold text-white'>{carData.rating}</span>
              <span className='text-sm text-white/80'>({carData.reviewCount} reviews)</span>
            </div>
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div className='grid grid-cols-4 gap-3 sm:gap-4'>
          {carData.images.map((image: string, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative h-20 sm:h-28 rounded-2xl overflow-hidden border-3 transition-all duration-300 ${
                currentImageIndex === index
                  ? 'border-slate-900 ring-4 ring-slate-900 ring-offset-2 scale-95'
                  : 'border-slate-200 hover:border-slate-400 hover:scale-105'
              }`}
            >
              <Image
                src={image}
                alt={`${carData.name} - ${index + 1}`}
                fill
                className='object-cover'
                sizes='(max-width: 768px) 25vw, 12.5vw'
              />
              {currentImageIndex === index && <div className='absolute inset-0 bg-slate-900/20' />}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Description & Pricing/Contact */}
      <motion.div
        className='grid lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16'
        variants={cardVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
      >
        {/* Description & Features */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Description */}
          <div className='bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm'>
            <h2 className='text-2xl font-semibold text-slate-900 mb-4'>About This Car</h2>
            <p className='text-gray-600 font-normal leading-relaxed mb-6'>{carData.description}</p>

            {/* Key Features */}
            <div>
              <h3 className='text-lg font-medium text-slate-900 mb-4'>Key Features</h3>
              <div className='grid grid-cols-2 gap-4'>
                <div className='flex items-center gap-3 bg-slate-50 rounded-xl p-4 border border-slate-200'>
                  <div className='w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center'>
                    <Settings className='w-5 h-5 text-blue-600' />
                  </div>
                  <div>
                    <p className='text-xs text-slate-500 font-medium'>Transmission</p>
                    <p className='text-sm font-semibold text-slate-900'>{carData.features.transmission}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3 bg-slate-50 rounded-xl p-4 border border-slate-200'>
                  <div className='w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center'>
                    <Fuel className='w-5 h-5 text-green-600' />
                  </div>
                  <div>
                    <p className='text-xs text-slate-500 font-medium'>Fuel Type</p>
                    <p className='text-sm font-semibold text-slate-900'>{carData.features.fuel}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3 bg-slate-50 rounded-xl p-4 border border-slate-200'>
                  <div className='w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center'>
                    <Users className='w-5 h-5 text-purple-600' />
                  </div>
                  <div>
                    <p className='text-xs text-slate-500 font-medium'>Seats</p>
                    <p className='text-sm font-semibold text-slate-900'>{carData.features.seats} seats</p>
                  </div>
                </div>
                <div className='flex items-center gap-3 bg-slate-50 rounded-xl p-4 border border-slate-200'>
                  <div className='w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center'>
                    <Car className='w-5 h-5 text-orange-600' />
                  </div>
                  <div>
                    <p className='text-xs text-slate-500 font-medium'>Doors</p>
                    <p className='text-sm font-semibold text-slate-900'>{carData.features.doors} doors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Contact Sidebar */}
        <div className='space-y-6'>
          {/* Pricing Card */}
          <div className='bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-xl'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center'>
                <DollarSign className='w-5 h-5 text-white' />
              </div>
              <h3 className='text-xl font-semibold'>Rental Rates</h3>
            </div>

            <div className='space-y-4 mb-6'>
              <div className='bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20'>
                <div className='text-xs text-white/60 font-medium mb-1 uppercase tracking-wide'>Daily Rate</div>
                <div className='flex items-baseline gap-2'>
                  <span className='text-2xl font-bold'>{carData.price.daily.amount}</span>
                  <span className='text-sm font-medium text-white/80'>{carData.price.daily.currency}</span>
                </div>
              </div>
              <div className='bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20'>
                <div className='text-xs text-white/60 font-medium mb-1 uppercase tracking-wide'>Weekly Rate</div>
                <div className='flex items-baseline gap-2'>
                  <span className='text-2xl font-bold'>{carData.price.weekly.amount}</span>
                  <span className='text-sm font-medium text-white/80'>{carData.price.weekly.currency}</span>
                </div>
              </div>
              <div className='bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20'>
                <div className='text-xs text-white/60 font-medium mb-1 uppercase tracking-wide'>Monthly Rate</div>
                <div className='flex items-baseline gap-2'>
                  <span className='text-2xl font-bold'>{carData.price.monthly.amount}</span>
                  <span className='text-sm font-medium text-white/80'>{carData.price.monthly.currency}</span>
                </div>
              </div>
            </div>

            <div className='space-y-3'>
              <motion.a
                href={`tel:${carData.owner.phone}`}
                className='w-full bg-white text-slate-900 hover:bg-gray-100 font-medium py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone size={18} />
                Call Owner
              </motion.a>

              <motion.a
                href={`https://wa.me/${carData.owner.whatsapp.replace(/[^0-9]/g, '')}`}
                target='_blank'
                rel='noopener noreferrer'
                className='w-full bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle size={18} />
                WhatsApp
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Additional Details Grid */}
      <div className='grid lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16'>
        {/* Specifications */}
        <motion.div
          className='bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center'>
              <Settings className='w-5 h-5 text-blue-600' />
            </div>
            <h3 className='text-xl font-semibold text-slate-900'>Specifications</h3>
          </div>
          <div className='space-y-4'>
            {Object.entries(carData.specifications).map(([key, value]) => (
              <div key={key} className='flex items-center justify-between py-3 border-b border-slate-100 last:border-0'>
                <span className='text-slate-600 font-normal capitalize text-sm'>{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className='font-semibold text-slate-900 text-sm'>{value as string}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* What's Included */}
        <motion.div
          className='bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h3 className='text-xl font-semibold text-slate-900 mb-6'>What's Included</h3>
          <div className='space-y-4'>
            {carData.included.map((item: string, index: number) => (
              <div key={index} className='flex items-start gap-3'>
                <div className='w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 flex-shrink-0'>
                  <CheckCircle className='w-3.5 h-3.5 text-green-600' />
                </div>
                <span className='text-gray-600 font-normal text-sm leading-relaxed'>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Owner Information */}
        <motion.div
          className='bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center'>
              <Award className='w-5 h-5 text-purple-600' />
            </div>
            <h3 className='text-xl font-semibold text-slate-900'>Owner</h3>
          </div>
          <div className='space-y-4'>
            <div>
              <p className='text-lg font-semibold text-slate-900 mb-2'>{carData.owner.name}</p>
              <div className='inline-flex items-center gap-2 bg-amber-50 rounded-lg px-3 py-2 border border-amber-200'>
                <Star className='w-4 h-4 text-amber-500 fill-amber-500' />
                <span className='text-sm font-semibold text-amber-900'>{carData.owner.rating}</span>
              </div>
            </div>
            <div className='space-y-3 pt-3'>
              <div className='flex justify-between items-center pb-3 border-b border-slate-100'>
                <span className='text-slate-600 font-normal text-sm'>Member since</span>
                <span className='text-slate-900 font-semibold text-sm'>{carData.owner.joinedDate}</span>
              </div>
              <div className='flex justify-between items-center pb-3 border-b border-slate-100'>
                <span className='text-slate-600 font-normal text-sm'>Total cars</span>
                <span className='text-slate-900 font-semibold text-sm'>{carData.owner.totalCars}</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-slate-600 font-normal text-sm'>Response time</span>
                <span className='text-slate-900 font-semibold text-sm'>{carData.owner.responseTime}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Rules and Policies */}
      <motion.section
        className='bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-sm'
        variants={cardVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
      >
        <div className='text-center mb-10'>
          <h2 className='text-2xl sm:text-3xl font-semibold text-slate-900 mb-3'>Rental Rules & Policies</h2>
          <p className='text-gray-500 font-normal'>Important information about your rental</p>
        </div>

        <div className='grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto'>
          {/* Rental Rules */}
          <div className='bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm'>
            <h4 className='text-lg font-semibold text-slate-900 mb-6'>Rental Rules</h4>
            <ul className='space-y-4'>
              {carData.rules.map((rule: string, index: number) => (
                <li key={index} className='flex items-start gap-3'>
                  <div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0' />
                  <span className='text-gray-600 font-normal text-sm leading-relaxed'>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Information */}
          <div className='bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm'>
            <h4 className='text-lg font-semibold text-slate-900 mb-6'>Important Information</h4>
            <div className='space-y-6'>
              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0'>
                  <Shield className='w-6 h-6 text-green-600' />
                </div>
                <div>
                  <p className='text-sm font-semibold text-slate-900 mb-1'>Fully Insured</p>
                  <p className='text-xs text-slate-500 font-normal leading-relaxed'>
                    Comprehensive insurance coverage included for your peace of mind
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0'>
                  <Clock className='w-6 h-6 text-blue-600' />
                </div>
                <div>
                  <p className='text-sm font-semibold text-slate-900 mb-1'>24/7 Support</p>
                  <p className='text-xs text-slate-500 font-normal leading-relaxed'>
                    Round-the-clock assistance available whenever you need help
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
