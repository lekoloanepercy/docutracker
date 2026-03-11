import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "docutracker_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // load user from sessionStorage on refresh
  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed.user);
      setToken(parsed.token);
    }
  }, []);

  // login method
  const login = ({ user, token }) => {
    setUser(user);
    setToken(token);

    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        user,
        token,
      })
    );
  };

  // logout method
  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}