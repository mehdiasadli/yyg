'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Calendar, MapPin, Car, Users, Phone, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BrandContent from './content';

interface BrandPageProps {
  params: Promise<{ brand: string }>;
}

// Brand data - in a real app, this would come from a database
const brands = [
  {
    id: 'lamborghini',
    name: 'Lamborghini',
    logo: '/car-logos/lambo.png',
    description: 'Italian Excellence',
    category: 'Luxury',
    vehicleCount: 24,
    rating: 4.9,
    established: 1963,
    country: 'Italy',
    featured: true,
    about:
      'Lamborghini is an Italian luxury sports car manufacturer founded in 1963. Known for their powerful engines, striking designs, and exceptional performance, Lamborghini cars represent the pinnacle of automotive excellence.',
    headquarters: "Sant'Agata Bolognese, Italy",
    founder: 'Ferruccio Lamborghini',
    website: 'https://www.lamborghini.com',
  },
  {
    id: 'ferrari',
    name: 'Ferrari',
    logo: '/car-logos/ferrari.png',
    description: 'Racing Heritage',
    category: 'Sports',
    vehicleCount: 18,
    rating: 4.8,
    established: 1939,
    country: 'Italy',
    featured: true,
    about:
      'Ferrari is an Italian luxury sports car manufacturer founded in 1939. With a rich racing heritage and iconic red cars, Ferrari represents speed, passion, and Italian craftsmanship at its finest.',
    headquarters: 'Maranello, Italy',
    founder: 'Enzo Ferrari',
    website: 'https://www.ferrari.com',
  },
  {
    id: 'bentley',
    name: 'Bentley',
    logo: '/car-logos/bentley.png',
    description: 'British Luxury',
    category: 'Luxury',
    vehicleCount: 32,
    rating: 4.7,
    established: 1919,
    country: 'United Kingdom',
    featured: true,
    about:
      'Bentley is a British luxury car manufacturer founded in 1919. Known for their handcrafted interiors, powerful engines, and timeless elegance, Bentley cars offer the ultimate in luxury motoring.',
    headquarters: 'Crewe, England',
    founder: 'W.O. Bentley',
    website: 'https://www.bentley.com',
  },
  {
    id: 'mercedes',
    name: 'Mercedes-Benz',
    logo: '/car-logos/mercedes.png',
    description: 'German Engineering',
    category: 'Premium',
    vehicleCount: 45,
    rating: 4.6,
    established: 1926,
    country: 'Germany',
    featured: true,
    about:
      'Mercedes-Benz is a German luxury automotive brand founded in 1926. Known for their innovative technology, safety features, and premium quality, Mercedes-Benz sets the standard for luxury automobiles.',
    headquarters: 'Stuttgart, Germany',
    founder: 'Karl Benz & Gottlieb Daimler',
    website: 'https://www.mercedes-benz.com',
  },
];

// Car data for rental - in a real app, this would come from a database
const generateBrandCars = (brandName: string) => [
  {
    id: '1',
    name: `${brandName} Aventador`,
    year: 2023,
    images: [
      'https://images.unsplash.com/photo-1610099610040-ab19f3a5ec35?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1661589997089-405a6076fc18?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    premium: true,
    link: `/cars/${brandName.toLowerCase()}-aventador`,
    category: 'Supercar',
    features: {
      transmission: 'Automatic',
      fuel: 'Petrol',
      seats: 2,
    },
    contact: {
      name: 'Ahmed Al-Rashid',
      phone: '+971-50-123-4567',
      whatsapp: '+971-50-123-4567',
    },
    price: {
      daily: {
        km: 300,
        amount: 2500,
        currency: 'AED',
      },
      weekly: {
        km: 2000,
        amount: 15000,
        currency: 'AED',
      },
      monthly: {
        km: 5000,
        amount: 45000,
        currency: 'AED',
      },
    },
  },
  {
    id: '2',
    name: `${brandName} Huracán`,
    year: 2022,
    images: [
      'https://images.unsplash.com/photo-1610099610040-ab19f3a5ec35?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1661589997089-405a6076fc18?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    premium: false,
    link: `/cars/${brandName.toLowerCase()}-huracan`,
    category: 'Sports car',
    features: {
      transmission: 'Automatic',
      fuel: 'Petrol',
      seats: 2,
    },
    contact: {
      name: 'Sarah Johnson',
      phone: '+971-50-987-6543',
      whatsapp: '+971-50-987-6543',
    },
    price: {
      daily: {
        km: 300,
        amount: 1800,
        currency: 'AED',
      },
      weekly: {
        km: 2000,
        amount: 12000,
        currency: 'AED',
      },
      monthly: {
        km: 5000,
        amount: 35000,
        currency: 'AED',
      },
    },
  },
  {
    id: '3',
    name: `${brandName} Urus`,
    year: 2023,
    images: [
      'https://images.unsplash.com/photo-1610099610040-ab19f3a5ec35?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1661589997089-405a6076fc18?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    premium: true,
    link: `/cars/${brandName.toLowerCase()}-urus`,
    category: 'SUV',
    features: {
      transmission: 'Automatic',
      fuel: 'Petrol',
      seats: 5,
    },
    contact: {
      name: 'Mohammed Al-Zahra',
      phone: '+971-50-555-1234',
      whatsapp: '+971-50-555-1234',
    },
    price: {
      daily: {
        km: 300,
        amount: 1200,
        currency: 'AED',
      },
      weekly: {
        km: 2000,
        amount: 8000,
        currency: 'AED',
      },
      monthly: {
        km: 5000,
        amount: 25000,
        currency: 'AED',
      },
    },
  },
];

export default async function BrandPage({ params }: BrandPageProps) {
  const { brand } = await params;
  const brandData = brands.find((b) => b.id === brand);
  const brandCars = brandData ? generateBrandCars(brandData.name) : [];

  if (!brandData) {
    return (
      <main className='min-h-screen bg-white font-montserrat py-20'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='text-center py-24'>
            <h1 className='text-4xl font-light text-gray-900 mb-4'>Brand Not Found</h1>
            <p className='text-gray-500 font-light mb-8'>The brand you're looking for doesn't exist.</p>
            <Link href='/brands'>
              <Button variant='outline' className='gap-2 border-gray-200 hover:border-gray-300 font-light'>
                <ArrowLeft size={16} />
                Back to Brands
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='min-h-screen bg-white font-montserrat py-20'>
      <BrandContent brandData={brandData} brandCars={brandCars} />
    </main>
  );
}
