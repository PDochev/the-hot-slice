import { formatDate } from "../../utils/helpers";
// Sep 28, 04:48 PM
describe("formatDate", () => {
  // Helper function to mock Date object
  const mockDate = (dateString) => {
    const date = new Date(dateString);
    vi.useFakeTimers();
    vi.setSystemTime(date);
  };

  afterEach(() => {
    vi.useRealTimers();
  });

  it("formats a valid date string", () => {
    mockDate("2023-03-15T14:30:00Z");
    expect(formatDate("2023-03-15T14:30:00Z")).toBe("Mar 15, 02:30 PM");
  });

  it("handles different time zones", () => {
    mockDate("2023-03-15T14:30:00-05:00");
    expect(formatDate("2023-03-15T14:30:00-05:00")).toBe("Mar 15, 07:30 PM");
  });

  it("formats date at midnight", () => {
    mockDate("2023-03-15T00:00:00Z");
    expect(formatDate("2023-03-15T00:00:00Z")).toBe("Mar 15, 12:00 AM");
  });

  it("formats date at noon", () => {
    mockDate("2023-03-15T12:00:00Z");
    expect(formatDate("2023-03-15T12:00:00Z")).toBe("Mar 15, 12:00 PM");
  });

  it("handles leap year", () => {
    mockDate("2024-02-29T10:15:00Z");
    expect(formatDate("2024-02-29T10:15:00Z")).toBe("Feb 29, 10:15 AM");
  });

  it("formats date at year boundary", () => {
    mockDate("2023-12-31T23:59:59Z");
    expect(formatDate("2023-12-31T23:59:59Z")).toBe("Dec 31, 11:59 PM");
  });

  it("handles future dates", () => {
    mockDate("2050-01-01T00:00:00Z");
    expect(formatDate("2050-01-01T00:00:00Z")).toBe("Jan 1, 12:00 AM");
  });

  it("handles past dates", () => {
    mockDate("1900-01-01T00:00:00Z");
    expect(formatDate("1900-01-01T00:00:00Z")).toBe("Jan 1, 12:00 AM");
  });
});
