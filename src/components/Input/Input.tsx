interface InputProps {
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  name,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <input
      name={name}
      value={value}
      type="text"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
