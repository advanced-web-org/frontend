import api from "../api";

export interface Staff {
  staff_id: number;
  full_name: string;
  role: string;
  username: string;
}

export async function getStaffs(): Promise<Staff[]> {
  const response = await api
    .get(`${import.meta.env.VITE_DOMAIN}/staffs`)
    .then((res) => res.data);
  return response;
}