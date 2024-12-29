import { Staff } from "@/api/staffs/staff";
import { Transaction } from "@/api/transactions/transaction";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { DateRange } from "react-day-picker";

interface ActionsColumnProps {
  handleEdit: (staffId: number) => void;
  handleRemove: (staffId: number) => void;
}

const bankFilterFn: FilterFn<Transaction> = (row, _, filterValue: string[]) => {
  const toBank = row.getValue("to_bank_name");
  const fromBank = row.getValue("from_bank_name");

  return filterValue.some(
    (bank: string) => toBank === bank || fromBank === bank
  );
};

export const createStaffTableColumns = ({
  handleEdit,
  handleRemove,
}: ActionsColumnProps): ColumnDef<Staff>[] => [
  {
    accessorKey: "staff_id",
    header: "ID",
    filterFn: "includesString",
  },
  {
    accessorKey: "full_name",
    header: "Full name",
    filterFn: "includesString",
  },
  {
    accessorKey: "role",
    header: "Role",
    filterFn: "includesString",
  },
  {
    accessorKey: "username",
    header: "Username",
    filterFn: "includesString",
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const staff = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleEdit(staff.staff_id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleRemove(staff.staff_id)}>
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    id: "staff_search",
    filterFn: (row, _, filterValue: string) => {
      return Object.values(row.original).some((value) => {
        return (
          value !== null &&
          value.toString().toLowerCase().includes(filterValue.toLowerCase())
        );
      });
    },
  },
];

export const TransactionTableColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "transaction_id",
    header: "ID",
    filterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId) as string;
      return value.toString().includes(filterValue);
    },
  },
  {
    accessorKey: "from_account_number",
    header: "Sender",
    filterFn: "includesString",
  },
  {
    id: "from_bank_name",
    accessorKey: "from_bank_name",
    header: "From",
  },
  {
    accessorKey: "to_account_number",
    header: "Receiver",
    filterFn: "includesString",
  },
  {
    id: "to_bank_name",
    accessorKey: "to_bank_name",
    header: "To",
  },
  {
    accessorKey: "transaction_amount",
    header: "Amount",
  },
  {
    accessorKey: "transaction_type",
    header: "Type",
  },
  {
    accessorKey: "transaction_date",
    header: "Date",
    enableColumnFilter: true,
    cell: ({ getValue }) => {
      const date = new Date(getValue<string>());
      return format(date, "PPP p");
    },
    filterFn: (row, columnId, filterValue: DateRange | undefined) => {
      if (!filterValue || (!filterValue.from && !filterValue.to)) {
        return true;
      }

      const rowDate = new Date(row.getValue(columnId));
      const { from, to } = filterValue;

      return (!from || rowDate >= from) && (!to || rowDate <= to);
    },
  },
  {
    id: "bank_filter",
    filterFn: bankFilterFn,
  },
];
