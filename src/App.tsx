import LoginPage from "./pages/auth/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/authContexts";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import UnauthorizePage from "./pages/auth/unauthorize";

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<UnauthorizePage />} />
            <Route element={<ProtectedRoutes allowedRoles={"user"} />}>
              <Route path="/user/home" element={<h1>User Home</h1>} />
            </Route>
            <Route element={<ProtectedRoutes allowedRoles={"employee"} />}>
              <Route path="/employee/home" element={<h1>Emp home</h1>} />
            </Route>
            <Route element={<ProtectedRoutes allowedRoles={"admin"} />}>
              <Route path="/admin/home" element={<h1>Admin home</h1>} />
            </Route>
          </Routes>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
