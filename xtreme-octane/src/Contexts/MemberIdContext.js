import { createContext, useContext, useState, useEffect } from "react";
import jwt from "jwt-decode";

const MemberIdContext = createContext();

export function useMemberId() {
  return useContext(MemberIdContext);
}

export function MemberIdProvider({ children }) {
  const [memberId, setMemberId] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("Token");

    if (token) {
      const decoded = jwt(token);
      setMemberId(decoded.memberId);
    }
  }, []);

  return (
    <MemberIdContext.Provider value={{ memberId, setMemberId }}>
      {children}
    </MemberIdContext.Provider>
  );
}

export default MemberIdContext;
