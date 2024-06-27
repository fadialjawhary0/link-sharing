import { createContext, useState } from 'react';

export const LinksContext = createContext();

export const LinksProvider = ({ children }) => {
  const [links, setLinks] = useState([]);
  console.log(links);

  const value = {
    setLinks,
    links,
  };

  return <LinksContext.Provider value={value}>{children}</LinksContext.Provider>;
};
