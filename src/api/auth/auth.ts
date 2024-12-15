import api from "../api";

interface Auth {
  phone: string;
  password: string;
}

interface User {
  fullname: string;
  email: string;
  phone: string;
  password?: string;
  role?: string;
  accessToken?: string;
}

export function signup({ fullname, email, phone, password }: User) {
  // Simulate a signup request

  const user = api
    .post(`${import.meta.env.VITE_DOMAIN}/auth/signup`, {
      fullname,
      email,
      phone,
      password,
    })
    .then((response) => response.data);

  return user;
}

export function signin({ phone, password }: Auth) {
  // Simulate a signin request

  const accessToken = api
    .post(`${import.meta.env.VITE_DOMAIN}/auth/signin`, {
      phone,
      password,
    })
    .then((response) => response.data);

  return accessToken;
}

export async function fetchUser(): Promise<User> {
  try {
    const response = await api.get(`${import.meta.env.VITE_DOMAIN}/auth/me`);
    const { fullname, email, phone, role, access_token } = response.data;

    const user: User = {
      fullname,
      email,
      phone,
      role,
      accessToken: access_token,
    };
    console.log("fetchUser", user);
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
}
export function signout() {
  // Simulate a signout request
}

export function getAccessToken() {
  const accessToken = api.post;
}
