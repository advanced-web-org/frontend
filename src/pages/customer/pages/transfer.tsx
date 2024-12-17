import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

export default function TransferPage() {
  return (
    <div className="px-80">
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
          <div className="grid gap-2">
            <Label>Sender account number</Label>
            <Input
              id="from_bank_id"
              type="text"
              placeholder="93182391823"
              disabled
            ></Input>
          </div>
          <div className="grid gap-2">
            <Label>Receiver account number</Label>
            <Input
              id="to_bank_id"
              type="text"
              placeholder="Account number"
            ></Input>
          </div>
          <div className="grid gap-2">
            <Label>Transfer amount</Label>
            <Input id="transaction_amount" type="text" placeholder=""></Input>
          </div>
          <div className="grid gap-2">
            <Label>Message</Label>
            <Input
              id="transaction_message"
              type="text"
              placeholder="Your message"
              className="h-40"
            ></Input>
          </div>
          <Button>Transfer</Button>
        </TabsContent>

        <TabsContent value="external" className="grid gap-4">
          <div className="grid gap-2">
            <Label>Sender account number</Label>
            <Input
              id="from_bank_id"
              type="text"
              placeholder="93182391823"
              disabled
            ></Input>
          </div>
          <div className="grid gap-2">
            <Label>Receiver account bank</Label>
            <Input id="to_bank_id" type="text" placeholder="Bank name"></Input>
          </div>
          <div className="grid gap-2">
            <Label>Receiver account number</Label>
            <Input
              id="to_bank_name"
              type="text"
              placeholder="Account number"
            ></Input>
          </div>
          <div className="grid gap-2">
            <Label>Transfer amount</Label>
            <Input id="transaction_amount" type="text" placeholder=""></Input>
          </div>
          <div className="grid gap-2">
            <Label>Message</Label>
            <Input
              id="transaction_message"
              type="text"
              placeholder="Your message"
              className="h-40"
            ></Input>
          </div>
          <Button>Transfer</Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
