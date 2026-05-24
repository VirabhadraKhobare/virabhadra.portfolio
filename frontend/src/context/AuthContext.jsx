import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api.js';
import { clearCsrfToken, setCsrfToken, getCsrfToken } from '../utils/security/csrf.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const csrfResponse = await api.get('/auth/csrf');
        setCsrfToken(csrfResponse.data.csrfToken);
      } catch (_error) {
        clearCsrfToken();
      }

      try {
        const response = await api.get('/auth/me');
        setUser(response.data);
      } catch (_error) {
        setUser(null);
      } finally {
        setIsReady(true);
      }
    };

    bootstrap();
  }, []);

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          setUser(null);
          clearCsrfToken();
        }

        return Promise.reject(error);
      },
    );

    return () => api.interceptors.response.eject(interceptorId);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isReady,
      isAuthenticated: Boolean(user),
      login: async (credentials) => {
        if (!getCsrfToken()) {
          const csrfResponse = await api.get('/auth/csrf');
          setCsrfToken(csrfResponse.data.csrfToken);
        }

        const response = await api.post('/auth/login', credentials);
        setUser(response.data.user);

        if (response.data.csrfToken) {
          setCsrfToken(response.data.csrfToken);
        }

        return response.data;
      },
      logout: async () => {
        try {
          await api.post('/auth/logout');
        } finally {
          clearCsrfToken();
          setUser(null);
        }
      },
      refreshUser: async () => {
        const response = await api.get('/auth/refresh');
        setUser(response.data.user);
        return response.data.user;
      },
    }),
    [user, isReady]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
