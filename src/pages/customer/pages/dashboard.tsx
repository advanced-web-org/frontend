import { useState } from "react";
import { Eye, EyeOff, Send, History } from "lucide-react";
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
    <div className="container mx-auto p-4">
      <Card className="max-w-md mx-auto p-4 flex flex-col gap-3 justify-between">
        <div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">
              {user?.account_number?.replace(/(\d{4})(\d{4})(\d{3})/, "$1 $2 $3")}
            </span>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center w-3/5 mt-2">
            <span className="flex items-center font-semibold text-2xl">
              {isBalanceHidden ? "******** VNĐ" : `${user?.account_balance?.toLocaleString('vi-VN')} VNĐ`}
            </span>
            <Button variant="ghost" className="ml-2" onClick={toggleBalanceVisibility}>
              {isBalanceHidden ? <EyeOff size={22} /> : <Eye size={20} />}
            </Button>
          </div>
        </div>
        <div className="flex justify-around items-center mt-4">
          <Button variant="ghost" className="flex flex-col space-y-0 gap-1">
            <Send size={18} />
            <span className="mt-1 text-xs">Transfer</span>
          </Button>
          <Button variant="ghost" className="flex flex-col space-y-0 gap-1">
            <History size={18} />
            <span className="mt-1 text-xs">TRXN history</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}