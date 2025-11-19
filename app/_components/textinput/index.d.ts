interface TextInputProps {
  model: string | number | readonly string[] | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label?: string;
  field: string;
  invalid?: string;
  mandatory?: boolean;
  disabled?: boolean;
  number?: boolean;
}
