import React, {
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import { authApi } from "./api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

  authApi.getProfile()
  .then((data) => setUser(data))
  .catch(() => {
    localStorage.removeItem("token");
    setUser(null);
  }) .finally(() => setLoading(false));
  }, []);

  const signUp = async (name, email, password) => {
  setLoading(true);
  try {
    const { token, user } = await authApi.signUp(name, email, password);
    localStorage.setItem("token", token);
    setUser(user);
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err.response?.data?.error || err.message,
    };
  } finally {
    setLoading(false);
  }
};


  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const { token, user } = await authApi.signIn(
        email,
        password
      );
      localStorage.setItem("token", token);
      setUser(user);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || err.message,
      };
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
     value={{ user, setUser, loading, signIn, signUp, signOut }}
    >

      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
