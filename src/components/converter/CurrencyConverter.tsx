import { Alert, Box, CircularProgress } from "@mui/material";
import { useCurrencies } from "../../hooks/useCurrencies";
import { useMarkets } from "../../hooks/useMarkets";
import { useConverter } from "../../hooks/useConverter";
import ConversionPanel from "./ConversionPanel";

const CurrencyConverter: React.FC = () => {
  const {
    data: currencies,
    isLoading: loadingCurrencies,
    error: currenciesError
  } = useCurrencies();
  const {
    data: markets,
    isLoading: loadingMarkets,
    error: marketsError
  } = useMarkets();

  const {
    fromCurrency,
    toCurrency,
    fromAmount,
    toAmount,
    handleFromAmountChange,
    handleToAmountChange,
    handleFromCurrencyChange,
    handleToCurrencyChange
  } = useConverter(markets,currencies);

  const isLoading = loadingCurrencies || loadingMarkets;
  const error = currenciesError || marketsError;

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !currencies || !markets) {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        مشکلی در دریافت داده‌ها رخ داده است. لطفاً دوباره تلاش کنید.
      </Alert>
    );
  }

  return (
    <ConversionPanel
      currencies={currencies}
      fromCurrency={fromCurrency}
      toCurrency={toCurrency}
      fromAmount={fromAmount}
      toAmount={toAmount}
      onFromAmountChange={handleFromAmountChange}
      onToAmountChange={handleToAmountChange}
      onFromCurrencyChange={handleFromCurrencyChange}
      onToCurrencyChange={handleToCurrencyChange}
    />
  );
};

export default CurrencyConverter;
