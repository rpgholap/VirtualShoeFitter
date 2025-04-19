import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Camera, Search, Smartphone } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary to-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Try Before You Buy <br />
              <span className="text-yellow-300">Virtual Shoe Fitting</span>
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Experience shoes virtually with AI-powered precision. Try on with your webcam or Snapchat AR lenses!
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <Button asChild className="bg-white text-primary hover:bg-gray-100 shadow-lg">
                <Link href="/try-on">
                  <Camera className="mr-2 h-5 w-5" /> Try On Now
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/catalog">
                  <Search className="mr-2 h-5 w-5" /> Browse Catalog
                </Link>
              </Button>
            </div>
            
            <div className="mt-4 flex items-center">
              <Link href="/try-on?tab=snap" className="flex items-center group">
                <div className="flex items-center justify-center bg-[#FFFC00] rounded-full w-10 h-10 shadow-md group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86C3.55 17.04 3.6 17.25 3.57 17.45L3.17 19.94C3.06 20.56 3.53 21.02 4.1 20.91L6.56 20.4C6.77 20.36 6.97 20.41 7.14 20.51C8.5 21.29 10.14 21.69 11.81 21.69C14.6 21.69 17.21 20.61 19.09 18.73C20.97 16.85 22.05 14.24 22.05 11.46C22.04 6.45 17.96 2 12.04 2Z" />
                  </svg>
                </div>
                <span className="ml-2 text-white font-medium group-hover:underline">
                  Try with Snapchat Lenses
                </span>
                <Smartphone className="ml-2 h-4 w-4 text-white opacity-75" />
              </Link>
            </div>
          </div>
          <div className="hidden md:block relative">
            <img 
              src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              alt="Shoe try-on demonstration" 
              className="rounded-lg shadow-2xl rotate-3 z-20 relative" 
            />
            <div className="absolute top-[5%] right-[5%] bg-white/90 rounded-md p-2 shadow-lg z-30">
              <span className="text-xs font-medium text-green-500 flex items-center">
                <svg 
                  className="w-4 h-4 mr-1" 
                  fill="currentColor" 
                  viewBox="0 0 20 20" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                    clipRule="evenodd" 
                  />
                </svg>
                Perfect Fit
              </span>
            </div>
            <div className="absolute -bottom-4 -left-4 w-3/4 h-full bg-primary/20 rounded-lg z-10"></div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default HeroSection;
