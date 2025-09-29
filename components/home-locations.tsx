import AnimatedSections from './ui/animated-sections-1';

export default function HomeLocations() {
  return (
    <section className='font-montserrat'>
      {/* Header Section */}
      <div className='bg-white py-16 px-6 text-center'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight'>
            Available Locations
          </h2>
          <p className='text-lg text-gray-500 font-light leading-relaxed max-w-2xl mx-auto'>
            Discover our car rental services across the UAE's major cities
          </p>
        </div>
      </div>

      {/* Animated Locations */}
      <AnimatedSections
        sections={[
          {
            img: '/locations/loc-1.jpg',
            text: 'Dubai',
          },
          {
            img: '/locations/loc-2.jpg',
            text: 'Abu Dhabi',
          },
          {
            img: '/locations/loc-3.jpg',
            text: 'Sharjah',
          },
          {
            img: '/locations/loc-4.jpg',
            text: 'Ajman',
          },
        ]}
      />
    </section>
  );
}
