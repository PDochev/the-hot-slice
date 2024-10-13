import { render, screen } from "../test-utils/testing-library-utils";
import App from "../App";
import userEvent from "@testing-library/user-event";

test("Order phases for happy path", async () => {
  const user = userEvent.setup();
  render(<App />);

  // Enter you name

  const input = screen.getByPlaceholderText("Your full name");
  expect(input).toBeInTheDocument();
  expect(input).toHaveValue("");

  await user.clear(input);
  await user.type(input, "John Doe");
  expect(input).toHaveValue("John Doe");

  const startOrderingButton = screen.getByRole("button", {
    name: /start ordering/i,
  });
  expect(startOrderingButton).toBeInTheDocument();
  await user.click(startOrderingButton);

  // Check if the username is in the document (navigation bar)
  const userName = screen.getByText("John Doe");
  expect(userName).toBeInTheDocument();

  // Add pizzas to the order
});
