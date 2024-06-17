import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppContainer from './layouts/index';

function App() {
  return (
    <>
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
