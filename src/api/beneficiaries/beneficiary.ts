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

export async function createBeneficiary(data: {
  account_number: string;
  bank_id: number;
  nickname?: string;
}): Promise<boolean> {
  const response = await api
    .post(`${import.meta.env.VITE_DOMAIN}/beneficiaries`, data)
    .then((res) => res.data);

  console.log('res: ', response);
  
  return response;
}

export async function deleteBeneficiary(id: number): Promise<boolean> {
  const response = await api
    .delete(`${import.meta.env.VITE_DOMAIN}/beneficiaries/${id}`)
    .then((res) => res.data);

  return response;
}

export async function updateBeneficiary(id: number, data: { nickname: string }): Promise<boolean> {
  const response = await api
    .patch(`${import.meta.env.VITE_DOMAIN}/beneficiaries/${id}`, data)
    .then((res) => res.data);

  return response;
}
