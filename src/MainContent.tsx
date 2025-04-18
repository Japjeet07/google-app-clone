import React from 'react';
import { IonRouterOutlet } from '@ionic/react';
import { Route, Switch, useLocation } from 'react-router-dom'; // Import hooks
import Home from '../src/components/Home/Home'; // Adjust the import path as necessary
import Camera from '../src/components/Camera/Camera'; // Adjust the import path as necessary
import Footer from '../src/components/Footer/Footer'; // Adjust the import path as necessary
import VoiceSearch from './components/Search/VoiceSearch'; // Adjust the import path as necessary
import ResultPage from './components/SearchResult/TextResult';
import TextSearch from './components/Search/TextSearch';

const MainContent: React.FC = () => {
  const location = useLocation(); // Get the current location

  // Define routes where the footer should be displayed
  const showFooter = ["/result", "/saved"].includes(location.pathname);

  return (
    <>

      <IonRouterOutlet>
        <Switch>
          {/* Define the routes */}

          <Route exact path="/" component={Home} />
          <Route path="/camera" component={Camera} />
          <Route path="/voice-search" component={VoiceSearch} />
          <Route path="/result" component={ResultPage} />
          <Route path="/search" component={TextSearch} />
          <Route path="/saved" component={() => <div>Saved Page</div>} />
        </Switch>
      </IonRouterOutlet>

      {/* Conditionally render the Footer */}
      {showFooter && <Footer />}
    </>
  );
};

export default MainContent;