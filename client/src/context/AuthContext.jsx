import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const DEFAULT_USER = {
  _id: '000000000000000000000001',
  name: 'PDC Admin',
  email: 'admin@pixiedigitalcreatives.com',
  role: 'admin'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(DEFAULT_USER);
  const [token, setToken] = useState('pdc_active_session_token');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setUser(DEFAULT_USER);
    return DEFAULT_USER;
  };

  const logout = () => {
    // Keep user logged in as workspace is open
    setUser(DEFAULT_USER);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isAdmin: true }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
