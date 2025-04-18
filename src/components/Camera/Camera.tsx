import React, { useEffect } from 'react';
import { createGesture } from '@ionic/react';
import CameraFooter from '../Footer/CameraFooter'; 
import ImgResult from '../SearchResult/ImgResult';
import Toolbar from './Toolbar'; 
import CropImage from './CropImage'; 
import { useCameraUtils } from './cameraUtils';




const CameraScreen: React.FC = () => {
  const {
    videoRef, canvasRef, containerRef,
    capturedImage, cameraStarted, flashOn,
    isSlidingUp, activeGesture, isFullyOpen,
    cropBox, currentCroppedImage, isProcessingCroppedImage,
    isLoading, setGalleryOpen, setIsFullyOpen,
    toggleSlide, chooseFromGallery, toggleFlash,
    handleTouchStart, handleTouchMove, handleTouchEnd,
    setCropBox, setIsLoading, croppedImageStyle,
    startResizing, handleCaptureAndClick, startCamera, stopCamera } = useCameraUtils();

  const [button, setButton] = React.useState('search');
  const [showPopup, setShowPopup] = React.useState(false); 

  const handleSetButton = (icon: string) => {
    setButton(icon);
    setShowPopup(true); 
    setTimeout(() => setShowPopup(false), 2000); 
  };

  useEffect(() => {
    if (containerRef.current && capturedImage) {
      const container = containerRef.current;
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      const initialWidth = 250; 
      const initialHeight = 500; 

      const centerX = (containerWidth - initialWidth) / 2; 
      const centerY = (containerHeight - initialHeight) / 2; 

      setCropBox({
        x: centerX,
        y: centerY,
        width: initialWidth,
        height: initialHeight,
      });
    }
  }, [containerRef, capturedImage]);

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera(); // Stop the camera stream when the component unmounts
    };
  }, []);


  useEffect(() => {
    if (activeGesture === 'gallery' || activeGesture === null) {
      const gesture = createGesture({
        el: document.body, // Attach gesture to the entire screen
        gestureName: 'swipe-gallery',
        direction: 'y',
        onEnd: (ev) => {
          if (ev.deltaY < -50) {
            setGalleryOpen(true); // Slide up to open gallery
            chooseFromGallery() // Trigger the gallery function
              .catch((error) => {
                console.error('Error selecting image from gallery:', error);
              });
          }
        },
      });
      gesture.enable();

      return () => gesture.destroy();
    }
  }, [activeGesture]);

  useEffect(() => {
    if (activeGesture === 'sliding-window') {
      const gesture = createGesture({
        el: document.body,
        gestureName: 'slide-window',
        direction: 'y',
        onEnd: (ev) => {
          // Check if the user is scrolling down
          if (ev.deltaY > 50) {
            const imgResultElement = document.querySelector('.img-result-scrollable') as HTMLDivElement;

            if (imgResultElement) {
              if (imgResultElement.scrollTop === 0) {
                setIsFullyOpen(false); // Close the sliding window
              }
            }
          } else if (ev.deltaY < -50) {
            setIsFullyOpen(true); // Open the sliding window
          }
        },
      });
      gesture.enable();

      return () => gesture.destroy();
    }
  }, [activeGesture]);

  return (
    <div className="relative w-full h-screen bg-black">


      {!capturedImage && (
        <div
          className="absolute"
          style={{
            width: '60%', // 60% of the screen width
            height: '40%', // 40% of the screen height
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 20, // Ensure it appears above the video feed
          }}
        >
          {/* Top-Left Corner */}
          <div className="absolute w-12 h-12 -top-3 -left-3 border-t-4 border-l-4 border-gray-500 rounded-tl-full"></div>

          {/* Top-Right Corner */}
          <div className="absolute w-12 h-12 -top-3 -right-3 border-t-4 border-r-4 border-gray-500 rounded-tr-full"></div>

          {/* Bottom-Left Corner */}
          <div className="absolute w-12 h-12 -bottom-3 -left-3 border-b-4 border-l-4 border-gray-500 rounded-bl-full"></div>

          {/* Bottom-Right Corner */}
          
          <div className="absolute w-12 h-12 -bottom-3 -right-3 border-b-4 border-r-4 border-gray-500 rounded-br-full"></div>
          {showPopup && (
  <div
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent text-white text-lg px-4 py-2 z-50 transition-opacity duration-500"
    style={{ opacity: showPopup ? 1 : 0 
      
    }}
  >
    <span className="material-symbols-outlined text-white text-[150px] mb-5">
      {button}
    </span>
  </div>
)}
        </div>
      )}





      {/* Top Bar */}
      <Toolbar
        capturedImage={capturedImage}
        toggleFlash={toggleFlash}
        flashOn={flashOn}
      />

      {/* Live Camera Feed */}
      {!capturedImage && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
        />
      )}

      {/* Canvas for Capturing Image */}
      <canvas ref={canvasRef} className="hidden" />


      {!capturedImage && cameraStarted && (
        <div className="absolute bottom-24 w-full flex justify-center items-center z-30">
          {/* Capture Button */}
          <div className="relative flex items-center justify-center">
            {/* Outer Thin Circle */}
            <div className="w-20 h-20 rounded-full border-4 border-gray-300 flex items-center justify-center">
              {/* Inner White Circle */}
              <button
                onClick={handleCaptureAndClick}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-black text-3xl">
                  {button}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      <CropImage
        capturedImage={capturedImage}
        cropBox={cropBox}
        setCropBox={setCropBox}
        handleTouchStart={handleTouchStart}
        handleTouchMove={handleTouchMove}
        handleTouchEnd={handleTouchEnd}
        startResizing={startResizing}
        isSlidingUp={isSlidingUp}
        croppedImageStyle={croppedImageStyle}
      />

      <ImgResult
        isSlidingUp={isSlidingUp}
        isFullyOpen={isFullyOpen}
        toggleSlide={toggleSlide}
        currentCroppedImage={currentCroppedImage}
        setIsLoading={setIsLoading} // Pass setIsLoading to ImgResult
        isLoading={isLoading} // Pass isLoading to ImgResult
        isProcessingCroppedImage={isProcessingCroppedImage} // Pass the new state setter
      />

      {/* Footer */}
      <div
        className="absolute bottom-[78px] w-full h-10 bg-gray-800 z-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 0, transparent 70%, #1f2937 90%)',
        }}
      ></div>
<CameraFooter setButton={handleSetButton} />
    </div>
  );
};

export default CameraScreen;


