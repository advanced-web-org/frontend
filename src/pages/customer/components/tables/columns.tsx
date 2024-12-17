import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "@/api/transactions/transaction";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "from_account_number",
    header: "From",
  },
  {
    accessorKey: "to_account_number",
    header: "To",
  },
  {
    accessorKey: "transaction_amount",
    header: "",
  },
  {
    accessorKey: "transaction_message",
    header: "Message",
  },
  {
    accessorKey: "transaction_date",
    header: "Date",
  },
];
