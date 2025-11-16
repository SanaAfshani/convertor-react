import wallexClient from "./wallexClient";
import { Currency } from "../types/currency";
import { Market } from "../types/market";

interface MarketSymbolRaw {
  EXCHANGE: {
    symbol: string;
    baseAsset: string;
    quoteAsset: string;
    faName: string;
    enName: string;
    faBaseAsset: string;
    faQuoteAsset: string;
    enBaseAsset: string;
    enQuoteAsset: string;
    stats: {
      lastPrice: string;
    }
    },
  OTC:{
    symbol: string;
    baseAsset: string;
    quoteAsset: string;
    faName: string;
    enName: string;
    faBaseAsset: string;
    faQuoteAsset: string;
    enBaseAsset: string;
    enQuoteAsset: string;
    stats: {
      lastPrice: string;
    }
  }

}

interface AllMarketsResponse {
  result:{
    symbols: Record<string, MarketSymbolRaw>;
  }
}

interface CurrencyRaw {
  key: string;
  name: string;
  name_en: string;
  type: string;
  precision:number
}

interface CurrenciesResponse {
  result: Record<string, CurrencyRaw>;
}

export const fetchMarkets = async (): Promise<Market[]> => {
  const { data } = await wallexClient.get<AllMarketsResponse>("v1/all-markets");
  const symbols = data.result.symbols ?? {};
  const markets: Market[] = [];

  Object.entries(symbols).forEach(([symbolKey, symbolData]) => {
    if (symbolData.EXCHANGE) {
      markets.push({
        baseSymbol: symbolData.EXCHANGE.baseAsset,
        quoteSymbol: symbolData.EXCHANGE.quoteAsset,
        lastPrice: Number(symbolData.EXCHANGE.stats.lastPrice)
      });
    }

    if (symbolData.OTC) {
      markets.push({
        baseSymbol: symbolData.OTC.baseAsset,
        quoteSymbol: symbolData.OTC.quoteAsset,
        lastPrice: Number(symbolData.OTC.stats.lastPrice)
      });
    }
  });

  return markets;
};

export const fetchCurrencies = async (): Promise<Currency[]> => {
  const { data } = await wallexClient.get<CurrenciesResponse>("v1/currencies");
  const symbols = data.result ?? {};
  return Object.values(symbols).map((c) => ({
    symbol: c.key,
    name: c.name_en || c.name,
    faName: c.name,
    precision: c.precision
  }));
};
