import { FormControlLabel, Radio } from "@mui/material";

interface IProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  checked: boolean;
}

const RadioController = ({ label, value, onChange, checked }: IProps) => {
  const handleChange = () => {
    onChange(value);
  };
  return (
    <FormControlLabel
      className="checked"
      control={
        <Radio value={value} checked={checked} onChange={handleChange} />
      }
      label={label}
    />
  );
};

export default RadioController;
