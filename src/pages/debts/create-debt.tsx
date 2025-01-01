import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getCustomerByAccountNumber } from "@/api/customers/customer";
import { bouncy } from "ldrs";
import { createDebt } from "./api/debt.api";
import { toast } from "sonner";
import { useUserStore } from "@/stores/userStore";
import { useNavigate } from "react-router-dom";

const CreateDebt = () => {
  let userStore = useUserStore((state) => state.user);

  userStore = {
    id: 2,
    fullname: "John Doe",
    email: "",
    phone: "",
    role: "",
    bank_id: 1,
    accessToken: "",
    account_number: "1234567890",
    account_balance: 1000,
  }

  const navigate = useNavigate();

  bouncy.register();
  const [accountNumber, setAccountNumber] = useState<string | null>(null);
  const [isSelfDebt, setIsSelfDebt] = useState<boolean>(false);

  const { data: customer, isLoading, isError } = useQuery({
    queryKey: ["customer", accountNumber],
    queryFn: () => getCustomerByAccountNumber(accountNumber!),
    enabled: !!accountNumber,
    retry: 2,
  });

  useEffect(() => {
    if (customer?.customer_id === userStore?.id) {
      setIsSelfDebt(true);
      toast.error("You cannot create a debt reminder for yourself.");
    } else {
      setIsSelfDebt(false);
    }
  }, [customer]);

  const validationSchema = Yup.object({
    account_number: Yup.string().required("Account number is required"),
    debt_amount: Yup.number()
      .positive("Amount must be positive")
      .required("Amount is required"),
    debt_message: Yup.string()
      .max(255, "Message must be 255 characters or less")
      .required("Message is required"),
  });

  // Handle form submission
  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      if (!customer || isSelfDebt) {
        toast.error("Please correct the account number before submitting.");
        return;
      }

      const debt = {
        creditor_id: userStore?.id,
        debtor_id: customer.customer_id,
        debt_amount: values.debt_amount,
        debt_message: values.debt_message,
      };

      const response = await createDebt(debt);
      console.log("Debt created successfully:", response);

      // Show success message
      toast("Debt reminder created successfully!");

      resetForm(); // Reset the form after successful submission
      setAccountNumber(""); // Clear the account number field
      navigate("/user/debt"); // Redirect to the debts page
    } catch (error) {
      console.error("Error creating debt:", error);
      // Show error message or handle error logic here
      toast.error("Failed to create debt reminder. Please try again.");
    }
  };

  const handleAccountNumberOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value) setAccountNumber(value); // Set the accountNumber as a string
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Create Debt Reminder
      </h1>

      <Formik
        initialValues={{
          account_number: "",
          debt_amount: "",
          debt_message: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            {/* Account Number Input */}
            <div>
              <label
                htmlFor="account_number"
                className="block font-medium text-gray-700"
              >
                Account Number
              </label>
              <Field
                type="text"
                name="account_number"
                id="account_number"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter account number"
                onBlur={handleAccountNumberOnBlur}
              />
              <ErrorMessage
                name="account_number"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
              {isLoading && <l-bouncy size="20" speed="1.75" color="black"></l-bouncy>}
              {customer && !isSelfDebt && (
                <p className="text-green-500 text-sm mt-1">
                  Full name: {customer.full_name}
                </p>
              )}
              {isSelfDebt && (
                <p className="text-red-500 text-sm mt-1">
                  You cannot create a debt reminder for yourself.
                </p>
              )}
              {isError && !isSelfDebt && (
                <p className="text-red-500 text-sm mt-1">Account not found</p>
              )}
            </div>

            {/* Debt Amount */}
            <div>
              <label
                htmlFor="debt_amount"
                className="block font-medium text-gray-700"
              >
                Amount (USD)
              </label>
              <Field
                type="number"
                name="debt_amount"
                id="debt_amount"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter amount"
              />
              <ErrorMessage
                name="debt_amount"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="debt_message"
                className="block font-medium text-gray-700"
              >
                Message
              </label>
              <Field
                as="textarea"
                name="debt_message"
                id="debt_message"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write a message"
                rows="4"
              />
              <ErrorMessage
                name="debt_message"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600"
                disabled={isSubmitting || isSelfDebt}
              >
                {isSubmitting ? "Creating..." : "Create Reminder"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateDebt;
