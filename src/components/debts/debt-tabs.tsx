import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export enum Tab {
  DEBTOR = 'DEBTOR',
  CREDITOR = 'CREDITOR',
}

type Props = {
  setTab: (tab: Tab) => void;
}

const DebtTabs: React.FC<Props> = (props) => {
  const { setTab } = props;

  return (
    <Tabs defaultValue="debtor" className="w-full">
      <TabsList>
        <TabsTrigger value="debtor" onClick={() => setTab(Tab.DEBTOR)}>You are the debtor</TabsTrigger>
        <TabsTrigger value="creditor" onClick={() => setTab(Tab.CREDITOR)}>You are the creditor</TabsTrigger>
      </TabsList>
    </Tabs>

  );
};

export default DebtTabs;