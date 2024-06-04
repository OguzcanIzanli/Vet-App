export interface InputSelectType {
  label: string;
  name: SelectionType;
  // name: string;
  value: string | number;
  // type: "text" | "email" | "number" | "password";
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SelectionType {
  id?: string;
  address?: string;
  city?: string;
  email?: string;
  name?: string;
  phone?: string;
}
