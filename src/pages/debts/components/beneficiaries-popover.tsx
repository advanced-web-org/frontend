import { getBeneficiaries } from "@/api/beneficiaries/beneficiary";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { RiContactsBook3Line } from "react-icons/ri";

interface BeneficiariesPopoverProps {
  onAccountPick: (account_number: string) => void;
}

const BeneficiariesPopover: React.FC<BeneficiariesPopoverProps> = ({ onAccountPick }: BeneficiariesPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: beneficiaries, isLoading, isError } = useQuery({
    queryKey: ["beneficiariesForDebt"],
    queryFn: getBeneficiaries,
  });

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="p-0">
        <RiContactsBook3Line size={32} className="cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent
        className="w-80 bg-white shadow-md rounded-md z-50 overflow-y-auto max-h-96 p-0"
        align="start"
        side="left"
      >
        <div className="popover-header p-3 shadow-md sticky top-0 bg-white border-b border-gray-200 text-lg font-bold text-gray-500">
          Your beneficiaries
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error loading beneficiaries</div>
        ) : (
          <div className="p-2">
            {beneficiaries?.map((beneficiary) => (
              <div
                key={beneficiary.beneficiary_id}
                className="flex items-center justify-between p-2
                border-b border-gray-200
                hover:bg-gray-100 cursor-pointer
                "
                onClick={() => {
                  onAccountPick(beneficiary.account_number)
                  setIsOpen(false)
                }}
              >
                <div>
                  <h3 className="text-md font-semibold">{beneficiary.nickname}</h3>
                  <p className="text-sm text-gray-500">{beneficiary.account_number} - {beneficiary.bank_name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default BeneficiariesPopover;