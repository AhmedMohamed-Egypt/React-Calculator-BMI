import * as React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
function TextInput({ value, onChange, endTitle }) {
  return (
    <TextField
      label="Enter your Weight"
      id="outlined-start-adornment"
      sx={{ m: 1, width: "25ch" }}
      value={value}
      onChange={onChange}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">{endTitle}</InputAdornment>
          ),
        },
      }}
    />
  );
}

export default TextInput;
