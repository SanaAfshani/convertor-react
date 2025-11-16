import { useQuery } from "@tanstack/react-query";
import { fetchMarkets } from "../services/currencyService";
import { Market } from "../types/market";

export const useMarkets = () =>
  useQuery<Market[], Error>({
    queryKey: ["markets"],
    queryFn: fetchMarkets,
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000
  });
