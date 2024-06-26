import React, { useContext, useState, useEffect } from 'react';
import { database } from '../../../../firebase';
import { ref, set, get, child } from 'firebase/database';

import './LinkCustomizerStyles.scss';

import EmptyLinksImg from '../../../../assets/illustration-empty.svg';
import Link from '../../../../component/Link';
import { Platforms } from '../../../../constants/platforms.const';
import { LinksContext, AuthContext } from '../../../../contexts';
import SkeletonComponent from './SkeletonComponent';
import { LinkErrors } from '../../../../constants';
import { ValidationHelper } from '../../../../helpers/validators';

const LinkCustomizer = () => {
  const [count, setCount] = useState(0);
  const [error, setError] = useState([]);
  const [loader, setLoader] = useState(true);

  const { setLinks, links } = useContext(LinksContext);
  console.log(links);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      fetchLinks(currentUser.uid);
    } else {
      setLinks([]);
      setCount(0);
    }
    // eslint-disable-next-line
  }, [currentUser]);

  const fetchLinks = async userId => {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `users/${userId}/links`));
      if (snapshot.exists()) {
        const linksData = snapshot.val();
        const linksArray = Object.values(linksData);
        setLinks(linksArray);
        setCount(linksArray.length);
        console.log('Fetched links:', linksArray);
      } else {
        console.log('No data available');
        setLinks([]);
        setCount(0);
      }
    } catch (error) {
      console.error('Error fetching links: ', error);
    } finally {
      setLoader(false);
    }
  };

  const handleClick = () => {
    setCount(count + 1);
    setLinks([...links, { platform: Platforms[0].name, link: '' }]);
  };

  const handlePlatformChange = (index, platform) => {
    const newLinks = links.map((link, i) => (i === index ? { ...link, platform } : link));
    setLinks(newLinks);
  };

  const handleLinkChange = (index, linkValue) => {
    const newLinks = links.map((link, i) => (i === index ? { ...link, link: linkValue } : link));
    setLinks(newLinks);
  };

  const handleLinkRemoval = index => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
    setCount(newLinks.length);
  };

  const handleSave = async () => {
    const newErrors = links.map(item => {
      if (!item?.link.trim()) return LinkErrors?.Empty;
      if (!ValidationHelper.isURL(item?.link)) return LinkErrors?.InvalidURL;
      return null;
    });
    setError(newErrors);

    const isValid = !newErrors.some(Boolean);

    if (currentUser && isValid) {
      try {
        const userLinksRef = ref(database, `users/${currentUser.uid}/links`);
        const linksData = {};
        links.forEach((link, index) => {
          linksData[index] = link;
        });
        await set(userLinksRef, linksData);
      } catch (error) {
        console.error('Error saving links: ', error);
      }
    }
  };

  return (
    <form>
      <h1 className='customizer-title'>Customize your links</h1>
      <p className='body-m customizer-description'>Add/edit/remove links below and then share all your profiles with the world!</p>
      <fieldset className='customizer-fieldset'>
        <button type='button' disabled={count === 5} className='secondary-btn' onClick={handleClick}>
          + Add new link
        </button>
        {loader ? (
          <SkeletonComponent />
        ) : count > 0 ? (
          links.map((link, index) => (
            <Link
              key={index}
              index={index + 1}
              platform={link.platform}
              linkValue={link.link}
              onPlatformChange={platform => handlePlatformChange(index, platform)}
              onLinkChange={linkValue => handleLinkChange(index, linkValue)}
              onLinkRemoval={() => handleLinkRemoval(index)}
              error={error[index]}
            />
          ))
        ) : (
          <div className='empty-container'>
            <img src={EmptyLinksImg} alt='Empty illustration' />
            <h1>Let's get you started</h1>
            <p className='body-m empty-description'>
              Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We're here to help you share your
              profiles with everyone!
            </p>
          </div>
        )}
      </fieldset>
      <section className='customizer-submit-container'>
        <button type='button' className='submit-btn' onClick={handleSave}>
          Save
        </button>
      </section>
    </form>
  );
};

export default LinkCustomizer;
