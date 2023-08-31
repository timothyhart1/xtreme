import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";

export const RequireAuth = ({ children }) => {
	const auth = useAuth();
	const user = sessionStorage.getItem("user");

	if (!user) {
		return <Navigate to="/login" />;
	}

	return <>{children}</>;
};
