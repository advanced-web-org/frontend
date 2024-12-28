import { Button } from "@/components/ui/button";
import { useState } from "react";
import DebtTabs, { Tab } from "@/components/debts/debt-tabs";
import { Debt } from "./types/debt.type";
import { getDebtsAsCreditor, getDebtsAsDebtor } from "./api/debt.api";
import { useQuery } from "@tanstack/react-query";
import { bouncy } from "ldrs";
import DebtListItem from "./components/debt-list-item";

const ViewDebts = () => {
  const [tab, setTab] = useState<Tab>(Tab.DEBTOR);

  bouncy.register();

  // Fetch debts as a debtor
  const {
    data: debtorDebts,
    isLoading: isLoadingDebtor,
    isError: isErrorDebtor,
  } = useQuery({
    queryKey: ["debtsAsDebtor"],
    queryFn: () => getDebtsAsDebtor(2),
    enabled: tab === Tab.DEBTOR,
  });

  // Fetch debts as a creditor
  const {
    data: creditorDebts,
    isLoading: isLoadingCreditor,
    isError: isErrorCreditor,
  } = useQuery({
    queryKey: ["debtsAsCreditor"],
    queryFn: () => getDebtsAsCreditor(1),
    enabled: tab === Tab.CREDITOR,
  });

  // Determine which debts to display based on the selected tab
  const debts = tab === Tab.DEBTOR ? debtorDebts : creditorDebts;
  const isLoading = tab === Tab.DEBTOR ? isLoadingDebtor : isLoadingCreditor;
  const isError = tab === Tab.DEBTOR ? isErrorDebtor : isErrorCreditor;

  return (
    <div className="h-screen w-screen flex flex-col">
      {/* Header */}
      <h1 className="text-2xl font-bold p-2">View Debts</h1>

      {/* Tabs (Rendered Immediately) */}
      <div className="flex flex-row justify-between p-2">
        <DebtTabs setTab={setTab} />
        <Button className="">Create a debt reminder</Button>
      </div>

      {/* Debt List (Loaded Asynchronously) */}
      <div className="debt-list p-4">
        {isLoading ? (
          <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
        ) : isError ? (
          <p className="text-center text-red-500">Error loading debts</p>
        ) : debts && debts.length > 0 ? (
              debts.map((debt: Debt) => <DebtListItem key={debt.debt_id} debt={debt} tab={tab} />)
        ) : (
          <p className="text-center text-gray-500">No debts found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewDebts;
