import api from "../api";

export interface Transaction {
  transaction_id: number;
  from_bank_id: number;
  from_bank_name?: string;
  from_account_number: string;
  to_bank_id: number;
  to_bank_name?: string;
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

export async function getExternalTransactions(): Promise<Transaction[]> {
  const response = await api
    .get(`${import.meta.env.VITE_DOMAIN}/transactions/external`)
    .then((res) => res.data);

  const transactions = response.map((transaction: any) => ({
    transaction_id: transaction.transaction_id,
    from_bank_id: transaction.from_bank_id,
    from_account_number: transaction.from_account_number,
    to_bank_id: transaction.to_bank_id,
    to_account_number: transaction.to_account_number,
    transaction_type: transaction.transaction_type,
    transaction_amount: transaction.transaction_amount,
    transaction_message: transaction.transaction_message,
    fee_payer: transaction.fee_payer,
    fee_amount: transaction.fee_amount,
    e_signal: transaction.e_signal,
    transaction_date: transaction.transaction_date,
    from_bank_name: transaction.from_bank.bank_name,
    to_bank_name: transaction.to_bank.bank_name
  }));

  return transactions;
}

export async function getExternalBalance(externalBankId?: number): Promise<object[]> {
  const response = await api
    .get(`${import.meta.env.VITE_DOMAIN}/transactions/external/balance/` + (externalBankId ? externalBankId.toString() : ""))
    .then((res) => res.data);
  return response;
}

export async function requestOtpForTransaction(): Promise<void> {
  const response = await api
    .post(`${import.meta.env.VITE_DOMAIN}/transactions/request_otp`)
    .then((res) => res.data);
  
  console.log(response);
  return response
}