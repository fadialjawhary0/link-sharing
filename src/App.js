import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppContainer from './layouts/index';
import { AuthProvider, NavLinksProvider, LinksProvider, ToastProvider, ProfileDetailsProvider } from './contexts/index';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ToastProvider>
            <ProfileDetailsProvider>
              <LinksProvider>
                <NavLinksProvider>
                  <AppContainer />
                </NavLinksProvider>
              </LinksProvider>
            </ProfileDetailsProvider>
          </ToastProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
