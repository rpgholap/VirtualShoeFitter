import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Testimonial } from "@shared/schema";

const Testimonials = () => {
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="fill-yellow-400 text-yellow-400 h-4 w-4" />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="text-gray-300 h-4 w-4" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="fill-yellow-400 text-yellow-400 h-4 w-4" />
          </div>
        </div>
      );
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="text-gray-300 h-4 w-4" />
      );
    }
    
    return stars;
  };

  if (error) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Customers Say</h2>
            <p className="text-red-500">Failed to load testimonials. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Customers Say</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            See what customers love about our virtual shoe fitting experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Skeleton loading state
            Array(3).fill(0).map((_, index) => (
              <Card key={index} className="bg-white p-6 rounded-lg shadow-md">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-8 ml-2" />
                  </div>
                  <Skeleton className="h-24 w-full mb-6" />
                  <div className="flex items-center">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="ml-3">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-32 mt-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            testimonials?.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {renderStars(testimonial.rating)}
                    </div>
                    <span className="ml-2 text-gray-600">{testimonial.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    "{testimonial.review}"
                  </p>
                  <div className="flex items-center">
                    <img 
                      className="h-10 w-10 rounded-full" 
                      src={testimonial.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`} 
                      alt={`${testimonial.name} avatar`} 
                    />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium">{testimonial.name}</h3>
                      {testimonial.productName && (
                        <p className="text-xs text-gray-500">Purchased {testimonial.productName}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
