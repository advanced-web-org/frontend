import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContexts";

interface ProtectedRoutesProps {
  allowedRoles?: "user" | "employee" | "admin";
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ allowedRoles }) => {
  const { user } = useAuth(); // Get the user and role from your AuthContext

  if (!user) {
    // Redirect to login if no user is authenticated
    return <Navigate to="auth/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to unauthorized page if the user's role isn't allowed
    return <Navigate to="/unauthorized" replace />;
  }

  // Allow access if user is authenticated and role is allowed
  return <Outlet />;
};

export default ProtectedRoutes;
