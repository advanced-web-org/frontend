import { Customer } from "@/api/customers/customer";
import { create } from "zustand";

type CustomerStore = {
  customers: Customer[];
  setCustomersWithAccounts: (customers: Customer[]) => void;
};

export const useCustomerStore = create<CustomerStore>((set) => ({
  customers: [],
  setCustomersWithAccounts: (customers) => set({ customers }),
}));
