import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/profile", {
        withCredentials: true,
      });
      setUser(data.user);
      setIsAuth(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error loading profile ❌");
      setUser(null);
      setIsAuth(false);
    }
  };

  const registerUser = async (username, email, password) => {
    try {
      const { data } = await axios.post("/api/user/register", {
        username,
        email,
        password,
      });

      setUser(data.user);
      setIsAuth(true);
      toast.success(data.message || "Registration successful! 🎉");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registrazione fallita ❌");
      setUser(null);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const { data } = await axios.post("/api/user/login", { email, password });

      setUser(data.user);
      setIsAuth(true);
      toast.success(`Bentornato, ${data.user?.username}! 👋`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed ❌");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      await axios.get("/api/user/logout");
      setUser(null);
      setIsAuth(false);
      toast.success(data.message || "Logout successfully! 👋");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error logging out ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  const resetPasswordRequest = async (email) => {
    try {
      const { data } = await axios.post("/api/user/reset-password", { email });
      toast.success(data.message || "Recovery email sent!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error sending the reset email."
      );
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (newPassword, token) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/api/user/reset-password/${token}`, {
        newPassword,
      });
      toast.success(data.message || "Password updated successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Errore nell'aggiornamento della password."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loading,
        user,
        isAuth,
        setLoading,
        registerUser,
        loginUser,
        logoutUser,
        resetPasswordRequest,
        updatePassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
