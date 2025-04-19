import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import TryOnExperience from "@/components/try-on/TryOnExperience";
import SnapLenses from "@/components/try-on/SnapLenses";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Camera } from "lucide-react";

const TryOn = () => {
  const [location] = useLocation();
  // Extract parameters from URL
  const getParamsFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const shoeId = params.get('shoe');
    const tab = params.get('tab');
    
    return {
      shoeId: shoeId ? parseInt(shoeId) : undefined,
      tab: tab === 'snap' ? 'snap' : 'webcam'
    };
  };
  
  const { shoeId, tab } = getParamsFromUrl();
  const [activeTab, setActiveTab] = useState<string>(tab);

  useEffect(() => {
    // Scroll to top when this page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Virtual Try-On</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Experience how shoes will look on your feet with our advanced try-on technology
          </p>
        </div>
        
        <Tabs 
          defaultValue="webcam" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="mx-auto max-w-5xl"
        >
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="webcam" className="flex items-center justify-center">
              <Camera className="mr-2 h-4 w-4" />
              Webcam Try-On
            </TabsTrigger>
            <TabsTrigger value="snap" className="flex items-center justify-center">
              <Phone className="mr-2 h-4 w-4" />
              Mobile AR Try-On
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="webcam">
            <TryOnExperience selectedShoeId={shoeId} />
          </TabsContent>
          
          <TabsContent value="snap">
            <SnapLenses />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TryOn;
