import { getMenu, getOrder, createOrder, updateOrder } from "../apiRestaurant";

const API_URL = "https://react-fast-pizza-api.onrender.com/api";

describe("apiRestaurant functionality", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should return menu data when fetch is successful", async () => {
    const mockResponse = {
      status: "success",
      data: [
        {
          id: 1,
          name: "Margherita",
          unitPrice: 12,
          imageUrl:
            "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-1.jpg",
          ingredients: ["tomato", "mozzarella", "basil"],
          soldOut: false,
        },
        {
          id: 2,
          name: "Capricciosa",
          unitPrice: 14,
          imageUrl:
            "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-2.jpg",
          ingredients: [
            "tomato",
            "mozzarella",
            "ham",
            "mushrooms",
            "artichoke",
          ],
          soldOut: true,
        },
      ],
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response)
    );

    const data = await getMenu();
    expect(data).toEqual(expect.objectContaining(mockResponse.data));
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/menu`);
  });

  test("should throw an error when fetch fails for getMenu", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      } as Response)
    );

    await expect(getMenu()).rejects.toThrow("Failed getting menu");
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/menu`);
  });

  test("should return order data when fetch is successful for valid order", async () => {
    const mockOrderData = {
      data: {
        customer: "Plamen",
        status: "delivered",
        priority: true,
        cart: [
          {
            pizzaId: 1,
            name: "Margherita",
            quantity: 1,
            unitPrice: 12,
            totalPrice: 12,
            addIngredients: [],
            removeIngredients: [],
          },
        ],
        id: "1ZUQYB",
        estimatedDelivery: "2024-10-15T10:04:53.626Z",
        orderPrice: 12,
        priorityPrice: 2,
      },
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockOrderData),
      } as Response)
    );

    const data = await getOrder("1ZUQYB");
    expect(data).toEqual(mockOrderData.data);
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/order/1ZUQYB`);
  });

  test("should throw an error when fetch fails for invalid order", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      } as Response)
    );

    await expect(getOrder("1")).rejects.toThrow("Couldn't find order #1");
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/order/1`);
  });

  test("should create an order successfully when calling createOrder", async () => {
    const newOrder = {
      id: 1,
      status: "pending",
      priority: false,
      priorityPrice: 0,
      orderPrice: 20,
      estimatedDelivery: "2023-10-01T12:00:00Z",
      cart: [
        {
          pizzaId: 1,
          name: "Margherita",
          quantity: 2,
          unitPrice: 10,
          totalPrice: 20,
        },
      ],
    };

    const mockResponse = { data: newOrder };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response)
    );

    const data = await createOrder(newOrder);
    expect(data).toEqual(mockResponse.data);
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  test("should throw an error when fail to create and Order ", async () => {
    const newOrder = {
      id: 1,
      status: "pending",
      priority: false,
      priorityPrice: 0,
      orderPrice: 20,
      estimatedDelivery: "2023-10-01T12:00:00Z",
      cart: [
        {
          pizzaId: 1,
          name: "Margherita",
          quantity: 2,
          unitPrice: 10,
          totalPrice: 20,
        },
      ],
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      } as Response)
    );

    await expect(createOrder(newOrder)).rejects.toThrow(
      "Failed creating your order"
    );
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  test("should throw an error when fails to update order", async () => {
    const updateObj = { priority: true };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      } as Response)
    );

    await expect(updateOrder("1", updateObj)).rejects.toThrow(
      "Failed updating your order"
    );
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/order/1`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
});
