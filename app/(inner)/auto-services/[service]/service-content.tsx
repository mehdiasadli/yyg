'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  CheckCircle,
  Camera,
  Award,
  Mail,
  Globe,
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

export default function ServiceContent({ serviceData }: { serviceData: any }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categoryColors: Record<string, { badge: string; iconBg: string; gradient: string }> = {
    detailing: {
      badge: 'bg-purple-100 text-purple-700 border-purple-200',
      iconBg: 'bg-purple-50',
      gradient: 'from-purple-500/10 via-purple-500/5 to-transparent',
    },
    repair: {
      badge: 'bg-blue-100 text-blue-700 border-blue-200',
      iconBg: 'bg-blue-50',
      gradient: 'from-blue-500/10 via-blue-500/5 to-transparent',
    },
    cleaning: {
      badge: 'bg-green-100 text-green-700 border-green-200',
      iconBg: 'bg-green-50',
      gradient: 'from-green-500/10 via-green-500/5 to-transparent',
    },
    maintenance: {
      badge: 'bg-orange-100 text-orange-700 border-orange-200',
      iconBg: 'bg-orange-50',
      gradient: 'from-orange-500/10 via-orange-500/5 to-transparent',
    },
    modification: {
      badge: 'bg-red-100 text-red-700 border-red-200',
      iconBg: 'bg-red-50',
      gradient: 'from-red-500/10 via-red-500/5 to-transparent',
    },
  };

  const colors = categoryColors[serviceData.category] || categoryColors.detailing;

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      {/* Back Button */}
      <motion.div
        className='mb-8'
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href='/auto-services'>
          <Button
            variant='ghost'
            className='gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-normal rounded-xl transition-all duration-200'
          >
            <ArrowLeft size={16} />
            Back to Services
          </Button>
        </Link>
      </motion.div>

      {/* Hero Section with Image Gallery */}
      <motion.div className='relative mb-12 sm:mb-16' variants={headerVariants} initial='hidden' animate='visible'>
        {/* Main Image */}
        <div className='relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden mb-6'>
          <Image
            src={serviceData.images[currentImageIndex]}
            alt={serviceData.name}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
            priority
          />
          {/* Gradient overlays */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent' />
          <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient}`} />

          {/* Category Badge */}
          <div
            className={`absolute top-4 sm:top-6 left-4 sm:left-6 ${colors.badge} backdrop-blur-md rounded-xl px-4 py-2 text-sm font-semibold shadow-lg border capitalize`}
          >
            {serviceData.category}
          </div>

          {/* Photo Counter */}
          <div className='absolute top-4 sm:top-6 right-4 sm:right-6 bg-white/95 backdrop-blur-md rounded-xl px-4 py-2 text-slate-900 text-sm font-medium shadow-lg flex items-center gap-2'>
            <Camera size={16} />
            {currentImageIndex + 1} / {serviceData.images.length}
          </div>

          {/* Service Info Overlay */}
          <div className='absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10'>
            <div className='flex flex-wrap gap-2 mb-4'>
              {serviceData.badges.slice(0, 3).map((badge: string) => (
                <Badge
                  key={badge}
                  className='bg-white/95 text-slate-700 border-0 shadow-md text-xs font-semibold px-3 py-1.5 capitalize backdrop-blur-sm'
                >
                  {badge}
                </Badge>
              ))}
            </div>

            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg'>
              {serviceData.name}
            </h1>

            <div className='flex items-center gap-4 text-sm text-white/90 mb-4 flex-wrap'>
              <div className='flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-lg px-3 py-1.5'>
                <Star className='w-4 h-4 text-amber-400 fill-amber-400' />
                <span className='font-semibold'>{serviceData.rating}</span>
                <span className='font-normal'>({serviceData.reviewCount} reviews)</span>
              </div>
              <div className='flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-lg px-3 py-1.5'>
                <MapPin className='w-4 h-4' />
                <span className='font-normal'>{serviceData.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div className='grid grid-cols-4 gap-3 sm:gap-4'>
          {serviceData.images.map((image: string, index: number) => (
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
                alt={`${serviceData.name} - ${index + 1}`}
                fill
                className='object-cover'
                sizes='(max-width: 768px) 25vw, 12.5vw'
              />
              {currentImageIndex === index && <div className='absolute inset-0 bg-slate-900/20' />}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Description & Quick Actions */}
      <motion.div
        className='grid lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16'
        variants={cardVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
      >
        {/* Description */}
        <div className='lg:col-span-2 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm'>
          <h2 className='text-2xl font-semibold text-slate-900 mb-4'>About This Service</h2>
          <p className='text-gray-600 font-normal leading-relaxed mb-6'>{serviceData.description}</p>

          {/* Specialties */}
          <div>
            <h3 className='text-lg font-medium text-slate-900 mb-4'>Specialties</h3>
            <div className='flex flex-wrap gap-2'>
              {serviceData.specialties.map((specialty: string) => (
                <Badge
                  key={specialty}
                  className='text-sm bg-slate-100 text-slate-700 border-0 font-medium px-4 py-2 capitalize'
                >
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Card */}
        <div className='bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-xl'>
          <h3 className='text-xl font-semibold mb-6'>Contact Service</h3>

          <div className='space-y-4'>
            <motion.a
              href={`tel:${serviceData.phone}`}
              className='w-full bg-white text-slate-900 hover:bg-gray-100 font-medium py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone size={18} />
              Call Now
            </motion.a>

            <motion.a
              href={`https://wa.me/${serviceData.whatsapp.replace(/[^0-9]/g, '')}`}
              target='_blank'
              rel='noopener noreferrer'
              className='w-full bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle size={18} />
              WhatsApp
            </motion.a>

            <div className='pt-4 border-t border-white/20 space-y-3 text-sm'>
              <div className='flex items-center gap-3'>
                <Phone className='w-4 h-4 text-white/60' />
                <span className='font-normal'>{serviceData.phone}</span>
              </div>
              <div className='flex items-center gap-3'>
                <Mail className='w-4 h-4 text-white/60' />
                <span className='font-normal truncate'>{serviceData.email}</span>
              </div>
              <div className='flex items-center gap-3'>
                <Globe className='w-4 h-4 text-white/60' />
                <span className='font-normal truncate'>{serviceData.website}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Services & Pricing */}
      <motion.section
        className='mb-12 sm:mb-16'
        variants={cardVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
      >
        <div className='text-center mb-8 sm:mb-12'>
          <motion.div
            className='inline-block px-4 py-1.5 rounded-full bg-slate-900 mb-4'
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className='text-sm font-medium text-white tracking-wide'>Our Services</span>
          </motion.div>
          <h2 className='text-2xl sm:text-3xl font-semibold text-slate-900 mb-3'>Services & Pricing</h2>
          <p className='text-gray-500 font-normal'>Transparent pricing for professional automotive services</p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
          {serviceData.services.map((service: any, index: number) => (
            <motion.div
              key={service.name}
              className='group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-300 relative overflow-hidden'
              variants={cardVariants}
              initial='hidden'
              whileInView='visible'
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              {/* Gradient accent */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colors.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className='relative'>
                <h3 className='text-lg sm:text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-200'>
                  {service.name}
                </h3>
                <p className='text-gray-600 font-normal text-sm mb-6 leading-relaxed'>{service.description}</p>

                <div className='flex items-center gap-2 text-sm text-gray-600 mb-6'>
                  <Clock className='w-4 h-4 text-gray-400' />
                  <span className='font-normal'>{service.duration}</span>
                </div>

                <div className='bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-5 border border-slate-200'>
                  <div className='text-xs text-slate-500 font-medium mb-2 uppercase tracking-wide'>Price Range</div>
                  <div className='flex items-baseline gap-2'>
                    <span className='text-2xl sm:text-3xl font-bold text-slate-900'>
                      {service.price.min}-{service.price.max}
                    </span>
                    <span className='text-base text-slate-600 font-semibold'>{service.price.currency}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Details Grid */}
      <div className='grid lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16'>
        {/* Operating Hours */}
        <motion.div
          className='bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center'>
              <Clock className='w-6 h-6 text-blue-600' />
            </div>
            <h3 className='text-xl font-semibold text-slate-900'>Hours</h3>
          </div>
          <div className='space-y-4'>
            <div className='flex justify-between items-start'>
              <span className='text-gray-600 font-normal'>Mon - Thu</span>
              <Badge className='text-xs font-semibold bg-green-50 text-green-700 border border-green-200'>
                {serviceData.openingHours.weekdays}
              </Badge>
            </div>
            <div className='flex justify-between items-start'>
              <span className='text-gray-600 font-normal'>Friday</span>
              <Badge className='text-xs font-semibold bg-green-50 text-green-700 border border-green-200'>
                {serviceData.openingHours.friday}
              </Badge>
            </div>
            <div className='flex justify-between items-start'>
              <span className='text-gray-600 font-normal'>Sat - Sun</span>
              <Badge className='text-xs font-semibold bg-green-50 text-green-700 border border-green-200'>
                {serviceData.openingHours.weekends}
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          className='bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h3 className='text-xl font-semibold text-slate-900 mb-6'>Features</h3>
          <div className='space-y-4'>
            {serviceData.features.map((feature: string, index: number) => (
              <div key={index} className='flex items-start gap-3'>
                <div className='w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 flex-shrink-0'>
                  <CheckCircle className='w-3.5 h-3.5 text-green-600' />
                </div>
                <span className='text-gray-600 font-normal text-sm leading-relaxed'>{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Location */}
        <motion.div
          className='bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center'>
              <MapPin className='w-6 h-6 text-purple-600' />
            </div>
            <h3 className='text-xl font-semibold text-slate-900'>Location</h3>
          </div>
          <div className='space-y-4'>
            <div>
              <p className='text-xs text-slate-500 font-medium mb-2 uppercase tracking-wide'>Address</p>
              <p className='text-gray-900 font-medium leading-relaxed'>{serviceData.fullAddress}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Expert & Certifications */}
      <motion.section
        className='bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-sm mb-12 sm:mb-16'
        variants={cardVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
      >
        <div className='text-center mb-10'>
          <h2 className='text-2xl sm:text-3xl font-semibold text-slate-900 mb-3'>Meet the Expert</h2>
          <p className='text-gray-500 font-normal'>Experienced professionals at your service</p>
        </div>

        <div className='grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto'>
          {/* Owner Info */}
          <div className='bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm'>
            <h4 className='text-xl font-semibold text-slate-900 mb-6'>{serviceData.owner.name}</h4>
            <div className='space-y-4'>
              <div className='flex justify-between items-center pb-3 border-b border-slate-100'>
                <span className='text-gray-600 font-normal'>Experience</span>
                <span className='text-slate-900 font-semibold'>{serviceData.owner.experience}</span>
              </div>
              <div className='flex justify-between items-center pb-3 border-b border-slate-100'>
                <span className='text-gray-600 font-normal'>Specialization</span>
                <span className='text-slate-900 font-semibold text-right'>{serviceData.owner.specialization}</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-gray-600 font-normal'>Certifications</span>
                <Badge className='bg-blue-100 text-blue-700 border-blue-200 font-semibold'>
                  {serviceData.owner.certifications}
                </Badge>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className='bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm'>
            <h4 className='text-xl font-semibold text-slate-900 mb-6'>Certifications</h4>
            <div className='space-y-4'>
              {serviceData.certifications.map((cert: string, index: number) => (
                <div key={index} className='flex items-start gap-3'>
                  <div className='w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 flex-shrink-0'>
                    <Award className='w-3.5 h-3.5 text-blue-600' />
                  </div>
                  <span className='text-gray-600 font-normal text-sm leading-relaxed'>{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Reviews Section */}
      <motion.section variants={cardVariants} initial='hidden' whileInView='visible' viewport={{ once: true }}>
        <div className='text-center mb-8 sm:mb-12'>
          <motion.div
            className='inline-block px-4 py-1.5 rounded-full bg-slate-900 mb-4'
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className='text-sm font-medium text-white tracking-wide'>Testimonials</span>
          </motion.div>
          <h2 className='text-2xl sm:text-3xl font-semibold text-slate-900 mb-3'>Customer Reviews</h2>
          <p className='text-gray-500 font-normal'>What our customers say about our services</p>
        </div>

        <div className='grid md:grid-cols-2 gap-6 sm:gap-8'>
          {serviceData.reviews.map((review: any, index: number) => (
            <motion.div
              key={review.id}
              className='bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300'
              variants={cardVariants}
              initial='hidden'
              whileInView='visible'
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className='flex items-start justify-between mb-5 gap-4'>
                <div className='flex-1 min-w-0'>
                  <p className='font-semibold text-slate-900 mb-2 truncate'>{review.name}</p>
                  <div className='flex items-center gap-1.5'>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className='w-4 h-4 text-amber-400 fill-amber-400' />
                    ))}
                  </div>
                </div>
                <div className='text-right shrink-0'>
                  <Badge className={`${colors.badge} border text-xs font-semibold mb-2 capitalize`}>
                    {review.service}
                  </Badge>
                  <p className='text-xs text-gray-500 font-normal'>{review.date}</p>
                </div>
              </div>
              <p className='text-gray-600 font-normal leading-relaxed italic'>"{review.comment}"</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
