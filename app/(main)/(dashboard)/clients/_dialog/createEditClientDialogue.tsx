"use client";
import Button from "@/app/(main)/_components/button";
import Dialog from "@/app/_components/dialog/dialog";
import { DropdownOption } from "@/app/_components/dropdown";
import Dropdown from "@/app/_components/dropdown/dropdown";
import TextAreaInput from "@/app/_components/textareainput.tsx/textareaInput";
import TextInput from "@/app/_components/textinput/textInput";
import { removeEmptyStrings } from "@/app/_utils/removeEmptyStrings";
import ClientService from "@/services/client.service";
import { CreateClientBody, ErrorBody } from "@/services/dto/client.dto";
import { AxiosError } from "axios";
import { JSX, useEffect, useState } from "react";
import { toast } from "sonner";

interface props {
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
  refresh: () => void;
}

export default function CreateEditDialogue(props: props): JSX.Element {
  const paymentTermsStaticOptions: DropdownOption[] = [
    { label: "Net 14", value: 14 },
    { label: "Net 30", value: 30 },
    { label: "Net 60", value: 60 },
    { label: "Due on receipt", value: 0 },
  ];

  const staticCurrencyOptions: DropdownOption[] = [
    { label: "USD ($)", value: "USD" },
    { label: "JPY (¥)", value: "JPY" },
    { label: "IDR (Rp)", value: "IDR" },
  ];

  const [form, setForm] = useState<CreateClientBody>({
    name: "",
    email: "",
    company: "",
    phone: "",
    address: "",
    notes: "",
    currency: "",
    paymentTerms: -1,
  });

  const [errors, setErrors] = useState<ErrorBody>({
    name: "",
    email: "",
    phone: "",
    currency: "",
    paymentTerms: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [stayAfterSubmit, setStayAfterSubmit] = useState<boolean>(false);

  const isValid = (): boolean => {
    const errors: ErrorBody = {};

    if (!form.name) {
      errors.name = "Name is required";
    }

    if (!form.email) {
      errors.email = "Email is required";
    }

    if (!form.phone) {
      errors.phone = "Phone is required";
    }

    if (!form.currency) {
      errors.currency = "Currency is required";
    }

    if (form.paymentTerms === -1) {
      errors.paymentTerms = "Payment terms is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    field: keyof CreateClientBody,
    value: string | number
  ) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const clearForm = () => {
    setForm({
      name: "",
      email: "",
      company: "",
      phone: "",
      address: "",
      notes: "",
      currency: "",
      paymentTerms: -1,
    });
    setErrors({
      name: "",
      email: "",
      phone: "",
      currency: "",
      paymentTerms: "",
    });
  };

  const handleSubmit = async (): Promise<void> => {
    if (!isValid()) {
      return;
    }

    const cleanedForm = removeEmptyStrings(form);

    setLoading(true);
    try {
      await ClientService.createClients(cleanedForm as CreateClientBody);
      toast.success("Success, client created");

      clearForm();

      if (!stayAfterSubmit) {
        props.setVisible(false);
      }

      props.refresh();
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        if (
          error.response?.status === 409 &&
          error.response.data.message.includes("email")
        ) {
          setErrors({
            ...errors,
            email: "Email already exists",
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (props.isVisible) {
      clearForm();
      setStayAfterSubmit(false);
    }
  }, [props.isVisible]);

  return (
    <Dialog
      isVisible={props.isVisible}
      setVisible={props.setVisible}
      header="New Client"
      closable
      width={600}
      default={
        <div className="flex flex-col gap-6">
          <div className="flex gap-4">
            <TextInput
              label="Name"
              field="name"
              placeholder="John Doe or Company Name"
              model={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              invalid={errors.name}
              disabled={loading}
              mandatory
            />

            <TextInput
              label="Email"
              field="email"
              model={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="client@example.com"
              invalid={errors.email}
              disabled={loading}
              mandatory
            />
          </div>

          <div className="flex gap-4">
            <TextInput
              label="Company"
              field="company"
              model={form.company}
              onChange={(e) => handleChange("company", e.target.value)}
              placeholder="Company Inc. (Optional)"
              disabled={loading}
              invalid={errors.company}
            />

            <TextInput
              label="Phone"
              field="phone"
              model={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+1 (555) 123-4567"
              invalid={errors.phone}
              disabled={loading}
              mandatory
              number
            />
          </div>

          <TextAreaInput
            label="Address"
            field="address"
            model={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="123 Main St, Anytown, USA"
            invalid={errors.address}
            disabled={loading}
            rows={3}
          />

          <div className="flex gap-4">
            <Dropdown
              label="Default Payment Terms"
              value={form.paymentTerms}
              options={paymentTermsStaticOptions}
              placeholder="Select default payment terms"
              onChange={(e) => handleChange("paymentTerms", Number(e))}
              disabled={loading}
              invalid={errors.paymentTerms}
              mandatory
            />

            <Dropdown
              label="Currency"
              value={form.currency}
              placeholder="Select currency"
              options={staticCurrencyOptions}
              onChange={(e) => handleChange("currency", e)}
              invalid={errors.currency}
              disabled={loading}
              mandatory
            />
          </div>

          <TextAreaInput
            label="Notes"
            field="notes"
            model={form.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            placeholder="Any additional notes about this client..."
            invalid={errors.notes}
            rows={3}
            disabled={loading}
          />
        </div>
      }
      footer={
        <div className="flex flex-col justify-end items-end mt-4">
          <div className="flex gap-1 items-center text-sm text-gray-500">
            <span>Stay after submit</span>
            <input
              type="checkbox"
              checked={stayAfterSubmit}
              className="w-4 h-4 hover:cursor-pointer"
              onChange={(e) => setStayAfterSubmit(e.target.checked)}
            />
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex gap-2">
              <Button
                severity="dark"
                label="Clear"
                onClick={clearForm}
                loading={loading}
              />
              <Button
                severity="success"
                label="Save"
                onClick={handleSubmit}
                loading={loading}
              />
            </div>
          </div>
        </div>
      }
    />
  );
}
