import { TextField, Box } from "@mui/material";
import { InputType } from "./types";

const CustomerInput = ({ label, name, value, type, onChange }: InputType) => (
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

export default CustomerInput;
