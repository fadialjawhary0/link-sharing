import { createContext, useState } from 'react';

export const ProfileDetailsContext = createContext();

export const ProfileDetailsProvider = ({ children }) => {
  const [profileDetails, setProfileDetails] = useState({ firstName: '', lastName: '', email: '', profileImage: '' });

  const setValues = (firstName, lastName, email, profileImage) => {
    setProfileDetails(prevDetails => ({
      ...prevDetails,
      firstName,
      lastName,
      email,
      profileImage,
    }));
  };

  const updateValue = (key, value) => {
    setProfileDetails(prevDetails => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  const value = {
    profileDetails,
    setValues,
    updateValue,
  };

  return <ProfileDetailsContext.Provider value={value}>{children}</ProfileDetailsContext.Provider>;
};
