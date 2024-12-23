import { getBanks } from "@/api/banks/bank";
import {
  getExternalBalance,
  getTransactions,
  Transaction,
} from "@/api/transactions/transaction";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MultiSelect } from "@/components/ui/multi-select";
import { ColumnFiltersState } from "@tanstack/react-table";
import { DollarSign, Frown, Smile } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { TransactionTableColumns } from "../components/tables/columns";
import { DateRangePickerComponent } from "../components/tables/date-filter";
import { DataTable } from "../components/tables/table";

import React from "react";
import { Label, Pie, PieChart } from "recharts";

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
  const [chartData, setChartData] = useState<
    { bank: string; amount: number }[]
  >([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    amount: {
      label: "Transaction Amount",
    },
  });
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [highestAmount, setHighestAmount] = useState<number>(0);
  const [lowestAmount, setLowestAmount] = useState<number>(0);

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
      setData(transactions);
    });

    getBanks().then((banks) => {
      setSelectedBanks(banks.map((bank) => bank.bank_name));
      setBanks(
        banks.map((bank) => ({ value: bank.bank_name, label: bank.bank_name }))
      );
    });

    getExternalBalance().then((response) => {
      const chartData = response.map(
        (data: any) => ({
          bank: data.bankName,
          amount: data.totalBalance,
        })
      );
      setChartData(chartData);

      chartData.forEach((data, index) => {
        chartConfig[data.bank] = {
          label: data.bank,
          color: `hsl(var(--chart-${index + 1}))`,
        };
      });

      setChartConfig(chartConfig);

      setTotalAmount(chartData.reduce((acc, data) => acc + data.amount, 0));
      setHighestAmount(
        Math.max(...chartData.map((data) => data.amount), 0)
      );
      setLowestAmount(
        Math.min(...chartData.map((data) => data.amount), Infinity)
      );
    });
  }, []);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 mb-6">
        <div className="flex flex-col gap-4 w-50">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Amount
              </CardTitle>
              <DollarSign />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalAmount}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Top Transaction Amount
              </CardTitle>
              <Smile />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${highestAmount}</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Lowest Transaction Amount
              </CardTitle>
              <Frown />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${lowestAmount}</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="flex flex-col justify-between">
          <CardHeader className="items-center pb-0">
            <CardTitle>Pie Chart - Donut with Text</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[300px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="amount"
                  nameKey="bank"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              ${totalAmount.toLocaleString()}
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col text-sm">
            <div className="leading-none text-muted-foreground">
              Showing total transaction amount
            </div>
          </CardFooter>
        </Card>
      </div>

      <div
        className="mb-4"
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
