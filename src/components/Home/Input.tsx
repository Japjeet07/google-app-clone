import React from 'react';
import { useHistory } from 'react-router-dom'; 

const InputComponent: React.FC = () => {
  const history = useHistory(); 

  const handleClick = () => {
    history.push('/search'); // Navigate to the /search page
  };

  const handleCameraClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering the parent div's onClick
    history.push('/camera'); // Navigate to the /camera page
  };

  const handleVoiceClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering the parent div's onClick
    history.push('/voice-search'); // Navigate to the /voice-search page
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center w-auto h-20 rounded-full px-4 bg-zinc-700 
      ml-4 mr-4 cursor-pointer bg-transparent"
    >
      {/* Search Icon */}
      <span className="material-symbols-outlined text-gray-400 text-4xl mr-2">
        search
      </span>

      {/* Placeholder Text */}
      <div className="text-gray-400 text-2xl placeholder-gray-400">
        Search
      </div>

      <img
        src="/src/assets/google-voice.png" // Replace with the correct path to your image
        alt="Google Voice"
        className="w-8 h-8 cursor-pointer ml-auto mr-5" // Adjust size and spacing as needed
        onClick={handleVoiceClick} // Add functionality for Google Voice
      />

      <img
        src="/src/assets/google-lens.png" // Replace with the correct path to your image
        alt="Google Lens"
        className="w-8 h-8 cursor-pointer " // Adjust size as needed
        onClick={handleCameraClick} // Navigate to /camera when clicked
      />
    </div>
  );
};

export default InputComponent;