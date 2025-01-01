import {
  signin as ApiSignin,
  signup as ApiSignup,
  CreateUserDto,
} from "@/api/auth/auth"; // API call to authenticate the user
import { create } from "zustand";
import { User, useUserStore } from "./userStore";

export interface IAuth {
  username: string;
  password: string;
}

type AuthStore = {
  accessToken: string | null;
  set: (state: { accessToken: string }) => void;
  signup: (user: CreateUserDto) => Promise<User | null>;
  signin: (auth: IAuth) => Promise<User | null>;
  signout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: "",

  set: (state) => {
    set(state);
  },

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

      useAuthStore.getState().set({ accessToken: response.accessToken });

      return response;
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
