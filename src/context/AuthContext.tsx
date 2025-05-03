import React, { createContext, useState, useContext, ReactNode } from 'react';
import { AuthUser } from '../types';

interface AuthContextType {
  user: AuthUser;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const defaultAuthContext: AuthContextType = {
  user: { username: '', isAuthenticated: false },
  login: () => false,
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser>({ username: '', isAuthenticated: false });

  const login = (username: string, password: string) => {
    // Simple authentication for demo purposes
    if (username === 'admin' && password === '12345') {
      setUser({ username, isAuthenticated: true });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser({ username: '', isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};