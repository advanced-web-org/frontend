import { DataTable } from "../components/tables/table";
import { StaffTableColumns } from "../components/tables/columns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "@mui/material";
import { Plus } from "lucide-react";
import React from "react";
import SearchBar from "@/components/ui/search-bar";

export default function StaffPage() {
  const data = [
    {
      staff_id: 1,
      full_name: "John Doe",
      role: "Admin",
      username: "johndoe",
    },
    {
      staff_id: 2,
      full_name: "Jane Doe",
      role: "Staff",
      username: "janedoe",
    },
  ];

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <>
      {/* <p className="text-2xl pt-1 pb-3 font-semibold mx-6">Staffs</p> */}
      <div className="flex items-center flex-col gap-3 mx-6 my-6">
        <div className="flex justify-between flex-row gap-1 w-full">
          <p className="text-2xl font-semibold">Staffs</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center bg-teal-200 hover:bg-teal-300 text-black font-semibold">
                <Plus></Plus>
                <p>Add Staff</p>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Staff</DialogTitle>
                <DialogDescription>
                  Enter staff details and click Submit.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="grid gap-4 py-4"
              >
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right" htmlFor="name">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right" htmlFor="phone">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="123-456-7890"
                    className="col-span-3"
                    required
                  />
                </div>
              </form>
              <DialogFooter className="sm:justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="bg-teal-200 hover:bg-teal-300 text-black"
                >
                  Submit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="w-full">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onSearch={() => console.log("Searching...")}
          />
        </div>
      </div>
      <DataTable columns={StaffTableColumns} data={data} />
    </>
  );
}
