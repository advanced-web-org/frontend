import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getInternalCustomerNameWithAccountNumber } from "@/api/customers/customer";
import Switch from '@mui/material/Switch';
import { NotebookTabs } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Beneficiary, getInternalBeneficiary } from "@/api/beneficiaries/beneficiary";

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

  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [beneficiaryModalOpen, setBeneficiaryModalOpen] = useState(false);

  const fetchBeneficiaries = async () => {
    const data = await getInternalBeneficiary();
    setBeneficiaries(data);
  };

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  const handleBeneficiarySelect = (beneficiary: Beneficiary) => {
    setReceiverAccountNumber(beneficiary.account_number);
    setReceiverName(beneficiary.nickname);
    setBeneficiaryModalOpen(false);
  };

  return (
    <form className="grid gap-6" onSubmit={handleSubmit}>
      <div className="flex gap-2 justify-between items-center">
        <Label>Account number</Label>
        <div className="relative w-4/5">
          <Input
            value={receiverAccountNumber}
            onChange={(e) => setReceiverAccountNumber(e.target.value)}
            onBlur={fetchRecipientInfo}
            type="text"
            placeholder="Account number"
            className="w-full h-12 pr-10 items-center"
          />
          <NotebookTabs
            size={40}
            color="#14B8A6"
            className="absolute inset-y-0 right-0 flex items-center pr-3 pt-2 cursor-pointer"
            onClick={() => setBeneficiaryModalOpen(true)}
          />
        </div>
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
          className="h-12 w-full"
          style={{ backgroundColor: "#14B8A6", color: "#fff" }} 
        >
          Transfer
        </Button>
      </div>

      {/* Beneficiary Modal */}
      <Dialog open={beneficiaryModalOpen} onClose={() => setBeneficiaryModalOpen(false)}>
        <DialogTitle>Select Beneficiary</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><span className="font-semibold">Bank name</span></TableCell>
                  <TableCell><span className="font-semibold">Account Number</span></TableCell>
                  <TableCell><span className="font-semibold">Nickname</span></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {beneficiaries.map((beneficiary) => (
                  <TableRow
                    key={beneficiary.beneficiary_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={() => handleBeneficiarySelect(beneficiary)}
                    className="cursor-pointer"
                  >
                    <TableCell component="th" scope="row">
                      {beneficiary.bank_name}
                    </TableCell>
                    <TableCell>{beneficiary.account_number}</TableCell>
                    <TableCell>{beneficiary.nickname}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBeneficiaryModalOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
