interface DialogProps {
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
  header: string;
  closable?: boolean;
  default?: JSX.Element;
  footer?: JSX.Element;
  width?: number;
}