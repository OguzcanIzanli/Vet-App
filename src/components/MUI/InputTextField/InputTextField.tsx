import { TextField, Box } from "@mui/material";
import { InputTextFieldType } from "./types";

const InputTextField = ({
  label,
  name,
  value,
  type,
  onChange,
}: InputTextFieldType) => (
  <Box
    component="form"
    sx={{
      "& > :not(style)": { m: 1, width: "100%" },
    }}
    noValidate
    autoComplete="off"
  >
    <TextField
      id={`outlined-${name}`}
      label={label}
      variant="outlined"
      name={name}
      value={value}
      type={type}
      onChange={onChange}
    />
  </Box>
);

export default InputTextField;
