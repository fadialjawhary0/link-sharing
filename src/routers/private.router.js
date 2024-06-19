import { lazy } from 'react';

const homeRouter = lazy(() => import('../views/homePage/homePage.router'));

export const PrivateRouter = [
  {
    path: '/*',
    name: 'home',
    component: homeRouter,
    exact: true,
  },
];
