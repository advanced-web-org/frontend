import api from "../api";
import { User } from "../../stores/userStore";
import { IAuth } from "@/stores/authStore";

export interface CreateUserDto {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export async function signup(userData: CreateUserDto): Promise<User> {
  // Simulate a signup request

  const response = await api
    .post(`${import.meta.env.VITE_DOMAIN}/auth/register_customer`, {
      ...userData,
    })
    .catch((error) => {
      console.error("Failed to create user:", error);
      throw error;
    });

  const responseData = response.data.data;

  const user: User = {
    id: responseData.id,
    fullname: responseData.fullName,
    email: responseData.email,
    phone: responseData.phone,
    bank_id: 1,
    account_number: responseData.account_number,
    account_balance: responseData.account_balance,
    role: responseData.role,
    accessToken: responseData.accessToken,
  };

  return user;
}

export async function signin({ username, password }: IAuth): Promise<any> {
  const responseData = await api
    .post(`${import.meta.env.VITE_DOMAIN}/auth/login`, {
      username,
      password,
    })
    .then((response) => {
      return response.data.data;
    });

  localStorage.setItem("refresh_token", responseData.refreshToken);
  localStorage.setItem("username", responseData.username);

  return {
    id: responseData.id,
    fullname: responseData.fullname,
    email: responseData.email,
    username: responseData.username,
    role: responseData.role,
    account_number: responseData.account_number,
    account_balance: responseData.account_balance,
    accessToken: responseData.accessToken,
  };
}

export async function fetchUser(): Promise<User> {
  try {
    const response = await api.get(`${import.meta.env.VITE_DOMAIN}/auth/me`);
    const user = response.data.data;

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
