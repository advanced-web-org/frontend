import { Beneficiary } from "@/api/beneficiaries/beneficiary";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Beneficiary>[] = [
  {
    accessorKey: "account_number",
    header: "Account Number",
  },
  {
    accessorKey: "bank_name",
    header: "Bank Name",
  },
  {
    accessorKey: "nickname",
    header: "Nickname",
  },
];
