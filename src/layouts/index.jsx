import React, { Suspense, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import PublicLayout from './PublicLayout';
import PrivateLayout from './PrivateLayout';
import { AuthContext } from '../contexts/auth.context';
import './styles/index.scss';

const Layout = () => {
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) navigate('/login');
  }, []);

  return (
    <div className='container'>
      <Suspense
        fallback={<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>Loading...</div>}>
        {currentUser ? <PrivateLayout /> : <PublicLayout />}
      </Suspense>
    </div>
  );
};

export default Layout;
