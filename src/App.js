import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppContainer from './layouts/index';
import { AuthProvider } from './contexts/auth.context';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <AppContainer />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
