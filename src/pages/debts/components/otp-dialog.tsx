import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

type OtpDialogProps = {
  onPay: (otpCode: string) => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  isPaying: boolean;
  error: string | null;
};

const OtpDialog: React.FC<OtpDialogProps> = ({ onPay, isOpen, onClose, isPaying, error }) => {
  const validationSchema = Yup.object({
    otp: Yup.string()
      .required("OTP is required")
      .matches(/^\d{6}$/, "OTP must be a 6-digit code"),
  });

  const handlePay = async (values: { otp: string }, { resetForm }: any) => {
    try {
      await onPay(values.otp);
      resetForm();
    } catch (err) {
      // Errors are handled in the parent via `error` prop
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
          validateOnChange
          validateOnBlur
          onSubmit={handlePay}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form noValidate>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Enter the OTP code sent to your registered email to proceed with the payment.
                </p>
                <Field
                  type="text"
                  name="otp"
                  className={`w-full mt-2 p-2 border ${errors.otp && touched.otp ? "border-red-500" : "border-gray-300"
                    } bg-white rounded-md`}
                  placeholder="Enter OTP"
                />
                <ErrorMessage
                  name="otp"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>
              <AlertDialogFooter className="mt-4">
                <AlertDialogCancel disabled={isPaying || isSubmitting}>Cancel</AlertDialogCancel>
                <Button
                  type="submit"
                  disabled={isSubmitting || isPaying}
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  {isPaying ? (
                    <l-ring size="20" stroke="2" speed="2" color="white" />
                  ) : (
                    "Confirm"
                  )}
                </Button>
              </AlertDialogFooter>
            </Form>
          )}
        </Formik>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OtpDialog;
