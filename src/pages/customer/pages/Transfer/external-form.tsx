import { Combobox } from "@/components/combobox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBankStore } from "@/stores/bankStore";
import { useUserStore } from "@/stores/userStore";
import { useEffect, useState } from "react";

export default function ExternalForm() {
  const userStore = useUserStore((state) => state.user);

  const [receiverBankId, setReceiverBankId] = useState<number | null>(null);
  const [receiverAccountNumber, setReceiverAccountNumber] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionMessage, setTransactionMessage] = useState("");

  const bankStore = useBankStore((state) => state.banks);
  const setBanks = useBankStore((state) => state.setBanks);

  useEffect(() => {
    // Fetch the banks list here
    setBanks();
  }, []);

  const bankOptions = bankStore.map((bank) => ({
    label: bank.bank_name,
    value: bank.bank_id,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform the external transfer API call here
    console.log({
      fromAccount: userStore?.account_number,
      toBank: receiverBankId,
      toAccount: receiverAccountNumber,
      amount: transactionAmount,
      message: transactionMessage,
    });
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-row gap-2 justify-between items-center h-7">
        <Label className="w-fit">Your account</Label>
        <p className="w-2/3">{userStore?.account_number}</p>
      </div>

      <div className="flex flex-row gap-2 justify-between items-center h-7">
        <Label className="w-fit">Your balance</Label>
        <p className="w-2/3 font-bold text-teal-800">
          {userStore?.account_balance} $
        </p>
      </div>

      <div className="flex flex-row gap-2 justify-between items-center">
        <Label>Receiver account bank</Label>
        <Combobox
          choices={bankOptions}
          value={receiverBankId ?? undefined}
          onSelect={(bankId) => setReceiverBankId(bankId)}
        />
      </div>

      <div className="flex flex-row gap-2 justify-between items-center">
        <Label>Receiver account number</Label>
        <Input
          value={receiverAccountNumber}
          onChange={(e) => setReceiverAccountNumber(e.target.value)}
          type="text"
          placeholder="Account number"
          className="w-2/3"
        />
      </div>

      <div className="flex flex-row gap-2 justify-between items-center">
        <Label>Transfer amount</Label>
        <Input
          value={transactionAmount}
          onChange={(e) => setTransactionAmount(e.target.value)}
          type="text"
          placeholder="Amount"
          className="w-2/3"
        />
      </div>

      <div className="flex flex-row gap-2 justify-between items-center">
        <Label>Message</Label>
        <Input
          value={transactionMessage}
          onChange={(e) => setTransactionMessage(e.target.value)}
          type="text"
          placeholder="Your message"
          className="w-2/3 h-40"
        />
      </div>

      <div className="flex gap-2 justify-center">
        <Button type="submit" size={"freesize"} className="h-10 w-1/2">
          Transfer
        </Button>
      </div>
    </form>
  );
}
