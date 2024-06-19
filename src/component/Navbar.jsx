import React from 'react';
import './styles/NavbarStyles.scss';

import Logo from '../assets/logo-devlinks-large.svg';
import LinksIcon from '../assets/icon-links-header.svg';
import ProfileIcon from '../assets/icon-profile-details-header.svg';

const Navbar = () => {
  return (
    <nav className='navbar-container'>
      <img src={Logo} alt='DevLinks Logo' />
      <ul className='navbar-links'>
        <li className='navbar-links__item'>
          <img src={LinksIcon} alt='Links Icon' />
          <h2>Links</h2>
        </li>
        <li className='navbar-links__item'>
          <img src={ProfileIcon} alt='Profile Details Icon' />
          <h2>Profile Details</h2>
        </li>
      </ul>
      <button>Preview</button>
    </nav>
  );
};

export default Navbar;
