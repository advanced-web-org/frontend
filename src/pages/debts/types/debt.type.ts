export type Debt = {
  debt_id: number;
  creditor_id: number;
  debtor_id: number;
  debt_amount: string;
  debt_message: string;
  created_at: string;
  updated_at: string;
  status: DebtStatus;
  debtor: {
    customer_id: number;
    full_name: string;
  },
  creditor: {
    customer_id: number;
    full_name: string;
  }
};

export enum DebtStatus {
  paid = 'paid',
  unpaid = 'unpaid',
  deleted = 'deleted',
};
