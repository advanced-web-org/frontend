import { getBanks } from "@/api/banks/bank";
import { getExternalBalance, getTransactions, Transaction } from "@/api/transactions/transaction";
import { MultiSelect } from "@/components/ui/multi-select";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import CustomLineChart from "../components/line-chart";
import { TransactionTableColumns } from "../components/tables/columns";
import { DateRangePickerComponent } from "../components/tables/date-filter";
import { DataTable } from "../components/tables/table";

const uData = [
  4000, 3000, 2000, 2780, 1890, 2390, 3490, 4200, 3100, 2900, 3300, 4100,
];
const pData = [
  2400, 1398, 9800, 3908, 4800, 3800, 4300, 5200, 4100, 3900, 4500, 5100,
];
const xLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// const data: Transaction[] = [
//   {
//     transaction_id: 1,
//     from_bank_id: 1,
//     from_account_number: "1234567890",
//     to_bank_id: 2,
//     to_account_number: "0987654321",
//     transaction_type: "transaction",
//     transaction_amount: 1000,
//     transaction_message: "Test transaction",
//     fee_payer: "sender",
//     fee_amount: 0,
//     e_signal: "test",
//     transaction_date: "2021-01-01",
//   },
// ];

const totalRevenue = pData.map((value, index) => value + uData[index]);

export default function SimpleLineChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    {
      id: "transaction_date",
      value: dateRange,
    },
  ]);
  const [banks, setBanks] = useState<{ value: string; label: string }[]>([]);
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
  const [data, setData] = useState<Transaction[]>([]);

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    setColumnFilters((prev) => [
      ...prev,
      {
        id: "transaction_date",
        value: range,
      },
    ]);
  };

  useEffect(() => {
    getTransactions().then((transactions) => {
      console.log(transactions);
      setData(transactions);
    });

    // fetch all banks
    getBanks().then((banks) => {
      setSelectedBanks(banks.map((bank) => bank.bank_name));
      setBanks(banks.map((bank) => ({ value: bank.bank_name, label: bank.bank_name })));
    });

    getExternalBalance();
  }, []);

  return (
    <>
      <CustomLineChart
        series={[
          { data: totalRevenue, label: "Total" },
          { data: pData, label: "Vietcombank" },
          { data: uData, label: "Agribank" },
        ]}
        xLabels={xLabels}
      />

      <div
        className="mb-4 mx-6"
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "3rem",
        }}
      >
        <DateRangePickerComponent onChange={handleDateRangeChange} />
        <MultiSelect
          options={banks}
          onValueChange={setSelectedBanks}
          defaultValue={selectedBanks}
          placeholder="Select banks"
          variant="inverted"
          animation={2}
          maxCount={3}
        />
      </div>

      <DataTable
        columns={TransactionTableColumns}
        data={data}
        columnFilters={columnFilters}
      />
    </>
  );
}
