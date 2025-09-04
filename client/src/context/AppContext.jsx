import { createContext, useState, useEffect, useContext } from "react";
import { API_URL } from "../config";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);      
  const [partner, setPartner] = useState(null); 

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
        setPartner(userData.partner || null); 
      } else {
        console.error("Unable to fetch current user.");
        setUser(null);
        setPartner(null);
      }

    } catch (err) {
      console.error("Error fetching current user:", err);
      setUser(null);
      setPartner(null);
      // optional: log out or redirect to login
    }
  };

  useEffect(() => {
    console.log("UserContext mounted")
    fetchCurrentUser();
  }, []);

  return (
    <AppContext.Provider value={{ user, partner, fetchCurrentUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useUser = () => useContext(AppContext);