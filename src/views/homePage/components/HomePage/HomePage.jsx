import React, { useContext } from 'react';

import './HomePageStyles.scss';

import { NavLinksContext } from '../../../../contexts';

import ProfileReview from '../ProfileReview/ProfileReview';
import LinkCustomizer from '../LinkCustomizer/LinkCustomizer';
import ProfileDetails from '../ProfileDetails/ProfileDetails';

const HomePage = () => {
  const { activeLink } = useContext(NavLinksContext);

  return (
    <main className='home-main'>
      <ProfileReview />
      {activeLink === 'links' ? <LinkCustomizer /> : <ProfileDetails />}
    </main>
  );
};

export default HomePage;
