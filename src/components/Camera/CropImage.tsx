import React, { useEffect, useRef } from 'react';

interface CropImageProps {
  capturedImage: string | null;
  cropBox: { x: number; y: number; width: number; height: number };
  setCropBox: React.Dispatch<
    React.SetStateAction<{ x: number; y: number; width: number; height: number }>
  >;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
  startResizing: (e: React.TouchEvent, corner: string) => void;
  isSlidingUp: boolean;
  croppedImageStyle: () => void;
}

const CropImage: React.FC<CropImageProps> = ({
  capturedImage,
  cropBox,
  setCropBox,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  startResizing,
  isSlidingUp,
  croppedImageStyle,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && capturedImage) {
      const container = containerRef.current;
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      const initialWidth = 250; // Initial width of the crop box
      const initialHeight = 500; // Initial height of the crop box

      const centerX = (containerWidth - initialWidth) / 2; // Center horizontally
      const centerY = (containerHeight - initialHeight) / 2; // Center vertically

      setCropBox({
        x: centerX,
        y: centerY,
        width: initialWidth,
        height: initialHeight,
      });
    }
  }, [containerRef, capturedImage, setCropBox]);

  return (
    capturedImage && (
      <div
        ref={containerRef}
        className={`absolute top-5 left-0 w-full h-full flex items-center justify-center bg-transparent z-40 transition-transform duration-300 ${
          isSlidingUp ? 'translate-y-[-15%]' : 'translate-y-full'
        }`}
        style={{
          transform: isSlidingUp
            ? 'translateY(-17.5%) scale(0.59)'
            : 'translateY(100%) scale(1)',
        }}
      >
        {/* Captured Image */}
        <img
          src={capturedImage}
          alt="Captured"
          className="absolute top-0 left-0 w-full h-full object-contain"
          onLoad={croppedImageStyle}
        />

        {/* Gray Overlay */}
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            background: 'rgba(0, 0, 0, 0.5)',
            clipPath: `polygon(
              0% 0%, 100% 0%, 100% 100%, 0% 100%,
              0% ${cropBox.y}px, ${cropBox.x}px ${cropBox.y}px,
              ${cropBox.x}px ${cropBox.y + cropBox.height}px, 
              ${cropBox.x + cropBox.width}px ${cropBox.y + cropBox.height}px, 
              ${cropBox.x + cropBox.width}px ${cropBox.y}px, 0% ${cropBox.y}px
            )`,
          }}
        ></div>

        {/* Crop Box */}
        <div
          className="absolute bg-transparent"
          style={{
            top: `${cropBox.y}px`,
            left: `${cropBox.x}px`,
            width: `${cropBox.width}px`,
            height: `${cropBox.height}px`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top-Left Corner */}
          <div
            className="absolute w-14 h-14 -top-4 -left-4 flex items-center justify-center"
            onTouchStart={(e) => startResizing(e, 'top-left')}
          >
            <div className="w-12 h-12 border-t-8 border-l-8 border-white rounded-tl-3xl"></div>
          </div>

          {/* Top-Right Corner */}
          <div
            className="absolute w-14 h-14 -top-4 -right-4 flex items-center justify-center"
            onTouchStart={(e) => startResizing(e, 'top-left')}
          >
            <div className="w-12 h-12 border-t-8 border-r-8 border-white rounded-tr-3xl"></div>
          </div>

          {/* Bottom-Left Corner */}
          <div
            className="absolute w-14 h-14 -bottom-4 -left-4 flex items-center justify-center"
            onTouchStart={(e) => startResizing(e, 'top-left')}
          >
            <div className="w-12 h-12 border-b-8 border-l-8 border-white rounded-bl-3xl"></div>
          </div>

          {/* Bottom-Right Corner */}
          <div
            className="absolute w-14 h-14 -bottom-4 -right-4 flex items-center justify-center"
            onTouchStart={(e) => startResizing(e, 'top-left')}
          >
            <div className="w-12 h-12 border-b-8 border-r-8 border-white rounded-br-3xl"></div>
          </div>
        </div>
      </div>
    )
  );
};

export default CropImage;