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

export async function addStaff(staff: {
  fullName: string;
  username: string;
  role: string;
  password: string;
}): Promise<Staff> {
  const response = await api
    .post(`${import.meta.env.VITE_DOMAIN}/staffs`, staff)
    .then((res) => res.data);
  return response;
}

export async function updateStaff(staff: {
  fullName: string;
  username: string;
  role: string;
}): Promise<Staff> {
  const response = await api
    .post(`${import.meta.env.VITE_DOMAIN}/staffs/update`, staff)
    .then((res) => {
      console.log("Updated staff", res);
      return res.data;
    });
  return response;
}

export async function deleteStaff(staffId: number): Promise<void> {
  await api.delete(`${import.meta.env.VITE_DOMAIN}/staffs/${staffId}`);
}
