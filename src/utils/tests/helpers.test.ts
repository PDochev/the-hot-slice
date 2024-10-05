import { calcMinutesLeft, formatCurrency, formatDate } from "../helpers";

describe("Calculate Minutes Left Function", () => {
  beforeEach(() => {
    // Mock the Date object to return a fixed date
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-03-15T12:00:00Z"));
  });

  afterEach(() => {
    // Restore the original Date object after each test
    vi.useRealTimers();
  });

  test("should return positive minutes for a future date", () => {
    const result = calcMinutesLeft("2024-03-15T13:00:00Z");
    expect(result).toBe(60);
  });

  test("should return negative minutes for a past date", () => {
    const result = calcMinutesLeft("2024-03-15T11:00:00Z");
    expect(result).toBe(-60);
  });

  test("should return 0 for the current time", () => {
    const result = calcMinutesLeft("2024-03-15T12:00:00Z");
    expect(result).toBe(0);
  });

  test("should handle date strings in different formats", () => {
    const result = calcMinutesLeft("2024-03-15T14:30:00+02:00");
    expect(result).toBe(30);
  });

  test("should handle date strings without timezone information", () => {
    const result = calcMinutesLeft("2024-03-15T12:30:00");
    expect(result).toBe(30);
  });

  it("should round to the nearest minute", () => {
    vi.setSystemTime(new Date("2024-03-15T12:00:30Z"));
    const result = calcMinutesLeft("2024-03-15T12:02:45Z");
    expect(result).toBe(2);
  });
});

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
    expect(formatCurrency(Number("abc"))).toBe("€NaN");
  });

  test("handles string conversion", () => {
    expect(formatCurrency(Number("1.00"))).toBe("€1.00");
  });
});

describe("Format Date Function", () => {
  test("formats a valid date string", () => {
    // mockDate("2023-03-15T14:30:00Z");
    expect(formatDate("2023-03-15T14:30:00Z")).toBe("Mar 15, 02:30 PM");
  });

  test("handles different time zones", () => {
    // mockDate("2023-03-15T14:30:00-05:00");
    expect(formatDate("2023-03-15T14:30:00-05:00")).toBe("Mar 15, 07:30 PM");
  });

  test("formats date at midnight", () => {
    // mockDate("2023-03-15T00:00:00Z");
    expect(formatDate("2023-03-15T00:00:00Z")).toBe("Mar 15, 12:00 AM");
  });

  test("formats date at noon", () => {
    // mockDate("2023-03-15T12:00:00Z");
    expect(formatDate("2023-03-15T12:00:00Z")).toBe("Mar 15, 12:00 PM");
  });

  test("handles leap year", () => {
    // mockDate("2024-02-29T10:15:00Z");
    expect(formatDate("2024-02-29T10:15:00Z")).toBe("Feb 29, 10:15 AM");
  });

  test("formats date at year boundary", () => {
    // mockDate("2023-12-31T23:59:59Z");
    expect(formatDate("2023-12-31T23:59:59Z")).toBe("Dec 31, 11:59 PM");
  });

  test("handles future dates", () => {
    // mockDate("2050-01-01T00:00:00Z");
    expect(formatDate("2050-01-01T00:00:00Z")).toBe("Jan 1, 12:00 AM");
  });

  test("handles past dates", () => {
    // mockDate("1900-01-01T00:00:00Z");
    expect(formatDate("1900-01-01T00:00:00Z")).toBe("Jan 1, 12:00 AM");
  });
});
