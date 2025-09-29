import Hero from '@/components/hero/hero';
import HomeBrands from '@/components/home-brands';
import WhyYayago from '@/components/why-yayago';
import HomeExploreCars from '@/components/home-explore-cars';
import HomeLocations from '@/components/home-locations';
import WhyChooseUs from '@/components/why-choose-us';
import HomeRentalCompany from '@/components/home-rental-company';

export default function Home() {
  return (
    <main className='relative'>
      {/* Global sophisticated background */}
      <div className='fixed inset-0 -z-20 bg-gradient-to-br from-gray-100 via-slate-100 to-gray-200' />

      {/* Subtle pattern overlay */}
      <div className='fixed inset-0 -z-19 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,_rgb(0,0,0)_1px,_transparent_0)] bg-[length:24px_24px]' />

      {/* Elegant gradient overlays */}
      <div className='fixed inset-0 -z-18 bg-gradient-to-br from-blue-100/20 via-transparent to-purple-100/15' />
      <div className='fixed inset-0 -z-17 bg-gradient-to-tr from-transparent via-amber-100/10 to-transparent' />

      {/* Floating geometric elements */}
      <div
        className='fixed top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl animate-pulse'
        style={{ animationDuration: '8s' }}
      />
      <div
        className='fixed bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-amber-100/15 to-orange-100/15 rounded-full blur-3xl animate-pulse'
        style={{ animationDuration: '10s', animationDelay: '2s' }}
      />
      <div
        className='fixed top-3/4 left-1/2 w-64 h-64 bg-gradient-to-br from-emerald-100/10 to-teal-100/10 rounded-full blur-3xl animate-pulse'
        style={{ animationDuration: '12s', animationDelay: '4s' }}
      />

      <Hero />
      <HomeBrands />
      <WhyYayago />
      <HomeExploreCars />
      <HomeLocations />
      <WhyChooseUs />
      <HomeRentalCompany />
    </main>
  );
}
