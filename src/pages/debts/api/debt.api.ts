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

export async function deleteDebt(debtId: number, deleteMessage: string): Promise<any> {
  const response = await api.delete(`/debts/${debtId}`, { data: { delete_message: deleteMessage } });
  return response.data;
}

export interface InitiateDebtPaymentDto {
  otpToken: string;
  message: string;
}

export async function initiateDebtPayment(debtId: number): Promise<InitiateDebtPaymentDto> {
  const response = await api.get(`/debts/${debtId}/initiate-debt-payment`);
  return response.data;
}

export async function payDebt(debtId: number, otpCode: string, otpToken: string): Promise<any> {
  const response = await api.post(`/debts/${debtId}/confirm-debt-payment`, { otp: otpCode, otp_token: otpToken });
  return response.data;
}