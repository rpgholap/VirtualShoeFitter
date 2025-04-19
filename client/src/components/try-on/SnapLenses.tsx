import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { snapLenses, type SnapLensOption } from "@/lib/snapLensData";

const SnapLenses = () => {
  const [selectedLens, setSelectedLens] = useState<SnapLensOption | null>(null);

  const handleLensClick = (lens: SnapLensOption) => {
    setSelectedLens(lens);
    // Open the Snap lens in a new tab
    window.open(lens.lensUrl, "_blank");
  };

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Try with Snap AR</h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Experience our shoes in augmented reality using Snapchat. Open these lenses on your mobile device for the best experience.
          </p>
          
          <div className="flex justify-center mt-4">
            <div className="bg-[#FFFC00] p-2 rounded-full mb-6">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86C3.55 17.04 3.6 17.25 3.57 17.45L3.17 19.94C3.06 20.56 3.53 21.02 4.1 20.91L6.56 20.4C6.77 20.36 6.97 20.41 7.14 20.51C8.5 21.29 10.14 21.69 11.81 21.69C14.6 21.69 17.21 20.61 19.09 18.73C20.97 16.85 22.05 14.24 22.05 11.46C22.04 6.45 17.96 2 12.04 2ZM17.67 15.55C17.48 15.97 16.95 16.31 16.44 16.44C16.11 16.52 15.7 16.59 14.05 16.05C12.66 15.58 11.6 14.79 10.9 14.26C10.66 14.09 10.44 13.93 10.26 13.81C9.55 13.34 8.86 12.58 8.44 11.82C8.3 11.59 8.18 11.33 8.1 11.06C8.01 10.7 8.01 10.35 8.1 10.03C8.18 9.7 8.3 9.42 8.5 9.19C8.66 9.01 8.85 8.86 9.07 8.8C9.19 8.77 9.32 8.75 9.45 8.77C9.58 8.8 9.67 8.7 9.76 8.89C9.94 9.24 10.37 10.13 10.43 10.27C10.5 10.42 10.5 10.6 10.42 10.75C10.17 11.41 9.71 11.28 10.11 11.91C10.95 13.2 11.89 13.71 13.05 14.22C13.32 14.33 13.59 14.12 13.79 13.92C13.98 13.72 14.11 13.53 14.3 13.42C14.5 13.31 14.68 13.34 14.87 13.45C15.05 13.55 15.98 14.07 16.17 14.17C16.35 14.27 16.53 14.32 16.62 14.4C16.71 14.56 16.71 14.97 16.54 15.4L17.67 15.55Z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {snapLenses.map((lens) => (
            <Card 
              key={lens.id} 
              className="overflow-hidden hover:shadow-lg transition-all hover:translate-y-[-5px] cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 border-2"
              onClick={() => handleLensClick(lens)}
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0">
                  <img 
                    src={lens.shoeImageUrl} 
                    alt={lens.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-4/5 h-4/5 flex items-center justify-center">
                    <img 
                      src={lens.snapBgUrl} 
                      alt="Snap Lens Background"
                      className="max-h-full max-w-full object-contain"
                    />
                    <div className="absolute pointer-events-none flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-xs mb-2 font-semibold text-[#FFFC00]">OPEN IN</div>
                        <svg className="w-12 h-12 mx-auto" viewBox="0 0 24 24" fill="#FFFC00">
                          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86C3.55 17.04 3.6 17.25 3.57 17.45L3.17 19.94C3.06 20.56 3.53 21.02 4.1 20.91L6.56 20.4C6.77 20.36 6.97 20.41 7.14 20.51C8.5 21.29 10.14 21.69 11.81 21.69C14.6 21.69 17.21 20.61 19.09 18.73C20.97 16.85 22.05 14.24 22.05 11.46C22.04 6.45 17.96 2 12.04 2Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-[#FFFC00] rounded-full p-1">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86C3.55 17.04 3.6 17.25 3.57 17.45L3.17 19.94C3.06 20.56 3.53 21.02 4.1 20.91L6.56 20.4C6.77 20.36 6.97 20.41 7.14 20.51C8.5 21.29 10.14 21.69 11.81 21.69C14.6 21.69 17.21 20.61 19.09 18.73C20.97 16.85 22.05 14.24 22.05 11.46C22.04 6.45 17.96 2 12.04 2Z" />
                  </svg>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-2 text-gray-900">{lens.name}</h3>
                <p className="text-gray-600 text-sm mb-6">{lens.description}</p>
                <Button 
                  variant="default" 
                  className="w-full flex items-center justify-center bg-[#FFFC00] hover:bg-[#FFFC00]/90 text-black"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(lens.lensUrl, "_blank");
                  }}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open in Snapchat
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SnapLenses;