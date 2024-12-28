import { getStaffs, Staff } from "@/api/staffs/staff";
import { FormDialog } from "@/components/form-dialog";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import SearchBar from "@/components/ui/search-bar";
import { ColumnFiltersState } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { createStaffTableColumns } from "../components/tables/columns";
import { DataTable } from "../components/tables/table";

export default function StaffPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [data, setData] = useState<Staff[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [editFormState, setEditFormState] = useState({
    name: "",
    username: "",
    role: "",
  });

  const handleSearchChange = (searchTerm: string) => {
    setColumnFilters((prev) => {
      const updatedFilters = prev.filter(
        (filter) => filter.id !== "staff_search"
      );
      if (searchTerm) {
        updatedFilters.push({
          id: "staff_search",
          value: searchTerm,
        });
      }
      return updatedFilters;
    });
  };

  const handleEditInputChange = (key: string, value: string) => {
    setEditFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleRemove = (staffId: number) => {
    console.log("Removing staff with ID:", staffId);
    setIsRemoveDialogOpen(true);
  };

  const handleEdit = (staffId: number) => {
    const staff = data.find((staff) => staff.staff_id === staffId);
    if (staff) {
      handleRowSelection(staff);
      setEditFormState({
        name: staff.full_name,
        username: staff.username,
        role: staff.role,
      });
    }
    setIsEditDialogOpen(true);
  };

  const handleRowSelection = (row: object) => {
    const staff = row as Staff;
    setSelectedStaff(staff);
  };

  useEffect(() => {
    getStaffs().then((data) => setData(data));
  }, []);

  return (
    <>
      <div className="flex items-center flex-col gap-3 my-6">
        <div className="flex justify-between flex-row gap-1 w-full">
          <p className="text-2xl font-semibold">Staffs</p>
          <Button
            className="flex items-center bg-teal-200 hover:bg-teal-300 text-black font-semibold"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus />
            <p>Add Staff</p>
          </Button>
          <FormDialog
            dialogTitle="Add Staff"
            dialogDescription="Add a new staff member"
            formFields={[
              {
                id: "name",
                label: "Full Name",
                type: "text",
                placeholder: "Enter full name",
                value: name,
                setValue: setName,
              },
              {
                id: "role",
                label: "Role",
                type: "select",
                placeholder: "Select role",
                value: role,
                choices: [
                  { value: "admin", label: "Admin" },
                  { value: "employee", label: "Employee" },
                ],
                setValue: setRole,
              },
              {
                id: "username",
                label: "Username",
                type: "text",
                placeholder: "Enter username",
                value: username,
                setValue: setUsername,
              },
              {
                id: "password",
                label: "Password",
                type: "password",
                placeholder: "Enter password",
                value: password,
                setValue: setPassword,
              },
              {
                id: "repassword",
                label: "Re-enter Password",
                type: "password",
                placeholder: "Re-enter password",
                value: repassword,
                setValue: setRepassword,
              },
            ]}
            isOpen={isCreateDialogOpen}
            setOpen={setIsCreateDialogOpen}
            onSubmit={() => {
              console.log("Submitting form...");
            }}
          />
        </div>

        <div className="w-full">
          <SearchBar
            value={searchTerm}
            onChange={(value: string) => {
              setSearchTerm(value);
              handleSearchChange(value);
            }}
            onSearch={() => console.log("Searching...")}
          />
        </div>
      </div>
      <DataTable
        columns={createStaffTableColumns({
          handleEdit,
          handleRemove,
        })}
        columnFilters={columnFilters}
        data={data}
        setSelectedRow={handleRowSelection}
        selectedRow={selectedStaff}
      />

      <FormDialog
        trigger={<DialogTrigger asChild />}
        dialogTitle="Edit Staff"
        dialogDescription="Edit a staff member"
        formFields={[
          {
            id: "name",
            label: "Full Name",
            type: "text",
            placeholder: "Enter full name",
            value: editFormState.name,
            setValue: (value: string) => handleEditInputChange("name", value),
          },
          {
            id: "role",
            label: "Role",
            type: "select",
            placeholder: "Select role",
            value: editFormState.role,
            choices: [
              { value: "admin", label: "Admin" },
              { value: "employee", label: "Employee" },
            ],
            setValue: (value: string) => handleEditInputChange("role", value),
          },
          {
            id: "username",
            label: "Username",
            type: "text",
            placeholder: "Enter username",
            value: editFormState.username,
            setValue: (value: string) =>
              handleEditInputChange("username", value),
          },
        ]}
        onSubmit={() => {
          console.log("Submitting form...");
        }}
        isOpen={isEditDialogOpen}
        setOpen={setIsEditDialogOpen}
      />

      <FormDialog
        trigger={<DialogTrigger asChild />}
        dialogTitle="Remove Staff"
        dialogDescription="Are you sure you want to remove this staff member?"
        formFields={[]}
        onSubmit={() => {
          console.log("Removing staff...");
        }}
        isOpen={isRemoveDialogOpen}
        setOpen={setIsRemoveDialogOpen}
      />
    </>
  );
}
