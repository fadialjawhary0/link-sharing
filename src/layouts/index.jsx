import React, { Suspense, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import PublicLayout from './PublicLayout';
import PrivateLayout from './PrivateLayout';
import { AuthContext } from '../contexts/auth.context';
import './styles/index.scss';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { currentUser } = useContext(AuthContext);

  const isUserPage = location.pathname.startsWith('/user');

  useEffect(() => {
    if (!currentUser) {
      if (isUserPage) {
        navigate(location.pathname);
      } else {
        navigate('/login');
      }
    }
  }, []);

  return (
    <div className='container' style={{ display: isUserPage ? 'unset' : currentUser ? 'flex' : 'unset' }}>
      <Suspense
        fallback={<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>Loading...</div>}>
        {currentUser ? <PrivateLayout /> : <PublicLayout />}
      </Suspense>
    </div>
  );
};

export default Layout;
