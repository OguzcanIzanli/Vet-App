import "./OperationButton.styles.css";
import IconSend from "../../assets/icons/IconSend";
import IconDelete from "../../assets/icons/IconDelete";
import IconEdit from "../../assets/icons/IconEdit";
import IconSave from "../../assets/icons/IconSave";
import { OperationButtonProps } from "./types";

const icons = {
  send: <IconSend />,
  delete: <IconDelete />,
  edit: <IconEdit />,
  save: <IconSave />,
};

const OperationButton: React.FC<OperationButtonProps> = ({
  onClick,
  icon,
  children,
  className,
  id,
}) => {
  return (
    <button
      className={`operationButton ${className}`}
      onClick={onClick}
      id={id}
    >
      {children}
      {icons[icon]}
    </button>
  );
};

export default OperationButton;
