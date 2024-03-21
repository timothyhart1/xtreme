import { createContext, useContext, useState, useEffect } from "react";
import jwt from "jwt-decode";

const EmailContext = createContext();

export function useEmail() {
  return useContext(EmailContext);
}

export function EmailProvider({ children }) {
  const [email, setEmail] = useState("");
  const token = sessionStorage.getItem("Token");

  useEffect(() => {
    if (token) {
      const decoded = jwt(token);
      setEmail(decoded.email);
    }
  }, [token]);

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
}

export default EmailContext;
