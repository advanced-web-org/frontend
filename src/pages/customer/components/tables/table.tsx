import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserStore } from "@/stores/userStore";

interface TransactionHistoryTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function TransactionHistoryTable<TData, TValue>({
  columns,
  data,
}: Readonly<TransactionHistoryTableProps<TData, TValue>>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const userAccNumber = useUserStore((state) => state.user?.account_number);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              console.log(row.original, "row");
              const isReceive = row.original.to_account_number == userAccNumber;
              const otherBank = !(
                row.original.from_bank_id == row.original.to_bank_id
              );

              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={otherBank ? "bg-sky-100" : ""}
                >
                  {row.getVisibleCells().map((cell) => {
                    // Conditional styling for the Amount column
                    if (cell.column.id === "transaction_amount") {
                      return (
                        <TableCell
                          key={cell.id}
                          className={
                            isReceive
                              ? "text-green-600 font-bold"
                              : "text-red-600 font-bold"
                          }
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
