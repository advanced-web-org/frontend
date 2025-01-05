import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

type DeleteDebtDialogProps = {
  onDelete: (message: string) => Promise<void>;
  className?: string; // Allow passing a class name
};

const DeleteDebtDialog: React.FC<DeleteDebtDialogProps> = ({
  onDelete,
  className = "", // Default to an empty string
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  // Validation schema for the message input
  const validationSchema = Yup.object({
    message: Yup.string()
      .required("A message is required")
      .max(1000, "Message must be less than 1000 characters"),
  });

  const handleDelete = async (values: { message: string }, { resetForm }: any) => {
    setIsDeleting(true);
    try {
      await onDelete(values.message); // Call the delete API with the message
      resetForm(); // Reset the form after successful submission
    } catch (error) {
      console.error("Failed to delete debt:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className={className}>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Please provide a reason for deleting this debt. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Formik
          initialValues={{ message: "" }}
          validationSchema={validationSchema}
          onSubmit={handleDelete}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mt-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Deletion Reason
                </label>
                <Field
                  as="textarea"
                  name="message"
                  id="message"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
                  placeholder="Provide a reason for deletion"
                  rows={4}
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <AlertDialogFooter className="mt-4">
                <AlertDialogCancel disabled={isDeleting || isSubmitting}>Cancel</AlertDialogCancel>
                <Button
                  type="submit"
                  className="bg-red-500 text-white hover:bg-red-600"
                  disabled={isDeleting || isSubmitting}
                >
                  {isDeleting ? "Deleting..." : "Confirm"}
                </Button>
              </AlertDialogFooter>
            </Form>
          )}
        </Formik>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDebtDialog;
