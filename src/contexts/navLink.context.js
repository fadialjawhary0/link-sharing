import { createContext, useState } from 'react';

export const NavLinksContext = createContext();

export const NavLinksProvider = ({ children }) => {
  const [activeLink, setActiveLink] = useState('links');

  const value = {
    setActiveLink,
    activeLink,
  };

  return <NavLinksContext.Provider value={value}>{children}</NavLinksContext.Provider>;
};
