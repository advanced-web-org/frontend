import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import ExternalTransferForm from "./external-form";
import InternalTransferForm from "./internal-form";
import { Card, Snackbar, Alert } from "@mui/material";
import { CircleUserRound, MoveRight, CornerUpLeft } from "lucide-react";
import { useUserStore } from "@/stores/userStore";
import { useState } from "react";
import OTPInput from "@/components/ui/otp-input";
import { requestOtpForTransaction, verifyOtpForInternalTransaction } from "@/api/transactions/transaction";
import { useNavigate } from "react-router-dom";
import { createBeneficiary } from "@/api/beneficiaries/beneficiary";

export default function TransferPage() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const [isOtpInput, setIsOtpInput] = useState(false);
  const [receiverAccountNumber, setReceiverAccountNumber] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionMessage, setTransactionMessage] = useState("");
  const [feePaidBy, setFeePaidBy] = useState("sender");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpToken, setOtpToken] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [receiverName, setReceiverName] = useState("");
  const [isSavedAsContact, setIsSavedAsContact] = useState(false);
  const [selectedBank, setSelectedBank] = useState(0);
  const [isInternal, setIsInternal] = useState(true);

  const handleBack = () => {
    setIsOtpInput(false);
  };

  const onRequestOtp = async () => {
    const result = await requestOtpForTransaction();
    if (!result) return;
    setOtpToken(result.otpToken);
    setIsOtpInput(true);
  }

  const onVerifyOtp = async () => {
    if (isInternal) {
      await verifyOtpForInternalTransaction(otpToken, otp.join(''), {
        type: "internal",
        data: {
          from_bank_id: 1,
          from_account_number: user?.account_number,
          to_bank_id: 1,
          to_account_number: receiverAccountNumber,
          transaction_type: "transaction",
          transaction_amount: Number(transactionAmount.replace(' USD', '').replace(/\D/g, '')),
          transaction_message: transactionMessage,
          fee_payer: feePaidBy === "sender" ? "from" : "to",
          fee_amount: 1000
        }
      });
    } else {
      await verifyOtpForInternalTransaction(otpToken, otp.join(''), {
        type: "external",
        data: {
          from_bank_id: 1,
          from_account_number: user?.account_number,
          to_bank_id: selectedBank,
          to_account_number: receiverAccountNumber,
          transaction_type: "transaction",
          transaction_amount: Number(transactionAmount.replace(' USD', '').replace(/\D/g, '')),
          transaction_message: transactionMessage,
          fee_payer: feePaidBy === "sender" ? "from" : "to",
          fee_amount: 1000
        }
      });
    }

    if(isSavedAsContact) {
      try {
        await createBeneficiary({
          account_number: receiverAccountNumber,
          bank_id: isInternal ? 1 : selectedBank,
        });
      } catch (error) {
        console.error(error)
      }
    }

    setShowSuccess(true);
    setTimeout(() => {
      navigate("/customer/dashboard", { replace: true });
      window.location.reload();
    }, 3000);
  }

  return (
    <div className="container mx-auto p-2">
      {/* Headers */}
      <div className="mb-8 flex items-center gap-4">
        {!isOtpInput && <h1 className="text-2xl font-semibold">Within Speechless Bank Transfer</h1>}
        {isOtpInput && (
          <>
            <CornerUpLeft size={24} onClick={handleBack} />
            <h1 className="text-2xl font-semibold">Within Speechless Bank Transfer</h1>
            <MoveRight size={24} />
            <h1 className="text-2xl font-semibold">OTP Input</h1>
          </>
        )}
      </div>
      {/* Conditional rendering based on isOtpInput */}
      {!isOtpInput ? (
        <div className="flex flex-col gap-6 mx-auto items-center">
          {/* Source account */}
          <div className="flex flex-col gap-2 w-1/2">
            <h2 className="text-base font-medium">Source account</h2>
            <Card className="p-4 flex gap-4 items-center">
              <CircleUserRound size={48} color="#14B8A6" />
              <div className="flex flex-col gap-1">
                <span className="font-medium">
                  {user?.account_number?.replace(/(\d{4})(\d{4})(\d{3})/, "$1 $2 $3")} ({user?.fullname})
                </span>
                <span className="flex items-center font-semibold text-2xl">
                  {`${Number(user?.account_balance).toLocaleString('vi-VN')} USD`}
                </span>
              </div>
            </Card>
          </div>
          {/* Transfer to */}
          <div className="flex flex-col gap-2 w-1/2">
            <h2 className="text-base font-medium">Transfer to</h2>
            <Tabs defaultValue="internal" className="w-view flex flex-col gap-6" onValueChange={(value) => setIsInternal(value === "internal")}>
              <TabsList className="flex justify-center gap-4">
                <TabsTrigger
                  value="internal"
                  className="w-full font-normal bg-neutral-200 data-[state=active]:bg-teal-500 data-[state=active]:text-white"
                >
                  Internal Transfer
                </TabsTrigger>
                <TabsTrigger
                  value="external"
                  className="w-full font-normal bg-neutral-200 data-[state=active]:bg-teal-500 data-[state=active]:text-white"
                >
                  External Transfer
                </TabsTrigger>
              </TabsList>

              <TabsContent value="internal">
                <InternalTransferForm 
                  onOtpRequest={onRequestOtp}
                  receiverAccountNumber={receiverAccountNumber}
                  setReceiverAccountNumber={setReceiverAccountNumber}
                  transactionAmount={transactionAmount}
                  setTransactionAmount={setTransactionAmount}
                  transactionMessage={transactionMessage}
                  setTransactionMessage={setTransactionMessage}
                  feePaidBy={feePaidBy}
                  setFeePaidBy={setFeePaidBy}
                  receiverName={receiverName}
                  setReceiverName={setReceiverName}
                  isSavedAsContact={isSavedAsContact}
                  setIsSavedAsContact={setIsSavedAsContact}
                />
              </TabsContent>
              <TabsContent value="external">
                <ExternalTransferForm 
                  onOtpRequest={onRequestOtp}
                  receiverAccountNumber={receiverAccountNumber}
                  setReceiverAccountNumber={setReceiverAccountNumber}
                  transactionAmount={transactionAmount}
                  setTransactionAmount={setTransactionAmount}
                  transactionMessage={transactionMessage}
                  setTransactionMessage={setTransactionMessage}
                  feePaidBy={feePaidBy}
                  setFeePaidBy={setFeePaidBy}
                  receiverName={receiverName}
                  setReceiverName={setReceiverName}
                  isSavedAsContact={isSavedAsContact}
                  setIsSavedAsContact={setIsSavedAsContact}
                  selectedBank={selectedBank}
                  setSelectedBank={setSelectedBank}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      ) : (
        <OTPInput otp={otp} setOtp={setOtp} onOtpSubmit={onVerifyOtp} />
      )}
      <Snackbar open={showSuccess} autoHideDuration={3000}>
        <Alert variant="filled" severity="success">Your transaction is successfully</Alert>
      </Snackbar>
    </div>
  );
}
