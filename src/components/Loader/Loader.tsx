import React from 'react';



const Loader: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-2">
    {/* Loader Boxes */}
    <div className="h-52 w-[48%] bg-gray-300 animate-pulse rounded-2xl"></div>
    <div className="h-64 w-[48%] bg-gray-300 animate-pulse rounded-2xl"></div>
    <div className="h-64 w-[48%] bg-gray-300 animate-pulse rounded-2xl -mt-11"></div>
    <div className="h-64 w-[48%] bg-gray-300 animate-pulse rounded-2xl "></div>
    <div className="h-64 w-[48%] bg-gray-300 animate-pulse rounded-2xl -mt-11"></div>
    <div className="h-64 w-[48%] bg-gray-300 animate-pulse rounded-2xl"></div>
    <div className="h-64 w-[48%] bg-gray-300 animate-pulse rounded-2xl -mt-11"></div>
    <div className="h-64 w-[48%] bg-gray-300 animate-pulse rounded-2xl"></div>
    <div className="h-64 w-[48%] bg-gray-300 animate-pulse rounded-2xl -mt-11"></div>
  </div>
  );
};

export default Loader;