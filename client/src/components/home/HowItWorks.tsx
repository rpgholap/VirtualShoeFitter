import { Card, CardContent } from "@/components/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Scan Your Feet",
      description: "Use your camera to scan your feet. Our AI technology maps your feet's exact dimensions.",
      image: "https://staticfanpage.akamaized.net/wp-content/uploads/sites/34/2022/06/amazon-ar-scarpe-1-1200x675.jpg"
    },
    {
      id: 2,
      title: "Browse & Select",
      description: "Explore our extensive catalog of shoes from top brands and select the ones you like.",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "Virtual Try-On",
      description: "See how the shoes look on your feet in real-time with our augmented reality try-on.",
      image: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section className="py-12 bg-white" id="howItWorks">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Experience the future of shoe shopping with our AI-powered virtual fitting room
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="relative">
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary text-white text-xl font-bold mb-4">
                {step.id}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">
                {step.description}
              </p>
              <img 
                src={step.image} 
                alt={step.title} 
                className="mt-4 rounded-lg shadow-md w-full object-cover" 
                style={{ height: '200px' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
