import { createContext, useState } from 'react';
import { child, get, ref } from 'firebase/database';
import { database } from '../firebase';

export const LinksContext = createContext();

export const LinksProvider = ({ children }) => {
  const [links, setLinks] = useState([]);

  const retrieveLinks = async userId => {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `users/${userId}/links`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        setLinks(data);
      }
    } catch {
      console.error('Error retrieving links from Firebase');
    }
  };

  const value = {
    setLinks,
    links,
    retrieveLinks,
  };

  return <LinksContext.Provider value={value}>{children}</LinksContext.Provider>;
};
