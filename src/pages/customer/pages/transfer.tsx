import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";

export default function TransferPage() {
  const [receiverAccountNumber, setReceiverAccountNumber] = useState("");
  const [receiverBankName, setReceiverBankName] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionMessage, setTransactionMessage] = useState("");

  return (
    <div className="px-40">
      <h1 className="text-3xl font-semibold text-center pb-3">Transfer</h1>
      <Tabs defaultValue="internal" className="w-view">
        <TabsList className="flex justify-center gap-4 pb-4">
          <TabsTrigger
            value="internal"
            className=" w-full font-normal bg-neutral-200 data-[state=active]:bg-teal-500 data-[state=active]:text-white"
          >
            Internal Transfer
          </TabsTrigger>
          <TabsTrigger
            value="external"
            className=" w-full font-normal bg-neutral-200 data-[state=active]:bg-teal-500 data-[state=active]:text-white"
          >
            External Transfer
          </TabsTrigger>
        </TabsList>

        <TabsContent value="internal" className="grid gap-4">
          <div className="flex flex-row gap-2 justify-between items-center h-7">
            <Label className="w-fit">Your account</Label>
            <p className="w-2/3">019210923933</p>
          </div>

          <div className="flex flex-row gap-2 justify-between items-center h-7">
            <Label className="w-fit">Your balance</Label>
            <p className="w-2/3 font-bold text-teal-800">1.283.222 $</p>
          </div>

          <div className="flex flex-row gap-2 justify-between items-center h-9">
            <Label>Receiver account bank</Label>
            <p className="w-2/3 font-bold">Speechless Bank</p>
          </div>

          <div className="flex flex-row gap-2 justify-between items-center">
            <Label>Receiver account number</Label>
            <Input
              id="to_bank_id"
              type="text"
              placeholder="Account number"
              className="w-2/3"
            ></Input>
          </div>
          <div className="flex flex-row gap-2 justify-between items-center">
            <Label>Transfer amount</Label>
            <Input
              id="transaction_amount"
              type="text"
              placeholder="Amount"
              className="w-2/3"
            ></Input>
          </div>
          <div className="flex flex-row gap-2 justify-between items-center">
            <Label>Message</Label>
            <Input
              id="transaction_message"
              type="text"
              placeholder="Your message"
              className="w-2/3 h-40"
            ></Input>
          </div>
          <div className="flex gap-2 justify-center">
            <Button size={"freesize"} className="h-10 w-1/2">
              Transfer
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="external" className="grid gap-4">
          <div className="flex flex-row gap-2 justify-between items-center h-7">
            <Label className="w-fit">Your account</Label>
            <p className="w-2/3">019210923933</p>
          </div>

          <div className="flex flex-row gap-2 justify-between items-center h-7">
            <Label className="w-fit">Your balance</Label>
            <p className="w-2/3 font-bold text-teal-800">1.283.222 $</p>
          </div>

          <div className="flex flex-row gap-2 justify-between items-center">
            <Label>Receiver account bank</Label>
            <Input
              id="to_bank_id"
              type="text"
              placeholder="Bank name"
              className="w-2/3"
            ></Input>
          </div>

          <div className="flex flex-row gap-2 justify-between items-center">
            <Label>Receiver account number</Label>
            <Input
              id="to_bank_name"
              type="text"
              placeholder="Account number"
              className="w-2/3"
            ></Input>
          </div>

          <div className="flex flex-row gap-2 justify-between items-center">
            <Label>Transfer amount</Label>
            <Input
              id="transaction_amount"
              type="text"
              placeholder="Amount"
              className="w-2/3"
            ></Input>
          </div>

          <div className="flex flex-row gap-2 justify-between items-center">
            <Label>Message</Label>
            <Input
              id="transaction_message"
              type="text"
              placeholder="Your message"
              className="w-2/3 h-40"
            ></Input>
          </div>

          <div className="flex gap-2 justify-center">
            <Button size={"freesize"} className="h-10 w-1/2">
              Transfer
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
