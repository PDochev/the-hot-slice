import { render, screen } from "../../../test-utils/testing-library-utils";
import CartItem from "../CartItem";

describe("CartItem functionality", () => {
  const mockCartItem = {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 1,
    unitPrice: 16,
    totalPrice: 16,
  };

  test("should display the display the correct cart items in the cart (pizza name, price and buttons)", async () => {
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
  });
});
