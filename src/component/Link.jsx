import React, { memo } from 'react';

import './styles/Link.scss';

import linkIcon from '../assets/icon-link.svg';
import arrowIcon from '../assets/icon-chevron-down.svg';
import { Platforms } from '../constants/platforms.const';

const Link = memo(({ index, platform, linkValue, onPlatformChange, onLinkChange, onLinkRemoval, error }) => {
  const showOptions = () => {
    document.querySelector(`.platform-select-box-options-${index}`).classList.toggle('show');
  };

  const onOptionClick = option => {
    onPlatformChange(option);
  };

  const selectedPlatform = Platforms.find(item => item.name === platform);

  const borderErrorStyle = { border: '1px solid red' };

  return (
    <fieldset className='customizer-link-container'>
      <div className='customizer-link-actions'>
        <h2>= Link #{index}</h2>
        <button type='button' className='remove-btn' onClick={onLinkRemoval}>
          Remove
        </button>
      </div>

      <fieldset className='platform-select-box-container'>
        <label>
          <p className='body-s'>Platform</p>
        </label>
        <div className='platform-select-box' onClick={showOptions}>
          <img className='platform-logo' src={selectedPlatform.logo} alt={platform} />
          <p className='body-m'>{platform}</p>
          <img className='arrow-icon' src={arrowIcon} alt='link' />
          <div className={`platform-select-box-options platform-select-box-options-${index}`}>
            {Platforms.map((item, idx) => (
              <div key={idx} className='platform-option' onClick={() => onOptionClick(item.name)}>
                <img src={item.logo} alt={item.name} />
                <p className='body-m'>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </fieldset>

      <fieldset className='link-box-container'>
        <label>
          <p className='body-s'>Link</p>
        </label>
        <input
          className='link-input'
          placeholder='e.g. https://www.github.com/johndoe'
          value={linkValue}
          onChange={e => onLinkChange(e.target.value)}
          style={error ? borderErrorStyle : {}}
        />
        <img src={linkIcon} alt='link' />
        {error && <p className='body-s error'>{error}</p>}
      </fieldset>
    </fieldset>
  );
});

export default Link;
