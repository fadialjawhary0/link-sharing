import React, { Suspense } from 'react';

import PublicLayout from './PublicLayout';

const Layout = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'space-between',
        margin: '0 auto',
        padding: '1rem',
      }}>
      <Suspense
        fallback={<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>Loading...</div>}>
        <PublicLayout />
      </Suspense>
    </div>
  );
};

export default Layout;
