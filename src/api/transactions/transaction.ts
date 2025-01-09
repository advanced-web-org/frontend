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
  console.log(response, "response");

  // Change the amount of sent transactions to negative
  response.sendTransactions.forEach((transaction: any) => {
    transaction.transaction_amount =
      "- " + transaction.transaction_amount.toString() + " USD";
  });

  // Change the amount of received transactions to positive
  response.receivedTransactions.forEach((transaction: any) => {
    transaction.transaction_amount =
      "+ " + transaction.transaction_amount.toString() + " USD";
  });

  const transactions = [
    ...response.receivedTransactions,
    ...response.sendTransactions,
  ];

  // Change the time format
  transactions.forEach((transaction) => {
    transaction.transaction_date = new Date(
      transaction.transaction_date
    ).toLocaleString();
  });

  // Add bank name = Bank B if bank_id = 2
  transactions.forEach((transaction) => {
    if (transaction.from_bank_id === 2) {
      transaction.from_bank_name = "Bank B";
    }
    if (transaction.to_bank_id === 2) {
      transaction.to_bank_name = "Bank B";
    }
  });

  // Add bank name = Speechless Bank if bank_id = 1
  transactions.forEach((transaction) => {
    if (transaction.from_bank_id === 1) {
      transaction.from_bank_name = "Speechless Bank";
    }
    if (transaction.to_bank_id === 1) {
      transaction.to_bank_name = "Speechless Bank";
    }
  });

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
    to_bank_name: transaction.to_bank.bank_name,
  }));

  return transactions;
}

export async function getExternalBalance(
  externalBankId?: number
): Promise<object[]> {
  const response = await api
    .get(
      `${import.meta.env.VITE_DOMAIN}/transactions/external/balance/` +
        (externalBankId ? externalBankId.toString() : "")
    )
    .then((res) => res.data);
  return response;
}

export async function requestOtpForTransaction(): Promise<any> {
  const response = await api
    .post(`${import.meta.env.VITE_DOMAIN}/transactions/request_otp`)
    .then((res) => res.data);

  return {
    otpToken: response.otpToken,
  };
}

export async function verifyOtpForInternalTransaction(
  otpToken: string,
  otp: string,
  payload: any
): Promise<any> {
  const response = await api
    .post(`${import.meta.env.VITE_DOMAIN}/transactions/verify_otp`, {
      otpToken,
      otp,
      transaction: payload,
    })
    .then((res) => res.data);

  return response;
}
