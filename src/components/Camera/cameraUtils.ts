import { useRef, useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export const useCameraUtils = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [isSlidingUp, setIsSlidingUp] = useState(false);
  const [activeGesture, setActiveGesture] = useState<'gallery' | 'sliding-window' | 'none' | null>(null);
  const [isFullyOpen, setIsFullyOpen] = useState(false);
  const [cropBox, setCropBox] = useState({
    x: 80,
    y: 300,
    width: 250,
    height: 500,
  });
  const [dragging, setDragging] = useState(false);
  const [startTouch, setStartTouch] = useState({ x: 0, y: 0 });
  const [currentCroppedImage, setCurrentCroppedImage] = useState<string | null>(null);
  const [isProcessingCroppedImage, setIsProcessingCroppedImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const startCamera = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          alert('Your browser does not support camera access.');
          return;
        }
  
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }, // Use rear camera
        });
  
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraStarted(true);
      } catch (error) {
        console.error('Error starting camera:', error);
        alert('Failed to access the camera. Please check your permissions.');
      }
    };
  
    const stopCamera = () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
      setCameraStarted(false);
    };
  
    
  
    const captureImage = () => {
      if (videoRef.current && canvasRef.current) {
        const context = canvasRef.current.getContext('2d');
        if (context) {
          // Get the dimensions of the video feed
          const videoWidth = videoRef.current.videoWidth;
          const videoHeight = videoRef.current.videoHeight;
  
          // Get the dimensions of the canvas (match the screen's aspect ratio)
          const canvasWidth = canvasRef.current.width = window.innerWidth;
          const canvasHeight = canvasRef.current.height = window.innerHeight;
  
          // Calculate the aspect ratios
          const videoAspectRatio = videoWidth / videoHeight;
          const canvasAspectRatio = canvasWidth / canvasHeight;
  
          let drawWidth, drawHeight, offsetX, offsetY;
  
          if (videoAspectRatio > canvasAspectRatio) {
            // Video is wider than the canvas
            drawWidth = videoHeight * canvasAspectRatio;
            drawHeight = videoHeight;
            offsetX = (videoWidth - drawWidth) / 2; // Center horizontally
            offsetY = 0;
          } else {
            // Video is taller than the canvas
            drawWidth = videoWidth;
            drawHeight = videoWidth / canvasAspectRatio;
            offsetX = 0;
            offsetY = (videoHeight - drawHeight) / 2; // Center vertically
          }
  
          // Clear the canvas and draw the video feed with the calculated dimensions
          context.clearRect(0, 0, canvasWidth, canvasHeight);
          context.drawImage(
            videoRef.current,
            offsetX,
            offsetY,
            drawWidth,
            drawHeight,
            0,
            0,
            canvasWidth,
            canvasHeight
          );
  
          // Get the image data from the canvas
          const imageData = canvasRef.current.toDataURL('image/png');
          setCapturedImage(imageData);
  
          setIsLoading(true); // Start loading
          setTimeout(() => {
            setIsLoading(false); // Stop loading
          }, 3000); // Simulate loading time
        }
  
  
      }
    };
  
  
    const handleImageClick = () => {
      setIsSlidingUp(true); // Open the sliding window partially
      setActiveGesture('sliding-window')
    };
  
    const toggleSlide = () => {
      setIsFullyOpen(!isFullyOpen); // Toggle between fully open and partially open
      if (!isFullyOpen) {
        setActiveGesture('gallery');
      }
    };
  
    const chooseFromGallery = async () => {
      try {
        const photo = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Photos, // Open the gallery
        });
        setIsSlidingUp(true); // Open the sliding window partially
        setActiveGesture('sliding-window')
        setCapturedImage(photo.dataUrl || null);
      } catch (error) {
        console.error('Error selecting image from gallery:', error);
      }
    };
  
    const toggleFlash = () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const videoTrack = stream.getVideoTracks()[0]; // Get the video track
  
        if (videoTrack) {
          const capabilities = videoTrack.getCapabilities(); // Check if the device supports torch
          if ('torch' in capabilities) {
            const settings = videoTrack.getSettings();
            const isTorchOn = (settings as any).torch || false;
  
            videoTrack.applyConstraints({
              advanced: [{ torch: !isTorchOn } as any], // Toggle the torch
            }).catch((error) => {
              console.error('Error toggling flash:', error);
            });
  
            setFlashOn(!isTorchOn); // Update the flash state
          } else {
            alert('Torch is not supported on this device.');
          }
        }
      }
    };
  
    
  
    const handleCaptureAndClick = () => {
      captureImage(); // Capture the image
      setTimeout(() => {
        handleImageClick(); // Trigger the transition for the image
      }, 100); // Add a slight delay to ensure the image is rendered before transitioning
  
  
    };
  
    const handleTouchStart = (e: React.TouchEvent) => {
      const touch = e.touches[0];
      setStartTouch({ x: touch.clientX, y: touch.clientY });
      setDragging(true);
      setActiveGesture('none'); // Disable other gestures while dragging
    };
  
    const handleTouchMove = (e: React.TouchEvent) => {
      if (!dragging) return;
  
      const touch = e.touches[0];
      const deltaX = touch.clientX - startTouch.x;
      const deltaY = touch.clientY - startTouch.y;
  
      setCropBox((prev) => {
        const newX = Math.max(0, Math.min(prev.x + deltaX, window.innerWidth - prev.width));
        const newY = Math.max(0, Math.min(prev.y + deltaY, window.innerHeight - prev.height));
        return { ...prev, x: newX, y: newY };
      });
  
      setStartTouch({ x: touch.clientX, y: touch.clientY });
    };
  
  
    const handleTouchEnd = () => {
      setDragging(false);
      setActiveGesture('sliding-window'); // Re-enable sliding window gesture
  
  
      if (capturedImage && cropBox) {
        const image = new Image();
        image.src = capturedImage;
  
        image.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = cropBox.width;
          canvas.height = cropBox.height;
  
          const context = canvas.getContext('2d');
          if (context) {
            context.drawImage(
              image,
              cropBox.x, // Source X
              cropBox.y, // Source Y
              cropBox.width, // Source Width
              cropBox.height, // Source Height
              0, // Destination X
              0, // Destination Y
              cropBox.width, // Destination Width
              cropBox.height // Destination Height
            );
  
            const croppedImage = canvas.toDataURL('image/png');
            setCurrentCroppedImage(croppedImage);
          }
        };
  
        setIsLoading(true); // Start loading
        setIsProcessingCroppedImage(true); // Show "Looking for result..."
        setTimeout(() => {
          setIsLoading(false); // Stop loading
          setIsProcessingCroppedImage(false); // Show menu again
        }, 3000); // Simulate loading time
  
      }
    };
  
  
    const startResizing = (e: React.TouchEvent, corner: string) => {
      e.preventDefault();
      let startX = e.touches[0].clientX;
      let startY = e.touches[0].clientY;
  
      const handleTouchMove = (moveEvent: TouchEvent) => {
        const currentX = moveEvent.touches[0].clientX;
        const currentY = moveEvent.touches[0].clientY;
  
        const deltaX = currentX - startX;
        const deltaY = currentY - startY;
  
        setCropBox((prev) => {
          const newBox = { ...prev };
  
          switch (corner) {
            case 'top-left':
             
              newBox.width = Math.max(50, prev.width - deltaX);
              newBox.height = Math.max(50, prev.height - deltaY);
              break;
          }
  
          // Ensure the crop box stays within the image boundaries
          newBox.x = Math.min(newBox.x, window.innerWidth - newBox.width);
          newBox.y = Math.min(newBox.y, window.innerHeight - newBox.height);
  
          return newBox;
        });
  
        // Update the starting touch position for smooth resizing
        startX = currentX;
        startY = currentY;
      };
  
      const handleTouchEnd = () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
  
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    };
  
  
  
  
  
    const croppedImageStyle = () => {
      if (capturedImage && cropBox) {
        const image = new Image();
        image.src = capturedImage;
  
        image.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = cropBox.width;
          canvas.height = cropBox.height;
  
          const context = canvas.getContext('2d');
          if (context) {
            context.drawImage(
              image,
              cropBox.x, // Source X
              cropBox.y, // Source Y
              cropBox.width, // Source Width
              cropBox.height, // Source Height
              0, // Destination X
              0, // Destination Y
              cropBox.width, // Destination Width
              cropBox.height // Destination Height
            );
  
            const croppedImage = canvas.toDataURL('image/png');
            setCurrentCroppedImage(croppedImage);
          }
        };
      }
    
  
  };



  return {
    videoRef,
    canvasRef,
    containerRef,
    capturedImage,
    cameraStarted,
    flashOn,
    galleryOpen,
    isSlidingUp,
    activeGesture,
    isFullyOpen,
    cropBox,
    dragging,
    startTouch,
    currentCroppedImage,
    isProcessingCroppedImage,
    isLoading,
    setGalleryOpen,
    setIsFullyOpen,
    captureImage,
    handleImageClick,
    toggleSlide,
    chooseFromGallery,
    toggleFlash,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    setCropBox,
    setIsLoading,
    setIsProcessingCroppedImage,
    croppedImageStyle,
    startResizing,
    handleCaptureAndClick,
    startCamera,
    stopCamera
  };
};