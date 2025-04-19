import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Apple, Monitor, SmartphoneIcon } from "lucide-react";
import { FaAndroid } from "react-icons/fa";

const DownloadCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Try On Shoes Virtually?</h2>
        <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
          Experience the future of shoe shopping with our AI-powered virtual fitting room. Start finding your perfect fit today!
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Button className="bg-white text-primary hover:bg-gray-100 shadow-lg w-full sm:w-auto">
            <Apple className="mr-2 h-5 w-5" /> Download for iOS
          </Button>
          <Button className="bg-white text-primary hover:bg-gray-100 shadow-lg w-full sm:w-auto">
            <FaAndroid className="mr-2 h-5 w-5" /> Download for Android
          </Button>
          <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
            <Link href="/try-on">
              <Monitor className="mr-2 h-5 w-5" /> Try on Web
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DownloadCTA;
