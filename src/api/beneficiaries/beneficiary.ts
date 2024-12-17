import api from "../api";

export interface Beneficiary {
  beneficiary_id: number;
  account_number: string;
  bank_name: string;
  nickname: string;
}

export async function getBeneficiaries(): Promise<Beneficiary[]> {
  const response = await api
    .get(`${import.meta.env.VITE_DOMAIN}/beneficiaries`)
    .then((res) => res.data);

  const beneficiaries = response.map(
    (item: {
      beneficiary_id: string;
      account_number: string;
      nickname: string;
      bank: { bank_name: string };
    }) => ({
      beneficiary_id: item.beneficiary_id,
      account_number: item.account_number,
      nickname: item.nickname,
      bank_name: item.bank.bank_name, // Move 'bank_name' to the top level
    })
  );
  return beneficiaries;
}
