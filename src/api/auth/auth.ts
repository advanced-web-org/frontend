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

export async function signup({ fullname, email, phone, password }: User) {
  // Simulate a signup request

  const response = await api.post(
    `${import.meta.env.VITE_DOMAIN}/auth/signup`,
    {
      fullname,
      email,
      phone,
      password,
    }
  );
  const { resFullname, resEmail, resPhone, role, access_token } = response.data;

  const user: User = {
    fullname,
    email,
    phone,
    role,
    accessToken: access_token,
  };

  return user;
}

export async function signin({ phone, password }: Auth): Promise<User> {
  // Simulate a signin request

  const response = await api.post(
    `${import.meta.env.VITE_DOMAIN}/auth/signin`,
    {
      phone,
      password,
    }
  );

  const { fullname, email, resPhone, role, access_token } = response.data;
  const user: User = {
    fullname,
    email,
    phone: resPhone,
    role,
    accessToken: access_token,
  };

  return user;
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
