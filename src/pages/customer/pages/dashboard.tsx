import { useState } from "react";
import { Eye, EyeOff, Send, History, Landmark, Banknote, BadgeDollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useUserStore } from "@/stores/userStore";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const user = useUserStore((state) => state.user);
  const [isBalanceHidden, setIsBalanceHidden] = useState(true);

  const toggleBalanceVisibility = () => {
    setIsBalanceHidden(!isBalanceHidden);
  };

  return (
    <div className="container mx-auto p-2 flex flex-col justify-start gap-10">
      {/* Header */}
      <div className="">
        <h1 className="text-2xl font-semibold">Welcome, {user?.fullname || 'Customer'}</h1>
      </div>
      {/* Account */}
      <div className="flex flex-col gap-4">
        <h2 className="text-base font-medium">Payment account</h2>
        <Card className="max-w-sm p-4 flex flex-col gap-3 justify-between">
          <div>
            <div className="flex items-center gap-4">
              <Landmark size={20} color="#81dbe3"/>
              <span className="font-medium">
                {user?.account_number?.replace(/(\d{4})(\d{4})(\d{3})/, "$1 $2 $3")}
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center mt-2 gap-3 w-full justify-between">
              <div className="flex items-center gap-4">
                <Banknote size={20} color="#81dbe3" />
                <span className="flex items-center font-semibold text-2xl">
                {isBalanceHidden ? "******** USD" : `${Number(user?.account_balance).toLocaleString('vi-VN')} USD`}
                </span>
              </div>
              <Button variant="ghost" className="ml-2" onClick={toggleBalanceVisibility}>
                {isBalanceHidden ? <EyeOff size={22} color="#81dbe3" /> : <Eye size={20} color="#81dbe3" />}
              </Button>
            </div>
          </div>
        </Card>
      </div>
      {/* Services */}
      <div className="flex flex-col gap-4">
        <h2 className="text-base font-medium">Services</h2>
        <div className="flex gap-10">
          <Card className="flex flex-col gap-2 p-4 items-center justify-center w-40 h-32">
            <Send size={28} color="#573681" />
            <span className="text-base font-medium">Internal Transfer</span>
          </Card>
          <Card className="flex flex-col gap-2 p-4 items-center justify-center w-40 h-32">
            <BadgeDollarSign size={28} color="#eddc83" />
            <span className="text-base font-medium">External Transfer</span>
          </Card>
          <Card className="flex flex-col gap-2 p-4 items-center justify-center w-40 h-32">
            <History size={28} color="#f69039" />
            <span className="text-base font-medium">History</span>
          </Card>
        </div>
      </div>
    </div>
  );
}