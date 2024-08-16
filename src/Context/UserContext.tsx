// src/contexts/UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { loginUser } from "../Common/apiCalls";

// Define the shape of the user object
interface User {
  id: string;
  email: string;
  name: string;
  // Add other user properties as needed
}

// Define the shape of the context
interface UserContextType {
  isAuthenticated: boolean;
  user: User | null; // User can be null if not authenticated
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
  const [user, setUser] = useState<User | null>(() =>
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const login = async (email: string, password: string): Promise<boolean> => {
    const user = await loginUser(email, password);
    if (user) {
      setIsAuthenticated(true);
      setUser(user);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(user));
      return true; // Return true to indicate success
    } else {
      return false; // Return false to indicate failure
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ isAuthenticated, user, login, logout }}>
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
