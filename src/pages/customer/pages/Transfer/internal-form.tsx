import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getInternalCustomerNameWithAccountNumber } from "@/api/customers/customer";
import Switch from '@mui/material/Switch';

interface InternalFormProps {
  onOtpRequest: () => void;
  receiverAccountNumber: string;
  setReceiverAccountNumber: (value: string) => void;
  transactionAmount: string;
  setTransactionAmount: (value: string) => void;
  transactionMessage: string;
  setTransactionMessage: (value: string) => void;
  feePaidBy: string;
  setFeePaidBy: (value: string) => void;
  receiverName: string;
  setReceiverName: (value: string) => void;
  isSavedAsContact: boolean;
  setIsSavedAsContact: (value: boolean) => void;
}

export default function InternalForm({
  onOtpRequest,
  receiverAccountNumber,
  setReceiverAccountNumber,
  transactionAmount,
  setTransactionAmount,
  transactionMessage,
  setTransactionMessage,
  feePaidBy,
  setFeePaidBy,
  receiverName,
  setReceiverName,
  isSavedAsContact,
  setIsSavedAsContact
}: InternalFormProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onOtpRequest();
  };

  const fetchRecipientInfo = async () => {
    const result = await getInternalCustomerNameWithAccountNumber(receiverAccountNumber);
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
    </form>
  );
}
