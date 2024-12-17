import api from "@/api/api";
import {
  fetchUser as ApiFetchUser,
  signin as ApiSignin,
  signup as ApiSignup,
} from "@/api/auth/auth"; // API call to authenticate the user
import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { ScaleLoader } from "react-spinners";

interface User {
  fullName?: string;
  email?: string;
  phone?: string;
  role?: string; // Roles: "admin", "user", "manager"
  accessToken?: string; // Token for authentication
}

interface AuthContextType {
  signup(
    fullName: string,
    email: string,
    phone: string,
    password: string
  ): Promise<User | null>; // Register function
  user: User | null; // Current user
  signin: (username: string, password: string) => Promise<User | null>; // Login function
  signout: () => void; // Logout function
  isAuthenticated: boolean; // Convenience property for authentication status
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user;

  const signup = async (
    fullName: string,
    email: string,
    phone: string,
    password: string
  ) => {
    try {
      // Make a backend API call to register the user
      const response = await ApiSignup({
        fullname: fullName,
        email,
        phone,
        password,
      });
      // Assuming the response contains accessToken, phone, and role
      const { accessToken, role } = response;
      const user = { phone: email, role, accessToken };

      // Update user state with retrieved details
      setUser(user);
      return user;
    } catch (error) {
      console.error("Signup failed", error);
      throw new Error("Invalid credentials"); // Handle errors appropriately
    }
  };

  const signin = async (phone: string, password: string) => {
    try {
      const response = await ApiSignin({ phone, password });
      // Assuming the response contains accessToken, phone, and role
      const { accessToken, role } = response;
      const user = { phone, role, accessToken };

      // Update user state with retrieved details
      setUser(user);
      return user;
    } catch (error) {
      console.error("Login failed", error);
      throw new Error("Invalid credentials"); // Handle errors appropriately
    }
  };

  const signout = (): void => {
    setUser(null); // Clear the user state on logout
  };

  const authContextValue = useMemo(() => {
    return {
      user,
      signup,
      signin,
      signout,
      isAuthenticated,
    };
  }, [user, isAuthenticated]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Make a backend API call to validate the session and fetch user details
        const userDetails = await ApiFetchUser();
        setUser(userDetails);
      } catch (error) {
        console.error("Silent authentication failed", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser(); // Try to authenticate on app load
  }, []);

  if (loading) {
    return <ScaleLoader />; // Show a loading indicator while authenticating
  }

  // useLayoutEffect(() => {
  //   const authInterceptor = api.interceptors.request.use((config: any) => {
  //     config.headers.Authorization =
  //       !config._retry && user?.accessToken
  //         ? `Bearer ${user.accessToken}`
  //         : config.headers.Authorization;

  //     return config;
  //   });

  //   return () => {
  //     api.interceptors.request.eject(authInterceptor);
  //   };
  // }, [user?.accessToken]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
