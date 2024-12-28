import { create } from "zustand";

export interface User {
  userId?: number;
  fullname: string;
  email?: string;
  username?: string;
  phone?: string;
  role: string;
  bank_id: number;
  accessToken?: string;
  account_number?: string;
  account_balance?: number;
}

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => {
    console.log("setUser", user);
    set({ user });
  },
}));
