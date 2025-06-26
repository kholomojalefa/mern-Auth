import { createContext, useState, useEffect } from "react";
import axios from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Useful to prevent flicker

  const fetchUser = async () => {
    try {
      const res = await axios.get("/auth/me", { withCredentials: true });
      setUser(res.data); //when user is logged in
    } catch (error) {
      if (error.response?.status === 401) {
        setUser(null); //user not logged in
      } else {
        console.error("Auth check error:", error); //when theres an actual error
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
