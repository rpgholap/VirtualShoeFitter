import { Link } from "wouter";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.5 12c0 3.59-2.91 6.5-6.5 6.5S6.5 15.59 6.5 12 9.41 5.5 13 5.5s6.5 2.91 6.5 6.5zM13 3C8.03 3 4 7.03 4 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path>
                <path d="M11 14h4v2h-4z"></path>
              </svg>
              <span className="ml-2 text-xl font-bold text-white">ShoeFit AR</span>
            </div>
            <p className="text-gray-400 mt-4">
              The ultimate AI-powered virtual shoe fitting experience. Try before you buy with augmented reality technology.
            </p>
            <div className="flex space-x-4 mt-6">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/catalog" className="text-gray-400 hover:text-white">Men's Shoes</Link></li>
              <li><Link href="/catalog" className="text-gray-400 hover:text-white">Women's Shoes</Link></li>
              <li><Link href="/catalog" className="text-gray-400 hover:text-white">Kids' Shoes</Link></li>
              <li><Link href="/catalog" className="text-gray-400 hover:text-white">New Arrivals</Link></li>
              <li><Link href="/catalog" className="text-gray-400 hover:text-white">Brands</Link></li>
              <li><Link href="/catalog" className="text-gray-400 hover:text-white">Sale</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Help</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white">How It Works</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white">FAQs</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white">Shipping</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white">Returns</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white">Size Guide</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest products and offers</p>
            <form className="mt-2">
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="rounded-r-none focus:ring-primary" 
                />
                <Button type="submit" className="rounded-l-none bg-primary text-white hover:bg-primary/90">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
            <p className="text-gray-500 text-xs mt-2">
              Join our community to get the latest updates and special offers.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} ShoeFit AR. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/about" className="text-gray-400 hover:text-white text-sm">
              About Us
            </Link>
            <Link href="/catalog" className="text-gray-400 hover:text-white text-sm">
              Shop
            </Link>
            <Link href="/try-on" className="text-gray-400 hover:text-white text-sm">
              Try-on
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
