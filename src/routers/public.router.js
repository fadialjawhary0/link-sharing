import { lazy } from 'react';

const authRouter = lazy(() => import('../views/auth/auth.router'));
const previewRouter = lazy(() => import('../views/previewPage/previewPage.router'));

export const PublicRouter = [
  {
    path: '/*',
    name: 'auth',
    component: authRouter,
    exact: true,
  },
  {
    path: '/user/*',
    name: 'user',
    component: previewRouter,
    exact: true,
  },
];
