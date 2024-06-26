import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PublicRouter } from '../routers';
import PreviewNavbar from '../component/PreviewNavbar';

const PublicLayout = () => {
  const AppBarWrapper = ({ Component, routerName }) => {
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [routerName]);

    const isUserPage = routerName === 'user';

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: isUserPage ? '100%' : '100vh' }}>
        {isUserPage && <PreviewNavbar />}
        <Component />
      </div>
    );
  };

  return (
    <Routes>
      {PublicRouter?.map((router, index) => (
        <Route key={`${index}-${router.name}`} path={router.path} element={<AppBarWrapper Component={router.component} routerName={router.name} />} />
      ))}
    </Routes>
  );
};

export default PublicLayout;
