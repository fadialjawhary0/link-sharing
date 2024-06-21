import React from 'react';
import './LinkCustomizerStyles.scss';

import EmptyLinksImg from '../../../../assets/illustration-empty.svg';

const LinkCustomizer = () => {
  return (
    <form>
      <h1 className='customizer-title'>Customize your links</h1>
      <p className='body-m customizer-description'>Add/edit/remove links below and then share all your profiles with the world!</p>
      <fieldset className='customizer-fieldset'>
        <button type='button' className='secondary-btn'>
          + Add new link
        </button>
        <div className='customizer-link-container'>
          <img src={EmptyLinksImg} alt='Empty illustration' />
          <h1>Let's get you started</h1>
          <p className='body-m link-description'>
            Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We're here to help you share your
            profiles with everyone!
          </p>
        </div>
      </fieldset>
      <section className='customizer-submit-container'>
        <button className='submit-btn'>Save</button>
      </section>
    </form>
  );
};

export default LinkCustomizer;
