import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useAuth } from "./contexts/authContexts";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import UnauthorizePage from "./pages/auth/unauthorize";
import UnImplementPage from "./pages/common/unImplement";
import Layout from "./pages/customer/components/layout";
import HistoryPage from "./pages/customer/pages/history";
import { DashboardPage } from "./pages/customer/pages/homepage";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  const authContext = useAuth();
  const { user } = authContext;
  const { isAuthenticated } = authContext;

  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/unauthorized" element={<UnauthorizePage />} />

      <Route
        path="/"
        element={
          isAuthenticated ? (
            <>
              {user?.role === "user" && <Navigate to="/user/home" />}
              {user?.role === "employee" && <Navigate to="/employee/home" />}
              {user?.role === "admin" && <Navigate to="/admin/home" />}
            </>
          ) : (
            <Navigate to="/auth/login" />
          )
        }
      />

      <Route element={<ProtectedRoutes allowedRoles={"user"} />}>
        <Route path="/user" element={<Layout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="transfer" element={<h1>Transfer</h1>} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="debt" element={<h1>Debt</h1>} />
          <Route path="settings" element={<h1>Settings</h1>} />
        </Route>
      </Route>
      <Route element={<ProtectedRoutes allowedRoles={"employee"} />}>
        <Route path="/employee/home" element={<h1>Emp home</h1>} />
      </Route>
      <Route element={<ProtectedRoutes allowedRoles={"admin"} />}>
        <Route path="/admin/home" element={<h1>Admin home</h1>} />
      </Route>

      <Route path="*" element={<UnImplementPage />} />
    </Routes>
  );
}

export default App;
