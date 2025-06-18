import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { AuthUser } from '../types';
import client  from '../services';

interface AuthContextType {
  user: AuthUser;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const defaultAuthContext: AuthContextType = {
  user: { username: '', isAuthenticated: false },
  login: async () => false,
  logout: async () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser>({ username: '', isAuthenticated: false });

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setUser({ username, isAuthenticated: true });
    }
  }, []);

const login = async (username: string, password: string): Promise<boolean> => {
  try {
    const response = await client.post('/api/v1/auth/login/', {
      username,
      password,
    });

    const { access_token } = response.data;

    // Token + username ni saqlash
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('username', username); // agar username ni qaytarmasa, inputdan olinganini yozamiz

    setUser({ username, isAuthenticated: true });

    return true;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};


  const logout = async (): Promise<void> => {
    try {
      await client.post('/api/v1/auth/logout/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('username');
      setUser({ username: '', isAuthenticated: false });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
