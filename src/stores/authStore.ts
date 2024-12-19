import { create } from "zustand";
import { User, useUserStore } from "./userStore";
import {
  signin as ApiSignin,
  signup as ApiSignup,
  CreateUserDto,
} from "@/api/auth/auth"; // API call to authenticate the user

export interface Auth {
  phone: string;
  password: string;
}

type AuthStore = {
  accessToken: string | null;
  signup: (user: CreateUserDto) => Promise<User | null>;
  signin: (auth: Auth) => Promise<User | null>;
  signout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: "",

  signup: async (userDTO) => {
    try {
      const response = await ApiSignup(userDTO);
      const user: User = response;
      useUserStore.getState().setUser(user);
      set({ accessToken: user.accessToken });

      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  signin: async (auth) => {
    try {
      const response = await ApiSignin(auth);
      console.log("signin response", response);

      const user: User = response;
      useUserStore.getState().setUser(user);
      set({ accessToken: user.accessToken });

      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  signout: () => {
    useUserStore.getState().setUser(null);
    set({ accessToken: "" });
  },
}));
