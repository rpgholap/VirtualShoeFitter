import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Shoe } from "@shared/schema";

interface ShoeCardProps {
  shoe: Shoe;
}

const ShoeCard = ({ shoe }: ShoeCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };
  
  const handleTryOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Navigate to try-on page with the selected shoe
    window.location.href = `/try-on?shoe=${shoe.id}`;
  };
  
  // Function to render stars based on rating
  const renderStars = () => {
    if (!shoe.rating) return null;
    
    const fullStars = Math.floor(shoe.rating);
    const hasHalfStar = shoe.rating % 1 !== 0;
    
    return (
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return (
              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            );
          } else if (i === fullStars && hasHalfStar) {
            return (
              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fillOpacity="0.5" />
              </svg>
            );
          } else {
            return (
              <svg key={i} className="w-4 h-4 text-gray-300" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            );
          }
        })}
      </div>
    );
  };

  return (
    <Card className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative pb-2/3">
        <img 
          src={shoe.imageUrl} 
          alt={shoe.name} 
          className="absolute h-full w-full object-cover"
          style={{ aspectRatio: '1/1', objectFit: 'cover' }}
        />
        <div className="absolute top-0 right-0 m-2">
          <Button
            size="icon"
            variant="ghost"
            className="w-8 h-8 rounded-full bg-white/80 shadow hover:bg-white"
            onClick={handleFavoriteClick}
          >
            <Heart 
              className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
            <span className="sr-only">Add to favorites</span>
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent text-white p-4">
          {shoe.isArReady && (
            <Badge variant="default" className="bg-primary">
              AR Ready
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{shoe.name}</h3>
          <span className="font-bold text-primary">${shoe.price}</span>
        </div>
        <p className="text-gray-600 text-sm mb-3">{shoe.brand}</p>
        <div className="flex justify-between items-center">
          {shoe.rating ? (
            <div className="flex items-center">
              {renderStars()}
              <span className="text-xs text-gray-500 ml-1">({shoe.reviewCount})</span>
            </div>
          ) : (
            <div></div>
          )}
          <Button 
            variant="link"
            className="text-primary hover:text-primary-dark transition-colors text-sm font-medium p-0"
            onClick={handleTryOnClick}
          >
            Try On <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShoeCard;
