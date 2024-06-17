import React from 'react';
import ReactDOM from 'react-dom/client';

// eslint-disable-next-line
import { Analytics } from '@vercel/analytics/react';

import App from './App';
import './styles/main.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
    <App />
    <Analytics />
  </React.Fragment>,
);
