import React, { useContext, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, database } from '../../../../firebase';
import { ref as databaseRef, set } from 'firebase/database';

import './ProfileDetailsStyles.scss';

import { AuthContext, ProfileDetailsContext, ToastContext } from '../../../../contexts';
import { ReactComponent as UploadIcon } from '../../../../assets/icon-upload-image.svg';
import { ToastMessages } from '../../../../constants';
import InputFields from './InputFields';
import ErrorIcon from '../../../../assets/alert-error.svg';

const ProfileDetails = () => {
  const { currentUser } = useContext(AuthContext);
  const { profileDetails, setValues } = useContext(ProfileDetailsContext);
  const { showToast } = useContext(ToastContext);

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(profileDetails?.profileImage || null);

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

  const handlePictureUpload = async () => {
    if (image && currentUser) {
      const storageRef = ref(storage, `profileImages/${currentUser.uid}/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        error => {
          showToast(true, ToastMessages?.ErrorOccurred, ErrorIcon);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await saveProfileDetails(downloadURL);
        },
      );
    } else {
      await saveProfileDetails(profileDetails?.profileImage);
    }
  };

  const saveProfileDetails = async imageURL => {
    const { firstName, lastName, email } = profileDetails;

    try {
      const userRef = databaseRef(database, `users/${currentUser.uid}/profile`);
      await set(userRef, {
        firstName,
        lastName,
        email,
        profileImage: imageURL,
      });
      setValues(firstName, lastName, email, imageURL);
    } catch {
      showToast(true, ToastMessages?.ErrorOccurred, ErrorIcon);
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
    return image ? (
      <div className='post-img-upload-container'>
        <label className='upload-img_uploader' htmlFor='inputFile' style={{ ...uploadImgStyles }}>
          <input id='inputFile' type='file' accept='image/png, image/jpeg' onChange={handleImageChange} style={inputStyles} />
        </label>
        <label className='post-img-upload' htmlFor='inputFile'>
          <UploadIcon />
          <p>+ Upload Image</p>
        </label>
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

      <InputFields handlePictureUpload={handlePictureUpload} />
    </form>
  );
};

export default ProfileDetails;
