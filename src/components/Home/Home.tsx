import React, { useState, useRef, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonContent } from '@ionic/react';
import InputComponent from './Input';
import ButtonGroup from './ButtonGroup';
import NewsList from './News';
import { Capacitor } from '@capacitor/core';
import { SocialLogin } from '@capgo/capacitor-social-login';
import Footer from '../Footer/Footer'; 
import UserPopup from './UserPopup'; 
import SwipeModal from '../../utils/SwipeModal';
import flaskLogo from '../../assets/flask.png'
import googleLogo from '../../assets/google-white-logo.png'




const Home: React.FC = () => {
  const userRef = useRef<any>(null); // Ref to store user data
  const [user, setUser] = useState<any>(null); // State to trigger UI updates
  const [isSticky, setIsSticky] = useState(false); // State to track if the input is sticky
  const [modalPosition, setModalPosition] = useState<'closed' | 'open' | 'full'>('closed'); // State for modal position
  const inputRef = useRef<HTMLDivElement>(null); // Ref for the input wrapper
  const placeholderRef = useRef<HTMLDivElement>(null); // Ref for the placeholder
  


  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      userRef.current = parsedUser; // Set the user data in the ref
      setUser(parsedUser); // Update the state to reflect the user data
    }
  }, []);


  const handleScroll = (event: CustomEvent) => {
    const scrollTop = event.detail.scrollTop; // Get the scroll position
    if (inputRef.current && placeholderRef.current) {
      const placeholderTop = placeholderRef.current.offsetTop; // Get the offsetTop of the placeholder
      setIsSticky(scrollTop >= placeholderTop); // Set sticky if the scroll position is past the placeholder
    }
  };

  const handleLogin = async () => {
    try {
      if (Capacitor.isNativePlatform()) {
        await SocialLogin.initialize({
          google: {
            webClientId: '1009269075164-lbfj2ac6b21mr7gfncdkoiasg3ipcjp2.apps.googleusercontent.com', // Replace with your Web Client ID
          },
        });
        const response: any = await SocialLogin.login({
          provider: 'google',
          options: {},
        });

        console.log('Login Response:', response); // Log the response

        const profile = response.result.profile; // Access the profile object
        alert(`Profile: ${JSON.stringify(profile)}`); // Show the profile in an alert
        const profileImageUrl = profile.imageUrl;
        console.log('Profile Image URL:', profileImageUrl);

        const userData = {
          name: profile.name,
          email: profile.email,
          picture: profileImageUrl,
        };

        userRef.current = userData; // Store user data in the ref
        setUser(userData); // Update the state to trigger UI updates
      } else {
        // Handle web login flow
        console.log('Web login flow not implemented');
      }
    } catch (error) {
      console.error('Login failed:', error); // Log the error
      alert(`Login failed: ${error}`); // Show the error in an alert
    }
  };

  const toggleModal = () => {
    setModalPosition(modalPosition === 'closed' ? 'open' : 'closed'); // Toggle modal position
  };

  

  return (
    <IonPage>
      <IonContent
        scrollEvents={true}
        onIonScroll={handleScroll}
        scrollY={modalPosition === 'closed'} // Disable background scrolling when modal is open or full
      >
        {/* Header */}
        <IonHeader>
          <IonToolbar>
            <div className="flex justify-between items-center py-2">
              <button
                className="flex items-center focus:outline-none bg-transparent border-none"
                aria-label="Experiment"
              >
                <img
                  src={flaskLogo}
                  alt="Flask Icon"
                  className="w-9 h-7"
                  style={{
                    filter:
                      'invert(64%) sepia(19%) saturate(746%) hue-rotate(180deg) brightness(102%) contrast(101%)',
                  }}
                />
              </button>

              <button
                className="flex items-center justify-center w-20 h-10 focus:outline-none
                 bg-transparent border-none mr-4"
                aria-label="Notifications"
              >
                <span className="material-symbols-outlined text-gray-300 text-2xl mr-4">
                  notifications
                </span>
                {user ? (
                  <img
                    src={user.picture} // User's profile picture
                    alt="User"
                    className="w-8 h-8 rounded-full cursor-pointer"
                    onClick={toggleModal} // Open modal on click
                  />
                ) : (
                  <span
                    className="material-symbols-outlined text-gray-300 text-2xl cursor-pointer"
                    onClick={() => handleLogin()}
                  >
                    person
                  </span>
                )}
              </button>
            </div>
          </IonToolbar>
        </IonHeader>

        <div className="relative w-full flex flex-col items-center">
          {/* Google Logo */}
          <div
            className="w-40 h-40 bg-no-repeat bg-contain"
            style={{
              backgroundImage: `url(${googleLogo})`,
              backgroundPosition: 'center top',
            }}
          ></div>

          {/* Placeholder for Input Component */}
          <div ref={placeholderRef} className="w-full max-w-screen-md h-16"></div>

          {/* Input Component */}
          <div
            ref={inputRef} // Attach ref to the input wrapper
            className={`w-full max-w-screen-md bg-transparent ${isSticky ? 'fixed top-0 z-10' : 'absolute'
              }`}
            style={{ top: isSticky ? '10px' : '88px' }}
          >
            <InputComponent />
          </div>
        </div>

        <div className="-mt-16">
          <ButtonGroup />
        </div>

        <div className="mt-8">
          <NewsList />
        </div>


        <SwipeModal modalPosition={modalPosition} setModalPosition={setModalPosition}>
          <UserPopup user={user} onClose={() => setModalPosition('closed')} />
        </SwipeModal>

      </IonContent>

      <Footer/>
    </IonPage>

  );
};

export default Home;