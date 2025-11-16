import { useState } from "react";
import { Market } from "../types/market";
import { Currency } from "../types/currency";
import {convertAmount, findPrecision, formatForInput, formatWithPrecision, stripSeparators} from "../utils/conversion";

export const useConverter = (
    markets: Market[] | undefined,
    currencies: Currency[] | undefined
) => {
  const [fromCurrency, setFromCurrency] = useState("USDT");
  const [toCurrency, setToCurrency] = useState("TMN");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [lastChanged, setLastChanged] = useState<"from" | "to">("from");

  const recalc = (
      source: "from" | "to",
      value: string,
      fromSym = fromCurrency,
      toSym = toCurrency
  ) => {
    if (!markets) return;
    setLastChanged(source);

    const cleaned = stripSeparators(value);
    const amount = Number(cleaned);
    if (Number.isNaN(amount)) {
      if (source === "from") setToAmount("");
      else setFromAmount("");
      return;
    }

    if (source === "from") {
      const result = convertAmount(amount, fromSym, toSym, markets);
      if (result == null) {
        setToAmount("");
        return;
      }
      const precision = findPrecision(toSym, currencies);
      setToAmount(formatWithPrecision(result, precision));
    } else {
      const result = convertAmount(amount, toSym, fromSym, markets);
      if (result == null) {
        setFromAmount("");
        return;
      }
      const precision = findPrecision(fromSym, currencies);
      setFromAmount(formatWithPrecision(result, precision));
    }
  };

  const handleFromAmountChange = (v: string) => {
    const cleaned = stripSeparators(v);
    if (cleaned === "") {
      setFromAmount("");
      setToAmount("");
      return;
    }
    const num = Number(cleaned);
    if (Number.isNaN(num)) {
      setFromAmount(v);
      return;
    }
    setFromAmount(formatForInput(num));
    recalc("from", cleaned);
  };

  const handleToAmountChange = (v: string) => {
    const cleaned = stripSeparators(v);
    if (cleaned === "") {
      setToAmount("");
      setFromAmount("");
      return;
    }

    const num = Number(cleaned);
    if (Number.isNaN(num)) {
      setToAmount(v);
      return;
    }

    setToAmount(formatForInput(num));
    recalc("to", cleaned);
  };

  const handleFromCurrencyChange = (s: string) => {
    setFromCurrency(s);
    recalc(
        lastChanged,
        stripSeparators(lastChanged === "from" ? fromAmount : toAmount),
        s,
        toCurrency
    );
  };


  const handleToCurrencyChange = (s: string) => {
    setToCurrency(s);
    recalc(
        lastChanged,
        stripSeparators(lastChanged === "from" ? fromAmount : toAmount),
        fromCurrency,
        s
    );
  };

  const handleSwap = () => {
    if (!markets) return;

    const newFromCurrency = toCurrency;
    const newToCurrency = fromCurrency;

    const baseRaw =
        lastChanged === "from" ? stripSeparators(fromAmount) : stripSeparators(toAmount);

    const baseNum = Number(baseRaw);

    setFromCurrency(newFromCurrency);
    setToCurrency(newToCurrency);

    if (!baseRaw || Number.isNaN(baseNum)) {
      const prevFromAmount = fromAmount;
      const prevToAmount = toAmount;
      setFromAmount(prevToAmount);
      setToAmount(prevFromAmount);
      setLastChanged((prev) => (prev === "from" ? "to" : "from"));
      return;
    }

    setLastChanged("from");
    setFromCurrency(newFromCurrency);
    setToCurrency(newToCurrency);

    setFromAmount(formatForInput(baseNum));

    const result = convertAmount(baseNum, newFromCurrency, newToCurrency, markets);
    if (result == null) {
      setToAmount("");
      return;
    }

    const precision = findPrecision(newToCurrency, currencies);
    setToAmount(formatWithPrecision(result, precision));
  };


  return {
    fromCurrency,
    toCurrency,
    fromAmount,
    toAmount,
    handleFromAmountChange,
    handleToAmountChange,
    handleFromCurrencyChange,
    handleToCurrencyChange,
    handleSwap
  };
};
