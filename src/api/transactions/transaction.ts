import api from "../api";

export interface Transaction {
  transaction_id: number;
  from_bank_id: number;
  from_account_number: string;
  to_bank_id: number;
  to_account_number: string;
  transaction_type: "transaction" | "deposit";
  transaction_amount: number;
  transaction_message: string;
  fee_payer: string;
  fee_amount: number;
  e_signal: string;
  transaction_date: string;
}

export async function getTransactions(): Promise<Transaction[]> {
  const response = await api
    .get(`${import.meta.env.VITE_DOMAIN}/transactions`)
    .then((res) => res.data);
  const transactions = [
    ...response.receivedTransactions,
    ...response.sendTransactions,
  ];
  return transactions;
}

export async function getExternalBalance(externalBankId?: number): Promise<object[]> {
  const response = await api
    .get(`${import.meta.env.VITE_DOMAIN}/transactions/external/balance/` + (externalBankId ? externalBankId.toString() : ""))
    .then((res) => res.data);
  console.log(response);
  return response;
}
