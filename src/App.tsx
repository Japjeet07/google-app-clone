import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import MainContent from './MainContent'; // Import MainContent
import './App.css'
import { GoogleOAuthProvider } from '@react-oauth/google';



function App() {
  return (
    <GoogleOAuthProvider clientId="1009269075164-lbfj2ac6b21mr7gfncdkoiasg3ipcjp2.apps.googleusercontent.com">

    <IonApp>
      <IonReactRouter>
        <MainContent />
      </IonReactRouter>
    </IonApp>
    </GoogleOAuthProvider>

  );
}

export default App;