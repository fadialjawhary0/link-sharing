import { lazy } from 'react';

const homeRouter = lazy(() => import('../views/homePage/homePage.router'));
const previewRouter = lazy(() => import('../views/previewPage/previewPage.router'));

export const PrivateRouter = [
  {
    path: '/*',
    name: 'home',
    component: homeRouter,
    exact: true,
  },
  {
    path: '/preview',
    name: 'preview',
    component: previewRouter,
    exact: true,
  },
];
