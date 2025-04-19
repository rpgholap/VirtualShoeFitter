import HeroSection from '@/components/home/HeroSection';
import HowItWorks from '@/components/home/HowItWorks';
import ShoeCatalog from '@/components/shoes/ShoeCatalog';
import TryOnExperience from '@/components/try-on/TryOnExperience';
import Testimonials from '@/components/home/Testimonials';
import TechSection from '@/components/home/TechSection';
import DownloadCTA from '@/components/home/DownloadCTA';

const Home = () => {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <ShoeCatalog />
      <TryOnExperience />
      <Testimonials />
      <TechSection />
      <DownloadCTA />
    </>
  );
};

export default Home;
