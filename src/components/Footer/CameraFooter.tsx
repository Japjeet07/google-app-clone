import React, { useState } from 'react';

interface CameraFooterProps {
  setButton: (icon: string) => void;
}

const CameraFooter: React.FC<CameraFooterProps> = ({ setButton }) => {
  const [activeIndex, setActiveIndex] = useState(1); // Default active element is the middle one

  const items = [
    { id: 0, label: 'Translate', icon: 'translate' },
    { id: 1, label: 'Search', icon: 'search' },
    { id: 2, label: 'Homework', icon: 'school' },
  ];

  return (
    <div
      className="absolute bottom-0 w-full h-20 bg-gray-800 z-40 flex items-center 
      justify-center overflow-hidden"
    >
      {/* Footer Buttons */}
      <div
        className="relative flex w-full max-w-md justify-center gap-2 transition-transform 
        duration-300 ease-in-out"
        style={{
          transform: `translateX(calc(${1 - activeIndex} * 33%))`, 
        }}
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={item.id}
              className={`flex items-center justify-center w-28 h-10 rounded-full 
                border transition-all duration-300 ease-in-out ${
                isActive ? 'bg-blue-900 border-blue-900' : 'border-white'
              }`}
              onClick={() => {
                console.log('Selected Icon:', item.icon); 
                setActiveIndex(index);
                setButton(item.icon);
              }}
            >
              <span
                className={`material-symbols-outlined text-xl mr-1 text-blue-300`}
              >
                {item.icon}
              </span>
              <span
                className={`text-sm ${
                  isActive ? 'text-blue-300' : 'text-white'
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CameraFooter;