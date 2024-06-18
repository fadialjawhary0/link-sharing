import { createContext, useEffect, useState } from 'react';

import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const SignupContext = createContext();

export const SignupProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
  };

  return <SignupContext.Provider value={value}>{children}</SignupContext.Provider>;
};
