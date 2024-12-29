import { Bank, getBanks } from "@/api/banks/bank";
import { create } from "zustand";

type BankStore = {
  banks: Bank[];
  setBanks: () => Promise<void>; // Returns a promise since it involves an async operation
};

export const useBankStore = create<BankStore>((set) => ({
  banks: [],

  setBanks: async () => {
    try {
      const banks = await getBanks(); // Fetch banks from the API
      console.log(banks);
      set({ banks }); // Update the state with fetched banks
    } catch (error) {
      console.error("Failed to fetch banks:", error);
    }
  },
}));
