import { Grid, Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
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
  onSwap: () => void;
}

const ConversionPanel: React.FC<Props> = (props) => {
  const {
    currencies,
    fromCurrency,
    toCurrency,
    fromAmount,
    toAmount,
    onFromAmountChange,
    onToAmountChange,
    onFromCurrencyChange,
    onToCurrencyChange,
    onSwap
  } = props
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Converter
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5}>
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
          <Grid item xs={12} sm={2}>
            <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%"
                }}
            >
              <IconButton onClick={onSwap} aria-label="Swap currencies">
                <SwapHorizIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={5}>
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
