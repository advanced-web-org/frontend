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
    <div className="w-screen h-screen p-4">
      <p className="text 2-xl">staff</p>
      <EmployeeTable data={customers} />
    </div>
  );
}
