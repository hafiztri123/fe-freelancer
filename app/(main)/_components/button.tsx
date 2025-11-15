import { JSX } from "react";

interface ButtonProps {
  label: string;
  severity: "danger" | "dark";
  onClick: () => void;
}
export default function Button(props: ButtonProps): JSX.Element {
  const severityMapping: Record<ButtonProps["severity"], string> = {
    danger: "bg-red-500 hover:bg-red-600 hover:cursor-pointer",
    dark: "bg-gray-500 hover:bg-gray-600 hover:cursor-pointer",
  };

  return (
    <>
      <button
        className={`text-white py-2 px-4 rounded ${
          severityMapping[props.severity]
        }`}
        onClick={props.onClick}
      >
        {props.label}
      </button>
    </>
  );
}
