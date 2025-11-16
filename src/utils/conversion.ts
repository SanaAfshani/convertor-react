import { Market } from "../types/market";
import {Currency} from "../types/currency";

const PIVOT = "USDT";
const DEFAULT_PRECISION = 4;

const findPriceInPivot = (symbol: string, markets: Market[]): number | null => {
  if (symbol === PIVOT) return 1;

  const direct = markets.find(
    (m) => m.baseSymbol === symbol && m.quoteSymbol === PIVOT
  );
  if (direct) return direct.lastPrice;

  const inverse = markets.find(
    (m) => m.quoteSymbol === symbol && m.baseSymbol === PIVOT
  );
  if (inverse) return 1 / inverse.lastPrice;

  return null;
};

export const convertAmount = (
  amount: number,
  fromSymbol: string,
  toSymbol: string,
  markets: Market[]
): number | null => {
  if (fromSymbol === toSymbol) return amount;

  const fromPrice = findPriceInPivot(fromSymbol, markets);
  const toPrice = findPriceInPivot(toSymbol, markets);

  if (fromPrice == null || toPrice == null) return null;

  const amountInPivot = amount * fromPrice;
  const result = amountInPivot / toPrice;

  return result;
};


export const findPrecision = (
    symbol: string,
    currencies: Currency[] | undefined
): number => {
  const cur = currencies?.find((c) => c.symbol === symbol);
  return cur?.precision ?? DEFAULT_PRECISION;
};

export const stripSeparators = (value: string): string =>
    value.replace(/,/g, "").trim();

export const formatWithPrecision = (value: number, precision: number): string => {
  if (!Number.isFinite(value)) return "";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: precision
  }).format(value);
};

export const formatForInput = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 8
  }).format(value);
};