import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('portfolio.token') || '');
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('portfolio.user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const hydrateProfile = async () => {
      if (!token) {
        setIsReady(true);
        return;
      }

      try {
        const response = await api.get('/auth/me');
        setUser(response.data);
        localStorage.setItem('portfolio.user', JSON.stringify(response.data));
      } catch (_error) {
        localStorage.removeItem('portfolio.token');
        localStorage.removeItem('portfolio.user');
        setToken('');
        setUser(null);
      } finally {
        setIsReady(true);
      }
    };

    hydrateProfile();
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      user,
      isReady,
      isAuthenticated: Boolean(token && user),
      login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        setToken(response.data.token);
        setUser(response.data.user);
        localStorage.setItem('portfolio.token', response.data.token);
        localStorage.setItem('portfolio.user', JSON.stringify(response.data.user));
        return response.data;
      },
      logout: () => {
        localStorage.removeItem('portfolio.token');
        localStorage.removeItem('portfolio.user');
        setToken('');
        setUser(null);
      },
      refreshUser: async () => {
        const response = await api.get('/auth/refresh');
        setUser(response.data.user);
        localStorage.setItem('portfolio.user', JSON.stringify(response.data.user));
      }
    }),
    [token, user, isReady]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
