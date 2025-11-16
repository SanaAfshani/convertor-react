import { describe, it, expect } from "vitest";
import { convertAmount } from "./conversion";
import type { Market } from "../types/market";

const markets: Market[] = [
  { baseSymbol: "USDT", quoteSymbol: "TMN", lastPrice: 112_898 },
  { baseSymbol: "BTC", quoteSymbol: "USDT", lastPrice: 60_000 }
];

describe("convertAmount", () => {
  it("converts between same currency as identity", () => {
    expect(convertAmount(10, "USDT", "USDT", markets)).toBe(10);
  });

  it("converts from USDT to TMN directly", () => {
    const result = convertAmount(1, "USDT", "TMN", markets);
    expect(result).toBeCloseTo(112_898);
  });

  it("converts from TMN to USDT using inverse", () => {
    const result = convertAmount(112_898, "TMN", "USDT", markets);
    expect(result).toBeCloseTo(1);
  });

  it("converts from BTC to TMN via pivot USDT", () => {
    const result = convertAmount(1, "BTC", "TMN", markets);
    expect(result).toBeCloseTo(60_000 * 112_898);
  });

  it("returns null when no path exists", () => {
    const result = convertAmount(1, "EUR", "USDT", markets);
    expect(result).toBeNull();
  });
});
