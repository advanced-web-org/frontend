import { create } from "zustand";


type OtpStore = {
  otpToken: string | null;
  setOtpToken: (otpToken: string | null) => void;
};

export const userOtpStore = create<OtpStore>((set) => ({
  otpToken: null,
  setOtpToken: (otpToken) => {
    console.log("setOtpToken kiet", otpToken);
    set({ otpToken });
  },
}));
