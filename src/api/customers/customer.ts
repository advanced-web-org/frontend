import api from "../api";

export interface Customer {
  customer_id: number;
  full_name: string;
  email: string;
  phone: string;
  account_id: number;
  account_number: string;
  balance: number;
}

export async function getCustomerWithAccounts(): Promise<Customer[]> {
  const response = await api
    .get(`${import.meta.env.VITE_DOMAIN}/customers/with-accounts`)
    .then((res) => res.data);

  // Transform response into Customer array
  const customers: Customer[] = response.flatMap(
    (item: {
      customer_id: number;
      full_name: string;
      email: string;
      phone: string;
      accounts: {
        account_id: number;
        account_number: string;
        account_balance: string;
      }[];
    }) =>
      item.accounts.map((account) => ({
        customer_id: item.customer_id,
        full_name: item.full_name,
        email: item.email,
        phone: item.phone,
        account_id: account.account_id,
        account_number: account.account_number,
        balance: parseFloat(account.account_balance),
      }))
  );

  return customers;
}

export interface CustomerV2 {
  customer_id: number;
  full_name: string;
}

export async function getCustomerByAccountNumber(accountNumber: string): Promise<CustomerV2> {
  return await api
    .get<CustomerV2>(`/customers/by-account-number/${accountNumber}`)
    .then((response) => response.data);
}
