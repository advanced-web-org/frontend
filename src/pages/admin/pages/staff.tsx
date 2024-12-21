import { DataTable } from "../components/tables/table";
import { columns } from "../components/tables/columns";

export default function StaffPage() {
  const data = [
    {
      staff_id: 1,
      full_name: "John Doe",
      role: "Admin",
      username: "johndoe",
    },
    {
      staff_id: 2,
      full_name: "Jane Doe",
      role: "Staff",
      username: "janedoe",
    }
  ]

  return (
    <>
      <p className="text-2xl pt-1 pb-3 font-semibold">Staffs</p>
      <DataTable columns={columns} data={data} />
    </>
  );
}