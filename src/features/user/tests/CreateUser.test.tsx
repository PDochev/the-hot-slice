import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import CreateUser from "../CreateUser";

test("Renders the create user form and input responds to text input", async () => {
  const user = userEvent.setup();
  render(<CreateUser />);

  const welcomeMessage = screen.getByText(
    /welcome! please start by telling us your name:/i
  );
  expect(welcomeMessage).toBeInTheDocument();

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
});
