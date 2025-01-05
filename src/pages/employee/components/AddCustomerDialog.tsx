import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { signup } from "@/api/auth/auth";
import { CircleCheckBig } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AddCustomerDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CustomerResponse {
  fullName: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  account_number: string | undefined;
  account_balance: number | undefined;
}

export function AddCustomerDialog({
  isOpen,
  onClose,
}: Readonly<AddCustomerDialogProps>) {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [customer, setCustomer] = useState<CustomerResponse | null>({
    fullName: "",
    email: "",
    phone: "",
    account_number: "",
    account_balance: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.fullname || !formData.email || !formData.phone) {
      setError("Please fill all fields");
    }

    const signupPayload = {
      fullName: formData.fullname,
      email: formData.email,
      phone: formData.phone,
      password: "",
    };

    // Add customer
    await signup(signupPayload)
      .then((res) => {
        setCustomer({
          fullName: res.fullname,
          email: res.email,
          phone: res.phone,
          account_number: res.account_number,
          account_balance: res.account_balance,
        });
        setSuccess(true);
      })
      .catch((err) => {
        setError("Failed to create customer");
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {success ? (
        <DialogContent className="flex justify-center items-center flex-col pt-10">
          <div className="flex flex-col items-center">
            <CircleCheckBig className="text-green-600" size={80} />
            <div className="text-green-600 text-2xl font-semibold">
              New customer created
            </div>
          </div>
          <Card className="flex flex-row p-4 mt-4 gap-10 border border-gray-400">
            <div>
              <div className="text-2xl font-bold">{customer?.fullName}</div>
              <div className="text-sm mb-3">{customer?.email}</div>
              <div className="">
                Phone number:{"  "}
                <span className="font-bold">{customer?.phone}</span>
              </div>
              <div className="">
                Default password: {"  "}
                <span className="font-bold">123456</span>
              </div>
              <div className="">
                Account number: {"  "}
                <span className="font-bold">{customer?.account_number}</span>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Avatar className="w-24 h-24">
                <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
                <AvatarFallback>{formData.fullname[0]}</AvatarFallback>
              </Avatar>
            </div>
          </Card>
          <Button onClick={onClose} variant="default">
            Close
          </Button>
        </DialogContent>
      ) : (
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Create new customer</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 pb-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullname" className="text-left">
                Full name
              </Label>
              <Input
                id="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-left">
                Email
              </Label>
              <Input
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-left">
                Phone number
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSubmit} variant="default">
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
