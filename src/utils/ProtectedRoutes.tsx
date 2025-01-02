import { useUserStore } from "@/stores/userStore";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

interface ProtectedRoutesProps {
  allowedRoles: "customer" | "employee" | "admin";
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ allowedRoles }) => {
  const user = useUserStore.getState().user;
  const [loading, setLoading] = useState(true);

  console.log("user", user);

  useEffect(() => {
    if (user !== null) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <ScaleLoader />;
  }

  if (!user) {
    // Redirect to login if no user is authenticated
    return <Navigate to="auth/login" replace />;
  }

  if (allowedRoles && user.role && !allowedRoles.includes(user.role)) {
    // Redirect to unauthorized page if the user's role isn't allowed
    return <Navigate to="/unauthorized" replace />;
  }

  // Allow access if user is authenticated and role is allowed
  return <Outlet />;
};

export default ProtectedRoutes;
