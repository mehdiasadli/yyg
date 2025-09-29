import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ServiceContent from './service-content';

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
      specialties: [
        'ceramic coating',
        'paint correction',
        'interior detailing',
        'paint protection film',
        'headlight restoration',
      ],
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
      description:
        "CarCare Pro Detailing is Dubai Marina's premier automotive detailing center, specializing in paint correction, ceramic coatings, and comprehensive car care services. With over 8 years of experience and state-of-the-art equipment, we provide exceptional results that protect and enhance your vehicle's appearance.",
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
      description:
        'Quick Service Auto Care provides fast, reliable automotive maintenance services in Business Bay. Our certified technicians offer comprehensive vehicle care with same-day service availability for most repairs.',
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

export default async function ServicePage({ params }: ServicePageProps) {
  const { service } = await params;
  const serviceData = getServiceData(service);

  if (!serviceData) {
    return (
      <main className='min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30 font-montserrat py-20'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='text-center py-24'>
            <h1 className='text-4xl font-semibold text-slate-900 mb-4'>Service Not Found</h1>
            <p className='text-gray-600 font-light mb-8'>
              The service you're looking for doesn't exist or is no longer available.
            </p>
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
    <main className='min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30 font-montserrat py-20'>
      <ServiceContent serviceData={serviceData} />
    </main>
  );
}
