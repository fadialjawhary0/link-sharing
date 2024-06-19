import React, { Suspense, useContext } from 'react';

import PublicLayout from './PublicLayout';
import PrivateLayout from './PrivateLayout';

import { AuthContext } from '../contexts/auth.context';

const Layout = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'space-between',
        margin: '0 auto',
        padding: '1rem',
      }}>
      <Suspense
        fallback={<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>Loading...</div>}>
        {currentUser ? <PrivateLayout /> : <PublicLayout />}
      </Suspense>
    </div>
  );
};

export default Layout;
