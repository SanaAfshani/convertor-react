import { TextField } from "@mui/material";

interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

const normalizeToEnglishDigits = (value: string): string => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const arabicDigits = "٠١٢٣٤٥٦٧٨٩";

  return value
      .split("")
      .map((ch) => {
        const pIndex = persianDigits.indexOf(ch);
        if (pIndex !== -1) return String(pIndex);

        const aIndex = arabicDigits.indexOf(ch);
        if (aIndex !== -1) return String(aIndex);
        if (ch === "٬" || ch === "،" || ch === ",") return "";
        if (ch === "٫") return ".";

        return ch;
      })
      .join("");
};

const sanitizeNumericInput = (value: string): string => {
  const normalized = normalizeToEnglishDigits(value);
  let cleaned = normalized.replace(/[^0-9.]/g, "");
  const parts = cleaned.split(".");
  if (parts.length <= 1) return cleaned;

  return parts[0] + "." + parts.slice(1).join("");
};

const AmountInput: React.FC<Props> = ({ label, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const sanitized = sanitizeNumericInput(raw);
    onChange(sanitized);
  };

  return (
      <TextField
          fullWidth
          label={label}
          value={value}
          onChange={handleChange}
          margin="normal"
          inputMode="decimal"
          type="tel"
      />
  );
};

export default AmountInput;
