"use client";
import Dialog from "@/app/_components/dialog";
import TextAreaInput from "@/app/_components/textareaInput";
import TextInput from "@/app/_components/textInput";
import { CreateClientBody } from "@/services/dto/client.dto";
import { JSX, useState } from "react";

interface props {
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
}

export default function CreateEditDialogue(props: props): JSX.Element {
  const [form, setForm] = useState<CreateClientBody>({
    name: "",
    email: "",
    company: "",
    phone: "",
    address: "",
    notes: "",
    currency: "",
    paymentTerms: 0,
  });

  const [validation, setValidation] = useState<CreateClientBody>(form);

  const handleTextInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setValidation({ ...validation, [e.target.name]: "" });
  };

  return (
    <>
      <Dialog
        isVisible={props.isVisible}
        setVisible={props.setVisible}
        header="New Client"
        default={
          <div className="flex flex-col gap-6">
            <div className="flex gap-4 ">
              <TextInput
                label="Name"
                field="name"
                placeholder="John Doe or Company Name"
                model={form.name}
                onChange={(e) => handleTextInputChange(e)}
                mandatory
              />

              <TextInput
                label="Email"
                field="email"
                model={form.email}
                onChange={(e) => handleTextInputChange(e)}
                placeholder="client@example.com"
                mandatory
              />
            </div>

            <div className="flex gap-4">
              <TextInput
                label="Company"
                field="company"
                model={form.company}
                onChange={(e) => handleTextInputChange(e)}
                placeholder="Company Inc. (Optional)"
              />

              <TextInput
                label="Phone"
                field="phone"
                model={form.phone}
                onChange={(e) => handleTextInputChange(e)}
                placeholder="+1 (555) 123-4567"
                mandatory
              />
            </div>

            <TextAreaInput 
            label="Address"
            field="address"
            model={form.address}
            onChange={(e) => handleTextInputChange(e)}
            placeholder="123 Main St, Anytown, USA" 
            rows={3}
            />
          </div>
        }
        isClosable
        width={600}
      />
    </>
  );
}
