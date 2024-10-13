import { render, screen } from "../../../test-utils/testing-library-utils";
import MenuItem from "../MenuItem";
import userEvent from "@testing-library/user-event";
import { getMenu } from "../../../services/apiRestaurant";

describe("MenuItem component", async () => {
  const menu = await getMenu();
  const mockPizza = menu[0];

  test("displays correct pizza image and name", async () => {
    render(<MenuItem pizza={mockPizza} />);

    // Check for the image
    const pizzaImage = await screen.findByRole("img", { name: mockPizza.name });
    expect(pizzaImage).toBeInTheDocument();
    expect(pizzaImage).toHaveAttribute("src", mockPizza.imageUrl);

    // Check for the pizza name
    const pizzaName = screen.getByText(mockPizza.name);
    expect(pizzaName).toBeInTheDocument();
  });

  test("displays 'Sold out' when pizza is sold out", () => {
    const soldOutPizza = { ...mockPizza, soldOut: true };
    render(<MenuItem pizza={soldOutPizza} />);

    const soldOutText = screen.getByText(/sold out/i);
    expect(soldOutText).toBeInTheDocument();
    const addToCartButton = screen.queryByRole("button", {
      name: /add to cart/i,
    });
    expect(addToCartButton).not.toBeInTheDocument();
  });

  test("displays ingredients", () => {
    render(<MenuItem pizza={mockPizza} />);

    const ingredients = screen.getByText(/tomato, mozzarella, basil/i);
    expect(ingredients).toBeInTheDocument();
  });

  test("displays correct price", () => {
    render(<MenuItem pizza={mockPizza} />);

    const price = screen.getByText(/€12\.00/i);
    expect(price).toBeInTheDocument();
  });

  test("displays Add to Cart button and Add,Remove and Delete buttons when Add to Cart button is clicked", async () => {
    const user = userEvent.setup();
    render(<MenuItem pizza={mockPizza} />);

    const addToCartButton = screen.getByRole("button", {
      name: /add to cart/i,
    });
    expect(addToCartButton).toBeInTheDocument();
    await user.click(addToCartButton);

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

    const quantity = screen.getByText("1");
    expect(quantity).toBeInTheDocument();
    expect(quantity).toHaveTextContent("1");

    await user.click(deleteButton);
    expect(quantity).not.toBeInTheDocument();
    expect(buttonAdd).not.toBeInTheDocument();
    expect(buttonRemove).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
  });

  test("display correct quantity when the user press on the add and remove buttons", async () => {
    const user = userEvent.setup();
    render(<MenuItem pizza={mockPizza} />);
    const addToCartButton = screen.getByRole("button", {
      name: /add to cart/i,
    });
    expect(addToCartButton).toBeInTheDocument();

    await user.click(addToCartButton);

    const buttonAdd = screen.getByRole("button", {
      name: /\+/i,
    });
    const buttonRemove = screen.getByRole("button", {
      name: /\-/i,
    });
    const deleteButton = screen.getByRole("button", { name: /delete/i });

    const quantity = screen.getByText("1");

    // Check if the quantity, delete button, add and remove buttons are displayed
    expect(quantity).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(buttonAdd).toBeInTheDocument();
    expect(buttonRemove).toBeInTheDocument();

    // Add items to the cart
    await user.click(buttonAdd);
    expect(quantity).toHaveTextContent("2");
    await user.click(buttonAdd);
    expect(quantity).toHaveTextContent("3");

    // Remove items from the cart
    await user.click(buttonRemove);
    expect(quantity).toHaveTextContent("2");
    await user.click(buttonRemove);
    expect(quantity).toHaveTextContent("1");

    // Check if the item is removed from the cart when the quantity is 0
    await user.click(buttonRemove);
    expect(quantity).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
    expect(buttonAdd).not.toBeInTheDocument();

    // Check if the item is removed from the cart when the delete button is clicked
    await user.click(addToCartButton);
    expect(quantity).toHaveTextContent("1");
    await user.click(deleteButton);
    expect(quantity).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
  });
});
