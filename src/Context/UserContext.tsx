// src/contexts/UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { loginUser } from "../Common/apiCalls";

interface UserContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => localStorage.getItem("isAuthenticated") === "true"
  );

  const login = async (email: string, password: string): Promise<boolean> => {
    const user = await loginUser(email, password);
    if (user) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      return true; // Return true to indicate success
    } else {
      return false; // Return false to indicate failure
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <UserContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
