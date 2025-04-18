import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom'; 
import { Capacitor } from '@capacitor/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import googleVoice from '../../assets/google-voice.png'; // Adjust the path as necessary

const VoiceSearch: React.FC = () => {
  const [isListening, setIsListening] = useState(true); // Tracks if the mic is active
  const [transcript, setTranscript] = useState(''); // Stores the transcript
  const [navigateToResult, setNavigateToResult] = useState(false); // Tracks when to navigate
  const [showImage, setShowImage] = useState(false); // Controls whether the image is shown
  const history = useHistory(); // For navigation

  const micTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref to persist micTimeout

  // Cleanup function to clear timeout
  const cleanup = () => {
    if (micTimeoutRef.current) {
      clearTimeout(micTimeoutRef.current);
      micTimeoutRef.current = null;
    }
  };

  // Function to start listening
  const startListening = async () => {
    cleanup(); // Clear any existing timeout
    if (Capacitor.isNativePlatform()) {
      try {
        console.log('Starting speech recognition...');
        setShowImage(false); // Hide the image when listening starts
        setIsListening(true); // Mark microphone as active

        micTimeoutRef.current = setTimeout(() => {
          console.log('Timeout triggered: No speech detected');
          if (!transcript) {
            console.log('No speech detected, stopping microphone and showing image');
            setIsListening(false); // Stop listening
            setShowImage(true); // Show the image
            SpeechRecognition.stop(); // Stop the microphone
          }
        }, 5000); // 5-second timeout

        SpeechRecognition.start({
          popup: false,
          language: 'en-US',
          partialResults: true,
        });

        // Listen for partial results
        SpeechRecognition.addListener('partialResults', (data: any) => {
          console.log('Partial results received:', data);
          if (data.matches && data.matches.length > 0) {
            setTranscript(data.matches[0]); // Update the transcript state
          }
        });

        // Listen for changes in the listening state
        SpeechRecognition.addListener('listeningState', (data: { status: 'started' | 'stopped' }) => {
          console.log('Listening state changed:', data.status);
          if (data.status === 'started') {
            cleanup()
            setShowImage(false); // Hide the image when listening starts
            setIsListening(true); // Mark microphone as active
          } else if (data.status === 'stopped') {
            console.log('Microphone stopped');
            setIsListening(false); // Mark microphone as inactive
            setNavigateToResult(true); // Trigger navigation after stopping

            // If no transcript is available, show the image

          }
        });

        // Start a timeout to check if the user did not speak

      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    } else {
      alert('Speech recognition is not supported on this device.');
    }
  };

  // Effect to handle navigation after transcript is updated
  useEffect(() => {
    if (navigateToResult && transcript) {
      const timer = setTimeout(() => {
        history.push('/result', { transcript }); // Navigate to result page with transcript
        setNavigateToResult(false); // Reset navigation trigger
      }, 3000); // 3-second delay

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [navigateToResult, transcript, history]);

  useEffect(() => {
    // Automatically start listening when the component mounts
    startListening();

    // Cleanup when the component unmounts
    return () => {
      SpeechRecognition.stop();
      cleanup(); // Clear the timeout
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen
     bg-zinc-800 text-white">
      {/* Animation container or Google Voice image */}
      <div className="dot-animation-container w-4">
        {showImage ? (
          <img
            src={googleVoice} // Replace with the correct path to your image
            alt="Google Voice"
            className="w-12 h-12 cursor-pointer animate-pulse" // Add animation and styling
            onClick={() => {
              console.log('Image clicked, restarting listening');
              startListening(); // Call startListening function
            }}
          />
        ) : isListening ? (
          <div className="dots-sound">
            {[0, 1, 2, 3].map((_, index) => {
              const colors = ['blue', 'red', 'yellow', 'green']; // Colors for the dots
              return (
                <div
                  key={index}
                  className={`dot ${colors[index]}`} // Assign color class
                ></div>
              );
            })}
          </div>
        ) : (
          <div className="google-loader">
            <div className="dot blue"></div>
            <div className="dot red"></div>
            <div className="dot yellow"></div>
            <div className="dot green"></div>
          </div>
        )}
      </div>

      {/* Listening or Processing text in the middle */}
      <div className="mt-0 text-center w-[90%] break-words whitespace-pre-wrap
       overflow-hidden leading-[1.5] flex flex-col justify-start items-center">
  <div className="text-center text-3xl text-zinc-400 mt-2">
    {transcript
      ? transcript
      : isListening
      ? 'Listening...'
      : showImage
      ? 'Tap the mic, then speak into your device for quick answers'
      : 'Processing...'}
  </div>
</div>

      <div className="mt-32 flex items-center justify-between px-4 py-2 
      border border-white rounded-full w-40">
  <span className="material-symbols-outlined text-blue-500 text-2xl ">music_note</span>
  <span className="text-zinc-400 text-sm">Search a song</span>
</div>
    </div>

  );
};

export default VoiceSearch;