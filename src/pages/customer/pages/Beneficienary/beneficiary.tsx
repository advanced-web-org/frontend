import { Beneficiary, getBeneficiaries } from "@/api/beneficiaries/beneficiary";
import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BeneficiaryPage() {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBeneficiaries();
      setBeneficiaries(data);
    };
    fetchData();
  }, []);

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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
