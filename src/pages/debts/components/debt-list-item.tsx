import { Badge, badgeVariants } from "@/components/ui/badge";
import { Debt, DebtStatus } from "../types/debt.type";
import { Tab } from "@/components/debts/debt-tabs";
import { useQueryClient } from "@tanstack/react-query";
import DeleteDebtDialog from "./delete-debt-dialog";
import { deleteDebt } from "../api/debt.api";
import { numberToCurrency } from "@/utils/currency.utils";
import OtpDialog from "./otp-dialog";
import { Button } from "@/components/ui/button";
import { ring } from 'ldrs'
import { usePayment } from "../hooks/payment";

const getStatusClass = (status: DebtStatus) => badgeVariants({ variant: status });

const getStatusDisplay = (status: DebtStatus) => status.toUpperCase();

export const getButtonClass = () => "w-16";

const DebtListItem = ({ debt, tab }: { debt: Debt; tab: Tab }) => {
  ring.register()
  const queryClient = useQueryClient();
  const handleDelete = async () => {
    try {
      await deleteDebt(debt.debt_id);
      queryClient.invalidateQueries({ queryKey: ["debtsAsDebtor"] });
      queryClient.invalidateQueries({ queryKey: ["debtsAsCreditor"] });
    } catch (error) {
      console.error("Failed to delete debt:", error);
    }
  };
  const {
    isLoading,
    isPaying,
    isDialogOpen,
    error,
    setIsDialogOpen,
    handleInitiatePayment,
    handleConfirmPayment,
  } = usePayment();

  return (
    <div className="debt-item p-4 mb-4 rounded-md shadow-md border border-gray-200">
      <div className="flex flex-row justify-between gap-20">
        <div className="w-3/5">
          {tab === Tab.CREDITOR && <p className="text-lg font-semibold">Debtor: {debt.debtor.full_name}</p>}
          {tab === Tab.DEBTOR && <p className="text-lg font-semibold">Creditor: {debt.creditor.full_name}</p>}
          <p className="italic text-gray-500 text-sm">Message</p>
          <p className="text-gray-600 max-h-20 overflow-y-auto">{debt.debt_message}</p>
        </div>
        <div className="flex flex-col items-end gap-2 w-1/4 max-w-1/2">
          <p className="text-lg font-semibold">
            <span className="text-blue-500">{numberToCurrency(debt.debt_amount)}</span>
          </p>
          <Badge className={`font-medium ${getStatusClass(debt.status)}`}>
            {getStatusDisplay(debt.status)}
          </Badge>
          <p className="text-gray-500 text-sm">
            Created: {new Date(debt.created_at).toLocaleDateString()}
          </p>

          <div className="flex flex-row justify-end gap-4 mt-4">
            {shouldDisplayPayButton(debt.status, tab) && (
              <>
                <Button
                  className={getButtonClass()}
                  onClick={() => handleInitiatePayment(debt.debtor_id)}
                  disabled={isLoading}
                >
                  {isLoading ? <l-ring size="20" stroke="2" speed="2" color="white" /> : "Pay"}
                </Button>
                <OtpDialog
                  className={getButtonClass()}
                  onPay={(otpCode) => handleConfirmPayment(debt.debt_id, otpCode)}
                  isOpen={isDialogOpen}
                  onClose={() => setIsDialogOpen(false)}
                  isPaying={isPaying}
                  error={error}
                />
              </>
            )}
            {shouldDisplayDeleteButton(debt.status) && (
              <DeleteDebtDialog
                className={getButtonClass()}
                debtId={debt.debt_id}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebtListItem;

const shouldDisplayPayButton = (debtStatus: DebtStatus, tab: Tab): boolean => {
  return tab === Tab.DEBTOR && debtStatus === DebtStatus.unpaid;
};

const shouldDisplayDeleteButton = (debtStatus: DebtStatus): boolean => {
  return debtStatus !== DebtStatus.deleted && debtStatus !== DebtStatus.paid;
};
