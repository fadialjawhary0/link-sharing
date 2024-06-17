import { lazy } from 'react';

const homePageRouter = lazy(() => import('../views/homePage/homePage.router'));

export const PublicRouter = [
  {
    path: '/',
    name: 'homePage',
    component: homePageRouter,
    exact: true,
  },
];
