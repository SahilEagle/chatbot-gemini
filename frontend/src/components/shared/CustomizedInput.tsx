// import React from 'react'
import { TextField } from "@mui/material";

type props = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = (props: props) => {
  return (
    <TextField
      margin="normal"
      InputLabelProps={{ style: { color: "white" } }}
      name={props.name}
      type={props.type}
      label={props.label}
      inputProps={{
        style: {
          width: "400px",
          color: "white",
          borderRadius: 10,
          fontSize: 20,
        },
      }}
    />
  );
};

export default CustomizedInput;
