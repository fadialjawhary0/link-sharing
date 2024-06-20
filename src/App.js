import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppContainer from './layouts/index';
import { AuthProvider } from './contexts/auth.context';
import { NavLinksProvider } from './contexts/navLink.context';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <NavLinksProvider>
            <AppContainer />
          </NavLinksProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
