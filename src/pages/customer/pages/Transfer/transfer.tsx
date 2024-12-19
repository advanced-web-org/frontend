import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import InternalTransferForm from "./internal-form";
import ExternalTransferForm from "./external-form";
import { useBankStore } from "@/stores/bankStore";
import { useEffect } from "react";

export default function TransferPage() {


  return (
    <div className="px-40">
      <h1 className="text-3xl font-semibold text-center pb-3">Transfer</h1>
      <Tabs defaultValue="internal" className="w-view">
        <TabsList className="flex justify-center gap-4 pb-4">
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
  );
}
