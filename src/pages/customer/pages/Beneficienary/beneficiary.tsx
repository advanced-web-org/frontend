import { Beneficiary, getBeneficiaries } from "@/api/beneficiaries/beneficiary";
import { DataTable } from "../../components/tables/table";
import { columns } from "./columns";
import { useEffect, useState } from "react";

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
    <div>
      <p className="text-2xl pt-1 pb-3 font-semibold">Beneficiaries</p>
      <DataTable columns={columns} data={beneficiaries} />
    </div>
  );
}
