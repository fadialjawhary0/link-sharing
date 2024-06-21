import React from 'react';

import './HomePageStyles.scss';
import ProfileReview from '../ProfileReview/ProfileReview';
import LinkCustomizer from '../LinkCustomizer/LinkCustomizer';

const HomePage = () => {
  return (
    <main className='home-main'>
      <ProfileReview />
      <LinkCustomizer />
    </main>
  );
};

export default HomePage;
