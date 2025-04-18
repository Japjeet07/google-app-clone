import React from 'react';
import { useHistory, useLocation } from 'react-router-dom'; // Import hooks for navigation and location

const Footer: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  // Function to check if the current tab is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-zinc-800 flex justify-around
     items-center h-16">
      {/* Home Tab */}
      <div
        onClick={() => history.push('/')}
        className="relative flex flex-col items-center cursor-pointer"
      >
        {/* Icon with Animated Background */}
        <div
          className={`w-16 h-8 rounded-full flex items-center justify-center 
            transition-all duration-500 overflow-hidden ${
            isActive('/') ? 'bg-teal-900 scale-110' : 'bg-transparent'
          }`}
        >
          <div
            className={`absolute inset-0 bg-teal-900 transform scale-x-0 
              origin-center transition-transform duration-500 ${
              isActive('/') ? 'scale-x-100' : ''
            }`}
          ></div>
          <span
            className={`relative material-symbols-outlined text-2xl ${
              isActive('/') ? 'text-blue-300 fill-blue-300' : 'text-gray-400'
            }`}
          >
            home
          </span>
        </div>
        {/* Label */}
        <span
          className={`text-sm mt-1 ${
            isActive('/') ? 'text-blue-300' : 'text-gray-400'
          }`}
        >
          Home
        </span>
      </div>

      {/* Search Tab */}
      <div
        onClick={() => history.push('/search')}
        className="relative flex flex-col items-center cursor-pointer"
      >
        {/* Icon with Animated Background */}
        <div
          className={`w-16 h-8 rounded-full flex items-center justify-center
             transition-all duration-500 overflow-hidden ${
            isActive('/result') ? 'bg-teal-900 scale-110' : 'bg-transparent'
          }`}
        >
          <div
            className={`absolute inset-0 bg-teal-900 transform scale-x-0 
              origin-center transition-transform duration-500 ${
              isActive('/result') ? 'scale-x-100' : ''
            }`}
          ></div>
          <span
            className={`relative material-symbols-outlined text-2xl ${
              isActive('/result') ? 'text-blue-300' : 'text-gray-400'
            }`}
          >
            search
          </span>
        </div>
        {/* Label */}
        <span
          className={`text-sm mt-1 ${
            isActive('/result') ? 'text-blue-300' : 'text-gray-400'
          }`}
        >
          Search
        </span>
      </div>

      {/* Saved Tab */}
      <div
        onClick={() => history.push('/saved')}
        className="relative flex flex-col items-center cursor-pointer"
      >
        {/* Icon with Animated Background */}
        <div
          className={`w-16 h-8 rounded-full flex items-center justify-center 
            transition-all duration-500 overflow-hidden ${
            isActive('/saved') ? 'bg-teal-900 scale-110' : 'bg-transparent'
          }`}
        >
          <div
            className={`absolute inset-0 bg-teal-900 transform scale-x-0
               origin-center transition-transform duration-500 ${
              isActive('/saved') ? 'scale-x-100' : ''
            }`}
          ></div>
          <span
            className={`relative material-symbols-outlined text-2xl ${
              isActive('/saved') ? 'text-blue-300' : 'text-gray-400'
            }`}
          >
            bookmark
          </span>
        </div>
        {/* Label */}
        <span
          className={`text-sm mt-1 ${
            isActive('/saved') ? 'text-blue-300' : 'text-gray-400'
          }`}
        >
          Saved
        </span>
      </div>
    </div>
  );
};

export default Footer;