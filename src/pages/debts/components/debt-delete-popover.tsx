import { FaInfoCircle } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Debt } from "../types/debt.type";

export const DebtDeletePopover = ({ debt }: { debt: Debt }) => {
  const { debtDeletion } = debt;
  const { delete_message: delete_reason, created_at: delete_date } = debtDeletion || {};

  return (
    <Popover>
      <PopoverTrigger className="p-0">
        <FaInfoCircle size={20} className="cursor-pointer text-gray-500" />
      </PopoverTrigger>
      <PopoverContent
          className="w-80 bg-white p-4 shadow-md rounded-md z-50"
          align="end"
          side="bottom"
        >
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Delete Details</h3>
          <p>
            <span className="font-medium">Reason: </span>
            {delete_reason || "No reason provided"}
          </p>
          <p>
            <span className="font-medium">Deleted On: </span>
            {delete_date ? new Date(delete_date).toLocaleString() : "N/A"}
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
};
