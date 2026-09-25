import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from '../api/config';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('dairydan_user');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const persistSession = (userData, token) => {
    const sessionUser = { ...userData, token };
    setUser(sessionUser);
    localStorage.setItem('dairydan_user', JSON.stringify(sessionUser));
    localStorage.setItem('token', token);
  };

  const login = async (email, password) => {
    try {
      const response = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      persistSession(response.user, response.token);
      return { success: true, user: response.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async ({ name, email, password, role }) => {
    try {
      await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, role })
      });
      // Registration doesn't log the user in automatically - accounts may
      // need admin approval/activation depending on how that feature lands.
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    apiRequest('/auth/logout', { method: 'POST' }).catch(() => {});
    setUser(null);
    localStorage.removeItem('dairydan_user');
    localStorage.removeItem('token');
  };

  const value = { user, login, register, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
