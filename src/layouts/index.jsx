import React, { Suspense, useContext, useEffect } from 'react';

import PublicLayout from './PublicLayout';
import PrivateLayout from './PrivateLayout';

import { AuthContext } from '../contexts/auth.context';
import { useNavigate } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) navigate('/login');
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2.4rem',
      }}>
      <Suspense
        fallback={<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>Loading...</div>}>
        {currentUser ? <PrivateLayout /> : <PublicLayout />}
      </Suspense>
    </div>
  );
};

export default Layout;
