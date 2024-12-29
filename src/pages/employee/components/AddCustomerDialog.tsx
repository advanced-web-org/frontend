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

interface AddCustomerDialogProps {
  isOpen: boolean;
  onClose: () => void;
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.fullname || !formData.email || !formData.phone) {
      setError("Please fill all fields");
    }

    const signupPayload = {
      fullName: formData.fullname,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    // Add customer
    signup(signupPayload)
      .then(() => {
        onClose();
      })
      .catch((err) => {
        setError("Failed to create customer");
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create new customer</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 pb-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fullname" className="text-right">
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
            <Label htmlFor="email" className="text-right">
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
            <Label htmlFor="phone" className="text-right">
              Phone number
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              value={formData.password}
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
    </Dialog>
  );
}
