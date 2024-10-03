import { calcMinutesLeft } from "../../utils/helpers"; // Adjust the import path as needed

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
