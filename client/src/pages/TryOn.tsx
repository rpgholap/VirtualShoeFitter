import { useEffect } from "react";
import { useLocation } from "wouter";
import TryOnExperience from "@/components/try-on/TryOnExperience";

const TryOn = () => {
  const [location] = useLocation();
  
  // Extract shoe ID from URL if present
  const getShoeIdFromUrl = (): number | undefined => {
    const params = new URLSearchParams(window.location.search);
    const shoeId = params.get('shoe');
    return shoeId ? parseInt(shoeId) : undefined;
  };

  useEffect(() => {
    // Scroll to top when this page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <TryOnExperience selectedShoeId={getShoeIdFromUrl()} />
    </>
  );
};

export default TryOn;
