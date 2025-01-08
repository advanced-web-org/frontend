import { Beneficiary, getBeneficiaries, deleteBeneficiary, updateBeneficiary, createBeneficiary } from "@/api/beneficiaries/beneficiary";
import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Edit, Trash } from "lucide-react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select } from "@mui/material";
import { getBanks } from "@/api/banks/bank";
import { getExternalCustomerNameWithAccountNumber, getInternalCustomerNameWithAccountNumber } from "@/api/customers/customer";

export default function BeneficiaryPage() {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentBeneficiary, setCurrentBeneficiary] = useState<Beneficiary | null>(null);
  const [nickname, setNickname] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newBankName, setNewBankName] = useState("");
  const [newAccountNumber, setNewAccountNumber] = useState("");
  const [newNickname, setNewNickname] = useState("");
  const [banks, setBanks] = useState<{ bank_id: number, bank_name: string }[]>([]);

  const fetchData = async () => {
    const data = await getBeneficiaries();
    setBeneficiaries(data);
  };

  const fetchBanks = async () => {
    const data = await getBanks();
    data.push({ bank_id: 1, bank_name: "Our bank" });
    data.sort((a, b) => a.bank_id - b.bank_id);
    setBanks(data);
  };

  useEffect(() => {
    fetchData();
    fetchBanks();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteBeneficiary(id);
    setTimeout(() => {
      fetchData();
    }, 1000);
  };

  const handleEdit = (beneficiary: Beneficiary) => {
    setCurrentBeneficiary(beneficiary);
    setNickname(beneficiary.nickname);
    setEditModalOpen(true);
  };

  const handleSave = async () => {
    if (currentBeneficiary) {
      await updateBeneficiary(currentBeneficiary.beneficiary_id, { nickname });
      setTimeout(() => {
        fetchData();
        setEditModalOpen(false);
      }, 1000);
    }
  };

  const handleCreate = async () => {
    await createBeneficiary({
      account_number: newAccountNumber,
      bank_id: banks.find((bank) => bank.bank_name === newBankName)?.bank_id || 0,
      nickname: newNickname
    });
    setTimeout(() => {
      fetchData();
      setNewBankName("");
      setNewAccountNumber("");
      setNewNickname("");
      setCreateModalOpen(false);
    }, 1000);
  };

  const fetchBeneficiaryInfo = async () => {
    if (newBankName === "Our bank") {
      const result = await getInternalCustomerNameWithAccountNumber(newAccountNumber);
      if (!result) {
        setNewNickname("");
        return;
      };
      setNewNickname(result.fullName);
    } else {
      const result = await getExternalCustomerNameWithAccountNumber(newBankName, newAccountNumber);
      if (!result) {
        setNewNickname("");
        return;
      };
      setNewNickname(result.fullName);
    }
  }

  return (
    <div className="container mx-auto p-2 flex flex-col justify-start gap-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Beneficiaries</h1>
      </div>
      {/* Action buttons */}
      <div className="flex justify-end px-10">
        <Button variant="contained" color="primary" onClick={() => setCreateModalOpen(true)}>
          Add Beneficiary
        </Button>
      </div>
      
      {/* Table */}
      <div className="px-10">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><span className="font-semibold">Bank name</span></TableCell>
                <TableCell><span className="font-semibold">Account Number</span></TableCell>
                <TableCell><span className="font-semibold">Nickname</span></TableCell>
                <TableCell><span className="font-semibold">Actions</span></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {beneficiaries.map((beneficiary) => (
                <TableRow
                  key={beneficiary.beneficiary_id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {beneficiary.bank_name}
                  </TableCell>
                  <TableCell>{beneficiary.account_number}</TableCell>
                  <TableCell>{beneficiary.nickname}</TableCell>
                  <TableCell>
                    <div className="flex gap-4">
                      <Edit 
                        className="cursor-pointer" 
                        onClick={() => handleEdit(beneficiary)} 
                      />
                      <Trash 
                        className="cursor-pointer" 
                        onClick={() => handleDelete(beneficiary.beneficiary_id)} 
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* Edit Modal */}
      <Dialog 
        open={editModalOpen} 
        onClose={() => setEditModalOpen(false)}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Edit Beneficiary</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nickname"
            type="text"
            fullWidth
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Create Modal */}
      <Dialog 
        open={createModalOpen} 
        onClose={() => setCreateModalOpen(false)}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>Add New Beneficiary</DialogTitle>
        <DialogContent className="flex flex-col gap-4">
          <Select
            fullWidth
            value={newBankName}
            onChange={(e) => {
              setNewBankName(e.target.value);
              setNewNickname("");
              setNewAccountNumber("");
            }}
            displayEmpty
          >
            <MenuItem value="" disabled>Select Bank</MenuItem>
            {banks.map((bank) => (
              <MenuItem key={bank.bank_id} value={bank.bank_name}>{bank.bank_name}</MenuItem>
            ))}
          </Select>
          <TextField
            margin="dense"
            label="Account Number"
            type="text"
            fullWidth
            value={newAccountNumber}
            onChange={(e) => setNewAccountNumber(e.target.value)}
            onBlur={fetchBeneficiaryInfo}
          />
          {newNickname && (
            <TextField
              margin="dense"
              label="Nickname"
              type="text"
              fullWidth
              value={newNickname}
              disabled
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateModalOpen(false)}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
