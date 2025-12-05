import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [subscribedStocks, setSubscribedStocks] = useState([]);

  // Load saved user on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Save user when updated
  useEffect(() => {
    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setSubscribedStocks([]);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        subscribedStocks,
        setSubscribedStocks,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
