import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Search, ShoppingBag, User, Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.5 12c0 3.59-2.91 6.5-6.5 6.5S6.5 15.59 6.5 12 9.41 5.5 13 5.5s6.5 2.91 6.5 6.5zM13 3C8.03 3 4 7.03 4 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path>
                  <path d="M11 14h4v2h-4z"></path>
                </svg>
                <span className="ml-2 text-xl font-bold text-primary">ShoeFit AR</span>
              </Link>
            </div>
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <Link href="/" className={`border-b-2 px-1 pt-1 font-medium ${isActive('/') ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-primary hover:border-primary'}`}>
                Home
              </Link>
              <Link href="/catalog" className={`border-b-2 px-1 pt-1 font-medium ${isActive('/catalog') ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-primary hover:border-primary'}`}>
                Catalog
              </Link>
              <Link href="/try-on" className={`border-b-2 px-1 pt-1 font-medium ${isActive('/try-on') ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-primary hover:border-primary'}`}>
                Try On
              </Link>
              <Link href="/about" className={`border-b-2 px-1 pt-1 font-medium ${isActive('/about') ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-primary hover:border-primary'}`}>
                About
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Shopping bag</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-3">
            <div className="space-y-1 pt-2 pb-3">
              <Link href="/" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'bg-primary-50 text-primary' : 'text-gray-700 hover:bg-gray-50 hover:text-primary'}`}>
                Home
              </Link>
              <Link href="/catalog" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/catalog') ? 'bg-primary-50 text-primary' : 'text-gray-700 hover:bg-gray-50 hover:text-primary'}`}>
                Catalog
              </Link>
              <Link href="/try-on" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/try-on') ? 'bg-primary-50 text-primary' : 'text-gray-700 hover:bg-gray-50 hover:text-primary'}`}>
                Try On
              </Link>
              <Link href="/about" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/about') ? 'bg-primary-50 text-primary' : 'text-gray-700 hover:bg-gray-50 hover:text-primary'}`}>
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
