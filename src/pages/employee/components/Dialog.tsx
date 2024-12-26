import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/stores/userStore";
import { deposit } from "@/api/deposits/deposit";

interface DialogDemoProps {
  isOpen: boolean;
  onClose: () => void;
  account: string | null;
}

export function DialogDemo({
  isOpen,
  onClose,
  account,
}: Readonly<DialogDemoProps>) {
  const [formData, setFormData] = useState({
    amount: 0,
    message: "",
  });

  const [error, setError] = useState<string | null>(null);
  const user = useUserStore((state) => state.user);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.amount || !formData.message) {
      setError("Both fields are required.");
      return;
    }

    if (!user) {
      setError("User not found.");
      return;
    }

    if (account === null) {
      setError("Account number not found.");
      return;
    }

    const depositPayload = {
      employee_id: user.id,
      transaction: {
        from_bank_id: user?.bank_id,
        to_bank_id: user?.bank_id,
        to_account_number: account,
        transaction_type: "deposit",
        transaction_amount: formData.amount,
        transaction_message: formData.message,
        fee_amount: 0,
      },
    };

    deposit(depositPayload)
      .then(() => {
        // Reset form and close dialog
        setFormData({ amount: 0, message: "" });
        setError(null);
        onClose();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deposit</DialogTitle>
          <DialogDescription>
            Deposit for account number:{" "}
            <span className="font-bold">{account}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 pb-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="message" className="text-right">
              Message
            </Label>
            <Input
              id="message"
              value={formData.message}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit} variant="default">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
