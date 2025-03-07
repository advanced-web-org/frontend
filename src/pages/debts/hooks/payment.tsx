import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { initiateDebtPayment, payDebt, InitiateDebtPaymentDto } from "../api/debt.api";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import { selectOtpToken, setOtpToken } from "@/slice/otp.slice";

export const usePayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null); // Store error messages
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const otpToken = useAppSelector(selectOtpToken); // Get OTP token from Redux store

  const payDebtMutation = useMutation({
    mutationFn: ({ debtId, otpCode, otpToken }: { debtId: number; otpCode: string; otpToken: string }) =>
      payDebt(debtId, otpCode, otpToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["debtsAsDebtor"] });
      queryClient.invalidateQueries({ queryKey: ["debtsAsCreditor"] });
      setError(null); // Clear error on success
      setIsDialogOpen(false); // Close dialog only on success
      toast("Debt paid successfully!");
    },
    onError: (err: any) => {
      console.error("Failed to pay debt:", err);
      setError(err?.response?.data?.message || "Failed to process payment."); // Set error message
    },
  });

  const handleInitiatePayment = async (debtId: number) => {
    setIsLoading(true);
    try {
      const data: InitiateDebtPaymentDto = await initiateDebtPayment(debtId);
      dispatch(setOtpToken(data.otpToken)); // Dispatch action to set OTP token
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Failed to initiate payment:", error);
    } finally {
      setError(null);
      setIsLoading(false);
    }
  };

  const handleConfirmPayment = async (debtId: number, otpCode: string) => {
    try {
      if (!otpToken) {
        throw new Error("OTP token is missing");
      }
      setIsPaying(true);
      await payDebtMutation.mutateAsync({ debtId, otpCode, otpToken });
    } catch (error) {
      console.error("Failed to confirm payment:", error);
    } finally {
      setIsPaying(false);
    }
  };

  return {
    isLoading,
    isPaying,
    isDialogOpen,
    error,
    setIsDialogOpen,
    handleInitiatePayment,
    handleConfirmPayment,
  };
};
