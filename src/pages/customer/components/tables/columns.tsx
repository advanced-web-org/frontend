import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "@/api/transactions/transaction";
import { Landmark } from "lucide-react";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "transaction_type",
    header: "Transaction Type",
  },
  {
    accessorKey: "from_bank_name",
    header: "From Bank",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {getBankIcon(row.original.from_bank_id)}
        <span>{row.original.from_bank_name}</span>
      </div>
    ),
  },
  {
    accessorKey: "from_account_number",
    header: "From Account",
  },
  {
    accessorKey: "to_bank_name",
    header: "To Bank",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {getBankIcon(row.original.to_bank_id)}
        <span>{row.original.to_bank_name}</span>
      </div>
    ),
  },
  {
    accessorKey: "to_account_number",
    header: "To Account",
  },
  {
    accessorKey: "transaction_amount",
    header: "Amount",
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

function getBankIcon(bankId: number) {
  switch (bankId) {
    case 1:
      return <Landmark className="h-5 w-5 text-teal-400" />;
    case 2:
      return <Landmark className="h-5 w-5 text-amber-500" />;
    default:
      return <Landmark className="h-5 w-5 text-gray-500" />;
  }
}
