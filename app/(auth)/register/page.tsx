"use client";
import { JSX, useState } from "react";
import { FaRegCircle } from "react-icons/fa6";
import { RegisterBody } from "../auth.dto";
import { FaCheck } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import Button from "@/app/(main)/_components/button";
import { FaGithub } from "react-icons/fa";

export default function Register(): JSX.Element {
  const [form, setForm] = useState<RegisterBody>({
    fullName: "",
    email: "",
    password: "",
  });

  const [isAgreeToTerms, setIsAgreeToTerms] = useState<boolean>(false);

  const [validation, setValidation] = useState<
    RegisterBody & { isAgreeToTerms: string }
  >({
    fullName: "",
    email: "",
    password: "",
    isAgreeToTerms: "",
  });

  const inputMapping: {
    label: string;
    type: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    key: keyof RegisterBody;
  }[] = [
    {
      label: "Full Name",
      type: "text",
      placeholder: "Jane Doe",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, fullName: e.target.value });
        setValidation({
          ...validation,
          fullName: "",
        });
      },
      key: "fullName",
    },
    {
      label: "Email",
      type: "email",
      placeholder: "you@example.com",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, email: e.target.value });
        setValidation({
          ...validation,
          email: "",
        });
      },
      key: "email",
    },
    {
      label: "Password",
      type: "password",
      placeholder: "Create a strong password",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, password: e.target.value });
        setValidation({
          ...validation,
          password: "",
        });
      },
      key: "password",
    },
  ];

  const validationMapping = [
    {
      label: "At least 8 characters",
      validation: form.password.length >= 8,
    },
    {
      label: "One uppercase letter",
      validation: /[A-Z]/.test(form.password),
    },
    {
      label: "One number",
      validation: /\d/.test(form.password),
    },
    {
      label: "One special character",
      validation: /[!@#$%^&*(),.?":{}|<>]/.test(form.password),
    },
  ];

  const formValidation = (): boolean => {
    const errors: RegisterBody & { isAgreeToTerms: string } = {
      fullName: "",
      email: "",
      password: "",
      isAgreeToTerms: "",
    };

    if (!form.fullName) {
      errors.fullName = "Full name is required";
    }

    if (!form.email) {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        errors.email = "Invalid email format";
      }
    }

    if (!form.password) {
      errors.password = "Password is required";
    } else if (form.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(form.password)) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (!/\d/.test(form.password)) {
      errors.password = "Password must contain at least one number";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(form.password)) {
      errors.password = "Password must contain at least one special character";
    }

    if (!isAgreeToTerms) {
      errors.isAgreeToTerms = "You must agree to the terms and conditions";
    }

    setValidation(errors);

    return !errors.fullName && !errors.email && !errors.password;
  };

  const handleSubmit = (): void => {
    formValidation();
    const isValid = Object.values(validation).every((value) => !value);

    if (isValid) {
      console.log(form);
    }
  };
  return (
    <>
      <div className="p-15 flex flex-col items-center justify-start flex-1 h-full">
        <div className="max-w-[450px] w-full mt-4">
          <div className="flex flex-col gap-2.5">
            <span className="text-3xl font-bold">Create Your Account</span>
            <span className="text-gray-500 text-sm">
              Start your free trial today
            </span>
          </div>

          <div className="flex flex-col mt-7.5 gap-5">
            {inputMapping.map((input, index) => (
              <div key={index} className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-500">{input.label}</label>
                <input
                  type={input.type}
                  value={form[input.key]}
                  className={`w-full ring ring-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-blue-500 focus:ring-2 ${
                    validation[input.key] && "ring-red-500 outline-0"
                  }`}
                  placeholder={input.placeholder}
                  onChange={input.onChange}
                />
                <span className="text-xs text-red-500">
                  {validation[input.key]}
                </span>
              </div>
            ))}

            <div className="flex flex-col p-4 rounded-md bg-gray-100">
              <span className="text-xs font-semibold">
                Password must contain:
              </span>

              <div className="flex flex-col gap-1 mt-2">
                {validationMapping.map((validation, index) => (
                  <div
                    key={index}
                    className={`flex justify-start items-center gap-1 ${
                      validation.validation ? "text-green-500" : "text-gray-500"
                    }`}
                  >
                    {validation.validation ? (
                      <FaCheck className="w-2.5 h-2.5 text-green-500" />
                    ) : (
                      <FaRegCircle className="w-2.5 h-2.5 text-gray-500" />
                    )}
                    <span className="text-xs">{validation.label}</span>
                  </div>
                ))}
                <div className="flex justify-start items-center gap-1"></div>
              </div>
            </div>

            <div className="flex items-center-safe justify-end gap-2">
              <input
                type="checkbox"
                checked={isAgreeToTerms}
                className={`w-4 h-4 hover:cursor-pointer accent-blue-500 ${
                  validation.isAgreeToTerms !== "" &&
                  "ring-1 ring-red-500"
                }`}
                onChange={(e) => {
                  setIsAgreeToTerms(e.target.checked);
                  setValidation({
                    ...validation,
                    isAgreeToTerms: "",
                  });
                }}
              />
              <span className="text-xs text-gray-500">
                I agree to the{" "}
                <Link href="/terms" className="text-blue-500 hover:underline">
                  terms of service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-500 hover:underline">
                  privacy policy
                </Link>
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <Button
                label="Create Account"
                severity="blue"
                boldLabel
                onClick={handleSubmit}
              />
              {validation.isAgreeToTerms && (
                <span className="text-xs text-red-500">
                  {validation.isAgreeToTerms}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 my-6">
            <div className="border-t border-gray-300 flex-1" />
            <span className="text-gray-500 text-sm">or sign up with</span>
            <div className="border-t border-gray-300 flex-1" />
          </div>

          <div className="flex justify-between gap-4">
            <Button
              label="Google"
              severity="clear"
              icon={FaGoogle}
              onClick={() => console.log("Google")}
            />
            <Button
              label="Github"
              severity="clear"
              icon={FaGithub}
              onClick={() => console.log("Github")}
            />
          </div>

          <span className="text-center block mt-5 text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
