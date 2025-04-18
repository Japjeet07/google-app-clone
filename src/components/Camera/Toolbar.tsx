import React from 'react';
import { useHistory } from 'react-router-dom';

interface ToolbarProps {
  capturedImage?: string | null;
  toggleFlash?: () => void;
  flashOn?: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({ capturedImage, toggleFlash, flashOn }) => {
  const history = useHistory();

  return (
    <div className="absolute top-0 left-0 w-full flex items-center 
    justify-between px-4 py-2 bg-transparent z-50">
      {capturedImage ? (
        <>
          {/* Back Icon */}
          <span
            onClick={() => window.location.reload()} // Reload the page
            className="material-symbols-outlined text-white text-2xl cursor-pointer"
          >
            arrow_back
          </span>

          {/* Google Lens Text */}
          <div className="flex-1 text-center text-white text-xl font-medium">
            <span className="font-medium" style={{ fontFamily: 'Roboto' }}>Google</span>{' '}
            <span className="font-normal">Lens</span>
          </div>

          {/* More Options Icon */}
          <span className="material-symbols-outlined text-white text-2xl cursor-pointer">
            more_vert
          </span>
        </>
      ) : (
        <>
          {/* Close Icon */}
          <span
            onClick={() => history.push('/')} // Navigate back to home
            className="material-symbols-outlined text-white text-2xl cursor-pointer"
          >
            close
          </span>

          {/* Flash Toggle */}
          {toggleFlash && (
            <span
              onClick={toggleFlash} // Toggle flash on/off
              className="material-symbols-outlined text-white text-2xl cursor-pointer ml-4"
            >
              {flashOn ? 'flash_on' : 'flash_off'}
            </span>
          )}

          {/* Google Lens Text */}
          <div className="flex-1 text-center text-white text-xl font-medium">
            <span className="font-medium" style={{ fontFamily: 'Roboto' }}>Google</span>{' '}
            <span className="font-normal">Lens</span>
          </div>

          {/* History Icon */}
          <span className="material-symbols-outlined text-white text-2xl cursor-pointer mr-4">
            history
          </span>

          {/* More Options Icon */}
          <span className="material-symbols-outlined text-white text-2xl cursor-pointer">
            more_vert
          </span>

          
        </>
      )}
    </div>
  );
};

export default Toolbar;