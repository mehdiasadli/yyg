'use client';

import { ChevronRight, ChevronLeft, Users, Fuel, Settings, Calendar, Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import { LiquidButton } from './animate-ui/primitives/buttons/liquid';

const cars = [
  {
    name: 'Mercedes-Benz S-Class',
    year: 2023,
    images: [
      'https://images.unsplash.com/photo-1610099610040-ab19f3a5ec35?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1661589997089-405a6076fc18?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    premium: true,
    link: '/cars/mercedes-s-class',
    category: 'Luxury car',
    features: {
      transmission: 'Automatic',
      fuel: 'Petrol',
      seats: 5,
    },
    contact: {
      name: 'Ahmed Al-Rashid',
      phone: '+971-50-123-4567',
      whatsapp: '+971-50-123-4567',
    },
    price: {
      daily: {
        km: 300,
        amount: 850,
        currency: 'AED',
      },
    },
  },
  {
    name: 'BMW X7',
    year: 2024,
    images: [
      'https://images.unsplash.com/photo-1701985470695-e430a8fdc8d6?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    premium: false,
    link: '/cars/bmw-x7',
    category: 'SUV',
    features: {
      transmission: 'Automatic',
      fuel: 'Hybrid',
      seats: 7,
    },
    contact: {
      name: 'Sarah Johnson',
      phone: '+971-55-987-6543',
      whatsapp: '+971-55-987-6543',
    },
    price: {
      daily: {
        km: 250,
        amount: 650,
        currency: 'AED',
      },
    },
  },
  {
    name: 'Audi R8',
    year: 2023,
    images: [
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    premium: true,
    link: '/cars/audi-r8',
    category: 'Sports car',
    features: {
      transmission: 'Automatic',
      fuel: 'Petrol',
      seats: 2,
    },
    contact: {
      name: 'Marco Rossi',
      phone: '+971-56-456-7890',
      whatsapp: '+971-56-456-7890',
    },
    price: {
      daily: {
        km: 200,
        amount: 1200,
        currency: 'AED',
      },
    },
  },
  {
    name: 'Range Rover Evoque',
    year: 2024,
    images: [
      'https://images.unsplash.com/photo-1638475408149-022148cf76fd?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    premium: false,
    link: '/cars/range-rover-evoque',
    category: 'SUV',
    features: {
      transmission: 'Automatic',
      fuel: 'Diesel',
      seats: 5,
    },
    contact: {
      name: 'Emma Wilson',
      phone: '+971-52-321-9876',
      whatsapp: '+971-52-321-9876',
    },
    price: {
      daily: {
        km: 300,
        amount: 750,
        currency: 'AED',
      },
    },
  },
  {
    name: 'Tesla Model S',
    year: 2024,
    images: [
      'https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    premium: true,
    link: '/cars/tesla-model-s',
    category: 'Electric',
    features: {
      transmission: 'Automatic',
      fuel: 'Electric',
      seats: 5,
    },
    contact: {
      name: 'David Chen',
      phone: '+971-54-789-0123',
      whatsapp: '+971-54-789-0123',
    },
    price: {
      daily: {
        km: 400,
        amount: 900,
        currency: 'AED',
      },
    },
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
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

export default function HomeExploreCars() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
    },
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className='font-montserrat relative py-24 px-6 bg-gradient-to-b from-slate-900 to-gray-900'>
      {/* Dark sophisticated background with luxury vehicles */}
      <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black' />

      {/* Luxury car showroom background */}
      <div className='absolute inset-0 opacity-[0.025]'>
        <img
          src='https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop&crop=center'
          alt='Luxury car showroom background'
          className='w-full h-full object-cover'
        />
      </div>

      {/* Elegant overlay gradients for dark theme */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/15' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(156,163,175,0.05)_0%,_transparent_70%)]' />

      {/* Subtle automotive elements */}
      <div className='absolute top-1/4 right-1/4 w-40 h-24 opacity-[0.02]'>
        <img
          src='https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=200&fit=crop'
          alt='Car silhouette'
          className='w-full h-full object-cover rounded-lg'
        />
      </div>

      <div className='max-w-7xl mx-auto relative'>
        <motion.header
          className='flex items-center justify-between mb-16'
          variants={headerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
        >
          <div>
            <h2 className='text-4xl md:text-5xl font-light text-white mb-4 tracking-tight'>
              Explore Featured Vehicles
            </h2>
            <p className='text-lg text-gray-300 font-light leading-relaxed max-w-xl'>
              Discover our carefully curated selection of premium vehicles
            </p>
          </div>

          <div className='hidden md:flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <button
                onClick={scrollPrev}
                className='p-2 rounded-full border border-gray-600 hover:border-gray-500 hover:bg-gray-800 transition-all duration-200'
              >
                <ChevronLeft size={20} className='text-gray-300' />
              </button>
              <button
                onClick={scrollNext}
                className='p-2 rounded-full border border-gray-600 hover:border-gray-500 hover:bg-gray-800 transition-all duration-200'
              >
                <ChevronRight size={20} className='text-gray-300' />
              </button>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <LiquidButton
                delay='0.2s'
                fillHeight='2px'
                hoverScale={1.05}
                tapScale={0.95}
                className='cursor-pointer text-sm font-medium px-6 py-3 h-12 overflow-hidden [--liquid-button-color:var(--primary)] [--liquid-button-background-color:var(--accent)] text-primary hover:text-primary-foreground'
              >
                <Link href='/cars' className='inline-flex items-center gap-2'>
                  <span>View All Vehicles</span>
                  <ChevronRight size={18} />
                </Link>
              </LiquidButton>
            </motion.div>
          </div>
        </motion.header>

        <div className='embla overflow-hidden' ref={emblaRef}>
          <motion.div
            className='embla__container flex gap-6'
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-50px' }}
          >
            {cars.map((car, index) => (
              <motion.div
                key={index}
                className='embla__slide flex-[0_0_90%] md:flex-[0_0_45%] lg:flex-[0_0_30%]'
                variants={itemVariants}
              >
                <Link href={car.link} className='group h-full block'>
                  <div className='relative bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-gray-700/60 hover:border-gray-600/80 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/25 h-full flex flex-col'>
                    {/* Car Image */}
                    <div className='relative h-48 bg-gray-800 overflow-hidden'>
                      <Image
                        src={car.images[0]}
                        alt={car.name}
                        fill
                        className='object-cover group-hover:scale-105 transition-transform duration-300'
                        sizes='(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw'
                      />

                      {/* Premium Badge */}
                      {car.premium && (
                        <div className='absolute top-3 right-3 px-2 py-1 bg-amber-500/90 backdrop-blur-sm text-white text-xs font-light rounded-full'>
                          Premium
                        </div>
                      )}

                      {/* Image Count Indicator */}
                      {car.images.length > 1 && (
                        <div className='absolute bottom-3 left-3 px-2 py-1 bg-gray-900/80 backdrop-blur-sm text-white text-xs font-light rounded-full'>
                          +{car.images.length - 1} more
                        </div>
                      )}
                    </div>

                    {/* Car Info */}
                    <div className='p-5 flex-grow flex flex-col'>
                      <div className='mb-4'>
                        <div className='flex items-center justify-between mb-2'>
                          <h3 className='font-light text-white text-lg group-hover:text-gray-200 transition-colors duration-200'>
                            {car.name}
                          </h3>
                          <span className='text-xs text-gray-400 font-light flex items-center gap-1'>
                            <Calendar size={12} />
                            {car.year}
                          </span>
                        </div>
                        <p className='text-sm text-gray-400 font-light mb-3'>{car.category}</p>

                        {/* Features */}
                        <div className='flex items-center gap-4 text-xs text-gray-500 font-light'>
                          <div className='flex items-center gap-1'>
                            <Users size={12} />
                            <span>{car.features.seats}</span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <Fuel size={12} />
                            <span>{car.features.fuel}</span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <Settings size={12} />
                            <span>{car.features.transmission}</span>
                          </div>
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className='mt-auto'>
                        <div className='flex items-center justify-between mb-3'>
                          <div>
                            <p className='text-xs text-gray-500 font-light mb-1'>Starting from</p>
                            <p className='text-lg font-light text-white'>
                              {car.price.daily.amount} <span className='text-sm'>{car.price.daily.currency}</span>
                              <span className='text-sm text-gray-400 font-light'>/day</span>
                            </p>
                          </div>
                          <div className='text-right'>
                            <p className='text-xs text-gray-500 font-light'>{car.price.daily.km} km included</p>
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className='pt-3 border-t border-gray-700/50'>
                          <div className='flex items-center justify-between'>
                            <p className='text-xs text-gray-500 font-light'>
                              <span className='text-gray-300 font-light'>{car.contact.name}</span>
                            </p>
                            <div className='flex items-center gap-2'>
                              <div className='p-1.5 rounded-full bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 transition-colors duration-200'>
                                <Phone size={10} />
                              </div>
                              <div className='p-1.5 rounded-full bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 transition-colors duration-200'>
                                <MessageCircle size={10} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile View All Button */}
        <div className='md:hidden mt-12 text-center'>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <LiquidButton
              delay='0.2s'
              fillHeight='2px'
              hoverScale={1.05}
              tapScale={0.95}
              className='cursor-pointer text-sm font-medium px-6 py-3 h-12 overflow-hidden [--liquid-button-color:var(--primary)] [--liquid-button-background-color:var(--accent)] text-primary hover:text-primary-foreground'
            >
              <Link href='/cars' className='inline-flex items-center gap-2'>
                <span>View All Vehicles</span>
                <ChevronRight size={18} />
              </Link>
            </LiquidButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
