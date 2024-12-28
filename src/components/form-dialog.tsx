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

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  repassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Password is required"),
});

const validationFields = Object.keys(schema.fields);

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
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (data: Record<string, string>) => {
    onSubmit(data);
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
                    {...(validationFields.includes(field.type.toLowerCase())
                      ? (() => {
                          const registerField = field.type === "password" ? field.id.toLowerCase() : field.type.toLowerCase();
                          return {
                            ...register(registerField),
                            onChange: (e) => {
                              register(registerField).onChange(e);
                              field.setValue(e.target.value);
                            },
                          };
                        })()
                      : {
                          onChange: (e) => field.setValue(e.target.value),
                        })}
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
