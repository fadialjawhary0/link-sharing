import React, { useContext, useEffect, useState } from 'react';
import { child, get, ref } from 'firebase/database';
import { database } from '../../../../firebase';

import './ProfileReviewStyles.scss';

import PhoneMockupImg from '../../../../assets/illustration-phone-mockup.svg';
import { ReactComponent as RightArrow } from '../../../../assets/icon-arrow-right.svg';

import { AuthContext, LinksContext } from '../../../../contexts';
import { Platforms } from '../../../../constants';

const ProfileReview = () => {
  const { links } = useContext(LinksContext);
  const { currentUser } = useContext(AuthContext);

  const [userData, setUserData] = useState({ name: '', emailAddress: '' });

  const fetchInfo = async userId => {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `users/${userId}/profile`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const { firstName, lastName, email } = data;
        setUserData({ name: `${firstName} ${lastName}`, emailAddress: email });
      } else {
        console.log('No data available');
      }
    } catch (error) {
      console.error('Error fetching profile details: ', error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchInfo(currentUser.uid);
    }
  }, [currentUser, userData]);

  return (
    <section className='profile-review-container'>
      <img src={PhoneMockupImg} alt='Phone mockup' />

      <p className='body-m full-name'>{userData?.name}</p>
      <p className='body-s email-address'>{userData?.emailAddress}</p>

      {links.map((link, idx) => {
        const platformData = Platforms.find(platform => platform.name === link.platform);
        return (
          <div key={idx} className={`link-review link-review-${idx + 1}`} style={{ backgroundColor: platformData.backgroundColor, color: platformData.color }}>
            <div className='link-logo'>
              <platformData.logo className='platform-logo' alt={platformData.name} />
              <p className='body-s'>{platformData.name}</p>
            </div>
            <RightArrow />
          </div>
        );
      })}
    </section>
  );
};

export default ProfileReview;
