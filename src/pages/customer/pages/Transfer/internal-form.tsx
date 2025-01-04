import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/stores/userStore";
import { useState } from "react";
import { getCustomerNameWithAccountNumber } from "@/api/customers/customer";
import Switch from '@mui/material/Switch';
import OTPInput from "@/components/ui/otp-input";
import { requestOtpForTransaction } from "@/api/transactions/transaction";

export default function InternalForm() {
  const userStore = useUserStore((state) => state.user);

  const [receiverAccountNumber, setReceiverAccountNumber] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionMessage, setTransactionMessage] = useState("");
  const [feePaidBy, setFeePaidBy] = useState("sender");
  const [receiverName, setReceiverName] = useState("");
  const [isSavedAsContact, setIsSavedAsContact] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Perform the internal transfer API call here
    console.log({
      fromAccount: userStore?.account_number,
      toAccount: receiverAccountNumber,
      amount: transactionAmount.replace(' VNĐ', '').replace(/\D/g, ''),
      message: transactionMessage,
      feePayer: feePaidBy,
      isSavedAsContact,
    });

    await requestOtpForTransaction();
  };

  const fetchRecipientInfo = async () => {
    const result = await getCustomerNameWithAccountNumber(receiverAccountNumber);
    if (!result) {
      setReceiverName("");
      return;
    };
    setReceiverName(result.fullName);
  };

  return (
    <form className="grid gap-6" onSubmit={handleSubmit}>
      <div className="flex gap-2 justify-between items-center">
        <Label>Account number</Label>
        <Input
          value={receiverAccountNumber}
          onChange={(e) => setReceiverAccountNumber(e.target.value)}
          onBlur={fetchRecipientInfo}
          type="text"
          placeholder="Account number"
          className="w-4/5 h-12"
        />
      </div>

      {receiverName && (
        <div className="flex gap-2 justify-between items-center">
          <Label>Account Name</Label>
          <Input
            value={receiverName}
            type="text"
            readOnly
            className="w-4/5 h-12 bg-gray-100"
          />
        </div>
      )}

      {receiverName && (
        <div className="flex gap-2 justify-end items-center">
          <span className="font-semibold">Save as contact</span>
          <Switch 
            color="primary"
            onChange={() => setIsSavedAsContact(!isSavedAsContact)}
            defaultChecked={isSavedAsContact}
          />
        </div>
      )}

      <div className="flex gap-2 justify-between items-center">
        <Label>Transfer amount</Label>
        <Input
          value={transactionAmount}
          onChange={(e) => setTransactionAmount(e.target.value)}
          onBlur={() => {
            if (!transactionAmount) return;
            const formattedAmount = parseFloat(transactionAmount).toLocaleString('vi-VN');
            setTransactionAmount(formattedAmount + ' VNĐ');
          }}
          onClick={() => {
            const amount = transactionAmount.replace(' VNĐ', '').replace(/\D/g, '');
            setTransactionAmount(amount);
          }}
          type="text"
          placeholder="Amount"
          className="w-4/5 h-12"
        />
      </div>

      <div className="flex gap-2 justify-between items-center">
        <Label>Fee paid by</Label>
        <div className="flex w-4/5 gap-10">
          <label className="flex items-center">
            <Input
              type="radio"
              value="sender"
              checked={feePaidBy === "sender"}
              onChange={(e) => setFeePaidBy(e.target.value)}
              className="mr-2"
            />
            Sender
          </label>
          <label className="flex items-center">
            <Input
              type="radio"
              value="recipient"
              checked={feePaidBy === "recipient"}
              onChange={(e) => setFeePaidBy(e.target.value)}
              className="mr-2"
            />
            Recipient
          </label>
        </div>
      </div>

      <div className="flex gap-2 justify-between items-center">
        <Label>Transfer message</Label>
        <Input
          value={transactionMessage}
          onChange={(e) => setTransactionMessage(e.target.value)}
          type="text"
          placeholder="Your message"
          className="w-4/5 h-12"
        />
      </div>

      <div className="flex gap-2 justify-center">
        <Button 
          type="submit"
          className="h-12 w-full bg-teal-500 text-white hover:bg-teal-500" 
        >
          Transfer
        </Button>
      </div>
      <OTPInput />
    </form>
  );
}
