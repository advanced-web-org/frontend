export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  avatar: string;
  role: "admin" | "user";
}
