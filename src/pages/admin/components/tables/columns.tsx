import { Staff } from "@/api/staffs/staff";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Staff>[] = [
  {
    accessorKey: "staff_id",
    header: "ID",
  },
  {
    accessorKey: "full_name",
    header: "Full name",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "username",
    header: "Username",
  }
];
