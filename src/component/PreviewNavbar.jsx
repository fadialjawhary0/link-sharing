import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import './styles/PreviewNavbarStyles.scss';

import { AuthContext, ToastContext } from '../contexts/index';
import CopyIcon from '../assets/icon-link-copied-to-clipboard.svg';

const PreviewNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { currentUser } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  const userId = location.pathname.split('/')[2];
  const isCurrentUser = currentUser && currentUser.uid === userId;

  const shareLink = `${window.location.origin}/user/${userId}`;

  const handleShareClick = () => {
    navigator.clipboard.writeText(shareLink);
    showToast(true, 'Link copied to clipboard', CopyIcon);
  };

  return (
    <nav className='preview-navbar'>
      {isCurrentUser && (
        <div className='preview-btns-container'>
          <button className='editor-btn' onClick={() => navigate('/')}>
            Back to Editor
          </button>
          <button className='share-btn' onClick={handleShareClick}>
            Share Link
          </button>
        </div>
      )}
    </nav>
  );
};

export default PreviewNavbar;
