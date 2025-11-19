interface TextAreaInputProps {
  model: string | number | readonly string[] | undefined;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  label: string;
  field: string;
  invalid?: string;
  mandatory?: boolean;
  rows?: number;
  disabled?: boolean;
}
