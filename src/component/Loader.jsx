import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, height: '100vh' }}>
      <ClipLoader color='#633cff' />
    </div>
  );
};

export default Loader;
