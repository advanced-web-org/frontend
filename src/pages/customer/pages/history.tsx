import { getTransactions, Transaction } from "@/api/transactions/transaction";
import { useEffect, useState } from "react";
import { columns } from "../components/tables/columns";
import { TransactionHistoryTable } from "../components/tables/table";

export default function HitoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTransactions();
      console.log(data);
      setTransactions(data);
    };
    fetchData();
  }, []);

  return (
    <div className="px-5">
      <p className="text-2xl pt-1 pb-3 font-semibold">Transaction History</p>
      <TransactionHistoryTable columns={columns} data={transactions} />
    </div>
  );
}
