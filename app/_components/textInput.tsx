interface TextInputProps {
  model: string | number | readonly string[] | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  field: string;
  invalid?: string;
  mandatory?: boolean;
}

export default function TextInput(props: TextInputProps) {
  return (
    <>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 flex gap-1/2 font-medium tracking-[0.02em]">
            {props.label}
            {props.mandatory && <span className="text-red-500">*</span>}
          </label>
          <input
            type="text"
            name={props.field}
            className={`border-0 ring-1 ring-gray-400 outline-0 text-sm  p-2 rounded focus:ring-2 focus:ring-blue-500 ${props.invalid && "ring-red-500"}`}
            placeholder={props.placeholder}
            value={props.model}
            onChange={props.onChange}
          />
        </div>

        {props.invalid && (
          <span className="text-xs text-red-500">{props.invalid}</span>
        )}
      </div>
    </>
  );
}
