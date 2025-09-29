import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CarContent from './car-content';

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
      description:
        'Luxury SUV perfect for family trips and business travel. This BMW X5 features premium leather interior, advanced safety systems, and exceptional comfort. Recently serviced and maintained to the highest standards.',
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

export default async function CarPage({ params }: CarPageProps) {
  const { car } = await params;
  const carData = getCarData(car);

  if (!carData) {
    return (
      <main className='min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30 font-montserrat py-20'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='text-center py-24'>
            <h1 className='text-4xl font-semibold text-slate-900 mb-4'>Car Not Found</h1>
            <p className='text-slate-600 font-normal mb-8'>
              The car you're looking for doesn't exist or is no longer available.
            </p>
            <Link href='/rent'>
              <Button variant='outline' className='gap-2 border-slate-200 hover:border-slate-300 font-normal'>
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
    <main className='min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30 font-montserrat py-20 relative overflow-hidden'>
      {/* Elegant background elements */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.05)_0%,_transparent_50%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(168,85,247,0.04)_0%,_transparent_50%)]' />

      <div className='relative'>
        <CarContent carData={carData} />
      </div>
    </main>
  );
}
