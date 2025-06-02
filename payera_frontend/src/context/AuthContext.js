import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, apiHelpers } from '../services/api';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isApiMode, setIsApiMode] = useState(false);

  // Check if API is available and set mode
  useEffect(() => {
    const checkApiAvailability = async () => {
      const available = await apiHelpers.isApiAvailable();
      setIsApiMode(available);
    };
    checkApiAvailability();
  }, []);

  // Load user profile if logged in and API is available
  useEffect(() => {
    if (isLoggedIn && isApiMode) {
      loadUserProfile();
    }
  }, [isLoggedIn, isApiMode]);

  const loadUserProfile = async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data);
    } catch (error) {
      console.error('Failed to load user profile:', error);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      if (isApiMode) {
        // API mode: authenticate with server
        const response = await authAPI.login(credentials);
        const { token, user } = response.data;
        
        localStorage.setItem('authToken', token);
        localStorage.setItem('isLoggedIn', 'true');
        setUser(user);
        setIsLoggedIn(true);
        
        toast.success('Login successful!');
        return { success: true };
      } else {
        // Fallback mode: simple credential check
        if (credentials.username === 'admin' && credentials.password === '1234') {
          localStorage.setItem('isLoggedIn', 'true');
          setIsLoggedIn(true);
          setUser({ username: 'admin', name: 'Administrator' });
          
          toast.success('Login successful!');
          return { success: true };
        } else {
          toast.error('Invalid username or password');
          return { success: false, message: 'Invalid credentials' };
        }
      }
    } catch (error) {
      const errorMessage = apiHelpers.handleError(error);
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      if (isApiMode) {
        await authAPI.logout();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local state regardless of API response
      localStorage.removeItem('authToken');
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      setUser(null);
      setLoading(false);
      toast.info('Logged out successfully');
    }
  };

  const contextValue = {
    isLoggedIn,
    user,
    loading,
    isApiMode,
    login,
    logout,
    loadUserProfile
  };

  return (
    <AuthContext.Provider value={contextValue}>
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
