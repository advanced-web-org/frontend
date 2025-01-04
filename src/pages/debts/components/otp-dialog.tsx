import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

type OtpDialogProps = {
  debtId: number;
  onPay: (otpCode: string) => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
};

const OtpDialog: React.FC<OtpDialogProps> = ({
  debtId,
  onPay,
  isOpen,
  onClose,
}) => {
  const validationSchema = Yup.object({
    otp: Yup.string()
      .required("OTP is required")
      .matches(/^\d{6}$/, "OTP must be a 6-digit code"),
  });

  const handlePay = async (values: { otp: string }, { resetForm }: any) => {
    try {
      await onPay(values.otp); // Call the API with debtId and OTP
      resetForm();
      onClose(); // Close the dialog on success
    } catch (error) {
      console.error("Failed to pay debt:", error);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
        </AlertDialogHeader>
        <Formik
          initialValues={{ otp: "" }}
          validationSchema={validationSchema}
          onSubmit={handlePay}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Enter the OTP code sent to your registered email to proceed
                  with the payment.
                </p>
                <Field
                  type="text"
                  name="otp"
                  className="w-full mt-2 p-2 border border-gray-300 bg-white rounded-md"
                  placeholder="Enter OTP"
                />
                <ErrorMessage
                  name="otp"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <AlertDialogFooter className="mt-4">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black text-white hover:bg-gray-600"
                  >
                    {isSubmitting ? "Processing..." : "Confirm"}
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </Form>
          )}
        </Formik>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OtpDialog;
