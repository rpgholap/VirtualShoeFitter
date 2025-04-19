import { useEffect } from "react";
import TechSection from "@/components/home/TechSection";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import DownloadCTA from "@/components/home/DownloadCTA";

const About = () => {
  useEffect(() => {
    // Scroll to top when this page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">About ShoeFit AR</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Revolutionizing the way people shop for shoes with cutting-edge AI and AR technology.
            </p>
          </div>
          
          <div className="prose prose-lg mx-auto">
            <p>
              At ShoeFit AR, we're passionate about solving the common problems in online shoe shopping.
              Our innovative technology combines artificial intelligence with augmented reality to 
              create a seamless virtual try-on experience that helps you find the perfect fit.
            </p>
            
            <p>
              Founded in 2023, our team of technology experts and footwear enthusiasts set out to 
              transform the online shoe shopping experience. We believe that trying before buying 
              shouldn't be limited to physical stores, and our platform makes that possible from 
              anywhere, at any time.
            </p>
            
            <h2>Our Mission</h2>
            <p>
              To reduce returns, increase customer satisfaction, and make shoe shopping more 
              accessible by providing accurate, AI-powered virtual fitting technology for everyone.
            </p>
          </div>
        </div>
      </div>
      
      <HowItWorks />
      <TechSection />
      <Testimonials />
      <DownloadCTA />
    </>
  );
};

export default About;
