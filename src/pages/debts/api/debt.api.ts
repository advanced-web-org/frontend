import api from "@/api/api";
import axios from "axios";
import { Debt } from "../types/debt.type";

export async function getDebtsAsDebtor(userId: number): Promise<Debt[]> {
  try {
    const response = await api.get<Debt[]>(`/debts/debtor/${userId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching debtor debts:", error.response?.data || error.message);
    }
    throw error;
  }
}

export async function getDebtsAsCreditor(userId: number): Promise<Debt[]> {
  try {
    const response = await api.get<Debt[]>(`/debts/creditor/${userId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching creditor debts:", error.response?.data || error.message);
    }
    throw error;
  }
}
