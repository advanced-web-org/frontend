import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export function LoginForm() {
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const auth = useAuthStore((state) => state);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form default submission behavior

    if (!executeRecaptcha) {
      console.error("reCAPTCHA not loaded");
      return;
    }

    try {
      const token = await executeRecaptcha("login");
      console.log(token);
    } catch (err) {
      console.error("reCAPTCHA error", err);
    }

    try {
      const user = await auth.signin({ username, password }); // Call the signin function from the AuthContext
      if (user) {
        if (user.role == 'admin') {
          navigate('/admin/staffs');
        }
        else {
          navigate(`/${user.role}/dashboard`); // Redirect to the user's home page based on their role
        }
      }
    } catch (err) {
      setError("Invalid username number or password. Please try again."); // Display error message
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Username number</Label>
              <Input
                id="username"
                type="text"
                placeholder="Your username number"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/auth/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                onChange={(e) => setPassword(e.target.value)} // Update password state
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>

            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/auth/signup" className="underline">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
