import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Currency } from "../../types/currency";
import AmountInput from "./AmountInput";
import CurrencySelect from "./CurrencySelect";

interface Props {
  currencies: Currency[];
  fromCurrency: string;
  toCurrency: string;
  fromAmount: string;
  toAmount: string;
  onFromAmountChange: (v: string) => void;
  onToAmountChange: (v: string) => void;
  onFromCurrencyChange: (v: string) => void;
  onToCurrencyChange: (v: string) => void;
}

const ConversionPanel: React.FC<Props> = ({
  currencies,
  fromCurrency,
  toCurrency,
  fromAmount,
  toAmount,
  onFromAmountChange,
  onToAmountChange,
  onFromCurrencyChange,
  onToCurrencyChange
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Converter
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <AmountInput
              label="From amount"
              value={fromAmount}
              onChange={onFromAmountChange}
            />
            <CurrencySelect
              label="From currency"
              value={fromCurrency}
              currencies={currencies}
              onChange={onFromCurrencyChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AmountInput
              label="To amount"
              value={toAmount}
              onChange={onToAmountChange}
            />
            <CurrencySelect
              label="To currency"
              value={toCurrency}
              currencies={currencies}
              onChange={onToCurrencyChange}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ConversionPanel;
