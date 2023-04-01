import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./CheckboxController.scss";

interface IProps {
  label: string;
  value: number | string;
  onChange: (value: number | string, isChecked: boolean) => void;
  checked?: boolean;
}

function CheckboxController({ label, value, onChange, checked }: IProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    onChange(value, isChecked);
  };
  return (
    <FormControlLabel
      control={
        <Checkbox
          value={value}
          onChange={handleChange}
          checked={checked}
          sx={{
            "&.Mui-checked": {
              color: "cornflowerblue", // custom color when checked
            },
          }}
        />
      }
      label={label}
    />
  );
}

export default CheckboxController;
