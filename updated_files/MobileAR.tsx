import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { snapLenses, type SnapLensOption } from "@/lib/snapLensData";

const MobileAR = () => {
  const [selectedExperience, setSelectedExperience] = useState<SnapLensOption | null>(null);

  const handleExperienceClick = (experience: SnapLensOption) => {
    setSelectedExperience(experience);
    // Open the AR experience in a new tab
    window.open(experience.lensUrl, "_blank");
  };

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Try Shoes with Mobile AR</h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Experience our shoes in augmented reality. Open these experiences on your mobile device for the best results.
          </p>
          
          <div className="mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {snapLenses.map((lens) => (
            <Card 
              key={lens.id} 
              className="overflow-hidden hover:shadow-lg transition-all hover:translate-y-[-5px] cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 border-2"
              onClick={() => handleExperienceClick(lens)}
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
                  <div className="text-white text-center z-10">
                    <div className="bg-blue-600/80 py-2 px-4 rounded-lg shadow-lg">
                      <span className="font-semibold">TRY ON THIS SHOE</span>
                    </div>
                  </div>
                </div>

              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-2 text-gray-900">{lens.name}</h3>
                <p className="text-gray-600 text-sm mb-6">{lens.description}</p>
                <Button 
                  variant="default" 
                  className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(lens.lensUrl, "_blank");
                  }}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Try-on Shoe
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobileAR;