import { describe, it, expect } from "vitest";
import { convertAmount } from "./conversion";
import type { Market } from "../types/market";

const markets: Market[] = [
  { baseSymbol: "BTC", quoteSymbol: "USDT", lastPrice: 50000 },
  { baseSymbol: "ETH", quoteSymbol: "USDT", lastPrice: 4000 }
];

describe("convertAmount", () => {
  it("converts between two assets via USDT pivot", () => {
    const result = convertAmount(1, "BTC", "ETH", markets);
    expect(result).toBeCloseTo(12.5);
  });

  it("returns same amount when currencies are equal", () => {
    const result = convertAmount(10, "USDT", "USDT", markets);
    expect(result).toBe(10);
  });

  it("returns null when market data is missing", () => {
    const result = convertAmount(1, "BTC", "IRR", markets);
    expect(result).toBeNull();
  });
});
