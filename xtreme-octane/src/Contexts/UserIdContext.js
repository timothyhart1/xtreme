import { createContext, useContext, useState, useEffect } from "react";
import jwt from "jwt-decode";

const UserIdContext = createContext();

export function useUserId() {
  return useContext(UserIdContext);
}

export function UserIdProvider({ children }) {
  const [userId, setUserId] = useState("");
  const token = sessionStorage.getItem("Token");

  useEffect(() => {
    if (token) {
      const decoded = jwt(token);
      setUserId(decoded.id);
    }
  }, [token]);

  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserIdContext.Provider>
  );
}

export default UserIdContext;
