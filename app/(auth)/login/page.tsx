"use client";
import { JSX, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import Button from "@/app/(main)/_components/button";
import { FaGithub } from "react-icons/fa";
import AuthService from "@/services/auth.service";
import { LoginBody } from "@/services/dto/auth.dto";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Login(): JSX.Element {
  const router = useRouter();
  const [form, setForm] = useState<LoginBody>({
    email: "",
    password: "",
  });

  const [validation, setValidation] = useState<LoginBody>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const inputMapping: {
    label: string;
    type: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    key: keyof LoginBody;
  }[] = [
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
      placeholder: "Enter your password",
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

  const handleValidation = (): LoginBody => {
    const errors: LoginBody = {
      email: "",
      password: "",
    };

    if (!form.email) {
      errors.email = "Email is required";
    }

    if (!form.password) {
      errors.password = "Password is required";
    }

    setValidation(errors);
    return errors;
  };

  const handleSubmit = async (): Promise<void> => {
    const errors = handleValidation();
    const isValid = Object.values(errors).every((value) => !value);

    if (!isValid) {
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await AuthService.login(form);
      localStorage.setItem("token", data.data.token);
      router.push("/login")
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, please try again");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="p-15 flex flex-col items-center justify-center flex-1 h-full">
        <div className="max-w-[450px] w-full mt-4">
          <div className="flex flex-col gap-2.5">
            <span className="text-3xl font-bold">Welcome Back</span>
            <span className="text-gray-500 text-sm">
              Sign in to your account to continue
            </span>
          </div>

          <div className="flex flex-col mt-7.5 gap-5">
            {inputMapping.map((input, index) => (
              <div key={index} className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-500">{input.label}</label>
                <input
                  type={input.type}
                  value={form[input.key]}
                  className={`w-full ring ring-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-blue-500 focus:ring-2  ${
                    validation[input.key] && "ring-2 ring-red-500"
                  } `}
                  placeholder={input.placeholder}
                  onChange={input.onChange}
                />
                {validation[input.key] && (
                  <span className="text-xs text-red-500">
                    {validation[input.key]}
                  </span>
                )}
              </div>
            ))}

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 hover:cursor-pointer"
                />
                <span className="text-xs text-gray-500">Remember me</span>
              </div>

              <Link
                href={"/forgot-password"}
                className="text-xs text-blue-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <div className="flex flex-col gap-1">
              <Button
                label="Sign In"
                severity="blue"
                boldLabel
                onClick={handleSubmit}
                isLoading={isLoading}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 my-6">
            <div className="border-t border-gray-300 flex-1" />
            <span className="text-gray-500 text-sm">or continue with</span>
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
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
