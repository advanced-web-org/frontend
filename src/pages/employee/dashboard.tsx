import { getCustomerWithAccounts } from "@/api/customers/customer";
import { useCustomerStore } from "@/stores/customerStore";
import { useEffect, useState } from "react";
import { EmployeeTable } from "./components/EmpTable";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function EmpDashboardPage() {
  const { customers, setCustomersWithAccounts } = useCustomerStore();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    <div className="w-screen h-screen ">
      <div className="h-16 px-10 flex justify-between items-center bg-teal-500">
        <div className="text-2xl text-white font-bold">
          <span>Speechless Bank Staff System</span>
        </div>
        <Button
          className="bg-white text-black hover:bg-gray-200"
          onClick={() => {
            navigate("/auth/login");
          }}
        >
          Log out
        </Button>
      </div>
      <div className="p-4">
        <EmployeeTable data={customers} />
      </div>
    </div>
  );
}
