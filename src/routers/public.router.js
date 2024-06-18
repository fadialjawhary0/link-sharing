import { lazy } from 'react';

const authRouter = lazy(() => import('../views/auth/auth.router'));

export const PublicRouter = [
  {
    path: '/*',
    name: 'auth',
    component: authRouter,
    exact: true,
  },
];
