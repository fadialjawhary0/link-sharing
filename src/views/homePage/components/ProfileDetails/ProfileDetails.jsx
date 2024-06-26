import React, { useState } from 'react';

import './ProfileDetailsStyles.scss';

import { ReactComponent as UploadIcon } from '../../../../assets/icon-upload-image.svg';
import InputFields from './InputFields';

const ProfileDetails = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = event => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImgStyles = {
    backgroundImage: `url(${imagePreview})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#ffffff',
    filter: 'brightness(0.7)',
    padding: '9.5rem',
  };

  const inputStyles = {
    display: 'none',
  };

  const renderUploadSection = () => {
    return imagePreview ? (
      <div className='post-img-upload-container'>
        <label className='upload-img_uploader' htmlFor='inputFile' style={{ ...uploadImgStyles }}>
          <input id='inputFile' type='file' accept='image/png, image/jpeg' onChange={handleImageChange} style={inputStyles} />
        </label>
        <div className='post-img-upload'>
          <UploadIcon />
          <p>+ Upload Image</p>
        </div>
      </div>
    ) : (
      <label className='upload-img_uploader' htmlFor='inputFile'>
        <input id='inputFile' type='file' accept='image/png, image/jpeg' onChange={handleImageChange} style={inputStyles} />
        <UploadIcon />+ Upload Image
      </label>
    );
  };

  return (
    <form className='profile-form'>
      <h1 className='profile-title'>Profile Details</h1>
      <p className='body-m profile-description'>Add your details to create a personal touch to your profile.</p>

      <section className='upload-img-section'>
        <div className='upload-img'>
          <p className='body-m'>Profile picture</p>
          {renderUploadSection()}
          <p className='body-s'>Image must be below 1024x1024px. Use PNG or JPG format.</p>
        </div>
      </section>

      <InputFields />
    </form>
  );
};

export default ProfileDetails;
