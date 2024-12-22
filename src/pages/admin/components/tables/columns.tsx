import { Staff } from "@/api/staffs/staff";
import { Transaction } from "@/api/transactions/transaction";
import { ColumnDef } from "@tanstack/react-table";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

export const StaffTableColumns: ColumnDef<Staff>[] = [
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
      console.log("INSIDE FILTER FN", filterValue);
      if (!filterValue || (!filterValue.from && !filterValue.to)) {
        return true;
      }

      const rowDate = new Date(row.getValue(columnId));
      const { from, to } = filterValue;

      return (!from || rowDate >= from) && (!to || rowDate <= to);
    },
  },
];
