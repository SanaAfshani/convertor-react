import { useQuery } from "@tanstack/react-query";
import { fetchCurrencies } from "../api/currencyService";
import { Currency } from "../types/currency";

export const useCurrencies = () =>
  useQuery<Currency[], Error>({
    queryKey: ["currencies"],
    queryFn: fetchCurrencies,
    staleTime: 5 * 60 * 1000
  });
