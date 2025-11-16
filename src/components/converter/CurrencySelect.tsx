import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Currency } from "../../types/currency";

interface Props {
  label: string;
  value: string;
  currencies: Currency[];
  onChange: (symbol: string) => void;
}

const CurrencySelect: React.FC<Props> = ({
  label,
  value,
  currencies,
  onChange
}) => {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value as string)}
      >
        {currencies.map((c) => (
          <MenuItem key={c.symbol} value={c.symbol}>
            {c.symbol} - {c.faName || c.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurrencySelect;
