import { formatDate } from "../../utils/helpers";
// Sep 28, 04:48 PM
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
