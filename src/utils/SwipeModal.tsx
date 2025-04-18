import React, { useEffect, useRef } from 'react';
import { createGesture } from '@ionic/react';

interface SwipeModalProps {
  modalPosition: 'closed' | 'open' | 'full';
  setModalPosition: React.Dispatch<React.SetStateAction<'closed' | 'open' | 'full'>>;
  children: React.ReactNode;
}

const SwipeModal: React.FC<SwipeModalProps> = ({ modalPosition, setModalPosition, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);

  // Gesture for swipe up and down
  useEffect(() => {
    if (modalRef.current) {
      const gesture = createGesture({
        el: modalRef.current,
        gestureName: 'swipe-modal',
        direction: 'y',
        onStart: () => {
          touchStartY.current = 0; // Reset touch start position
        },
        onMove: (ev) => {
          if (touchStartY.current === 0) {
            touchStartY.current = ev.currentY;
          }
        },
        onEnd: (ev) => {
          const swipeDistance = ev.currentY - touchStartY.current;

          if (swipeDistance > 50) {
            // Swipe down
            if (modalPosition === 'full') {
              setModalPosition('open'); // Go back to the original position
            } else if (modalPosition === 'open') {
              setModalPosition('closed'); // Close the modal
            }
          } else if (swipeDistance < -50) {
            // Swipe up
            if (modalPosition === 'open') {
              setModalPosition('full'); // Expand to full screen
            } else if (modalPosition === 'closed') {
              setModalPosition('open'); // Open the modal
            }
          }
        },
      });
      gesture.enable();

      return () => gesture.destroy();
    }
  }, [modalPosition, setModalPosition]);

  return (
    <>
      {/* Background Overlay */}
      {modalPosition !== 'closed' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setModalPosition('closed')} // Close modal when clicking on the overlay
        ></div>
      )}

      {/* Swipe-Up Modal */}
      <div
  ref={modalRef} // Attach ref to the modal
  className={`fixed bottom-0 shadow-lg transition-transform duration-300 ${
    modalPosition === 'full'
      ? 'translate-y-0  left-0 right-0'
      : modalPosition === 'open'
      ? 'translate-y-1/4  left-4 right-4'
      : 'translate-y-full left-0 right-0'
  }`}
  style={{
    height: modalPosition === 'full' ? '100%' : '120%',
    zIndex: 100,
  }}
>
  {children}
</div>
    </>
  );
};

export default SwipeModal;