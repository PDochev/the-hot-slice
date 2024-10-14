import { render, screen } from "../../../test-utils/testing-library-utils";
import CartItem from "../CartItem";
// import userEvent from "@testing-library/user-event";

describe("CartItem", () => {
  const mockCartItem = {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 1,
    unitPrice: 16,
    totalPrice: 16,
  };

  test("Display the cart item", async () => {
    // const user = userEvent.setup();
    render(<CartItem item={mockCartItem} />);

    const pizzaName = screen.getByText(/1× mediterranean/i);
    expect(pizzaName).toBeInTheDocument();

    const totalPrice = screen.getByText(/€16\.00/i);
    expect(totalPrice).toBeInTheDocument();
    expect(totalPrice).toHaveTextContent("€16.00");

    const buttonAdd = screen.getByRole("button", {
      name: /\+/i,
    });
    const buttonRemove = screen.getByRole("button", {
      name: /\-/i,
    });
    const deleteButton = screen.getByRole("button", { name: /delete/i });

    expect(buttonAdd).toBeInTheDocument();
    expect(buttonRemove).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    // const orderPizza = screen.getByRole("button", { name: /order pizza/i });
    // expect(orderPizza).toBeInTheDocument();
  });
});
