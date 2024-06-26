import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppContainer from './layouts/index';
import { AuthProvider, NavLinksProvider, LinksProvider } from './contexts/index';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <LinksProvider>
            <NavLinksProvider>
              <AppContainer />
            </NavLinksProvider>
          </LinksProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
