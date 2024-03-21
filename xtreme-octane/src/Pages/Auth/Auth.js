import { createContext, useContext, useState } from "react";

import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
    sessionStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const loginUser = async (email, password, API, auth, navigate) => {
  try {
    const response = await axios.post(`${API}/User/login`, {
      EmailAddress: email,
      password: password,
    });

    sessionStorage.setItem("Token", response.data.token);
    auth.login(response.data);
    sessionStorage.setItem("navbar", "true");
    navigate("/", { replace: true });
  } catch (error) {
    console.error("Login error", error);
  }
};
