import { getTransactions, Transaction } from "@/api/transactions/transaction";
import { useEffect, useState } from "react";
import { columns } from "../components/tables/columns";
import { DataTable } from "../components/tables/table";

export default function HitoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTransactions();
      setTransactions(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <p className="text-2xl pt-1 pb-3 font-semibold">Transaction History</p>
      <DataTable columns={columns} data={transactions} />
    </>
  );
}
