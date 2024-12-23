import { getBanks } from "@/api/banks/bank";
import {
  getExternalBalance,
  getTransactions,
  Transaction,
} from "@/api/transactions/transaction";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
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

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
]
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

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
      setBanks(
        banks.map((bank) => ({ value: bank.bank_name, label: bank.bank_name }))
      );
    });

    getExternalBalance();
  }, []);

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 mb-6">
        <div className="flex flex-col gap-4 w-50">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Amount
              </CardTitle>
              <DollarSign/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
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
              <Smile/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$5,231</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lowest Transaction Amount</CardTitle>
              <Frown/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$231</div>
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
                  dataKey="visitors"
                  nameKey="browser"
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
                              {totalVisitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Visitors
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
