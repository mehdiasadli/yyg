'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, MapPin, Clock, Phone, MessageCircle, Shield, Award, CheckCircle, Camera, Calendar, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ServicePageProps {
  params: Promise<{ service: string }>;
}

// Mock service data - in a real app, this would come from a database
const getServiceData = (serviceId: string) => {
  const services = {
    'carcare-pro-detailing': {
      id: 'carcare-pro-detailing',
      name: 'CarCare Pro Detailing',
      location: 'Dubai Marina, Dubai',
      fullAddress: 'Marina Plaza, Level 2, Dubai Marina, Dubai, UAE',
      rating: 4.9,
      reviewCount: 234,
      specialties: ['ceramic coating', 'paint correction', 'interior detailing', 'paint protection film', 'headlight restoration'],
      category: 'detailing',
      openingHours: {
        weekdays: '09:00 - 18:00',
        weekends: '10:00 - 16:00',
        friday: '14:00 - 18:00',
      },
      phone: '+971-50-123-4567',
      whatsapp: '+971-50-123-4567',
      email: 'info@carcareprodetailing.com',
      website: 'www.carcareprodetailing.com',
      badges: ['premium partner', 'detailing expert', 'certified installer'],
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1000&auto=format&fit=crop',
      ],
      description: 'CarCare Pro Detailing is Dubai Marina\'s premier automotive detailing center, specializing in paint correction, ceramic coatings, and comprehensive car care services. With over 8 years of experience and state-of-the-art equipment, we provide exceptional results that protect and enhance your vehicle\'s appearance.',
      services: [
        {
          name: 'Basic Wash & Wax',
          description: 'Exterior wash, clay bar treatment, and premium wax application',
          duration: '2-3 hours',
          price: { min: 180, max: 250, currency: 'AED' },
        },
        {
          name: 'Paint Correction',
          description: 'Multi-stage polishing to remove swirl marks and scratches',
          duration: '6-8 hours',
          price: { min: 800, max: 1500, currency: 'AED' },
        },
        {
          name: 'Ceramic Coating',
          description: '9H hardness ceramic coating with 2-year warranty',
          duration: '2 days',
          price: { min: 2500, max: 4500, currency: 'AED' },
        },
        {
          name: 'Interior Detailing',
          description: 'Complete interior cleaning, conditioning, and protection',
          duration: '3-4 hours',
          price: { min: 300, max: 600, currency: 'AED' },
        },
        {
          name: 'Paint Protection Film',
          description: 'Clear protective film installation for high-impact areas',
          duration: '1-2 days',
          price: { min: 1500, max: 3500, currency: 'AED' },
        },
      ],
      features: [
        'State-of-the-art equipment',
        'Certified technicians',
        'Premium products only',
        'Warranty on all services',
        'Free pickup & delivery',
        'Climate-controlled facility',
      ],
      certifications: [
        'IDA Certified Detailer',
        'Ceramic Pro Authorized Installer',
        'XPEL Paint Protection Film Installer',
        'ISO 9001:2015 Quality Management',
      ],
      owner: {
        name: 'Mohammad Hassan',
        experience: '8+ years',
        specialization: 'Paint Correction & Ceramic Coatings',
        certifications: 3,
      },
      gallery: [
        {
          before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000&auto=format&fit=crop',
          after: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1000&auto=format&fit=crop',
          service: 'Paint Correction',
        },
      ],
      reviews: [
        {
          id: 1,
          name: 'Ahmed Al-Mansouri',
          rating: 5,
          date: '2024-01-15',
          comment: 'Exceptional service! My BMW looks brand new after the ceramic coating. Highly recommended.',
          service: 'Ceramic Coating',
        },
        {
          id: 2,
          name: 'Sarah Johnson',
          rating: 5,
          date: '2024-01-10',
          comment: 'Professional team and amazing results. The paint correction service exceeded my expectations.',
          service: 'Paint Correction',
        },
      ],
    },
    'quick-service-auto-care': {
      id: 'quick-service-auto-care',
      name: 'Quick Service Auto Care',
      location: 'Business Bay, Dubai',
      fullAddress: 'Bay Avenue, Level 1, Business Bay, Dubai, UAE',
      rating: 4.7,
      reviewCount: 156,
      specialties: ['oil change', 'brake service', 'tire replacement', 'battery replacement', 'engine diagnostics'],
      category: 'maintenance',
      openingHours: {
        weekdays: '08:00 - 20:00',
        weekends: '09:00 - 18:00',
        friday: '14:00 - 20:00',
      },
      phone: '+971-50-234-5678',
      whatsapp: '+971-50-234-5678',
      email: 'info@quickserviceauto.com',
      website: 'www.quickserviceauto.com',
      badges: ['certified service', 'quick turnaround', 'warranty provided'],
      images: [
        'https://images.unsplash.com/photo-1632478675096-89470a2cb004?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=1000&auto=format&fit=crop',
      ],
      description: 'Quick Service Auto Care provides fast, reliable automotive maintenance services in Business Bay. Our certified technicians offer comprehensive vehicle care with same-day service availability for most repairs.',
      services: [
        {
          name: 'Oil Change Service',
          description: 'Complete oil and filter change with multi-point inspection',
          duration: '30-45 minutes',
          price: { min: 120, max: 180, currency: 'AED' },
        },
        {
          name: 'Brake Service',
          description: 'Brake pad replacement, rotor resurfacing, and brake fluid change',
          duration: '2-3 hours',
          price: { min: 300, max: 600, currency: 'AED' },
        },
        {
          name: 'Battery Replacement',
          description: 'Battery testing, replacement, and electrical system check',
          duration: '1-2 hours',
          price: { min: 250, max: 450, currency: 'AED' },
        },
      ],
      features: [
        'Same-day service available',
        'Certified mechanics',
        'Genuine parts only',
        '6-month service warranty',
        'Free vehicle inspection',
        'Comfortable waiting area',
      ],
      certifications: [
        'ASE Certified Service Center',
        'Manufacturer Authorized Service',
        'ISO 14001 Environmental Management',
        'UAE Road Transport Authority Approved',
      ],
      owner: {
        name: 'Khalid Al-Rashid',
        experience: '12+ years',
        specialization: 'Engine Diagnostics & Repair',
        certifications: 5,
      },
      gallery: [
        {
          before: 'https://images.unsplash.com/photo-1632478675096-89470a2cb004?q=80&w=1000&auto=format&fit=crop',
          after: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=1000&auto=format&fit=crop',
          service: 'Engine Service',
        },
      ],
      reviews: [
        {
          id: 1,
          name: 'Fatima Al-Zahra',
          rating: 5,
          date: '2024-01-18',
          comment: 'Quick and professional service. Had my oil changed in 30 minutes with excellent customer service.',
          service: 'Oil Change',
        },
        {
          id: 2,
          name: 'Robert Wilson',
          rating: 4,
          date: '2024-01-12',
          comment: 'Good service quality and fair pricing. Will definitely return for future maintenance.',
          service: 'Brake Service',
        },
      ],
    },
  };

  return services[serviceId as keyof typeof services] || null;
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

