import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('scholar_bites_token'));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('scholar_bites_user');
    return stored ? JSON.parse(stored) : null;
  });

  const isAuthenticated = !!token;
  const isAdmin = user?.roles?.includes('ADMIN');

  function loginUser(jwt, username) {
    localStorage.setItem('scholar_bites_token', jwt);
    const userData = { username };
    localStorage.setItem('scholar_bites_user', JSON.stringify(userData));
    setToken(jwt);
    setUser(userData);
  }

  function updateUserContext(updates) {
    const updated = { ...user, ...updates };
    localStorage.setItem('scholar_bites_user', JSON.stringify(updated));
    setUser(updated);
  }

  function logout() {
    localStorage.removeItem('scholar_bites_token');
    localStorage.removeItem('scholar_bites_user');
    setToken(null);
    setUser(null);
  }

  useEffect(() => {
    // Check if token exists but might be expired
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 < Date.now()) {
          logout();
        }
      } catch {
        // Invalid token format
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, isAdmin, loginUser, updateUserContext, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
