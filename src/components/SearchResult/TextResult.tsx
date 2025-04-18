import React, { useState, useEffect, useRef } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import Loader from '../Loader/Loader';
import UserPopup from '../Home/UserPopup'; // Import the UserPopup component
import SwipeModal from '../../utils/SwipeModal';
import { searchResults } from '../../dummy-data/search-result';

const ResultPage: React.FC = () => {

  const history = useHistory();
  const state = history.location.state as { transcript?: string }; // Access state from history
  const transcript = state?.transcript || ''; // Get the transcript from state
  const menuItems = [
    'All','Images','Shopping','Videos','News','Short Videos','Forums','Web','Maps',
    'Books','Flights','Finance','Search Tools','Feedback',
  ];  
  const [modalPosition, setModalPosition] = useState<'closed' | 'open' | 'full'>('closed'); // State for modal position
  const [isLoading, setIsLoading] = useState(true); // Initial state is true
  const [selectedTab, setSelectedTab] = useState('All'); // State to track the selected tab
  const [isSticky, setIsSticky] = useState(false); // State to track if the input box is sticky
  const inputRef = useRef<HTMLDivElement>(null); // Ref for the input wrapper
  const placeholderRef = useRef<HTMLDivElement>(null); // Ref for the placeholder

  // Simulate loading for 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  const handleMenuClick = (item: string) => {
    setSelectedTab(item); // Update the selected tab
    setIsLoading(true); // Set loading to true

    // Simulate a delay for loading (e.g., fetching data)
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds
    }, 2000);
  };

  const toggleModal = () => {
    setModalPosition(modalPosition === 'closed' ? 'open' : 'closed'); // Toggle modal position
  };

  // Handle scroll to make the input box sticky
  const handleScroll = (event: CustomEvent) => {
    const scrollTop = event.detail.scrollTop; // Get the scroll position
    if (inputRef.current && placeholderRef.current) {
      const placeholderTop = placeholderRef.current.offsetTop; // Get the offsetTop of the placeholder
      setIsSticky(scrollTop >= placeholderTop); // Set sticky if the scroll position is past the placeholder
    }
  };

  // Get user profile image from local storage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userImage = user?.picture || '/src/assets/default-profile.png'; // Default profile image if not found

  return (
    <IonPage>
      <IonContent
        className="bg-zinc-800"
        scrollEvents={true}
        onIonScroll={handleScroll} // Attach scroll handler
      >
        {/* Header */}
        <IonHeader>
          <IonToolbar className="bg-zinc-800">
            <div className="flex items-center justify-between px-4 mb-2 mt-6">
              {/* Flask Icon */}
              <img
                src="/src/assets/flask.png"
                alt="Flask Icon"
                className="w-9 h-7"
                style={{
                  filter:
                    'invert(64%) sepia(19%) saturate(746%) hue-rotate(180deg) brightness(102%) contrast(101%)',
                }}
              />
              {/* Google Logo */}
              <img
                src="/src/assets/google-white-logo.png"
                alt="Google Logo"
                className="w-32 h-12"
              />

              {/* User Profile Image */}
              <img
                src={userImage}
                alt="User Profile"
                className="w-8 h-8 rounded-full object-cover"
                onClick={toggleModal} // Open modal on click
              />
            </div>
          </IonToolbar>
        </IonHeader>

        {/* Placeholder for Input Box */}
        <div ref={placeholderRef} className="w-full h-2"></div>

        {/* Input Box */}
        <div
          ref={inputRef} // Attach ref to the input wrapper
          className={`flex items-center w-auto h-14 rounded-full px-4 bg-zinc-700
             box-border mx-4 transition-all duration-300 
            ${isSticky ? 'fixed top-4 z-10 w-[calc(100%-32px)]' : 'relative w-[calc(100%-32px)]'
            }`}
        >
          {/* Search Icon */}
          <span className="material-symbols-outlined text-zinc-400 text-2xl">search</span>

          {/* Input Field */}
          <input
            type="text"
            value={transcript} // Bind the input value to the transcript state
            onChange={(e) => history.replace({ state: { transcript: e.target.value } })} // Update the transcript dynamically
            className="flex-1 min-w-0 bg-transparent text-zinc-200 text-base
             placeholder-gray-400 outline-none px-4"
          />

          {/* Icons Container */}
          <div className="flex items-center space-x-6">
            {/* Google Voice Icon */}
            <img
              src="/src/assets/google-voice.png"
              alt="Google Voice"
              className="w-6 h-6 cursor-pointer"
              onClick={() => history.push('/voice-search')} // Navigate to Voice Search
            />

            {/* Google Lens Icon */}
            <img
              src="/src/assets/google-lens.png"
              alt="Google Lens"
              className="w-6 h-6 cursor-pointer"
              onClick={() => history.push('/camera')} // Navigate to Voice Search
            />
          </div>
        </div>

        {/* Menu */}
        <div className="flex overflow-x-auto lg:overflow-visible scrollbar-hide px-4 mt-4">
          <div
            className={`flex w-full ${menuItems.length <= 5 ? 'justify-evenly' : 'lg:justify-evenly'
              } space-x-4`}
          >
            {menuItems.map((item) => (
              <div
                key={item}
                className={`flex-shrink-0 py-1 font-bold text-sm sm:text-xs md:text-sm lg:text-base 
                  cursor-pointer mx-3 ${selectedTab === item
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-400'
                  }`}
                onClick={() => handleMenuClick(item)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="p-3 relative">
            <Loader /> {/* Show loader when isLoading is true */}
          </div>
        ) : (
          <div className="mt-4 space-y-2  w-full">
            {searchResults.map((result, index) => (
              <div
                key={index}
                className="bg-zinc-800 rounded-lg p-4 shadow-md hover:shadow-lg 
                transition-shadow duration-300"
              >
                {/* Flex Container for Image, Text, and More Icon */}
                <div className="flex items-center justify-between w-full">
                  {/* Left Section: Image, Heading, and Website */}
                  <div className="flex items-center space-x-4">
                    {/* Image */}
                    <img
                      src="/src/assets/g-logo.png"
                      alt="Google Logo"
                      className="w-5 h-5 flex-shrink-0"
                    />

                    {/* Text Content */}
                    <div>
                      {/* Heading */}
                      <h4 className="text-sm text-white font-semibold hover:underline cursor-pointer">
                        {result.heading}
                      </h4>

                      {/* Website */}
                      <p className="text-sm text-zinc-300 truncate">{result.website}</p>
                    </div>
                  </div>

                  {/* Right Section: More Icon */}
                  <span className="material-symbols-outlined text-zinc-400 cursor-pointer">
                    more_vert
                  </span>
                </div>

                {/* Heading Description */}
                <p className="text-xl text-blue-300 mt-2">{result.headingDescription}</p>

                {/* Description */}
                <p className="text-sm text-gray-300 mt-2 line-clamp-3">{result.description}</p>
              </div>
            ))}
          </div>
        )}

        <SwipeModal modalPosition={modalPosition} setModalPosition={setModalPosition}>
          <UserPopup user={user} onClose={() => setModalPosition('closed')} />
        </SwipeModal>
      </IonContent>
      

    </IonPage>
  );
};

export default ResultPage;