import api from "../api";

export interface Bank {
  bank_id: number;
  bank_name: string;
}

export async function getBanks(): Promise<Bank[]> {
  const response = await api
    .get(`${import.meta.env.VITE_DOMAIN}/banks`)
    .then((res) => res.data);

  const banks = response.map(
    (item: { bank_id: number; bank_name: string }) => ({
      bank_id: item.bank_id,
      bank_name: item.bank_name,
    })
  );

  return banks;
}
