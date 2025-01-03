import api from "@/api/api";
import { Debt } from "../types/debt.type";

export async function getDebtsAsDebtor(userId: number): Promise<Debt[]> {
  const response = await api.get<Debt[]>(`/debts/debtor/${userId}`);
  return response.data;
}

export async function getDebtsAsCreditor(userId: number): Promise<Debt[]> {
  const response = await api.get<Debt[]>(`/debts/creditor/${userId}`);
  return response.data;
}

export async function createDebt(debt: any): Promise<any> {
  const response = await api.post("/debts", debt);
  return response.data;
}
