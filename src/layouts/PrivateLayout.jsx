import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import './styles/privateLayout.scss';

import { PrivateRouter } from '../routers';
import Navbar from '../component/Navbar';
import PreviewNavbar from '../component/PreviewNavbar';

const PrivateLayout = () => {
  const AppBarWrapper = ({ Component, routerName }) => {
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [routerName]);

    const isPreview = routerName === 'preview' || routerName === 'user';

    return (
      <div className={`private-container ${isPreview ? 'private-preview-container' : ''}`}>
        {isPreview ? <PreviewNavbar /> : <Navbar />}

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
