import { JSX } from "react";
import { IconType } from "react-icons";
import { AiOutlineLoading } from "react-icons/ai";



interface ButtonProps {
  label: string;
  boldLabel?: boolean;
  severity: "danger" | "dark" | "blue" | "clear";
  icon?: IconType;
  isLoading?: boolean;
  onClick: () => void;
}
export default function Button(props: ButtonProps): JSX.Element {
  const severityMapping: Record<ButtonProps["severity"], string> = {
    danger: "bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white ",
    dark: "bg-gray-500 hover:bg-gray-600 hover:cursor-pointer text-white ",
    blue: "bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white ",
    clear: "ring-gray-400 ring-1 hover:cursor-pointer text-sm hover:bg-gray-100",
  };

  return (
    <>
      <button
        className={`py-2 px-4 w-full rounded ${
          severityMapping[props.severity]
        } ${props.boldLabel ? "font-bold" : ""} max-w-fit`}
        onClick={props.onClick}
      >
        {props.isLoading ? (
          <AiOutlineLoading className="animate-spin" />
        ) : (
          <div className="flex items-center justify-center">
            {props.icon && <props.icon className="w-5 h-5" />}
            {props.label}
          </div>
        )}
      </button>
    </>
  );
}
