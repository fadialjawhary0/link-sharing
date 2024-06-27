import React, { useContext, useEffect, useState } from 'react';
import { child, get, ref, set } from 'firebase/database';
import { database } from '../../../../firebase';

import './InputFieldsStyles.scss';

import { Errors, ToastMessages } from '../../../../constants';
import { ValidationHelper } from '../../../../helpers/validators';
import { AuthContext, ProfileDetailsContext, ToastContext } from '../../../../contexts';
import ChangesSavedIcon from '../../../../assets/icon-changes-saved.svg';
import ErrorIcon from '../../../../assets/alert-error.svg';

const InputFields = ({ handlePictureUpload }) => {
  const { currentUser } = useContext(AuthContext);
  const { profileDetails, setValues, updateValue } = useContext(ProfileDetailsContext);
  const { showToast } = useContext(ToastContext);

  const [submitLoader, setSubmitLoader] = useState(false);
  const [errors, setErrors] = useState({ firstName: '', lastName: '' });
  const [emailError, setEmailError] = useState('');

  const fetchInfo = async userId => {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `users/${userId}/profile`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        setValues(data?.firstName, data?.lastName, data?.email);
      }
    } catch {
      showToast(true, ToastMessages?.ErrorOccurred, ErrorIcon);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchInfo(currentUser.uid);
    }
    // eslint-disable-next-line
  }, [currentUser]);

  const validateInputs = (firstName, lastName) => {
    return {
      firstName: firstName?.trim() ? '' : Errors?.Empty,
      lastName: lastName?.trim() ? '' : Errors?.Empty,
    };
  };

  const handleSave = async e => {
    e.preventDefault();
    const { firstName, lastName, email } = profileDetails;

    const validationErrors = validateInputs(firstName, lastName);
    setErrors(validationErrors);

    const validEmail = email && !ValidationHelper.isEmail(email) ? Errors?.InvalidEmail : '';
    setEmailError(validEmail);

    const isValidInputs = !Object.values(validationErrors).some(Boolean);

    if (isValidInputs && !validEmail) {
      setSubmitLoader(true);
      try {
        const userRef = ref(database, `users/${currentUser.uid}/profile`);
        await set(userRef, {
          firstName,
          lastName,
          email,
        });
        await handlePictureUpload();
        showToast(true, ToastMessages?.SavedSuccessfully, ChangesSavedIcon);
      } catch {
        showToast(true, ToastMessages?.ErrorOccurred, ErrorIcon);
      } finally {
        setSubmitLoader(false);
      }
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    updateValue(name, value);
  };

  const borderErrorStyle = { border: '1px solid red' };

  return (
    <React.Fragment>
      <fieldset className='profile-fieldset'>
        <div className='profile-inputs-container'>
          <label>
            <p>First name*</p>
            <input
              name='firstName'
              className='input-field'
              type='text'
              placeholder='e.g. Joe'
              value={profileDetails?.firstName || ''}
              onChange={handleInputChange}
              style={errors?.firstName ? borderErrorStyle : {}}
            />
            {errors?.firstName && <p className='body-s error'>{errors?.firstName}</p>}
          </label>
          <label>
            <p>Last name*</p>
            <input
              name='lastName'
              className='input-field'
              type='text'
              placeholder='e.g. Doe'
              value={profileDetails?.lastName || ''}
              onChange={handleInputChange}
              style={errors?.lastName ? borderErrorStyle : {}}
            />
            {errors?.lastName && <p className='body-s error'>{errors?.lastName}</p>}
          </label>
          <label>
            <p>Email</p>
            <input
              name='email'
              className='input-field'
              type='text'
              placeholder='e.g. email@example.com'
              value={profileDetails?.email || ''}
              onChange={handleInputChange}
              style={emailError ? borderErrorStyle : {}}
            />
            {emailError && <p className='body-s error'>{emailError}</p>}
          </label>
        </div>
      </fieldset>
      <section className='profile-submit-container'>
        <button type='button' className={`submit-btn ${submitLoader ? 'loading' : ''}`} disabled={submitLoader} onClick={handleSave}>
          Save
        </button>
      </section>
    </React.Fragment>
  );
};

export default InputFields;
