import React, { createContext, useContext, useState } from "react";
import { signin as ApiSignin } from "@/api/auth/auth"; // API call to authenticate the user

interface User {
  username: string;
  role: string; // Roles: "admin", "user", "manager"
  accessToken: string; // Token for authentication
}

interface AuthContextType {
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

  const signin = async (username: string, password: string) => {
    try {
      const response = await ApiSignin({ username, password });
      // Assuming the response contains accessToken, username, and role
      const { accessToken, role } = response;
      const user = { username, role, accessToken };

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

  const isAuthenticated = !!user;

  React.useEffect(() => {
    console.log(user, "AuthProvider - user state");
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, signin, signout, isAuthenticated }}>
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
