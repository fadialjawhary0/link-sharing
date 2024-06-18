import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Signup = lazy(() => import('./components/Signup/Signup'));
const Login = lazy(() => import('./components/Login/Login'));

const Router = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} exact={true} />
      <Route path='/signup' element={<Signup />} exact={true} />
    </Routes>
  );
};

export default Router;
