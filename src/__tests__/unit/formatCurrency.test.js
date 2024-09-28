import { expect } from "vitest";
import { formatCurrency } from "../../utils/helpers";

describe("Format Currency in €", () => {
  test("formats positive integers", () => {
    expect(formatCurrency(1000)).toBe("€1,000.00");
    expect(formatCurrency(1)).toBe("€1.00");
  });

  test("formats positive decimals", () => {
    expect(formatCurrency(1000.5)).toBe("€1,000.50");
    expect(formatCurrency(1.23)).toBe("€1.23");
  });

  test("formats negative numbers", () => {
    expect(formatCurrency(-1000)).toBe("-€1,000.00");
    expect(formatCurrency(-1.23)).toBe("-€1.23");
  });

  test("formats zero", () => {
    expect(formatCurrency(0)).toBe("€0.00");
  });

  test("formats very large numbers", () => {
    expect(formatCurrency(1000000000)).toBe("€1,000,000,000.00");
  });

  test("formats very small decimals", () => {
    expect(formatCurrency(0.001)).toBe("€0.00");
  });

  test("handles maximum safe integer", () => {
    expect(formatCurrency(Number.MAX_SAFE_INTEGER)).toBe(
      "€9,007,199,254,740,991.00"
    );
  });

  test("handles minimum safe integer", () => {
    expect(formatCurrency(Number.MIN_SAFE_INTEGER)).toBe(
      "-€9,007,199,254,740,991.00"
    );
  });

  test("handles Infinity", () => {
    expect(formatCurrency(Infinity)).toBe("€∞");
  });

  test("handles negative Infinity", () => {
    expect(formatCurrency(-Infinity)).toBe("-€∞");
  });

  test("handles NaN", () => {
    expect(formatCurrency(NaN)).toBe("€NaN");
  });

  test("handles invalid string", () => {
    expect(formatCurrency("abc")).toBe("€NaN");
  });

  test("handles string conversion", () => {
    expect(formatCurrency("1.00")).toBe("€1.00");
  });
});
