import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppContainer from './layouts/index';
import { SignupProvider } from './contexts/signup.context';

function App() {
  return (
    <>
      <BrowserRouter>
        <SignupProvider>
          <AppContainer />
        </SignupProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
