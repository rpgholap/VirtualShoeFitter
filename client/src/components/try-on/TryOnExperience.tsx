import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  X, 
  Lightbulb, 
  RotateCcw, 
  Share2, 
  Camera, 
  SlidersHorizontal, 
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import FootDetector from "./FootDetector";
import ShoeRenderer from "./ShoeRenderer";
import { useToast } from "@/hooks/use-toast";
import type { Shoe } from "@shared/schema";

interface TryOnExperienceProps {
  selectedShoeId?: number;
}

const TryOnExperience = ({ selectedShoeId }: TryOnExperienceProps) => {
  const { toast } = useToast();
  const [isDetecting, setIsDetecting] = useState(false);
  const [footLandmarks, setFootLandmarks] = useState<any>(null);
  const [currentShoeId, setCurrentShoeId] = useState<number | undefined>(selectedShoeId);
  const [cameraReady, setCameraReady] = useState(false);

  const { data: allShoes } = useQuery<Shoe[]>({
    queryKey: ['/api/shoes'],
  });

  const { data: currentShoe } = useQuery<Shoe>({
    queryKey: ['/api/shoes', currentShoeId],
    enabled: !!currentShoeId,
  });

  useEffect(() => {
    if (selectedShoeId) {
      setCurrentShoeId(selectedShoeId);
    } else if (allShoes && allShoes.length > 0 && !currentShoeId) {
      // If no shoe is selected but we have shoes, select the first one
      setCurrentShoeId(allShoes[0].id);
    }
  }, [selectedShoeId, allShoes, currentShoeId]);

  const handleFootDetection = (landmarks: any) => {
    setFootLandmarks(landmarks);
    setIsDetecting(true);
  };

  const handleCameraReady = (ready: boolean) => {
    setCameraReady(ready);
    if (!ready) {
      toast({
        title: "Camera Error",
        description: "Could not access your camera. Please check permissions and try again.",
        variant: "destructive",
      });
    }
  };

  const handleChangeShoe = () => {
    if (!allShoes || allShoes.length <= 1) return;
    
    // Find the index of the current shoe
    const currentIndex = allShoes.findIndex(shoe => shoe.id === currentShoeId);
    
    // Get the next shoe (or loop back to the first one)
    const nextIndex = (currentIndex + 1) % allShoes.length;
    setCurrentShoeId(allShoes[nextIndex].id);
    
    toast({
      title: "Shoe Changed",
      description: `Now trying on: ${allShoes[nextIndex].name}`,
    });
  };

  const handleCapture = () => {
    // In a real implementation, this would capture the current view
    toast({
      title: "Captured!",
      description: "Image saved to your gallery.",
    });
  };

  return (
    <section className="py-12 bg-white" id="tryOn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Virtual Try-On Experience</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Experience how shoes will look and fit on your feet using our AI-powered AR technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-xl" style={{ aspectRatio: '4/3' }}>
            {/* Camera View with Foot Detection */}
            <FootDetector onLandmarksDetected={handleFootDetection} onCameraReady={handleCameraReady} />
            
            {/* 3D Shoe Renderer (overlays on foot) */}
            {cameraReady && currentShoe && footLandmarks && (
              <ShoeRenderer 
                shoeModel={currentShoe.modelUrl} 
                footLandmarks={footLandmarks} 
              />
            )}
            
            {/* Overlay Elements */}
            <div className="absolute inset-0 flex flex-col pointer-events-none">
              {/* Top Bar with Controls */}
              <div className="flex justify-between items-center p-4 bg-gradient-to-b from-black/70 to-transparent pointer-events-auto">
                <Button variant="ghost" size="icon" className="text-white bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30">
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
                <div className="flex space-x-3">
                  <Button variant="ghost" size="icon" className="text-white bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30">
                    <Lightbulb className="h-5 w-5" />
                    <span className="sr-only">Toggle light</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30">
                    <RotateCcw className="h-5 w-5" />
                    <span className="sr-only">Rotate view</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30">
                    <Share2 className="h-5 w-5" />
                    <span className="sr-only">Share</span>
                  </Button>
                </div>
              </div>
              
              {/* Camera Guides */}
              <div className="flex-grow flex items-center justify-center">
                {!isDetecting && (
                  <div className="border-2 border-dashed border-white/50 rounded-md w-4/5 h-1/3 flex items-center justify-center">
                    <p className="text-white text-center px-4">
                      {cameraReady ? 'Position your foot in this area' : 'Loading camera...'}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Bottom Controls */}
              <div className="p-4 bg-gradient-to-t from-black/70 to-transparent pointer-events-auto">
                <div className="flex justify-between items-center">
                  <Button 
                    variant="ghost" 
                    className="bg-white/20 backdrop-blur-md text-white hover:bg-white/30"
                    onClick={handleChangeShoe}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" /> Change Shoe
                  </Button>
                  <Button 
                    variant="default" 
                    className="bg-primary text-white hover:bg-primary/90"
                    onClick={handleCapture}
                  >
                    <Camera className="h-4 w-4 mr-2" /> Capture
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="bg-white/20 backdrop-blur-md text-white hover:bg-white/30"
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" /> Adjust
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">How the Virtual Try-On Works</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                  <Camera className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium">AI-Powered Detection</h4>
                  <p className="text-gray-600">Our advanced AI algorithm uses MediaPipe to detect your foot's position and measurements in real-time.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-primary">
                    <path d="M19 14L12 7L5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 19L12 12L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium">3D Shoe Models</h4>
                  <p className="text-gray-600">High-quality 3D models of every shoe in our catalog are precisely aligned to your feet using AR technology.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                  <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none">
                    <path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium">Size Recommendation</h4>
                  <p className="text-gray-600">Receive personalized size recommendations based on your foot measurements and the shoe's specific fit profile.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                  <Share2 className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium">Share & Save</h4>
                  <p className="text-gray-600">Save your try-on images to review later or share with friends for a second opinion.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Button className="bg-primary text-white hover:bg-primary/90 shadow-md transition-colors">
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M10 8L16 12L10 16V8Z" fill="currentColor"/>
                </svg>
                Start Try-On Experience
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TryOnExperience;
