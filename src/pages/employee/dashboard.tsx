import { getCustomerWithAccounts } from "@/api/customers/customer";
import { useCustomerStore } from "@/stores/customerStore";
import { useEffect, useState } from "react";
import { EmployeeTable } from "./components/EmpTable";

export default function EmpDashboardPage() {
  const { customers, setCustomersWithAccounts } = useCustomerStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      const customersData = await getCustomerWithAccounts();
      console.log(customersData);
      setCustomersWithAccounts(customersData);
      setLoading(false);
    };
    fetchCustomers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-screen h-screen">
      <div className="h-16 pl-10 flex justify-between items-center bg-teal-500">
        <div className="text-2xl text-white font-bold">
          Speechless Bank Staff System
        </div>
      </div>
      <div className="p-4">
        <EmployeeTable data={customers} />
      </div>
    </div>
  );
}
