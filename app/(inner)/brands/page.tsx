import { Suspense } from 'react';
import { Search, Star, Users, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

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
  },
  {
    id: 'mercedes',
    name: 'Mercedes-Benz',
    logo: '/car-logos/mercedes.png',
    description: 'German Engineering',
    category: 'Premium',
    vehicleCount: 156,
    rating: 4.6,
    established: 1926,
    country: 'Germany',
    featured: false,
  },
  {
    id: 'pagani',
    name: 'Pagani',
    logo: '/car-logos/pagani.png',
    description: 'Hypercar Artistry',
    category: 'Hypercar',
    vehicleCount: 8,
    rating: 5.0,
    established: 1992,
    country: 'Italy',
    featured: true,
  },
  {
    id: 'rolls-royce',
    name: 'Rolls-Royce',
    logo: '/car-logos/rolls-royce.png',
    description: 'Ultimate Luxury',
    category: 'Ultra-Luxury',
    vehicleCount: 28,
    rating: 4.9,
    established: 1906,
    country: 'United Kingdom',
    featured: true,
  },
  {
    id: 'audi',
    name: 'Audi',
    logo: '/car-logos/audi.png',
    description: 'Progressive Technology',
    category: 'Premium',
    vehicleCount: 134,
    rating: 4.5,
    established: 1909,
    country: 'Germany',
    featured: false,
  },
  {
    id: 'bmw',
    name: 'BMW',
    logo: '/car-logos/bmw.png',
    description: 'Ultimate Driving Machine',
    category: 'Premium',
    vehicleCount: 142,
    rating: 4.6,
    established: 1916,
    country: 'Germany',
    featured: false,
  },
  {
    id: 'porsche',
    name: 'Porsche',
    logo: '/car-logos/porsche.png',
    description: 'Sports Car Excellence',
    category: 'Sports',
    vehicleCount: 89,
    rating: 4.8,
    established: 1931,
    country: 'Germany',
    featured: false,
  },
  {
    id: 'bugatti',
    name: 'Bugatti',
    logo: '/car-logos/bugatti.png',
    description: 'French Passion',
    category: 'Luxury',
    vehicleCount: 41,
    rating: 4.7,
    established: 1914,
    country: 'France',
    featured: false,
  },
  {
    id: 'tesla',
    name: 'Tesla',
    logo: '/car-logos/tesla.png',
    description: 'Electric Innovation',
    category: 'Electric',
    vehicleCount: 78,
    rating: 4.4,
    established: 2003,
    country: 'United States',
    featured: false,
  },
  {
    id: 'lexus',
    name: 'Lexus',
    logo: '/car-logos/lexus.png',
    description: 'Japanese Luxury',
    category: 'Luxury',
    vehicleCount: 67,
    rating: 4.5,
    established: 1989,
    country: 'Japan',
    featured: false,
  },
];

function SearchBar() {
  return (
    <div className='relative max-w-2xl mx-auto mb-12'>
      <div className='relative'>
        <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
        <Input
          type='text'
          placeholder='Search for brands'
          className='pl-12 pr-4 py-6 text-base bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200'
        />
      </div>
    </div>
  );
}

function BrandCard({ brand }: { brand: (typeof brands)[0] }) {
  return (
    <Link href={`/brands/${brand.id}`} className='group block h-full'>
      <div className='relative bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100/50 hover:border-gray-200 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 h-full flex flex-col'>
        {/* Featured Badge */}
        {brand.featured && (
          <div className='absolute top-4 right-4 px-2 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-medium rounded-full shadow-sm'>
            Featured
          </div>
        )}

        {/* Logo */}
        <div className='flex items-center justify-center h-20 mb-6 flex-shrink-0'>
          <div className='relative transform group-hover:scale-110 transition-transform duration-300'>
            <Image
              src={brand.logo}
              alt={brand.name}
              width={80}
              height={80}
              className='object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-200'
            />
          </div>
        </div>

        {/* Brand Info */}
        <div className='flex-grow flex flex-col'>
          <div className='text-center mb-4'>
            <h3 className='text-lg font-medium text-gray-900 mb-2 group-hover:text-primary transition-colors duration-200'>
              {brand.name}
            </h3>
            <p className='text-sm text-gray-500 font-light'>{brand.description}</p>
          </div>

          {/* Stats */}
          <div className='mt-auto space-y-3'>
            <div className='flex items-center justify-between text-sm'>
              <div className='flex items-center gap-1 text-gray-600'>
                <Users size={14} />
                <span>{brand.vehicleCount} vehicles</span>
              </div>
              <div className='flex items-center gap-1 text-amber-600'>
                <Star size={14} fill='currentColor' />
                <span className='font-medium'>{brand.rating}</span>
              </div>
            </div>

            <div className='flex items-center justify-between text-xs text-gray-500'>
              <div className='flex items-center gap-1'>
                <Globe size={12} />
                <span>{brand.country}</span>
              </div>
              <span>Est. {brand.established}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function BrandsGrid() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
      {brands.map((brand) => (
        <BrandCard key={brand.id} brand={brand} />
      ))}
    </div>
  );
}

