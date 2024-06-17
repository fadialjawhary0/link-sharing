import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Box, useTheme } from '@mui/material';

import { PublicRouter } from '../routers';

const PublicLayout = () => {
  const theme = useTheme();

  const AppBarWrapper = ({ Component, routerName }) => {
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [routerName]);

    {
      /* px: { xs: '2.4rem', sm: '4rem', md: '8rem', lg: '6rem' } */
    }
    return (
      <div style={{}}>
        <div style={{ minHeight: theme.spacing(65), display: 'flex', flexDirection: 'column' }}>
          <Component />
        </div>
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
