import api from "../api";
import { User } from "../../stores/userStore";

interface Auth {
  phone: string;
  password: string;
}

export interface CreateUserDto {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export async function signup(userData: CreateUserDto): Promise<User> {
  // Simulate a signup request

  const response = await api.post(
    `${import.meta.env.VITE_DOMAIN}/auth/signup`,
    {
      ...userData,
    }
  );
  const {
    resFullname,
    resEmail,
    resPhone,
    role,
    account_number,
    account_balance,
    access_token,
  } = response.data;

  const user: User = {
    fullname: resFullname,
    email: resEmail,
    phone: resPhone,
    account_number,
    account_balance,
    role,
    accessToken: access_token,
  };

  return user;
}

export async function signin({ phone, password }: Auth): Promise<User> {
  const { data } = await api.post(
    `${import.meta.env.VITE_DOMAIN}/auth/signin`,
    {
      phone,
      password,
    }
  );

  // Map the response data directly into the `User` object
  return {
    fullname: data.fullname,
    email: data.email,
    phone: data.phone,
    role: data.role,
    account_number: data.account_number,
    account_balance: data.account_balance,
    accessToken: data.access_token,
  };
}

export async function fetchUser(): Promise<User> {
  try {
    const response = await api.get(`${import.meta.env.VITE_DOMAIN}/auth/me`);
    const user = response.data;

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
