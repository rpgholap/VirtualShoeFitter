import { useEffect, useRef } from 'react';
import { renderShoeModel } from '@/lib/threeJS';

interface ShoeRendererProps {
  shoeModel: string;
  footLandmarks: any;
}

const ShoeRenderer = ({ shoeModel, footLandmarks }: ShoeRendererProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !footLandmarks) return;

    const container = containerRef.current;
    
    // Initialize Three.js renderer and scene
    const cleanup = renderShoeModel(container, shoeModel, footLandmarks);
    
    // Cleanup function
    return () => {
      if (cleanup) cleanup();
    };
  }, [shoeModel, footLandmarks]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-20 pointer-events-none"
    />
  );
};

export default ShoeRenderer;
