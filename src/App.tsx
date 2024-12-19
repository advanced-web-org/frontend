import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import UnauthorizePage from "./pages/common/unauthorize";
import UnImplementPage from "./pages/common/unImplement";
import Layout from "./pages/customer/components/layout";
import BeneficiaryPage from "./pages/customer/pages/Beneficienary/beneficiary";
import { DashboardPage } from "./pages/customer/pages/dashboard";
import HistoryPage from "./pages/customer/pages/history";
import TransferPage from "./pages/customer/pages/Transfer/transfer";
import { useAuthStore } from "./stores/authStore";
import { useUserStore } from "./stores/userStore";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { useEffect } from "react";
import { fetchUser } from "./api/auth/auth";

function App() {
  const userStore = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const { accessToken } = useAuthStore((state) => state);

  useEffect(() => {
    fetchUser()
      .then((user) => {
        if (user) {
          setUser(user);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch user:", error);
      });
  }, [accessToken, setUser]);

  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/unauthorized" element={<UnauthorizePage />} />

      <Route
        path="/"
        element={
          accessToken ? (
            <>
              {userStore?.role === "user" && <Navigate to="user/dashboard" />}
              {userStore?.role === "employee" && (
                <Navigate to="/employee/home" />
              )}
              {userStore?.role === "admin" && <Navigate to="/admin/home" />}
            </>
          ) : (
            <Navigate to="/auth/login" />
          )
        }
      />

      <Route element={<ProtectedRoutes allowedRoles={"user"} />}>
        <Route path="/user" element={<Layout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="transfer" element={<TransferPage />} />
          <Route path="debt" element={<h1>Debt</h1>} />
          <Route path="beneficiary" element={<BeneficiaryPage />} />
          <Route path="history" element={<HistoryPage />} />
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
