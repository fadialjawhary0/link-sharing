import React, { useContext, useEffect, useState } from 'react';
import { get, ref, child } from 'firebase/database';
import { useParams } from 'react-router-dom';
import './PreviewPageStyles.scss';

import NoProfilePic from '../../../assets/no-profile-pic.png';
import { ReactComponent as RightArrow } from '../../../assets/icon-arrow-right.svg';

import { Platforms } from '../../../constants';
import { database } from '../../../firebase';

const PreviewPage = () => {
  const { userId } = useParams();

  const [profileDetails, setProfileDetails] = useState({ firstName: '', lastName: '', email: '', profileImage: null });
  const [links, setLinks] = useState([]);

  useEffect(() => {
    if (userId) {
      fetchProfileDetails(userId);
      fetchLinks(userId);
    }
  }, [userId]);

  const fetchProfileDetails = async userId => {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `users/${userId}/profile`));
      if (snapshot.exists()) {
        setProfileDetails(snapshot.val());
      } else {
        console.log('No profile data available');
      }
    } catch (error) {
      console.error('Error fetching profile details: ', error);
    }
  };

  const fetchLinks = async userId => {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `users/${userId}/links`));
      if (snapshot.exists()) {
        setLinks(Object.values(snapshot.val()));
      } else {
        console.log('No links data available');
      }
    } catch (error) {
      console.error('Error fetching links: ', error);
    }
  };

  const { firstName, lastName, email, profileImage } = profileDetails;
  const fullName = `${firstName} ${lastName}`;

  return (
    <section className='preview-page'>
      {profileImage ? (
        <img className='profile-picture' src={profileImage} alt='profile' />
      ) : (
        <img className='profile-picture' src={NoProfilePic} alt='profile' />
      )}
      <h1 className='full-name'>{fullName}</h1>
      <p className='body-m email'>{email}</p>
      <div className='links-container'>
        {links.map((link, idx) => {
          const platformData = Platforms.find(platform => platform.name === link.platform);
          return (
            <div key={idx} className='link' style={{ backgroundColor: platformData.backgroundColor, color: platformData.color }}>
              <a className='link-logo' href={link?.link} target='_blank' rel='noreferrer'>
                <platformData.logo className='platform-logo' alt={platformData.name} />
                <p className='body-s'>{platformData.name}</p>
              </a>
              <RightArrow />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PreviewPage;
