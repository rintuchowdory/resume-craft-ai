import React, { createContext, useState, useContext, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

// Account-free auth. There is no remote session to check: the app resolves a
// local user immediately, so no page ever waits on a redirect or a token.
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const loadLocalUser = async () => {
    try {
      const localUser = await base44.auth.me();
      setUser(localUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Local profile load failed:', error);
      setUser(null);
      setIsAuthenticated(true);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  useEffect(() => {
    loadLocalUser();
  }, []);

  const logout = () => {
    // Nothing to sign out of; just reload the local profile.
    loadLocalUser();
  };

  const updateUser = async (data) => {
    const updated = await base44.auth.updateMe(data);
    setUser(updated);
    return updated;
  };

  const navigateToLogin = () => {
    // No login screen in this build.
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth,
        isLoadingPublicSettings: false,
        authError: null,
        appPublicSettings: null,
        logout,
        updateUser,
        navigateToLogin,
        checkAppState: loadLocalUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
