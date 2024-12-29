import api from "../api";

export interface Deposit {
  employee_id: number;
  transaction: {
    from_bank_id: number;
    to_bank_id: number;
    to_account_number: string;
    transaction_type: string;
    transaction_amount: number;
    transaction_message: string;
    fee_amount: number;
  };
}

export async function APIdeposit(deposit: Deposit): Promise<void> {
  await api.post(`${import.meta.env.VITE_DOMAIN}/deposits`, deposit);
}
