import { JSX } from "react";
import { IconType } from "react-icons";
import { AiOutlineLoading } from "react-icons/ai";

interface ButtonProps {
  label: string;
  boldLabel?: boolean;
  severity: "danger" | "dark" | "blue" | "clear" | "success";
  icon?: IconType;
  loading?: boolean;
  onClick: () => void;
}
export default function Button(props: ButtonProps): JSX.Element {
  const severityMapping: Record<ButtonProps["severity"], string> = {
    danger: "bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white ",
    dark: "bg-gray-500 hover:bg-gray-600 hover:cursor-pointer text-white ",
    blue: "bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white ",
    clear:
      "ring-gray-400 ring-1 hover:cursor-pointer text-sm hover:bg-gray-100",
    success: "bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white ",
  };

  return (
    <>
      <button
        className={`py-2 px-4 w-full rounded ${
          severityMapping[props.severity]
        } ${props.boldLabel ? "font-bold" : ""} w-full`}
        onClick={props.onClick}
      >
        {props.loading ? (
          <div className="flex items-center justify-center">
            <AiOutlineLoading className="animate-spin" />
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            {props.icon && <props.icon className="w-5 h-5" />}
            {props.label}
          </div>
        )}
      </button>
    </>
  );
}
