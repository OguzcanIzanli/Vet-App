export interface OperationButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  icon: "send" | "delete" | "edit" | "save";
  children?: React.ReactNode;
  className?: string;
  id?: string;
}
