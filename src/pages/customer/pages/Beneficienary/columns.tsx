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
  {
    id: "actions", // Use `id` instead of `accessorKey` for custom columns
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => handleEdit(row.original)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => handleDelete(row.original)}
        >
          Delete
        </button>
      </div>
    ),
  },
];

function handleEdit(original: Beneficiary): void {
  throw new Error("Function not implemented.");
}

function handleDelete(original: Beneficiary): void {
  throw new Error("Function not implemented.");
}
