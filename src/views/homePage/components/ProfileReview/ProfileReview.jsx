import React from 'react';
import './ProfileReviewStyles.scss';

import PhoneMockupImg from '../../../../assets/illustration-phone-mockup.svg';

const ProfileReview = () => {
  return (
    <section className='profile-review-container'>
      <img src={PhoneMockupImg} alt='Phone mockup' />
    </section>
  );
};

export default ProfileReview;
