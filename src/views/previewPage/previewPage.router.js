import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const PreviewPage = lazy(() => import('./components/PreviewPage'));

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<PreviewPage />} />
    </Routes>
  );
};

export default Router;
