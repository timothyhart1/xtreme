import { createContext, useContext, useState, useEffect } from "react";
import jwt from "jwt-decode";

const RoleContext = createContext();

export function useUserRole() {
	return useContext(RoleContext);
}

export function UserRoleProvider({ children }) {
	const [userRole, setUserRole] = useState("");
	const token = sessionStorage.getItem("Token");

	useEffect(() => {
		if (token) {
			const decoded = jwt(token);
			setUserRole(decoded.role);
		}
	}, [token]);

	return (
		<RoleContext.Provider value={{ userRole, setUserRole }}>
			{children}
		</RoleContext.Provider>
	);
}

export default RoleContext;
