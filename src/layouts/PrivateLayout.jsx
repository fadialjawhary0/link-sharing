import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PrivateRouter } from '../routers';
import Navbar from '../component/Navbar';

const PrivateLayout = () => {
  const AppBarWrapper = ({ Component, routerName }) => {
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [routerName]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', maxWidth: '127rem', width: '100%' }}>
        <Navbar />
        <Component />
      </div>
    );
  };

  return (
    <Routes>
      {PrivateRouter?.map((router, index) => (
        <Route key={`${index}-${router.name}`} path={router.path} element={<AppBarWrapper Component={router.component} routerName={router.name} />} />
      ))}
    </Routes>
  );
};

export default PrivateLayout;
