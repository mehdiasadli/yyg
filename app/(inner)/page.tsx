import Hero from '@/components/hero/hero';
import HomeBrands from '@/components/home-brands';
import WhyYayago from '@/components/why-yayago';
import HomeExploreCars from '@/components/home-explore-cars';
import WhyChooseUs from '@/components/why-choose-us';
import HomeRentalCompany from '@/components/home-rental-company';

export default function Home() {
  return (
    <main>
      <Hero />
      <HomeBrands />
      <WhyYayago />
      <HomeExploreCars />
      <WhyChooseUs />
      <HomeRentalCompany />
    </main>
  );
}
