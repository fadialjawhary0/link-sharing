import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

import './styles/NavbarStyles.scss';

import { ReactComponent as LinksIcon } from '../assets/icon-links-header.svg';
import { ReactComponent as ProfileIcon } from '../assets/icon-profile-details-header.svg';
import { ReactComponent as SignoutIcon } from '../assets/logout-svgrepo-com.svg';

import { AuthContext } from '../contexts/auth.context';
import { NavLinksContext } from '../contexts/navLink.context';

const Navbar = () => {
  const navigate = useNavigate();

  const { signout } = useContext(AuthContext);
  const { setActiveLink, activeLink } = useContext(NavLinksContext);

  const handleLinkClick = link => setActiveLink(link);

  const handleLogout = async () => {
    try {
      await signout();
      navigate('/login');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <nav className='navbar-container'>
      <div className='logo' onClick={() => navigate('/')}></div>
      <ul className='navbar-links'>
        <li className={`navbar-links__item ${activeLink === 'links' ? 'navbar-links__item-active' : ''}`} onClick={() => handleLinkClick('links')}>
          <LinksIcon className='nav-icon' />
          <h2>Links</h2>
        </li>
        <li className={`navbar-links__item ${activeLink === 'profile' ? 'navbar-links__item-active' : ''}`} onClick={() => handleLinkClick('profile')}>
          <ProfileIcon className='nav-icon' />
          <h2>Profile Details</h2>
        </li>
      </ul>
      <div className='navbar-actions'>
        <button className='secondary-btn' onClick={() => navigate('/preview')}>
          Preview
        </button>
        <div className='preview-icon'></div>
        <SignoutIcon className='signout-icon' data-tooltip-id='my-tooltip' data-tooltip-content='Sign out' data-tooltip-place='right' onClick={handleLogout} />
        <Tooltip id='my-tooltip' />
      </div>
    </nav>
  );
};

export default Navbar;
