import React, { Suspense } from 'react';

import PublicLayout from './PublicLayout';

const Layout = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        justifyContent: 'space-between',
        margin: '0 auto',
        maxWidth: '140rem',
      }}>
      {/* <Suspense
        fallback={
          <div display='flex' flexDirection='column' alignItems='center' justifyContent='center' flexGrow={1}>
            Loading...
          </div>
        }>
        <PublicLayout />
      </Suspense> */}
    </div>
  );
};

export default Layout;
