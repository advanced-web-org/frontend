import { useCustomerStore } from "@/stores/customerStore";
import { useEffect, useState } from "react";
import { EmployeeTable } from "./components/EmpTable";
import { useQuery } from "@tanstack/react-query";
import { getCustomerWithAccounts } from "@/api/customers/customer";

export default function EmpDashboardPage() {
  const { customers, setCustomersWithAccounts } = useCustomerStore();

  const { data } = useQuery({
    queryKey: ["customers"],
    queryFn: () => getCustomerWithAccounts(),
  });

  useEffect(() => {
    if (data) {
      setCustomersWithAccounts(data);
    }
  }, [data]);

  return (
    <div className="w-screen h-screen p-4">
      <p className="text 2-xl">staff</p>
      <EmployeeTable data={customers} />
    </div>
  );
}
