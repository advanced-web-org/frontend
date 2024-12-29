import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Combobox } from "./combobox";

interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  choices?: { value: string; label: string }[];
  setValue: (value: string) => void;
}

interface FormDialogProps {
  trigger?: JSX.Element;
  dialogTitle: string;
  dialogDescription: string;
  formFields: FormField[];
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  onSubmit: (data: Record<string, string>) => void;
}

const validationFields = {
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  repassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Password is required"),
  name: yup.string().required("Name is required"),
  username: yup.string().required("Username is required"),
}

const createSchema = (fields: FormField[]) => {
  const schema = fields.reduce((acc, field) => {
    if (field.type === "select") {
      return acc;
    }

    return {
      ...acc,
      [field.id]: validationFields[field.id as keyof typeof validationFields],
    };
  }, {} as Record<string, yup.StringSchema>);

  return yup.object().shape(schema);
};

export const FormDialog: React.FC<FormDialogProps> = ({
  trigger = <DialogTrigger asChild />,
  dialogTitle,
  dialogDescription,
  formFields,
  isOpen,
  setOpen,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createSchema(formFields)),
  });

  const handleFormSubmit = (data: { [x: string]: string | undefined }) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== undefined)
    ) as Record<string, string>;
    onSubmit(filteredData);
    setOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setOpen(false)}>
      {trigger}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="grid gap-4 py-4"
        >
          {formFields.map((field) => (
            <div key={field.id} className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor={field.id}>
                {field.label}
              </Label>
              <div className="col-span-3">
                {field.type === "select" ? (
                  <Combobox
                    choices={
                      field.choices as { value: string; label: string }[]
                    }
                    label={field.placeholder}
                    value={field.value}
                    onSelect={(value) => field.setValue(value)}
                  />
                ) : (
                  // Render Input
                  <Input
                    id={field.id}
                    type={field.type}
                    value={field.value}
                    placeholder={field.placeholder}
                    {...register(field.id)}  // Register the field properly here
                    onChange={(e) => {
                      field.setValue(e.target.value);
                    }}
                  />
                )}
                {/* Display error message */}
                {errors[field.id as keyof typeof errors] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field.id as keyof typeof errors]?.message as string}
                  </p>
                )}
              </div>
            </div>
          ))}
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
        </form>
      </DialogContent>
    </Dialog>
  );
};
