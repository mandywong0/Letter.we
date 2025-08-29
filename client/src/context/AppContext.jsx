import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);      
  const [partner, setPartner] = useState(null); 

  return (
    <AppContext.Provider value={{ user, setUser, partner, setPartner }}>
      {children}
    </AppContext.Provider>
  );
};