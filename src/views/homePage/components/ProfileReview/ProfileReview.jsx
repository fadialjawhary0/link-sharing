import React, { useContext, useEffect, useState } from 'react';
import { child, get, ref } from 'firebase/database';
import { database } from '../../../../firebase';

import './ProfileReviewStyles.scss';

import PhoneMockupImg from '../../../../assets/illustration-phone-mockup.svg';
import { ReactComponent as RightArrow } from '../../../../assets/icon-arrow-right.svg';
import ErrorIcon from '../../../../assets/alert-error.svg';

import { AuthContext, LinksContext, ToastContext } from '../../../../contexts';
import { Platforms, ToastMessages } from '../../../../constants';

const ProfileReview = () => {
  const { links, retrieveLinks } = useContext(LinksContext);
  const { currentUser } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  const [userData, setUserData] = useState({ name: '', emailAddress: '', profileImageURL: '' });

  const fetchInfo = async userId => {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `users/${userId}/profile`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const { firstName = '', lastName = '', email, profileImage } = data;
        setUserData({ name: `${firstName} ${lastName}`, emailAddress: email, profileImageURL: profileImage });
      }
    } catch {
      showToast(true, ToastMessages?.ErrorOccurred, ErrorIcon);
    }
  };

  useEffect(() => {
    retrieveLinks(currentUser?.uid);
    // eslint-disable-next-line
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      fetchInfo(currentUser.uid);
    }
    // eslint-disable-next-line
  }, [currentUser, userData]);

  return (
    <section className='profile-review-container'>
      <img src={PhoneMockupImg} alt='Phone mockup' />

      {userData?.profileImageURL && <img className='profile-picture' src={userData?.profileImageURL} alt='user' />}
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
