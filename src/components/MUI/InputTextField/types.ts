export interface InputTextFieldType {
  label: string;
  name: string;
  value: string | number;
  type: "text" | "email" | "number" | "password";
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
