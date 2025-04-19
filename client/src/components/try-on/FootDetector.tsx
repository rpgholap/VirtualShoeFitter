import { useEffect, useRef, useState } from 'react';
import { initializeFootDetection, detectFoot } from '@/lib/mediaPipe';

interface FootDetectorProps {
  onLandmarksDetected: (landmarks: any) => void;
  onCameraReady: (ready: boolean) => void;
}

const FootDetector = ({ onLandmarksDetected, onCameraReady }: FootDetectorProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let videoStream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            if (videoRef.current) {
              videoRef.current.play();
              setIsDetecting(true);
              onCameraReady(true);
              videoStream = stream;
              
              // Initialize MediaPipe
              initializeFootDetection().then(() => {
                runDetection();
              }).catch(error => {
                console.error("Error initializing foot detection:", error);
                onCameraReady(false);
              });
            }
          };
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        onCameraReady(false);
      }
    };

    const runDetection = async () => {
      if (!videoRef.current || !canvasRef.current || !isDetecting) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Run foot detection
      const landmarks = await detectFoot(video);
      
      if (landmarks) {
        // Draw landmarks on canvas for visualization
        drawLandmarks(ctx, landmarks, canvas.width, canvas.height);
        
        // Pass landmarks to parent component
        onLandmarksDetected(landmarks);
      }

      // Continue detection loop
      animationFrameId = requestAnimationFrame(runDetection);
    };

    const drawLandmarks = (
      ctx: CanvasRenderingContext2D,
      landmarks: any,
      width: number,
      height: number
    ) => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Draw video frame
      if (videoRef.current) {
        ctx.drawImage(videoRef.current, 0, 0, width, height);
      }
      
      // Draw landmarks
      ctx.fillStyle = "#00FF00";
      
      // In a real implementation, this would use actual foot landmarks
      // For now, we'll draw sample points to show where landmarks would be
      landmarks.forEach((point: {x: number, y: number}) => {
        ctx.beginPath();
        ctx.arc(point.x * width, point.y * height, 5, 0, 2 * Math.PI);
        ctx.fill();
      });
    };

    startCamera();

    // Cleanup function
    return () => {
      setIsDetecting(false);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (videoStream) {
        videoStream.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, [onLandmarksDetected, onCameraReady]);

  return (
    <div className="relative w-full h-full">
      <video 
        ref={videoRef} 
        className="absolute inset-0 object-cover w-full h-full" 
        playsInline 
        muted
      />
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-10" 
      />
    </div>
  );
};

export default FootDetector;
