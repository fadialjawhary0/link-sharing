import { createContext, useEffect, useState } from 'react';

import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signout = () => {
    setCurrentUser(null);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    signout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
