import { Badge, badgeVariants } from "@/components/ui/badge";
import { Debt, DebtStatus } from "../types/debt.type";
import { Button } from "@/components/ui/button";
import { Tab } from "@/components/debts/debt-tabs";

const getStatusClass = (status: DebtStatus) => {
  return badgeVariants({ variant: status });
}

const getStatusDisplay = (status: DebtStatus) => {
  return status.toUpperCase();
}

const getButtonClass = () => {
  return "w-16"
}

const DebtListItem = ({ debt, tab }: { debt: Debt, tab: Tab }) => {
  return (
    <div className="
      debt-item p-4 mb-4
      rounded-md shadow-md
      bounce-item
      border border-gray-200"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-20">
        <div className="flex flex-col w-3/5">
          {tab === Tab.CREDITOR && <p className="text-lg font-semibold">Debtor: {debt.debtor.full_name}</p>}
          {tab === Tab.DEBTOR && <p className="text-lg font-semibold">Creditor: {debt.creditor.full_name}</p>}
          <p className="italic text-gray-500 text-sm">Message</p>
          <p className="text-gray-600 max-h-20 overflow-y-auto">{debt.debt_message}</p>
        </div>
        <div className="flex flex-col items-end gap-2 w-1/4 max-w-1/2">
          <p className="text-lg font-semibold">
            Amount: <span className="text-blue-500">${debt.debt_amount}</span>
          </p>
          <Badge className={`font-medium ${getStatusClass(debt.status)}`}>
            {getStatusDisplay(debt.status)}
          </Badge>
          <p className="text-gray-500 text-sm">
            Created: {new Date(debt.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex flex-row justify-end gap-4 mt-4">
        {tab === Tab.DEBTOR && <Button className={getButtonClass()}>Pay</Button>}
        <Button className={getButtonClass()} variant="destructive">Delete</Button>
      </div>
    </div>
  );
};

export default DebtListItem;