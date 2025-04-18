import React, { useState, useRef } from 'react';
import Loader from '../Loader/Loader';
import { newsData } from '../../dummy-data/news';
import { useHistory } from 'react-router-dom';

interface ImgResultProps {
  isSlidingUp: boolean;
  isFullyOpen: boolean;
  toggleSlide: () => void;
  currentCroppedImage: string | null;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isProcessingCroppedImage: boolean;
}

const ImgResult: React.FC<ImgResultProps> = ({
  isSlidingUp,
  isFullyOpen,
  toggleSlide,
  currentCroppedImage,
  isLoading,
  setIsLoading,
  isProcessingCroppedImage,
}) => {
  const [selectedTab, setSelectedTab] = useState('All'); // State to track the selected tab
  const [isAtTop, setIsAtTop] = useState(true); // Track if the user is at the top of the scrollable content
  const [isScrolledDown, setIsScrolledDown] = useState(false); // Track if the user has scrolled down
  const scrollRef = useRef<HTMLDivElement>(null); // Ref to track the scrollable content

  const menuItems = ['All', 'Products', 'Homework', 'Visual Matches', 'Ask About This Image'];
  const history=useHistory(); // For navigation
  const handleMenuClick = (item: string) => {
    setSelectedTab(item);
    setIsLoading(true); 

    setTimeout(() => {
      setIsLoading(false); 
    }, 1500);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const scrollTop = target.scrollTop; 

    setIsAtTop(scrollTop === 0);

    setIsScrolledDown(scrollTop > 50);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (isAtTop && e.deltaY > 0) {
      toggleSlide();
    }
  };

  if (!isSlidingUp) return null;

  return (
    <div
      className="absolute bottom-0 w-full bg-zinc-800 rounded-t-3xl
       transition-transform duration-300 z-50 overflow-hidden"
      style={{
        transform: `translateY(${isFullyOpen ? '0%' : '65%'})`, // Dynamically adjust position
        height: '100%', // Keep height consistent
      }}
    >
      {/* Sliding Handle */}
      <div className="p-4 text-white">
        <div className="flex justify-center items-center">
          <div className="w-8 h-1 bg-gray-300 rounded-full mb-4"></div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        className="img-result-scrollable overflow-y-auto h-full"
        onScroll={handleScroll} // Attach scroll handler
        onWheel={handleWheel}   // Attach wheel handler
      >
        {/* Input Box with Cropped Image */}
        <div
          className={`flex items-center w-auto max-w-full h-14 sm:h-12
             md:h-14 lg:h-16 rounded-full px-4 bg-zinc-700 
             box-border mx-4 transition-all duration-300
              ${isScrolledDown ? 'fixed top-4 left-0 right-0 z-50 shadow-lg'
            : 'relative z-10' 
            }`}
        >
          {/* Google Logo */}
          <div className="flex-shrink-0">
            <img
              src="/src/assets/g-logo.png"
              alt="Google Logo"
              className="w-6 h-6 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8
               rounded-full object-cover"
            />
          </div>

          {/* Cropped Image Thumbnail */}
          {currentCroppedImage && (
            <div className="flex-shrink-0 ml-2">
              <img
                src={currentCroppedImage}
                alt="Cropped Thumbnail"
                className="w-12 h-11 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 
                rounded-2xl object-cover"
              />
            </div>
          )}

          {/* Input Field */}
          <div className="flex-1 px-2">
            <input
              type="text"
              placeholder="Ask about this image"
              className="w-full bg-transparent text-zinc-400 text-base sm:text-sm md:text-base
               lg:text-lg placeholder-gray-400 outline-none"
            />
          </div>

          {/* Google Voice Icon */}
          <div className="flex-shrink-0">
            <img
              src="/src/assets/google-voice.png"
              alt="Google Voice"
              className="w-7 h-7 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 cursor-pointer"
              onClick={() =>history.push('/voice-search')} // Navigate to Voice Search
            />
          </div>
        </div>



        {/* Conditional Rendering for Menu or Loader */}
        {isProcessingCroppedImage ? (
          <>
            <div className="flex flex-col justify-start items-start h-12 px-4 mt-8">
              <h1 className="text-white text-xl sm:text-xl md:text-2xl font-sm">Looking for results...</h1>
              {/* Horizontal Divider */}
              <div className="w-32 h-[10px] bg-gray-300 mt-2 rounded-xl animate-pulse"></div>
            </div>
            <div className="p-3 relative">
              <Loader />
            </div>
          </>
        ) : (
          <>
            {/* Menu */}
            <div className="flex overflow-x-auto lg:overflow-visible scrollbar-hide px-4 mt-4">
              <div
                className={`flex w-full ${menuItems.length <= 5 ? 'justify-evenly' : 'lg:justify-evenly'
                  } space-x-4`}
              >
                {menuItems.map((item) => (
                  <div
                    key={item}
                    className={`flex-shrink-0 py-1 font-bold text-sm sm:text-xs md:text-sm lg:text-base cursor-pointer mx-3 ${selectedTab === item
                        ? 'text-white border-b-2 border-white'
                        : 'text-gray-400'
                      }`}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the parent div's onClick
                      handleMenuClick(item); // Trigger loading
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* News Items or Loader */}
            {isLoading ? (
              <div className="p-3 relative">
                <Loader /> {/* Show loader when isLoading is true */}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3
               lg:grid-cols-4 gap-4 px-4 mt-4 rounded-2xl">
                {newsData.map((item, index) => {
                  // Generate random heights for images
                  const randomHeight = ['h-32', 'h-40', 'h-48', 'h-56'][index % 4];
                  // Apply negative margin only to items after the first row
                  const randomMarginTop = index >= 4 && index % 2 === 0 ? '-mt-11' : '';

                  return (
                    <div
                      key={index}
                      className={`bg-transparent rounded-lg overflow-hidden shadow-md ${randomMarginTop}`}
                    >
                      <img
                        src={item.image}
                        alt={item.heading}
                        className={`w-full ${randomHeight} object-cover rounded-2xl`}
                      />
                      <div className="p-2">
                        <h3 className="text-gray-400 text-xs">{item.website}</h3>
                        <p className="text-white text-sm font-bold truncate">{item.heading}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>


    </div>
  );
};

export default ImgResult;