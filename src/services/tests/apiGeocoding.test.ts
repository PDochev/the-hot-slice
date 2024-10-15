import { getAddress } from "../apiGeocoding";

describe("getAddress functionality", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should return address data when fetch is successful", async () => {
    const mockResponse = {
      locality: "Manhattan",
      principalSubdivision: "New York",
      countryName: "United States of America (the)",
      countryCode: "US",
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response)
    );

    const data = await getAddress({ latitude: 40.7128, longitude: -74.006 });
    expect(data).toEqual(expect.objectContaining(mockResponse));
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=40.7128&longitude=-74.006"
    );
  });

  test("should throw an error when fetch fails", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      } as Response)
    );

    await expect(
      getAddress({ latitude: 40.7128, longitude: -74.006 })
    ).rejects.toThrow("Failed getting address");
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=40.7128&longitude=-74.006"
    );
  });
});
