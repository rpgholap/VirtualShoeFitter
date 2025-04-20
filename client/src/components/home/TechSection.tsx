import { 
  Brain,
  Cog,
  Box
} from 'lucide-react';

const TechSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Technology</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Powered by cutting-edge AI and AR technology to provide the most accurate virtual shoe fitting experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6">AI-Powered Precision</h3>
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-md bg-primary text-white">
                  <Brain className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium">MediaPipe Integration</h4>
                  <p className="text-gray-600">Uses MediaPipe's advanced machine learning models to detect and track foot landmarks in real-time.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-md bg-primary text-white">
                  <Cog className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium">OpenCV Processing</h4>
                  <p className="text-gray-600">Implements OpenCV for image processing to enhance foot detection accuracy in various lighting conditions.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-md bg-primary text-white">
                  <Box className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium">Three.js Rendering</h4>
                  <p className="text-gray-600">Utilizes Three.js for high-quality 3D rendering of shoe models that accurately align with detected feet.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* <img 
              src="https://images.unsplash.com/photo-1626574476256-8f9c7998a5da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="AR Technology Visualization" 
              className="rounded-lg shadow-xl" 
            /> */}
            
            {/* Overlay Elements to illustrate technology */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-tr from-primary/20 to-transparent rounded-lg"></div>
            </div>
            
            {/* Technology Indicators */}
            {/* <div className="absolute top-1/4 left-1/4 bg-white rounded-full shadow-lg p-2 animate-pulse">
              <span className="text-xs font-medium text-primary">Landmark Detection</span>
            </div>
            
            <div className="absolute top-1/2 right-1/4 bg-white rounded-full shadow-lg p-2 animate-pulse">
              <span className="text-xs font-medium text-primary">3D Model Alignment</span>
            </div>
            
            <div className="absolute bottom-1/4 left-1/3 bg-white rounded-full shadow-lg p-2 animate-pulse">
              <span className="text-xs font-medium text-primary">Size Calculation</span>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechSection;
