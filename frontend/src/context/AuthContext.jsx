import { createContext, useState, useEffect, useCallback } from "react";
import axios from "../utils/api";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get("/auth/me");
      setUser(res.data);
    } catch (error) {
      if (error.response?.status === 401) {
        setUser(null);
      } else {
        console.error("Auth fetch error:", error);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