export default async function ServicePage({ params }: ServicePageProps) {
  const { service } = await params;
  const serviceData = getServiceData(service);

  if (!serviceData) {
    return (
      <main className='min-h-screen bg-white font-montserrat py-20'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='text-center py-24'>
            <h1 className='text-4xl font-light text-gray-900 mb-4'>Service Not Found</h1>
            <p className='text-gray-500 font-light mb-8'>The service you're looking for doesn't exist or is no longer available.</p>
            <Link href='/auto-services'>
              <Button variant='outline' className='gap-2 border-gray-200 hover:border-gray-300 font-light'>
                <ArrowLeft size={16} />
                Back to Services
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='min-h-screen bg-white font-montserrat py-20'>
      <ServiceContent serviceData={serviceData} />
    </main>
  );
}

function ServiceContent({ serviceData }: { serviceData: any }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className='max-w-7xl mx-auto px-6 lg:px-8'>
      {/* Back Button */}
      <div className='mb-8'>
        <Link href='/auto-services'>
          <Button variant='ghost' className='gap-2 text-gray-600 hover:text-gray-900 font-light'>
            <ArrowLeft size={16} />
            Back to Services
          </Button>
        </Link>
      </div>

      {/* Service Header */}
      <motion.div
        className='bg-white rounded-lg p-8 md:p-12 border border-gray-50 shadow-sm mb-16'
        variants={headerVariants}
        initial='hidden'
        animate='visible'
      >
        <div className='grid lg:grid-cols-2 gap-12'>
          {/* Service Info */}
          <div>
            <div className='flex flex-wrap gap-2 mb-4'>
              {serviceData.badges.map((badge: string) => (
                <Badge key={badge} className='bg-white/90 text-gray-700 border-0 shadow-sm text-xs font-light'>
                  {badge}
                </Badge>
              ))}
            </div>

            <h1 className='text-3xl md:text-4xl font-light text-gray-900 mb-4'>{serviceData.name}</h1>

            <div className='flex items-center gap-4 text-sm text-gray-400 mb-6'>
              <div className='flex items-center gap-1'>
                <Star className='w-4 h-4 text-gray-400 fill-current' />
                <span className='font-light text-gray-900'>{serviceData.rating}</span>
                <span className='font-light'>({serviceData.reviewCount} reviews)</span>
              </div>
              <span className='flex items-center gap-1'>
                <MapPin className='w-4 h-4' />
                {serviceData.location}
              </span>
            </div>

            <p className='text-gray-500 font-light leading-relaxed mb-8'>{serviceData.description}</p>

            {/* Specialties */}
            <div className='mb-8'>
              <h3 className='text-lg font-light text-gray-900 mb-4'>Specialties</h3>
              <div className='flex flex-wrap gap-2'>
                {serviceData.specialties.map((specialty: string) => (
                  <Badge key={specialty} variant='secondary' className='text-xs bg-gray-50 text-gray-600 border-0'>
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Contact Buttons */}
            <div className='flex gap-4'>
              <motion.div className='flex-1' whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a
                  href={`tel:${serviceData.phone}`}
                  className='w-full bg-gray-900 hover:bg-gray-800 text-white font-light py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2'
                >
                  <Phone size={16} />
                  Call Now
                </a>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a
                  href={`https://wa.me/${serviceData.whatsapp.replace(/[^0-9]/g, '')}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200'
                >
                  <MessageCircle size={16} />
                </a>
              </motion.div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className='space-y-4'>
            <div className='relative h-96 rounded-lg overflow-hidden'>
              <Image
                src={serviceData.images[currentImageIndex]}
                alt={serviceData.name}
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, 50vw'
              />
              <div className='absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-light flex items-center gap-1'>
                <Camera size={12} />
                {currentImageIndex + 1} / {serviceData.images.length}
              </div>
            </div>

            <div className='grid grid-cols-4 gap-2'>
              {serviceData.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    currentImageIndex === index ? 'border-gray-400' : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${serviceData.name} - ${index + 1}`}
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 25vw, 12.5vw'
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Services & Pricing */}
      <motion.section
        className='mb-16'
        variants={cardVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
      >
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-light text-gray-900 mb-4'>Services & Pricing</h2>
          <p className='text-gray-400 font-light'>Professional automotive services with transparent pricing</p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {serviceData.services.map((service: any, index: number) => (
            <motion.div
              key={service.name}
              className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm hover:shadow-md transition-all duration-300'
              variants={cardVariants}
              initial='hidden'
              whileInView='visible'
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -2 }}
            >
              <h3 className='text-lg font-light text-gray-900 mb-3'>{service.name}</h3>
              <p className='text-gray-500 font-light text-sm mb-4 leading-relaxed'>{service.description}</p>

              <div className='space-y-2 mb-4'>
                <div className='flex items-center gap-2 text-sm'>
                  <Clock className='w-4 h-4 text-gray-400' />
                  <span className='text-gray-600 font-light'>{service.duration}</span>
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-400 font-light'>Price Range</span>
                <span className='text-lg font-light text-gray-900'>
                  {service.price.min} - {service.price.max} {service.price.currency}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Details Grid */}
      <div className='grid lg:grid-cols-3 gap-8 mb-16'>
        {/* Operating Hours */}
        <motion.div
          className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <div className='flex items-center gap-3 mb-6'>
            <Clock className='w-6 h-6 text-gray-600' />
            <h3 className='text-xl font-light text-gray-900'>Operating Hours</h3>
          </div>
          <div className='space-y-3'>
            <div className='flex justify-between items-center'>
              <span className='text-gray-600 font-light'>Monday - Thursday</span>
              <Badge variant='secondary' className='text-xs font-light bg-green-50 text-green-700'>
                {serviceData.openingHours.weekdays}
              </Badge>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-600 font-light'>Friday</span>
              <Badge variant='secondary' className='text-xs font-light bg-green-50 text-green-700'>
                {serviceData.openingHours.friday}
              </Badge>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-600 font-light'>Saturday - Sunday</span>
              <Badge variant='secondary' className='text-xs font-light bg-green-50 text-green-700'>
                {serviceData.openingHours.weekends}
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h3 className='text-xl font-light text-gray-900 mb-6'>Features & Benefits</h3>
          <div className='space-y-3'>
            {serviceData.features.map((feature: string, index: number) => (
              <div key={index} className='flex items-center gap-3'>
                <CheckCircle className='w-4 h-4 text-green-600 flex-shrink-0' />
                <span className='text-gray-600 font-light text-sm'>{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'
          variants={cardVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h3 className='text-xl font-light text-gray-900 mb-6'>Contact Information</h3>
          <div className='space-y-4'>
            <div>
              <p className='text-sm text-gray-400 font-light mb-1'>Address</p>
              <p className='text-gray-600 font-light'>{serviceData.fullAddress}</p>
            </div>
            <div>
              <p className='text-sm text-gray-400 font-light mb-1'>Phone</p>
              <p className='text-gray-600 font-light'>{serviceData.phone}</p>
            </div>
            <div>
              <p className='text-sm text-gray-400 font-light mb-1'>Email</p>
              <p className='text-gray-600 font-light'>{serviceData.email}</p>
            </div>
            <div>
              <p className='text-sm text-gray-400 font-light mb-1'>Website</p>
              <p className='text-gray-600 font-light'>{serviceData.website}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Owner/Expert Information */}
      <motion.section
        className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm mb-16'
        variants={cardVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
      >
        <h3 className='text-xl font-light text-gray-900 mb-6'>Meet the Expert</h3>
        <div className='grid md:grid-cols-2 gap-8'>
          <div>
            <h4 className='text-lg font-light text-gray-900 mb-4'>{serviceData.owner.name}</h4>
            <div className='space-y-2 text-sm mb-6'>
              <div className='flex justify-between'>
                <span className='text-gray-500 font-light'>Experience</span>
                <span className='text-gray-900 font-light'>{serviceData.owner.experience}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-500 font-light'>Specialization</span>
                <span className='text-gray-900 font-light'>{serviceData.owner.specialization}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-500 font-light'>Certifications</span>
                <span className='text-gray-900 font-light'>{serviceData.owner.certifications}</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className='text-lg font-light text-gray-900 mb-4'>Certifications</h4>
            <div className='space-y-2'>
              {serviceData.certifications.map((cert: string, index: number) => (
                <div key={index} className='flex items-center gap-3'>
                  <Award className='w-4 h-4 text-blue-600 flex-shrink-0' />
                  <span className='text-gray-600 font-light text-sm'>{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Reviews Section */}
      <motion.section
        variants={cardVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
      >
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-light text-gray-900 mb-4'>Customer Reviews</h2>
          <p className='text-gray-400 font-light'>What our customers say about our services</p>
        </div>

        <div className='grid md:grid-cols-2 gap-8'>
          {serviceData.reviews.map((review: any, index: number) => (
            <motion.div
              key={review.id}
              className='bg-white rounded-lg p-8 border border-gray-50 shadow-sm'
              variants={cardVariants}
              initial='hidden'
              whileInView='visible'
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className='flex items-center justify-between mb-4'>
                <div>
                  <p className='font-light text-gray-900 mb-1'>{review.name}</p>
                  <div className='flex items-center gap-1'>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className='w-4 h-4 text-gray-400 fill-current' />
                    ))}
                  </div>
                </div>
                <div className='text-right'>
                  <Badge className='bg-gray-100 text-gray-600 border-0 text-xs font-light mb-1'>
                    {review.service}
                  </Badge>
                  <p className='text-xs text-gray-400 font-light'>{review.date}</p>
                </div>
              </div>
              <p className='text-gray-600 font-light leading-relaxed'>{review.comment}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}