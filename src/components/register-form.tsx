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
import { useAuth } from "@/contexts/authContexts";
import { useState } from "react";

export function RegisterForm() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const auth = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form default submission behavior

    try {
      const user = await auth.signup(fullName, email, phone, password); // Call the signup function from the auth context
      if (user) {
        navigate(`/user/home`); // Redirect to the user's home page based on their role
      }
    } catch (err) {
      setError("Invalid phone or password. Please try again."); // Display error message
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign up</CardTitle>
        <CardDescription>
          Enter your information below to create an account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                onChange={(e) => setFullName(e.target.value)} // Update full name state
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="chimto@gmail.com"
                onChange={(e) => setEmail(e.target.value)} // Update email state
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Phone number</Label>
              <Input
                id="phone"
                type="text"
                placeholder="0333465433"
                onChange={(e) => setPhone(e.target.value)} // Update phone state
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)} // Update password state
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="********"
                onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </div>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="underline">
              Log in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
