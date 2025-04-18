import React from 'react';

const ButtonGroup: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full max-w-screen-md 
    mx-auto space-x-2 mt-4 px-4">

      <button className="flex-1 h-14 rounded-full  flex items-center justify-center"
        style={{ backgroundColor: "#726956" }}

      >
        <span
          className="material-symbols-outlined text-lg text-orange-400"
        >image_search</span>
      </button>


      <button className="flex-1 h-14 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "#47537a" }}

      >
        <span
          className="material-symbols-outlined text-lg text-blue-300 "
        >translate</span>
      </button>

      <button className="flex-1 h-14 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "#597a47" }}

      >
        <span
          className="material-symbols-outlined text-xl text-green-500"
        >school</span>
      </button>

      <button className="flex-1 h-14 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "#7a5047" }}

      >
        <span
          className="material-symbols-outlined text-xl text-red-300 "
        >music_note</span>
      </button>


    </div>
  );
};

export default ButtonGroup;