import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import ExternalTransferForm from "./external-form";
import InternalTransferForm from "./internal-form";
import { Card } from "@mui/material";
import { CircleUserRound } from "lucide-react";
import { useUserStore } from "@/stores/userStore";
import { useState } from "react";

export default function TransferPage() {
  const user = useUserStore((state) => state.user);
  return (
    <div className="container mx-auto p-2">
      {/* Headers */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Within Speechless Bank Transfer</h1>
      </div>
      {/* Transfer form */}
      <div className="flex flex-col gap-6 mx-auto items-center">
        {/* Source account */}
        <div className="flex flex-col gap-2 w-1/2">
          <h2 className="text-base font-medium">Source account</h2>
          <Card className="p-4 flex gap-4 items-center">
            <CircleUserRound size={48} color="#14B8A6" />
            <div className="flex flex-col gap-1">
              <span className="font-medium">
                {user?.account_number?.replace(/(\d{4})(\d{4})(\d{3})/, "$1 $2 $3")} ({user?.fullname})
              </span>
              <span className="flex items-center font-semibold text-2xl">
                {`${user?.account_balance?.toLocaleString('vi-VN')} VNĐ`}
              </span>
            </div>
          </Card>
        </div>
        {/* Transfer to */}
        <div className="flex flex-col gap-2 w-1/2">
          <h2 className="text-base font-medium">Transfer to</h2>
          <Tabs defaultValue="internal" className="w-view flex flex-col gap-6">
            <TabsList className="flex justify-center gap-4">
              <TabsTrigger
                value="internal"
                className="w-full font-normal bg-neutral-200 data-[state=active]:bg-teal-500 data-[state=active]:text-white"
              >
                Internal Transfer
              </TabsTrigger>
              <TabsTrigger
                value="external"
                className="w-full font-normal bg-neutral-200 data-[state=active]:bg-teal-500 data-[state=active]:text-white"
              >
                External Transfer
              </TabsTrigger>
            </TabsList>

            <TabsContent value="internal">
              <InternalTransferForm />
            </TabsContent>
            <TabsContent value="external">
              <ExternalTransferForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
