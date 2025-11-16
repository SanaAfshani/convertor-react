import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useConverter } from "./useConverter";
import type { Market } from "../types/market";
import type { Currency } from "../types/currency";

const markets: Market[] = [
    { baseSymbol: "USDT", quoteSymbol: "TMN", lastPrice: 112_898 }
];

const currencies: Currency[] = [
    { symbol: "USDT", name: "Tether", precision: 4 },
    { symbol: "TMN", name: "Toman", precision: 0 }
];

describe("useConverter", () => {
    it("updates toAmount when fromAmount changes (two-way binding)", () => {
        const { result } = renderHook(() => useConverter(markets, currencies));

        act(() => {
            result.current.handleFromAmountChange("1");
        });

        expect(result.current.fromAmount).toContain("1");
        expect(result.current.toAmount).not.toBe("");
    });

    it("updates fromAmount when toAmount changes (reverse binding)", () => {
        const { result } = renderHook(() => useConverter(markets, currencies));

        act(() => {
            result.current.handleFromAmountChange("1");
        });

        const prevFrom = result.current.fromAmount;

        act(() => {
            result.current.handleToAmountChange("112898");
        });
        expect(result.current.toAmount).toContain("112");
        expect(result.current.fromAmount).not.toBe(prevFrom);
    });
});
