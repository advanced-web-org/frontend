import React, { useState } from "react";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Debt, DebtStatus } from "../types/debt.type";
import { Tab } from "@/components/debts/debt-tabs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteDebtDialog from "./delete-debt-dialog";
import { deleteDebt, initiateDebtPayment, InitiateDebtPaymentDto } from "../api/debt.api";
import { numberToCurrency } from "@/utils/currency.utils";
import OtpDialog from "./otp-dialog";
import { userOtpStore } from "@/stores/otpStore";
import { Button } from "@/components/ui/button";
import { ring } from 'ldrs'
import { get } from "http";

const getStatusClass = (status: DebtStatus) => badgeVariants({ variant: status });

const getStatusDisplay = (status: DebtStatus) => status.toUpperCase();

export const getButtonClass = () => "w-16";

const DebtListItem = ({ debt, tab }: { debt: Debt; tab: Tab }) => {
  ring.register()
  const queryClient = useQueryClient();
  const setOtpToken = userOtpStore((state) => state.setOtpToken);

  const [isLoading, setIsLoading] = useState(false); // Manage loading state for the Pay button
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Track dialog open state

  const mutation = useMutation({
    mutationFn: deleteDebt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["debtsAsDebtor"] });
      queryClient.invalidateQueries({ queryKey: ["debtsAsCreditor"] });
    },
  });

  const handleDelete = async () => {
    try {
      await mutation.mutateAsync(debt.debt_id);
    } catch (error) {
      console.error("Failed to delete debt:", error);
    }
  };

  const handlePayClick = async () => {
    setIsLoading(true); // Set loading to true before initiating payment
    try {
      const data: InitiateDebtPaymentDto = await initiateDebtPayment(debt.debtor_id);
      setOtpToken(data.otpToken);
      setIsDialogOpen(true); // Open the dialog after initiating payment
    } catch (error) {
      console.error("Failed to initiate payment:", error);
    } finally {
      setIsLoading(false); // Set loading to false after handling
    }
  };

  const handleConfirmPayment = async (otpCode: string) => {
    try {

      // get otpToken from otpStore
      const otpToken = userOtpStore.getState().otpToken;

      // await userOtpStore.getState().onPay(otpCode);
    } catch (error) {
      console.error("Failed to pay debt:", error);
    }
  }

  return (
    <div
      className="
      debt-item p-4 mb-4
      rounded-md shadow-md
      bounce-item
      border border-gray-200"
    >
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
                  onClick={handlePayClick}
                  disabled={isLoading}
                >
                  {isLoading ?
                    <l-ring
                      size="20"
                      stroke="2"
                      speed="2"
                      color="white"
                    ></l-ring>
                    : "Pay"}
                </Button>
                <OtpDialog
                  className={getButtonClass()}
                  debtId={debt.debtor_id}
                  onPay={handleConfirmPayment}
                  isOpen={isDialogOpen}
                  onClose={() => setIsDialogOpen(false)}
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
  return debtStatus !== DebtStatus.deleted;
};
