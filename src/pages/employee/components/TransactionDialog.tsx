import { getTransactions, Transaction } from "@/api/transactions/transaction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { columns } from "@/pages/customer/components/tables/columns";
import { TransactionHistoryTable } from "@/pages/customer/components/tables/table";
import { useEffect, useState } from "react";

interface TransactionDialogProps {
  isOpen: boolean;
  accountNumber: string;
  onClose: () => void;
}

export function TransactionDialog({
  isOpen,
  accountNumber,
  onClose,
}: Readonly<TransactionDialogProps>) {
  const [error, setError] = useState<string | null>(null);

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTransactions();
      setTransactions(data);
    };
    fetchData();
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Transactions of account: {accountNumber}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 pb-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <TransactionHistoryTable columns={columns} data={transactions} />
      </DialogContent>
    </Dialog>
  );
}
