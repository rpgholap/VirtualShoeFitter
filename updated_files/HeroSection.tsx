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
              Experience shoes virtually with AI-powered precision. Try on with your webcam or mobile AR technology!
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
                <div className="flex items-center justify-center bg-blue-600 rounded-full w-10 h-10 shadow-md group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 16H13V18H11V16ZM12.61 6.04C10.55 5.74 8.73 7.01 8.18 8.83C8 9.41 8.44 10 9.05 10H9.25C9.66 10 9.99 9.71 10.13 9.33C10.45 8.44 11.4 7.83 12.43 8.05C13.38 8.25 14.08 9.18 14 10.15C13.9 11.49 12.38 11.78 11.55 13.03C11.55 13.04 11.54 13.04 11.54 13.05C11.53 13.07 11.52 13.08 11.51 13.1C11.42 13.25 11.33 13.42 11.26 13.6C11.25 13.63 11.23 13.65 11.22 13.68C11.21 13.7 11.21 13.72 11.2 13.75C11.08 14.09 11 14.5 11 15H13C13 14.58 13.11 14.23 13.28 13.93C13.3 13.9 13.31 13.87 13.33 13.84C13.41 13.7 13.51 13.57 13.61 13.45C13.62 13.44 13.63 13.42 13.64 13.41C13.74 13.29 13.85 13.18 13.97 13.07C14.93 12.16 16.23 11.42 15.96 9.51C15.72 7.77 14.35 6.3 12.61 6.04Z" />
                  </svg>
                </div>
                <span className="ml-2 text-white font-medium group-hover:underline">
                  Try with Mobile AR
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
