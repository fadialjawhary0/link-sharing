import React, { useContext, useState, useEffect } from 'react';
import { database } from '../../../../firebase';
import { ref, set, get, child } from 'firebase/database';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './LinkCustomizerStyles.scss';

import EmptyLinksImg from '../../../../assets/illustration-empty.svg';
import ChangesSavedIcon from '../../../../assets/icon-changes-saved.svg';
import ErrorIcon from '../../../../assets/alert-error.svg';

import Link from '../../../../component/Link';
import { Platforms } from '../../../../constants/platforms.const';
import { LinksContext, AuthContext, ToastContext } from '../../../../contexts';
import { LinkErrors, ToastMessages } from '../../../../constants';
import { ValidationHelper } from '../../../../helpers/validators';
import SkeletonComponent from './SkeletonComponent';

const LinkCustomizer = () => {
  const [count, setCount] = useState(0);
  const [error, setError] = useState([]);
  const [loader, setLoader] = useState(true);
  const [submitLoader, setSubmitLoader] = useState(false);

  const { setLinks, links } = useContext(LinksContext);
  const { currentUser } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  const fetchLinks = async userId => {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `users/${userId}/links`));
      if (snapshot.exists()) {
        const linksData = snapshot.val();
        setLinks(linksData);
        setCount(linksData.length);
      } else {
        setLinks([]);
        setCount(0);
      }
    } catch (error) {
      console.error('Error fetching links: ', error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchLinks(currentUser.uid);
    // eslint-disable-next-line
  }, [currentUser]);

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

  const handleDragEnd = result => {
    if (!result.destination) return;

    const reorderedLinks = Array.from(links);
    const [removed] = reorderedLinks.splice(result.source.index, 1);
    reorderedLinks.splice(result.destination.index, 0, removed);

    setLinks(reorderedLinks);
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
      setSubmitLoader(true);
      try {
        const userLinksRef = ref(database, `users/${currentUser.uid}/links`);
        const linksData = {};
        links.forEach((link, index) => {
          linksData[index] = link;
        });

        await set(userLinksRef, linksData);
        showToast(true, ToastMessages?.SavedSuccessfully, ChangesSavedIcon);
      } catch (error) {
        showToast(true, ToastMessages?.ErrorOccurred, ErrorIcon);
      } finally {
        setSubmitLoader(false);
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
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId='links'>
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {links.map((link, index) => (
                    <Draggable key={index} draggableId={index.toString()} index={index}>
                      {provided => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
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
        <button type='button' className={`submit-btn ${submitLoader ? 'loading' : ''}`} disabled={submitLoader} onClick={handleSave}>
          Save
        </button>
      </section>
    </form>
  );
};

export default LinkCustomizer;