export default function BrandsPage() {
  const totalVehicles = brands.reduce((sum, brand) => sum + brand.vehicleCount, 0);
  const featuredBrands = brands.filter((brand) => brand.featured);

  return (
    <main className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 font-montserrat py-20'>
      {/* Header Section */}
      <div className='relative py-24 px-6'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-tight'>
              Premium Car Brands
            </h1>
            <p className='text-lg md:text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed mb-8'>
              Discover our curated collection of the world's most prestigious automotive manufacturers. From Italian
              supercars to German engineering excellence, find your perfect ride.
            </p>

            {/* Quick Stats */}
            <div className='flex flex-wrap justify-center gap-8 mb-12'>
              <div className='text-center'>
                <div className='text-2xl font-medium text-primary mb-1'>{brands.length}</div>
                <div className='text-sm text-gray-500 font-light'>Premium Brands</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-medium text-primary mb-1'>{totalVehicles}+</div>
                <div className='text-sm text-gray-500 font-light'>Available Vehicles</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-medium text-primary mb-1'>{featuredBrands.length}</div>
                <div className='text-sm text-gray-500 font-light'>Featured Collections</div>
              </div>
            </div>
          </div>

          <Suspense fallback={<div className='h-16 bg-gray-200 rounded-2xl animate-pulse' />}>
            <SearchBar />
          </Suspense>
        </div>
      </div>

      {/* Brands Grid */}
      <div className='relative pb-24 px-6'>
        <div className='max-w-7xl mx-auto'>
          <Suspense
            fallback={
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6'>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className='h-80 bg-gray-200 rounded-2xl animate-pulse' />
                ))}
              </div>
            }
          >
            <BrandsGrid />
          </Suspense>
        </div>
      </div>

      {/* Information Section */}
      <div className='relative py-24 px-6 bg-white/50 backdrop-blur-md border-t border-gray-100/50'>
        <div className='max-w-4xl mx-auto text-center'>
          <div className='mb-16'>
            <h2 className='text-3xl md:text-4xl font-light text-gray-900 mb-8 tracking-tight'>
              Why Choose Premium Brands?
            </h2>
            <p className='text-lg text-gray-600 font-light leading-relaxed max-w-3xl mx-auto'>
              Our carefully curated selection of premium automotive brands ensures you have access to the finest
              vehicles with exceptional quality, performance, and luxury features.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-12 mb-16'>
            <div className='text-center'>
              <h3 className='text-lg font-medium text-gray-900 mb-3'>Verified Quality</h3>
              <p className='text-gray-600 font-light leading-relaxed'>
                Every vehicle undergoes rigorous inspection and meets our premium standards for excellence and
                reliability.
              </p>
            </div>

            <div className='text-center'>
              <h3 className='text-lg font-medium text-gray-900 mb-3'>Trusted Owners</h3>
              <p className='text-gray-600 font-light leading-relaxed'>
                Connect with verified owners who maintain their vehicles to the highest standards of care and service.
              </p>
            </div>

            <div className='text-center'>
              <h3 className='text-lg font-medium text-gray-900 mb-3'>Global Selection</h3>
              <p className='text-gray-600 font-light leading-relaxed'>
                Access to international brands and models from around the world, bringing luxury to your doorstep.
              </p>
            </div>
          </div>

          <div className='text-center pt-8 border-t border-gray-200/50'>
            <p className='text-gray-500 font-light'>
              Can't find your preferred brand?{' '}
              <Link href='/contact' className='text-primary hover:underline font-medium'>
                Contact us
              </Link>{' '}
              and we'll help you find the perfect vehicle.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
