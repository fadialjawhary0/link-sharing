import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PrivateRouter } from '../routers';
import Navbar from '../component/Navbar';
import './styles/privateLayout.scss';

const PrivateLayout = () => {
  const AppBarWrapper = ({ Component, routerName }) => {
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [routerName]);

    return (
      <div className='private-container'>
        <Navbar />
        <div className='private-component-container'>
          <Component />
        </div>
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
