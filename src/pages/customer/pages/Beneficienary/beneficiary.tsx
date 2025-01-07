import { Beneficiary, getBeneficiaries, deleteBeneficiary, updateBeneficiary } from "@/api/beneficiaries/beneficiary";
import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Edit, Trash } from "lucide-react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

export default function BeneficiaryPage() {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentBeneficiary, setCurrentBeneficiary] = useState<Beneficiary | null>(null);
  const [nickname, setNickname] = useState("");

  const fetchData = async () => {
    const data = await getBeneficiaries();
    setBeneficiaries(data);
  };

  useEffect(() => {
    fetchData();
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

  return (
    <div className="container mx-auto p-2 flex flex-col justify-start gap-10">
      {/* Header */}
      <div className="">
        <h1 className="text-2xl font-semibold">Beneficiaries</h1>
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
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
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
    </div>
  );
}
